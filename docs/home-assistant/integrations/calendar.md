---
title: Calendar
description: 关于如何在 Home Assistant 中集成日历的说明。
ha_release: 0.33
ha_domain: calendar
ha_quality_scale: internal
ha_category:
  - Calendar
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

**Calendar** 集成提供日历实体，允许其他集成将日历整合到 Home Assistant 中。日历显示在日历仪表板上，可用于自动化。

:::note Building block integration
This calendar is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this calendar building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the calendar building block offers.
:::

## 日历入门

Home Assistant 的日历支持主要专为自动化用例设计。它允许您根据事件触发自动化，并访问日历集成提供的事件信息，无论实际日历数据存储在哪里。当给定集成支持时，Home Assistant 还可以创建、编辑和删除外部日历中的事件，使日历的读取和写入交互成为可能。

Home Assistant 并不旨在取代功能齐全的个人日历。相反，它与外部日历平台并存，并通过强大的自动化功能来补充它们。

根据您的需求，您可以从多种方式中选择：

- 使用现有的外部日历：探索内置的 [日历集成](/home-assistant/integrations/#calendar) 将 Home Assistant 连接到您首选的日历平台，并将其事件用于自动化。

- 运行您自己的功能齐全、注重隐私的日历平台：如 [Nextcloud Calendar](https://apps.nextcloud.com/apps/calendar) 或其他 [自托管日历平台](https://github.com/awesome-selfhosted/awesome-selfhosted) 等解决方案提供完整的日历功能，并通过 CalDAV 暴露日历。您可以使用 [CalDAV 集成](/home-assistant/integrations/caldav/) 将它们与 Home Assistant 集成，同时在 Home Assistant 之外保留完整的日历管理功能。

- 使用简单的本地事件存储进行自动化：[Local Calendar 集成](/home-assistant/integrations/local_calendar/) 提供完全本地的日历，专为自动化工作流设计。它不旨在作为通用的个人日历使用。

## 查看和管理日历

每个日历在 Home Assistant 中都表示为一个独立的实体，可以在日历仪表板上查看和管理。您可以在 Home Assistant 实例的主侧边栏中找到日历仪表板。

某些日历集成允许 Home Assistant 直接从 Home Assistant 管理您的日历。在这种情况下，您可以通过选择日历仪表板右下角的 **添加事件** 按钮来添加新事件。

日历仪表板提供对即将到来的事件的快速可见性和简单的事件编辑，使构建和调试依赖于日历数据的自动化变得更加容易。

另请参阅下文的 [动作](#actions)。

## 日历卡片

为了在仪表板上直接显示日历事件，Home Assistant 包含了 [日历卡片](/home-assistant/dashboards/calendar/)。该卡片显示来自一个或多个日历实体的即将到来的事件，并提供日程的快速浏览视图。

## 日历实体的状态

状态显示是否存在活动事件：

- On：日历有活动事件。
- Off：日历没有活动事件。

此外，实体可以具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚未知。

## 自动化

日历 [触发器](/home-assistant/docs/automation/trigger) 支持基于事件开始或结束的自动化。请参阅 [自动化 Home Assistant](/home-assistant/getting-started/automation/) 入门指南或 [自动化](/home-assistant/docs/automation/) 文档以获取完整详细信息。

日历触发器是基于日历事件进行自动化的最佳方式。日历实体也可以用于根据其状态进行自动化，但这些功能有限，属性仅表示下一个事件。

[![Open **Settings** > **Automations & scenes** in your Home Assistant instance.](https://my.home-assistant.io/badges/automations.svg)](https://my.home-assistant.io/redirect/automations/)

![Screenshot Trigger](/home-assistant/images/integrations/calendar/trigger.png)

YAML 中的日历触发器示例：

```yaml
automation:
  - triggers:
    - trigger: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.personal
      # Optional time offset to fire a set time before or after event start/end
      offset: -00:15:00
```

日历触发器通常不应使用自动化模式 `single`，以确保在多个事件同时开始时触发器可以触发（例如，改用 `queued` 或 `parallel`）。请注意，日历每 15 分钟读取一次。测试时，请确保不要计划距离当前时间少于 15 分钟的事件，否则您的触发器可能不会触发。

有关可用于条件或动作的额外触发器数据，请参阅 [自动化触发器变量：日历](/home-assistant/docs/automation/templating/#calendar)。

### 自动化示例

以下是使用日历触发器的几个示例。

<details>
<summary>示例：日历事件通知</summary>


此示例自动化包括：

- 针对日历实体 `calendar.personal`。
- 在任何日历事件开始时。
- 发送包含事件标题和开始时间的通知。
- 允许多个事件同时开始。


```yaml
automation:
  - alias: "Calendar notification"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.personal
    actions:
      - action: persistent_notification.create
        data:
          message: >-
            Event {{ trigger.calendar_event.summary }} @
            {{ trigger.calendar_event.start }}
```


</details>

<details>
<summary>示例：日历事件灯光计划</summary>


此示例包括：

- 针对日历实体 ` calendar.device_automation`。
- 当事件摘要包含 `Front Lights` 时。
- 在事件开始和结束时打开和关闭名为 `light.front` 的灯光。


```yaml
automation:
  - alias: "Front Light Schedule"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.device_automation
      - trigger: calendar
        event: end
        entity_id: calendar.device_automation
    conditions:
      - condition: template
        value_template: "{{ 'Front Lights' in trigger.calendar_event.summary }}"
    actions:
      - if:
          - "{{ trigger.event == 'start' }}"
        then:
          - action: light.turn_on
            target:
              entity_id: light.front
        else:
          - action: light.turn_off
            target:
              entity_id: light.front
```


</details>

## 动作

某些日历集成允许 Home Assistant 使用动作直接管理您的日历。某些日历实体提供的动作如下所述，您也可以阅读更多关于 [动作](/home-assistant/docs/scripts/perform-actions/) 的信息。

### 动作：创建事件

`calendar.create_event` 动作允许您添加新的日历事件。使用 [目标选择器](/home-assistant/docs/blueprint/selectors/#target-selector) 选择日历 `target`，`data` 负载支持以下字段：

| 数据属性          | 可选 | 描述                                         | 示例                |
| ----------------- | ---- | -------------------------------------------- | ------------------- |
| `summary`         | 否   | 作为事件标题。                               | Bowling             |
| `description`     | 是   | 事件的描述。                                 | Birthday bowling    |
| `start_date_time` | 是   | 事件开始的日期和时间。                       | 2019-03-10 20:00:00 |
| `end_date_time`   | 是   | 事件结束的日期和时间（不包含）。             | 2019-03-10 23:00:00 |
| `start_date`      | 是   | 全天事件开始的日期。                         | 2019-03-10          |
| `end_date`        | 是   | 全天事件结束的日期（不包含）。               | 2019-03-11          |
| `in`              | 是   | 您想在多少天或几周内创建事件。               | "days": 2           |
| `location`        | 是   | 事件的地点。                                 | Bowling center      |


:::note
您可以使用 `start_date_time` 和 `end_date_time`，或 `start_date` 和 `end_date`，或 `in`。

:::
这是一个 YAML 动作的完整示例：

```yaml
action: calendar.create_event
target:
  entity_id: calendar.device_automation_schedules
data:
  summary: "Example"
  start_date: "2022-10-01"
  end_date: "2022-10-02"
```

Home Assistant 日历不允许零持续时间的日历事件。以下将创建一个从"现在"开始、持续一分钟的事件。这可用于在日历中记录外部事件。


```yaml
action: calendar.create_event
target:
  entity_id: calendar.device_automation_schedules
data:
  summary: "Example"
  start_date_time: "{{ now() }}"
  end_date_time: "{{ now() + timedelta(minutes=1) }}"
```


### 动作：获取事件

`calendar.get_events` 动作允许您用日期范围内的日历事件填充 [响应数据](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)。它可以返回来自多个日历的事件。

| 数据属性          | 可选 | 描述                                                                                                           | 示例                |
| ----------------- | ---- | -------------------------------------------------------------------------------------------------------------- | ------------------- |
| `start_date_time` | 是   | 返回此时间之后的活动事件（不包含）。未设置时默认为现在。                                                       | 2019-03-10 20:00:00 |
| `end_date_time`   | 是   | 返回此时间之前的活动事件（不包含）。不能与 `duration` 一起使用。您必须指定 `end_date_time` 或 `duration` 之一。 | 2019-03-10 23:00:00 |
| `duration`        | 是   | 从 `start_date_time` 开始返回指定持续时间内的活动事件。不能与 `end_date_time` 一起使用。您必须指定 `duration` 或 `end_date_time` 之一。 | `days: 2`           |

:::note
仅使用 `end_date_time` 或 `duration` 之一。

:::
```yaml
action: calendar.get_events
target:
  entity_id:
    - calendar.school
    - calendar.work
data:
  duration:
    hours: 24
response_variable: agenda
```

响应数据包含每个日历实体的一个字段（例如本例中的 `calendar.school` 和 `calendar.work`）。
每个日历实体有一个 `events` 字段，包含具有以下字段的事件列表：

| 响应数据      | 描述                               | 示例                |
| ------------- | ---------------------------------- | ------------------- |
| `summary`     | 事件的标题。                       | Bowling             |
| `description` | 事件的描述。                       | Birthday bowling    |
| `start`       | 事件开始的日期或日期时间。         | 2019-03-10 20:00:00 |
| `end`         | 事件结束的日期或日期时间（不包含）。 | 2019-03-10 20:00:00 |
| `location`    | 事件的地点。                       | Bowling center      |

此示例在另一个动作中使用带响应数据的模板：


```yaml
action: notify.nina
data:
  title: Daily agenda for {{ now().date() }}
  message: >-
    Your school calendar for today:
    {% for event in agenda["calendar.school_calendar"]["events"] %}
    {{ event.start}}: {{ event.summary }}<br>
    {% endfor %}
    Your work calendar for today:
    {% for event in agenda["calendar.work_calendar"]["events"] %}
    {{ event.start}}: {{ event.summary }}<br>
    {% endfor %}
```
