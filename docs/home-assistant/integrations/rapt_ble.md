---
title: RAPT Bluetooth
description: 有关如何将蓝牙模式下配置的 RAPT 药丸比重计集成到 Home Assistant 中的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2023.5
ha_iot_class: Local Push
ha_codeowners:
  - '@sairon'
ha_domain: rapt_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

此集成可将 [RAPT Pill](https://kegland.com.au/products/yellow-rapt-pill-hydrometer-thermometer-wifi-bluetooth) 比重计接入 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用且正常运行 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，RAPT Pill BLE 集成会自动发现设备。必须在 Settings - Telemetry method 中将 RAPT Pill 切换为蓝牙模式。详细说明请参阅[用户手册](https://cdn.shopify.com/s/files/1/0667/3019/7248/files/KL20596_-_RAPT_Pill_Hydrometer_and_Thermometer_Quick_Start_Guide.pdf)。

## 支持的设备

- [RAPT Pill Hydrometer & Thermometer](https://kegland.com.au/products/yellow-rapt-pill-hydrometer-thermometer-wifi-bluetooth)
