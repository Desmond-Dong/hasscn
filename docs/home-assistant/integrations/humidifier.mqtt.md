---
title: "MQTT Humidifier"
description: 'MQTT 加湿器 集成可让您控制支持 MQTT 的加湿器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Humidifier
ha_release: 2021.8
ha_iot_class: Configurable
ha_domain: mqtt
---
# MQTT Humidifier

**MQTT 加湿器** 集成可让您控制支持 MQTT 的加湿器。

## 配置

在理想情况下，MQTT 设备将有一个 `state_topic` 来发布状态更改。如果这些消息使用 `RETAIN` 标志发布，则 MQTT 加湿器将在订阅后收到即时状态更新，并以正确的状态启动。否则，加湿器的初始状态将为`unknown`。 MQTT 设备可以使用 `None` 有效负载将当前状态重置为 `unknown`。

当 `state_topic` 不可用时，加湿器将以乐观模式工作。在此模式下，加湿器将在每次命令后立即改变状态。否则，加湿器将等待设备的状态确认（来自 `state_topic` 的消息）。乐观模式下初始状态设置为 `False` / `off`。

即使 `state_topic` 可用，也可以强制使用乐观模式。如果加湿器操作不正确，请尝试启用它。

要在安装中使用 MQTT 加湿器，请将以下内容添加到“`configuration.yaml`”文件中。
:::tip
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - humidifier:
      command_topic: "bedroom_humidifier/on/set"
      target_humidity_command_topic: "bedroom_humidifier/humidity/set"
```

或者，更高级的方法是通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

```yaml
action_template:
  description: 用于呈现 `action_topic` 上接收到的值的模板。
  required: false
  type: template
action_topic:
  description: >-
    用于订阅当前操作更改的 MQTT 主题。
    有效值：`off`、`humidifying`、`drying`、`idle`
  required: false
  type: string
availability:
  description: 订阅接收可用性（在线/离线）更新的 MQTT 主题列表。不得与`availability_topic`一起使用。
  required: false
  type: list
  keys:
    payload_available:
      description: 表示可用状态的有效负载。
      required: false
      type: string
      default: online
    payload_not_available:
      description: 表示不可用状态的负载。
      required: false
      type: string
      default: offline
    topic:
      description: 订阅 MQTT 主题以接收可用性（在线/离线）更新。
      required: true
      type: string
    value_template:
      description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `topic` 中提取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
      required: false
      type: template
availability_mode:
  description: 配置 `availability` 时，它控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，则在将实体标记为在线之前，必须在所有配置的可用性主题上接收 `payload_available`。如果设置为 `any`，则在将实体标记为在线之前，必须至少在一个已配置的可用性主题上接收 `payload_available`。如果设置为 `latest`，则在任何配置的可用性主题上收到的最后一个 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `availability_topic` 中提取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
  required: false
  type: template
availability_topic:
  description: 订阅 MQTT 主题以接收可用性（在线/离线）更新。不得与`availability`一起使用。
  required: false
  type: string
current_humidity_template:
  description: 将呈现在 `current_humidity_topic` 上接收到的值的模板。
  required: false
  type: template
current_humidity_topic:
  description: 用于侦听当前湿度的 MQTT 主题。收到的 `"None"` 值将重置当前湿度。空值 (`'''`) 将被忽略。
  required: false
  type: string
command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `command_topic` 的有效负载。
  required: false
  type: template
command_topic:
  description: 用于发布命令以更改加湿器状态的 MQTT 主题。
  required: true
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 代替名称来自动生成实体 ID。例如，`humidifier.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，实体 ID 将在重新启动或重新加载期间更新。  如果实体 ID 已存在，则将创建实体 ID，并在末尾添加数字。与 `unique_id` 一起使用时，仅在首次添加实体时使用 `default_entity_id`。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关该加湿器的设备的信息是将其绑定到 [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html) 的一部分。仅在设置 [`unique_id`](#unique_id) 时才有效。必须至少存在一个标识符或连接才能识别该设备。"
  required: false
  type: map
  keys:
    configuration_url:
      description: '可管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
      required: false
      type: string
    connections:
      description: '设备与外界的连接列表，作为元组列表 `[connection_type, connection_identifier]`。例如网络接口的 MAC 地址：`"connections": [["mac", "02:5b:26:a8:dc:12"]]`。'
      required: false
      type: list
    hw_version:
      description: 设备的硬件版本。
      required: false
      type: string
    identifiers:
      description: 唯一标识设备的 ID 列表。例如序列号。
      required: false
      type: [string, list]
    manufacturer:
      description: 设备的制造商。
      required: false
      type: string
    model:
      description: 设备的型号。
      required: false
      type: string
    model_id:
      description: 设备的型号标识符。
      required: false
      type: string
    name:
      description: 设备的名称。
      required: false
      type: string
    serial_number:
      description: "设备的序列号。"
      required: false
      type: string
    suggested_area:
      description: "如果设备尚未位于某个区域，请建议一个区域。"
      required: false
      type: string
    sw_version:
      description: 设备的固件版本。
      required: false
      type: string
    via_device:
      description: '在该设备和 Home Assistant 之间路由消息的设备的标识符。此类设备的示例是集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
device_class:
  description: MQTT 设备的 [device class](/home-assistant/integrations/humidifier/#device-class)。必须是 `humidifier`、`dehumidifier` 或 `null`。
  required: false
  type: string
  default: humidifier
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收和发布消息的有效负载的编码。设置为 `""` 以禁用传入有效负载的解码。
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: 实体的 [category](https://developers.home-assistant.io/docs/core/entity#generic-properties)。
  required: false
  type: string
entity_picture:
  description: "该实体的图片 URL。"
  required: false
  type: string
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon) 为实体。"
  required: false
  type: icon
json_attributes_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `json_attributes_topic` 收到的消息中提取 JSON 字典。使用示例可以在 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) 文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅 MQTT 主题以接收 JSON 字典有效负载，然后设置为传感器属性。使用示例可以在 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) 文档中找到。
  required: false
  type: string
max_humidity:
  description: 可设置的最小目标湿度百分比。
  required: false
  type: float
  default: 100
min_humidity:
  description: 可设置的最大目标湿度百分比。
  required: false
  type: float
  default: 0
name:
  description: 加湿器的名称。如果仅设备名称相关，则可以设置为 `null`。
  required: false
  type: string
  default: MQTT humidifier
optimistic:
  description: 定义加湿器是否在乐观模式下工作的标志
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
payload_available:
  description: 表示可用状态的有效负载。
  required: false
  type: string
  default: online
payload_not_available:
  description: 表示不可用状态的负载。
  required: false
  type: string
  default: offline
payload_off:
  description: 表示停止状态的有效负载。
  required: false
  type: string
  default: "OFF"
payload_on:
  description: 代表运行状态的负载。
  required: false
  type: string
  default: "ON"
payload_reset_humidity:
  description: 当在 `target_humidity_state_topic` 接收时，将 `target_humidity` 状态属性重置为 `unknown` 状态的特殊有效负载。当 `current_humidity_topic` 收到时，它将重置当前湿度状态。
  required: false
  type: string
  default: '"None"'
payload_reset_mode:
  description: 当在 `mode_state_topic` 接收时，将 `mode` 状态属性重置为 `unknown` 状态的特殊有效负载。
  required: false
  type: string
  default: '"None"'
target_humidity_command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `target_humidity_command_topic` 的有效负载。
  required: false
  type: template
target_humidity_command_topic:
  description: MQTT 主题发布命令以根据百分比更改加湿器目标湿度状态。
  required: true
  type: string
target_humidity_state_topic:
  description: 订阅 MQTT 主题以接收加湿器目标湿度。
  required: false
  type: string
target_humidity_state_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以提取加湿器 `target_humidity` 状态的值。
  required: false
  type: template
mode_command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `mode_command_topic` 的有效负载。
  required: false
  type: template
mode_command_topic:
  description: MQTT 主题发布命令以更改加湿器上的 `mode`。该属性必须与`modes`属性一起配置。
  required: false
  type: string
mode_state_topic:
  description: 订阅MQTT主题接收加湿器`mode`。
  required: false
  type: string
mode_state_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以提取加湿器 `mode` 状态的值。
  required: false
  type: template
modes:
  description: 该加湿器能够运行的可用模式列表。常见示例包括 `normal`、`eco`、`away`、`boost`、`comfort`、`home`、`sleep`、`auto` 和 `baby`。这些示例提供内置翻译，但也允许其他自定义模式。  该属性必须与`mode_command_topic`属性一起配置。
  required: false
  type: [list]
  default: []
platform:
  description: 必须是 `humidifier`。仅在 [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload) 中允许且要求。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 发布的消息是否应该有保留标志。
  required: false
  type: boolean
  default: true
state_topic:
  description: 订阅 MQTT 主题以接收状态更新。 “无”有效负载重置为 `unknown` 状态。空的有效负载将被忽略。有效状态有效负载为 `OFF` 和 `ON`。可以使用 `payload_off` 和 `payload_on` 配置选项设置自定义 `OFF` 和 `ON` 值。
  required: false
  type: string
state_value_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从状态中提取值。"
  required: false
  type: template
unique_id:
  description: 唯一标识该加湿器的 ID。如果两个加湿器具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时需要。
  required: false
  type: string
```

:::important
确保您的主题完全匹配。 `some-topic/` 和 `some-topic` 是不同的主题。

:::
## 示例

在本节中，您将找到一些如何使用该加湿器的现实示例。

### 配置齐全

下面的示例显示了 MQTT 加湿器的完整配置（包括模式）。


```yaml
# Example configuration.yaml
mqtt:
  - humidifier:
      name: "Bedroom humidifier"
      device_class: "humidifier"
      state_topic: "bedroom_humidifier/on/state"
      action_topic: "bedroom_humidifier/action"
      command_topic: "bedroom_humidifier/on/set"
      current_humidity_topic: "bedroom_humidifier/humidity/current"
      target_humidity_command_topic: "bedroom_humidifier/humidity/set"
      target_humidity_state_topic: "bedroom_humidifier/humidity/state"
      mode_state_topic: "bedroom_humidifier/mode/state"
      mode_command_topic: "bedroom_humidifier/preset/preset_mode"
      modes:
        - "normal"
        - "eco"
        - "away"
        - "boost"
        - "comfort"
        - "home"
        - "sleep"
        - "auto"
        - "baby"
      qos: 0
      payload_on: "true"
      payload_off: "false"
      min_humidity: 30
      max_humidity: 80
```


