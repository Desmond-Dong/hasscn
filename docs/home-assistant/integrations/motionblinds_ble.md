---
title: Motionblinds Bluetooth
description: '此集成为 Motionblinds(https://motionblinds.com/) 蓝牙电机添加支持。想让现有窗帘实现电动化？可以使用 Motionblinds 的 CMD-03 电机。采用 Motionblinds 的定制窗饰可通过全球经销商网络购买。'

ha_category:
  - Cover
ha_iot_class: Assumed State
ha_release: 2024.4
ha_domain: motionblinds_ble
ha_codeowners:
  - '@LennP'
  - '@jerrybboy'
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - select
  - sensor
ha_integration_type: device
---
# Motionblinds Bluetooth

此集成为 [Motionblinds](https://motionblinds.com/) 蓝牙电机添加支持。想让现有窗帘实现电动化？可以使用 Motionblinds 的 CMD-03 电机。采用 Motionblinds 的定制窗饰可通过全球经销商网络购买。
请注意，此集成不适用于 Eve Motionblinds 电机。Eve Motionblinds 可通过 [HomeKit Device](https://www.home-assistant.io/integrations/homekit_controller/) 集成或 [Matter](https://www.home-assistant.io/integrations/matter/) 集成添加到 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 设置

在设置 Motionblinds 蓝牙电机时，系统会询问您使用的是哪种窗帘。共有 8 种不同的窗帘类型：

- **卷帘**：可调整位置和速度。
- **蜂巢帘**：可调整位置和速度。
- **罗马帘**：可调整位置和速度。
- **百叶帘**：可调整位置、倾角和速度。
- **百叶帘（仅倾角）**：可调整倾角和速度。
- **双卷帘**：可调整位置、倾角和速度。
- **窗帘**：可调整位置。如果终点位置丢失，可能需要重新校准；可通过打开/关闭窗帘按钮或设置窗帘位置滑块来完成。这会触发一次校准流程，窗帘会先重新寻找终点位置，然后再移动到命令指定的位置。
- **垂直帘**：可调整位置和倾角。如果终点位置丢失，可能需要重新校准，这必须通过 Motionblinds Bluetooth 应用完成。

## 实体

Motionblinds 蓝牙设备提供以下实体：

- [Cover](https://www.home-assistant.io/integrations/cover/) 实体：根据设置时选择的窗帘类型，此实体会提供可调整位置和倾角的滑块，以及用于打开、关闭、向上倾斜、向下倾斜和停止的按钮。
- [Button](https://www.home-assistant.io/integrations/button/) 实体：
  - Connect 按钮：允许您连接到窗帘。
  - Disconnect 按钮：允许您断开与窗帘的连接。
  - Favorite 按钮：允许您将窗帘移动到收藏位置。
- [Select](https://www.home-assistant.io/integrations/select/) 实体：
  - Speed 选择器：允许您将电机速度调整为低、中或高。除窗帘和垂直帘外，所有窗帘类型都支持。
- [Sensor](https://www.home-assistant.io/integrations/sensor/) 实体：
  - Battery 传感器：显示电池百分比。图标还会反映电机当前是否正在充电，以及电机是否为有线供电，因此没有电池。
  - Calibration 传感器：显示窗帘是否仍处于已校准状态。当电机在断电状态下被移动到其他位置时，可能会变为未校准状态。该传感器适用于窗帘和垂直帘，因为它们在断电时也可能被移动。
  - Connection 传感器：显示窗帘是已连接、已断开、正在连接还是正在断开。
  - Signal strength 传感器：以 dBm 显示信号强度。

## 操作

由于 Motionblinds 蓝牙电机需要通过蓝牙连接进行控制，Home Assistant 默认不会自动更新电机状态。因此，您可以对任意属于 Motionblinds 蓝牙设备的实体使用 [homeassistant.update_entity](https://www.home-assistant.io/docs/scripts/perform-actions/#homeassistant-actions) 操作，这会连接到您的 Motionblinds 蓝牙电机并更新该设备下所有实体的状态。不过，请注意，这样做可能会影响电池续航。

这也可以通过 YAML 自动化来实现。例如，以下自动化会每 24 小时连接一次您的 Motionblinds 设备，以更新其在 Home Assistant 中的状态：

```yaml
alias: "Motionblinds Bluetooth polling automation"
triggers:
  - trigger: time_pattern
    hours: "/24"
actions:
  - action: homeassistant.update_entity
    target:
      entity_id: cover.motion_shade
```
