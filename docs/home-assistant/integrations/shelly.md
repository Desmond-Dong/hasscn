---
title: Shelly
description: 集成 Shelly 设备
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Energy
  - Event
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Text
  - Update
  - Valve
ha_release: 0.115
ha_codeowners:
  - '@bieniu'
  - '@thecode'
  - '@chemelli74'
  - '@bdraco'
ha_iot_class: Local Push
ha_domain: shelly
featured: true
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - light
  - number
  - select
  - sensor
  - switch
  - text
  - update
  - valve
ha_integration_type: device
ha_quality_scale: platinum
---

将 [Shelly 设备](https://shelly.com)集成到 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "Shelly 设备的主机名或 IP 地址。您可以在路由器中找到它。"
Port:
    description: "设备的自定义 TCP 端口。仅当设备通过 Shelly 范围扩展器连接时才更改此项。"
```

## Options

To define options for Shelly, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Shelly are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Bluetooth scanner mode:
  description: "用于蓝牙扫描的扫描器模式。蓝牙扫描可以是主动或被动的。主动模式下，Shelly 向附近设备请求数据。被动模式下，Shelly 接收来自附近设备的主动提供的数据。"
```

## Shelly 设备代次

设备有四代，本集成支持所有代次。设备配置方式以及代次之间实体和设备的命名存在一些差异。

Shelly BLU 系列设备（例如 Shelly BLU H&T）不受支持；请使用 BTHome 集成在 Home Assistant 中配置此类设备。例外的是 Shelly BLU TRV，它通过 Shelly BLU Gateway Gen3 受本集成支持。

## 数据更新

Shelly 设备在设备所有主要功能发生变化时向 Home Assistant 推送更新。为了使推送更新正常工作，某些设备需要额外配置：

### Shelly 设备配置（第一代）

第一代设备使用 `CoIoT` 协议与集成通信。必须在设备设置中启用 `CoIoT`。导航到 Shelly 设备的本地 IP 地址，**Internet & Security** > **ADVANCED - DEVELOPER SETTINGS** 并勾选 **Enable CoIoT** 复选框。

我们建议使用 `unicast` 进行通信。要启用此功能，请在 **CoIoT peer** 字段中输入 Home Assistant 服务器的本地 IP 地址和端口 `5683`，然后按 **SAVE** 按钮。**这对电池供电设备是强制性的**（即使 USB 连接）。更改 **CoIoT peer** 后，需要手动重启 Shelly 设备。

如果来自此设备的推送更新未到达 Home Assistant 服务器，Home Assistant 将为 Shelly 设备显示修复问题。

以下列表将帮助您诊断和解决问题：

- 检查您的 Shelly 设备是否正确配置了 `CoIoT peer`。
- 如果您在设备的 Web 面板中找不到 `CoIoT peer` 设置，它可能使用的是古老的固件版本，您应该将其更新到当前版本。
- 如果 Shelly 设备与 Home Assistant 服务器位于不同的子网，您应确保这些子网之间 `UDP` 端口 `5683` 上的通信。
- 如果 Home Assistant 作为虚拟机或服务在 Home Assistant OS 以外的操作系统上运行，您应在设备防火墙上打开 `UDP` 端口 `5683` 和/或确保来自此端口的通信重定向到 Home Assistant 服务。
- 缺少推送更新可能与 WiFi 网络范围有关。如果使用具有多个接入点的 WiFi 网络，请启用 **Internet & Security** >> **WiFi Client AP Roaming** 选项。考虑将 Shelly 设备移近 WiFi 接入点。考虑添加另一个 WiFi 接入点，这将改善与设备的连接质量。
- 如果您认为您的 Shelly 设备工作正常且不想更改网络/配置，您可以忽略修复问题。但是，您必须知道您将放弃在 Home Assistant 中使用第一代 Shelly 设备的最佳体验。

### Shelly 设备配置（第二代+）

第二代+设备使用 `RPC` 协议与集成通信。**电池供电设备**（即使 USB 连接）如果 Home Assistant 无法正确确定您实例的内部 URL，或者出站 WebSocket 之前配置给了不同的 Home Assistant 实例，可能需要手动出站 WebSocket 配置。在这种情况下，导航到 Shelly 设备的本地 IP 地址，**Settings** >> **Connectivity** >> **Outbound WebSocket** 并勾选 **Enable Outbound WebSocket** 复选框，在服务器下输入以下地址：

`ws://` + `Home_Assistant_本地IP地址:端口` + `/api/shelly/ws`（例如：`ws://192.168.1.100:8123/api/shelly/ws`），点击 **Apply** 保存设置。