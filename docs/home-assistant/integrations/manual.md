---
title: Manual Alarm 控制面板
description: 关于如何将手动报警集成到 Home Assistant 的说明。
ha_category:
  - Alarm
  - Helper
ha_release: 0.7.6
ha_quality_scale: internal
ha_domain: manual
ha_iot_class: Calculated
ha_platforms:
  - alarm_control_panel
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Manual Alarm 控制面板**集成可让你在 Home Assistant 中创建报警系统。

## 配置

要启用此集成，请将以下内容添加到你的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual
```

```yaml
name:
  description: 报警器的名称。
  required: false
  type: string
  default: HA Alarm
unique_id:
  description: 为实体创建唯一 ID。
  required: false
  type: string
code:
  description: >
    如果定义了此项，则在前端启用或停用报警时需要输入该代码。
    **code** 和 **code_template** 只能二选一。
  required: exclusive
  type: string
code_template:
  description: >
    如果定义了此项，则返回一个用于在前端启用或停用报警的代码；空字符串表示不校验代码。
    在模板中，变量 **from_state** 和 **to_state** 分别表示当前状态和目标状态。
    **code** 和 **code_template** 只能二选一。
  required: exclusive
  type: string
code_arm_required:
  description: 如果为 true，启用报警时需要代码。
  required: false
  type: boolean
  default: true
delay_time:
  description: 报警触发前，`pending` 状态持续的秒数。
  required: false
  type: integer
  default: 60
arming_time:
  description: 状态变更前，`arming` 状态持续的秒数。
  required: false
  type: integer
  default: 60
trigger_time:
  description: 报警响起时，`triggered` 状态持续的秒数。
  required: false
  type: integer
  default: 120
disarm_after_trigger:
  description: 如果为 true，报警触发后会自动撤防，而不是返回到之前的状态。
  required: false
  type: boolean
  default: false
arming_states:
  description: 限制支持的布防状态。
  required: false
  type: list
  default: armed_away, armed_home, armed_night, armed_vacation, armed_custom_bypass
armed_custom_bypass/armed_home/armed_away/armed_night/armed_vacation/disarmed/triggered:
  description: 各状态专属设置
  required: false
  type: list
  keys:
    delay_time:
      description: **delay_time** 的状态专属设置（**triggered** 除外）
      required: false
      type: integer
    arming_time:
      description: **arming_time** 的状态专属设置（**disarmed** 和 **triggered** 除外）
      required: false
      type: integer
    trigger_time:
      description: **trigger_time** 的状态专属设置（**triggered** 除外）
      required: false
      type: integer
```

### 事件：Manual alarm bad code attempt

当尝试更改手动报警控制面板状态（比如布防或撤防）且因输入了无效代码而失败时，会触发 `manual_alarm_bad_code_attempt` 事件。

#### 事件数据

- **entity_id** (string): 报警控制面板的实体 ID（例如 `alarm_control_panel.my_alarm`）。
- **target_state** (string): 尝试切换到的目标状态（例如 `disarmed`、`armed_away`、`armed_home`）。
- **user_id** (string): 发起服务调用的用户 ID（如果可用）。

自动化触发器示例：

```yaml
automation:
  - alias: "Notify on invalid manual alarm code attempt"
    trigger:
      - platform: event
        event_type: manual_alarm_bad_code_attempt
    actions:
      - action: notify.your_notification_service # Replace with your actual notification service
        data:
          message: >
            Invalid alarm code attempt for {{ trigger.event.data.entity_id }}
            by user ID {{ trigger.event.data.user_id }}
            while attempting to set state {{ trigger.event.data.target_state }}.
```

## 状态机

Manual Alarm 集成的状态机较复杂，但功能强大。状态转换由三个值控制：**delay_time**、**arming_time** 和 **trigger_time**。这些值可以来自默认配置，也可以来自特定状态的覆盖配置。

当报警进入布防时，状态会先进入 **arming**，持续目标状态的 **arming_time** 秒，然后再切换到对应的 “armed” 状态。请注意，**code_template** 的 **to_state** 变量不会收到 “arming”；**to_state** 始终是用户请求的目标状态。不过 **from_state** *可能* 为 “arming”。

当报警被触发时，状态会先进入 **pending**，持续前一个状态的 **delay_time** 秒，然后切换到 “triggered” 状态。触发报警时不会校验代码，因此 **code_template** 的 **to_state** 也不会是 “triggered”；同样地，**from_state** *可能* 为 “triggered”。

报警会在 “triggered” 状态停留前一状态 **trigger_time** 指定的秒数。随后根据 **disarm_after_trigger** 的设置，返回前一状态或切换到 **disarmed**。如果前一状态的 **trigger_time** 为 0，则不会进入 “triggered”，报警会保持在布防状态。

每个设置都适用于不同场景。**arming_time** 可以在进入 “armed” 状态前给你留出离开建筑物的时间。

**delay_time** 可用于给撤防留出缓冲时间，并且很灵活。比如，你可以为 “armed away” 设置延迟，以避免车库门开启时立即触发报警，而 “armed home” 则不设置延迟。

**trigger_time** 可用于在撤防状态下禁用报警触发，也可以用于夜间仅让警报器短时鸣响。

## 示例

在下面的配置示例中：

- 只允许 `armed_away` 和 `armed_home` 两种布防状态
- `disarmed` 状态不会触发报警
- `armed_home` 状态下不会给你留离开或撤防时间
- 其他状态会给你 30 秒离开时间，回家后有 20 秒可用于撤防

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual
    name: Home Alarm
    unique_id: a_very_unique_id
    code: "1234"
    arming_time: 30
    delay_time: 20
    trigger_time: 4
    arming_states:
      - armed_away
      - armed_home
    disarmed:
      trigger_time: 0
    armed_home:
      arming_time: 0
      delay_time: 0
```

本节其余部分提供了一些在真实场景中使用该面板的示例。

### 传感器

使用传感器触发报警。

```yaml
automation:
- alias: 'Trigger alarm while armed away'
  triggers:
    - trigger: state
      entity_id: sensor.pir1
      to: "active"
    - trigger: state
      entity_id: sensor.pir2
      to: "active"
    - trigger: state
      entity_id: sensor.door
      to: "open"
    - trigger: state
      entity_id: sensor.window
      to: "open"
  conditions:
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: armed_away
  actions:
    - action: alarm_control_panel.alarm_trigger
      target:
        entity_id: alarm_control_panel.home_alarm
```

在报警被触发时发送通知。

```yaml
automation:
  - alias: 'Send notification when alarm triggered'
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.home_alarm
        to: "triggered"
    actions:
      - action: notify.notify
        data:
          message: "ALARM! The alarm has been triggered"
```

当门被正确解锁时撤防。

```yaml
automation:
  - alias: 'Disarm alarm when door unlocked by keypad'
    triggers:
      - trigger: state
        entity_id: sensor.front_door_lock_alarm_type
        to: "19"
        # many z-wave locks use Alarm Type 19 for 'Unlocked by Keypad'
    actions:
      - action: alarm_control_panel.alarm_disarm
        target:
          entity_id: alarm_control_panel.home_alarm
```

在报警布防（Away/Home）、撤防和 Pending 状态时发送通知


```yaml
- alias: 'Send notification when alarm is Disarmed'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "disarmed"
  actions:
    - action: notify.notify
      data:
        message: "ALARM! The alarm is Disarmed at {{ states('sensor.date_time') }}"
```

```yaml
- alias: 'Send notification when alarm is in pending status'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "pending"
  actions:
    - action: notify.notify
      data:
        message: "ALARM! The alarm is in pending status at {{ states('sensor.date_time') }}"
```

```yaml
- alias: 'Send notification when alarm is Armed in Away mode'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "armed_away"
  actions:
    - action: notify.notify
      data:
        message: "ALARM! The alarm is armed in Away mode {{ states('sensor.date_time') }}"
```

```yaml
- alias: 'Send notification when alarm is Armed in Home mode'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "armed_home"
  actions:
    - action: notify.notify
      data:
        # Using multi-line notation allows for easier quoting
        message: >
          ALARM! The alarm is armed in Home mode {{ states('sensor.date_time') }}
```


