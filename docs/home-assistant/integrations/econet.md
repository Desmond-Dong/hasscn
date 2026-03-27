---
title: Rheem EcoNet Products
description: 'The EcoNet integration is consuming the information provided by a EcoNet enabled Rheem water heater or thermostat(https://www.rheem.com/econet). 本页属于 Home。'
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Switch
  - Water heater
ha_release: 0.61
ha_iot_class: Cloud Push
ha_domain: econet
ha_codeowners:
  - '@w1ll1am23'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - sensor
  - switch
  - water_heater
ha_integration_type: hub
---
# Rheem EcoNet Products

The **EcoNet** integration is consuming the information provided by a [EcoNet enabled Rheem water heater or thermostat](https://www.rheem.com/econet).


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Platforms

EcoNet devices may be represented by one or more platforms.

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)
- [Water heater](#water-heater)

### Binary sensor

The EcoNet Binary sensor platform lets you view binary states of sensors associated with your EcoNet thermostat or water heater. For example, if the device is currently running.

### Climate

The EcoNet Climate platform lets you control your EcoNet thermostat. Multi-zone HVAC systems will have 1 Climate entity per zone.

### Sensor

The EcoNet Sensor platform lets you view sensors associated with your EcoNet thermostat or water heater. For example, alert count or available hot water.

### Switch

The EcoNet Switch platform let's you control the EcoNet thermostat emergency heat.

### Water heater

The EcoNet water heater platform lets you control your EcoNet water heater. Water heaters do not report the current water temperature.
