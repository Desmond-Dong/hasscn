---
title: "Automation Trigger"
description: '触发器决定了 automation 规则何时开始处理。当自动化中任意一个触发器满足条件时（触发器触发），Home Assistant 会先验证是否有条件(/home-assistant/docs/automation/condition/)，然后调用动作(/home-assistant/docs/automa。'
related:
  - docs: /voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation
    title: Adding a custom sentence to trigger an automation
---
# Automation Trigger

触发器决定了 automation 规则何时开始处理。当自动化中_任意_一个触发器满足条件时（触发器_触发_），Home Assistant 会先验证是否有[条件](/home-assistant/docs/automation/condition/)，然后调用[动作](/home-assistant/docs/automation/action/)。

automation 可以由 event、某个 entity 的 state、某个时间点等触发。你既可以直接指定这些条件，也可以更灵活地通过模板来定义。一个自动化也可以配置多个触发器。

- [触发器 ID](#trigger-id)
- [触发器变量](#trigger-variables)
- [事件触发器](#event-trigger)
- [Home Assistant 触发器](#home-assistant-trigger)
- [MQTT 触发器](#mqtt-trigger)
- [数值状态触发器](#numeric-state-trigger)
- [状态触发器](#state-trigger)
- [太阳触发器](#sun-trigger)
- [标签触发器](#tag-trigger)
- [模板触发器](#template-trigger)
- [时间触发器](#time-trigger)
- [时间模式触发器](#time-pattern-trigger)
- [持久化通知触发器](#persistent-notification-trigger)
- [Webhook 触发器](#webhook-trigger)
- [区域触发器](#zone-trigger)
- [地理位置触发器](#geolocation-trigger)
- [设备触发器](#device-triggers)
- [日历触发器](#calendar-trigger)
- [语句触发器](#sentence-trigger)
- [多个触发器](#multiple-triggers)
- [同一触发器中的多个实体 ID](#multiple-entity-ids-for-the-same-trigger)
- [禁用触发器](#disabling-a-trigger)
- [合并触发器列表](#merging-lists-of-triggers)

## Trigger ID

所有触发器都可以分配一个可选的 `id`。如果省略 `id`，则会使用触发器在列表中的索引。你可以在[触发器条件和动作](/home-assistant/docs/scripts/conditions/#trigger-condition)中引用这个 `id`。`id` 不必在每个触发器中唯一，也可以用来对相似触发器进行分组，以便后续在自动化中统一处理，例如多个不同类型的触发器都用于打开某个实体。

### Video tutorial

这个视频教程解释了触发器 ID 的工作方式。

<lite-youtube videoid="fE_MYcXYwMI" videotitle="How to use Trigger IDs in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

```yaml
automation:
  triggers:
    - trigger: event
      event_type: "MY_CUSTOM_EVENT"
      id: "custom_event"
    - trigger: mqtt
      topic: "living_room/switch/ac"
      id: "ac_on"
    - trigger: state  # This trigger will be assigned id="2"
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      to: "home"
```

## Trigger variables

触发器可以使用两种不同类型的变量。它们都和[脚本级变量](/home-assistant/integrations/script/#variables)一样工作。

第一种是在触发器触发时设置变量。这些变量可以使用模板，并能访问[`trigger` 变量](/home-assistant/docs/automation/templating#available-trigger-data)。

第二种是在触发器包含模板化值时，为触发器附加预先可用的变量。它们通过自动化级别的 `trigger_variables` 键定义。这些变量只能包含[受限模板](/home-assistant/docs/configuration/templating/#limited-templates)。模板值变化后不会重新应用到触发器。触发器变量主要用于在触发器中支持蓝图输入。


```yaml
automation:
  trigger_variables:
    my_event: example_event
  triggers:
    - trigger: event
      # Able to use `trigger_variables`
      event_type: "{{ my_event }}"
      # These variables are evaluated and set when this trigger is triggered
      variables:
        name: "{{ trigger.event.data.name }}"
```


## Event trigger

当收到某个[event](/home-assistant/docs/configuration/events/)时，事件触发器会触发。事件是 Home Assistant 中最基础的构建块。你既可以只匹配事件名称，也可以要求同时匹配特定的事件数据或上下文。

事件既可以由集成触发，也可以通过 API 触发。支持的事件类型没有限制。内置事件列表可见[这里](/home-assistant/docs/configuration/events/)。

```yaml
automation:
  triggers:
    - trigger: event
      event_type: "MY_CUSTOM_EVENT"
      # optional
      event_data:
        mood: happy
      context:
        user_id:
        # any of these will match
          - "MY_USER_ID"
          - "ANOTHER_USER_ID"
```

你也可以同时监听多个事件。这适用于没有数据、或数据与上下文相似的事件。

```yaml
automation:
  triggers:
    - trigger: event
      event_type:
        - automation_reloaded
        - scene_reloaded
```

在 `event_type`、`event_data` 和 `context` 选项中也可以使用[受限模板](/home-assistant/docs/configuration/templating/#limited-templates)。

:::important
`event_type`、`event_data` 和 `context` 中的模板只会在设置触发器时求值，不会在每次收到事件时重新求值。

:::


```yaml
automation:
  trigger_variables:
    sub_event: ABC
    node: ac
    value: on
  triggers:
    - trigger: event
      event_type: "{{ 'MY_CUSTOM_EVENT_' ~ sub_event }}"
```


## Home Assistant trigger

在 Home Assistant 启动或关闭时触发。

```yaml
automation:
  triggers:
    - trigger: homeassistant
      # Event can also be 'shutdown'
      event: start
```

:::note
由 `shutdown` 事件触发的自动化有 20 秒可执行，超过后会被停止，以便继续关机流程。

:::
## MQTT trigger

当在指定的 MQTT 主题上收到特定消息时触发。你也可以额外匹配该主题上的 payload。默认 payload 编码为 `utf-8`。如果是图片或其他字节数据，请使用 `encoding: ''` 完全禁用 payload 解码。

```yaml
automation:
  triggers:
    - trigger: mqtt
      topic: "living_room/switch/ac"
      # Optional
      payload: "on"
      encoding: "utf-8"
```

`payload` 选项可以与 `value_template` 组合使用，以便在匹配前先处理收到的 MQTT 消息。
下面的示例中，只有当 `living_room/switch/ac` 上收到的消息是有效 JSON，且其中 `state` 键的值为 `"on"` 时，才会触发。


```yaml
automation:
  triggers:
    - trigger: mqtt
      topic: "living_room/switch/ac"
      payload: "on"
      value_template: "{{ value_json.state }}"
```


在 `topic` 和 `payload` 选项中也可以使用[受限模板](/home-assistant/docs/configuration/templating/#limited-templates)。

:::note
`topic` 和 `payload` 模板只会在设置触发器时求值，不会在每条传入的 MQTT 消息到来时重新求值。

:::


```yaml
automation:
  trigger_variables:
    room: "living_room"
    node: "ac"
    value: "on"
  triggers:
    - trigger: mqtt
      topic: "{{ room ~ '/switch/' ~ node}}"
      # Optional
      payload: "{{ 'state:' ~ value }}"
      encoding: "utf-8"
```


## Numeric state trigger

当实体状态的数值（或使用 `attribute` 时该属性的值，或使用 `value_template` 时计算得到的值）**跨过**某个阈值时（不包含等于），数值状态触发器会触发。当指定实体的状态变化时，Home Assistant 会尝试将其解析为数字；如果值从高于阈值变为低于阈值，或从低于阈值变为高于阈值，就会触发（不包含等于）。

:::note
“跨过阈值”意味着，只有当状态之前不在阈值范围内时，触发器才会触发。
如果实体当前状态为 `50`，而你设置 `below: 75`，那么状态变为 `49` 或 `72` 都不会触发，因为它从未跨过阈值。它必须先变成 `76`，再变成 `74`，触发器才会触发。

:::


```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.temperature
      # If given, will trigger when the value of the given attribute for the given entity changes..
      attribute: attribute_name
      # ..or alternatively, will trigger when the value given by this evaluated template changes.
      value_template: "{{ state.attributes.value - 5 }}"
      # At least one of the following required
      above: 17
      below: 25
      # If given, will trigger when the condition has been true for X time; you can also use days and milliseconds.
      for:
        hours: 1
        minutes: 10
        seconds: 5
```


:::note
同时列出 `above` 和 `below` 表示 `numeric_state` 必须位于两个值之间。
在上面的例子中，当数值进入 17.1 到 24.9 的范围时（大于 17 且小于 25），触发器会触发一次。它只有在先离开这个范围、之后再次进入时，才会再次触发。

:::
指定 `attribute` 选项后，比较对象将变为给定的属性，而不是实体本身的状态。


```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: climate.kitchen
      attribute: current_temperature
      above: 23
```


通过 `value_template` 可以完成更动态、更复杂的计算。变量 `state` 是由 `entity_id` 指定实体的[状态对象](/home-assistant/docs/configuration/state_object)。

实体状态可以这样引用：


```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.temperature
      value_template: "{{ state.state | float * 9 / 5 + 32 }}"
      above: 70
```


实体属性可以这样引用：


```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: climate.kitchen
      value_template: "{{ state.attributes.current_temperature - state.attributes.temperature_set_point }}"
      above: 3
```


包含数值的 Number helper（`input_number` 实体）、`number`、`sensor` 和 `zone` 实体，都可以用于 `above` 和 `below` 阈值。不过，只有在触发器中指定的实体更新时，才会执行比较。示例如下：

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.outside_temperature
      # Other entity ids can be specified for above and/or below thresholds
      above: sensor.inside_temperature
```

`for:` 也可以使用 `HH:MM:SS` 的形式：


```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.temperature
      # At least one of the following required
      above: 17
      below: 25

      # If given, will trigger when condition has been for X time.
      for: "01:10:05"
```


你也可以在 `for` 选项中使用模板。


```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id:
        - sensor.temperature_1
        - sensor.temperature_2
      above: 80
      for:
        minutes: "{{ states('input_number.high_temp_min')|int }}"
        seconds: "{{ states('input_number.high_temp_sec')|int }}"
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.to_state.name }} too high for {{ trigger.for }}!
```


`for` 模板会在实体发生指定变化时求值。

:::important
使用 `for` 选项无法跨越 Home Assistant 重启或自动化重新加载而保留。重启或重载期间，所有正在等待 `for` 时间结束的自动化都会被重置。

如果这不符合你的使用场景，可以考虑让自动化先设置一个[`input_datetime`](/home-assistant/integrations/input_datetime) 为目标时间，再使用该 [`input_datetime`](/home-assistant/integrations/input_datetime) 作为自动化触发器，在设定时间执行所需动作。

:::
## State trigger

通常情况下，状态触发器会在任意指定实体的状态**发生变化**时触发。其行为如下：

- 如果只指定了 `entity_id`，那么只要状态有任何变化就会触发，即使变化的只是状态属性。
- 如果至少指定了 `from`、`to`、`not_from` 或 `not_to` 之一，那么只有匹配的状态变化才会触发；仅属性变化不会触发。
  - 如果你想在所有状态变化时触发，但不想在属性变化时触发，可以把 `from`、`to`、`not_from` 或 `not_to` 中至少一个设置为 `null`。
- 使用 `for` 选项无法跨越 Home Assistant 重启或自动化重新加载而保留。
  - 在重启或重载期间，所有正在等待 `for` 时间结束的自动化都会被重置。
  - 如果这不符合你的使用场景，可以考虑让自动化先设置一个[`input_datetime`](/home-assistant/integrations/input_datetime) 为目标时间，再使用该 [`input_datetime`](/home-assistant/integrations/input_datetime) 作为自动化触发器，在设定时间执行所需动作。

:::tip
你在概览中看到的值，通常不一定是实体的真实状态。例如，概览里可能显示 `Connected`，但底层实体的实际状态可能是 `on`。你应该在开发者工具中的 [**Settings** > **Developer tools** > **States**](https://my.home-assistant.io/redirect/developer_states/) 查看实体状态。

:::
### Examples

如果 Paulus 或 Anne-Therese 中任意一人在家满 1 分钟，此自动化就会触发。

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      # Optional
      from: "not_home"
      # Optional
      to: "home"
      # If given, will trigger when the condition has been true for X time; you can also use days and milliseconds.
      for:
        hours: 0
        minutes: 1
        seconds: 0
```

你也可以为 `from` 或 `to` 提供一个状态列表：

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: vacuum.test
      from:
        - "cleaning"
        - "returning"
      to: "error"
```

如果你想在所有状态变化时触发，但不想因为属性变化而触发，可以把 `to` 设为 `null`（把 `from`、`not_from` 或 `not_to` 设为 `null` 也同样有效）：

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: vacuum.test
      to:
```

如果你想在除了某些状态变化之外的所有状态变化时触发，请使用 `not_from` 或 `not_to`。`not_from` 和 `not_to` 分别是 `from` 和 `to` 的反向版本，用于匹配**不是**指定状态的变化。

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: vacuum.test
      not_from:
        - "unknown"
        - "unavailable"
      to: "on"
```

你不能同时使用 `from` 和 `not_from`。`to` 和 `not_to` 也一样。

### Triggering on attribute changes

指定 `attribute` 选项后，触发器只会在该属性**发生变化**时触发。其他属性的变化或实体状态变化都会被忽略。

例如，下面的触发器仅在锅炉持续加热 10 分钟时触发：

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "heating"
      for: "00:10:00"
```

下面这个触发器会在锅炉的 `hvac_action` 属性每次变化时触发：

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
```

### Holding a state or attribute

你可以使用 `for`，让状态触发器只在状态持续一段时间后才触发。

下面的例子中，当实体状态变为 `"on"` 且持续 30 秒时，就会触发：

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: light.office
      # Must stay "on" for 30 seconds
      to: "on"
      for: "00:00:30"
```

在保持某个状态期间，属性变化会被忽略，且不会取消保持计时。

你也可以在状态从某个特定值变化后，如果在指定时间内没有回到该状态，就触发。

这对于检查媒体播放器在指定时间内没有恢复到 `"off"` 很有用，而不关心它是 `"playing"` 还是 `"paused"`。

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: media_player.kitchen
      # Not "off" for 30 minutes
      from: "off"
      for: "00:30:00"
```

请注意，在同时使用 `from`、`to` 和 `for` 时，只有 `to` 选项的值会用于时间判断。

下面这个例子中，只要实体状态在 `for` 指定的时间内保持不变，触发器就会触发，而不在乎当前状态具体是什么。

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: media_player.kitchen
      # The media player remained in its current state for 1 hour
      for: "01:00:00"
```

你也可以在 `for` 选项中使用模板。


```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      to: "home"
      for:
        minutes: "{{ states('input_number.lock_min')|int }}"
        seconds: "{{ states('input_number.lock_sec')|int }}"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.my_place
```


`for` 模板会在实体发生指定变化时求值。

:::tip
为 `from` 和 `to` 的值加上引号，避免 YAML 解析器将它们解释为布尔值。

:::
## Sun trigger

### Sunset / Sunrise trigger

在太阳落下或升起时触发，也就是太阳高度达到 0° 时。

你可以指定一个可选的时间偏移，让它在太阳事件发生前后某个固定时间触发，比如日落前 45 分钟。负值表示在日出或日落前触发，正值表示在之后触发。偏移值需要用秒数或 `hh:mm:ss` 格式表示。

:::tip
由于黄昏和黎明持续时间会随季节变化，建议你在需要在晨昏时段触发自动化时，使用[太阳高度触发器][sun_elevation_trigger]，而不是给 `sunset` 或 `sunrise` 添加时间偏移。

:::
[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

```yaml
automation:
  triggers:
    - trigger: sun
      # Possible values: sunset, sunrise
      event: sunset
      # Optional time offset. This example will trigger 45 minutes before sunset.
      offset: "-00:45:00"
```

### Sun elevation trigger

有时你可能希望对自动化的控制比单纯日出或日落更精细，并指定一个确切的太阳高度。这可以用于分层触发自动化，比如随着太阳逐渐接近地平线，甚至在地平线以下时依次运行。当地面实际亮度不足，但 “sunset” 事件触发得仍然太早时，这也特别有用，比如你希望在更暗一些时再打开室外照明。对于大多数打算在晨昏时段运行的自动化，`0°` 到 `-6°` 之间通常比较合适；本例使用 `-4°`：


```yaml
automation:
  - alias: "Exterior Lighting on when dark outside"
    triggers:
      - trigger: numeric_state
        entity_id: sun.sun
        attribute: elevation
        # Can be a positive or negative number
        below: -4.0
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.exterior_lighting
```


如果你想更精确，可以使用这个[太阳计算器](https://gml.noaa.gov/grad/solcalc/)，帮助你估算任意特定时间的太阳高度。然后，你可以据此选择下方定义的曙暮光区间。

虽然实际亮度还会受到天气、地形和地表覆盖影响，但这些区间通常定义为：

- 民用曙暮光：`0° > Solar angle > -6°`

  这是大多数人理解中的曙暮光：在晴朗天气下，民用曙暮光大致是人眼仍能清楚分辨地面物体的界限。此时通常已有足够照明，大多数室外活动还不需要人工光源。

- 航海曙暮光：`-6° > Solar angle > -12°`
- 天文曙暮光：`-12° > Solar angle > -18°`

有关这一主题的非常详尽说明，请参阅维基百科中的[Twilight](https://en.wikipedia.org/wiki/Twilight) 条目。

## Tag trigger

当扫描[tag](/home-assistant/integrations/tag)时触发。例如，通过 Home Assistant Companion 移动应用扫描 NFC 标签。

```yaml
automation:
  triggers:
    - trigger: tag
      tag_id: A7-6B-90-5F
```

另外，你也可以通过设置 `device_id`，仅在特定设备或扫描器扫描该卡片时触发：

```yaml
automation:
  triggers:
    - trigger: tag
      tag_id: A7-6B-90-5F
      device_id: 0e19cd3cf2b311ea88f469a7512c307d
```

或者，为多个标签匹配多个可能的设备：

```yaml
automation:
  triggers:
    - trigger: tag
      tag_id:
        - "A7-6B-90-5F"
        - "A7-6B-15-AC"
      device_id:
        - 0e19cd3cf2b311ea88f469a7512c307d
        - d0609cb25f4a13922bb27d8f86e4c821
```

## Template trigger

模板触发器会在任意已识别实体状态变化时，对一个[模板](/home-assistant/docs/configuration/templating/)进行求值。如果这次状态变化导致模板渲染结果为 `true`（非零数字，或字符串 `true`、`yes`、`on`、`enable` 中之一），而之前为 `false`（其他任何值），就会触发。

这通常通过让模板输出一个布尔表达式来实现，例如 `{{ is_state('device_tracker.paulus', 'home') }}`，或者直接让模板渲染成 `true`（见下例）。

在模板触发器中，你也可以使用 `is_state_attr` 来判断属性变化，例如 `{{ is_state_attr('climate.living_room', 'away_mode', 'off') }}`。


```yaml
automation:
  triggers:
    - trigger: template
      value_template: "{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}"

      # If given, will trigger when template remains true for X time.
      for: "00:01:00"
```


你也可以在 `for` 选项中使用模板。


```yaml
automation:
  triggers:
    - trigger: template
      value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
      for:
        minutes: "{{ states('input_number.minutes')|int(0) }}"
```


`for` 模板会在 `value_template` 变为 `true` 时求值。

如果模板中没有包含任何实体，那么它会每分钟重新渲染一次。

:::important
使用 `for` 选项无法跨越 Home Assistant 重启或自动化重新加载而保留。重启或重载期间，所有正在等待 `for` 时间结束的自动化都会被重置。

如果这不符合你的使用场景，可以考虑让自动化先设置一个[`input_datetime`](/home-assistant/integrations/input_datetime) 为目标时间，再使用该 [`input_datetime`](/home-assistant/integrations/input_datetime) 作为自动化触发器，在设定时间执行所需动作。

:::
## Time trigger

时间触发器可以配置为每天在某个特定时间触发一次，或者在某个特定日期的特定时间触发一次。支持三种格式：

### Time string

表示每天触发时间的字符串。可以写成 `HH:MM` 或 `HH:MM:SS`。如果未指定秒数，则默认使用 `:00`。

```yaml
automation:
  - triggers:
    - trigger: time
      # 24-hour time format. This trigger will fire at 3:32 PM
      at: "15:32:00"
```

### Input datetime

[input datetime](/home-assistant/integrations/input_datetime/) 的实体 ID。

| has_date | has_time | Description                              |
| -------- | -------- | ---------------------------------------- |
| `true`   | `true`   | Will fire at specified date & time.      |
| `true`   | `false`  | Will fire at midnight on specified date. |
| `false`  | `true`   | Will fire once a day at specified time.  |


```yaml
automation:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.motion
        to: "on"
    actions:
      - action: climate.turn_on
        target:
          entity_id: climate.office
      - action: input_datetime.set_datetime
        target:
          entity_id: input_datetime.turn_off_ac
        data:
          datetime: >
            {{ (now().timestamp() + 2*60*60)
               | timestamp_custom('%Y-%m-%d %H:%M:%S') }}
  - triggers:
      - trigger: time
        at: input_datetime.turn_off_ac
    actions:
      - action: climate.turn_off
        target:
          entity_id: climate.office
```


### Sensors of datetime device class

设备类为 `timestamp` 的[sensor](/home-assistant/integrations/sensor/) 的实体 ID。

```yaml
automation:
  - triggers:
      - trigger: time
        at: sensor.phone_next_alarm
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
```

### Sensors of datetime device class with offsets

当时间由 `timestamp` 设备类的传感器提供时，也可以指定偏移量。这个偏移量会加到传感器值上；如果是负值，则表示从中减去。

例如，下面的触发器会在手机闹钟响起前 5 分钟触发。

```yaml
automation:
  - triggers:
      - trigger: time
        at:
          entity_id: sensor.phone_next_alarm
          offset: -00:05:00
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
```

:::important
使用正偏移量时，触发器可能永远不会触发。这是因为传感器值可能会在达到偏移时间之前先发生变化。比如把手机闹钟作为触发器时，当闹钟响起后，传感器值会更新为下一次闹钟时间，因此这个触发器也会随之切换到新的时间。

:::
### Multiple times

你可以在列表中提供多个时间，且可以混用不同格式。

```yaml
automation:
  triggers:
    - trigger: time
      at:
        - input_datetime.leave_for_work
        - "18:30:00"
        - entity_id: sensor.bus_arrival
          offset: "-00:10:00"
```

### Limited templates

时间也支持使用[受限模板](/home-assistant/docs/configuration/templating/#limited-templates)。


```yaml
blueprint:
  input:
    alarm:
      name: Alarm
      selector: 
        text:
    hour:
      name: Hour
      selector:
        number:
          min: 0
          max: 24

  trigger_variables:
    my_alarm: !input alarm
    my_hour: !input hour
  trigger:
    - platform: time
      at:
      - "sensor.{{ my_alarm | slugify }}_time"
      - "{{ my_hour }}:30:00"
```


### Weekday filtering

时间触发器可以通过 `weekday` 选项限制为只在一周中的特定几天触发。这样你就可以创建只在工作日或周末运行的自动化。

`weekday` 选项接受：
- 单个字符串形式的星期值：`"mon"`、`"tue"`、`"wed"`、`"thu"`、`"fri"`、`"sat"`、`"sun"`
- 使用展开格式的星期列表

#### Single weekday

下面的示例会仅在每周一早上 8:00 打开灯：

```yaml
automation:
  - triggers:
      - trigger: time
        at: "08:00:00"
        weekday: "mon"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
```

#### Multiple weekdays

下面的示例会在工作日（周一到周五）每天早上 6:30 运行晨间例程：

```yaml
automation:
  - triggers:
      - trigger: time
        at: "06:30:00"
        weekday:
          - "mon"
          - "tue"
          - "wed"
          - "thu"
          - "fri"
    actions:
      - action: script.morning_routine
```

#### Weekend example

下面的示例展示了周末使用不同起床时间的做法：

```yaml
automation:
  - alias: "Weekday alarm"
    triggers:
      - trigger: time
        at: "06:30:00"
        weekday:
          - "mon"
          - "tue"
          - "wed"
          - "thu"
          - "fri"
    actions:
      - action: script.weekday_morning

  - alias: "Weekend alarm"
    triggers:
      - trigger: time
        at: "08:00:00"
        weekday:
          - "sat"
          - "sun"
    actions:
      - action: script.weekend_morning
```

#### Combined with input datetime

`weekday` 选项适用于所有时间格式，包括 input datetime 实体：

```yaml
automation:
  - triggers:
      - trigger: time
        at: input_datetime.work_start_time
        weekday:
          - "mon"
          - "tue"
          - "wed"
          - "thu"
          - "fri"
    actions:
      - action: notify.mobile_app
        data:
          title: "Work Day!"
          message: "Time to start working"
```

## Time pattern trigger

时间模式触发器允许你匹配当前时间的小时、分钟或秒是否等于某个特定值。你可以在值前加上 `/`，表示当该字段可被这个数字整除时触发。也可以使用 `*` 表示匹配任意值。

```yaml
automation:
  triggers:
    - trigger: time_pattern
      # Matches every hour at 5 minutes past whole
      minutes: 5

automation 2:
  triggers:
    - trigger: time_pattern
      # Trigger once per minute during the hour of 3
      hours: "3"
      minutes: "*"

automation 3:
  triggers:
    - trigger: time_pattern
      # You can also match on interval. This will match every 5 minutes
      minutes: "/5"
```

:::note
不要给数字加前导零。例如，使用 `'01'` 而不是 `'1'` 会导致错误。

:::
## Persistent notification trigger

当匹配配置选项的 `persistent_notification` 被 `added` 或 `removed` 时，持久化通知触发器会触发。

```yaml
automation:
  triggers:
    - trigger: persistent_notification
      update_type:
        - added
        - removed
      notification_id: invalid_config
```

更多关于事件触发器及可供自动化使用的附加事件数据，请参阅[Persistent Notification](/home-assistant/integrations/persistent_notification/) 集成文档。

## Webhook trigger

当有 Web 请求发送到 webhook 端点 `/api/webhook/<webhook_id>` 时，Webhook 触发器会触发。当你在自动化触发器中将某个值设为 `webhook_id` 时，该 webhook 端点会自动创建。`webhook_id` 可以是静态值，也可以通过[受限模板](/home-assistant/docs/configuration/templating/#limited-templates)计算得到。

:::note
`webhook_id` 模板只会在设置触发器时求值，不会在收到 webhook 请求时重新求值。

:::
```yaml
automation:
  trigger_variables:
    webhook_id_variable: "template_webhook_id"
  triggers:
    - trigger: webhook
      webhook_id: "some_hook_id"
      allowed_methods:
        - POST
        - PUT
      local_only: true
    - trigger: webhook
      webhook_id: "{{ webhook_id_variable }}"
      allowed_methods:
        - POST
```

你可以向 `http://your-home-assistant:8123/api/webhook/some_hook_id` 发送 HTTP POST 请求来运行这个自动化。下面是一个使用 **curl** 命令行工具、带表单数据示例的请求：

```shell
curl -X POST -d 'key=value&key2=value2' https://your-home-assistant:8123/api/webhook/some_hook_id
```

Webhook 支持 HTTP `POST`、`PUT`、`HEAD` 和 `GET` 请求；推荐使用 `PUT`。默认情况下，`GET` 和 `HEAD` 未启用，但你可以通过 `allowed_methods` 选项将其启用。你也可以在界面中通过 Webhook ID 旁边的设置齿轮按钮来配置这些请求方法。

默认情况下，Webhook 触发器只能从与你的 Home Assistant 位于同一网络的设备访问，或者通过 [Nabu Casa Cloud webhooks](https://www.nabucasa.com/config/webhooks/) 访问。如果你希望允许来自互联网的直接访问，请将 `local_only` 设为 `false`。这个选项也可以在界面中通过 Webhook ID 旁边的设置齿轮按钮进行配置。

如果你的 Home Assistant 安装启用了 SSL/TLS，请记得使用 HTTPS URL。

请注意，同一个 webhook 只能同时被一个自动化使用。也就是说，一个 webhook ID 只能被一个自动化触发器占用。

### Webhook data

Payload 可以编码为表单数据或 JSON。根据编码方式不同，其数据会分别在自动化模板中通过 `trigger.data` 或 `trigger.json` 提供。URL 查询参数则可通过 `trigger.query` 获取。

请注意，如果要使用 JSON 编码的 payload，必须将 `Content-Type` 请求头设置为 `application/json`，例如：

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' https://your-home-assistant:8123/api/webhook/some_hook_id
```

### Webhook security

Webhook 端点不需要额外认证，只要知道一个有效的 webhook ID 即可。Webhook 的安全最佳实践包括：

- 不要用 webhook 去触发带有破坏性或可能造成安全风险的自动化。例如，不要用 webhook 去解锁门锁或打开车库门。
- 将 webhook ID 视为密码：使用唯一、不可猜测的值，并妥善保密。
- 不要从公开来源（包括蓝图）直接复制 webhook ID。请始终自行创建。
- 如果不需要互联网访问，请保持 webhook 的 `local_only` 选项启用。

## Zone trigger

当实体进入或离开某个区域时，区域触发器会触发。实体可以是 person，也可以是 device_tracker。要让区域自动化正常工作，你需要先设置一个支持上报 GPS 坐标的设备追踪平台，例如 [GPS Logger](/home-assistant/integrations/gpslogger/)、[OwnTracks 平台](/home-assistant/integrations/owntracks/) 或 [iCloud 平台](/home-assistant/integrations/icloud/)。

```yaml
automation:
  triggers:
    - trigger: zone
      entity_id: person.paulus
      zone: zone.home
      # Event is either enter or leave
      event: enter # or "leave"
```

## Geolocation trigger

当地理位置实体出现在某个区域内，或从该区域中消失时，地理位置触发器会触发。由 [Geolocation](/home-assistant/integrations/geo_location/) 平台创建的实体支持 GPS 坐标上报。
由于这些平台会自动生成和移除实体，因此通常无法预先知道实体 ID。相反，此触发器要求定义一个 `source`，它直接对应某个地理位置平台。

:::tip
这不适用于 `device_tracker` 实体。对于它们，请使用上面的 `zone` 触发器。

:::
```yaml
automation:
  triggers:
    - trigger: geo_location
      source: nsw_rural_fire_service_feed
      zone: zone.bushfire_alert_zone
      # Event is either enter or leave
      event: enter # or "leave"
```

## Device triggers

设备触发器是一组由集成定义的事件。例如，既包括传感器状态变化，也包括遥控器按钮事件。
[MQTT 设备触发器](/home-assistant/integrations/device_trigger.mqtt/) 通过自动发现进行设置。

与状态触发器不同，设备触发器绑定的是设备，而不一定是某个实体。
要使用设备触发器，请通过浏览器前端创建自动化。
如果你想在不是通过浏览器前端管理的自动化中使用设备触发器，可以从前端的触发器组件复制 YAML，然后粘贴到自动化的触发器列表中。

## Calendar trigger

日历触发器会在 [Calendar](/home-assistant/integrations/calendar/) 事件开始或结束时触发，
相比只支持单个事件起始时间的日历实体状态，它可以实现更灵活的自动化。

你可以指定一个可选的时间偏移，让它在日历事件前后某个固定时间触发，比如在事件开始前 5 分钟。

```yaml
automation:
  triggers:
    - trigger: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.light_schedule
      # Optional time offset
      offset: "-00:05:00"
```

更多关于事件触发器及可供自动化使用的附加事件数据，请参阅 [Calendar](/home-assistant/integrations/calendar/) 集成文档。

## Sentence trigger

当 [Assist](/home-assistant/voice_control/) 使用默认[conversation agent](/home-assistant/integrations/conversation/) 匹配到一句话时，语句触发器会触发。语句触发器可与 Home Assistant Assist 配合使用。如果使用 OpenAI 或 Google Generative AI 等外部对话代理，则不会生效，除非你在对话代理设置中启用了 “Prefer handling commands locally”。

语句允许使用一些基本的[模板语法](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/#sentence-templates-syntax)，比如可选词和备选词。例如，`[it's ]party time` 同时匹配 “party time” 和 “it's party time”。

```yaml
automation:
  triggers:
    - trigger: conversation
      command:
        - "[it's ]party time"
        - "happy (new year|birthday)"
```

此触发器匹配到的语句会是：

- party time
- it's party time
- happy new year
- happy birthday

标点和大小写会被忽略，因此 “It's PARTY TIME!!!” 也会匹配。

### Related topic

- [Adding a custom sentence to trigger an automation](/home-assistant/voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation)

### Sentence wildcards

在触发语句中加入一个或多个 `{lists}`，可以捕获该位置上的任意文本。捕获结果会作为 `slots` 对象[出现在触发器数据中](/home-assistant/docs/automation/templating#sentence)。
这样你就可以匹配带有可变部分的句子，比如专辑名、艺术家名，或图片描述。

例如，语句 `play {album} by {artist}` 会匹配 “play the white album by the beatles”，并在动作模板中提供以下变量：


- `{{ trigger.slots.album }}` - "the white album"
- `{{ trigger.slots.artist }}` - "the beatles"


通配符会尽可能多地匹配文本，因此有时结果可能出乎意料：`play day by day by taken by trees` 会把 `album` 匹配为 `day`，而把 `artist` 匹配为 `day by taken by trees`。
在模板中加入额外词语可以帮助改善匹配，例如：`play {album} by artist {artist}`，这样就能正确匹配 “play day by day by artist taken by trees”。

## Multiple triggers

你可以为同一条规则指定多个触发器。做法是在每个触发器的第一行前加一个短横线（`-`），并将后续行正确缩进。只要任意一个触发器触发，自动化规则就会开始处理。

```yaml
automation:
  triggers:
    # first trigger
    - trigger: time_pattern
      minutes: 5
      # our second trigger is the sunset
    - trigger: sun
      event: sunset
```

## Multiple entity IDs for the same trigger

同一个触发器也可以指定多个实体。做法是在嵌套列表中添加多个实体。只要列表中的任意实体满足触发条件，触发器就会触发，并开始处理你的自动化。

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - sensor.one
        - sensor.two
        - sensor.three
```

## Disabling a trigger

自动化中的每个单独触发器都可以在不删除它的情况下被禁用。
只需在触发器中添加 `enabled: false`。例如：

```yaml
# Example script with a disabled trigger
automation:
  triggers:
    # This trigger will not trigger, as it is disabled.
    # This automation does not run when the sun is set.
    - enabled: false
      trigger: sun
      event: sunset

    # This trigger will fire, as it is not disabled.
    - trigger: time
      at: "15:32:00"
```

触发器也可以根据受限模板或蓝图输入来禁用。这些值只会在自动化加载时求值一次。


```yaml
blueprint:
  input:
    input_boolean:
      name: Boolean
      selector: 
        boolean:
    input_number:
      name: Number
      selector:
        number:
          min: 0
          max: 100

  trigger_variables:
    _enable_number: !input input_number

  triggers:
    - trigger: sun
      event_type: sunrise
      enabled: !input input_boolean
    - trigger: sun
      event_type: sunset
      enabled: "{{ _enable_number < 50 }}"
```


## Merging lists of triggers

:::caution
此功能需要 Home Assistant 2024.10 或更高版本。如果你在蓝图中使用它，请将蓝图的 `min_version` 至少设置为这个版本。更多信息请参阅[蓝图 schema 文档](/home-assistant/docs/blueprint/schema/#min_version)。

:::
在一些高级场景中（例如带有 trigger selector 的蓝图），你可能需要把第二个触发器列表插入主触发器列表中。做法是在主触发器列表里添加一个仅包含 `triggers` 键的字典，而该键的值是另一个触发器列表。这样它们会被展平成一个单独的触发器列表。例如：

```yaml
blueprint:
  name: Nested Trigger Blueprint
  domain: automation
  input:
    usertrigger:
      selector:
        trigger:

triggers:
  - trigger: event
    event_type: manual_event
  - triggers: !input usertrigger
```

这样，这个蓝图自动化既可以由固定的 `manual_event` 触发，也可以额外由 trigger selector 中选择的任意触发器触发。这同样适用于 `wait_for_trigger` 动作。
