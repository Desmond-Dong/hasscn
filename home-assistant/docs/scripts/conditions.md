# 条件

条件可以在脚本或自动化中使用，以阻止进一步的执行。当条件评估为 true 时，脚本或自动化将被执行。如果返回任何其他值，脚本或自动化将停止执行。条件会查看系统当时的状态。例如，条件可以测试一个开关当前是开启还是关闭。

与触发器不同（触发器始终是 `or`），条件默认是 `and` —— 所有条件都必须为 true。

所有条件都支持可选的 `alias`。

## 逻辑条件

### AND 条件

在一个条件语句中测试多个条件。如果所有嵌入的条件都为 true，则通过。

```yaml
conditions:
  - alias: "Paulus 在家且温度低于 20"
    condition: and
    conditions:
      - condition: state
        entity_id: "device_tracker.paulus"
        state: "home"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

如果您不想组合 AND 和 OR 条件，可以将它们按顺序列出。

以下配置的工作方式与上面列出的相同：

```yaml
conditions:
  - condition: state
    entity_id: "device_tracker.paulus"
    state: "home"
  - condition: numeric_state
    entity_id: "sensor.temperature"
    below: 20
```

目前您需要像这样格式化您的条件，以便能够使用[自动化编辑器](/home-assistant/docs/automation/editor/index.md)编辑它们。

AND 条件也有简写形式。以下配置的工作方式与上面列出的相同：

```yaml
conditions:
  alias: "Paulus 在家且温度低于 20"
  - and:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

### OR 条件

在一个条件语句中测试多个条件。如果任何嵌入的条件为 true，则通过。

```yaml
conditions:
  - alias: "Paulus 在家或温度低于 20"
    condition: or
    conditions:
      - condition: state
        entity_id: "device_tracker.paulus"
        state: "home"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

OR 条件也有简写形式。以下配置的工作方式与上面列出的相同：

```yaml
conditions:
  - alias: "Paulus 在家或温度低于 20"
    or:
      - condition: state
        entity_id: "device_tracker.paulus"
        state: "home"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

### 混合 AND 和 OR 条件

在一个条件语句中测试多个 AND 和 OR 条件。如果任何嵌入的条件为 true，则通过。
这允许您将多个 AND 和 OR 条件混合在一起。

```yaml
conditions:
  - condition: and
    conditions:
      - condition: state
        entity_id: "device_tracker.paulus"
        state: "home"
      - condition: or
        conditions:
          - condition: state
            entity_id: sensor.weather_precip
            state: "rain"
          - condition: numeric_state
            entity_id: "sensor.temperature"
            below: 20
```

或使用简写形式：

```yaml
conditions:
  - and:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - or:
      - condition: state
        entity_id: sensor.weather_precip
        state: "rain"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

### NOT 条件

在一个条件语句中测试多个条件。如果所有嵌入的条件都**不**为 true，则通过。

```yaml
conditions:
  - alias: "Paulus 不在家且警报未撤防"
    condition: not
    conditions:
      - condition: state
        entity_id: device_tracker.paulus
        state: "home"
      - condition: state
        entity_id: alarm_control_panel.home_alarm
        state: "disarmed"
```

NOT 条件也有简写形式。以下配置的工作方式与上面列出的相同：

```yaml
conditions:
  alias: "Paulus 不在家且警报未撤防"
  not:
    - condition: state
      entity_id: device_tracker.paulus
      state: "home"
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: disarmed
```

## 数值状态条件

这种类型的条件尝试将指定实体的状态或实体的属性解析为数字，如果值匹配阈值（严格小于/大于，不包括等于），则触发。

如果同时指定了 `below` 和 `above`，则两个测试都必须通过。

```yaml
conditions:
  - alias: "温度在 17 到 25 度之间"
    condition: numeric_state
    entity_id: sensor.temperature
    above: 17
    below: 25
```

您可以选择使用 `value_template` 在测试之前处理状态的值。

```yaml
conditions:
  - condition: numeric_state
    entity_id: sensor.temperature
    above: 17
    below: 25
    # 如果传感器值需要调整
    value_template: "{{ state_attr('sensor.temperature', 'adjusted_value') }}"
```

也可以同时针对多个实体测试条件。
如果**所有**实体都匹配阈值，条件将通过。

```yaml
conditions:
  - condition: numeric_state
    entity_id:
      - sensor.kitchen_temperature
      - sensor.living_room_temperature
    below: 18
```

或者，条件可以针对状态属性进行测试。
如果实体的属性值匹配阈值，条件将通过。

```yaml
conditions:
  - condition: numeric_state
    entity_id: climate.living_room_thermostat
    attribute: temperature
    above: 17
    below: 25
```

数字助手（`input_number` 实体）、`number`、`sensor` 和 `zone` 实体
包含数值时，可以在 `above` 和 `below` 选项中使用，使条件更加动态。

```yaml
conditions:
  - condition: numeric_state
    entity_id: climate.living_room_thermostat
    attribute: temperature
    above: input_number.temperature_threshold_low
    below: input_number.temperature_threshold_high
```

## 状态条件

测试实体是否具有指定状态。

```yaml
conditions:
  - alias: "Paulus 已离家一个多小时"
    condition: state
    entity_id: device_tracker.paulus
    state: "not_home"
    # optional: Evaluates to true only if state was this for last X time.
    for:
      hours: 1
      minutes: 10
      seconds: 5
```

也可以同时针对多个实体测试条件。
如果**所有**实体都匹配状态，条件将通过。

```yaml
conditions:
  - condition: state
    entity_id:
      - light.kitchen
      - light.living_room
    state: "on"
```

除了匹配所有实体外，也可以只匹配其中一个实体。
在以下示例中，如果**任何**实体匹配状态，条件将通过。

```yaml
conditions:
  - condition: state
    entity_id:
      - binary_sensor.motion_sensor_left
      - binary_sensor.motion_sensor_right
    match: any
    state: "on"
```

测试实体是否匹配一组可能的条件；
如果实体匹配给定的状态之一，条件将通过。

```yaml
conditions:
  - condition: state
    entity_id: alarm_control_panel.home
    state:
      - "armed_away"
      - "armed_home"
```

或者，将多个实体与多个状态组合。在以下示例中，
两个媒体播放器都需要处于暂停或播放状态，条件才能通过。

```yaml
conditions:
  - condition: state
    entity_id:
      - media_player.living_room
      - media_player.kitchen
    state:
      - "playing"
      - "paused"
```

或者，条件可以针对状态属性进行测试。
如果属性匹配给定的状态，条件将通过。

```yaml
conditions:
  - condition: state
    entity_id: climate.living_room_thermostat
    attribute: fan_mode
    state: "auto"
```

最后，`state` 选项接受助手实体（也称为 `input_*` 实体）。
如果实体的状态与给定助手实体的状态匹配，条件将通过。

```yaml
conditions:
  - condition: state
    entity_id: alarm_control_panel.home
    state: input_select.guest_mode
```

您也可以在 `for` 选项中使用模板。

```yaml
conditions:
  - condition: state
    entity_id: device_tracker.paulus
    state: "home"
    for:
      minutes: "{{ states('input_number.minutes') }}"
      seconds: "{{ states('input_number.seconds') }}"
```

`for` 模板将在测试条件时进行评估。

### 太阳条件

#### 太阳状态条件

太阳状态可用于测试太阳是否已落下或升起。

```yaml
conditions:
  - alias: "太阳升起"
    condition: state  # “白天”条件：从日出到日落
    entity_id: sun.sun
    state: "above_horizon"
```

```yaml
conditions:
  - alias: "太阳落下"
    condition: state  # 从日落到日出
    entity_id: sun.sun
    state: "below_horizon"
```

### 太阳高度条件

太阳高度可用于测试当触发器发生时太阳是否已落下或升起、是否为黄昏或夜间。
有关太阳高度的详细说明，请参阅[太阳高度触发器][sun_elevation_trigger]。

[sun_elevation_trigger]: /docs/automation/triggers/#sun-elevation-trigger

```yaml
conditions:
  - condition: and  # “薄暮”条件：在典型地区指黄昏和黎明时段
    conditions:
      - condition: template
        value_template: "{{ state_attr('sun.sun', 'elevation') < 0 }}"
      - condition: template
        value_template: "{{ state_attr('sun.sun', 'elevation') > -6 }}"
```

```yaml
conditions:
  condition: template  # “夜间”条件：在典型地区指从黄昏到黎明
  value_template: "{{ state_attr('sun.sun', 'elevation') < -6 }}"
```

### 日落/日出条件

太阳条件也可以测试当触发器发生时太阳是否已经落下或升起。`before` 和 `after` 键只能设置为 `sunset` 或 `sunrise`。它们有相应的可选偏移值（`before_offset`、`after_offset`）可以添加，类似于[太阳触发器][sun_trigger]。

注意，如果只使用 `before` 键，条件将在午夜到日出/日落之间为 true。如果只使用 `after` 键，条件将从日落/日出到午夜为 true。如果同时使用 `before: sunrise` 和 `after: sunset` 键，条件将在午夜到日出**以及**日落到午夜之间为 true。如果同时使用 `after: sunrise` 和 `before: sunset` 键，条件将在日出到日落之间为 true。

[sun_trigger]: /docs/automation/triggers/#sun-trigger

:::tip
日落/日出条件在极圈内的位置不起作用，在时区偏差很大的位置也不起作用。在这些情况下，建议使用评估太阳高度的条件，而不是日落/日出条件。
:::

这是日落前 1 小时偏移的示例：

```yaml
conditions:
  - condition: sun
    after: sunset
    after_offset: "-01:00:00"
```

这是"天黑时"——等效于 `sun.sun` 的 `below_horizon` 状态条件：

```yaml
conditions:
  - condition: sun
    after: sunset
    before: sunrise
```

这是"天亮时"——等效于 `sun.sun` 的 `above_horizon` 状态条件：

```yaml
conditions:
  - condition: sun
    after: sunrise
    before: sunset
```

下面提供了一个可视化时间线，显示了这些条件何时为 `true` 的示例。在此图表中，日出时间为 6:00，日落时间为 18:00（下午 6:00）。图表中的绿色区域表示指定条件何时为 `true`。

![展示太阳条件示例的图示](/home-assistant/images/docs/scripts/sun-conditions.svg)

## 模板条件

模板条件测试[给定模板][template]是否呈现为等于 true 的值。这通过让模板结果为 true 布尔表达式或让模板呈现 `True` 来实现。

```yaml
conditions:
  - alias: "iPhone 电量高于 50%"
    condition: template
    value_template: "{{ is_state('sensor.iphone_battery', '50') }}"
```

在自动化中，模板条件还可以访问 `trigger` 变量，如[此处所述][automation-templating]。

### 模板条件简写符号

模板条件有一个简写符号，可以使您的脚本和自动化更短。

例如：

```yaml
conditions: "{{ is_state('device_tracker.paulus', 'home') }}"
```

或者在条件列表中，允许使用本章描述的现有条件以及一个或多个简写模板条件

```yaml
conditions:
  - "{{ is_state('device_tracker.paulus', 'home') }}"
  - condition: state
    entity_id: alarm_control_panel.home
    state: armed_away
  - "{{ is_state('sensor.temperature', '22') }}"
```

这种简写符号可以在 Home Assistant 接受条件的任何地方使用。例如，在 [`and`](#and-条件)、[`or`](#or-条件) 和 [`not`](#not-条件) 条件中：

```yaml
conditions:
  - condition: or
    conditions:
      - "{{ is_state('device_tracker.paulus', 'home') }}"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

它也在 `repeat` 动作的 `while` 或 `until` 选项中受支持，或在 `choose` 动作的 `conditions` 选项中受支持：

```yaml
- while: "{{ is_state('sensor.temperature', '22') }}"
  sequence:
    - ...
```

```yaml
- choose:
    - conditions: "{{ is_state('device_tracker.paulus', 'home') }}"
      sequence:
       - ...
```

它也在脚本或自动化 `condition` 动作中受支持：

```yaml
- condition: "{{ is_state('device_tracker.paulus', 'home') }}"
```

[template]: /docs/configuration/templating/

[automation-templating]: /getting-started/automation-templating/

## 时间条件

时间条件可以测试是否在指定时间之后、指定时间之前或是否为一周中的某一天。

```yaml
conditions:
  - alias: "时间 15~02"
    condition: time
    # 以下至少需要一项。
    after: "15:00:00"
    before: "02:00:00"
    weekday:
      - mon
      - wed
      - fri
```

`weekday` 的有效值为 `mon`、`tue`、`wed`、`thu`、`fri`、`sat`、`sun`。
注意，如果只使用 `before` 键，条件将从午夜到指定时间为 `true`。
如果只使用 `after` 键，条件将从指定时间到午夜为 `true`。

如果同时使用 `after` 和 `before` 键，时间条件窗口可以跨越午夜阈值。在上面的示例中，条件窗口是从下午 3 点到凌晨 2 点。

after 时间是包含的，而 before 是不包含的。在上面的示例中，如果时间是下午 3 点（15:00:00），则满足 after 时间条件。如果时间是凌晨 2 点（2:00:00），它将无法通过条件，因为它只在 1:59:59 之前有效。

:::tip
更好的工作日条件可能是使用[工作日二元传感器](/home-assistant/integrations/workday/index.md)。
:::

对于 `after` 和 `before` 选项，可以使用时间助手（`input_datetime` 实体）、`time` 实体或另一个包含带有"timestamp"设备类的时间戳的 `sensor` 实体。

```yaml
conditions:
  - alias: "引用时间助手的示例"
    condition: time
    after: input_datetime.house_silent_hours_start
    before: input_datetime.house_silent_hours_end

  - alias: "引用时间实体的示例"
    before: time.dnd_start

  - alias: "引用其他传感器的示例"
    after: sensor.groceries_delivery_time
```

:::note
请注意，时间条件只考虑时间。如果引用的传感器或助手实体包含带有日期的时间戳，日期部分将被完全忽略。
:::

## 触发器条件

触发器条件可以测试自动化是否由某个触发器触发，通过触发器的 `id` 标识。

```yaml
conditions:
  - condition: trigger
    id: event_trigger
```

对于通过其索引标识的触发器，字符串和整数都允许：

```yaml
conditions:
  - condition: trigger
    id: "0"
```

```yaml
conditions:
  - condition: trigger
    id: 0
```

可以提供触发器列表：

```yaml
conditions:
  - condition: trigger
    id:
      - event_1_trigger
      - event_2_trigger
```

## 区域条件

区域条件测试实体是否在某个区域内。要使区域自动化工作，您需要设置支持报告 GPS 坐标的设备跟踪器平台。

```yaml
conditions:
  - alias: "Paulus 在家"
    condition: zone
    entity_id: device_tracker.paulus
    zone: zone.home
```

也可以同时针对多个实体测试条件。
如果所有实体都在指定区域内，条件将通过。

```yaml
conditions:
  - condition: zone
    entity_id:
      - device_tracker.frenck
      - device_tracker.daphne
    zone: zone.home
```

测试实体是否匹配一组可能的区域；
如果实体在其中一个区域内，条件将通过。

```yaml
conditions:
  - condition: zone
    entity_id: device_tracker.paulus
    state:
      - zone.home
      - zone.work
```

或者，将多个实体与多个区域组合。在以下示例中，
两个实体都需要在家庭或工作区域内，条件才能通过。

```yaml
conditions:
  condition: zone
  entity_id:
    - device_tracker.frenck
    - device_tracker.daphne
  state:
    - zone.home
    - zone.work
```

## 示例

```yaml
conditions:
  - condition: numeric_state
    entity_id: sun.sun
    value_template: "{{ state_attr('sun.sun', 'elevation') }}"
    below: 1
  - condition: state
    entity_id: light.living_room
    state: "off"
  - condition: time
    before: "23:00:00"
    after: "14:00:00"
  - condition: state
    entity_id: script.light_turned_off_5min
    state: "off"
```

## 禁用条件

每个单独的条件都可以禁用，而无需删除它。
为此，请在条件配置中添加 `enabled: false`。

如果您想临时禁用某个条件（例如用于测试），这会很有用。禁用的条件将表现为已删除。

例如：

```yaml
# 此条件已被禁用，因此将始终通过。
conditions:
  - enabled: false
    condition: state
    entity_id: sun.sun
    state: "above_horizon"
```

条件也可以基于有限模板或蓝图输入进行禁用。

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

  conditions:
    - condition: state
      entity_id: sun.sun
      state: "above_horizon"
      enabled: !input input_boolean
    - condition: state
      entity_id: sun.sun
      state: "below_horizon"
      enabled: "{{ _enable_number > 50 }}"
```
