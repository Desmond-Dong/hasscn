---
title: Uptime
description: 关于如何将运行时间传感器集成到 Home Assistant 的说明。
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 0.56
ha_quality_scale: internal
ha_domain: uptime
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

**Uptime** 集成会提供一个传感器，用于保存 Home Assistant 上次启动时的时间戳（日期和时间）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
