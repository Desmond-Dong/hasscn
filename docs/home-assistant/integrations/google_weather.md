---
title: Google Weather
description: '此集成使用 Google Weather(https://developers.google.com/maps/documentation/weather) 作为您所在位置的天气数据来源。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Weather
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: google_weather
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
ha_quality_scale: bronze
ha_platforms:
  - sensor
  - weather
---
# Google Weather

此集成使用 [Google Weather](https://developers.google.com/maps/documentation/weather) 作为您所在位置的天气数据来源。

## 前提条件

您需要一个 API 密钥。请按照 [Google 开发者文档](https://developers.google.com/maps/documentation/weather/get-api-key) 中的说明创建 API 密钥。

:::note
有关价格，请参阅 [Google 开发者文档中的计费部分](https://developers.google.com/maps/documentation/weather/usage-and-billing)。

只要每月请求量不超过 10,000 次，即可免费使用。
:::


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 数据更新

此集成会获取：

- 每 15 分钟获取一次当前天气状况
- 每 1 小时获取一次未来 10 天的每日天气预报
- 每 1 小时获取一次未来 24 小时的逐小时天气预报

这意味着每月会产生 4,464 次请求，也就是说，您最多可以配置 2 个位置，仍可保持在 10,000 次的免费使用上限内。

`weather.get_forecasts` 操作会使用缓存的预报数据，不会额外向 Google 发起 API 调用。您可以在模板或自动化中安全使用此操作，而不会影响配额使用。

## 已知限制

- 天气预报信息目前在韩国和日本不可用。请参阅 [Google 帮助中心](https://support.google.com/websearch/answer/13687874)。


## 故障排除

- 在提交 issue 前，请先[启用调试日志](https://www.home-assistant.io/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)并附上日志。


## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
