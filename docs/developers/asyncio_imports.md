---
title: "使用 asyncio 导入代码"
description: '在 asyncio 环境中，判断何时可以安全导入代码并不总是容易，因为存在两个限制：。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 使用 asyncio 导入代码

在 asyncio 环境中，判断何时可以安全导入代码并不总是容易，因为存在两个限制：

- 导入模块时，Python 可能需要从磁盘加载文件，这会产生阻塞 I/O
- [CPython 的导入机制不是线程安全的](https://github.com/python/cpython/issues/83065)

## 模块级导入

如果导入发生在**模块级**（也就是常规导入位置），并且所有必需模块都在 `__init__.py` 中导入，那么 Home Assistant 会在**事件循环启动前**，或通过**import executor** 在后台线程中加载你的集成。

在这种情况下，导入通常会被安全处理，因此你**通常不需要担心**它们是否对事件循环安全。

## 在模块级之外导入

如果导入不在模块级进行，就必须仔细评估每一次导入。导入机制需要从磁盘读取模块文件，这可能导致阻塞 I/O。通常情况下，最好改成模块级导入，因为这样能降低复杂度和出错风险。导入模块既消耗 CPU，也可能涉及阻塞 I/O，因此需要确保这些操作在合适的线程中执行。

如果你可以确定某个模块已经被导入，那么直接使用普通的 [`import`](https://docs.python.org/3/reference/simple_stmts.html#import) 语句是安全的，因为 Python 不会重复加载它。

如果集成始终都会使用某个模块，通常最好在 `__init__.py` 中进行模块级导入，以确保模块被提前加载。不过，如果这样会产生循环导入，就需要改用下面的方案之一。

如果该模块只在特定条件下使用，并且只会在单个位置导入，可以使用标准的 executor 调用：

- 在 Home Assistant 内部导入：`hass.async_add_executor_job(_function_that_does_late_import)`
- 在 Home Assistant 外部导入：[`loop.run_in_executor(None, _function_that_does_late_import)`](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor)

如果应用的不同部分可能同时导入同一个模块，请使用线程安全的 `homeassistant.helpers.importlib.import_module` helper。

如果模块可能通过多个不同路径被导入，请使用 `async_import_module`。例如：

```python
from homeassistant.helpers.importlib import async_import_module

platform = await async_import_module(hass, f"homeassistant.components.homeassistant.triggers.{platform_name}")
```

## 判断模块是否已加载

如果你不确定某个模块是否已经加载，可以检查 [`sys.modules`](https://docs.python.org/3/library/sys.html#sys.modules)。但要注意，模块一开始加载就会出现在 `sys.modules` 中，而 [CPython 的导入机制不是线程安全的](https://github.com/python/cpython/issues/83065)。因此，当代码可能通过多个路径触发导入时，一定要认真考虑竞争条件。

## 避免仅用于类型检查的导入

如果导入的模块只用于类型检查，建议使用 `if TYPE_CHECKING:` 进行保护，避免在运行时导入它。

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from some_module import SomeClass  # Only imported for type checking

def some_function() -> SomeClass:
    # Function implementation
    pass
```

## 避免导入很少使用的代码

导入模块会占用 CPU 和 I/O 资源，因此应尽量避免导入很少使用的代码。虽然在模块级正常导入会带来一定启动开销，但如果某段代码只会偶尔用到，延迟导入通常更合适。这样可以只在真正需要时才消耗资源，从而减少不必要的处理并提升整体性能。
