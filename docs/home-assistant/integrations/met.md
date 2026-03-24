---
title: Meteorologisk institutt (Met.no)
description: 关于如何在 Home Assistant 中集成 Met.no 的说明。
ha_category:
  - Weather
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
ha_domain: met
ha_platforms:
  - diagnostics
  - weather
ha_integration_type: service
---

The **Meteorologisk institutt (Met.no)** integration uses the [Met.no](https://met.no/) web service as a source for meteorological data for your location. The weather forecast is delivered by the Norwegian Meteorological Institute and the NRK.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
