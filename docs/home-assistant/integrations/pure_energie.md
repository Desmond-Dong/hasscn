---
title: Pure Energie
description: 有关如何将 Pure Energie 集成到 Home Assistant 中的说明。
ha_category:
  - Energy
ha_release: 2022.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: pure_energie
ha_platforms:
  - diagnostics
  - sensor
ha_zeroconf: true
ha_integration_type: device
---

The **Pure Energie** integration integrates the [Pure Energie Monitor](https://pure-energie.nl/kennisbank/pure-energie-meter/)
device with Home Assistant.

The Pure Energie meter is a product that allows you to read the data
from your smart meter via the serial port (P1), such as your energy
consumption and power flow.

:::note
The product of Pure Energie is a white label product of Net2Grid,
other white label products may be found by zeroconf and work with
this integration.

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### SmartBridge

Read out what your meter readings are for energy consumption/production
and see what your current power flow is.

- Power Flow (W)
- Energy Consumption (kWh)
- Energy Production (kWh)
