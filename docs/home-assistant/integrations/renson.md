---
title: Renson
description: 有关如何将 Renson Endura Delta 传感器集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Button
  - Fan
  - Number
  - Switch
  - Time
ha_release: 2023.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@jimmyd-be'
ha_domain: renson
ha_platforms:
  - binary_sensor
  - button
  - fan
  - number
  - sensor
  - switch
  - time
ha_integration_type: device
---

**Renson** 集成会从 Renson Endura Delta 设备拉取数据。Android/iOS 应用中大多数可监控的传感器，也都可以通过此集成进行监控。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

### 操作：设置定时器级别

`renson.set_timer_level` 操作用于设置通风定时器。

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `timer_level`| yes | Level setting | |
  | `minutes` | yes | Time of the timer (0 will disable the timer) | |

### 操作：设置微风模式

`renson.set_breeze` 操作用于设置通风系统的微风功能。

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `breeze_level`| no | Ventilation level when breeze function is activated | |
  | `temperature` | no | Temperature when the breeze function should be activated in °C | |
  | `activate` | yes | Activate or disable the breeze feature | `2020-05-01T17:45:00` |

### 操作：设置污染控制参数

`renson.set_pollution_settings` 操作用于设置通风系统的所有污染控制参数。

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `day_pollution_level`| no | Ventilation level when pollution is detected in the day | |
  | `night_pollution_level` | no | Ventilation level when pollution is detected in the night | |
  | `humidity_control` | no | Activate or disable the humidity control | |
  | `airquality_control` | no | Activate or disable the air quality control | |
  | `co2_control` | no | Activate or disable the CO2 control | `2020-05-01T17:45:00` |
  | `co2_threshold` | no | Sets the CO2 pollution threshold level in ppm | `2020-05-01T17:45:00` |
  | `co2_hysteresis` | no | Sets the CO2 pollution threshold hysteresis level in ppm | `2020-05-01T17:45:00` |
