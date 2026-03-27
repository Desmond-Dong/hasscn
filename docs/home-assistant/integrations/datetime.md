---
title: Date/Time
description: 'Date/Time 集成用于控制和监控设备上的日期时间戳。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Date/Time
ha_release: '2023.6'
ha_domain: datetime
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---
# Date/Time

**Date/Time** 集成用于控制和监控设备上的日期时间戳。

:::note Building block integration
This date/time is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this date/time building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the date/time building block offers.
:::

如果您想创建 Date/Time 实体，请参阅 [Date/Time 助手](/home-assistant/integrations/input_datetime)。

## 日期/时间实体的状态

日期/时间实体的状态就是实际的日期和时间值。

<p class='img'>
<img src='/home-assistant/images/integrations/datetime/state_datetime.png' alt='开发者工具中显示日期/时间实体状态的截图' />
截图显示了开发者工具中的日期/时间实体状态。在此示例中，状态为 2020 年 1 月 1 日 12:00，格式为 YYYY-MM-DD T HH:MM:SS。
</p>

此外，该实体还可能具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚未知晓。

## 操作

### datetime 操作

可用操作：`datetime.set_value`

### 操作：设置值

`datetime.set_value` 操作用于为 datetime 实体设置新值。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `entity_id` | 否 | 指向要控制的 datetime 实体 `entity_id` 的字符串或字符串列表。 |
| `datetime` | 否 | 要设置的新日期时间值。如果未包含时区，则会使用 Home Assistant 实例的时区。 |
