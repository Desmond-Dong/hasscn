---
title: Brunt Blind Engine
description: 关于如何在 Home Assistant 中设置 Brunt Blind Engine 的说明。
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: brunt
ha_platforms:
  - cover
ha_config_flow: true
ha_integration_type: hub
---

**Brunt Blind Engine** 集成允许控制 [Brunt](https://www.brunt.co) 的盲窗引擎。要使用它，您需要一个 Brunt 应用账户。您账户中注册的所有 Brunt 盲窗设备将自动添加到您的 Home Assistant 中，名称与 Brunt 应用中给定的一致。

:::warning
此集成与 Brunt 无关，从移动应用程序的端点检索数据。使用风险自负。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::