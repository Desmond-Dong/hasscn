---
title: Valve
description: 'Home Assistant 中的 Valve 实体提供了用于控制阀门的接口，例如水阀、燃气阀或空气阀。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Valve
ha_release: 2024.1
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: valve
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---
# Valve

Home Assistant 中的 **Valve** 实体提供了用于控制阀门的接口，例如水阀、燃气阀或空气阀。

:::note Building block integration
This valve is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this valve building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the valve building block offers.
:::

## Valve 实体的状态

Valve 实体可以具有以下状态：

- **Open**：阀门已完全打开。
- **Opening**：阀门正在打开过程中。
- **Closed**：阀门已完全关闭。
- **Closing**：阀门正在关闭过程中。
- **Stopped**：阀门在尚未达到完全打开或完全关闭位置前停止移动。
- **Unavailable**：实体当前不可用。
- **Unknown**：当前状态未知。

## 设备类别

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/). For example, different states may be represented by different icons, colors, or text.

Valve 支持以下设备类别：

- **None**：通用阀门。这是默认值，无需设置。
- **water**：控制系统中水流的阀门。
- **gas**：控制系统中燃气流动的阀门。

## 操作

### 阀门控制操作

所有阀门都支持 `valve.open_valve`、`valve.close_valve` 和 `valve.toggle`。
允许设置具体位置的阀门还支持 `valve.set_valve_position` 和 `valve.stop_valve`。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向阀门 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部。 |

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: valve.close_valve
      target:
        entity_id: valve.demo
```

### 操作：设置阀门位置

`valve.set_valve_position` 操作用于设置一个或多个阀门的位置，前提是它们支持设置具体位置。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向阀门 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部。 |
| `position` | no | 介于 0（完全关闭）和 100（完全打开）之间的整数。 |

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: valve.set_valve_position
      target:
        entity_id: valve.demo
      data:
        position: 50
```
