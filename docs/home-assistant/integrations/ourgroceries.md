---
title: OurGroceries
description: '此集成会连接到您的 OurGroceries(https://www.ourgroceries.com/) 账户，并将您的购物清单集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - To-do List
ha_release: '2023.12'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: ourgroceries
ha_platforms:
  - todo
ha_integration_type: service
related:
  - docs: /integrations/todo
    title: 待办事项列表集成文档
  - docs: /integrations/#to-do-list
    title: 待办事项列表集成列表
  - docs: /dashboards/todo-list/
    title: 待办事项列表卡片
  - url: https://www.ourgroceries.com/
    title: OurGroceries
---
# OurGroceries

此集成会连接到您的 [OurGroceries](https://www.ourgroceries.com/) 账户，并将您的购物清单集成到 Home Assistant 中。

它会为每个购物清单添加一个[待办事项列表实体](/home-assistant/integrations/todo)，让您可以在 **待办事项列表** 仪表板中创建、更新或删除清单项目。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
