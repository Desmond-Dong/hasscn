---
title: Holiday
description: 'Holiday 集成允许您在 Home Assistant 中创建节假日日历以支持自动化。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Calendar
ha_iot_class: Local Polling
ha_release: 2024.1
ha_config_flow: true
ha_domain: holiday
ha_platforms:
  - calendar
ha_codeowners:
  - '@jrieger'
  - '@gjohansson-ST'
ha_integration_type: integration
---
# Holiday

**Holiday** 集成允许您在 Home Assistant 中创建节假日日历以支持自动化。

它使用 Python 模块 [holidays](https://pypi.org/project/holidays/) 来整合有关特定地区公共假期的信息。

日历实体具有状态和属性，仅表示下一个即将到来的事件。日历触发器是一种更灵活的方式来支持自动化，比使用实体状态限制更少。

一些国家除了公共假期外还提供额外的类别可供配置。请参阅 [holidays](https://pypi.org/project/holidays/) 库中每个国家的详细信息。如果该国家不支持其他类别，则不会显示配置类别的选项。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 节假日日历自动化

单个节假日 *事件* 是驱动自动化的基础，例如：

- 在圣诞节的 *开始* 时打开圣诞彩灯。
- 防止您的遮盖在公共假期打开。

有关概述，请参阅[日历自动化](/home-assistant/integrations/calendar#automation)。您可以在条件或动作中使用[日历触发变量](/home-assistant/docs/automation/templating/#calendar)，例如事件的 `summary`、`description`、`location` 等。