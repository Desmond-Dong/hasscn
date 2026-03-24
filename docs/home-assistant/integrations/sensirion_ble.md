---
title: Sensirion BLE
description: 有关如何将 Sensirion BLE 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.12'
ha_iot_class: Local Push
ha_codeowners:
  - '@akx'
ha_domain: sensirion_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

将使用 [Sensirion](https://sensirion.com/) BLE 协议的传感器集成到 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用且可正常工作的 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，Sensirion BLE 集成会自动发现设备。

## 支持的设备

- [Sensirion MyCO2 Gadget](https://sensirion.com/products/catalog/SCD4x-CO2-Gadget/)
- [Sensirion SHT4x Smart Gadget](https://www.sensirion.com/products/catalog/SHT4x-Smart-Gadget)
- [Sensirion SHT31 Gadget](https://developer.sensirion.com/archive/platforms/sht31-smart-gadget-development-kit/)（未测试）
