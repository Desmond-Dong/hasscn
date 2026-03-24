---
title: "MQTT Event"
description: "关于将 MQTT 事件集成到 Home Assistant 的说明。"
ha_category:
  - Event
ha_release: 2023.8
ha_iot_class: Configurable
ha_domain: mqtt
---

**MQTT Event** 集成允许您处理来自 MQTT 消息的事件信息。事件是在发生某些事情时发出的信号，例如，当用户按下门铃等物理按钮或按下遥控器上的按钮时。事件可以发送一些事件属性作为实体的属性。MQTT 事件是无状态的。例如，门铃没有像"开"或"关"这样的状态，而是被瞬间按下。

## 配置

要在您的系统中使用 MQTT 事件实体，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - event:
      state_topic: "home/doorbell/state"
      event_types:
        - press
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

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
  description: 当配置 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，必须在所有配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `any`，必须至少在一个配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `latest`，最后在任何配置的可用性主题上收到的 `payload_available` 或 `payload_not_available` 控制可用性。
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
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如 `event.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则会在重启或重新加载期间更新。如果实体 ID 已存在，将在末尾创建带数字的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此事件所属设备的信息，以便将其绑定到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置 [`unique_id`](#unique_id) 时有效。至少需要 identifiers 或 connections 中的一个来识别设备。"
  required: false
  type: map
  keys:
    configuration_url:
      description: '可以管理此设备配置的网页链接。可以是 HTTP 或 HTTPS 链接。'
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
      description: '在此设备与 Home Assistant 之间路由消息的设备的标识符。此类设备的示例包括集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
device_class:
  description: 事件的[类型/类别](/home-assistant/integrations/event/#device-class)，用于在前端设置图标。`device_class` 可以是 `null`。
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
event_types:
  description: 有效 `event_type` 字符串的列表。
  required: true
  type: list
icon:
  description: "实体的[图标](/home-assistant/docs/configuration/customizing-devices/#icon)。"
  required: false
  type: icon
json_attributes_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。用法示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) 文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典负载并设置为传感器属性的 MQTT 主题。用法示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) 文档中找到。
  required: false
  type: string
name:
  description: 显示此事件时使用的名称。
  required: false
  type: string
  default: MQTT Event
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
platform:
  description: 必须为 `event`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload) 中允许且必需。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
state_topic:
  description: 订阅以接收 JSON 事件负载的 MQTT 主题。JSON 负载应包含 `event_type` 元素。事件类型应为配置的 `event_types` 之一。请注意，重播的保留消息将被丢弃。
  required: true
  type: string
unique_id:
  description: 唯一标识此事件实体的 ID。如果两个事件具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时必需。
  required: false
  type: string
value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)来提取值并将其渲染为有效的 JSON 事件负载。如果模板抛出错误，将使用当前状态。"
  required: false
  type: template
```

:::important
确保您的主题完全匹配。`some-topic/` 和 `some-topic` 是不同的主题。

:::
### 使用 JSON 数据的完整配置

下面的示例显示了事件 MQTT 实体的完整配置。

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - event:
      state_topic: "home/doorbell/state"
      event_types:
        - "press"
        - "hold"
      availability:
        - topic: "home/doorbell/available"
      qos: 0
      device_class: "doorbell"
```

事件信息从 JSON 格式的 MQTT 消息中提取。
要测试，您可以使用 `mosquitto` 附带的命令行工具 `mosquitto_pub` 或 `mosquitto-clients` 包发送 MQTT 消息。

要手动触发 `mqtt` 事件实体：

```bash
mosquitto_pub -h 127.0.0.1 -t home/doorbell/available -m "online"
mosquitto_pub -h 127.0.0.1 -t home/doorbell/state -m '{"event_type": "hold"}'
```

除了必需的 `event_type` 元素外，负载还可以包含额外的事件属性。
这些额外的属性更新将作为 `mqtt` 事件实体的属性暴露出来。

下面的示例演示如何将事件属性添加到事件数据中。

```bash
mosquitto_pub -h 127.0.0.1 -t home/doorbell/state -m '{"event_type": "press", "duration": 0.1}'
```

### 示例：使用值模板处理事件数据

在许多情况下，需要转换现有的已发布负载。
下面的示例配置将设备 `Button1` 的负载 `{"Button1": {"Action": "SINGLE"}}` 转换为事件类型 `single` 的所需格式。
额外的属性 `button` 将设置为 `Button1` 并添加到实体，但仅当设置了 `Action` 属性时。空字典将被忽略。


```yaml
mqtt:
  - event:
      name: "Desk button"
      state_topic: "desk/button/state"
      event_types:
        - single
        - double
      device_class: "button"
      value_template: |
        { {% for key in value_json %}
        {% if value_json[key].get("Action") %}
        "button": "{{ key }}",
        "event_type": "{{ value_json[key].Action | lower }}"
        {% endif %}
        {% endfor %} }
```

