---
title: Airthings BLE
description: 关于如何通过蓝牙 LE 设置 Airthings 设备的说明。
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2022.11'
ha_iot_class: Local Polling
ha_codeowners:
  - '@vincegio'
  - '@LaStrada'
ha_domain: airthings_ble
ha_bluetooth: true
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
---

将 Airthings BLE sensors 集成到 Home Assistant 中。

[Airthings](https://www.airthings.com/) 提供各种用于测量空气质量的 devices。最初专注于氡气传感器，每台设备都提供多种不同的传感器来监测典型的污染物，这些污染物的存在会导致家中空气质量变差。

需要 Airthings 硬件和兼容的蓝牙适配器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

一旦启用 [蓝牙](/home-assistant/integrations/bluetooth) 集成并正常运行，Airthings BLE 集成将自动发现设备。这将包括设备名称及其序列号。

有两种方法可以获取 Airthings 设备的 10 位序列号：
1. 在设备背面，位于磁性背板下方。
2. Airthings 应用程序：**设备设置 -> 设备信息 -> 序列号**

此集成使用序列号的最后 6 位数字。

## 支持的设备

- Wave gen. 1
- Wave Radon
- Wave Mini
- Wave Plus
- Wave Enhance
- Corentium Home 2

## 传感器

根据设备型号添加到 Home Assistant 的传感器实体：
- 湿度
- 照度
- 气压（相对值，取决于家庭海拔）
- 氡气 1 天和长期平均值，以及等级
- 温度
- 挥发性有机化合物 (VOC)
- 二氧化碳 (Co2)
- 电池

## 移除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
