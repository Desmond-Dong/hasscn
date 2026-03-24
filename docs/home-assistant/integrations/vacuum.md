---
title: Vacuum
description: 关于如何在 Home Assistant 中设置和使用吸尘器的说明。
ha_release: 0.51
ha_domain: vacuum
ha_quality_scale: internal
ha_category:
  - Vacuum
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

**Vacuum** 集成让 Home Assistant 能够控制家用清洁机器人。

:::note Building block integration
This vacuum is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this vacuum building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the vacuum building block offers.
:::

## Vacuum 实体的状态

Vacuum 实体可以具有以下状态：

- **Cleaning**：吸尘器当前正在清扫。
- **Docked**：吸尘器当前已回到底座。通常也可理解为正在充电。
- **Error**：吸尘器在清扫过程中遇到错误。
- **Idle**：吸尘器未暂停、未在底座上，也没有错误。
- **Paused**：吸尘器原本正在清扫，但在未返回底座的情况下被暂停。
- **Returning**：吸尘器已完成清扫，当前正在返回底座，但尚未到达。
- **Unavailable**：实体当前不可用。
- **Unknown**：当前状态未知。

## 操作

可用操作包括：`start`、`pause`、`stop`、`return_to_base`、`locate`、`clean_spot`、`clean_area`、`set_fan_speed` 和 `send_command`。

调用这些操作之前，请先确认您的 vacuum 平台支持对应功能。

### 操作：启动

`vacuum.start` 操作用于启动或恢复清扫任务。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |

### 操作：暂停

`vacuum.pause` 操作用于暂停清扫任务。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |

### 操作：停止

`vacuum.stop` 操作用于停止吸尘器当前活动。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |

### 操作：返回底座

`vacuum.return_to_base` 操作用于让吸尘器返回底座。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |

### 操作：定位

`vacuum.locate` 操作用于定位扫地机器人。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |

### 操作：局部清扫

`vacuum.clean_spot` 操作用于让吸尘器执行局部清扫。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |

### 操作：区域清扫

`vacuum.clean_area` 操作用于让吸尘器清扫一个或多个 Home Assistant 区域。要使用此操作，必须先将吸尘器的分区映射到区域。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |
| `cleaning_area_id`     | no       | 吸尘器要清扫的区域列表。 |

### 操作：设置风力档位

`vacuum.set_fan_speed` 操作用于设置吸尘器的风力档位。`fan_speed` 可以是标签值，比如 `balanced` 或 `turbo`，也可以是数字；具体取决于 `vacuum` 平台。

| Data attribute | Optional | Description                                                                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |
| `fan_speed`            | no       | 平台相关的吸尘器风力档位，可为如 `medium` 这样的档位名称，或 0 到 100 之间的百分比。 |

### 操作：发送命令

`vacuum.send_command` 操作用于向吸尘器发送平台特定命令。

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | 仅对指定吸尘器生效。使用 `entity_id: all` 可作用于全部。 |
| `command`              | no       | 要执行的命令。 |
| `params`               | yes      | 命令参数。 |
