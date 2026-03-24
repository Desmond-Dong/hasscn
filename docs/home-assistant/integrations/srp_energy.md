---
title: SRP Energy
description: 如何将 SRP Energy 集成到 Home Assistant 中。
ha_category:
  - Energy
ha_release: 2020.12
ha_iot_class: Cloud Polling
ha_domain: srp_energy
ha_codeowners:
  - '@briglx'
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

The **SRP Energy** integration shows information from SRP hourly energy usage report for their customers.

You need a username, password, and account ID which you can create at [SRP](https://www.srpnet.com).


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
