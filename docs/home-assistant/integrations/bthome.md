---
title: BTHome
description: 关于如何将 BTHome BLE 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@Ernst79'
  - '@thecode'
ha_domain: bthome
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - event
  - sensor
ha_integration_type: integration
---

将 [BTHome](https://bthome.io/) BLE 设备集成到 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

一旦启用了 [Bluetooth](/home-assistant/integrations/bluetooth) 集成并正常运行，BTHome BLE 集成将自动发现设备。

BTHome 是一种节能但灵活的 BLE 格式，用于通过蓝牙广播数据，允许您创建自己的 DIY BLE 传感器。有关 BTHome BLE 格式和使用该格式的项目的更多信息，请访问 [BTHome 网站](https://bthome.io/)。

## 绑定密钥

当您的 BTHome 传感器使用加密时，系统会提示您输入 32 个字符的十六进制（16 字节）加密密钥。此密钥称为绑定密钥（bindkey）。有关绑定密钥的更多信息，请参阅[规范](https://bthome.io/encryption)。
