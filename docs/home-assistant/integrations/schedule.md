---
title: Schedule
description: 有关如何在 Home Assistant 中制定每周计划的说明。
ha_category:
  - Automation
  - Helper
ha_release: 2022.9
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: schedule
ha_integration_type: helper
---

The **Schedule** integration provides a way to create a weekly schedule entity in Home Assistant, consisting of time blocks with defined start and end times. The schedule is active when a time block starts and becomes inactive when it ends, allowing it to be used for triggering or making decisions in automations and scripts.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Name:
  description: Friendly name of the schedule.
Icon:
  description: Icon to display in the frontend for this schedule.
Schedule blocks:
  description: >
    Press and drag to select time blocks for each day of the week.
    It is not possible to create overlapping time blocks on the same day.
```

After creating schedule blocks, you can press a block to edit the details.

```yaml
Start:
  required: true
  type: time
  description: The start time to mark the schedule as active/on.
End:
  required: true
  type: time
  description: The end time to mark as inactive/off again.
Additional data:
  required: false
  type: map
  description: A mapping of attribute names to values, which will be added to the entity's attributes when the block is active.
```

### Adding additional data

Adding the following as `Additional data` will show `brightness` and `color_temp` as entity attributes when the block is active:

```yaml
brightness: 100
color_temp: 4000
```

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML instead.
To enable the Integration sensor in your installation, add the following to your "`configuration.yaml`" file.

:::note
The `data` field follows the same logic as described above in *Adding additional data*.


:::
```yaml
schedule:
  light_schedule:
    name: "Light schedule"
    wednesday:
      - from: "17:00:00"
        to: "21:00:00"
        data:
          brightness: 100
          color_temp: 4000
    thursday:
      - from: "17:00:00"
        to: "23:00:00"
        data:
          brightness: 90
          color_temp: 3500
    friday:
      - from: "07:00:00"
        to: "10:00:00"
        data:
          brightness: 80
          color_temp: 3000
      - from: "16:00:00"
        to: "23:00:00"
        data:
          brightness: 60
          color_temp: 2500
```

```yaml
schedule:
  description: Alias for the schedule. Multiple entries are allowed.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the schedule.
      required: true
      type: string
    icon:
      description: Icon to display in the frontend for this schedule.
      required: false
      type: icon
    "monday|tuesday|wednesday|thursday|friday|saturday|sunday":
      description: A schedule for each day of the week.
      required: true
      type: list
      keys:
        from:
          description: The start time to mark the schedule as active/on.
          required: true
          type: time
        to:
          description: The end time to mark as inactive/off again.
          required: true
          type: time
        data:
          description: A mapping of attribute names to values, which will be added to the entity's attributes when the block is active.
          required: false
          type: map
          default: {}
```

## Attributes

A schedule entity exports state attributes that can be useful in automations and templates.

| Attribute | Description |
| ----- | ----- |
| `next_event` | A datetime object containing the next time the schedule is going to change state. |
| `key_1`, `key_2`, ... | The mapping values from **Additional data** / `data` settings of a time block when the respective block is active. |

## Automation example

A schedule creates an on/off (schedule) sensor within the times set.
By incorporating the `light_schedule` example from above in an automation, we can turn on a light when the schedule is active.


```yaml
triggers:
  - trigger: state
    entity_id:
      - schedule.light_schedule
    to: "on"
actions:
  - action: light.turn_on
    target:
      entity_id: light.kitchen
    data:
      brightness_pct: "{{ state_attr('schedule.light_schedule', 'brightness') }}"
      kelvin: "{{ state_attr('schedule.light_schedule', 'color_temp') }}"
```


Another automation can be added to turn the lights off once the schedule is inactive:


```yaml
triggers:
  - trigger: state
    entity_id:
      - schedule.light_schedule
    to: "off"
actions:
  - action: light.turn_off
    target:
      entity_id: light.kitchen
```


## Actions

To interact with schedules from scripts and automations, the schedule integration provides the following actions.

### Action: Reload

The `schedule.reload` action reloads the schedule's configuration from YAML without the need to restart Home Assistant itself.

### Action: Get schedule

The `schedule.get_schedule` action populates [response data](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data) with the configured time ranges of a schedule.
It can return multiple schedules.

```yaml
action: schedule.get_schedule
target:
  entity_id:
    - schedule.vacuum_robot
    - schedule.air_purifier
response_variable: schedules
```

The response data contains a field for every schedule entity (e.g. `schedule.vacuum_robot` and `schedule.air_purifier` in this case).

Every schedule entity response has 7 fields (one for each day of the week in lowercase), containing a list of the selected time ranges.
Days without any ranges will be returned as an empty list.

```yaml
schedule.vacuum_robot:
  monday:
    - from: "09:00:00"
      to: "15:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "09:00:00"
      to: "15:00:00"
  friday: []
  saturday: []
  sunday: []
schedule.air_purifier:
  monday:
    - from: "09:00:00"
      to: "18:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "09:00:00"
      to: "18:00:00"
  friday: []
  saturday:
    - from: "10:30:00"
      to: "12:00:00"
    - from: "14:00:00"
      to: "19:00:00"
  sunday: []
```

The example below uses the response data from above in a template for another action.


```yaml
action: notify.nina
data:
  title: Today's schedules
  message: >-
    Your vacuum robot will run today:
    {% for event in schedules["schedule.vacuum_robot"][now().strftime('%A').lower()] %}
    - from {{ event.from }} until {{ event.to }}<br>
    {% endfor %}
    Your air purifier will run today:
    {% for event in schedules["schedule.air_purifier"][now().strftime('%A').lower()] %}
    - from {{ event.from }} until {{ event.to }}<br>
    {% endfor %}
```


If you want to run the above action both once per day and whenever one of the schedules changes, you can create an automation that combines a time-based trigger with an event trigger per entity.


```yaml
triggers:
  - trigger: time
    at: "07:30:00"
  - trigger: event
    event_type: entity_registry_updated
    event_data:
      action: update
      entity_id: schedule.vacuum_robot
  - trigger: event
    event_type: entity_registry_updated
    event_data:
      action: update
      entity_id: schedule.air_purifier
```


