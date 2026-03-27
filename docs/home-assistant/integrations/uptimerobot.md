---
title: UptimeRobot
description: 'UptimeRobot 集成会为您在 UptimeRobot(https://uptimerobot.com) 账户中的所有监测项提供状态实体。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - System monitor
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ludeeus'
  - '@chemelli74'
ha_domain: uptimerobot
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: service
ha_quality_scale: gold
---
# UptimeRobot

**UptimeRobot** 集成会为您在 [UptimeRobot](https://uptimerobot.com) 账户中的所有监测项提供状态实体。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要获取 API 密钥，请前往 UptimeRobot 网站上的 [My Settings](https://old.uptimerobot.com/dashboard#mySettings) 页面，在底部可以找到您的 **Main API Key**。

所有数据都将从 [UptimeRobot](https://uptimerobot.com) 获取。
