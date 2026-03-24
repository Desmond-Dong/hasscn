---
title: Apollo Automation
description: 使用 ESPHome 集成连接并控制 Apollo Automation 设备
ha_release: 0.85
ha_category:
  - Alarm
  - DIY
  - Update
ha_domain: apollo_automation
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

[Apollo Automation](https://apolloautomation.com/) 是 Made for ESPHome 项目的成员。

Apollo Automation 设备可在本地运行，并能与 Home Assistant 中的 [ESPHome](/home-assistant/integrations/esphome/) 集成无缝协作。由于所有连接都在本地完成，因此 Home Assistant 的状态更新和设备控制几乎是即时的。

:::note
此集成由 [ESPHome](/home-assistant/integrations/esphome/) 集成支持。
:::

## 支持的设备

已知以下设备受此集成支持。它们已通过 [Works with Home Assistant](https://partner.home-assistant.io/) 计划认证。

- [MTR-1 多目标雷达多传感器 (LD2450)](https://apolloautomation.com/products/mtr-1) - 小巧但强大的基于雷达（毫米波）的存在传感器，还可集成多种其他传感器。
- [MSR-2 毫米波多传感器 (LD2410B)](https://apolloautomation.com/products/msr-2) - 更加小巧的多传感器，是最初基于社区反馈设计的后继产品。
- [AIR-1 空气质量传感器](https://apolloautomation.com/products/air-1) - 小型空气质量多传感器，可扩展集成多种不同传感器。
- [LED-1 控制器](https://apolloautomation.com/products/led-1-led-controller) - 为高级照明项目设计的多功能 LED 控制器。
- [BTN-1 宏按键板](https://apolloautomation.com/products/btn-1-macro-deck) - 带 LED 的四键按键板。
- [R PRO-1 PoE 双毫米波多传感器](https://apolloautomation.com/products/r-pro-1) - 高级存在传感器。
- [PLT-1 / PLT-1B 植物传感器](https://apolloautomation.com/products/plt-1) - 室内植物多传感器。
