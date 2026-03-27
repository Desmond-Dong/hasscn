---
title: WeatherFlow
description: 'WeatherFlow 集成是一个仅限本地的集成，用于读取本地网络中所有兼容 WeatherFlow Tempest(https://weatherflow.com/tempest-weather-system/) 的气象站数据。 本页属于 Home Assistant 中文文档。'
ha_release: '2023.10'
ha_category:
  - Environment
  - Sensor
ha_platforms:
  - event
  - sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@natekspencer'
  - '@jeeftor'
ha_domain: weatherflow
ha_integration_type: hub
---
# WeatherFlow

**WeatherFlow** 集成是一个仅限本地的集成，用于读取本地网络中所有兼容 [WeatherFlow Tempest](https://weatherflow.com/tempest-weather-system/) 的气象站数据。

:::note
您可能会看到 Home Assistant 中显示的数值与 WeatherFlow App 中的数值略有差异。这是因为 WeatherFlow 应用除了使用本集成中的本地数据外，还会结合天气预报和周边气象站的数据。

:::
### 我该使用哪个集成

WeatherFlow 设备有两个集成可用，您不必只选择其中一个。

- [WeatherFlow](/home-assistant/integrations/weatherflow) 是一个*仅限本地*、基于 `UDP` 的集成，会直接从设备读取数据。此集成要求 Home Assistant 服务器和 WeatherFlow 设备位于同一子网。

- [WeatherFlow Cloud](/home-assistant/integrations/weatherflow_cloud) 是一个基于*云端*的集成，与 WeatherFlow Tempest 移动应用中的数据非常接近。由于它同时提供 **Forecast** 和 **Sensor** 数据，因此通常是大多数用户不错的起点。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成会公开以下传感器：

- 空气密度
- 气压
- 露点
- 体感温度
- 湿度
- 照度
- 辐照度
- 闪电平均距离
- 闪电次数
- 降水量（前一分钟累计值）
- 降水强度（根据前一分钟累计值[推算](https://weatherflow.github.io/Tempest/api/derived-metric-formulas.html#rain-rate)）
- 降水类型
- 温度
- 紫外线指数
- 蒸汽压
- 湿球温度
- 风向
- 平均风向
- 阵风
- 风谷
- 风速

## 事件实体

WeatherFlow Tempest 气象站在开始下雨以及附近发生闪电时也会发送事件触发。
此集成会公开这些事件实体，可用于自动化。公开的实体包括：

- Lightning strike
- Precipitation start

## 诊断传感器

此外，还提供以下诊断传感器：

- 电池（百分比）
- 电池电压
- 信号强度
- 运行时间

## 网络说明

此集成依赖 Home Assistant 能够在 `50222` 端口接收 `UDP` 流量。如果您的网络设置较复杂，比如使用 VLAN 或多个子网，可能会遇到问题。
