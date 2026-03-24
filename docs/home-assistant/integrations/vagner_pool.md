---
title: VÁGNER POOL
description: 使用 SEKO PoolDose 集成连接和控制您的 VÁGNER POOL 设备
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Water Management
ha_release: '2025.9'
ha_domain: vagner_pool
ha_integration_type: virtual
ha_supporting_domain: pooldose
ha_supporting_integration: SEKO PoolDose
ha_codeowners:
  - '@lmaertin'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_iot_class: Local Polling
ha_dhcp: true
---

:::note
此集成由 [SEKO PoolDose](/home-assistant/integrations/pooldose/) 集成支持。
:::
