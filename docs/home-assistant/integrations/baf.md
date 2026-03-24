---
title: Big Ass Fans
description: 关于如何将 BAF 设备集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Climate
  - Fan
  - Light
  - Number
  - Sensor
  - Switch
ha_zeroconf: true
ha_release: 2022.6
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@jfroy'
ha_domain: baf
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - fan
  - light
  - number
  - sensor
  - switch
ha_integration_type: device
---

将 [Big Ass Fans](https://www.bigassfans.com/) 设备集成到 Home Assistant 中。

## 支持的设备

- 固件版本 3.0 及更高版本的 Haiku 风扇（不支持旧版 SenseME 固件）
- 已停产的固件版本 3.0 及更高版本的 Haiku 灯具（不支持旧版 SenseME 固件）
- i6 风扇

## 平台

### 二值传感器

对于支持 Auto Comfort 且运行固件 3.1 或更高版本的设备，提供占用传感器实体。该传感器有约 5 分钟的保持时间，并推送状态更新。

### 气候

对于支持 Auto Comfort 的设备，气候实体允许调整目标温度。

:::note
**气候和气候传感器变得不可用：** 在某些型号上，气候和温度等某些传感器由遥控器提供，而不是风扇本身。当风扇失去与遥控器的连接时，这些实体可能变得不可用，而风扇仍然可用。请参阅供应商文档了解如何在风扇和遥控器之间重新建立连接，并重新加载集成以恢复实体可用性。

:::
### 数字

对于支持 Auto Comfort 的设备，可以调整最小和最大速度。

运动后返回自动模式或重新关闭的超时时间以秒为单位。

### 传感器

如果设备支持，集成会创建以下传感器，它们接收推送更新：

- 温度
- 湿度

额外的诊断传感器可用，它们通常不接收推送更新，如果需要可以在 UI 中启用。

### 开关

集成将 Whoosh 模式表示为风扇的开关。启用 Whoosh 时，风扇将锁定到当前速度，并从锁定点开始改变速度。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::