---
title: 脚本语法
description: '脚本是 Home Assistant 将按顺序执行的一系列动作。脚本既可以通过独立的脚本集成作为实体使用，也可以嵌入自动化和 Alexa/Amazon Echo 配置中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 脚本语法

脚本是 Home Assistant 将按顺序执行的一系列动作。脚本既可以通过独立的[脚本集成]作为实体使用，也可以嵌入自动化和 [Alexa/Amazon Echo] 配置中。

当脚本在自动化中执行时，可以使用 `trigger` 变量。请参阅[可用的触发器数据](/home-assistant/docs/automation/templating/#可用的触发器数据)。

## 脚本语法

脚本语法的基本结构是由键值映射组成的列表，每个映射都包含一个动作。如果脚本只包含 1 个动作，则可以省略最外层列表。

所有动作都支持可选的 `alias`。

```yaml
# 包含脚本语法的脚本集成示例
script:
  example_script:
    sequence:
      # 这里使用的是脚本语法
      - alias: "Turn on ceiling light"
        action: light.turn_on
        target:
          entity_id: light.ceiling
      - alias: "Notify that ceiling light is turned on"
        action: notify.notify
        data:
          message: "Turned on the ceiling light!"
```

## 执行动作

执行动作有多种方式。有关全部用法，请参阅[动作页面]。

```yaml
- alias: "Bedroom lights on"
  action: light.turn_on
  target:
    entity_id: group.bedroom
  data:
    brightness: 100
```

### 激活场景

脚本也可以使用激活场景的简写语法，而不是调用 `scene.turn_on` 动作。

```yaml
- scene: scene.morning_living_room
```

## 变量

`variables` 动作可让您设置或覆盖后续动作中的模板可访问变量。另请参阅[脚本变量]，了解如何定义整个脚本都可访问的变量。

```yaml
- alias: "Set variables"
  variables:
    entities:
      - light.kitchen
      - light.living_room
    brightness: 100
- alias: "Control lights"
  action: light.turn_on
  target:
    entity_id: "{{ entities }}"
  data:
    brightness: "{{ brightness }}"
```

变量也可以使用模板。

```yaml
- alias: "Set a templated variable"
  variables:
    blind_state_message: "The blind is {{ states('cover.blind') }}."
- alias: "Notify about the state of the blind"
  action: notify.mobile_app_iphone
  data:
    message: "{{ blind_state_message }}"
```

### 变量作用域

`variables` 动作会为先前定义的同名变量重新赋值。如果某个变量此前尚未定义，它会被赋值到顶层（脚本运行）作用域。

```yaml
sequence:
  # Set the people variable to a default value
  - variables:
      people: 0
  # Try to increment people if Paulus is home
  - if:
      - condition: state
        entity_id: device_tracker.paulus
        state: "home"
    then:
      - variables:
          people: "{{ people + 1 }}"
          paulus_home: true
      - action: notify.notify
        data:
          message: "There are {{ people }} people home" # "There are 1 people home"
  # Variable value is now updated
  - action: notify.notify
    data:
      message: "There are {{ people }} people home (including Paulus)"
      # "There are 1 people home (including Paulus)"
```

## 测试条件

在执行脚本时，您可以在主序列中加入条件，以停止后续执行。当条件没有返回 `true` 时，脚本就会停止执行。有关各种条件的说明，请参阅[条件页面]。

:::note
`condition` 动作只会停止当前序列块的执行。当它用在 [repeat](#重复一组动作) 动作中时，只会停止 `repeat` 循环的当前迭代。当它用在 [choose](#选择一组动作) 动作中时，只会停止该 `choose` 中当前匹配的序列。
:::

```yaml
# If paulus is home, continue to execute the script below these lines
- alias: "Check if Paulus is home"
  condition: state
  entity_id: device_tracker.paulus
  state: "home"
```

`condition` 也可以写成条件列表，只有当所有条件都返回 `true` 时，脚本才会继续执行。

```yaml
- alias: "Check if Paulus ishome AND temperature is below 20"
  conditions:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

## 等待一段时间（delay）

`delay` 可用于让脚本暂时暂停，并在稍后继续执行。下面展示了几种支持的写法。

```yaml
# Seconds
# Waits 5 seconds
- alias: "Wait 5s"
  delay: 5
```

```yaml
# HH:MM
# Waits 1 hour
- delay: "01:00"
```

```yaml
# HH:MM:SS
# Waits 1.5 minutes
- delay: "00:01:30"
```

```yaml
# Supports milliseconds, seconds, minutes, hours, days
# Can be used in combination, at least one required
# When using milliseconds, consider that delay as *at least* X milliseconds. It won´t be exact.
# Waits 1 minute
- delay:
    minutes: 1
```

所有形式都支持模板。

```yaml
# 等待 `input_number.minute_delay` 当前设置的分钟数
- delay:
    minutes: "{{ states('input_number.minute_delay') | int }}"
```

## 等待

这些动作可让脚本等待系统中的实体进入模板指定的某种状态，或者等待一个或多个触发器所表示的事件发生。

### 等待模板成立

此动作会计算模板；如果结果为真，脚本将继续执行。否则，脚本会一直等待，直到其结果为真。

当模板中引用的实体 ID 状态发生变化时，模板会重新计算。如果您在模板中使用了 `now()` 这类非确定性函数，它不会持续重新计算，而只会在被引用的实体 ID 发生变化时重新计算。如果您需要定期重新计算模板，可以引用 [Time and Date](/home-assistant/integrations/time_date/) 集成中的某个传感器，该传感器会按分钟或按天更新。

```yaml
# 等待媒体播放器停止
- alias: "Wait until media player is stopped"
  wait_template: "{{ is_state('media_player.living_room', 'idle') }}"
```

### 等待触发器

此动作可以使用与自动化 `trigger` 部分相同的触发器。请参阅[自动化触发器](/home-assistant/docs/automation/trigger/)。当任一触发器触发时，脚本都会继续执行。此前定义的[触发器变量](/home-assistant/docs/automation/trigger/#触发器变量)、[变量](#变量)以及[脚本变量]都会传递给该触发器。

```yaml
# Wait for a custom event or light to turn on and stay on for 10 sec
- alias: "Wait for MY_EVENT or light on"
  wait_for_trigger:
    - trigger: event
      event_type: MY_EVENT
    - trigger: state
      entity_id: light.LIGHT
      to: "on"
      for: 10
```

### 等待超时

无论使用哪种等待方式，都可以设置超时。若条件未满足或事件未发生，脚本会在超时后继续执行。`timeout` 的语法与 `delay` 相同，也支持模板。

```yaml
# 最多等待 1 分钟，让传感器变为 'on' 后再继续执行。
- wait_template: "{{ is_state('binary_sensor.window', 'on') }}"
  timeout: "00:01:00"
```

你也可以通过设置可选项 `continue_on_timeout: false`，让脚本在超时后直接中止。

```yaml
# Wait for IFTTT event or abort after specified timeout.
- wait_for_trigger:
    - trigger: event
      event_type: ifttt_webhook_received
      event_data:
        action: connected_to_network
  timeout:
    minutes: "{{ states('input_number.timeout_minutes') | int(1) }}"
  continue_on_timeout: false
```

如果不设置 `continue_on_timeout: false`，脚本始终会继续执行，因为 `continue_on_timeout` 的默认值是 `true`。

### 等待变量

每次等待结束后（无论是条件满足、事件发生，还是等待超时），都会创建或更新变量 `wait`，用来表示等待结果。

| Variable         | Description                                                                                                                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wait.completed` | 若条件满足则为 `true`，否则为 `false` |
| `wait.remaining` | 剩余超时时间；如果未设置超时，则为 `none` |
| `wait.trigger`   | 仅在 `wait_for_trigger` 之后存在。包含哪个触发器被触发的信息。（请参阅[可用的触发器数据](/home-assistant/docs/automation/templating/#可用的触发器数据)。）如果超时前没有触发器发生，则为 `none` |

您可以利用它根据条件是否满足来执行不同动作，或在实现单个总体超时的同时顺序使用多个等待动作。

```yaml
# Take different actions depending on if condition was met.
- wait_template: ""
  timeout: 10
- if:
    - ""
  then:
    - action: script.door_did_not_open
  else:
    - action: script.turn_on
      target:
        entity_id:
          - script.door_did_open
          - script.play_fanfare

# Wait a total of 10 seconds.
- wait_template: ""
  timeout: 10
  continue_on_timeout: false
- action: switch.turn_on
  target:
    entity_id: switch.some_light
- wait_for_trigger:
    - trigger: state
      entity_id: binary_sensor.door_2
      to: "on"
      for: 2
  timeout: ""
  continue_on_timeout: false
- action: switch.turn_off
  target:
    entity_id: switch.some_light
```

## 触发事件

此动作可让您触发一个事件。事件有很多用途，比如触发自动化，或者通知其他集成某件事正在发生。例如，下面的示例会在 **活动** 面板中创建一条记录。

```yaml
- alias: "Fire LOGBOOK_ENTRY event"
  event: LOGBOOK_ENTRY
  event_data:
    name: Paulus
    message: is waking up
    entity_id: device_tracker.paulus
    domain: light
```

你也可以使用 `event_data` 发送携带自定义数据的事件。这可用于向另一个正在等待该事件触发器的脚本传递数据。

`event_data` 支持模板。

```yaml
- event: MY_EVENT
  event_data:
    name: myEvent
    customData: "{{ states('light.kitchen') }}"
```

### 触发并消费自定义事件

下面的示例展示了如何触发名为 `event_light_state_changed` 的自定义事件，并把 `entity_id` 作为事件数据的一部分。触发事件的这段内容既可以放在脚本中，也可以放在自动化中。

```yaml
- alias: "Fire Event"
  triggers:
    - trigger: state
      entity_id: switch.kitchen
      to: "on"
  actions:
    - event: event_light_state_changed
      event_data:
        state: "on"
```

下面的示例展示了如何使用[自动化事件触发器](/home-assistant/docs/automation/trigger/#事件触发器)捕获自定义事件 `event_light_state_changed`，并获取作为事件触发器数据传入的 `entity_id`。更多详情请参阅[可用的触发器数据](/home-assistant/docs/automation/templating/#可用的触发器数据)。

```yaml
- alias: "Capture Event"
  triggers:
    - trigger: event
      event_type: event_light_state_changed
  actions:
    - action: notify.notify
      data:
        message: "kitchen light is turned "
```

## 重复一组动作

`repeat` 可让你重复执行一组动作，并且完全支持嵌套。
控制重复次数的方式有三种。

### 计数重复

This form accepts a count value. The value may be specified by a template, in which case
the template is rendered when the repeat step is reached.

```yaml
script:
  flash_light:
    mode: restart
    sequence:
      - action: light.turn_on
        target:
          entity_id: "light."
      - alias: "Cycle light 'count' times"
        repeat:
          count: ""
          sequence:
            - delay: 2
            - action: light.toggle
              target:
                entity_id: "light."
  flash_hallway_light:
    sequence:
      - alias: "Flash hallway light 3 times"
        action: script.flash_light
        data:
          light: hallway
          count: 3
```

### 对每一项执行

这种重复形式接受一个要迭代的项目列表。该列表既可以是预先定义好的列表，也可以由模板生成。

序列会对列表中的每一项执行一次，当前迭代项可通过 `repeat.item` 访问。

下面的示例会依次关闭一组灯：

```yaml
repeat:
  for_each:
    - "living_room"
    - "kitchen"
    - "office"
  sequence:
    - action: light.turn_off
      target:
        entity_id: "light."
```

Other types are accepted as list items, for example, each item can be a
template, or even a mapping of key/value pairs.

```yaml
repeat:
  for_each:
    - language: English
      message: Hello World
    - language: Dutch
      message: Hallo Wereld
  sequence:
    - action: notify.phone
      data:
        title: "Message in "
        message: "!"
```

### While 循环

这种形式接受一组条件（可用选项请参阅[条件页面]），并会在每次运行序列 _之前_ 进行评估。
只要这些条件的结果为 true，序列就会持续执行。

```yaml
script:
  do_something:
    sequence:
      - action: script.get_ready_for_something
      - alias: "Repeat the sequence AS LONG AS the conditions are true"
        repeat:
          while:
            - condition: state
              entity_id: input_boolean.do_something
              state: "on"
            # Don't do it too many times
            - condition: template
              value_template: ""
          sequence:
            - action: script.something
```

`while` 也支持[模板条件的简写语法][简写模板]。
例如：

```yaml
- repeat:
    while: ""
    sequence:
      - ...
```

### 重复直到

This form accepts a list of 条件 that are evaluated _after_ each time the sequence
is run. Therefore the sequence will always run at least once. The sequence will be run
_until_ the 条件(s) evaluate to true.

```yaml
automation:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.xyz
        to: "on"
    conditions:
      - condition: state
        entity_id: binary_sensor.something
        state: "off"
    actions:
      - alias: "Repeat the sequence UNTIL the conditions are true"
        repeat:
          sequence:
            # Run command that for some reason doesn't always work
            - action: shell_command.turn_something_on
            # Give it time to complete
            - delay:
                milliseconds: 200
          until:
            # Did it work?
            - condition: state
              entity_id: binary_sensor.something
              state: "on"
```

`until` 也支持[模板条件的简写语法][简写模板]。
例如：

```yaml
- repeat:
    until: ""
    sequence:
      - ...
```

### 重复循环变量

A variable named `repeat` is defined within the repeat , meaning it is available inside `sequence`, `while`, and `until`.
It contains the following fields:

| field   | description                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| `first` | True during the first iteration of the repeat sequence                                       |
| `index` | The iteration number of the loop: 1, 2, 3, ...                                               |
| `last`  | True during the last iteration of the repeat sequence, which is only valid for counted loops |

## If-then

This  allows you to conditionally (`if`), based on or more [条件](/home-assistant/docs/scripts/conditions/) (which are `and` combined),
run a sequence of 动作 (`then`) and optionally supports running other sequence when the 条件 didn't pass (`else`).

```yaml
script:
  - if:
      - alias: "If no one is home"
        condition: state
        entity_id: zone.home
        state: 0
    then:
      - alias: "Then start cleaning already!"
        action: vacuum.start
        target:
          area_id: living_room
    # The `else` is fully optional and can be omitted
    else:
      - action: notify.notify
        data:
          message: "Skipped cleaning, someone is home!"
```

This  supports nesting, however, if you find yourself using nested if-then
动作 in the `else` part, you may want to consider using
[choose](#choose-a-group-of-动作) instead.

## Choose a group of 动作

This  allows you to select a sequence of other  from a list of sequences.
Nesting is fully supported.

Each sequence is paired with a list of 条件. (See the [条件 page] for available options and how multiple 条件 are handled.) The first sequence whose 条件 are all true will be run.
An _optional_ `default` sequence can be included which will be run only if none of the sequences from the list are run.

An _optional_ `alias` can be added to each of the sequences, excluding the `default` sequence.

The `choose`  can be used like an "if/then/elseif/then.../else" statement. The first `conditions`/`sequence` pair is like the "if/then", and can be used just by itself. Or additional pairs can be added, each of which is like an "elif/then". And lastly, a `default` can be added, which would be like the "else."

```yaml
# Example with "if", "elif" and "else"
automation:
  - triggers:
      - trigger: state
        entity_id: input_boolean.simulate
        to: "on"
    mode: restart
    actions:
      - choose:
          # IF morning
          - conditions:
              - condition: template
                value_template: ""
            sequence:
              - action: script.sim_morning
          # ELIF day
          - conditions:
              - condition: template
                value_template: ""
            sequence:
              - action: light.turn_off
                target:
                  entity_id: light.living_room
              - action: script.sim_day
        # ELSE night
        default:
          - action: light.turn_off
            target:
              entity_id: light.kitchen
          - delay:
              minutes: ""
          - action: light.turn_off
            target:
              entity_id: all
```

`conditions` also accepts a [shorthand notation of a template 条件][shorthand-template].
For example:

```yaml
automation:
  - triggers:
      - trigger: state
        entity_id: input_select.home_mode
    actions:
      - choose:
          - conditions: >
              
            sequence:
              - action: script.arrive_home
                data:
                  ok: true
          - conditions: >
              
            sequence:
              - action: script.turn_on
                target:
                  entity_id: script.flash_lights
              - action: script.arrive_home
                data:
                  ok: false
          - conditions: ""
            sequence:
              - action: script.left_home
```

More `choose` can be used together. This is the case of an IF-IF.

下面的示例展示了单个自动化如何控制彼此无关、但共享同一触发器的实体。

When the sun goes below the horizon, the `porch` and `garden` 灯光 must 打开. If someone is watching the TV in the living room, there is a high chance that someone is in that room, therefore the living room 灯光 have to 打开 too. The same concept applies to the `studio` room.

```yaml
# Example with "if" and "if"
automation:
  - alias: "Turn lights on when the sun gets dim and if some room is occupied"
      triggers:
        - trigger: numeric_state
          entity_id: sun.sun
          attribute: elevation
          below: 4
      actions:
        # This must always apply
        - action: light.turn_on
          data:
            brightness: 255
            color_temp: 366
          target:
            entity_id:
              - light.porch
              - light.garden
        # IF a entity is ON
        - choose:
            - conditions:
                - condition: state
                  entity_id: binary_sensor.livingroom_tv
                  state: "on"
              sequence:
                - action: light.turn_on
                  data:
                    brightness: 255
                    color_temp: 366
                  target:
                    entity_id: light.livingroom
         # IF another entity not related to the previous, is ON
        - choose:
            - conditions:
                - condition: state
                  entity_id: binary_sensor.studio_pc
                  state: "on"
              sequence:
                - action: light.turn_on
                  data:
                    brightness: 255
                    color_temp: 366
                  target:
                    entity_id: light.studio
```

## Grouping 动作

The `sequence`  allows you to group multiple 
together. Each 动作 will be executed in order, meaning the next 动作 will
only be executed after the previous 动作 has been completed.

Grouping 动作 in a sequence can be useful when you want to be able to
collapse related groups in the user interface for organizational purposes.

Combined with the [`parallel`](#parallelizing-动作) 动作, it can also be
used to run multiple groups of 动作 in a sequence in parallel.

In the example below, two separate groups of 动作 are executed in sequence,
one for turning on devices, the other for sending 通知. Each group of
动作 is executed in order, this includes the 动作 in each group and the
groups themselves. In total, four 动作 are executed, one after the other.

```yaml
automation:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.motion
        to: "on"
    actions:
      - alias: "Turn on devices"
        sequence:
          - action: light.turn_on
            target:
              entity_id: light.ceiling
          - action: siren.turn_on
            target:
              entity_id: siren.noise_maker
      - alias: "Send notifications"
        sequence:
          - action: notify.person1
            data:
              message: "The motion sensor was triggered!"
          - action: notify.person2
            data:
              message: "Oh oh, someone triggered the motion sensor..."
```

## Parallelizing 动作

By default, all sequences of  in Home Assistant run sequentially. This
means the next  is started after the current 动作 has been completed.

This is not always needed, for example, if the sequence of 动作 doesn't rely
on each other and order doesn't Matter. For those cases, the `parallel` 动作
can be used to run the  in the sequence in parallel, meaning all
the  are started at the same time.

The following example shows sending messages out at the same time (in parallel):

```yaml
automation:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.motion
        to: "on"
    actions:
      - parallel:
          - action: notify.person1
            data:
              message: "These messages are sent at the same time!"
          - action: notify.person2
            data:
              message: "These messages are sent at the same time!"
```

It is also possible to run a group of 动作 sequentially inside the parallel
动作. The example below demonstrates that:

```yaml
script:
  example_script:
    sequence:
      - parallel:
          - sequence:
              - wait_for_trigger:
                  - trigger: state
                    entity_id: binary_sensor.motion
                    to: "on"
              - action: notify.person1
                data:
                  message: "This message awaited the motion trigger"
          - action: notify.person2
            data:
              message: "I am sent immediately and do not await the above action!"
```

:::警告
Running  in parallel can be helpful in many cases, but use it with
caution and only if you need it.

There are some caveats (see below) when using parallel 动作.

While it sounds attractive to parallelize, most of the time, just the regular
sequential  will work just fine.
:::

Some of the caveats of running  in parallel:

- There is no order guarantee. The  will be started in parallel, but
  there is no guarantee that they will be completed in the same order.
- If one  fails or 错误, the other  will keep running until
  they too have finished or errored.
- Variables 创建/修改 in one parallelized  can conflict with variables
  from another parallelized . Make sure to give them distinct names to prevent that.

## Stopping a 脚本 sequence

It is possible to halt a 脚本 sequence at any point and return 脚本 responses
using the `stop` .

The `stop`  takes a text as input explaining the reason for halting the
sequence. This text will be logged and shows up in the  and
脚本 traces.

`stop` can be useful to halt a 脚本 halfway through a sequence when,
for example, a 条件 is not met.

```yaml
- stop: "Stop running the rest of the sequence"
```

To return a response from a 脚本, use the `response_variable` option. This
option expects the name of the variable that contains the data to return. The
response data must contains a mapping of key/value pairs.

```yaml
- stop: "Stop running the rest of the sequence"
  response_variable: "my_response_variable"
```

There is also an `error` option, to indicate we are stopping because of
an unexpected 错误. It stops the sequence as well, but marks the 
or 脚本 as failed to run.

```yaml
- stop: "Well, that was unexpected!"
  error: true
```

## Continuing on 错误

By default, a sequence of  will be halted when one of the  in
that sequence encounters an 错误. The  or 脚本 will be halted,
an 错误 is logged, and the  or 脚本 run is marked as errored.

Sometimes these 错误 are expected, for example, because you know the 动作
you perform can be problematic at times, and it doesn't Matter if it fails.
You can set `continue_on_error` for those cases on such an .

The `continue_on_error` is available on all  and is set to
`false`. You can set it to `true` if you'd like to continue the 
sequence, regardless of whether that  encounters an 错误.

The example below shows the `continue_on_error` set on the first . If
it encounters an 错误; it will continue to the next .

```yaml
- alias: "If this one fails..."
  continue_on_error: true
  action: notify.super_unreliable_service_provider
  data:
    message: "I'm going to error out..."

- alias: "This one will still run!"
  action: persistent_notification.create
  data:
    title: "Hi there!"
    message: "I'm fine..."
```

请注意，`continue_on_error` 不会抑制或忽略配置错误
or 错误 that Home Assistant does not handle.

## Disabling an 动作

Every individual  in a sequence can be disabled, without removing it.
To do so, add `enabled: false` to the . For example:

```yaml
# Example script with a disabled action
script:
  example_script:
    sequence:
      # This action will not run, as it is disabled.
      # The message will not be sent.
      - enabled: false
        alias: "Notify that the ceiling light is being turned on"
        action: notify.notify
        data:
          message: "Turning on the ceiling light!"

      # This action will run, as it is not disabled
      - alias: "Turn on the ceiling light"
        action: light.turn_on
        target:
          entity_id: light.ceiling
```

动作 can also be disabled based on limited templates or blueprint inputs.

```yaml
blueprint:
  input:
    input_boolean:
      name: Boolean
      selector:
        boolean:

  actions:
    - delay: 0:35
      enabled: !input input_boolean
```

## Respond to a conversation

`set_conversation_response` 动作用于在脚本由对话引擎触发时返回自定义响应，例如被语音助手触发时。对话响应同样可以使用模板。

```yaml
# Example of a templated conversation response resulting in "Testing 123"
- variables:
    my_var: "123"
- set_conversation_response: "Testing {{ my_var }}"
```

当脚本结束时，响应会交给对话引擎。如果 `set_conversation_response` 被执行多次，则会使用最近一次设置的响应。要清除响应，请将其设置为 `None`：

```yaml
# Example of a clearing a conversation response
set_conversation_response: ~
```

如果脚本不是由对话引擎触发的，那么这个响应不会被任何功能使用。

[脚本集成]: /integrations/script/
[自动化]: /docs/automation/action/
[Alexa/Amazon Echo]: /integrations/alexa/
[动作页面]: /docs/scripts/perform-action/
[条件页面]: /docs/scripts/conditions/
[简写模板]: /docs/scripts/conditions/#template-condition-shorthand-notation
[脚本变量]: /integrations/script/#configuration-variables
