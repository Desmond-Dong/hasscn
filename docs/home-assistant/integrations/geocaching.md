---
title: Geocaching
description: 'Geocaching is a real-world, outdoor adventure that is happening all the time, all around the world. To play, participants use the Geocaching app and/or a。'
ha_category:
  - Sensor
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Sholofly'
  - '@reinder83'
ha_domain: geocaching
ha_platforms:
  - sensor
ha_integration_type: service
---
# Geocaching

Geocaching is a real-world, outdoor adventure that is happening all the time, all around the world. To play, participants use the Geocaching app and/or a GPS device to navigate to cleverly hidden containers called geocaches.

The Geocaching integration in Home Assistant pulls data from your [Geocaching.com](https://www.geocaching.com/) account.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Sensors

The following sensors are available for each account:

- Find count
- Hide count
- Favorite points
- Souvenir count
- Awarded favorite points

![Authorized Geocaching developer](/home-assistant/images/integrations/geocaching/geocaching_authorized_developer.png) Powered by Geocaching HQ
