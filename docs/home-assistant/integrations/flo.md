---
title: Flo
description: 关于如何将 Flo by Moen 集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Sensor
  - Switch
  - Water management
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
ha_domain: flo
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: hub
---

**Flo** 集成集成了
[Flo by Moen smart water shutoff valves](https://www.moen.com/flo) 进入家庭助理。

Home Assistant 目前支持以下设备类型：

- **二进制传感器**：报告是否有任何警报。
- **传感器**：报告设备的系统模式、水流量、温度、水压和每日用水量。
- **开关**：允许您打开和关闭断水装置上的阀门。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 行动

### `flo.run_health_test`

为 Flo 设备运行运行状况测试。

### `flo.set_away_mode`

将 Flo 设备设置为离开模式。

### `flo.set_home_mode`

将 Flo 设备设置为家庭模式。

### `flo.set_sleep_mode`

将 Flo 设备设置为睡眠模式。
