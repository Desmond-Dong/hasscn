---
title: Canary
description: 关于如何将 Canary 设备集成到 Home Assistant 的说明。
ha_category:
  - Alarm
  - Camera
  - Sensor
ha_release: '0.60'
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: canary
ha_platforms:
  - alarm_control_panel
  - camera
  - sensor
ha_integration_type: hub
---

**Canary** 集成允许您将 [Canary](https://canary.is) 设备集成到 Home Assistant 中。

目前 Home Assistant 支持以下设备类型：

- 报警
- [摄像头](#摄像头)
- [传感器](#传感器)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

加载后，您的前端将拥有以下实体：

- 每个摄像头的运动触发摄像头图像。
- 每个位置的报警控制面板。
- 每个摄像头报告温度的传感器。
- 每个摄像头报告湿度的传感器。
- 每个摄像头报告空气质量的传感器。

## 摄像头

`canary` 摄像头平台允许您在 Home Assistant 中观看 [Canary](https://canary.is) 摄像头的实时流。这需要已配置 [`ffmpeg` 集成](/home-assistant/integrations/ffmpeg/)。

设置好 [Canary 集成](/home-assistant/integrations/canary/) 后，您的 [Canary](https://canary.is) 摄像头应该会自动显示。

## 传感器

`canary` 传感器平台允许您将 [Canary](https://canary.is) 设备的传感器集成到 Home Assistant 中。

要将 `canary` 传感器添加到您的系统，请按照上面的说明操作。

加载后，您将看到以下传感器：

- 每个摄像头报告温度的传感器。
- 每个摄像头报告湿度的传感器。
- 每个摄像头报告空气质量的传感器。