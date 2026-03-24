---
title: Launch Library
description: 关于如何在 Home Assistant 中集成太空发射信息的说明。
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.83
ha_codeowners:
  - '@ludeeus'
  - '@DurgNomis-drol'
ha_domain: launch_library
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: service
---

**Launch Library** 集成会为您提供下一次计划中的太空发射和 SpaceX Starship 活动信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

此平台显示的数据来自 [launchlibrary.net][launchlibrary]。

[launchlibrary]: https://launchlibrary.net/
