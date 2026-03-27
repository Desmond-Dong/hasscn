---
title: World Air Quality Index (WAQI)
description: 'World Air Quality Index (WAQI) 集成会查询 World Air Quality Index(https://aqicn.org/city/beijing/) 服务，以检查指定位置的 AQI 数值。查询结果会作为传感器添加到 Home Assistant 中。'
ha_category:
  - Health
ha_release: 0.34
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@joostlek'
ha_domain: waqi
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_config_flow: true
---
# World Air Quality Index (WAQI)

**World Air Quality Index (WAQI)** 集成会查询 [World Air Quality Index](https://aqicn.org/city/beijing/) 服务，以检查指定位置的 AQI 数值。查询结果会作为传感器添加到 Home Assistant 中。

## 设置

此传感器需要 API 令牌。请前往 [AQICN API token](https://aqicn.org/data-platform/token/#/) 获取。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

报告的数值是该位置的综合空气质量指数。指数可按如下方式解读：

| AQI       |                状态                | 说明 |
|-----------|:----------------------------------:|------|
| 0 - 50    |              **良好**              | 空气质量令人满意，空气污染几乎不会带来风险 |
| 51 - 100  |              **中等**              | 空气质量可以接受；但对极少数对空气污染异常敏感的人来说，某些污染物可能带来中等程度的健康影响 |
| 101 - 150 |        **敏感人群不健康**         | 敏感人群可能会受到健康影响，普通公众通常不会受到影响 |
| 151 - 200 |             **不健康**             | 所有人都可能开始出现健康影响；敏感人群可能会出现更严重的健康影响 |
| 201 - 300 |            **非常不健康**          | 会发布紧急健康警报，整个人群更有可能受到影响 |
| 301+      |             **危险**               | 健康警报：所有人都可能出现更严重的健康影响 |


有关 AQI 的更多信息，请参阅 [EPA 的 AirNOW 网站](https://www.airnow.gov/aqi/aqi-basics/)。
