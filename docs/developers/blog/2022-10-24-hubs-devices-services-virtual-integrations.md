---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorImageURL: /img/profile/frenck.png
authorTwitter: frenck
title: 引入虚拟集成并区分 hub、device 和 service
---

在 2022.11 版本中，我们调整了集成清单，
以更好地区分 hub、device 和 service。此外，
我们还引入了一种新类型的集成：虚拟集成。

## 区分 hub、device 和 service

一个容易混淆的方面是：config entry 可以集成单个设备（ESPHome），
也可以通过 hub 集成一系列设备（Hue），或者集成一个 service（AdGuard）。

我们希望近期在 UI 中开始区分这些类型，
但目前无法做到，因为集成并没有暴露此信息。

我们已经有 [`integration_type`](/developers/creating_integration_manifest#integration-type)
清单属性，现在已扩展以支持这些新类型：

- `device`：集成一次集成一个设备。
- `hub`：集成多个设备。
- `service`：集成一个服务。

`hub` 与 `service` 或 `device` 的区别由
集成本身的性质决定。`hub` 提供对多个其他
设备或服务的网关。`service` 和 `device` 是每个 config entry 提供
单个设备或服务的集成。

:::caution
当 [`integration_type`](/developers/creating_integration_manifest#integration-type)
未设置时，我们将其自动默认为 `hub`。这是一个临时降级方案。
未来我们将要求显式设置 [`integration_type`](/developers/creating_integration_manifest#integration-type)。

请将您现有的（自定义）集成更新为在集成清单中设置正确的 `integration_type`。
:::

## 虚拟集成

有些产品由不以产品名称命名的集成支持。
例如，Roborock 吸尘器通过 Xiaomi Miio 集成进行集成。

也有一些产品线仅支持标准 IoT 协议
如 Zigbee 或 Z-Wave。例如，U-tec ultraloq 通过 Z-Wave 工作，
并且没有专门的集成。

对于终端用户来说，找到如何将这些产品
与 Home Assistant 集成可能会令人困惑。为解决上述情况，我们引入：
[虚拟集成](/developers/creating_integration_manifest#virtual-integration)。

虚拟集成不是真正的集成，而是用于帮助用户
找到适合其设备的正确集成。它们只有一个 manifest
文件，没有任何附加代码。

虚拟集成有两种类型：由另一个集成支持的虚拟集成，以及使用现有 IoT 标准的虚拟集成。

[在开发者文档中了解更多信息。](/developers/creating_integration_manifest#virtual-integration)

## 移除支持的 brands 功能

虚拟集成取代了之前的"supported brands"功能。该
功能仅被 Home Assistant Core 集成使用，所有这些集成都已
迁移为使用虚拟集成。

因此已无使用该功能的情况，支持的 brands 功能已
在未经弃用期的情况下被移除。