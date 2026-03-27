---
title: AEMET OpenData
description: 'AEMET 集成使用 AEMET OpenData(https://opendata.aemet.es/) 作为您所在位置当前气象数据的来源。AEMET 代表 "Agencia Estatal de Meteorologia"，即西班牙国家气象局。 本页属于 Home Assistant 中文文档。'
ha_release: 2021.3
ha_category:
  - Sensor
  - Weather
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: aemet
ha_platforms:
  - diagnostics
  - image
  - sensor
  - weather
ha_integration_type: service
ha_codeowners:
  - '@Noltari'
---
# AEMET OpenData

**AEMET** 集成使用 [AEMET OpenData](https://opendata.aemet.es/) 作为您所在位置当前气象数据的来源。AEMET 代表 "Agencia Estatal de Meteorologia"，即西班牙国家气象局。

目前 Home Assistant 支持以下实体类型：

- 图像
- 传感器
- 天气

您需要一个 API 密钥，它是免费的但需要[注册](https://opendata.aemet.es/centrodedescargas/altaUsuario)。
AEMET OpenData 服务完全免费，但仅限于西班牙境内。

## 配置

要添加 AEMET OpenData 集成，请转到 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 并在列表中找到该集成。

```yaml
API Key:
  description: "网站上的 API 密钥"
Name:
  description: "集成的名称"
Latitude:
  description: "天气预报和传感器的纬度"
Longitude:
  description: "天气预报和传感器的经度"
```

该集成会为每种预报模式创建一个天气实体，并为所有可用条件创建传感器。预报模式有两种：`daily` 用于最长 6 天的每日预报，`hourly` 用于最长 3 天的每小时预报。

对于每种条件，创建以下传感器：

| 条件           | 描述                          |
| :------------------ | :----------------------------------- |
| condition           | 当前天气状况代码。      |
| humidity            | 相对湿度。                   |
| pressure            | 海平面气压（毫巴）。 |
| rain                | 降雨量。                         |
| rain_probability    | 降雨概率。                 |
| snow                | 降雪量。                         |
| snow_probability    | 降雪概率。                 |
| station_id          | 最近的 AEMET 站点 ID。            |
| station_name        | 最近的 AEMET 站点名称。            |
| station_timestamp   | AEMET 站点数据时间戳。             |
| storm_probability   | 风暴概率。                |
| temperature         | 当前温度。                 |
| temperature_feeling | 体感温度。                |
| town_id             | 最近的 AEMET 城镇 ID。              |
| town_name           | 最近的 AEMET 城镇名称。              |
| town_timestamp      | AEMET 城镇数据时间戳。               |
| wind_bearing        | 风向。                        |
| wind_max_speed      | 最大风速。                      |
| wind_speed          | 风速。                          |

如果启用了雷达选项，集成会为天气雷达创建一个图像实体。

有关 API 的详细信息可在 [AEMET OpenData 文档](https://opendata.aemet.es/dist)中找到。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
