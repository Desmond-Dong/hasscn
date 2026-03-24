---
title: Date
description: 关于如何在 Home Assistant 中设置日期实体的说明。
ha_category:
  - Date
ha_release: '2023.6'
ha_domain: date
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

**Date** 集成专为设备日期的控制和监控而构建。

:::note Building block integration
This date is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this date building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the date building block offers.
:::

如果您正在寻找一种创建类似实体的方法，请查看 [日期/时间助手](/home-assistant/integrations/input_datetime)。

## 日期实体的状态

日期实体的状态是实际的日期值。

<p class='img'>
<img src='/home-assistant/images/integrations/date/state_date.png' alt='开发者工具中显示日期状态的截图' />
开发者工具中日期状态的截图。在显示的示例中，状态为 2020 年 1 月 1 日，格式为 YYYY-MM-DD。
</p>

此外，实体可以具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚未知。

## 动作

### 日期动作

可用动作：`date.set_value`

### 动作：设置值

`date.set_value` 动作允许您为日期实体设置新值。

| 数据属性    | 可选 | 描述                                           |
| ----------- | ---- | ---------------------------------------------- |
| `entity_id` | 否   | 指向要控制的日期 `entity_id` 的字符串或字符串列表。 |
| `date`      | 否   | 要设置的新日期值。                             |
