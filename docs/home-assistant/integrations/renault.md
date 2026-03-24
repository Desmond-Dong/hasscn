---
title: Renault
description: 有关如何将雷诺汽车集成到家庭助理中的说明。
ha_category:
  - Binary sensor
  - Car
  - Presence detection
  - Select
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: renault
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - select
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

**Renault** 集成接入 **MyRenault** 云服务，并提供充电器状态、温度等传感器。

此集成提供以下平台：

- Binary sensors - 例如插枪状态和充电状态。
- Buttons - 用于启动空调、开始/停止充电、闪灯和鸣笛。请注意，虽然这些操作可用，但并非所有车辆都支持。
- Device tracker - 用于跟踪车辆位置。
- Selectors - 用于更改充电模式。
- Sensors - 例如电池电量、车外温度、里程表、预计续航、充电速率和胎压。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Locale:
  description: "用于连接 Renault 服务器的国家/地区代码（例如 `fr_FR`、`en_GB`）。该值应与您的 MyRenault 账户区域设置一致。"
Username:
  description: "用于连接 Renault 服务器的用户名。"
Password:
  description: "用于连接 Renault 服务器的密码。"
Kamereon account id:
  description: "您的车辆所属的 Kamereon account ID。如果只有一个可用账户，则会自动选中。"
```

之后，关联到账户的所有车辆都会作为设备添加，相应传感器也会作为关联实体添加。

在某些情况下，部分功能可能需要订阅，例如 *Pack EV Remote Control* 和/或 *Pack Smart Navigation*。

## 数据更新

由于 Renault 服务器存在速率限制，此集成将轮询限制为每小时 60 次数据请求。
对于单辆且 7 个端点均可用的车辆，集成大约每 7 分钟拉取一次数据。

## 操作

### 操作：启动空调

`renault.ac_start` 操作用于启动车辆空调。

  | 数据属性 | 必填 | 说明 | 示例 |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| 是 | 车辆的 device_id | |
  | `temperature` | 是 | 目标空调温度（摄氏度） | |
  | `when` | 否 | 空调启动时间戳（可选，默认为当前时间） | `2020-05-01T17:45:00` |

### 操作：取消空调

`renault.ac_cancel` 操作用于取消车辆空调。

  | 数据属性 | 必填 | 说明 |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| 是 | 车辆的 device_id |

### 操作：设置空调计划

`renault.ac_set_schedules` 操作用于更新车辆的空调计划。

  | 数据属性 | 必填 | 说明 | 示例 |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| 是 | 车辆的 device_id | |
  | `schedules` | 是 | 计划详情。可以是单个计划，也可以是计划列表 | 参见[下方示例](#ac_schedule_example) |

说明：

- `schedules` 可包含一个或多个计划，并在同一次调用中设置。
- 每个 `schedule` 都必须包含 `id`（通常根据车辆不同为 1 到 5）。
- `activated` 标志是可选布尔值；如果未提供，则保留现有值。
- `monday` 到 `sunday` 字段都是可选的；如果未提供，则保留对应日期的现有设置。如果提供为 None，则会清除现有设置。如果提供了值，则必须包含键 `readyAtTime`（UTC 格式）。

<a name="ac_schedule_example">示例</a>:

```yaml
- id: 1 
  activated: true 
  monday: 
    readyAtTime: 'T12:00Z' 
- id: 2 
  activated: false 
  monday:
    readyAtTime: 'T12:00Z' 
  tuesday:
    readyAtTime: 'T12:00Z'
```

### 操作：设置充电计划

`renault.charge_set_schedules` 操作用于更新车辆的充电计划。

  | 数据属性 | 必填 | 说明 | 示例 |
  | ---------------------- | -------- | ----------- | ------- |
  | `vehicle`| 是 | 车辆的 device_id |
  | `schedules` | 是 | 计划详情。可以是单个计划，也可以是计划列表 | 参见[下方示例](#schedule_example) |
  
说明：

- `schedules` 可包含一个或多个计划，并在同一次调用中设置。
- 每个 `schedule` 都必须包含 `id`（通常根据车辆不同为 1 到 5）。
- `activated` 标志是可选布尔值；如果未提供，则保留现有值。
- `monday` 到 `sunday` 字段都是可选的；如果未提供，则保留对应日期的现有设置。如果提供为 None，则会清除现有设置。如果提供了值，则必须包含键 `startTime`（UTC 格式）和 `duration`（分钟）。

<a name="schedule_example">示例</a>:

```yaml
- id: 1 
  activated: true 
  monday: 
    startTime: 'T12:00Z'
    duration: 15 
- id: 1 
  activated: false 
  monday: 
    startTime: 'T12:00Z'
    duration: 15 
```

## 已知限制

- 部分功能可能需要订阅，例如 *Pack EV Remote Control* 和/或 *Pack Smart Navigation*。
- 较新的车辆在某些操作中使用了新的端点，而底层库尚未支持这些端点。对应操作目前会以错误代码 `err.func.wired.forbidden` 失败。

## 故障排除

**Renault** 集成依赖以下条件：

- 稳定的互联网连接。
- Renault 服务器可用（无意外宕机或计划维护）。

您可以通过打开官方 Android/iOS 应用快速确认服务状态。

无论如何，在报告问题时，请先启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重启该集成，并在问题再次出现后立即关闭调试日志（*调试日志文件会自动开始下载*）。此外，如果仍然可行，也请下载[诊断](/home-assistant/integrations/diagnostics)数据。若您已收集调试日志和诊断数据，请一并随问题报告提交。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
