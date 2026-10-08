# Manual MQTT Alarm 控制面板

**MQTT** 集成通过增加远程设备对报警系统的 MQTT 控制能力，扩展了 [manual alarm](/home-assistant/integrations/manual.md)。你可以用它创建外部键盘，只需改变 Home Assistant 中手动报警的状态即可。

它本质上与 [MQTT Alarm Panel](/home-assistant/integrations/alarm_control_panel.mqtt/index.md) 相反。后者是让 Home Assistant 观察一个现有的、功能完整的报警设备，所有报警逻辑都内置在那个物理设备中。

该集成会通过 `command_topic` 接收你的报警面板发来的以下命令：

* `DISARM`
* `ARM_HOME`
* `ARM_AWAY`
* `ARM_NIGHT`
* `ARM_VACATION`
* `ARM_CUSTOM_BYPASS`

当手动报警状态发生变化时，Home Assistant 会向 `state_topic` 发布以下状态之一：

* 'disarmed'
* 'armed\_home'
* 'armed\_away'
* 'armed\_night'
* 'armed\_vacation'
* 'armed\_custom\_bypass'
* 'pending'
* 'triggered'

## 配置

要在你的安装中使用此面板，请将以下内容添加到 "`configuration.yaml`" 文件。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
```

基础 manual alarm 平台中的以下配置变量可用：

```yaml
name:
  description: 报警器名称。
  required: false
  type: string
  default: HA Alarm
code:
  description: >
    如果定义了此项，则在前端启用或停用报警时需要输入该代码。
    MQTT 交互不要求此代码。
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
  description: >
   如果为 true，布防时需要代码。如果为 false，则不校验代码。
  required: false
  type: boolean
  default: true
delay_time:
  description: 触发报警前，额外叠加到 `triggered` 状态 **pending_time** 的延迟秒数。
  required: false
  type: integer
  default: 0
pending_time:
  description: 状态变更前，`pending` 状态持续的秒数。
  required: false
  type: integer
  default: 60
trigger_time:
  description: 报警响起时持续的秒数。
  required: false
  type: integer
  default: 120
disarm_after_trigger:
  description: 如果为 true，报警触发后会自动撤防，而不是返回之前状态。
  required: false
  type: boolean
  default: false
armed_home/armed_away/armed_night/armed_vacation/armed_custom_bypass/disarmed/triggered:
  description: 各状态专属设置
  required: false
  type: list
  keys:
    delay_time:
      description: **delay_time** 的状态专属设置（**triggered** 除外）。
      required: false
      type: integer
    pending_time:
      description: **pending_time** 的状态专属设置（**disarmed** 除外）。
      required: false
      type: integer
    trigger_time:
      description: **trigger_time** 的状态专属设置（**triggered** 除外）。
      required: false
      type: integer
```

详细说明请参阅 [manual alarm 平台](/home-assistant/integrations/manual.md)文档。

此外，还支持以下 MQTT 配置变量。

```yaml
state_topic:
  description: Home Assistant 发布状态更新的 MQTT 主题。
  required: true
  type: string
command_topic:
  description: Home Assistant 订阅的 MQTT 主题，用于接收远程设备发送的报警状态变更命令。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
payload_disarm:
  description: 用于撤防该报警面板的载荷。
  required: false
  type: string
  default: DISARM
payload_arm_home:
  description: 用于将该报警面板设为 armed-home 模式的载荷。
  required: false
  type: string
  default: ARM_HOME
payload_arm_away:
  description: 用于将该报警面板设为 armed-away 模式的载荷。
  required: false
  type: string
  default: ARM_AWAY
payload_arm_night:
  description: 用于将该报警面板设为 armed-night 模式的载荷。
  required: false
  type: string
  default: ARM_NIGHT
payload_arm_vacation:
  description: 用于将该报警面板设为 armed-vacation 模式的载荷。
  required: false
  type: string
  default: ARM_VACATION
payload_arm_custom_bypass:
  description: 用于将该报警面板设为 armed-custom-bypass 模式的载荷。
  required: false
  type: string
  default: ARM_CUSTOM_BYPASS
```

## 示例

在下面的配置示例中：

* `disarmed` 状态永远不会触发报警
* `armed_home` 状态不会给你留离开建筑或撤防的时间
* 其他状态会给你 30 秒离开时间，返回时有 20 秒可用于撤防
* 将 `triggered` 状态的 `pending_time` 设为 0，可让报警仅在前一状态的 `delay_time` 后触发；如果不设置，报警会在“前一状态 `delay_time` + 默认 `pending_time`”后触发

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
    pending_time: 30
    delay_time: 20
    trigger_time: 4
    disarmed:
      trigger_time: 0
    armed_home:
      pending_time: 0
      delay_time: 0
    triggered:
      pending_time: 0
```

更多真实使用示例请参阅 [Manual Alarm Control 页面](/home-assistant/integrations/manual.md#examples)。

## MQTT 控制

你可以使用 [MQTT](/home-assistant/integrations/mqtt/index.md) 控制该报警的状态。添加此组件前，请先确认已完成 MQTT 配置。

要更改报警状态，请向 `command_topic` 发布以下消息之一：

* `DISARM`
* `ARM_HOME`
* `ARM_AWAY`
* `ARM_NIGHT`
* `ARM_VACATION`
* `ARM_CUSTOM_BYPASS`

要接收来自 HA 的状态更新，请订阅 `state_topic`。每次状态变化时，Home Assistant 都会发布新消息：

* `disarmed`
* `armed_home`
* `armed_away`
* `armed_night`
* `armed_vacation`
* `armed_custom_bypass`
* `pending`
* `triggered`
