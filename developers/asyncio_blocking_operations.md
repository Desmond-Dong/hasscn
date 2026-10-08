在编写 asyncio 代码时，确保所有阻塞操作都在单独的线程中完成至关重要。如果阻塞操作发生在 event loop 中，在操作完成之前，其他什么都无法运行。因此，没有任何阻塞操作会发生在 event loop 中，因为整个系统将在阻塞操作的持续时间内停滞。
下面讨论了一些可能阻塞的操作的详细示例，例如网络 I/O 或重度计算。

:::tip
开发期间务必启用 [`asyncio` debug mode](https://docs.python.org/3/library/asyncio-dev.html#debug-mode) 和 [Home Assistant 内置的 debug mode](https://www.home-assistant.io/integrations/homeassistant/#debug)，因为许多阻塞 I/O 错误可以自动检测。
:::

## 解决 event loop 中的阻塞 I/O

你可能到达此页面是因为 Home Assistant 检测到并报告了 event loop 中的阻塞调用。从版本 2024.7.0 开始，Home Assistant 可以检测 event loop 中更多的阻塞操作，以防止系统不稳定。在 Home Assistant 能够检测这些错误之前，它们可能导致系统无响应或行为未定义。以下是纠正 event loop 中阻塞操作的一些提示。

## 在 executor 中运行阻塞调用

在 Home Assistant 中，这通常通过调用 `await hass.async_add_executor_job` 来实现。在库代码中，通常使用 `await loop.run_in_executor(None, ...)`。请查阅 Python 关于[运行阻塞代码](https://docs.python.org/3/library/asyncio-dev.html#running-blocking-code)的文档，以获取避免陷阱的提示。某些特定调用可能需要不同的方法。

```python
from functools import partial

def blocking_code(some_arg: str):
    ...

def blocking_code_with_kwargs(kwarg: bool = False):
    ...

# 在 Home Assistant 内部调用阻塞函数时
result = await hass.async_add_executor_job(blocking_code, "something")

result = await hass.async_add_executor_job(partial(blocking_code_with_kwargs, kwarg=True))

# 在库代码中调用阻塞函数时
loop = asyncio.get_running_loop()

result = await loop.run_in_executor(None, blocking_code, "something")

result = await loop.run_in_executor(None, partial(blocking_code_with_kwargs, kwarg=True))
```

### 特定函数调用

根据检测到的阻塞调用类型，解决方案可能更为复杂。

#### open

`open` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

:::warning
当修复在 event loop 中运行的 `open` 调用时，所有的阻塞读取和写入操作也必须修复为在 executor 中发生。Home Assistant 只能检测 `open` 调用，无法检测阻塞的读取和写入，这意味着如果阻塞的读取和写入调用没有在修复 `open` 调用的同时一并修复，它们可能会在很长时间内困扰集成用户，因为它们将非常难以发现。
:::

#### import\_module

参见 [使用 asyncio 导入代码](/developers/asyncio_imports.md)

#### sleep

阻塞式的 sleep 应替换为 `await asyncio.sleep`。在 event loop 中报告最常见的阻塞 `sleep` 是 `pyserial-asyncio`，可以替换为 [`pyserial-asyncio-fast`](https://github.com/home-assistant-libs/pyserial-asyncio-fast)，它没有这个问题。

#### putrequest

urllib 执行阻塞 I/O，应使用上述标准方法在 executor 中运行。考虑将集成转换为使用 `aiohttp` 或 `httpx`。

#### glob

`glob.glob` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### iglob

`glob.iglob` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### walk

`os.walk` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### listdir

`os.listdir` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### scandir

`os.scandir` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### stat

`os.stat` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### write\_bytes

`pathlib.Path.write_bytes` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### write\_text

`pathlib.Path.write_text` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### read\_bytes

`pathlib.Path.read_bytes` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### read\_text

`pathlib.Path.read_text` 执行阻塞磁盘 I/O，应使用上述标准方法在 executor 中运行。

#### load\_default\_certs

`SSLContext.load_default_certs` 执行阻塞磁盘 I/O 以从磁盘加载证书。

以下辅助方法确保阻塞 I/O 将在 executor 中发生：

* `aiohttp`：使用 `homeassistant.helpers.aiohttp_client.async_get_clientsession` 创建 `aiohttp.ClientSession`。
* `httpx`：使用 `homeassistant.helpers.httpx_client.get_async_client` 创建 `httpx.AsyncClient`。
* 通用 SSL：`homeassistant.util.ssl`

#### load\_verify\_locations

参见 [SSLContext.load\_default\_certs](#load_default_certs)

#### load\_cert\_chain

参见 [SSLContext.load\_default\_certs](#load_default_certs)

#### set\_default\_verify\_paths

参见 [SSLContext.load\_default\_certs](#load_default_certs)
