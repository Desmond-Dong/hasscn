---
title: Wolf SmartSet Service
description: 关于如何在 Home Assistant 中集成 Wolf Smart-Set 云服务的说明。
ha_category:
  - Climate
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@adamkrol93'
  - '@mtielen'
ha_domain: wolflink
ha_platforms:
  - sensor
ha_integration_type: device
---

**Wolf SmartSet Service** 集成使用 [Wolf Smart-Set](https://www.wolf-smartset.com/) 网络服务来获取您的供暖系统状态。

目前，此集成可以收集温度、压力和供暖状态等信息。

请注意，要将供暖设备集成到 Home Assistant，您需要将 WOLF LinkHome 设备连接到供暖设备上。

此集成会根据供暖设备公开的参数来获取所有数据。

## 已测试的设备

- Wolf Link Home Pro connected to a FGB-28 device
- Wolf ISM7e / Link Pro connected to a COB-20 device
- Wolf ISM7 (HW v1.0, SW v2.10.47) connected to a CGB-2-14 device


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
