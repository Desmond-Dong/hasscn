---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: "告别 time_changed 事件"
---

从 Home Assistant Core 0.113 开始，我们开始迁移到使用 asyncio event loop 来调度事件。

在 2022.5 版本中，我们很高兴地宣布此过程现已完成。传统的 `time_changed` 事件（也称为 `EVENT_TIME_CHANGED`）不再每秒触发一次。监听所有事件的集成不再需要过滤掉 `EVENT_TIME_CHANGED`。在单独线程中运行的集成可能会看到轻微的性能提升，因为它们不再每秒被唤醒。

在之前的实现中，消费者会订阅 `time_changed` 事件，并在每次触发时检查时间，看是否匹配。这种模式导致大量回调，其中大部分回调会拒绝事件并继续接收回调，直到达到预期时间。

如果你的 custom integration 仍然依赖监听 `time_changed` 事件，则需要迁移到使用内置的 event helpers 之一，在大多数情况下，它们可以直接替换（只需一行）。更多信息请参阅[集成文档中的事件监听说明](https://developers.home-assistant.io/docs/integration_listen_events#tracking-time-changes)。
