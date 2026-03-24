---
title: Modern Forms
description: 关于如何将 Modern Forms 智能风扇与 Home Assistant 集成的说明。

ha_category:
  - Binary sensor
  - Fan
  - Light
  - Sensor
  - Switch
ha_release: 2021.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@wonderslug'
ha_domain: modern_forms
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - fan
  - light
  - sensor
  - switch
ha_integration_type: integration
---

[Modern Forms](https://modernforms.com/) 提供一系列支持 Wi-Fi 连接的智能风扇，可对风扇和灯光进行云端或本地控制。它还支持为风扇和灯光分别设置和清除独立的睡眠定时器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
如果 Modern Forms 风扇未安装灯光模块，则不会显示 Light 实体和相关操作。

:::
## 风扇

Modern Forms 集成支持 Modern Forms 风扇，包括方向控制以及风扇睡眠定时器操作。

## 灯光

Modern Forms 集成支持 Modern Forms 风扇的灯光部分，包括亮度控制以及灯光睡眠定时器操作。

## 二进制传感器

Modern Forms 集成针对以下信息提供二进制传感器：

- 风扇睡眠定时器活动状态
- 灯光睡眠定时器活动状态

## 传感器

Modern Forms 集成针对以下信息提供传感器：

- 风扇睡眠定时器剩余时间
- 灯光睡眠定时器剩余时间
  
## 开关

Modern Forms 集成支持切换风扇的以下属性：

- Away mode - 让风扇模拟家中有人。
- Adaptive learning - 允许为离家模式进行学习。

## 操作

### Action `modern_forms.clear_fan_sleep_timer`

如果风扇已设置睡眠定时器，此操作会将其清除。清除定时器时不会关闭风扇。

### Action `modern_forms.clear_light_sleep_timer`

如果灯光已设置睡眠定时器，此操作会将其清除。清除定时器时不会关闭灯光。

### Action `modern_forms.set_fan_sleep_timer`

此操作会为风扇设置睡眠定时器。定时器到期后会关闭风扇。

| Data attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `sleep_time`           | yes      | 要设置的睡眠定时器时长，单位为分钟。可设置范围为 1 到 1440（1 天）。 |

### Action `modern_forms.set_light_sleep_timer`

此操作会为灯光设置睡眠定时器。定时器到期后会关闭灯光。

| Data attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `sleep_time`           | yes      | 要设置的睡眠定时器时长，单位为分钟。可设置范围为 1 到 1440（1 天）。 |

:::note
Modern Forms 风扇使用 `pool.ntp.org` 的 NTP 服务来设置内部时钟并检查睡眠定时器是否到期。只有在 Modern Forms 风扇可以访问互联网 NTP 时，睡眠定时器才能正常工作。您可以阻止风扇访问云端，仅保留 NTP（UDP 端口 123）出站连接，以确保睡眠定时器工作。

:::
