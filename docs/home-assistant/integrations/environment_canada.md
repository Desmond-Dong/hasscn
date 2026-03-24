---
title: Environment Canada
description: 来自加拿大环境部的天气数据。
ha_category:
  - Camera
  - Sensor
  - Weather
ha_platforms:
  - camera
  - diagnostics
  - sensor
  - weather
ha_release: 0.95
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@gwww'
  - '@michaeldavie'
ha_domain: environment_canada
ha_config_flow: true
ha_integration_type: service
---

**Environment Canada** 集成可为加拿大地区位置提供来自 [Environment and Climate Change Canada](https://weather.gc.ca/index_e.html) 的气象数据。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 位置选择

您可以通过以下任一方式选择天气位置：

- Station selector：从包含所有加拿大环境部气象站的下拉列表中选择一个站点位置。
- Coordinates：提供纬度和经度以自动查找最近的站点（默认使用您的 Home Assistant 位置）。

## 实体

该集成会创建以下实体。

### 天气

- 当前天气状况、每日预报和逐小时预报

### 雷达图（Camera）

- 过去 3 小时的雷达图像循环动画
- 此实体默认禁用，可在该条目的设置对话框中启用
- 默认情况下，该实体在 4 月 1 日至 11 月 30 日使用雨量雷达图层，在 12 月 1 日至 3 月 31 日使用降雪图层。雨/雪图层可通过下方描述的动作进行更改

### 传感器

#### 天气状况和预报

- 当前天气状况
- 预报摘要
- 当前天气状况的 [图标代码](https://dd.weather.gc.ca/today/citypage_weather/docs/Current_Conditions_Icons-Icones_conditions_actuelles.pdf)
- 气压
- 气压趋势
- 湿度
- 能见度
- 紫外线指数
- 空气质量健康指数（AQHI）

#### 温度

- 温度
- 预报最高温
- 预报最低温
- 露点
- 风寒指数（仅在温度低于 0ºC 时提供）
- 体感温度 Humidex（仅在温度高于 19ºC 时提供）

#### 风

- 风速
- 阵风
- 风向
- 风向角

#### 降水

- 降水概率

#### 警报

- 警告
- 监视
- 公告
- 声明
- 结束通知

这些警报传感器会以当前警报数量作为状态值，并在属性中包含每条警报的标题。

## 解决问题

Environment Canada 服务非常稳定，并提供高质量数据。在提交问题报告或发论坛帖子之前，您可以先尝试以下步骤。

### 服务中断

虽然不常见，但 Environment Canada 服务过去也出现过停机和不稳定的情况。如果您在日志中看到类似下方的错误信息，那么这通常不是此集成的问题，而更可能是 Environment Canada 服务本身出现了问题。

```text
2022-10-05 12:25:08.619 ERROR (MainThread) [homeassistant.components.environment_canada] Timeout fetching environment_canada weather data
```

首先应检查该服务是否已知存在问题。请查看 [Environment Canada 邮件列表](https://comm.collab.science.gc.ca/mailman3/hyperkitty/list/dd_info@comm.collab.science.gc.ca/) 上的近期消息（[示例消息](https://comm.collab.science.gc.ca/mailman3/hyperkitty/list/dd_info@comm.collab.science.gc.ca/thread/QJHBU7C5MWICGFHETGQ5752MUWR6OZ6G/)）。接下来可以去论坛发帖，通常已经有人知道答案。

### 传感器显示 `unavailable` 或 `unknown`

并非所有气象站都会提供完整的天气或传感器数据。此集成获取到的数据可在[这里](https://dd.weather.gc.ca/today/citypage_weather/)查看。浏览您所选站点的 XML 数据，有助于您了解哪些数据可用，哪些不可用。

## 模板传感器

下面的配置片段会添加[模板传感器](/home-assistant/integrations/template/)。更多示例请参阅 [weather 集成](/home-assistant/integrations/weather/)。

请将 `NAME` 替换为您配置中使用的天气实体名称。

### 体感温度

该传感器会结合 humidex 或 wind chill 来表示体感温度。


```yaml
template:
  - sensor:
    - name: "Feels Like"
      device_class: temperature
      unit_of_measurement: "°C"
      state: >
        {% if not is_state('sensor.NAME_humidex', 'unknown') %}
          {{ states('sensor.NAME_humidex') }}
        {% elif not is_state('sensor.NAME_wind_chill', 'unknown') %}
          {{ states('sensor.NAME_wind_chill') }}
        {% else %}
          {{ states('sensor.NAME_temperature') | round(0) }}
        {% endif %}
```


### 附加预报数据

下面的配置片段会添加一个模板传感器，将当前预报信息作为属性保存，并将当天预报的文本摘要作为状态值。


```yaml
- trigger:
    - platform: time_pattern
      hours: "/4"
    - platform: homeassistant
      event: start
    - platform: event
      event_type: event_template_reloaded
  actions:
    - action: environment_canada.get_forecasts
      target:
        entity_id: weather.NAME
      response_variable: forecasts
  sensor:
    - name: Weather Forecast Daily
      unique_id: weather_forecast_daily
      state: "{{ states('weather.NAME') }}"
      attributes:
        daily: "{{ forecasts['weather.NAME']['daily_forecast'] }}"
        hourly: "{{ forecasts['weather.NAME']['hourly_forecast'] }}"
        summary: "{{ forecasts['weather.NAME']['daily_forecast'][0]['text_summary'] }}"
        temperature_unit: "{{ state_attr('weather.NAME', 'temperature_unit') }}"
```


## 动作

### 动作：获取预报

`environment_canada.get_forecasts` 动作可让您获取来自 Environment Canada 的原始预报数据。它会同时返回 `daily_forecast` 和 `hourly_forecast` 数据。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `entity_id` | 是 | 要获取预报的天气实体 |

### 动作：设置雷达类型

`environment_canada.set_radar_type` 动作可让您设置摄像头实体要获取的雷达类型。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `entity_id` | 是 | 要设置雷达类型的摄像头实体 |
| `radar_type` | 否 | 可选值为 "Auto"、"Rain" 或 "Snow" |
