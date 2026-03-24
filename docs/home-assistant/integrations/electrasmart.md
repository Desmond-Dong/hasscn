---
title: Electra Smart
description: 关于如何在 Home Assistant 中集成 Electra 空调的说明。
ha_category:
  - Climate
ha_release: 2023.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jafar-atili'
ha_domain: electrasmart
ha_platforms:
  - climate
ha_integration_type: hub
---

[Electra Air](https://www.electra-air.co.il), is a company which manufactures and sells Air Conditioners.

To set up this integration, you must have access to the phone number used to register in the Electra Smart mobile app.

Air Conditioners configured in your Electra Smart mobile app will be discovered by Home Assistant after the Electra Smart integration is configured.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
