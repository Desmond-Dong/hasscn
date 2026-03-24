---
title: Sensor.Community
description: 关于如何将 Sensor.Community 传感器添加到 Home Assistant 的说明。
ha_category:
  - Health
  - Sensor
ha_release: 0.82
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_domain: luftdaten
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

**Sensor.Community** 集成会查询 [Sensor.Community](https://sensor.community) 的开放数据 API，以监控指定（自建）传感器站的空气质量和其他天气数据。

## 前提条件

要获取颗粒物、气压、噪声、温度或湿度传感器的 ID，请在 [Sensor.Community 地图](https://maps.sensor.community/) 上选中对应传感器。

选中传感器后，侧边栏中会显示所需 ID，前面会带有一个 `#`。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
