---
title: Tilt Hydrometer BLE
description: 关于如何将 Tilt Hydrometer BLE 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@apt-itude'
ha_domain: tilt_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

Integrates [Tilt Hydrometer](https://tilthydrometer.com/) BLE devices into Home Assistant.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The Tilt Hydrometer BLE integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Tilt Hydrometer and Thermometer](https://tilthydrometer.com/products/copy-of-tilt-floating-wireless-hydrometer-and-thermometer-for-brewing) (all colors)
