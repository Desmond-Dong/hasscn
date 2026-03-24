---
title: Whois
description: 关于如何在 Home Assistant 中集成 WHOIS 查询传感器的说明。
ha_category:
  - Network
ha_release: 0.57
ha_iot_class: Cloud Polling
ha_domain: whois
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

**Whois** 集成可让您每天对自己拥有的域名执行 WHOIS 查询。它会提供 `expiration_date`、`name_servers` 和 `registrar` 等信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
