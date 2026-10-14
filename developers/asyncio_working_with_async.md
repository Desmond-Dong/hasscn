虽然我们有向后兼容的 API，但直接使用 async core 会快得多。大多数核心组件已经改写为利用 async core。这包括 EntityComponent 助手（light、switch 等的基础）、scripts、groups 和 automation。

## 与 core 交互

Home Assistant core 中的所有方法都有两种实现：异步版本和从其他线程调用的版本。其他版本只是以线程安全的方式调用 async 版本的包装器。

因此，如果你从回调或协程内部对 core（即 hass 对象）进行调用，请使用以 async\_ 开头的方法。如果你需要调用作为协程的 async\_ 函数，你的 task 也必须是协程。

## 实现异步 component

要使 component 变为异步，实现 async\_setup 即可。

```python
def setup(hass, config):
    """Set up component."""
    # Code for setting up your component outside of the event loop.
```

变成：

```python
async def async_setup(hass, config):
    """Set up component."""
    # Code for setting up your component inside of the event loop.
```

## 实现异步 platform

对于 platforms，我们支持异步 setup。将 `setup_platform` 改为协程 `async_setup_platform`。

```python
def setup_platform(hass, config, add_entities, discovery_info=None):
    """Set up platform."""
    # Code for setting up your platform outside of the event loop.
```

变成：

```python
async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Set up platform."""
    # Code for setting up your platform inside of the event loop.
```

与原参数的唯一区别是，`add_entities` 函数被替换为异步友好的回调 `async_add_entities`。

## 实现异步 entity

通过将 update 方法转换为异步，可以使你的 entity 支持异步。这要求你的 entity 的依赖项也必须支持异步！

```python
class MyEntity(Entity):
    def update(self):
        """Retrieve latest state."""
        self._state = fetch_state()
```

变成：

```python
class MyEntity(Entity):
    async def async_update(self):
        """Retrieve latest state."""
        self._state = await async_fetch_state()
```

确保你的 entity 上定义的所有 properties 不会导致执行 I/O。所有数据必须在 update 方法内部获取并缓存在 entity 上。这是因为这些 properties 在 event loop 内部被读取，执行 I/O 会导致 Home Assistant core 等待你的 I/O 完成。

## 从线程中调用异步函数

有时你可能在某个线程中，需要调用一个仅提供异步版本的函数。Home Assistant 包含一些异步辅助工具来帮助处理这种情况。

在以下示例中，`say_hello` 将调度 `async_say_hello` 并阻塞直到函数运行并获取结果。

```python
import asyncio


def say_hello(hass, target):
    return asyncio.run_coroutine_threadsafe(
        async_say_hello(hass, target), hass.loop
    ).result()


async def async_say_hello(hass, target):
    return f"Hello {target}!"
```

**警告：** 请小心！如果 async 函数使用了 executor jobs，可能导致死锁。

## 从异步上下文中调用同步函数

如果你在异步上下文中运行，有时可能需要调用同步函数。方法如下：

```python
# hub.update() 是同步函数。
result = await hass.async_add_executor_job(hub.update)
```

## 从异步上下文中启动独立 task

如果你希望生成一个不会阻塞当前异步上下文的 task，可以将其作为 event loop 上的 task 创建。它将与当前执行并行运行。

```python
hass.async_create_task(async_say_hello(hass, target))
```
