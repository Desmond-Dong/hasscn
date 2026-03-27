---
title: Fibaro
description: 关于如何在 Home Assistant 中设置 Fibaro Home Center 和 Yubii Home 的说明。
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Event
  - Hub
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
ha_release: 0.83
ha_iot_class: Local Push
ha_domain: fibaro
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - event
  - light
  - lock
  - scene
  - sensor
  - switch
ha_codeowners:
  - '@rappenze'
ha_config_flow: true
ha_integration_type: hub
---
# Fibaro

**Fibaro** integration 允许您将 Home Assistant 连接到 Fibaro Home Center、Nice Yubii Home 或 Zooz Z-Box Hub，从而实现连接设备的控制和监控以及场景执行。Home Assistant 使用本地连接与集线器通信。

## 支持的集线器型号

Fibaro Home Center 2、Home Center Lite、Home Center 3、Home Center 3 Lite、Nice Yubii Home、Yubii Home Pro 和 Zooz Z-Box Hub。

## 功能

1. 控制连接到集线器的设备并同步设备状态（有关支持的设备和功能，请参阅平台）。
2. 配置 Fibaro 集成时以及 Home Assistant 重启时在 Fibaro 集线器中更改时，实体将自动添加。
3. 支持多个集线器。
4. 激活在 Fibaro 集线器中定义的场景。
5. 使用事件实体根据设备上的按钮按下事件触发您的 Home Assistant 自动化。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
::: 

:::tip
建议为您的 Fibaro 控制器分配静态 IP 地址。这确保它不会更改 IP 地址，因此如果控制器重新启动并以不同的 IP 地址启动，您不必更改 `url`。有关如何设置的详细信息，请参阅路由器手册。如果您需要 Fibaro 的 MAC 地址，请检查底部的标签。


:::
## 支持的平台

- 二值传感器
- 气候
- 遮盖
- 事件
- 灯光
- 门锁
- 场景
- 传感器
- 开关

## 故障排除

### 在 Z-Wave 设备上启用事件

事件平台使用 Z-Wave 设备发送的中央场景事件。
这对于开关设备开箱即用。

对于带有开关或输入端以连接开关的继电器设备，您通常需要更改 Z-Wave 参数 'Scenes sent'，因为事件通常默认禁用。