---
title: microBees
description: 'The microBees integration allows you to control your microBees devices(https://www.microbees.com/) such as plugs and wall switches. To use this。'
ha_category:
  - Button
  - Climate
  - Cover
  - Cover
  - Light
  - Sensor
  - Switch
  - Switch
ha_release: 2024.3
ha_codeowners:
  - '@microBeesTech'
ha_config_flow: true
ha_domain: microbees
ha_iot_class: Cloud Polling
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - light
  - sensor
  - switch
ha_integration_type: hub
---
# microBees

The **microBees** integration allows you to control your [microBees devices](https://www.microbees.com/) such as plugs and wall switches.
To use this integration you need OAuth2 Client ID and Client Secret and your user credentials.

To retrieve the OAuth2 Client ID and Client Secret go to [microBees Developer Dashboard](https://developers.microbees.com/dashboard), login with your microBees account and [create a new app](https://developers.microbees.com/dashboard/?p=wizard), choose a Label for your App, select WebApplication and input https://my.home-assistant.io as Website URL.

There is currently support for the following device types within Home Assistant:
- **Switch**
- **Climate**
- **Cover**
- **Binary sensors**
- **Button**
- **Light**
- **Sensor**

Note: The cover status will be unknown 


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
