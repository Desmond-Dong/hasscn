# MQTT button

**MQTT 按钮**集成允许您在前端按下按钮或调用按钮按下操作时发送 MQTT 消息。这可用于公开远程设备的某些服务，例如重启。

要在您的安装中使用 MQTT 按钮，请[添加 MQTT 设备作为子条目](/home-assistant/integrations/mqtt/index.md#configuration)，或将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

## 配置

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - button:
      command_topic: "home/bedroom/switch1/reboot"
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/index.md#mqtt-discovery)进行设置。

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
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `topic` 中提取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
      required: false
      type: template
availability_mode:
  description: 当配置了 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，则必须在所有配置的可用性主题上收到 `payload_available` 后，实体才会标记为在线。如果设置为 `any`，则必须至少在一个配置的可用性主题上收到 `payload_available` 后，实体才会标记为在线。如果设置为 `latest`，则在任何配置的可用性主题上最后收到的 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `availability_topic` 中提取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
  required: false
  type: template
availability_topic:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。不能与 `availability` 一起使用。
  required: false
  type: string
command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)以生成发送到 `command_topic` 的负载。
  required: false
  type: template
command_topic:
  description: 发布命令以触发按钮的 MQTT 主题。
  required: true
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如 `button.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则在重启或重新加载期间实体 ID 将更新。如果实体 ID 已存在，则将在末尾创建带有数字的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此按钮所属设备的信息，以将其绑定到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置了 [`unique_id`](#unique_id) 时有效。至少必须存在标识符或连接之一来标识设备。"
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
      description: '如果设备尚未在区域中，建议一个区域。'
      required: false
      type: string
    sw_version:
      description: 设备的固件版本。
      required: false
      type: string
    via_device:
      description: '在此设备与 Home Assistant 之间路由消息的设备的标识符。此类设备的示例是集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
device_class:
  description: 按钮的[类型/类别](/home-assistant/integrations/button/#device-class)，用于在前端设置图标。`device_class` 可以是 `null`。
  required: false
  type: device_class
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 已发布消息的编码。
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
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration)文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典负载然后设置为传感器属性的 MQTT 主题。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration)文档中找到。
  required: false
  type: string
name:
  description: 显示此按钮时使用的名称。如果只有设备名称相关，可以设置为 `null`。
  required: false
  type: string
  default: MQTT Button
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
payload_press:
  description: 发送以触发按钮的负载。
  required: false
  type: string
  default: "PRESS"
platform:
  description: 必须为 `button`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload)中允许且需要。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 已发布的消息是否应启用保留标志。
  required: false
  type: boolean
  default: false
unique_id:
  description: 唯一标识此按钮实体的 ID。如果两个按钮具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时需要。
  required: false
  type: string
```

:::important
确保您的主题完全匹配。`some-topic/` 和 `some-topic` 是不同的主题。

:::

## 示例

在本节中，您将找到一些如何使用此功能的实际示例。

### 完整配置

下面的示例显示了按钮的完整配置。

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - button:
      unique_id: bedroom_switch_reboot_btn
      name: "重启卧室开关"
      command_topic: "home/bedroom/switch1/commands"
      payload_press: "restart"
      availability:
        - topic: "home/bedroom/switch1/available"
      qos: 0
      retain: false
      entity_category: "config"
      device_class: "restart"
```
