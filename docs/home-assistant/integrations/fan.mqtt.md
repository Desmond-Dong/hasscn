---
title: "MQTT Fan"
description: "关于如何将 MQTT 风扇集成到 Home Assistant 的说明。"
ha_category:
  - Fan
ha_release: 0.27
ha_iot_class: Configurable
ha_domain: mqtt
---

**MQTT Fan** 集成可让您控制支持 MQTT 的风扇。

## 配置

理想情况下，MQTT 设备应提供一个 `state_topic` 用于发布状态变化。如果这些消息使用 `RETAIN` 标志发布，那么 MQTT 风扇在订阅后会立即收到状态更新，并以正确状态启动。否则，风扇的初始状态将为 `unknown`。MQTT 设备也可以通过发送 `None` 负载将当前状态重置为 `unknown`。

当没有 `state_topic` 可用时，风扇将以乐观模式工作。在该模式下，风扇会在每次命令发送后立即改变状态。否则，风扇会等待来自设备的状态确认（即来自 `state_topic` 的消息）。在乐观模式下，初始状态会设为 `False` / `off`。

即使提供了 `state_topic`，也可以强制启用乐观模式。如果您发现风扇运行不正确，可以尝试开启此模式。

要在您的安装中使用 MQTT 风扇，请[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - fan:
      command_topic: "bedroom_fan/on/set"
```

或者，也可以通过更高级的 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 来进行设置。

```yaml
availability:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题列表。不能与 `availability_topic` 同时使用。
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
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `topic` 中提取设备的可用性。该模板的结果会与 `payload_available` 和 `payload_not_available` 进行比较，以确定设备的可用性。"
      required: false
      type: template
availability_mode:
  description: 配置 `availability` 时，此项控制将实体设为 `available` 所需的条件。有效值为 `all`、`any` 和 `latest`。若设为 `all`，必须在所有已配置的可用性主题上都收到 `payload_available` 后，实体才会被标记为在线。若设为 `any`，则只需在至少一个已配置的可用性主题上收到 `payload_available`。若设为 `latest`，则以任一已配置可用性主题上最后收到的 `payload_available` 或 `payload_not_available` 来决定可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `availability_topic` 中提取设备的可用性。该模板的结果会与 `payload_available` 和 `payload_not_available` 进行比较，以确定设备的可用性。"
  required: false
  type: template
availability_topic:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。不能与 `availability` 同时使用。
  required: false
  type: string
command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，用于生成发送到 `command_topic` 的负载。
  required: false
  type: template
command_topic:
  description: 用于发布命令以改变风扇状态的 MQTT 主题。
  required: true
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如 `fan.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则会在重启或重新加载时更新。如果实体 ID 已存在，则会在末尾附加数字创建新的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在实体首次添加时使用。设置后，如果实体被删除并重新添加，它会覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此风扇所属设备的信息，以便将其绑定到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置了 [`unique_id`](#unique_id) 时有效。必须至少提供 identifiers 或 connections 之一来识别设备。"
  required: false
  type: map
  keys:
    configuration_url:
      description: '可用于管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
      required: false
      type: string
    connections:
      description: '设备与外部世界的连接列表，格式为元组列表 `[connection_type, connection_identifier]`。例如网络接口的 MAC 地址：`"connections": [["mac", "02:5b:26:a8:dc:12"]]`。'
      required: false
      type: list
    hw_version:
      description: 设备的硬件版本。
      required: false
      type: string
    identifiers:
      description: 唯一标识设备的 ID 列表，例如序列号。
      required: false
      type: [string, list]
    manufacturer:
      description: 设备制造商。
      required: false
      type: string
    model:
      description: 设备型号。
      required: false
      type: string
    model_id:
      description: 设备型号标识符。
      required: false
      type: string
    name:
      description: 设备名称。
      required: false
      type: string
    serial_number:
      description: "设备序列号。"
      required: false
      type: string
    suggested_area:
      description: '如果设备尚未分配到区域，可建议一个区域。'
      required: false
      type: string
    sw_version:
      description: 设备固件版本。
      required: false
      type: string
    via_device:
      description: '在该设备与 Home Assistant 之间路由消息的设备标识符。例如集线器或子设备的父设备。此项用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
enabled_by_default:
  description: 定义实体首次添加时是否应默认启用的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收和发布消息负载的编码。设为 `""` 可禁用对传入负载的解码。
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
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `json_attributes_topic` 收到的消息中提取 JSON 字典。使用示例可在 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) 文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典负载并将其设为传感器属性的 MQTT 主题。使用示例可在 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) 文档中找到。
  required: false
  type: string
name:
  description: 风扇名称。如果仅设备名称有意义，可设为 `null`。
  required: false
  type: string
  default: MQTT Fan
optimistic:
  description: 定义风扇是否以乐观模式工作的标志。
  required: false
  type: boolean
  default: "若未定义 state topic 则为 `true`，否则为 `false`。"
direction_command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，用于生成发送到 `direction_command_topic` 的负载。
  required: false
  type: template
direction_command_topic:
  description: 用于发布命令以改变方向状态的 MQTT 主题。
  required: false
  type: string
direction_state_topic:
  description: 订阅以接收方向状态更新的 MQTT 主题。
  required: false
  type: string
direction_value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从方向值中提取内容。"
  required: false
  type: template
oscillation_command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，用于生成发送到 `oscillation_command_topic` 的负载。
  required: false
  type: template
oscillation_command_topic:
  description: 用于发布命令以改变摆动状态的 MQTT 主题。
  required: false
  type: string
oscillation_state_topic:
  description: 订阅以接收摆动状态更新的 MQTT 主题。
  required: false
  type: string
oscillation_value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从摆动值中提取内容。"
  required: false
  type: template
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
payload_off:
  description: 表示停止状态的负载。
  required: false
  type: string
  default: "OFF"
payload_on:
  description: 表示运行状态的负载。
  required: false
  type: string
  default: "ON"
payload_oscillation_off:
  description: 表示摆动关闭状态的负载。
  required: false
  type: string
  default: oscillate_off
payload_oscillation_on:
  description: 表示摆动开启状态的负载。
  required: false
  type: string
  default: oscillate_on
payload_reset_percentage:
  description: 当在 `percentage_state_topic` 上收到此特殊负载时，会将 `percentage` 状态属性重置为 `unknown`。
  required: false
  type: string
  default: '"None"'
payload_reset_preset_mode:
  description: 当在 `preset_mode_state_topic` 上收到此特殊负载时，会将 `preset_mode` 状态属性重置为 `unknown`。
  required: false
  type: string
  default: '"None"'
percentage_command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，用于生成发送到 `percentage_command_topic` 的负载。
  required: false
  type: template
percentage_command_topic:
  description: 用于发布命令以根据百分比设置改变风扇速度状态的 MQTT 主题。该值应在 `speed_range_min` 到 `speed_range_max` 范围内。
  required: false
  type: string
percentage_state_topic:
  description: 订阅以接收风扇速度状态的 MQTT 主题。该值位于 `speed_range_min` 到 `speed_range_max` 范围内。
  required: false
  type: string
percentage_value_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `percentage_state_topic` 收到的负载中提取 `percentage` 值。
  required: false
  type: template
platform:
  description: 必须为 `fan`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload) 中允许且必需。
  required: true
  type: string
preset_mode_command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，用于生成发送到 `preset_mode_command_topic` 的负载。
  required: false
  type: template
preset_mode_command_topic:
  description: 用于发布命令以更改预设模式的 MQTT 主题。
  required: false
  type: string
preset_mode_state_topic:
  description: 订阅以接收基于预设的风扇速度状态的 MQTT 主题。
  required: false
  type: string
preset_mode_value_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `preset_mode_state_topic` 收到的负载中提取 `preset_mode` 值。
  required: false
  type: template
preset_modes:
  description: 此风扇支持运行的预设模式列表。常见示例包括 `auto`、`smart`、`whoosh`、`eco` 和 `breeze`。
  required: false
  type: [list]
  default: []
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 发布的消息是否应启用 retain 标志。
  required: false
  type: boolean
  default: true
speed_range_max:
  description: 数值输出范围的最大值（表示 100%）。`percentage_step` 由 `100` / 速度范围内的档位数量决定。
  required: false
  type: integer
  default: 100
speed_range_min:
  description: 数值输出范围的最小值（不包括 `off`，因此 `speed_range_min - 1` 表示 0%）。`percentage_step` 由 `100` / 速度范围内的档位数量决定。
  required: false
  type: integer
  default: 1
state_topic:
  description: 订阅以接收状态更新的 MQTT 主题。`None` 负载会将状态重置为 `unknown`。空负载会被忽略。默认有效状态负载为 `OFF` 和 `ON`。接受的负载可通过 `payload_off` 和 `payload_on` 配置项覆盖。
  required: false
  type: string
state_value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从状态中提取值。"
  required: false
  type: template
unique_id:
  description: 唯一标识此风扇的 ID。如果两个风扇具有相同的唯一 ID，Home Assistant 会抛出异常。与基于设备的发现一起使用时为必需。
  required: false
  type: string
```

:::important
请确保您的主题完全匹配。`some-topic/` 和 `some-topic` 是不同的主题。


:::
## 示例

本节展示一些此风扇的实际使用示例。

### 完整配置

下面的示例展示了一个同时使用百分比速度和预设模式的 MQTT 风扇完整配置。
速度范围内有 10 个档位，因此 `percentage_step` = 100 / 10 = 10.0%。

```yaml
# Example using percentage based speeds with preset modes configuration.yaml
mqtt:
  - fan:
      name: "Bedroom Fan"
      state_topic: "bedroom_fan/on/state"
      command_topic: "bedroom_fan/on/set"
      direction_state_topic: "bedroom_fan/direction/state"
      direction_command_topic: "bedroom_fan/direction/set"
      oscillation_state_topic: "bedroom_fan/oscillation/state"
      oscillation_command_topic: "bedroom_fan/oscillation/set"
      percentage_state_topic: "bedroom_fan/speed/percentage_state"
      percentage_command_topic: "bedroom_fan/speed/percentage"
      preset_mode_state_topic: "bedroom_fan/preset/preset_mode_state"
      preset_mode_command_topic: "bedroom_fan/preset/preset_mode"
      preset_modes:
        -  "auto"
        -  "smart"
        -  "whoosh"
        -  "eco"
        -  "breeze"
      qos: 0
      payload_on: "true"
      payload_off: "false"
      payload_oscillation_on: "true"
      payload_oscillation_off: "false"
      speed_range_min: 1
      speed_range_max: 10
```

### 使用命令模板的配置

此示例演示如何使用带有 JSON 输出的命令模板。


```yaml
# Example configuration.yaml with command templates
mqtt:
  - fan:
      name: "Bedroom Fan"
      command_topic: "bedroom_fan/on/set"
      command_template: "{ state: '{{ value }}'}"
      direction_command_template: "{{ iif(value == 'forward', 'fwd', 'rev') }}"
      direction_value_template: "{{ iif(value == 'fwd', 'forward', 'reverse') }}"
      oscillation_command_topic: "bedroom_fan/oscillation/set"
      oscillation_command_template: "{ oscillation: '{{ value }}'}"
      percentage_command_topic: "bedroom_fan/speed/percentage"
      percentage_command_template: "{ percentage: '{{ value }}'}"
      preset_mode_command_topic: "bedroom_fan/preset/preset_mode"
      preset_mode_command_template: "{ preset_mode: '{{ value }}'}"
      preset_modes:
        -  "auto"
        -  "smart"
        -  "whoosh"
        -  "eco"
        -  "breeze"
```


下面的示例展示了如何配置一个不使用 `forward` 和 `backward` 作为方向值的风扇。


```yaml
# Example configuration.yaml with direction templates
mqtt:
  - fan:
      name: "Bedroom Fan"
      direction_command_template: "{{ iif(value == 'forward', 'fwd', 'rev') }}"
      direction_value_template: "{{ iif(value == 'fwd', 'forward', 'reverse') }}"
```


