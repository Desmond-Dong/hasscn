---
title: MINI Connected
description: 使用 BMW Connected Drive 集成连接和控制您的 MINI Connected 设备
ha_category:
  - Binary sensor
  - Button
  - Car
  - Lock
  - Notifications
  - Number
  - Presence detection
  - Select
  - Sensor
  - Switch
ha_release: 0.64
ha_integration_type: virtual
ha_supporting_domain: bmw_connected_drive
ha_supporting_integration: BMW Connected Drive
ha_domain: mini_connected
ha_codeowners:
  - '@gerard33'
  - '@rikroe'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - lock
  - notify
  - number
  - select
  - sensor
  - switch
ha_iot_class: Cloud Polling
---

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::
