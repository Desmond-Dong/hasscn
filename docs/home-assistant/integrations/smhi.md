---
title: SMHI
description: 'SMHI 集成为 SMHI.se(https://www.smhi.se/) Web 服务提供支持，可将其作为您所在位置的气象数据来源。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Hub
  - Sensor
  - Weather
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: smhi
ha_platforms:
  - sensor
  - weather
ha_codeowners:
  - '@gjohansson-ST'
ha_integration_type: integration
---
# SMHI

**SMHI** 集成为 [SMHI.se](https://www.smhi.se/) Web 服务提供支持，可将其作为您所在位置的气象数据来源。

:::important
只能添加靠近瑞典的地点。有关支持哪些位置的更多详情，请参阅 [SMHI.se area](https://opendata.smhi.se/metfcst/pmp/geographic_area)。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 天气

天气实体会提供当前天气状态，以及每日、每小时和每日两次的详细天气预报。

## 传感器

此集成会创建实体，用于显示一些额外的天气与火险指标的当前状态。

提供以下天气传感器（云量相关传感器默认禁用）：

- **Thunder probability** (%)：雷暴概率
- **Total cloud coverage** (%)：总云量平均值
- **Low cloud coverage** (%)：低云量平均值
- **Medium cloud coverage** (%)：中云量平均值
- **High cloud coverage** (%)：高云量平均值
- **Precipitation category**：降水类型，可为：无降水、雪、雨夹雪、雨、毛毛雨、冻雨或冻毛毛雨
- **Frozen precipitation** (%)：固态降水占比

提供以下火险传感器（默认禁用）：

- **FWI-index**：火险天气指数，从低风险到极高风险分级
- **FWI-value**：火险天气指数的原始数值
- **Initial spread index (ISI)**：描述预期火势蔓延速度
- **Build up index (BUI)**：表示火灾可利用燃料总量
- **Fine fuel moisture code (FFMC)**：描述细小枯死燃料中的含水量
- **Duff moisture code (DMC)**：描述中等深度疏松有机层中的含水量
- **Drought code (DC)**：描述深层致密有机层中的含水量
- **Highest grass fire risk**：依据草地火险模型得出的最高草地火险等级，从积雪覆盖到极高风险
- **Potential rate of spread**：未割草、未放牧天然草地的潜在蔓延速度（米/分钟）
- **Fuel drying**：森林燃料中可用水量的衡量指标，范围从极度干燥到非常湿润

SMHI 天气服务依据 Creative Commons Attribution 4.0 国际许可免费提供。天气数据每 30 分钟拉取一次。

有关 API 的详情，请参阅 [SMHI API 文档](https://opendata.smhi.se/metfcst/pmp/introduction)。

## 移除此集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
