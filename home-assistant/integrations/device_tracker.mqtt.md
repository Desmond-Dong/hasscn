# MQTT device tracker

**MQTT device tracker** 集成允许您通过在 "`configuration.yaml`" 中[手动 YAML 配置](#yaml-configuration)定义新的 device\_tracker，也可以[使用 MQTT 发现协议](#using-the-discovery-protocol)自动发现 device\_tracker。

## 配置

要在您的系统中使用 MQTT 设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - device_tracker:
      name: "annetherese_n4"
      state_topic: "location/annetherese"
  - device_tracker:
      name: "paulus_oneplus"
      state_topic: "location/paulus"
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/index.md#mqtt-discovery) 进行设置。

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
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `topic` 提取设备的可用性。此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较以确定设备的可用性。"
      required: false
      type: template
availability_mode:
  description: 当配置了 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，则必须在所有配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `any`，则必须至少在一个配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `latest`，则最后在任何配置的可用性主题上收到的 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `availability_topic` 提取设备的可用性。此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较以确定设备的可用性。"
  required: false
  type: template
availability_topic:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。不能与 `availability` 一起使用。
  required: false
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如 `device_tracker.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则实体 ID 将在重启或重新加载期间更新。如果实体 ID 已存在，则将创建带有数字后缀的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此设备跟踪器所属设备的信息，以将其关联到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。必须至少存在 identifiers 或 connections 之一来识别设备。"
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
      description: 唯一标识设备的 ID 列表。例如序列号。
      required: false
      type: [list, string]
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
    suggested_area:
      description: '如果设备尚未在区域中，建议一个区域。'
      required: false
      type: string
    sw_version:
      description: 设备的固件版本。
      required: false
      type: string
    via_device:
      description: '在此设备与 Home Assistant 之间路由消息的设备的标识符。此类设备的示例包括集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
icon:
  description: "实体的[图标](/home-assistant/docs/configuration/customizing-devices/#icon)。"
  required: false
  type: icon
json_attributes_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration)文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: "订阅以接收包含设备跟踪器属性的 JSON 字典消息的 MQTT 主题。
  此主题可用于在以下条件下设置设备跟踪器的位置：

- 如果 JSON 消息中的属性包含 `longitude`、`latitude` 和 `gps_accuracy`（可选）。\n
- 如果设备跟踪器在配置的[区域](/home-assistant/integrations/zone/)内。\n

  如果满足这些条件，则不需要配置 `state_topic`。\n\n
  请注意，在 `state_topic` 收到的任何位置消息都会覆盖通过 `json_attributes_topic` 收到的位置，直到在 `state_topic` 收到配置了 `payload_reset` 的消息。有关 `json_attributes_topic` 的更通用使用示例，请参阅 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration)文档。"
  required: false
  type: string
name:
  description: MQTT device_tracker 的名称。
  required: false
  type: string
payload_available:
  description: 表示可用状态的负载。
  required: false
  type: string
  default: online
payload_home:
  description: 表示设备"在家"状态的负载值。
  required: false
  type: string
  default: home
payload_not_available:
  description: 表示不可用状态的负载。
  required: false
  type: string
  default: offline
payload_not_home:
  description: 表示设备"不在家"状态的负载值。
  required: false
  type: string
  default: not_home
payload_reset:
  description: 将自动从 Home Assistant 的区域派生设备位置的负载值。
  required: false
  type: string
  default: '"None"'
platform:
  description: 必须为 `device_tracker`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload)中允许且必需。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
source_type:
  description: 设备跟踪器的属性，用于跟踪[人员](/home-assistant/integrations/person/)时影响状态。有效选项为 `gps`、`router`、`bluetooth` 或 `bluetooth_le`。
  required: false
  type: string
state_topic:
  description: 订阅以接收设备跟踪器状态更改的 MQTT 主题。`state_topic` 中定义的状态覆盖 `json_attributes_topic` 定义的位置状态。如果在 `state_topic` 收到包含 `payload_reset` 的消息，则此状态覆盖将变为非活动状态。只有在使用 `json_attributes_topic` 时才能省略 `state_topic`。空负载被忽略。有效负载为 `not_home`、`home` 或任何其他自定义位置或区域名称。`not_home`、`home` 的负载可以用 `payload_not_home` 和 `payload_home` 配置选项覆盖。
  required: false
  type: string
unique_id:
  description: "唯一标识此 device_tracker 的 ID。如果两个 device_tracker 具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时是必需的。"
  required: false
  type: string
value_template:
  description: "定义一个返回设备跟踪器状态的[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)。"
  required: false
  type: template
```

## 示例

### 使用发现协议

可以通过发布到遵循以下 [MQTT 发现](/home-assistant/integrations/mqtt/index.md#mqtt-discovery) 主题名称格式的发现主题来创建 device\_tracker：`<discovery_prefix>/device_tracker/[<node_id>/]<object_id>/config`。

您可以使用 `mosquitto` 附带的或 `mosquitto-clients` 包中的命令行工具 `mosquitto_pub` 发送 MQTT 消息。

创建 device\_tracker：

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/config -m '{"state_topic": "homeassistant/device_tracker/a4567d663eaf/state", "name": "My Tracker", "payload_home": "home", "payload_not_home": "not_home"}'
```

将设备跟踪器状态设置为"在家"：

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/state -m 'home'
```

将设备跟踪器状态设置为命名位置：

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/state -m 'location_name'
```

如果设备支持 GPS 坐标，则可以通过在配置负载中指定属性主题（即"json\_attributes\_topic"）将其发送到 Home Assistant：

* 属性主题：`homeassistant/device_tracker/a4567d663eaf/attributes`
* 示例属性负载：

在主题 `homeassistant/device_tracker/a4567d663eaf/attributes` 收到的示例消息：

```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
 }
```

创建支持 GPS 坐标的 device\_tracker：

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/config -m '{"json_attributes_topic": "homeassistant/device_tracker/a4567d663eaf/attributes", "name": "My Tracker"}'
```

:::note
使用 `json_attributes_topic` 确定设备跟踪器状态时，使用 `state_topic` 是可选的。

:::
将设备跟踪器状态设置为特定坐标：

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/attributes -m '{"latitude": 32.87336, "longitude": -117.22743, "gps_accuracy": 1.2}'
```

### YAML 配置

以下示例展示如何通过 configuration.yaml 配置相同的设备跟踪器

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - device_tracker:
      name: "My Tracker"
      state_topic: "a4567d663eaf/state"
      payload_home: "home"
      payload_not_home: "not_home"
```
