---
title: IKEA SYMFONISK
description: 使用 Sonos 集成连接和控制您的 IKEA SYMFONISK 设备
ha_category:
  - Media player
  - Sensor
ha_domain: symfonisk
ha_release: 0.7.3
ha_integration_type: virtual
ha_supporting_domain: sonos
ha_supporting_integration: Sonos
ha_codeowners:
  - '@jjlawren'
  - '@peterager'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - media_player
  - number
  - select
  - sensor
  - switch
ha_iot_class: Local Push
ha_ssdp: true
ha_zeroconf: true
---

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::
