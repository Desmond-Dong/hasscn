---
title: Tapo
description: 使用 TP-Link Smart Home 集成连接和控制您的 Tapo 设备
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Climate
  - Fan
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Vacuum
ha_domain: tplink_tapo
ha_release: 0.89
ha_integration_type: virtual
ha_supporting_domain: tplink
ha_supporting_integration: TP-Link Smart Home
ha_codeowners:
  - '@rytilahti'
  - '@bdraco'
  - '@sdb9696'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - climate
  - diagnostics
  - fan
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - vacuum
ha_iot_class: Local Polling
ha_dhcp: true
---

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::
