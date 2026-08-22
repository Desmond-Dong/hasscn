---
author: epenet
authorURL: https://github.com/epenet
title: "ServiceInfo model 改进和弃用"
---

从 Home Assistant Core 2022.6 开始，通过此前已弃用的 dictionary 方法访问 discovery 信息的能力已被移除。

这适用于 `DhcpServiceInfo`、`MqttServiceInfo`、`SsdpServiceInfo`、`UsbServiceInfo` 和 `ZeroconfServiceInfo` 实例。

Custom integrations 需要迁移到使用新的 dataclass properties。
