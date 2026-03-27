---
title: Instituto Português do Mar e Atmosfera (IPMA)
description: 'IPMA 集成使用 Instituto Portugues do Mar e Atmosfera(https://www.ipma.pt/) 作为当前和天气预报气象数据的来源。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Weather
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
ha_domain: ipma
ha_platforms:
  - diagnostics
  - sensor
  - weather
ha_integration_type: service
---
# Instituto Português do Mar e Atmosfera (IPMA)

**IPMA** 集成使用 [Instituto Portugues do Mar e Atmosfera](https://www.ipma.pt/) 作为当前和天气预报气象数据的来源。

Home Assistant 目前支持以下设备类型：

- Sensor
  - 您所在位置的火灾风险
  - 您所在地区的紫外线指数
- Weather（当前状态和天气预报）


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

IPMA 同时提供*每小时*（72 小时）和*每日*（10 天）天气预报，但您必须在初始设置集成时选择天气实体要公开哪一种预报。
