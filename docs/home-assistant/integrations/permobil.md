---
title: MyPermobil
description: 'MyPermobil 集成允许您查看与 Permobil 轮椅相关的各种传感器信息，例如电池状态、行驶距离和座椅调整次数。传感器的值可能会延迟数分钟，因此不应依赖这些数据进行关键用途。要使集成正常工作，您必须确保在 MyPermobil 应用中启用了 voice assistant linking。'
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2023.12
ha_domain: permobil
ha_codeowners:
  - '@IsakNyberg'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
---
# MyPermobil

**MyPermobil** 集成允许您查看与 Permobil 轮椅相关的各种传感器信息，例如电池状态、行驶距离和座椅调整次数。传感器的值可能会延迟数分钟，因此不应依赖这些数据进行关键用途。要使集成正常工作，您必须确保在 MyPermobil 应用中启用了 _voice assistant linking_。为此，请打开应用并前往 **Settings** > **My Account** > **Connection Settings**。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

总共提供 13 个传感器：

- **Battery charge**
  轮椅当前电池电量百分比。
- **Battery health**
  电池可容纳的最大电量，以电池原始容量的百分比表示。
- **Charge time left**
  表示电池充满还需要多少小时。此传感器仅在电池正在充电时有效。
- **Distance left**
  轮椅在当前电量下还能行驶的距离。该数值为估算值，不应完全依赖。
- **Indoor drive time**
  当前电量下预计剩余的室内行驶时间（小时）。
- **Battery max watt hours**
  电池满容量时可存储的能量，单位为瓦时。
- **Watt hours left**
  电池当前电量对应的剩余能量，单位为瓦时。
- **Full charge distance**
  轮椅满电时可行驶的距离。该数值为估算值，不应完全依赖。
- **Distance traveled**
  轮椅今天已行驶的距离。
- **Number of adjustments**
  今天的调整会话次数。短时间内多次不同调整会被计为一次会话。
- **Highest number of adjustments**
  历史上单日记录到的最大调整次数。
- **Longest distance traveled**
  历史上单日记录到的最长行驶距离。
- **Is charging**
  当 Permobil 轮椅正在充电时为 `true` 的二进制传感器。
