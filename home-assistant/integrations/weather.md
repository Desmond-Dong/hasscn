# Weather

**Weather** 集成从网络服务获取气象信息，并显示给定位置的天气状况及其他详细信息。

:::note 构建块集成
This weather is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this weather building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the weather building block offers.
:::

如需查看天气类集成列表，请在集成页面中选择[天气分类](/home-assistant/integrations/index.md#weather)。

请阅读您所使用天气服务提供商的集成文档，了解如何进行设置。

Home Assistant 当前支持多个免费网络服务，其中部分服务需要注册。

## 状态和状态属性

天气实体的状态用于表示当前整体天气状况，例如 `cloudy` 或 `sunny`。

### 天气状况映射

`weather` 实体可使用以下状态值：

* **Clear, night**：夜间天空晴朗。`clear-night`
* **Cloudy**：天空多云。`cloudy`
* **Fog**：有浓雾，能见度降低。`fog`
* **Hail**：正在下冰雹。`hail`
* **Lightning**：有闪电或雷暴。`lightning`
* **Lightning, rainy**：有闪电或雷暴，同时伴随降雨。`lightning-rainy`
* **Partly cloudy**：天空局部多云。`partlycloudy`
* **Pouring**：正在下大雨。`pouring`
* **Rainy**：正在下雨。`rainy`
* **Snowy**：正在下雪。`snowy`
* **Snowy, rainy**：雨雪同时发生。`snowy-rainy`
* **Sunny**：天空晴朗，阳光充足。`sunny`
* **Windy**：风很大。`windy`
* **Windy, cloudy**：有风且多云。`windy-variant`
* **Exceptional**：出现异常天气状况。`exceptional`

### 状态属性

详细天气状况以及对应使用的计量单位会通过状态属性显示。天气实体不一定支持所有状态属性。

```yaml
apparent_temperature: 12.0
cloud_coverage: 0
dew_point: 5.0
humidity: 76
precipitation_unit: mm
pressure: 1019
pressure_unit: hPa
temperature: 14.2
temperature_unit: °C
uv_index: 2
visibility: 10
visibility_unit: km
wind_bearing: 260
wind_gust_speed: 51.56
wind_speed: 35.17
wind_speed_unit: km/h
```

## 操作 `weather.get_forecasts`

此操作会填充 [response data](/home-assistant/docs/scripts/perform-actions.md#use-templates-to-handle-response-data)，返回天气服务及其对应预报的映射。

| Data attribute | Optional | Description                                                                                       | Example |
| -------------- | -------- | ------------------------------------------------------------------------------------------------- | ------- |
| `type`         | no       | The type of forecast, must be one of `daily`, `twice_daily`, or `hourly`. The default is `daily`. | daily   |

```yaml
action: weather.get_forecasts
target:
  entity_id:
    - weather.tomorrow_io_home_nowcast
    - weather.toronto_forecast
data:
  type: hourly
response_variable: weather_forecast
```

响应数据字段是一个调用目标实体的映射，每个实体都包含 `forecast` 字段。
`forecast` 是给定时间点的天气预报列表：

| Response data               | Description                                                                                                                                     | Example                   |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `datetime`                  | The time of the forecasted conditions.                                                                                                          | 2023-02-17T14:00:00+00:00 |
| `is_daytime`                | Only set for `twice_daily` forecasts.                                                                                                           | False                     |
| `apparent_temperature`      | The apparent (feels-like) temperature in the unit indicated by the `temperature_unit` state attribute.                                          | 10.2                      |
| `cloud_coverage`            | The cloud coverage in %.                                                                                                                        | 15                        |
| `condition`                 | The weather condition.                                                                                                                          | Sunny                     |
| `dew_point`                 | The dew point temperature in the unit indicated by the `temperature_unit` state attribute.                                                      | 6.0                       |
| `humidity`                  | The relative humidity in %.                                                                                                                     | 82                        |
| `precipitation_probability` | The probability of precipitation in %.                                                                                                          | 0                         |
| `precipitation`             | The precipitation amount in the unit indicated by the `precipitation_unit` state attribute.                                                     | 0                         |
| `pressure`                  | The air pressure in the unit indicated by the `pressure_unit` state attribute.                                                                  | 1019                      |
| `temperature`               | The temperature in the unit indicated by the `temperature_unit` state attribute. If `templow` is also provided, this is the higher temperature. | 14.2                      |
| `templow`                   | The lower temperature in the unit indicated by the `temperature_unit` state attribute.                                                          | 5.0                       |
| `uv_index`                  | The UV index.                                                                                                                                   | 3                         |
| `wind_bearing`              | The wind bearing in azimuth angle (degrees) or 1-3 letter cardinal direction.                                                                   | 268                       |
| `wind_gust_speed`           | The wind gust speed in the unit indicated by the `wind_speed_unit` state attribute.                                                             | 34.41                     |
| `wind_speed`                | The wind speed in the unit indicated by the `wind_speed_unit` state attribute.                                                                  | 24.41                     |

## 示例

<details>
<summary>`get_forecasts` 模板传感器示例</summary>

包含每小时天气预报的 [template sensor](/home-assistant/integrations/template.md#yaml-configuration) 示例

```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: /1
    action:
      - action: weather.get_forecasts
        data:
          type: hourly
        target:
          entity_id: weather.home
        response_variable: hourly
    sensor:
      - name: Temperature forecast next hour
        unique_id: temperature_forecast_next_hour
        state: "{{ hourly['weather.home'].forecast[0].temperature }}"
        unit_of_measurement: °C

```

</details>

<details>
<summary>操作响应示例</summary>

```yaml
weather.tomorrow_io_home_nowcast:
  forecast:
    - datetime: "2023-12-07T13:00:00+00:00"
      condition: cloudy
      precipitation_probability: 0
      wind_bearing: 241.19
      temperature: 0.1
      dew_point: -1.9
      wind_speed: 16.88
      precipitation: 0
      humidity: 86
    - datetime: "2023-12-07T14:00:00+00:00"
      condition: cloudy
      precipitation_probability: 0
      wind_bearing: 232.41
      temperature: 0.8
      dew_point: -2.8
      wind_speed: 17.82
      precipitation: 0
      humidity: 77
    - datetime: "2023-12-07T15:00:00+00:00"
      condition: cloudy
      precipitation_probability: 0
      wind_bearing: 236.09
      temperature: 1.1
      dew_point: -2.6
      wind_speed: 17.89
      precipitation: 0
      humidity: 77
weather.toronto_forecast:
  forecast:
    - datetime: "2023-12-07T14:00:00+00:00"
      condition: snowy
      precipitation_probability: 40
      temperature: 0
    - datetime: "2023-12-07T15:00:00+00:00"
      condition: snowy
      precipitation_probability: 40
      temperature: 0
    - datetime: "2023-12-07T16:00:00+00:00"
      condition: snowy
      precipitation_probability: 40
      temperature: 0
```

</details>
