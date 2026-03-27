---
title: Starlink
description: 'Starlink 集成允许您将 Starlink(https://www.starlink.com/) 接入 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Button
  - Device tracker
  - Network
  - Sensor
  - Switch
  - Time
ha_release: 2023.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@boswelja'
ha_domain: starlink
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - sensor
  - switch
  - time
ha_integration_type: device
---
# Starlink

**Starlink** 集成允许您将 [Starlink](https://www.starlink.com/) 接入 Home Assistant。

**Important:** 如果您的 Starlink 处于 bypass 模式，您需要为其配置路由，以便访问本地 API。否则此集成将无法工作。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 传感器

- Ping - Starlink 测得的 ping，单位毫秒
- Ping drop rate - ping 请求失败的百分比（即 “dropped”），等同于 Starlink 应用中 “Uptime” 的反值
- Azimuth - Dishy 朝向的方位角，单位度
- Elevation - Dishy 当前仰角，单位度
- Last restart - Starlink 上次开机的时间
- Uplink throughput - 用户终端上传的数据量
- Downlink throughput - 用户终端下载的数据量
- Upload - 用户终端累计上传字节数
- Download - 用户终端累计下载字节数
- Power - 最近一次测得的功率，单位 W
- Energy - 能耗，单位 kWh

### 二进制传感器

- Connected - Starlink 是否已连接到互联网
- Update available - 是否有待安装的更新
- Roaming mode - Starlink 是否处于 “roaming” 模式。Roaming 是一种可选升级，允许您在家庭地址之外使用 Starlink（也称 “portability mode”）

#### 诊断传感器

- Obstructed - Dishy 当前是否被遮挡
- Heating - Dishy 当前是否在加热。这可能是因为气温较低，或正在尝试融化积雪和冰层
- Sleep - Starlink 是否按 Starlink 应用中定义的时间表进入 “sleeping” 状态
- Mast near vertical - Dishy 是否安装得接近垂直
- Motors stuck - Dishy 是否无法移动
- Slow ethernet - 以太网链路是否未达到最大（千兆）速度
- Thermal throttle - Starlink 是否为了避免过热而降低性能
- Unexpected location - Starlink 是否检测到其运行位置超出指定区域

### 按钮

- Restart - 重启用户终端

### 开关

- Stowed - 控制 Dishy 是否收纳
- Sleep schedule - 控制 Starlink 是否按预设计划进入省电休眠模式

### 设备追踪器

- Device location - 跟踪 Dishy 的纬度、经度和海拔。要使其生效，您需要通过 Starlink 应用允许本地网络位置访问。该选项在 Starlink 应用中默认禁用，因此在 Home Assistant 中也默认禁用。

### 时间实体

- Sleep start - 如果启用了 `Sleep Schedule`，Starlink 进入休眠模式的时间
- Sleep end - 如果启用了 `Sleep Schedule`，Starlink 退出休眠模式的时间
