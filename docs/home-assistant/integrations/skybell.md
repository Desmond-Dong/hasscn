---
title: SkyBell
description: 'SkyBell 集成允许您在 Home Assistant 中接入 Skybell.com(http://www.skybell.com/) 门铃。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Camera
  - Doorbell
  - Light
  - Sensor
  - Switch
ha_release: 0.56
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: skybell
ha_platforms:
  - binary_sensor
  - camera
  - light
  - sensor
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: hub
---
# SkyBell

**SkyBell** 集成允许您在 Home Assistant 中接入 [Skybell.com](http://www.skybell.com/) 门铃。

Home Assistant 目前支持以下设备类型：

- [Binary sensor](/home-assistant/integrations/skybell/#binary-sensor)
- [Camera](/home-assistant/integrations/skybell/#camera)
- [Light](/home-assistant/integrations/skybell/#light)
- [Sensor](/home-assistant/integrations/skybell/#sensor)
- [Switch](/home-assistant/integrations/skybell/#switch)

目前此平台仅支持 SkyBell HD。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 集成实体

### 二进制传感器

每个添加的配置条目都会创建以下二进制传感器：

- **Button**：门铃按钮被按下时触发。
- **Motion**：检测到运动时触发。

## 摄像头

有两种可用的摄像头类型。默认类型是 `Avatar`，显示 SkyBell 头像图像，并会定期更新为新图像。另一种类型是 `Activity`，显示摄像头捕获的最近一次事件（运动、按铃或按需获取）的快照。

### 灯光

灯光实体支持开关和 RGB 颜色控制。

### 传感器

- **Chime Level**：室外铃声音量级别。（`0` 表示关闭）

### 开关

- **Do Not Disturb**：禁用室内铃声。
- **Motion Sensor**：开启/关闭运动检测。（启用后会将应用内通知重置为开启）
