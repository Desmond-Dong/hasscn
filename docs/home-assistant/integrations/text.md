---
title: Text
description: 'Text 集成用于控制和监控设备上的文本值。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Text
ha_release: '2022.12'
ha_domain: text
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---
# Text

**Text** 集成用于控制和监控设备上的文本值。

:::note Building block integration
This text is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this text building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the text building block offers.
:::

如果您想创建文本实体，请参阅 [Text helper](/home-assistant/integrations/input_text)。

## 操作

### 文本操作

可用操作：`text.set_value`

### 操作：设置值

`text.set_value` 操作用于设置文本实体的文本值。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 一个字符串或字符串列表，指向要控制的文本实体 `entity_id`。
| `value` | 否 | 要设置的新文本值。
