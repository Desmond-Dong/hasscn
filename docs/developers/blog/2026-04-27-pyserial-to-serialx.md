---
author: Nikita Nikishin
authorURL: https://github.com/puddly
title: "认真对待 serial：从 pyserial 迁移到 serialx"
---

与 serial port 通信的现有集成和库应从 `pyserial`、`pyserial-asyncio` 和 `pyserial-asyncio-fast` 迁移到 [`serialx`](https://github.com/puddly/serialx)。这个新库在所有平台上都原生支持 asyncio，将使你的集成和库能够利用 Home Assistant 中的 [ESPHome serial proxies](https://esphome.io/components/serial_proxy/)，并包含对 asyncio event loop 稳定性的关键修复。

## 背景

多年来，`pyserial` 一直是 Python 中的事实标准 serial 库，并对所有流行平台有广泛支持。然而，其 API 早于 Python 中的 asyncio，且仅支持 sync。后来发布了 `pyserial-asyncio` 包以桥接 `pyserial` 与 asyncio。不幸的是，`pyserial-asyncio` 的开发从未达到 1.0 稳定性或跨平台支持，而且 `pyserial` 和 `pyserial-asyncio` 在近五年内都没有 PyPI 发布。我们 fork 了 `pyserial-asyncio` 并发布了 [`pyserial-asyncio-fast`](/developers/blog/2026-01-05-pyserial-asyncio-fast)，以修复影响 Core event loop 稳定性的未解决问题。

我们从零开发了 `serialx`，作为一个现代的 Python serial 库，具有原生的 sync 和 async APIs。它与 `serial`、`serial_asyncio` 和 `serial_asyncio_fast` 模块兼容，允许现有包以极少的变更（如果有的话）进行迁移。

## 迁移

`serialx` 文档有一个 [详尽的迁移指南](https://puddly.github.io/serialx/how-to/pyserial-migration.html)，提供了更多细节。

大多数包只需在 `setup.py` 或 `pyproject.toml` 文件中用 `serialx` 替换 `pyserial`、`pyserial-asyncio` 和 `pyserial-asyncio-fast`，并更新异常处理，将宽泛捕获 `SerialException` 替换为更细粒度的错误处理（如 `OSError` 和 `TimeoutError`）。

直接构造 sync `serial.Serial()` 对象的包应迁移到使用 `serialx.serial_for_url()` helper，以确保自动兼容所有支持的协议。

### 给 agent 的 prompt

迁移本身是机械性的，将以下指令粘贴到你选择的 agent 中：

> 将我的代码从 pyserial、pyserial-asyncio 和 pyserial-asyncio-fast 迁移到 serialx，使用
> https://raw.githubusercontent.com/puddly/serialx/refs/heads/dev/docs/how-to/pyserial-migration.md
