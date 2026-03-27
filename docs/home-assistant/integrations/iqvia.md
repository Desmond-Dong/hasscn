---
title: IQVIA
description: 'IQVIA 集成会从 IQVIA(https://www.iqvia.com/) 获取并显示基于美国邮政编码的过敏、哮喘和疾病相关信息。 采集的数据包括：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Health
ha_release: 0.63
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: iqvia
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---
# IQVIA

**IQVIA** 集成会从 [IQVIA](https://www.iqvia.com/) 获取并显示基于美国邮政编码的过敏、哮喘和疾病相关信息。
采集的数据包括：

- 过敏、哮喘，以及感冒/流感指数
- 趋势
- 当前展望
- 以及更多信息


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 了解指数

任何与指数相关的传感器值都介于 0.0 到 12.0 之间。这些数值对应以下便于理解的评级：

| Range      | Rating      |
| ---------- | ----------- |
| 0.0 - 2.4  | 低          |
| 2.5 - 4.8  | 低/中       |
| 4.9 - 7.2  | 中          |
| 7.3 - 9.6  | 中/高       |
| 9.7 - 12.0 | 高          |

## 了解哮喘过敏原

多个与哮喘相关的传感器会提供排名前三的“哮喘过敏原”信息，也就是可能加重哮喘症状的刺激物。
示例值包括：

| 污染物                  | 符号   | 更多信息                                                                               |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- |
| 颗粒物（<= 2.5 μm）     | PM2.5  | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)             |
| 颗粒物（<= 10 μm）      | PM10   | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)             |
| 臭氧                    | O      | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)                            |
| 二氧化硫                | SO2    | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)               |
| 一氧化碳                | CO     | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution) |
