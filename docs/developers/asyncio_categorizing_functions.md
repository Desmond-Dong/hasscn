---
title: "分类函数"
---

Home Assistant 中的一项工作由将被调用的函数表示。它将在我们的 event loop 或我们的 thread pool 中运行，具体取决于它是否是 async safe。

Home Assistant 使用一种约定：所有必须在 event loop 内运行的函数都以 `async_` 为前缀。

## 协程函数（Coroutine function）

协程是基于 Python 生成器语法的特殊函数，允许它们在等待结果时挂起执行。

调用协程函数将返回一个 Generator 对象，但实际上不会开始执行。当该对象被 await（从另一个协程中）或被调度到 event loop 上时，它将执行该任务。

要将函数声明为协程，在函数定义的 `def` 之前添加 `async`。

```python
async def async_look_my_coroutine(target):
    result = await entity.async_turn_on()
    if result:
        print(f"hello {target}")


hass.loop.create_task(async_look_my_coroutine("world"))
```

在这个示例中，我们通过调用 `hass.loop.create_task` 来调度协程。这会将协程添加到待执行任务队列中。当 event loop 运行 `async_look_my_coroutine` 时，在调用 `await entity.async_turn_on()` 时会挂起该任务。此时会调度一个新任务来执行 `entity.async_turn_on()`。当该任务执行完毕后，`async_look_my_coroutine` 将恢复。

## 回调函数（Callback function）

这是一种被认为在 event loop 内运行安全的普通函数。回调函数无法挂起自身，因此不能执行任何 I/O 或调用协程。回调函数可以调度新任务，但无法等待结果。

要将函数声明为回调，从 core 包中导入 callback 注解并注解你的函数。

在 Home Assistant 中，回调的一个常见用例是作为 event 或 service action 调用的监听器。它可以处理传入的信息，然后调度需要进行的正确调用。以下是来自自动化引擎的示例。

```python
from homeassistant.core import callback


@callback
def async_trigger_service_handler(service_call):
    """处理自动化触发器 service action 调用。"""
    vars = service_call.data.get(ATTR_VARIABLES)
    for entity in component.async_extract_from_service(service_call):
        hass.loop.create_task(entity.async_trigger(vars, True))
```

在这个示例中，`entity.async_trigger` 是一个协程函数。调用协程函数将返回一个协程任务。传入的参数将在任务执行时使用。

要执行任务，我们需要将其调度到 event loop 上执行。这是通过调用 `hass.loop.create_task` 完成的。

### 为什么还要有回调？

你可能想知道，如果协程能做回调能做的所有事情，为什么还要有回调。原因是性能和 core API 对象更好的状态一致性。

当协程 A 等待协程 B 时，它会挂起自身并调度一个新任务来运行 B。这意味着 event loop 现在运行 A、B，然后再运行 A。如果 B 是回调函数，A 永远不需要挂起自身，因此 event loop 只需运行 A。一致性方面的影响是，其他排队在 event loop 上运行的事件将继续等待直到回调完成，但在让出给另一个协程时将被交错。

## Event loop 和线程安全

这些函数在 thread 和 event loop 内运行都是安全的。这些函数通常执行计算或在内存中转换数据。任何执行 I/O 的操作都不属于此类别。许多标准库函数都属于此类别。例如使用 sum 生成一组数字的总和或合并两个字典。

没有特殊的注解来标记函数属于此类别，在从 event loop 内使用这些函数时应谨慎。如有疑问，请查看它们的实现。

## 其他函数

这些都是不符合前面任何类别的函数。这些函数要么是线程安全的，要么被认为在 event loop 内运行不安全。这些是使用 sleep 或执行 I/O 的函数。

被归入此类别不需要特殊注解。
