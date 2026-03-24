---
title: "MQTT 报警控制面板"
description: "关于如何将 MQTT 报警面板集成到 Home Assistant 的说明。"
ha_category:
  - Alarm
ha_release: 0.7.4
ha_iot_class: Configurable
ha_domain: mqtt
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**MQTT 报警控制面板** 集成可以控制支持 MQTT 的报警面板。报警图标将在从 `state_topic` 接收到新状态后改变状态。如果这些消息使用 *RETAIN* 标志发布，MQTT 报警面板将在订阅后立即接收状态更新，并以正确的状态启动。否则，初始状态将为 `unknown`。

集成将接受您的报警面板的以下状态（小写）：

- `disarmed`
- `armed_home`
- `armed_away`
- `armed_night`
- `armed_vacation`
- `armed_custom_bypass`
- `pending`
- `triggered`
- `arming`
- `disarming`

当用户与 Home Assistant 前端交互时，集成可以通过发布到 `command_topic` 来控制您的报警面板。

## 配置

要在您的安装中使用 MQTT 报警控制面板，请[将 MQTT 设备添加为子条目](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - alarm_control_panel:
      state_topic: "home/alarm"
      command_topic: "home/alarm/set"
```

或者，可以通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行更高级的设置。

```yaml
availability:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题列表。不能与 `availability_topic` 一起使用。
  required: false
  type: list
  keys:
    payload_available:
      description: 表示可用状态的负载。
      required: false
      type: string
      default: online
    payload_not_available:
      description: 表示不可用状态的负载。
      required: false
      type: string
      default: offline
    topic:
      description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。
      required: true
      type: string
    value_template:
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `topic` 中提取设备的可用性。此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较以确定设备的可用性。"
      required: false
      type: template
availability_mode:
  description: 当配置了 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，则必须在所有配置的可用性主题上接收到 `payload_available` 后，实体才会被标记为在线。如果设置为 `any`，则必须至少在一个配置的可用性主题上接收到 `payload_available` 后，实体才会被标记为在线。如果设置为 `latest`，则在任何配置的可用性主题上接收到的最后一个 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `availability_topic` 中提取设备的可用性。此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较以确定设备的可用性。"
  required: false
  type: template
availability_topic:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。不能与 `availability` 一起使用。
  required: false
  type: string
code:
  description: 如果定义，指定在前端启用或禁用报警的密码。注意，密码在本地验证并阻止向远程设备发送 MQTT 消息。对于远程密码验证，可以将密码配置为特殊值 `REMOTE_CODE`（数字密码）或 `REMOTE_CODE_TEXT`（文本密码）。在这种情况下，将绕过本地密码验证，但前端仍将显示数字或文本密码对话框。使用 `command_template` 将密码发送到远程设备。远程密码验证的示例配置[可以在这里找到](#configurations-with-remote-code-validation)。
  required: false
  type: string
code_arm_required:
  description: 如果为 true，则需要密码来布防报警。如果为 false，则不验证密码。
  required: false
  type: boolean
  default: true
code_disarm_required:
  description: 如果为 true，则需要密码来撤防报警。如果为 false，则不验证密码。
  required: false
  type: boolean
  default: true
code_trigger_required:
  description: 如果为 true，则需要密码来触发报警。如果为 false，则不验证密码。
  required: false
  type: boolean
  default: true
command_template:
  description: "用于命令负载的[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)。可用变量：`action` 和 `code`。"
  required: false
  type: template
  default: action
command_topic:
  description: 发布命令以更改报警状态的 MQTT 主题。
  required: true
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如，`alarm_control_panel.foobar`。当不使用 `unique_id` 时，如果实体 ID 可用，实体 ID 将在重启或重新加载期间更新。如果实体 ID 已存在，实体 ID 将在末尾创建一个数字。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此报警面板所属设备的信息，以将其绑定到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置 [`unique_id`](#unique_id) 时有效。必须至少存在标识符或连接之一来识别设备。"
  required: false
  type: map
  keys:
    configuration_url:
      description: '可以管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
      required: false
      type: string
    connections:
      description: '设备与外部世界的连接列表，作为元组列表 `[connection_type, connection_identifier]`。例如网络接口的 MAC 地址：`"connections": [["mac", "02:5b:26:a8:dc:12"]]`。'
      required: false
      type: list
    hw_version:
      description: 设备的硬件版本。
      required: false
      type: string
    identifiers:
      description: "唯一标识设备的 ID 列表。例如序列号。"
      required: false
      type: [list, string]
    manufacturer:
      description: "设备的制造商。"
      required: false
      type: string
    model:
      description: "设备的型号。"
      required: false
      type: string
    model_id:
      description: 设备的型号标识符。
      required: false
      type: string
    name:
      description: "设备的名称。"
      required: false
      type: string
    serial_number:
      description: "设备的序列号。"
      required: false
      type: string
    suggested_area:
      description: '如果设备尚未在区域中，建议一个区域。'
      required: false
      type: string
    sw_version:
      description: "设备的固件版本。"
      required: false
      type: string
    via_device:
      description: "在此设备与 Home Assistant 之间路由消息的设备的标识符。此类设备的示例包括集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。"
      required: false
      type: string
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收和发布的消息负载的编码。设置为 `""` 以禁用传入负载的解码。
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: 实体的[类别](https://developers.home-assistant.io/docs/core/entity#generic-properties)。
  required: false
  type: string
entity_picture:
  description: "实体的图片 URL。"
  required: false
  type: string
icon:
  description: "实体的[图标](/home-assistant/docs/configuration/customizing-devices/#icon)。"
  required: false
  type: icon
json_attributes_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `json_attributes_topic` 上接收的消息中提取 JSON 字典。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration)文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典负载然后设置为传感器属性的 MQTT 主题。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration)文档中找到。
  required: false
  type: string
name:
  description: 报警的名称。如果只有设备名称相关，可以设置为 `null`。
  required: false
  type: string
  default: MQTT Alarm
payload_arm_away:
  description: 在报警面板上设置外出布防模式的负载。
  required: false
  type: string
  default: ARM_AWAY
payload_arm_home:
  description: 在报警面板上设置在家布防模式的负载。
  required: false
  type: string
  default: ARM_HOME
payload_arm_night:
  description: 在报警面板上设置夜间布防模式的负载。
  required: false
  type: string
  default: ARM_NIGHT
payload_arm_vacation:
  description: 在报警面板上设置度假布防模式的负载。
  required: false
  type: string
  default: ARM_VACATION
payload_arm_custom_bypass:
  description: 在报警面板上设置自定义旁路布防模式的负载。
  required: false
  type: string
  default: ARM_CUSTOM_BYPASS
payload_available:
  description: 表示可用状态的负载。
  required: false
  type: string
  default: online
payload_disarm:
  description: 撤防报警面板的负载。
  required: false
  type: string
  default: DISARM
payload_not_available:
  description: 表示不可用状态的负载。
  required: false
  type: string
  default: offline
payload_trigger:
  description: 在报警面板上触发报警的负载。
  required: false
  type: string
  default: TRIGGER
platform:
  description: 必须为 `alarm_control_panel`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload)中允许且必需。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 发布的消息是否应启用保留标志。
  required: false
  type: boolean
  default: false
state_topic:
  description: "订阅以接收状态更新的 MQTT 主题。\"None\" 负载重置为 `unknown` 状态。空负载被忽略。有效的状态负载有：`armed_away`、`armed_custom_bypass`、`armed_home`、`armed_night`、`armed_vacation`、`arming`、`disarmed`、`disarming`、`pending` 和 `triggered`。"
  required: true
  type: string
supported_features:
  description: 报警控制面板支持的功能列表。可用选项有 `arm_home`、`arm_away`、`arm_night`、`arm_vacation`、`arm_custom_bypass` 和 `trigger`。
  required: false
  type: list
  default: ["arm_home", "arm_away", "arm_night", "arm_vacation", "arm_custom_bypass", "trigger"]
unique_id:
   description: 唯一标识此报警面板的 ID。如果两个报警面板具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时必需。
   required: false
   type: string
value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)来提取值。"
  required: false
  type: template
```

## 示例

在本节中，您将找到一些如何使用此报警控制面板的实际示例。

### 部分功能支持的配置

下面的示例显示了一个完整配置，其中报警面板仅支持 `arm_home` 和 `arm_away` 功能。


```yaml
# 部分功能支持示例
mqtt:
  - alarm_control_panel:
      name: "报警面板"
      supported_features:
        - arm_home
        - arm_away
      state_topic: "alarmdecoder/panel"
      command_topic: "alarmdecoder/panel/set"
```


### 本地密码验证配置

下面的示例显示了带有本地密码验证的完整配置。


```yaml
# 使用带本地验证的文本密码示例 configuration.yaml
mqtt:
  - alarm_control_panel:
      name: "带数字键盘的报警面板"
      state_topic: "alarmdecoder/panel"
      value_template: "{{value_json.state}}"
      command_topic: "alarmdecoder/panel/set"
      code: mys3cretc0de
```


### 远程密码验证配置

下面的示例显示了带有远程密码验证和 `command_template` 的完整配置。


```yaml
# 使用带远程验证的文本密码示例 configuration.yaml
mqtt:
  - alarm_control_panel:
      name: "带文本密码对话框的报警面板"
      state_topic: "alarmdecoder/panel"
      value_template: "{{ value_json.state }}"
      command_topic: "alarmdecoder/panel/set"
      code: REMOTE_CODE_TEXT
      command_template: >
        { "action": "{{ action }}", "code": "{{ code }}" }
```

```yaml
# 使用带远程验证的数字密码示例 configuration.yaml
mqtt:
  - alarm_control_panel:
      name: "带数字键盘的报警面板"
      state_topic: "alarmdecoder/panel"
      value_template: "{{ value_json.state }}"
      command_topic: "alarmdecoder/panel/set"
      code: REMOTE_CODE
      command_template: >
        { "action": "{{ action }}", "code": "{{ code }}" }
```


:::caution
当您的 MQTT 连接不安全时，这将通过网络不受保护地发送您的密码！

:::
