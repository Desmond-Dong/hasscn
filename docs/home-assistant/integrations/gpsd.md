---
title: GPSD
description: 关于如何将 GPSD 集成到 Home Assistant 的说明。
ha_category:
  - Utility
ha_release: 0.26
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
  - '@jrieger'
ha_domain: gpsd
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **GPSD** integration is using the GPS information collected by [gpsd](https://gpsd.gitlab.io/gpsd/index.html) and a GPS receiver.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
