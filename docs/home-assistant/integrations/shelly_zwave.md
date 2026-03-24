---
title: Shelly Z-Wave
description: 使用 Z-Wave 集成连接和控制您的 Shelly Z-Wave 设备
ha_release: '2025.6'
ha_iot_class: Local Push
ha_category:
  - Sensor
  - Switch
  - Plug
ha_domain: shelly
ha_integration_type: brand
ha_platforms:
  - binary_sensor
  - sensor
  - switch
works_with:
  - zwave
ha_iot_standard: zwave
ha_brand: true
---

[Shelly](https://shelly.com) 的 Z-Wave 设备可在本地运行，并与 Home Assistant 中的 Z-Wave 集成无缝配合使用（需要 Z-Wave 控制器）。由于所有连接都在本地完成，因此设备状态更新和控制都会立即在 Home Assistant 中生效。

[![Open **Add device** in your Home Assistant instance.](https://my.home-assistant.io/badges/add_zwave_device.svg)](https://my.home-assistant.io/redirect/add_zwave_device/?brand=shelly)

[进一步了解 Home Assistant 中的 Z-Wave。](/home-assistant/integrations/zwave_js/)

## 支持的设备

- [Shelly Wave PM Mini](https://www.shelly.com/products/shelly-qubino-wave-pm-mini)
- [Shelly Wave i4](https://www.shelly.com/products/shelly-qubino-wave-i4)
- [Shelly Wave 1PM Mini](https://www.shelly.com/products/shelly-qubino-wave-1pm-mini)
- [Shelly Wave 2PM](https://www.shelly.com/products/shelly-qubino-wave-2pm)
- [Shelly Wave Pro 1PM](https://www.shelly.com/products/shelly-wave-pro-1-pm)
