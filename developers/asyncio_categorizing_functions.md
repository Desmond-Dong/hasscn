# 函数分类

在 Home Assistant 中，工作是通过函数来表示的。函数究竟运行在事件循环中，还是在线程池中执行，取决于它是否适合在异步环境中安全运行。

Home Assistant 约定：所有必须在事件循环中运行的函数，都以 `async_` 为前缀。

## 协程函数

协程是基于 Python 生成器语法扩展出来的一类特殊函数，允许它们在等待结果时暂停执行。

调用协程函数会返回一个 coroutine 对象，但不会立刻开始执行。只有当这个对象被 `await`，或者被调度到事件循环上之后，函数才会真正运行。

要把一个函数声明为协程，只需在 `def` 前加上 `async`。

```python
async def async_look_my_coroutine(target):
    result = await entity.async_turn_on()
    if result:
        print(f"hello {target}")


hass.loop.create_task(async_look_my_coroutine("world"))
```

在这个示例中，我们通过调用 `hass.loop.create_task` 来调度协程。这样会把协程加入待运行任务队列。当事件循环运行 `async_look_my_coroutine` 时，它会在执行 `await entity.async_turn_on()` 时挂起。此时会调度新的任务去执行 `entity.async_turn_on()`；等那个任务完成后，`async_look_my_coroutine` 会继续执行。

## 回调函数

回调函数是普通函数，但被认为可以安全地在事件循环中直接运行。回调不能自行挂起，不能执行 I/O，也不能直接等待协程结果。它可以调度新的任务，但不能 `await`。

要将函数标记为回调，请从 Core 导入 `callback` 装饰器并应用到函数上。

Home Assistant 中的典型场景，是将 callback 作为事件监听器或服务处理器。它可以先处理收到的数据，再调度真正的异步操作。自动化引擎就是一个例子。

```python
from homeassistant.core import callback


@callback
def async_trigger_service_handler(service_call):
    """Handle automation trigger service action call."""
    vars = service_call.data.get(ATTR_VARIABLES)
    for entity in component.async_extract_from_service(service_call):
        hass.loop.create_task(entity.async_trigger(vars, True))
```

在这个例子中，`entity.async_trigger` 是一个协程函数。调用它会返回一个 coroutine 对象，并在调度后使用给定参数执行。

为了真正执行这个任务，我们必须把它调度到事件循环中，也就是调用 `hass.loop.create_task`。

### 为什么还需要回调？

你可能会问：既然协程能完成回调能做的一切，为什么还需要回调？原因在于性能和状态一致性。

当协程 A 等待协程 B 时，A 会挂起自己，并安排新的任务去运行 B。这意味着事件循环会运行 A、再运行 B、然后再回到 A。如果 B 是 callback，那么 A 就不需要挂起，事件循环只需连续运行 A。这样可以减少任务切换，也能让状态变化更连贯；否则，其他事件可能会插入到两次协程执行之间。

## 可在线程和事件循环中安全运行的函数

这类函数既可以在线程中运行，也可以在事件循环中运行。它们通常只在内存中做计算或转换数据，不涉及任何 I/O。很多标准库函数都属于这一类，例如用 `sum` 汇总一组数字，或合并两个字典。

这类函数没有专门的装饰器标记；如果打算在事件循环中调用它们，需要自行确认实现是否安全。不确定时，请查看源码。

## 其他函数

凡是不属于以上几类的函数，都归为这一类。它们要么是线程安全的同步函数，要么不适合在事件循环中运行；典型例子是包含 `sleep` 或执行 I/O 的函数。

这类函数也不需要特殊标记。
