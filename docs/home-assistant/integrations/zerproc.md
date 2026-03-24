---
title: Zerproc
description: 关于在 Home Assistant 中集成 Zerproc 蓝牙灯的说明。
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: '0.110'
ha_domain: zerproc
ha_codeowners:
  - '@emlove'
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: hub
---

此集成发现附近的 Zerproc 灯并将其添加到 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

集成将扫描附近的设备，如果找到任何设备则完成。不需要额外配置。集成将每 60 秒执行一次 BLE 扫描以搜索新设备。