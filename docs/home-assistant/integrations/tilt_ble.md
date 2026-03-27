---
title: Tilt Hydrometer BLE
description: 'Integrates Tilt Hydrometer(https://tilthydrometer.com/) BLE devices into Home Assistant. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
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
# Tilt Hydrometer BLE

Integrates [Tilt Hydrometer](https://tilthydrometer.com/) BLE devices into Home Assistant.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The Tilt Hydrometer BLE integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Tilt Hydrometer and Thermometer](https://tilthydrometer.com/products/copy-of-tilt-floating-wireless-hydrometer-and-thermometer-for-brewing) (all colors)
