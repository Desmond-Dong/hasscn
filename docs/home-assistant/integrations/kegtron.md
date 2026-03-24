---
title: Kegtron
description: 关于如何将 Kegtron 智能酒桶监视器（第1代）集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@Ernst79'
ha_domain: kegtron
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

将 [Kegtron](https://kegtron.com/) 智能酒桶监视器（第一代）设备集成到 Home Assistant。

支持的设备：

- KT-100
- KT-200


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用且正常运行 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，Kegtron 集成会自动发现设备。

此集成仅支持通过 Bluetooth LE 通信的第一代 Smart Keg Monitor 设备。
