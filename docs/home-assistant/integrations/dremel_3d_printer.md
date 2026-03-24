---
title: Dremel 3D Printer
description: 关于将 Dremel 3D 打印机集成到 Home Assistant 的说明。
ha_category:
  - 3D printing
  - Sensor
ha_iot_class: Local Polling
ha_release: 2023.7
ha_config_flow: true
ha_domain: dremel_3d_printer
ha_platforms:
  - binary_sensor
  - button
  - camera
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

[Dremel 3D Printer](https://www.dremel.com/gn/en/digilab) 集成允许您通过 Home Assistant 监控您的 Dremel 3D 打印机及其进度。此集成目前仅支持 3D20、3D40 和 3D45。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::