---
title: ESERA 1-Wire
description: 使用 1-Wire 集成连接和控制您的 ESERA 1-Wire 设备
ha_category:
  - DIY
ha_domain: esera_onewire
ha_integration_type: virtual
ha_supporting_domain: onewire
ha_supporting_integration: 1-Wire
ha_release: 0.12
ha_codeowners:
  - '@garbled1'
  - '@epenet'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - select
  - sensor
  - switch
ha_iot_class: Local Polling
ha_zeroconf: true
---

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::
