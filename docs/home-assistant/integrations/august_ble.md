---
title: August Bluetooth
description: 使用 Yale Access 蓝牙集成连接和控制您的 August 蓝牙设备
ha_category:
  - Binary sensor
  - Lock
  - Sensor
ha_release: 2022.9
ha_domain: august_ble
ha_integration_type: virtual
ha_supporting_domain: yalexs_ble
ha_supporting_integration: Yale Access Bluetooth
ha_bluetooth: true
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_iot_class: Local Push
---

[August](https://august.com/) 门锁可通过蓝牙接入 Home Assistant。

自 Yale 的母公司 Assa Abloy 于 2017 年收购 August 以来，大多数较新的设备都采用 Yale Access 品牌。

:::note
此集成由 [Yale Access Bluetooth](/home-assistant/integrations/yalexs_ble/) 集成支持。
:::
