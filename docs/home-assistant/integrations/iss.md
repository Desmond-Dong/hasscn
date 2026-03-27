---
title: International Space Station (ISS)
description: 'International Space Station (ISS) 集成使用 Open Notify API(http://open-notify.org/Open-Notify-API/ISS-Location-Now/) 来告诉您空间站当前所在的位置。'
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.36
ha_domain: iss
ha_platforms:
  - sensor
ha_codeowners:
  - '@DurgNomis-drol'
ha_config_flow: true
ha_integration_type: service
---
# International Space Station (ISS)

**International Space Station (ISS)** 集成使用 [Open Notify API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/) 来告诉您空间站当前所在的位置。

它还会告诉您当前有多少人在太空中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
如果您在此集成的选项中启用“Show on map”，位置属性将命名为 `latitude` 和 `longitude`。位置属性的默认名称是 `lat` 和 `long`，以避免它们显示在地图上。


:::
