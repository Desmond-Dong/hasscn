---
title: SensorPro
description: 有关如何将 SensorPro 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: sensorpro
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

Integrates [SensorPro](https://www.sigmawit.com/) devices into Home Assistant.

## Supported devices

- T201
- T301

The SensorPro integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth) integration is enabled and functional.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
