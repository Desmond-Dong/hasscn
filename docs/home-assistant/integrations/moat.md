---
title: Moat
description: 关于如何将 Moat 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: moat
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

Integrates [Moat](https://moat-tech.com/) devices into Home Assistant.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The Moat integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [S2 Smart Temperature & Humidity Sensor](https://www.moat-tech.com/product/smart-climate-sensor/)
