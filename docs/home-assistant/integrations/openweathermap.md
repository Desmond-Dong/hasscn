---
title: OpenWeatherMap
description: 'OpenWeatherMap integration 使用 OpenWeatherMap(https://openweathermap.org/) 作为您所在位置的气象和空气质量数据来源。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_release: 0.32
ha_category:
  - Sensor
  - Weather
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@freekode'
  - '@nzapponi'
  - '@wittypluck'
ha_domain: openweathermap
ha_platforms:
  - sensor
  - weather
ha_integration_type: service
related:
  - docs: /common-tasks/general/#defining-a-custom-polling-interval
    title: Defining a custom polling interval
---
# OpenWeatherMap

**OpenWeatherMap** integration 使用 [OpenWeatherMap](https://openweathermap.org/) 作为您所在位置的气象和空气质量数据来源。

Home Assistant 目前支持以下设备类型：

- Sensor
- Weather

您需要注册 API 密钥：[在此处注册](https://home.openweathermap.org/users/sign_up)。

## 支持的模式

目前此集成支持两种类型的 OpenWeatherMap 服务，以及几种相应的模式。

### [一次调用 API 3.0](https://openweathermap.org/price#onecall)

- `v3.0` ：当前天气，每小时天气预报 48 小时，每日天气预报 8 天

One Call API 3.0 服务需要[订阅](https://openweathermap.org/api/one-call-3)。该订阅提供免费套餐，每天可调用 1000 次。建议您在 OpenWeatherMap 网站上设置调用限制，使其保持在会产生费用的阈值以下。您可以在[订阅计划](https://home.openweathermap.org/subscriptions)页面的“Calls per day”中设置。

### [免费](https://openweathermap.org/price#freeaccess)

- `当前`：当前天气 
- `forecast`：天气预报，以 3 小时为单位，持续 5 天
- `air_pollution`：当前空气污染

免费服务需要注册，但无需订阅。注册后，可以从您的个人资料的[我的 API 密钥](https://home.openweathermap.org/api_keys) 页面找到 API 密钥。

## ⚠️ 重要弃用通知

### OpenWeatherMap API V2.5 弃用

OpenWeatherMap API V2.5 已弃用，并且此集成不再支持。您需要使用API​​ V3.0。

如果您之前使用 API V2.5，要继续使用该服务：

- 访问 OpenWeatherMap 网站并激活 One Call 订阅。
- 激活期间，系统将提示您提供信用卡，但除非您超出免费套餐限制，否则不会向您收费。
- 配置您的 OWM 集成以选择模式“v3.0”。
- 注意：订阅激活最多可能需要 2 小时。

有关更多详细信息，请在 [OpenWeatherMap 订阅](https://home.openweathermap.org/subscriptions) 设置使用限制以避免产生费用。

:::important
如果您在 OpenWeatherMap 注册了新的 API 密钥，它会自动激活。这个过程通常需要 10 分钟到 2 小时。  
配置此集成时，请记住您的新 API 密钥可能尚未生效。  
如果您使用的密钥与对应服务不匹配（One Call API 3.0 或 Free），也可能会出现 API 密钥无效错误。

:::
## Configuration

To add the **OpenWeatherMap** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=openweathermap)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=openweathermap).
- From the list, select **OpenWeatherMap**.
- Follow the instructions on screen to complete the setup.

</details>

| 参数 | 值 |
| :-------- | :-------------------------------------------------------- |
| API Key | 网站上的 API 密钥 |
| Name | 集成名称 |
| Latitude | 天气预报和传感器使用的纬度 |
| Longitude | 天气预报和传感器使用的经度 |
| Mode | <li>`v3.0`（新版 API）当前天气 + 8 天天气预报 + 48 小时逐小时预报</li><li>`current` 仅当前天气数据，不含预报</li><li>`forecast` 仅天气预报，以 3 小时为步进，持续 5 天，不含当前天气</li><li>`air_pollution` 当前空气质量数据</li> |
| Language | 接收数据所使用的语言（仅适用于 `sensor`） |

将为每个支持的条件创建一个“传感器”实体。他们的 ID 将遵循以下格式：

`sensor.<集成名称>_<监控条件>`

传感器以配置集成时选择的语言提供数据。

:::note
Weather 实体仅提供英文数据。Home Assistant 会自动将其翻译为前端配置的语言。

:::
如果您想更改天气位置，则需要删除并重新添加集成。

## 支持的天气条件

### 当前天气状况

| Condition | Description |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `cloud_coverage` | 云量，%。 |
| `condition` | [天气状况](https://developers.home-assistant.io/docs/core/entity/weather/#recommended-values-for-state-and-condition)。 |
| `dew_point` | 水滴开始凝结并形成露水时的大气温度，单位为 ºC。 |
| `feels_like_temperature` | 结合人体感知计算出的体感温度，单位为 ºC。 |
| `humidity` | 湿度，%。 |
| `precipitation_kind` | 最近一小时的降水类型（Rain、Snow、Snow and Rain、None）。 |
| `pressure` | 海平面气压，单位为 hPa。 |
| `rain` | 降雨量，单位为 mm/h。 |
| `snow` | 降雪量，单位为 mm/h。 |
| `temperature` | 温度，单位为 ºC。 |
| `uv_index` | 紫外线指数。 |
| `visibility` | 平均能见度，单位为 m。 |
| `weather` | 对[天气状况](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)的人类可读描述。 |
| `weather_code` | [天气状况](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)的 ID。 |
| `wind_bearing` | 风向，单位为度（气象学定义）。 |
| `wind_speed` | 风速，单位为米/秒。 |

有关 API 的详细信息，请参阅 [OpenWeatherMap 文档](https://openweathermap.org/api)。

### 操作：获取分钟预测

`openweathermap.get_minute_forecast` 操作填充[响应数据](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)
绘制下一小时的每分钟降水量预报（雨或雪）。

**注意：** 仅当 OWM 集成模式设置为“v3.0”时，分钟预测才可用。如果模式设置为“当前”、“预测”或“空气污染”，则操作将失败。

```yaml
action: openweathermap.get_minute_forecast
target:
  entity_id:
    - weather.openweathermap
response_variable: weather_forecast
```

响应数据字段是“预测”字段的映射。
“forecast”是 60 个预测降水水平的列表；下一小时的每一分钟一个：

| Response data | Description | Example |
| ---------------------- | ----------- | -------- |
| `datetime` | 预测天气条件对应的时间。 | 2024-10-19T18:59:00+00:00 |
| `precipitation` | 降水量，单位为 mm/h。 | 1.25 |

### Examples

<details>
<summary>Example action response</summary>


```yaml
weather.openweathermap:
  forecast:
    - datetime: "2024-10-19T18:59:00+00:00"
      precipitation: 5.46
    - datetime: "2024-10-19T19:00:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:01:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:02:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:03:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:04:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:05:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:06:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:07:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:08:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:09:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:10:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:11:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:12:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:13:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:14:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:15:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:16:00+00:00"
      precipitation: 5.79
    - datetime: "2024-10-19T19:17:00+00:00"
      precipitation: 5.96
    - datetime: "2024-10-19T19:18:00+00:00"
      precipitation: 6.14
    - datetime: "2024-10-19T19:19:00+00:00"
      precipitation: 6.31
    - datetime: "2024-10-19T19:20:00+00:00"
      precipitation: 6.48
    - datetime: "2024-10-19T19:21:00+00:00"
      precipitation: 6.68
    - datetime: "2024-10-19T19:22:00+00:00"
      precipitation: 6.89
    - datetime: "2024-10-19T19:23:00+00:00"
      precipitation: 7.09
    - datetime: "2024-10-19T19:24:00+00:00"
      precipitation: 7.29
    - datetime: "2024-10-19T19:25:00+00:00"
      precipitation: 7.49
    - datetime: "2024-10-19T19:26:00+00:00"
      precipitation: 7.72
    - datetime: "2024-10-19T19:27:00+00:00"
      precipitation: 7.95
    - datetime: "2024-10-19T19:28:00+00:00"
      precipitation: 8.18
    - datetime: "2024-10-19T19:29:00+00:00"
      precipitation: 8.42
    - datetime: "2024-10-19T19:30:00+00:00"
      precipitation: 8.65
    - datetime: "2024-10-19T19:31:00+00:00"
      precipitation: 8.65
    - datetime: "2024-10-19T19:32:00+00:00"
      precipitation: 8.65
    - datetime: "2024-10-19T19:33:00+00:00"
      precipitation: 8.65
    - datetime: "2024-10-19T19:34:00+00:00"
      precipitation: 8.65
    - datetime: "2024-10-19T19:35:00+00:00"
      precipitation: 8.65
    - datetime: "2024-10-19T19:36:00+00:00"
      precipitation: 8.91
    - datetime: "2024-10-19T19:37:00+00:00"
      precipitation: 9.18
    - datetime: "2024-10-19T19:38:00+00:00"
      precipitation: 9.45
    - datetime: "2024-10-19T19:39:00+00:00"
      precipitation: 9.72
    - datetime: "2024-10-19T19:40:00+00:00"
      precipitation: 9.98
    - datetime: "2024-10-19T19:41:00+00:00"
      precipitation: 10.29
    - datetime: "2024-10-19T19:42:00+00:00"
      precipitation: 10.6
    - datetime: "2024-10-19T19:43:00+00:00"
      precipitation: 10.91
    - datetime: "2024-10-19T19:44:00+00:00"
      precipitation: 11.22
    - datetime: "2024-10-19T19:45:00+00:00"
      precipitation: 11.53
    - datetime: "2024-10-19T19:46:00+00:00"
      precipitation: 11.89
    - datetime: "2024-10-19T19:47:00+00:00"
      precipitation: 12.24
    - datetime: "2024-10-19T19:48:00+00:00"
      precipitation: 12.6
    - datetime: "2024-10-19T19:49:00+00:00"
      precipitation: 12.96
    - datetime: "2024-10-19T19:50:00+00:00"
      precipitation: 13.31
    - datetime: "2024-10-19T19:51:00+00:00"
      precipitation: 13.31
    - datetime: "2024-10-19T19:52:00+00:00"
      precipitation: 13.31
    - datetime: "2024-10-19T19:53:00+00:00"
      precipitation: 13.31
    - datetime: "2024-10-19T19:54:00+00:00"
      precipitation: 13.31
    - datetime: "2024-10-19T19:55:00+00:00"
      precipitation: 13.31
    - datetime: "2024-10-19T19:56:00+00:00"
      precipitation: 13.73
    - datetime: "2024-10-19T19:57:00+00:00"
      precipitation: 14.14
    - datetime: "2024-10-19T19:58:00+00:00"
      precipitation: 14.55
```


</details>

## 支持的空气质量传感器

### 当前空气质量传感器

| Sensor | Description |
| :------------------ | :-------------------------------------------------------------------------------------- |
| `air_quality_index` | 空气质量指数，其中 1 = Good，2 = Fair，3 = Moderate，4 = Poor，5 = Very Poor。 |
| `carbon_monoxide` | CO（一氧化碳）浓度，单位为 µg/m³。 |
| `nitrogen_monoxide` | NO（一氧化氮）浓度，单位为 µg/m³。 |
| `nitrogen_dioxide` | NO2（二氧化氮）浓度，单位为 µg/m³。 |
| `ozone` | O3（臭氧）浓度，单位为 µg/m³。 |
| `sulphur_dioxide` | SO2（二氧化硫）浓度，单位为 µg/m³。 |
| `pm2_5` | PM2.5（细颗粒物）浓度，单位为 µg/m³。 |
| `pm10` | PM10（可吸入颗粒物）浓度，单位为 µg/m³。 |

更多详细信息，请参阅 OpenWeatherMap [空气污染 API 文档](https://openweathermap.org/api/air-pollution)。
