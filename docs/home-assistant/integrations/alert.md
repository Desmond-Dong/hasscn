---
title: 警报
description: 'Alert 集成旨在在问题出现时通知您。 例如，如果车库门被打开，alert 集成可用于通过以可自定义的间隔发送重复通知来提醒您。这也用于低电池传感器、漏水传感器或任何可能需要您关注的情况。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
ha_release: 0.38
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: alert
ha_codeowners:
  - '@home-assistant/core'
  - '@frenck'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# 警报

**Alert** 集成旨在在问题出现时通知您。
例如，如果车库门被打开，`alert` 集成可用于通过以可自定义的间隔发送重复通知来提醒您。这也用于低电池传感器、漏水传感器或任何可能需要您关注的情况。

警报将在前端添加一个实体。
此实体允许您在警报解决之前将其静音，并具有三种可能的状态：

| 状态  | 描述                                                  |
| ------ | ------------------------------------------------------------ |
| `idle` | 警报的条件为假。                        |
| `on`   | 警报的条件为真。                         |
| `off`  | 警报的条件为真但已被确认。 |

### 基本示例

`alert` 集成使用任何 `notification` 集成。要设置 `alert` 集成，首先，您必须设置一个[通知集成](/home-assistant/integrations/notify)。
然后，将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
alert:
  garage_door:
    name: Garage is open
    done_message: Garage is closed
    entity_id: input_boolean.garage_door
    state: "on"
    repeat: 30
    can_acknowledge: true
    skip_first: true
    notifiers:
      - ryans_phone
      - kristens_phone
```

```yaml
name:
  description: 警报的友好名称。
  required: true
  type: string
entity_id:
  description: 要监视的实体 ID。
  required: true
  type: string
title:
  description: >
    如果通知器支持，用于通知的标题，支持[模板](/home-assistant/docs/configuration/templating/)。
  required: false
  type: template
state:
  description: 实体的问题条件。
  required: false
  type: string
  default: on
repeat:
  description: >
    重复通知之前的分钟数。
    可以是数字或数字列表。
  required: true
  type: [integer, list]
can_acknowledge:
  description: 控制通知是否可以被确认；如果警报不应被确认，则设置为 `false`。
  required: false
  type: boolean
  default: true
skip_first:
  description: >
    控制通知是应该立即发送还是在第一次延迟后发送。
  required: false
  type: boolean
  default: false
message:
  description: >
    警报从 `idle` 转换为 `on` 后发送的消息，支持[模板](/home-assistant/docs/configuration/templating/)。
  required: false
  type: template
done_message:
  description: >
    警报从 `on` 或 `off` 转换为 `idle` 后发送的消息，支持[模板](/home-assistant/docs/configuration/templating/)。只有在从 `idle` 转换为 `on` 时发送了警报通知的情况下才会发送。
  required: false
  type: template
notifiers:
  description: "用于警报的 `notification` 集成列表。"
  required: false
  type: list
data:
  description: "发送给通知器的额外参数字典。"
  required: false
  type: list  
```

在此示例中，监视车库门状态（`input_boolean.garage_door`），当其状态等于 `on` 时将触发此警报。
这表示门已被打开。因为 `skip_first` 选项设置为 `true`，第一条通知不会立即发送。
但是，每 30 分钟将发送一条通知，直到 `input_boolean.garage_door` 不再处于 `on` 状态，或者使用 Home Assistant 前端确认警报。

对于需要其他参数的通知器（例如 `twilio_sms` 需要在发送通知时指定 `target` 参数），您可以使用 `group` 通知为警报包装它们。
只需创建一个包含单个通知成员（如 `twilio_sms`）的 `group` 通知类型，指定除 `alert` 集成提供的 `message` 之外的所需参数：

```yaml
- platform: group
  name: john_phone_sms
  services:
    - action: twilio_sms
      data:
        target: !secret john_phone
```

```yaml
alert:
  freshwater_temp_alert:
    name: "Warning: I have detected a problem with the freshwater tank temperature"
    entity_id: binary_sensor.freshwater_temperature_status
    state: "on"
    repeat: 5
    can_acknowledge: true
    skip_first: false
    notifiers:
      - john_phone_sms
```

### 复杂警报条件

根据设计，`alert` 集成仅处理非常简单的触发条件。
也就是说，它只检查单个实体的状态是否等于某个值。在某些时候，可能需要一个具有更复杂条件的警报。
可能是当电池百分比低于阈值时。也许您想在某些日子禁用警报。也许警报触发应该取决于多个输入。对于所有这些情况，最好将警报与 `模板二值传感器` 结合使用。以下示例展示了这种做法。


```yaml
template:
  - binary_sensor:
      - name: "Motion Battery is Low"
        state: "{{ state_attr('sensor.motion', 'battery') | float(default=0) < 15 }}"
        device_class: battery

alert:
  motion_battery:
    name: Motion Battery is Low
    entity_id: binary_sensor.motion_battery_is_low
    repeat: 30
    notifiers:
      - ryans_phone
      - kristens_phone
```


此示例将在实体 `sensor.motion` 的 `battery` 属性低于 15 时立即开始触发。它将继续触发，直到电池属性升至 15 以上或在前端确认警报。

### 动态通知延迟时间

可能希望警报通知之间的延迟时间随着警报继续触发而动态变化。这可以通过将 `repeat` 配置键设置为数字列表而不是单个数字来实现。
修改第一个示例如下：

```yaml
# 示例 configuration.yaml 条目
alert:
  garage_door:
    name: Garage is open
    entity_id: input_boolean.garage_door
    state: "on"   # 可选，'on' 是默认值
    repeat:
      - 15
      - 30
      - 60
    can_acknowledge: true  # 可选，默认为 true
    skip_first: true  # 可选，false 是默认值
    notifiers:
      - ryans_phone
      - kristens_phone
```

现在第一条消息将在 15 分钟延迟后发送，第二条将在 30 分钟后发送，随后的每条通知之间将有 60 分钟的延迟。
例如，如果车库门在 2:00 打开，通知将在 2:15、2:45、3:45、4:45 等时间发送，每 60 分钟继续一次。

### 消息模板

可能希望警报通知包含有关实体状态的信息。[模板][template] 可用于警报的消息或名称中，使其更具相关性。
以下将显示如何为植物包含实体的 `problem` `attribute`。


```yaml
# 示例 configuration.yaml 条目
alert:
  office_plant:
    name: Plant in office needs help
    entity_id: plant.plant_office
    state: "problem"
    repeat: 30
    can_acknowledge: true
    skip_first: true
    message: "Plant {{ states.plant.plant_office }} needs help ({{ state_attr('plant.plant_office', 'problem') }})"
    done_message: Plant in office is fine
    notifiers:
      - ryans_phone
      - kristens_phone
```


结果消息可能是 `Plant Officeplant needs help (moisture low)`。

### 通知器的额外参数

某些通知器支持更多参数（例如，设置文本颜色或操作按钮）。这些可以通过 `data` 参数提供：

```yaml
# 示例 configuration.yaml 条目
alert:
  garage_door:
    name: "Garage is open"
    message: "The garage door is still open"
    done_message: "The garage door is closed"
    entity_id: input_boolean.garage_door
    state: "on"   # 可选，'on' 是默认值
    repeat:
      - 15
      - 30
      - 60
    can_acknowledge: true  # 可选，默认为 true
    skip_first: true  # 可选，false 是默认值
    data:
      inline_keyboard:
        - 'Close garage:/close_garage, Acknowledge:/garage_acknowledge'
    notifiers:
      - frank_telegram
```

此特定示例依赖于 Telegram 的 `inline_keyboard` 功能，用户可以通过按钮执行某些操作。

根据上面的示例，您可以创建一个自动化来停止进一步的消息，但您仍将收到完成消息。

```yaml
- alias: "Telegram callback to stop alerts for garage door"
  triggers:
    - trigger: event
      event_type: telegram_callback
      event_data:
        data: "/garage_acknowledge"
  actions:
    - action: alert.turn_off
      target:
        entity_id: alert.garage_door
```

发送到 Home Assistant Companion 应用程序的通知支持[替换](https://companion.home-assistant.io/docs/notifications/notifications-basic/#replacing)和[清除](https://companion.home-assistant.io/docs/notifications/notifications-basic/#replacing)通知。要在警报中使用这些功能，请在消息数据中设置 `tag`，将 `clear_notification` 作为 `done_message` 发送，并使用 `mobile_app_*` 作为通知器：

```yaml
alert:
  garage_door:
    name: Garage is open
    done_message: clear_notification
    entity_id: input_boolean.garage_door
    state: "on"
    repeat: 30
    can_acknowledge: true
    skip_first: true
    notifiers:
      - mobile_app_ryan
      - mobile_app_kristen
    data:
      tag: garage-door
```

[template]: /docs/configuration/templating/
