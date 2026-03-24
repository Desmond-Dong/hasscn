---
title: StarLine
description: 有关如何使用 Home Assistant 设置 StarLine 帐户的说明。
ha_category:
  - Binary sensor
  - Button
  - Car
  - Lock
  - Presence detection
  - Sensor
  - Switch
ha_release: 0.103
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@anonym-tsk'
ha_domain: starline
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - lock
  - sensor
  - switch
ha_integration_type: hub
---

**StarLine** 集成可让您从 [StarLine portal](https://my.starline.ru/) 获取 [StarLine](https://www.alarmstarline.com/) 安防系统的数据。您需要一个可用的 StarLine 账户。

此集成提供以下平台：

- Binary sensors：手刹、引擎盖、后备箱、报警状态、车门锁状态、免提、空挡、移动限制状态、点火状态和自动启动状态。
- Device tracker：车辆位置。
- Lock：控制车辆上锁/解锁。
- Sensors：电池电量、SIM 卡余额、GSM 信号强度、GPS 卫星数量、油量、里程、OBD 错误、车内温度和发动机温度。
- Switches：启动/停止发动机、加热器（webasto）、附加通道和服务模式。
- Buttons：鸣笛、flex logic 和 panic mode。
- Actions：更新状态、设置更新频率。更多详情见[这里](#actions)。

## 前提条件

请在 [StarLine developer profile](https://my.starline.ru/developer) 中创建一个新应用。

:::note
该集成通过调用 StarLine 服务器 API 获取数据。它只会获取 API 调用当下有效的最新一组数值。这意味着集成不会在两次 API 调用之间检索或存储数值、StarLine 事件或参数。
您每天最多可进行 1000 次 API 调用，也就是大约每 86 秒调用一次。
默认情况下，集成状态每 3 分钟更新一次，OBD 信息每 3 小时更新一次，总计每天约 488 次调用。
不建议将更新间隔设置为小于 90 秒。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

### 更新状态

`starline.update_state` 操作用于从 StarLine 服务器获取设备的最新状态。

此操作不需要任何属性。

### 设置扫描间隔

`starline.set_scan_interval` 操作用于设置实体的更新频率。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `scan_interval` | 否 | 更新频率，单位为秒。 |

### 设置 OBD 扫描间隔

`starline.set_scan_obd_interval` 操作用于设置 OBD 信息的更新频率。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `scan_interval` | 否 | 更新频率，单位为秒。 |

## 免责声明

本软件与 ScPA StarLine Ltd. 无关联，也未获得其认可。
