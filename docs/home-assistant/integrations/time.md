---
title: Time
description: 'Time 集成用于控制和监测设备上的时间值。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Time
ha_release: '2022.12'
ha_domain: time
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---
# Time

**Time** 集成用于控制和监测设备上的时间值。

:::note Building block integration
This time is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this time building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the time building block offers.
:::

如果您想创建类似的实体，请参阅[日期/时间助手](/home-assistant/integrations/input_datetime)。

## 时间实体的状态

时间实体的状态是采用 `HH:MM:SS` 格式表示的时间值。

<p class='img'>
<img src='/home-assistant/images/integrations/time/state_time.png' alt='在开发者工具中显示时间实体状态的截图' />
在开发者工具中显示时间实体状态的截图。
</p>

此外，该实体还可能具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：当前状态未知。

## 操作

### 时间操作

可用操作：`time.set_value`

### 操作：设置值

`time.set_value` 操作用于为时间实体设置新值。

- `entity_id`
  - 可选：否
  - 说明：指向要控制的时间实体 `entity_id` 的字符串或字符串列表。
- `time`
  - 可选：否
  - 说明：要设置的新时间值。
