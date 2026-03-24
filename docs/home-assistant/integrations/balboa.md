---
title: Balboa Spa Client
description: 关于如何在 Home Assistant 中集成 Balboa Spa WiFi 的说明。
ha_category:
  - Binary sensor
  - Climate
  - Fan
  - Light
  - Select
ha_release: 2021.12
ha_iot_class: Local Push
ha_domain: balboa
ha_platforms:
  - binary_sensor
  - climate
  - event
  - fan
  - light
  - select
  - switch
  - time
ha_codeowners:
  - '@garbled1'
  - '@natekspencer'
ha_config_flow: true
ha_integration_type: device
ha_dhcp: true
---

**Balboa Spa Client** 集成添加了对 [Balboa](https://www.balboawatergroup.com/) Spa WiFi 模块在 Home Assistant 中使用的支持。

目前 Home Assistant 支持以下设备类型：

- 二值传感器（过滤周期和循环泵）
- 气候
- 事件（最后已知故障，如果有）
- 风扇（泵/喷头）
- 灯光
- 选择（低/高温范围）
- 开关（启用/禁用过滤周期 2）
- 时间（设置过滤周期开始/结束时间）

## 兼容硬件

Balboa Spa Client 集成支持配备 Balboa BP 系统和 bwa™ Wi-Fi 模块 (50350) 的热水浴缸的本地控制。

Balboa Spa Client 集成与 Balboa ControlMySpa Gateway Ultra (59303) 使用的 ControlMySpa™ 云 API 不兼容。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: "您的 Balboa Spa Wifi 设备的主机名或 IP 地址，例如 `192.168.1.58`。"
```

## Options

To define options for Balboa Spa Client, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Balboa Spa Client are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
sync_time:
  description: 每天将 Spa 的内部时钟与 Home Assistant 同步
```

## 已知限制

- WiFi 模块是直接连接到 spa 控制面板的。由于 spa 的限制，某些设置组合是不可能的。
- 根据 spa 配置，打开某些泵可能会导致其他泵也上线。
- spa WiFi 模块最初需要通过手机应用程序进行配置以进行身份验证并在您的网络上获取 IP。
- WiFi 模块将定期自动断开与 Home Assistant 的连接，然后自动重新连接。断开是内置在硬件中的。

## 调试集成

如果您在使用 Balboa 或集成时遇到问题，可以将调试打印添加到日志中。

```yaml
logger:
  default: info
  logs:
    pybalboa: debug
    homeassistant.components.balboa: debug
```