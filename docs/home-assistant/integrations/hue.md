---
title: Philips Hue
description: 关于在 Home Assistant 中设置 Philips Hue 的说明。
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
featured: true
ha_release: '0.60'
ha_config_flow: true
ha_codeowners:
  - '@marcelveldt'
ha_domain: hue
ha_homekit: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - event
  - light
  - scene
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

**Philips Hue** integration 允许您控制和监控连接到 Hue 网桥的灯光和传感器。

目前 Home Assistant 支持以下设备类型：

- 灯光
- 动作传感器（包括温度和光照级别传感器）
- Hue 遥控器/开关（作为自动化的设备触发器，当它们是电池供电时也作为电池传感器公开）


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Hue 区域和房间的灯光

Hue 概念基于房间和区域。虽然底层 Hue 灯光直接公开给 Home Assistant，但与 Hue 生态系统的 `分组灯光` 交互也可能很有用，例如，同时打开/关闭 Hue 组中的所有灯光。

Home Assistant 会为每个 Hue 区域/房间自动创建灯光，但默认情况下禁用它们。
如果您想使用这些 `分组灯光`，可以从 设置 --> 集成 --> Hue --> 实体 中启用它们。

## 场景

在 Hue 概念中，您可以为房间和区域内的灯光创建（动态）场景。您可以在 iOS 和 Android 上的（官方）Hue 应用程序中创建、编辑和删除 Hue 场景。每个区域/房间可以分配自己的场景，并且有大量特定心情的预设场景库。这些 Hue 场景会自动导入 Home Assistant，并作为 `场景实体` 提供。不支持在 Home Assistant 中创建或编辑 Hue 场景。

建议使用 Hue 场景一次性控制多个灯光以获得流畅的体验。如果您单独控制多个灯光和/或使用 Home Assistant 场景，每个灯光命令将逐个发送到每个灯光，这不会提供很好的用户体验，而使用 Hue 场景会以优化的方式一次性向所有灯光发送命令，从而获得流畅的体验。

### 动作：激活场景

`hue.activate_scene` 动作通过允许您激活 Hue 场景并同时设置一些属性（例如动态模式和/或亮度）来提供对 Hue 场景的更多控制。

| 数据属性 | 必需 | 描述                                                                                   |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `entity_id`            | 是      | 您要激活的 Hue 场景实体的实体 ID。                                       |
| `transition`           | 否       | 将设备带到场景中定义的状态所需的过渡持续时间（秒）。 |
| `dynamic`              | 否       | 启用 (true) 或禁用 (false) 场景的动态模式。                                  |
| `speed`                | 否       | 设置此场景（动态调色板）的速度。                                        |
| `brightness`           | 否       | 设置此场景的亮度。                                                             |

例如，如果您想启动/停止动态模式，可以使用此动作。

## Hue 遥控器和开关

Hue 遥控器（如调光开关）是无状态设备，这意味着它们没有像 Home Assistant 中的常规实体那样的开/关状态。相反，此类设备在按下按钮时会发出 `hue_event` 事件。您可以使用 Home Assistant 中的事件 [**设置** > **开发者工具** > **事件**](https://my.home-assistant.io/redirect/developer_events/) 测试收到的事件，并订阅 `hue_event`。一旦您知道事件数据的样子，您就可以使用它来创建自动化。

:::note
在撰写本文时，Hue API 有一个限制，即每个设备每秒只能发送一个事件。这意味着按钮事件被限制为每秒 1 个。这已引起 Signify 的注意，希望能很快修复。

:::
## 支持传统 (V1) Hue 网桥

Philips/Signify 发布了新版本的 Hue 网桥（方形），其传统/V1 网桥（圆形）现已停产，不再受其支持。Home Assistant 将继续支持 V1 Hue 网桥，只要技术上可行，但有一些限制：

- 不会为 V1 网桥自动创建场景实体。要从 Home Assistant 在 V1 网桥上激活 Hue 场景，有一个可以按名称执行此操作的动作。
- V1 网桥上设备/实体的状态更新不会即时接收，而是按间隔轮询。
- 不会为 V1 网桥自动创建 Hue 房间的灯光实体，您可以在集成的选项中选择为房间创建实体。

对于 v1 Hue 网桥，您可以使用 **脚本** 选项卡创建脚本。
1. 选择 **添加新脚本** > **添加动作** > **Philips Hue: 激活场景**
2. 然后在 **组** 字段中选择适当的房间名称，在 **场景** 字段中选择存储在您的 Hue 网桥上的场景名称。