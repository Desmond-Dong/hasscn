---
title: Aseko Pool Live
description: 关于如何在 Home Assistant 中集成 Aseko ASIN AQUA 投料系统的说明。
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2022.2
ha_category:
  - Sensor
ha_codeowners:
  - '@milanmeu'
ha_domain: aseko_pool_live
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

**Aseko Pool Live** 集成允许您监控 Aseko ASIN Aqua 投料系统和 Aseko ASIN Pool 控制器。

该集成完全兼容 ASIN AQUA Net 和 ASIN AQUA Home。

如果您拥有 ASIN AQUA Oxygen、Home、Salt 或 Profi 投料系统，并且并非所有探头都列在 Home Assistant 中，请[在 GitHub 上提出问题](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&title=Add%20support%20for%20ASIN%20AQUA%20[your%20device%20model])并包含您序列号的前 8 位数字，以便您的设备型号可以完全兼容 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::