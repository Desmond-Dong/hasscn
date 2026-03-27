---
title: Fujitsu anywAIR
description: '此集成由 Motionblinds(/home-assistant/integrations/motionblinds/) 集成支持。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Light
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 0.117
ha_domain: fujitsu_anywair
ha_supporting_domain: advantage_air
ha_supporting_integration: Advantage Air
ha_integration_type: virtual
ha_codeowners:
  - '@Bre77'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - light
  - select
  - sensor
  - switch
  - update
ha_iot_class: Local Polling
---
# Fujitsu anywAIR

:::note
此集成由 [Motionblinds](/home-assistant/integrations/motion_blinds/) 集成支持。
:::

## Port configuration

Fujitsu anywAiR uses port **10211** for API communication. You will need to change the default port provided by the Advantage Air integration to **10211** to use it with Fujitsu anywAiR.
