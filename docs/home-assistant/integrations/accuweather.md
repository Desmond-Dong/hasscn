---
title: AccuWeather
description: 'AccuWeather 集成使用 AccuWeather(https://accuweather.com/) 网络服务作为您所在位置的天气数据来源。使用此集成需要付费订阅。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Weather
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: accuweather
ha_platforms:
  - diagnostics
  - sensor
  - weather
ha_integration_type: service
---
# AccuWeather

**AccuWeather** 集成使用 [AccuWeather](https://accuweather.com/) 网络服务作为您所在位置的天气数据来源。使用此集成需要付费订阅。

## 设置

要生成 AccuWeather API 密钥，请访问 [AccuWeather APIs](https://developer.accuweather.com/) 页面，注册，订阅可用计划之一，并在 **Subscriptions & Keys** 部分创建应用程序。

您可以在[这里](https://developer.accuweather.com/core-weather/location-key-locations#location-search-by-location-key)测试新创建的 API 密钥


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 数据更新

默认情况下，集成每 10 分钟从 AccuWeather API polls 当前天气状况数据，每 6 小时获取每日预报数据，每 30 分钟获取每小时预报数据。如果您想为两个以上的位置配置集成，您需要比 **Starter** 更高级别的计划。
