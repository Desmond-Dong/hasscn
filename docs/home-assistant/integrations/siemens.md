---
title: Siemens
description: 使用 Home Connect 集成连接和控制您的西门子设备
ha_category:
  - Binary sensor
  - Button
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_release: '0.110'
ha_domain: siemens
ha_integration_type: virtual
ha_supporting_domain: home_connect
ha_supporting_integration: Home Connect
ha_codeowners:
  - '@DavidMStraub'
  - '@Diegorro98'
  - '@MartinHjelmare'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
ha_iot_class: Cloud Push
ha_dhcp: true
ha_zeroconf: true
---

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::
