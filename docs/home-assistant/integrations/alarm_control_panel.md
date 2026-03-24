---
title: Alarm control panel
description: 关于如何将报警控制面板集成到 Home Assistant 的说明。
ha_category:
  - Alarm
ha_release: 0.7.3
ha_quality_scale: internal
ha_domain: alarm_control_panel
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/manual/
    title: Manual alarm
  - docs: /integrations/template/#alarm-control-panel
    title: Template alarm
---

Home Assistant 可以为您提供一个类似于经典报警系统的界面。
请参阅[手动报警](/home-assistant/integrations/manual)或[模板报警](/home-assistant/integrations/template/#alarm-control-panel)进行报警配置。

:::note Building block integration
This alarm control panel is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this alarm control panel building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the alarm control panel building block offers.
:::

## 报警面板实体的状态

报警面板实体可以具有以下状态。并非所有集成都实现所有不同的状态。

- **撤防**：报警已撤防（关闭）。
- **在家布防**：报警已在家模式布防。
- **外出布防**：报警已外出模式布防。
- **夜间布防**：报警已夜间模式布防。
- **度假布防**：报警已度假模式布防。
- **自定义旁路布防**：报警已旁路模式布防。
- **待定**：报警处于待定状态（正在触发）。
- **正在布防**：报警正在布防过程中。
- **正在撤防**：报警正在撤防过程中。
- **已触发**：报警已被触发。
- **不可用**：实体当前不可用。
- **未知**：状态尚不清楚。


## 动作

根据特定集成支持的功能，报警可能会公开以下动作：

| 动作                    | 数据                               | 描述                         |
| ------------------------- | ---------------------------------- | ----------------------------------- |
| `alarm_arm_home`          | `entity_id` <br> `code` (可选) | 在家模式布防报警。     |
| `alarm_arm_away`          | `entity_id` <br> `code` (可选) | 外出模式布防报警。     |
| `alarm_arm_night`         | `entity_id` <br> `code` (可选) | 夜间模式布防报警。    |
| `alarm_arm_vacation`      | `entity_id` <br> `code` (可选) | 度假模式布防报警。 |
| `alarm_disarm`            | `entity_id` <br> `code` (可选) | 撤防报警。                   |
| `alarm_trigger`           | `entity_id` <br> `code` (可选) | 手动触发报警。         |
| `alarm_arm_custom_bypass` | `entity_id` <br> `code` (可选) | 发送自定义旁路布防命令。     |
