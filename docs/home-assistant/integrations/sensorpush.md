---
title: SensorPush
description: '将 SensorPush(https://www.sensorpush.com/) 设备集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: sensorpush
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---
# SensorPush

将 [SensorPush](https://www.sensorpush.com/) 设备集成到 Home Assistant 中。

## 需要先激活

在您通过 iOS 或 Android 上的 SensorPush 应用激活设备之前，传感器实体（温度、湿度、气压）不会在 Home Assistant 中可用。

## 支持的设备

- [HT1 Temperature and Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht1)
- [HT.w Water-Resistant Temperature / Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht-w)
- [HTP.xw Extreme Accuracy Water-Resistant Temperature / Humidity / Barometric Pressure Smart Sensor](https://www.sensorpush.com/products/p/htp-xw)

启用且可正常工作的 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，SensorPush 集成会自动发现设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
