---
title: Airzone Cloud
description: '此 integration 与 Airzone 设备(https://www.airzone.es/en/) 的云端 API 进行交互。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2023.6
ha_category:
  - Binary sensor
  - Climate
  - Select
  - Sensor
  - Switch
  - Water heater
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: airzone_cloud
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - select
  - sensor
  - switch
  - water_heater
ha_codeowners:
  - '@Noltari'
ha_integration_type: hub
---
# Airzone Cloud

此 integration 与 [Airzone 设备](https://www.airzone.es/en/) 的云端 API 进行交互。

主要有两种类型的 Airzone 设备：
- [Aidoo](https://www.airzonecontrol.com/aa/en/control-solutions/aidoo/wi-fi/) / [Aidoo Pro](https://www.airzonecontrol.com/aa/en/control-solutions/aidoo/pro/)
- [Easyzones (US)](https://www.airzonecontrol.com/aa/en/control-solutions/easyzones/) / [Flexa (EU)](https://www.airzonecontrol.com/ib/es/soluciones-de-control/flexa/)

## Aidoo / Aidoo Pro

这些设备是 Wi-Fi 控制器，通常连接到单个分体式空调系统。

## Easyzones (US) / Flexa (EU)

这些设备连接到管道式空调、电动格栅和每个房间（区域）的独立温控器。因此，使用单个管道式空调系统，用户可以打开和关闭空调，并在每个房间设置不同的所需温度。

典型的 Airzone 暖通系统由一个父设备（在 Airzone 术语中称为*主区域*）和子设备（在 Airzone 术语中称为*从区域*）组成。[暖通模式](https://www.home-assistant.io/integrations/climate/#action-climateset_hvac_mode)只能在父设备上更改。在子设备上，您只能启用或禁用暖通并调整该特定设备的所需温度。

请注意，多个暖通系统可以连接到同一个 Airzone Web 服务器。在这种情况下，每个暖通系统将有一个*父区域*，每个暖通系统也可能有*子区域*。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
  description: "云端 API 用户名"
Password:
  description: "云端 API 密码"
```

## 二值传感器

对于每个 Airzone 系统（暖通机器），将创建以下*二值传感器*：

| 条件           | 描述                                               |
| :------------------ | :-------------------------------------------------------- |
| problems            | 表示当前系统有错误或警告。 |

对于每个 Airzone 区域（温控器），将创建以下*二值传感器*：

| 条件           | 描述                                             |
| :------------------ | :------------------------------------------------------ |
| air_quality_active  | 表示空气质量控制正在运行。      |
| problems            | 表示当前区域有错误或警告。 |

## 温控

对于每个 Airzone Aidoo（暖通 Wi-Fi 控制器），将创建一个温控实体。

对于每个 Airzone 区域（温控器），将创建一个温控实体。

**暖通模式只能在*父区域*上更改。**

*子区域*只能启用/禁用在相应*父区域*上选择的当前暖通模式。尝试在*子区域*上更改暖通模式将导致 Home Assistant 错误。

## 选择器

对于每个 Airzone 区域（温控器），将创建以下*选择器*：

| 条件           | 描述                                         |
| :------------------ | :-------------------------------------------------- |
| air_quality         | 选择所需的空气质量工作模式。       |

## 传感器

对于每个 Airzone Aidoo（暖通 Wi-Fi 控制器），将创建以下*传感器*：

| 条件           | 描述                                        |
| :------------------ | :------------------------------------------------- |
| temperature         | 测量暖温控器的温度。 |

对于每个 Airzone 区域（温控器），将创建以下*传感器*：

| 条件           | 描述                                               |
| :------------------ | :-------------------------------------------------------- |
| air_quality_index   | 表示当前区域的空气质量指数。      |
| humidity            | 测量当前区域的相对湿度。       |
| pm1                 | 直径小于 1&nbsp;µm 的颗粒物浓度。   |
| pm2_5               | 直径小于 2.5&nbsp;µm 的颗粒物浓度。 |
| pm10                | 直径小于 10&nbsp;µm 的颗粒物浓度。  |
| temperature         | 测量当前区域的温度。             |

对于每个 Airzone WebServer（暖通 Wi-Fi 控制器），将创建以下*传感器*：

| 条件           | 描述                                        |
| :------------------ | :------------------------------------------------- |
| rssi                | Wi-Fi 信号强度。                                        |

## 开关

对于每个 Airzone 区域（温控器），将创建一个开关实体来打开或关闭温控器（不更改暖通模式）。

## 热水器

如果支持，将为每个 Airzone 设备创建一个*热水器实体*。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
