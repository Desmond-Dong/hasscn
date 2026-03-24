---
title: Tile
description: 关于如何使用 Tile 在 Home Assistant 中跟踪设备的说明。
ha_release: 0.58
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
ha_domain: tile
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - device_tracker
  - diagnostics
ha_integration_type: hub
---

The **Tile** integration allows Home Assistant to utilize [Tile® Bluetooth trackers](https://www.thetileapp.com).
The official Tile mobile app handles the actual tracking of Tile devices using
the mobile device's Bluetooth and GPS.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
