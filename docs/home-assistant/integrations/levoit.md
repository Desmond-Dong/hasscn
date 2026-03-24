---
title: Levoit
description: 使用 VeSync 集成连接和控制您的 Levoit 设备
ha_category:
  - Fan
  - Light
  - Number
  - Switch
  - Update
ha_release: 0.66
ha_domain: levoit
ha_integration_type: virtual
ha_supporting_domain: vesync
ha_supporting_integration: VeSync
ha_codeowners:
  - '@markperdue'
  - '@webdjoe'
  - '@thegardenmonkey'
  - '@cdnninja'
  - '@iprak'
  - '@sapuseven'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - select
  - sensor
  - switch
  - update
ha_iot_class: Cloud Polling
---

:::note
此集成由 [VeSync](/home-assistant/integrations/vesync/) 集成支持。
:::
