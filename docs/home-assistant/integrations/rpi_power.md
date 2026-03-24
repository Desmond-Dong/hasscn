---
title: Raspberry Pi Power Supply Checker
description: 有关如何将 Raspberry Pi 电源检查器集成到 Home Assistant 中的说明。
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.116
ha_domain: rpi_power
ha_codeowners:
  - '@shenxn'
  - '@swetoast'
ha_config_flow: true
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

**Raspberry Pi Power Supply Checker** 集成允许您检测运行 Home Assistant 的 Raspberry Pi 是否存在[供电不良](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply-warnings)问题。

:::note
此集成只能监控运行 Home Assistant 的那台 Raspberry Pi，无法通过网络监控远程 Raspberry Pi。

如果您有多台 Raspberry Pi，并且仅在其中一台上运行 Home Assistant，则此集成只会检查安装 Home Assistant 的那台设备的供电状态。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

此集成会与内核的电源管理系统交互，以检测 Raspberry Pi 是否获得了充足供电。它会创建一个二进制传感器，用于指示电源是否正常（正常状态）或是否存在电压问题（问题状态）。

如果检测到问题，请考虑升级为更高质量的电源，以便为您的 Raspberry Pi 型号提供稳定的 5V 电压和足够的电流。
