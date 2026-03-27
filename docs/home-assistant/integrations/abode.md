---
title: Abode
description: 'Abode integration 允许您将 Abode 家庭安全系统集成到 Home Assistant 中，并使用其报警系统和传感器触发自动化。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Alarm
  - Binary sensor
  - Camera
  - Cover
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: 0.52
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@shred86'
ha_domain: abode
ha_homekit: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - cover
  - light
  - lock
  - sensor
  - switch
ha_integration_type: integration
---
# Abode

**Abode** integration 允许您将 Abode 家庭安全系统集成到 Home Assistant 中，并使用其报警系统和传感器触发自动化。

请访问 [Abode 官网](https://goabode.com/) 了解更多关于 Abode 安全系统的信息。

目前 Home Assistant 支持以下 device 类型：

- **报警控制面板**：报告当前报警状态，可用于布防和撤防系统。
- **二值传感器**：报告`快速操作`、`门磁`、`连接`sensors（遥控器、键盘和状态指示器）、`湿度`传感器以及`运动`或`占用`传感器。
- **摄像头**：报告`摄像头`设备，并将下载并显示最新捕获的静止图像。可以使用 [`camera.turn_off`](/home-assistant/integrations/camera/#action-turn_off) 和 [`camera.turn_on`](/home-assistant/integrations/camera/#action-turn_on) actions 关闭和开启。
- **遮盖**：报告`安全屏障`，可用于打开和关闭遮盖。
- **门锁**：报告`门锁`，可用于锁定和解锁门。
- **灯光**：报告`调光灯`，可用于调光或开关灯。
- **开关**：报告`电源开关`和`水阀`设备，可以打开和关闭。还报告在 Abode 系统中设置的`自动化`，并允许您激活或停用它们。
- **传感器**：报告`温度`、`湿度`和`光照`传感器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 事件

Abode 可以触发多种 events。
它们分为以下事件：

- **abode_alarm**：当 Abode 触发报警事件时触发。包括烟雾、一氧化碳、紧急和入侵报警。
- **abode_alarm_end**：当 Abode 触发报警结束事件时触发。
- **abode_automation**：当 Abode 触发自动化时触发。
- **abode_panel_fault**：当 Abode 中心出现故障时触发。包括断电、低电量、防拆开关、轮询失败和信号干扰等事件。
- **abode_panel_restore**：当面板故障恢复时触发。
- **abode_disarm**：当报警撤防时触发。
- **abode_arm**：当报警布防（在家或外出）时触发。
- **abode_arm_fault**：当报警布防（在家或外出）并出现故障时触发。包括门窗未关、低电量、备用连接。如果存在故障，则不会触发 abode_arm。
- **abode_test**：当传感器处于测试模式时触发。
- **abode_capture**：当捕获图像时触发。
- **abode_device**：当设备更改/添加/删除时触发。

所有 events 都有以下字段：

| 字段 | 描述 |
| ----- | ----------- |
| `device_id` | 事件的 Abode 设备 ID。 |
| `device_name` | 事件的 Abode 设备名称。 |
| `device_type` | 事件的 Abode 设备类型。 |
| `event_code` | 事件的事件代码。 |
| `event_name` | 事件的名称。 |
| `event_type` | 事件的类型。 |
| `event_utc` | 事件的 UTC 时间戳。 |
| `user_name` | 触发事件的 Abode 用户（如适用）。 |
| `app_type` | 触发事件的 Abode 应用程序（例如，网页应用、iOS 应用等）。 |
| `event_by` | 触发事件的键盘用户。 |
| `date` | 事件的日期，格式为 `MM/DD/YYYY`。 |
| `time` | 事件的时间，格式为 `HH:MM AM`。 |

已知 event_codes 的唯一列表定义在
[events.csv](https://github.com/jaraco/jaraco.abode/blob/main/jaraco/abode/helpers/events.csv)
中，推断的组及其事件代码范围定义在
[timeline.py](https://github.com/jaraco/jaraco.abode/blob/main/jaraco/abode/helpers/timeline.py) 中。

## 动作

可用的 actions：`change_setting`、`capture_image`、`trigger_automation`

### 动作：更改设置

`abode.change_setting` 动作用于更改 Abode 系统上的设置。
有关设置和有效值的完整列表，请参阅
[`jaraco.abode` 设置部分](https://github.com/jaraco/jaraco.abode/blob/main/README.rst#settings)。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `setting` | 否 | 您希望更改的设置。 |
| `value` | 否 | 您希望将设置更改为的值。 |

### 动作：捕获图像

`abode.capture_image` 动作用于从 Abode 摄像头请求新的静止图像。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 指向 Abode 摄像头 `entity_id` 的字符串或字符串列表。 |

### 动作：触发自动化

`abode.trigger_automation` 动作用于触发 Abode 系统上的自动化。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 指向代表 Abode 自动化的开关 `entity_id` 的字符串或字符串列表。 |