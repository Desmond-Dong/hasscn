---
title: "使用 asyncio 导入代码"
---

在使用 asyncio 时，确定何时可以安全地导入代码可能很棘手，因为需要考虑两个约束：

- 导入代码可能会执行阻塞 I/O 来从磁盘加载文件
- 在 [cpython 中导入代码不是线程安全的](https://github.com/python/cpython/issues/83065)

## 模块级导入

如果你的导入在**模块级**（也称为**顶层导入**），并且所有必要的模块都在 `__init__.py` 中导入，Home Assistant 将在 **event loop 启动之前** 或在后台线程中使用 **import executor** 加载你的集成。

在这种情况下，你的导入通常会被安全地处理，所以你**不需要担心**它们是否是 event-loop safe。

## 模块级之外的导入

如果你的导入不是在模块级进行的，你必须仔细考虑每个导入，因为导入机制需要从磁盘读取模块，这会执行阻塞 I/O。如果可能的话，通常最好改为模块级导入，因为它避免了大量复杂性和出错风险。导入模块既消耗 CPU，又涉及阻塞 I/O，因此确保这些操作在 executor 中执行至关重要。

如果你能确定模块已经被导入，那么使用裸 [`import`](https://docs.python.org/3/reference/simple_stmts.html#import) 语句是安全的，因为 Python 不会再次加载模块。

如果集成将始终使用该模块，通常最好在 `__init__.py` 中包含模块级导入，以确保模块被加载。然而，如果这导致循环导入，则需要改用下面解决方案之一。

如果模块仅在条件性使用时才会导入，并且只会在一个地方导入，则可以使用标准的 executor 调用：

- 对于 Home Assistant 内部的导入：`hass.async_add_executor_job(_function_that_does_late_import)`
- 对于 Home Assistant 外部的导入：[`loop.run_in_executor(None, _function_that_does_late_import)`](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor)

如果同一个模块可能在应用程序的不同部分并发导入，请使用线程安全的 `homeassistant.helpers.importlib.import_module` 辅助函数。

如果模块可能从多个不同路径导入，请使用 `async_import_module`：
示例：

```python
from homeassistant.helpers.importlib import async_import_module

platform = await async_import_module(hass, f"homeassistant.components.homeassistant.triggers.{platform_name}")
```

## 确定模块是否已加载

如果你不确定模块是否已经加载，可以检查模块是否已经在 [`sys.modules`](https://docs.python.org/3/library/sys.html#sys.modules) 中。你应该知道，模块一旦开始加载就会出现在 `sys.modules` 中，并且 [cpython 的导入不是线程安全的](https://github.com/python/cpython/issues/83065)。因此，当代码可能从多个路径导入时，考虑竞态条件非常重要。

## 避免仅用于类型检查的导入

如果导入的模块仅用于类型检查，建议用 `if TYPE_CHECKING:` 块对其进行保护，以避免在运行时导入。

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from some_module import SomeClass  # 仅用于类型检查时导入

def some_function() -> SomeClass:
    # 函数实现
    pass
```

## 避免导入很少使用的代码

导入模块既可能消耗 CPU 也可能消耗 I/O，因此避免导入很少使用的代码非常重要。虽然在模块级之外导入代码确实会增加一些运行时开销，但当代码仅在偶尔需要时才需要时，这种方法通常更高效。通过延迟导入，确保资源仅在必要时使用，减少不必要的处理并提高整体性能。
