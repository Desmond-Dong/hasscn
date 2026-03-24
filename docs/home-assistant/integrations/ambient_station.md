---
title: Ambient Weather Station
description: 关于如何在 Home Assistant 中集成 Ambient Weather 气象站的说明。
ha_category:
  - Weather
ha_release: 0.85
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: ambient_station
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: hub
---

**Ambient Weather Station** 集成通过 [Ambient Weather](https://ambientweather.net) 的个人气象站获取本地天气信息。

## 前提条件

使用此集成需要应用程序密钥和 API 密钥。要生成这两个密钥，只需使用 [您的 Ambient Weather 仪表板](https://dashboard.ambientweather.net) 的个人资料部分。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 本地 API 选项

此集成通过 Ambient Weather 云与 Ambient Weather PWS 设备通信。希望使用本地选项的用户可以使用 [`ecowitt2mqtt`](https://github.com/bachya/ecowitt2mqtt#input-data-formats) 的 `ambient_weather` 模式（支持 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery)）。

另一个选择是探索 [Ecowitt](https://www.ecowitt.com) 系列设备，它们支持内置的 [Ecowitt](/home-assistant/integrations/ecowitt/) 集成。