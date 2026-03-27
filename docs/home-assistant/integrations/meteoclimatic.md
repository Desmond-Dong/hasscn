---
title: Meteoclimatic
description: 'Meteoclimatic 集成使用 Meteoclimatic(https://www.meteoclimatic.net/) Web 服务作为您所在位置的气象数据来源。位置基于 Meteoclimatic 站点代码（例如 ESCAT4300000043206B）。'
ha_release: 2021.6
ha_iot_class: Cloud Polling
ha_category:
  - Sensor
  - Weather
ha_codeowners:
  - '@adrianmo'
ha_config_flow: true
ha_domain: meteoclimatic
ha_platforms:
  - sensor
  - weather
ha_integration_type: service
---
# Meteoclimatic

**Meteoclimatic** 集成使用 [Meteoclimatic](https://www.meteoclimatic.net/) Web 服务作为您所在位置的气象数据来源。位置基于 Meteoclimatic 站点代码（例如 `ESCAT4300000043206B`），而显示的天气数据则取决于各个站点本身的能力。

Home Assistant 目前支持以下平台：

- Weather
- [Sensor](#sensor)

它会显示当前天气，以及包含每日最大值和最小值的独立传感器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成提供以下传感器：

|Name|Description|
|----|-----------|
|Daily Max Humidity|过去 24 小时内的最高湿度（%）|
|Daily Max Pressure|过去 24 小时内的最高气压（hPa）|
|Daily Max Temperature|过去 24 小时内的最高温度（°C）|
|Daily Max Wind Speed|过去 24 小时内的最大风速（km/h）|
|Daily Min Humidity|过去 24 小时内的最低湿度（%）|
|Daily Min Pressure|过去 24 小时内的最低气压（hPa）|
|Daily Min Temperature|过去 24 小时内的最低温度（°C）|
|Daily Precipitation|过去 24 小时的累计降水量（mm）|
|Humidity|当前湿度（%）|
|Pressure|当前气压（hPa）|
|Temperature|当前温度（°C）|
|Wind Bearing|当前风向（°）|
|Wind Speed|当前风速（km/h）|

警告：由于并非所有气象站都具有相同能力，某些传感器在特定气象站上可能不可用。只有当 Meteoclimatic 提供了对应数据时，相关传感器才会被添加。
