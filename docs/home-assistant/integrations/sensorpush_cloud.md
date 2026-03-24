---
title: SensorPush Cloud
description: 有关如何将 SensorPush Cloud 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_release: 2025.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@sstallion'
ha_domain: sensorpush_cloud
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

将 [SensorPush Cloud](https://www.sensorpush.com/) 设备集成到 Home Assistant 中。

## 前提条件

要使用 Cloud API，需要一台 [G1 WiFi Gateway](https://www.sensorpush.com/products/p/g1-gateway)。要启用 API 访问，请登录 [Gateway Cloud Dashboard](https://dashboard.sensorpush.com/) 并同意服务条款。

在您通过 iOS 或 Android 上的 SensorPush 应用激活设备之前，传感器实体（温度、湿度、气压）不会在 Home Assistant 中可用。

## 支持的设备

- [HT1 Temperature and Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht1)
- [HT.w Water-Resistant Temperature / Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht-w)
- [HTP.xw Extreme Accuracy Water-Resistant Temperature / Humidity / Barometric Pressure Smart Sensor](https://www.sensorpush.com/products/p/htp-xw)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

每台设备都会创建以下传感器：

| 传感器 | 说明 |
| :--------------------- | :------------------------------------------------------------ |
| `altitude`             | 测量海拔。（默认禁用） |
| `atmospheric_pressure` | 测量气压。（默认禁用） |
| `battery_voltage`      | 测量电池电压。（默认禁用） |
| `dewpoint`             | 测量露点。（默认禁用） |
| `humidity`             | 测量相对湿度。 |
| `signal_strength`      | 测量蓝牙信号强度。（默认禁用） |
| `temperature`          | 测量温度。 |
| `vapor_pressure`       | 测量蒸汽压亏缺。（默认禁用） |

## 已知限制

- `atmospheric_pressure` 在 HT1 和 HT.w 系列设备上不可用。

## 移除此集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
