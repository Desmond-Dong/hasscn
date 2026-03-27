---
title: Konnected
description: 'Konnected(https://konnected.io/) 是 Made for ESPHome 计划的成员。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 0.85
ha_category:
  - Alarm
  - DIY
  - Update
ha_domain: konnected_esphome
ha_integration_type: virtual
ha_supporting_domain: esphome
ha_supporting_integration: ESPHome
works_with:
  - local
ha_codeowners:
  - '@jesserockz'
  - '@kbx81'
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - assist_satellite
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - date
  - datetime
  - diagnostics
  - event
  - fan
  - light
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - text
  - time
  - update
  - valve
  - water_heater
ha_iot_class: Local Push
ha_dhcp: true
ha_zeroconf: true
---
# Konnected

[Konnected](https://konnected.io/) 是 Made for ESPHome 计划的成员。

Konnected 设备在本地运行，并可与 Home Assistant 中的 [ESPHome](/home-assistant/integrations/esphome/) 集成无缝配合。由于所有连接都在本地完成，因此来自 Home Assistant 的状态更新和设备控制都能即时生效。

:::note
此集成由 [ESPHome](/home-assistant/integrations/esphome/) 集成支持。
:::

## 支持的设备

已知以下设备受此集成支持。它们已通过 [Works with Home Assistant](https://partner.home-assistant.io/) 计划认证。

- [Konnected Smart Garage Door Opener blaQ](https://konnected.io/products/smart-garage-door-opener-blaq-myq-alternative)
- [Konnected Smart Garage Door Opener White (v2)](https://konnected.io/products/smart-garage-door-opener)
- [Konnected Alarm Panel Pro](https://konnected.io/collections/smart-alarm-panels)
