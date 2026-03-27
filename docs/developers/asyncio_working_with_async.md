---
title: "使用异步"
description: 'Home Assistant 提供了兼容层 API，但直接使用异步 Core 会快得多。Core 中的大多数组件都已经改写为异步版本，包括实体组件 helper（如灯、开关等的基础设施）、脚本、组和自动化。 本页属于 Home Assistant 开发者文档。'
---
# 使用异步

Home Assistant 提供了兼容层 API，但直接使用异步 Core 会快得多。Core 中的大多数组件都已经改写为异步版本，包括实体组件 helper（如灯、开关等的基础设施）、脚本、组和自动化。

## 与 Core 交互

Home Assistant Core 中的大多数方法都同时提供两种形式：异步版本，以及供其他线程调用的同步包装版本。后者本质上是以线程安全方式调用异步版本的包装器。

因此，如果你是在 callback 或 coroutine 中与 Core（`hass` 对象）交互，应优先使用以 `async_` 开头的方法。如果你要调用某个 `async_` 函数，你当前的函数本身也必须是 coroutine。

## 实现异步组件

要让组件支持异步，请实现 `async_setup`。

```python
def setup(hass, config):
    """Set up component."""
    # Code for setting up your component outside of the event loop.
```

改为：

```python
async def async_setup(hass, config):
    """Set up component."""
    # Code for setting up your component inside of the event loop.
```

## 实现异步平台

对于平台，也支持异步初始化。你需要实现 `async_setup_platform`，而不是 `setup_platform`。

```python
def setup_platform(hass, config, add_entities, discovery_info=None):
    """Set up platform."""
    # Code for setting up your platform outside of the event loop.
```

改为：

```python
async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Set up platform."""
    # Code for setting up your platform inside of the event loop.
```

与原始参数相比，唯一的区别是 `add_entities` 被异步安全的 callback `async_add_entities` 取代。

## 实现异步实体

你可以通过把更新方法改成异步形式，让实体支持异步更新。但前提是该实体依赖的库本身也支持异步。

```python
class MyEntity(Entity):
    def update(self):
        """Retrieve latest state."""
        self._state = fetch_state()
```

改为：

```python
class MyEntity(Entity):
    async def async_update(self):
        """Retrieve latest state."""
        self._state = await async_fetch_state()
```

要确保实体上定义的所有属性都不会触发 I/O。所有数据都必须在更新方法中获取并缓存在实体对象上。因为这些属性会从事件循环中被读取，一旦属性访问触发 I/O，就会导致 Home Assistant Core 卡住，直到 I/O 完成。

## 从线程调用异步函数

有时你会处于某个线程中，但需要调用一个只能异步使用的函数。Home Assistant 提供了一些 helper 来处理这种情况。

在下面的示例中，`say_hello` 会调度 `async_say_hello`，并阻塞当前线程直到函数执行完成并返回结果。

```python
import asyncio


def say_hello(hass, target):
    return asyncio.run_coroutine_threadsafe(
        async_say_hello(hass, target), hass.loop
    ).result()


async def async_say_hello(hass, target):
    return f"Hello {target}!"
```

**警告：** 请务必小心。如果异步函数内部又使用了 executor job，可能会导致死锁。

## 从异步代码调用同步函数

如果你在异步上下文中运行，有时仍然需要调用同步函数。写法如下：

```python
# hub.update() is a sync function.
result = await hass.async_add_executor_job(hub.update)
```

## 从异步代码启动独立任务

如果你想启动一个不会阻塞当前异步上下文的任务，可以把它创建为事件循环中的任务，让它并行执行。

```python
hass.async_create_task(async_say_hello(hass, target))
```
