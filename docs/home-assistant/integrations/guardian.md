---
title: Elexa Guardian
description: 关于如何将 Guardian 集成到 Home Assistant 的说明。
ha_iot_class: Local Polling
ha_release: '0.111'
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
  - Valve
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: guardian
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
  - valve
ha_dhcp: true
ha_integration_type: device
---

**Elexa Guardian** 集成可将 [Elexa Guardian 水阀控制器](https://getguardian.com) 接入 Home Assistant。

Home Assistant 当前支持以下设备类型：

- **Binary sensor**：报告内置漏水检测器和接入点的状态
- **Button**：提供各种配置控制
- **Sensor**：报告设备检测到的温度和运行时长
- **Switch**：允许您启用或禁用内置接入点
- **Valve**：允许您打开和关闭阀门


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

### 操作：配对传感器

`guardian.pair_sensor` 操作用于向阀门控制器添加一个新的已配对传感器。

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `uid`                    | yes      | The unique device ID on the bottom of the sensor.|

### 操作：取消配对传感器

`guardian.unpair_sensor` 操作用于从阀门控制器中移除一个已配对传感器。

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `uid`                    | yes      | The unique device ID on the bottom of the sensor.|

### 操作：升级固件

`guardian.upgrade_firmware` 操作用于升级设备固件。

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `url`                    | yes      | The URL of the server hosting the firmware file. |
| `port`                   | yes      | The port on which the firmware file is served.   |
| `filename`               | yes      | The firmware filename.                           |

:::note
并非所有操作都适用于所有 Guardian 阀门控制器固件版本。
在提交与操作无法运行相关的缺陷前，请先确保已将阀门控制器升级到最新固件。
:::

## 已配对传感器说明

当已配对传感器首次添加到阀门控制器时，其某些属性（例如 `battery` 和 `temperature`）可能会返回不准确或异常的值。这是因为传感器此前尚未向阀门控制器发送过数据。您可以通过移动传感器来解决这个问题（当它发出蜂鸣声时，表示数据已发送到阀门控制器）。
