---
title: Duotecno
description: '您可以使用 Duotecno 集成在 Home Assistant 中控制 Duotecno(https://www.duotecno.be/) 节点。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Climate
  - Cover
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: '2023.8'
ha_config_flow: true
ha_codeowners:
  - '@cereal2nd'
ha_domain: duotecno
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - switch
ha_integration_type: hub
---
# Duotecno

您可以使用 **Duotecno** 集成在 Home Assistant 中控制 [Duotecno](https://www.duotecno.be/) 节点。

Home Assistant 目前支持以下设备类型：

- Climate
- Cover
- Light
- Switch


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

您需要提供 Smart Box 的连接信息。
