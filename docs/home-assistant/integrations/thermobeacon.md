---
title: ThermoBeacon
description: '将 ThermoBeacon(http://www.seven-like.com/) 设备集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: thermobeacon
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---
# ThermoBeacon

将 [ThermoBeacon](http://www.seven-like.com/) 设备集成到 Home Assistant 中。

## 支持的设备

- SensorBlue WS03
- SensorBlue WS07
- SensorBlue WS08

启用且可正常工作的 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，ThermoBeacon 集成会自动发现设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
