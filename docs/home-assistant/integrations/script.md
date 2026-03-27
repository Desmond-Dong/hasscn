---
title: Scripts
description: 'Scripts 集成允许你定义一系列由 Home Assistant 执行的操作。当你启用脚本时，这些操作会被执行。脚本集成会为每个脚本创建一个实体，并允许你通过动作来控制它们。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: script
ha_integration_type: system
---
# Scripts

**Scripts** 集成允许你定义一系列由 Home Assistant 执行的操作。当你启用脚本时，这些操作会被执行。脚本集成会为每个脚本创建一个实体，并允许你通过动作来控制它们。

脚本既可以通过 YAML 配置创建（见下文），也可以通过 [UI](https://my.home-assistant.io/redirect/scripts/) 创建。

[![Open **Settings** > **Automations & scenes** in your Home Assistant instance.](https://my.home-assistant.io/badges/scripts.svg)](https://my.home-assistant.io/redirect/scripts/)

## 配置

操作序列使用 [Home Assistant 脚本语法](/home-assistant/getting-started/scripts/)定义。


```yaml
# `configuration.yaml` 配置示例
script:
  message_temperature:
    sequence:
      # 这是 Home Assistant 脚本语法
      - action: notify.notify
        data:
          message: "Current temperature is {{ states('sensor.temperature') }}"
```


:::important
脚本名称（例如上例中的 `message_temperature`）不能包含大写字母，也不能包含短横线（减号）字符 `-`。为了提升可读性，建议使用下划线（`_`）分隔单词。

:::
```yaml
alias:
  description: 脚本的友好名称。
  required: false
  type: string
icon:
  description: 脚本图标。
  required: false
  type: string
description:
  description: 脚本描述，会显示在 **开发者工具** 下的 **动作** 标签页中。
  required: false
  default: ''
  type: string
variables:
  description: 可在模板中使用的变量
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: 变量的值。可使用任意有效 YAML，也可用模板传入变量值。
      type: any
fields:
  description: "脚本字段参数信息；请参阅下方[向脚本传递变量](#passing-variables-to-scripts)部分。"
  required: false
  default: {}
  type: map
  keys:
    FIELD_NAME:
      description: 此脚本使用的参数字段。所有子选项仅用于在 UI 中展示此脚本。
      type: map
      keys:
        name:
          description: 此脚本参数字段的名称。
          type: string
        description:
          description: 此脚本参数的描述。
          type: string
        advanced:
          description: 将此字段标记为高级参数。只有在用户启用高级模式时，才会在 UI 中显示。
          type: boolean
          default: false
        required:
          description: 标记该字段是否必填。此功能仅影响 UI。
          type: boolean
          default: false
        example:
          description: 示例值。仅显示在 **开发者工具** 的 **动作** 标签页中的可选项表格里。
          type: string
        default:
          description: 此字段在 UI 中显示的默认值。
          type: any
        selector:
          description: >
            此输入使用的 [selector](/home-assistant/docs/blueprint/selectors/)。
            selector 用于定义该输入在前端 UI 中的显示方式。
          type: selector
          required: false
mode:
  description: "控制脚本在已有一个或多个运行实例尚未结束时再次被调用时的行为。参见[脚本模式](#script-modes)。"
  required: false
  type: string
  default: single
max:
  description: "控制同时执行和/或排队等待执行的最大运行数量。仅对 `queued` 和 `parallel` 模式有效。"
  required: false
  type: integer
  default: 10
max_exceeded:
  description: "当超过 `max`（在 `single` 模式下等效为 1）时，会记录日志提示该情况。此选项用于控制该日志的严重级别。有效值列表见[日志级别](/home-assistant/integrations/logger/#log-levels)。也可以设置为 `silent` 以不输出该日志。"
  required: false
  type: string
  default: warning
sequence:
  description: 脚本中要执行的操作序列。
  required: true
  type: list
```

### Script modes

模式 | 说明
-|-
`single` | 不启动新的运行，并输出警告。
`restart` | 先停止之前的运行，再启动新的运行。
`queued` | 在之前所有运行结束后再启动新的运行。运行会按入队顺序执行。
`parallel` | 与之前运行并行启动一个新的独立运行。

<p class='img'>
  <img src='/home-assistant/images/integrations/script/script_modes.jpg'>
</p>

### Passing variables to scripts

在调用动作时，可以向脚本传递变量，这些变量会在该脚本的模板中可用。

如果要通过 UI 配置脚本接收变量，可在脚本编辑器中把变量添加为字段。
1. 在脚本编辑器中，打开三点菜单，选择 **添加字段**。
2. 在基本信息和 **序列** 之间会新增一个名为 **字段** 的区域。
3. 输入字段名称，并为每个字段选择类型和选项。
4. 这里配置的字段会显示在其他 UI 编辑器中，例如在自动化里调用该脚本时，会根据字段类型显示对应输入项。
5. 使用字段数据时，请使用添加字段时的 **字段键名** 作为模板变量，参考下方示例。

在脚本中使用这些变量时，需要使用模板：


```yaml
# `configuration.yaml` 配置示例
script:
  notify_pushover:
    description: "Send a pushover notification"
    fields:
      title:
        description: "The title of the notification"
        example: "State change"
      message:
        description: "The message content"
        example: "The light is on!"
    sequence:
      - condition: state
        entity_id: switch.pushover_notifications
        state: "on"
      - action: notify.pushover
        data:
          title: "{{ title }}"
          message: "{{ message }}"
```


除了自动化编辑器 UI 外，也可以在动作数据中向脚本传递变量。你既可以直接调用脚本，也可以使用通用 `script.turn_on` 动作。两者差异见[等待脚本完成](#waiting-for-script-to-complete)。所有动作数据都会作为模板变量可用，即使它们没有在脚本中定义为字段。下面示例展示了如何直接调用脚本：


```yaml
# `configuration.yaml` 配置示例
automation:
  triggers:
    - trigger: state
      entity_id: light.bedroom
      from: "off"
      to: "on"
  actions:
    - action: script.notify_pushover
      data:
        title: "State change"
        message: "The light is on!"
```


下面示例展示了使用 `script.turn_on` 动作：


```yaml
# `configuration.yaml` 配置示例
automation:
  triggers:
    - trigger: state
      entity_id: light.bedroom
      from: "off"
      to: "on"
  actions:
    - action: script.turn_on
      target:
        entity_id: script.notify_pushover
      data:
        variables:
          title: "State change"
          message: "The light is on!"
```


:::note
可在模板中使用的脚本变量包括：
- 在配置中通过字段提供的变量
- 启动脚本时在动作数据中传入的变量
- `this` 变量，其值是当前脚本状态的字典


:::
### Waiting for Script to Complete

当“直接”调用脚本（如 `script.NAME`）时，调用方脚本会等待被调用脚本执行结束。
如果被调用脚本发生错误并中止，调用方脚本也会中止。

当通过 `script.turn_on` 动作调用一个或多个脚本时，调用方脚本_不会_等待。它会按列出的顺序依次启动脚本，并在最后一个脚本启动后立即继续执行。
被调用脚本中的错误导致其中止时，_不会_影响调用方脚本。

<p class='img'>
  <img src='/home-assistant/images/integrations/script/script_wait.jpg'>
</p>

下面示例展示了调用方脚本不等待的场景。它会在被调用脚本“后台运行”时执行其他操作，然后再通过 `wait_template` 等待其完成。
这种方式还可用于让调用方脚本等待被调用脚本结束，但在被调用脚本因错误中止时，调用方脚本_不会_被中止。


```yaml
script:
  script_1:
    sequence:
      - action: script.turn_on
        target:
          entity_id: script.script_2
      # 在第二个脚本运行期间执行其他步骤...
      # 现在等待被调用脚本完成。
      - wait_template: "{{ is_state('script.script_2', 'off') }}"
      # 然后继续做其他事情...
  script_2:
    sequence:
      # 与第一个脚本同时执行一些操作...
```


### 完整配置


```yaml
script: 
  wakeup:
    alias: "起床"
    icon: "mdi:party-popper"
    description: "先打开卧室灯，延迟后再打开客厅灯"
    variables:
      turn_on_entity: group.living_room
    fields:
      minutes:
        name: 分钟
        description: "打开客厅灯前需要等待的时间"
        selector:
          number:
            min: 0
            max: 60
            step: 1
            unit_of_measurement: 分钟
            mode: slider
    # 如果脚本运行中再次被调用（通常处于 delay 阶段），则从头开始执行。
    mode: restart
    sequence:
      # 这是 Home Assistant 脚本语法
      - event: LOGBOOK_ENTRY
        event_data:
          name: Paulus
          message: 起床中
          entity_id: device_tracker.paulus
          domain: light
      - alias: "打开卧室灯"
        action: light.turn_on
        target:
          entity_id: group.bedroom
        data:
          brightness: 100
      - delay:
          # 支持 seconds、milliseconds、minutes、hours
          minutes: "{{ minutes }}"
      - alias: "打开客厅灯"
        action: light.turn_on
        target:
          entity_id: "{{ turn_on_entity }}"
```


## 视频教程

本视频教程讲解了脚本的工作方式、如何在脚本中使用字段，以及如何在脚本中使用响应变量。

<lite-youtube videoid="vD_xckjQxRk" videotitle="掌握 Home Assistant 脚本：完整指南" posterquality="maxresdefault"></lite-youtube>
