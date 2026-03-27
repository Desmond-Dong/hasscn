---
title: Meteo.lt
description: 'Meteo.lt 集成使用 立陶宛水文气象局(https://www.meteo.lt)（<abbr title="Lietuvos hidrometeorologijos tarnyba"LHMT</abbr）的气象数据，为立陶宛境内的位置提供天气预报。您可以通过用户界面设置一个或多个位置。'
ha_release: 2025.11
ha_iot_class: Cloud Polling
ha_category:
  - Weather
ha_codeowners:
  - '@xE1H'
ha_config_flow: true
ha_domain: meteo_lt
ha_platforms:
  - weather
ha_integration_type: service
ha_quality_scale: bronze
---
# Meteo.lt

**Meteo.lt** 集成使用 [立陶宛水文气象局](https://www.meteo.lt)（<abbr title="Lietuvos hidrometeorologijos tarnyba">LHMT</abbr>）的气象数据，为立陶宛境内的位置提供天气预报。您可以通过用户界面设置一个或多个位置。

该集成提供来自立陶宛各地官方气象站的当前天气状况，以及逐小时和逐日天气预报。

## 支持的功能

- 当前天气状况，包括温度、湿度、气压和风力数据
- 未来 24 小时逐小时天气预报
- 未来 5 天逐日天气预报
- 可按坐标选择气象站，也可手动选择
- 支持多个位置

## 前提条件

此集成需要可用的互联网连接，才能从 Meteo.lt <abbr title="Application Programming Interface">API</abbr> 获取天气数据。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Weather 平台

Weather 平台提供可用于天气仪表板卡片的当前天气状况和天气预报。

### 当前天气状况

提供以下当前天气数据：

- **Temperature**（°C）：当前气温
- **Apparent temperature**（°C）：体感温度
- **Humidity**（%）：相对湿度
- **Pressure**（hPa）：大气压
- **Wind speed**（m/s）：当前风速
- **Wind direction**（degrees）：风向角度
- **Wind gust speed**（m/s）：最大阵风风速
- **Cloud coverage**（%）：云量百分比
- **Condition**：天气状况（晴朗、多云、下雨等）

### 预报

此集成支持两种预报：

- **Hourly forecast**：未来 24 小时可用，包含温度、降水、风力和云量等详细状况。
- **Daily forecast**：未来 5 天可用，由逐小时数据汇总得出，展示每日最高/最低温度和中午时段天气状况。

## 数据更新

天气数据每 30 分钟会从 Meteo.lt <abbr title="Application Programming Interface">API</abbr> 自动更新一次。

## 已知限制

- 仅提供立陶宛境内位置的天气数据
- 不提供历史天气数据
- 当前不支持天气预警和警报

## 移除此集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
