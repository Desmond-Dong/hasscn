---
title: "MQTT lawn mower"
description: 'MQTT 割草机 集成允许通过 MQTT 控制割草机。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Lawn mower
ha_release: 2023.9
ha_iot_class: Configurable
ha_domain: mqtt
---
# MQTT lawn mower

**MQTT 割草机** 集成允许通过 MQTT 控制割草机。

## 配置

要在安装中使用 MQTT 割草机，请将以下内容添加到“`configuration.yaml`”文件中。
:::tip
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - lawn_mower:
      command_topic: topic
      name: "Test Lawn Mower"
```

或者，更高级的方法是通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

```yaml
activity_state_topic:
  description: 订阅 MQTT 主题以接收活动更新。有效活动为 `mowing`、`paused`、`docked` 和 `error`。使用 `value_template` 从自定义负载中提取活动状态。当接收到有效负载 `none` 时，活动状态将重置为 `unknown`。
  required: false
  type: string
activity_value_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 来提取值。"
  required: false
  type: template
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
      description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `topic` 中提取设备的可用性。为了确定设备的可用性，该模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
      required: false
      type: template
availability_topic:
  description: 订阅 MQTT 主题以接收可用性（在线/离线）更新。不得与`availability`一起使用。
  required: false
  type: string
availability_mode:
   description: 配置 `availability` 时，它控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，则在将实体标记为在线之前，必须在所有配置的可用性主题上接收 `payload_available`。如果设置为 `any`，则在将实体标记为在线之前，必须至少在一个已配置的可用性主题上接收 `payload_available`。如果设置为 `latest`，则在任何配置的可用性主题上收到的最后一个 `payload_available` 或 `payload_not_available` 控制可用性。
   required: false
   type: string
   default: latest
availability_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `availability_topic` 中提取设备的可用性。为了确定设备的可用性，该模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
  required: false
  type: template
default_entity_id:
  description: 使用 `default_entity_id` 代替名称来自动生成实体 ID。例如，`lawn_mower.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，实体 ID 将在重新启动或重新加载期间更新。  如果实体 ID 已存在，则将创建实体 ID，并在末尾添加数字。与 `unique_id` 一起使用时，仅在首次添加实体时使用 `default_entity_id`。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关该割草机的设备的信息是将其绑定到 [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html) 的一部分。仅在设置 [`unique_id`](#unique_id) 时才有效。必须至少存在一个标识符或连接才能识别该设备。"
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
      description: '唯一标识设备的 ID 列表。例如，序列号。'
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
dock_command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `dock_command_topic` 的有效负载。模板中的 `value` 参数将设置为 `dock`。
  required: false
  type: template
dock_command_topic:
  description: 执行 `lawn_mower.dock` 操作时发布命令的 MQTT 主题。使用该操作时会发布值 `dock`。使用 `dock_command_template` 发布自定义格式。
  required: false
  type: string
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
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅的 MQTT 主题接收 JSON 字典负载，然后设置为实体属性。当收到有关此主题的消息时，表示当前活动状态的 `force_update`。
  required: false
  type: string
name:
  description: 割草机的名称。如果仅设备名称相关，则可以设置为 `null`。
  required: false
  type: string
optimistic:
  description: 定义割草机是否在乐观模式下工作的标志。
  required: false
  type: boolean
  default: "`true` if no `activity_state_topic` defined, else `false`."
pause_command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `pause_command_topic` 的有效负载。模板中的 `value` 参数将设置为 `pause`。
  required: false
  type: template
pause_command_topic:
  description: 执行 `lawn_mower.pause` 操作时发布命令的 MQTT 主题。使用该操作时会发布值 `pause`。使用 `pause_command_template` 发布自定义格式。
  required: false
  type: string
platform:
  description: 必须是 `lawn_mower`。仅在 [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload) 中允许且要求。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
start_mowing_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `start_mowing_command_topic` 的有效负载。模板中的 `value` 参数将设置为 `start_mowing`。
  required: false
  type: template
start_mowing_command_topic:
  description: 执行 `lawn_mower.start_mowing` 操作时发布命令的 MQTT 主题。使用操作时会发布值 `start_mowing`。使用 `start_mowing_command_template` 发布自定义格式。
  required: false
  type: string
retain:
  description: 发布的消息是否应该有保留标志。
  required: false
  type: boolean
  default: false
unique_id:
  description: 唯一标识该割草机的 ID。如果两台割草机具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时需要。
  required: false
  type: string
```

:::important
确保您的主题完全匹配。 `some-topic/` 和 `some-topic` 是不同的主题。

:::
## 例子

下面的示例显示如何将单个命令主题与命令模板结合使用。


```yaml
# Example configuration.yaml entry
mqtt:
  - lawn_mower:
      name: "Lawn Mower Plus"
      activity_state_topic: "lawn_mower_plus/state"
      activity_value_template: "{{ value_json.activity }}" 
      pause_command_topic: "lawn_mower_plus/set"
      pause_command_template: '{"activity": "{{ value }}"}' 
      dock_command_topic: "lawn_mower_plus/set"
      dock_command_template: '{"activity": "{{ value }}"}' 
      start_mowing_command_topic: "lawn_mower_plus/set"
      start_mowing_command_template: '{"activity": "{{ value }}"}' 
```


