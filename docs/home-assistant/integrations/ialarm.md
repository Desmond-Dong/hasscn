---
title: Antifurto365 iAlarm
description: 关于如何将 iAlarms 报警系统集成到 Home Assistant 的说明。
ha_category:
  - Alarm
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '2021.5'
ha_domain: ialarm
ha_codeowners:
  - '@RyuzakiKK'
ha_platforms:
  - alarm_control_panel
ha_integration_type: device
---

**iAlarm** 集成可连接 [Antifurto365](https://www.antifurtocasa365.it/) 的 iAlarm 报警系统，并且已确认也适用于 Meian 和 Emooluxr 品牌的报警系统。
请注意，最新的 iAlarm-XR 报警系统暂不受支持。

此平台支持以下操作：

- `alarm_control_panel.alarm_arm_away`
- `alarm_control_panel.alarm_arm_home`
- `alarm_control_panel.alarm_disarm`


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
