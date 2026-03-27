---
title: Home Assistant Analytics Insights
description: 关于如何在 Home Assistant 中集成 Home Assistant Analytics Insights 的说明。
ha_category:
  - Sensor
ha_release: '2024.2'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: analytics_insights
ha_platforms:
  - sensor
ha_integration_type: service
---
# Home Assistant Analytics Insights

**Analytics Insights** 集成允许您在 Home Assistant 中获取集成使用统计数据。
数据来自 [Home Assistant Analytics](https://analytics.home-assistant.io/)。
有关收集分析数据的组件的更多信息，请参阅 [Analytics](/home-assistant/integrations/analytics)。

要使自定义集成显示出来，其 [brands](https://github.com/home-assistant/brands) 需要已被合并。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::