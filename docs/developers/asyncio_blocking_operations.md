---
title: "使用 asyncio 处理阻塞操作"
description: '编写 asyncio 代码时，必须确保所有阻塞操作都在独立线程中执行。如果在事件循环中发生阻塞操作，那么在它完成之前，其它任何任务都无法运行；换句话说，整个系统都会在阻塞期间停住。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 使用 asyncio 处理阻塞操作

编写 asyncio 代码时，必须确保所有阻塞操作都在独立线程中执行。如果在事件循环中发生阻塞操作，那么在它完成之前，其它任何任务都无法运行；换句话说，整个系统都会在阻塞期间停住。

下面会介绍常见的阻塞操作，例如网络 I/O 和高开销计算，以及对应的处理方式。

:::tip
开发时请务必启用 [`asyncio` 调试模式](https://docs.python.org/3/library/asyncio-dev.html#debug-mode) 和 [Home Assistant 的调试模式](https://www.home-assistant.io/integrations/homeassistant/#debug)。这样可以自动发现许多阻塞 I/O 的错误。
:::

## 解决事件循环中的阻塞 I/O

如果你来到这个页面，很可能是因为 Home Assistant 检测到了事件循环中的阻塞调用并进行了报告。从 2024.7.0 开始，Home Assistant 可以检测更多类型的阻塞操作，以避免系统卡顿。这类错误可能导致系统无响应或出现未定义行为。下面是修复这类问题的一些建议。

## 在 executor 中运行阻塞调用

在 Home Assistant 中，通常使用 `await hass.async_add_executor_job(...)`。在库代码中，通常使用 `await loop.run_in_executor(None, ...)`。可参考 Python 文档中的[运行阻塞代码](https://docs.python.org/3/library/asyncio-dev.html#running-blocking-code)，了解更多注意事项。某些具体调用可能还需要额外处理。

```python
from functools import partial

def blocking_code(some_arg: str):
    ...

def blocking_code_with_kwargs(kwarg: bool = False):
    ...

# When calling a blocking function inside Home Assistant
result = await hass.async_add_executor_job(blocking_code, "something")

result = await hass.async_add_executor_job(partial(blocking_code_with_kwargs, kwarg=True))

# When calling a blocking function in your library code
loop = asyncio.get_running_loop()

result = await loop.run_in_executor(None, blocking_code, "something")

result = await loop.run_in_executor(None, partial(blocking_code_with_kwargs, kwarg=True))
```

### 具体函数调用

根据检测到的阻塞调用类型，修复方式可能会更具体。

#### open

`open` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

:::warning
修复事件循环中的 `open` 调用时，也必须一并修复后续的阻塞读取和写入操作，确保它们也在 executor 中执行。Home Assistant 只能检测 `open`，无法检测阻塞的读写调用；如果只修复了 `open` 而遗漏后续读写，问题依然会存在，而且往往更难定位。
:::

#### 导入模块

参见[使用 asyncio 导入代码](/developers/asyncio_imports)。

#### sleep

阻塞式休眠应替换为 `await asyncio.sleep(...)`。事件循环中最常见的阻塞 `sleep` 问题来自 `pyserial-asyncio`；可以改用不包含该问题的 [`pyserial-asyncio-fast`](https://github.com/home-assistant-libs/pyserial-asyncio-fast)。

#### putrequest

`urllib` 确实会执行阻塞 I/O，应按上面的标准方式放到 executor 中运行。也可以考虑将集成迁移到 `aiohttp` 或 `httpx`。

#### glob.glob

`glob.glob` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### glob.iglob

`glob.iglob` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### os.walk

`os.walk` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### os.listdir

`os.listdir` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### os.scandir

`os.scandir` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### os.stat

`os.stat` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### pathlib.Path.write_bytes

`pathlib.Path.write_bytes` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### pathlib.Path.write_text

`pathlib.Path.write_text` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### pathlib.Path.read_bytes

`pathlib.Path.read_bytes` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### pathlib.Path.read_text

`pathlib.Path.read_text` 会触发磁盘 I/O，应按上面的标准方式放到 executor 中运行。

#### SSLContext.load_default_certs

`SSLContext.load_default_certs` 会从磁盘加载证书，因此会产生磁盘 I/O。

下面这些 helper 可以确保相关阻塞 I/O 在 executor 中执行：

- `aiohttp`：使用 `homeassistant.helpers.aiohttp_client.async_get_clientsession` 创建 `aiohttp.ClientSession`
- `httpx`：使用 `homeassistant.helpers.httpx_client.get_async_client` 创建 `httpx.AsyncClient`
- 通用 SSL：使用 `homeassistant.util.ssl`

#### SSLContext.load_verify_locations

参见 [`SSLContext.load_default_certs`](#sslcontextload_default_certs)。

#### SSLContext.load_cert_chain

参见 [`SSLContext.load_default_certs`](#sslcontextload_default_certs)。

#### SSLContext.set_default_verify_paths

参见 [`SSLContext.load_default_certs`](#sslcontextload_default_certs)。
