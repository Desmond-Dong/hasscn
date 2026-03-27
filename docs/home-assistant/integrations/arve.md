---
title: Arve
description: 'Arve 集成提供监控由您的 Arve(https://www.arveair.com) 设备测量的实时空气质量数据的能力。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2024.5'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ikalnyi'
ha_domain: arve
ha_platforms:
  - sensor
ha_integration_type: hub
ha_config_flow: true
---
# Arve

**Arve** 集成提供监控由您的 [Arve](https://www.arveair.com) 设备测量的实时空气质量数据的能力。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要为 Arve 设备创建集成，您需要填写两个必填字段。
它们是 _Home Assistant 访问令牌_ 和 _Arve 客户令牌_。
_Home Assistant 访问令牌_ 和 _Arve 客户令牌_ 可以由用户在 [Arve 网络平台](https://dashboard.arveair.com) 上获取。

## 测量实体

目前，Arve 设备具有以下测量实体：

| 实体名称 | 测量单位 |
| ----------- | ------------------- |
| AQI         |                     |
| CO2         | ppm                 |
| Humidity    | %                   |
| PM10        | µg/m³               |
| PM25        | µg/m³               |
| Temperature | °C                  |
| TVOC        |                     |

其中：

AQI - 空气质量指数；

CO2 - 二氧化碳测量值（百万分之）；

Humidity - 湿度百分比；

PM10 - 直径小于 10&nbsp;µm 的颗粒物浓度；

PM25 - 直径小于 2.5&nbsp;µm 的颗粒物浓度；

Temperature - 温度测量值（摄氏度）；

TVOC - 总挥发性有机化合物指数。