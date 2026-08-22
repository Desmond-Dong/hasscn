---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Store data 在 worker thread 中序列化现需 opt-in"
---

来自 `homeassistant/helpers/storage.py` 的 `Store` 类接受新的构造函数参数 `serialize_in_event_loop`

如果 `serialize_in_event_loop` 为 `True`（默认值）：
 - 传递给 `Store.async_delay_save` 的 `data_func` 从 event loop 调用
 - 传递给 `Store.async_delay_save` 的 `data_func` 产生的数据在 event loop 中序列化为 JSON
 - 传递给 `Store.async_save` 的数据在 event loop 中序列化为 JSON

如果 `serialize_in_event_loop` 为 `False`：
 - 传递给 `Store.async_delay_save` 的 `data_func` 从单独的 thread 调用，这意味着它必须是 thread-safe 的，且不得访问 hass 对象
 - 传递给 `Store.async_delay_save` 的 `data_func` 产生的数据在单独的 thread 中序列化为 JSON，这意味着它必须是 thread-safe 的
 - 传递给 `Store.async_save` 的数据在单独的 thread 中序列化为 JSON，这意味着它必须是 thread-safe 的

此行为已发生变更；以前传递给 `Store.async_delay_save` 的 `data_func` 总是从单独的 thread 调用，其产生的数据或传递给 `Store.async_save` 的数据以前总是由单独的 thread 序列化。

进行此项变更的原因是，之前并未文档说明 `data_func` 将由 event loop 以外的 thread 调用，或 JSON 序列化将在 event loop 以外的 thread 中发生，而 `data_func` 及其产生的数据或传递给 `Store.async_save` 的数据通常并非 thread-safe 的。

更多详情请参阅 [core PR 157158](https://github.com/home-assistant/core/pull/157158) 和 [core PR 157263](https://github.com/home-assistant/core/pull/157263)。