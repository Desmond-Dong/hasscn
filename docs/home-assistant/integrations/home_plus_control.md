---
title: Legrand Home+ Control
description: 使用 Netatmo 集成连接和控制您的 Legrand Home+ Control 设备
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Climate
  - Cover
  - Environment
  - Fan
  - Hub
  - Light
  - Media source
  - Sensor
  - Switch
  - Weather
ha_release: '0.20'
ha_domain: home_plus_control
ha_integration_type: virtual
ha_supporting_domain: netatmo
ha_supporting_integration: Netatmo
ha_codeowners:
  - '@cgtobi'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - fan
  - light
  - select
  - sensor
  - switch
ha_iot_class: Cloud Polling
ha_homekit: true
---

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::
