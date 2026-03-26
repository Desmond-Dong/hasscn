---
title: 核心架构
sidebar_label: Core
---

Home Assistant Core 由四个主要部分组成。除此之外，它还包含许多帮助程序类来处理常见场景，例如提供实体或处理位置。

- **事件唤醒**：促进事件的触发和监听——Home Assistant 的心脏。
- **状态机**：跟踪事物的状态并在状态更改时触发 `state_changed` 事件。
- **服务**：在事件上监听`call_service`事件，允许并其他代码注册服务操作。
- **计时器**：在事件上每1秒发送一个`time_changed`事件。

<img class='invertDark'
alt='Home Assistant Core 架构概述'
src='/developers/img/en/architecture/ha_architecture.svg'
/>
