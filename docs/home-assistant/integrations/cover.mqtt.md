---
title: "MQTT Cover"
description: 'MQTT cover 集成允许您控制 MQTT 遮盖（如百叶窗、卷帘或车库门）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Cover
ha_iot_class: Configurable
ha_release: 0.18
ha_domain: mqtt
---
# MQTT Cover

**MQTT cover** 集成允许您控制 MQTT 遮盖（如百叶窗、卷帘或车库门）。

## 配置

遮盖实体可以处于以下状态（`open`、`opening`、`closed` 或 `closing`）。

如果配置了 `state_topic`，则只有在 `state_topic` 上收到与 `state_open`、`state_opening`、`state_closed` 或 `state_closing` 匹配的 MQTT 消息后，实体的状态才会更新。对于仅报告 3 种状态（`opening`、`closing`、`stopped`）的遮盖，可以配置 `state_stopped` 状态来指示设备未移动。当在 `state_topic` 上收到此负载，且未配置 `position_topic` 时，如果遮盖状态为 `closing`，则将其设置为 `closed` 状态，否则设置为 `open` 状态。如果设置了 `position_topic`，则遮盖的位置将用于将状态设置为 `open` 或 `closed`。

如果遮盖报告其位置，可以配置 `position_topic` 来接收位置。如果未配置 `state_topic`，则收到位置时遮盖的状态将设置为 `open` 或 `closed`。

如果遮盖报告其倾斜位置，可以配置 `tilt_status_topic` 来接收倾斜位置。
如果同时定义了位置主题和状态主题，设备状态（`open`、`opening`、`closed` 或 `closing`）将由状态主题设置，遮盖位置将由位置主题设置。

如果既未定义状态主题也未定义位置主题，遮盖将以乐观模式工作。在此模式下，遮盖将在 Home Assistant 发送每个命令后立即更改状态（`open` 或 `closed`）。如果定义了状态主题/位置主题，遮盖将等待 `state_topic` 或 `position_topic` 上的消息。

即使定义了 `state_topic` / `position_topic`，也可以强制启用乐观模式。如果遇到遮盖操作不正确，请尝试启用它（Google Assistant 仪表板可能需要乐观模式，因为它经常在发送 set_cover_position 后立即向您的 Home Assistant 发送请求，这种情况下 MQTT 可能太慢）。

`mqtt` 遮盖平台可选地支持 `availability` 主题列表，用于从 MQTT 遮盖设备接收在线和离线消息（birth 和 LWT 消息）。在正常操作中，如果 MQTT 遮盖设备离线（即向任何 `availability` 主题发布匹配的 `payload_not_available`），Home Assistant 将把遮盖显示为"不可用"。如果这些消息以 `retain` 标志发布，遮盖将在订阅后立即收到更新，Home Assistant 将在启动时显示遮盖的正确可用状态。如果未设置 `retain` 标志，Home Assistant 将在启动时把遮盖显示为"不可用"。

要在您的系统中使用 MQTT 遮盖，请[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      command_topic: "living-room-cover/set"
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

```yaml
availability:
  description: "订阅以接收可用性（在线/离线）更新的 MQTT 主题列表。不能与 `availability_topic` 一起使用。"
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
  description: "订阅以从 MQTT 遮盖设备接收 birth 和 LWT 消息的 MQTT 主题。如果未定义 `availability` 主题，遮盖可用状态将始终为 `available`。如果定义了 `availability` 主题，遮盖可用状态默认为 `unavailable`。不能与 `availability` 一起使用。"
  required: false
  type: string
command_topic:
  description: 用于发布控制遮盖命令的 MQTT 主题。
  required: false
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如 `cover.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则实体 ID 将在重启或重新加载期间更新。如果实体 ID 已存在，则将创建带有数字后缀的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此遮盖所属设备的信息，以将其关联到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置了 [`unique_id`](#unique_id) 时有效。必须至少存在 identifiers 或 connections 之一来识别设备。"
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
      description: "设备的硬件版本。"
      required: false
      type: string
    identifiers:
      description: '唯一标识设备的 ID 列表。例如序列号。'
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
  description: 设置[设备类别](/home-assistant/integrations/cover/#device_class)，更改前端显示的设备状态和图标。`device_class` 可以是 `null`。
  required: false
  type: string
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收和发布消息的负载编码。设置为 `""` 以禁用传入负载的解码。
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
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration)文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典负载并设置为传感器属性的 MQTT 主题。使用示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration)文档中找到。
  required: false
  type: string
name:
  description: 遮盖的名称。如果只有设备名称相关，可以设置为 `null`。
  required: false
  type: string
  default: MQTT Cover
optimistic:
  description: 定义开关是否在乐观模式下工作的标志。
  required: false
  type: boolean
  default: "如果定义了状态或位置主题则为 `false`，否则为 `true`。"
payload_available:
  description: 表示在线状态的负载。
  required: false
  type: string
  default: online
payload_close:
  description: 关闭遮盖的命令负载。
  required: false
  type: string
  default: CLOSE
payload_not_available:
  description: 表示离线状态的负载。
  required: false
  type: string
  default: offline
payload_open:
  description: 打开遮盖的命令负载。
  required: false
  type: string
  default: OPEN
payload_stop:
  description: 停止遮盖的命令负载。
  required: false
  type: string
  default: STOP
payload_stop_tilt:
  description: 停止倾斜的命令负载。
  required: false
  type: string
  default: stop
platform:
  description: 必须为 `cover`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload)中允许且必需。
  required: true
  type: string
position_closed:
  description: 表示关闭位置的数字。
  required: false
  type: integer
  default: 0
position_open:
  description: 表示打开位置的数字。
  required: false
  type: integer
  default: 100
position_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，可用于提取 `position_topic` 主题的负载。模板中可使用以下变量：`entity_id`、`position_open`、`position_closed`、`tilt_min`、`tilt_max`。可以使用 `entity_id` 借助 [states](/home-assistant/docs/configuration/templating/#states) 模板函数引用实体的属性；"
  required: false
  type: template
position_topic:
  description: 订阅以接收遮盖位置消息的 MQTT 主题。
  required: false
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 定义发布的消息是否应设置 retain 标志。
  required: false
  type: boolean
  default: false
set_position_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)来定义要发送到 `set_position_topic` 主题的位置。模板中可使用传入的位置值 `{{ position }}`。模板中可使用以下变量：`entity_id`、`position`（目标位置百分比）、`position_open`、`position_closed`、`tilt_min`、`tilt_max`。可以使用 `entity_id` 借助 [states](/home-assistant/docs/configuration/templating/#states) 模板函数引用实体的属性；"
  required: false
  type: template
set_position_topic:
  description: "用于发布位置命令的 MQTT 主题。如果要使用位置主题，您也需要设置 position_topic。如果位置主题需要 `position_closed` - `position_open` 范围之外的不同值，请使用模板。如果未定义模板且 `position_closed != 100` 且 `position_open != 0`，则根据百分比位置计算适当的位置值。"
  required: false
  type: string
state_closed:
  description: 表示关闭状态的负载。
  required: false
  type: string
  default: closed
state_closing:
  description: 表示正在关闭状态的负载。
  required: false
  type: string
  default: closing
state_open:
  description: 表示打开状态的负载。
  required: false
  type: string
  default: open
state_opening:
  description: 表示正在打开状态的负载。
  required: false
  type: string
  default: opening
state_stopped:
  description: 表示停止状态的负载（用于不报告 `open`/`closed` 状态的遮盖）。
  required: false
  type: string
  default: stopped
state_topic:
  description: 订阅以接收遮盖状态消息的 MQTT 主题。状态主题只能读取（`open`、`opening`、`closed`、`closing` 或 `stopped`）状态。"None" 负载重置为 `unknown` 状态。空负载被忽略。
  required: false
  type: string
tilt_closed_value:
  description: 在 `close_cover_tilt` 命令时发送的值。
  required: false
  type: integer
  default: 0
tilt_command_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，可用于提取 `tilt_command_topic` 主题的负载。模板中可使用以下变量：`entity_id`、`tilt_position`（目标倾斜位置百分比）、`position_open`、`position_closed`、`tilt_min`、`tilt_max`。可以使用 `entity_id` 借助 [states](/home-assistant/docs/configuration/templating/#states) 模板函数引用实体的属性；"
  required: false
  type: template
tilt_command_topic:
  description: 用于发布控制遮盖倾斜命令的 MQTT 主题。
  required: false
  type: string
tilt_max:
  description: 最大倾斜值。
  required: false
  type: integer
  default: 100
tilt_min:
  description: 最小倾斜值。
  required: false
  type: integer
  default: 0
tilt_opened_value:
  description: 在 `open_cover_tilt` 命令时发送的值。
  required: false
  type: integer
  default: 100
tilt_optimistic:
  description: 确定倾斜是否在乐观模式下工作的标志。
  required: false
  type: boolean
  default: "如果未定义 `tilt_status_topic` 则为 `true`，否则为 `false`"
tilt_status_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，可用于提取 `tilt_status_topic` 主题的负载。模板中可使用以下变量：`entity_id`、`position_open`、`position_closed`、`tilt_min`、`tilt_max`。可以使用 `entity_id` 借助 [states](/home-assistant/docs/configuration/templating/#states) 模板函数引用实体的属性；"
  required: false
  type: template
tilt_status_topic:
  description: 订阅以接收倾斜状态更新值的 MQTT 主题。
  required: false
  type: string
unique_id:
  description: 唯一标识此遮盖的 ID。如果两个遮盖具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时是必需的。
  required: false
  type: string
value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，可用于提取 `state_topic` 主题的负载。"
  required: false
  type: template
```


:::note
MQTT 遮盖期望位置和倾斜值在 0 到 100 的范围内，其中 0 表示关闭位置，100 表示完全打开位置。
如果位置 `min` 或 `max` 设置为不同的范围（例如 40 到 140），当向设备发送命令时，范围将调整为设备范围（位置 0 将向设备发送值 40），当从设备收到位置负载时，它将被调整回 0 到 100 范围（设备值 40 将报告遮盖位置 0）。
`min` 和 `max` 也可用于反转设备的方向，如果 `min` 设置为 100 且 `max` 设置为 `0`，设备操作将被反转（例如，当设置位置为 40 时，将向设备发送值 60）。

:::
## 示例

本节将介绍一些如何使用此平台的实际示例。

### 仅状态主题无倾斜的完整配置

下面的示例显示了一个仅状态主题无倾斜的遮盖的完整配置。


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "living-room-cover/set"
      state_topic: "living-room-cover/state"
      availability:
        - topic: "living-room-cover/availability"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_open: "open"
      state_opening: "opening"
      state_closed: "closed"
      state_closing: "closing"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
```


### 仅位置主题无倾斜的完整配置

下面的示例显示了一个仅位置主题无倾斜的遮盖的完整配置。


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "living-room-cover/set"
      position_topic: "living-room-cover/position"
      availability:
        - topic: "living-room-cover/availability"
      set_position_topic: "living-room-cover/set_position"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      position_open: 100
      position_closed: 0
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
```


### 位置、状态和倾斜的完整配置

下面的示例显示了一个带位置、状态和倾斜的遮盖的完整配置。


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "living-room-cover/set"
      state_topic: "living-room-cover/state"
      position_topic: "living-room-cover/position"
      availability:
        - topic: "living-room-cover/availability"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_open: "open"
      state_opening: "opening"
      state_closed: "closed"
      state_closing: "closing"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
      position_template: "{{ value.y }}"
      tilt_command_topic: "living-room-cover/tilt"
      tilt_status_topic: "living-room-cover/tilt-state"
      tilt_status_template: "{{ value_json["PWM"]["PWM1"] }}"
      tilt_min: 0
      tilt_max: 180
      tilt_closed_value: 70
      tilt_opened_value: 180
```


### 使用停止状态的完整配置

下面的示例显示了一个使用停止状态的遮盖的完整配置。


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "living-room-cover/set"
      state_topic: "living-room-cover/state"
      position_topic: "living-room-cover/position"
      availability:
        - topic: "living-room-cover/availability"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_opening: "opening"
      state_closed: "closed"
      state_stopped: "stopped"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
      position_template: "{{ value.y }}"
```


### 禁用遮盖命令的配置

下面的示例显示了一个没有关闭命令的遮盖的配置。
将 `payload_close` 设置为空或 `null` 可禁用关闭命令，并且不会显示关闭按钮。


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      payload_open: "on"
      payload_close: 
      payload_stop: "on"
```


以下命令可以通过覆盖其负载来禁用：`open`、`close`、`stop`，对应：`payload_open`、`payload_close`、`payload_stop`

对于自动发现消息，负载需要设置为 `null`，无关闭命令的遮盖示例：


```json
{
  "cover": [
    {
      "payload_open": "on",
      "payload_close": null,
      "payload_stop": "on"
    }
  ]
}
```


### 在模板中使用 `entity_id` 变量的完整配置

下面的示例展示了如何根据百叶窗是向上移动还是向下移动来更正其状态。


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "living-room-cover/set"
      state_topic: "living-room-cover/state"
      position_topic: "living-room-cover/position"
      set_position_topic: "living-room-cover/position/set"
      payload_open:  "open"
      payload_close: "close"
      payload_stop:  "stop"
      state_opening: "open"
      state_closing: "close"
      state_stopped: "stop"
      optimistic: false
      position_template: |-
        {% if not state_attr(entity_id, "current_position") %}
          {{ value }}
        {% elif state_attr(entity_id, "current_position") < (value | int) %}
          {{ (value | int + 1) }}
        {% elif state_attr(entity_id, "current_position") > (value | int) %}
          {{ (value | int - 1) %}
        {% else %}
          {{ value }}
        {% endif %}
```


### 使用高级模板的完整配置

`position_template` 可以接受 JSON，其中同时提供 `position` 和 `tilt_position`。

下面的示例展示了如何设置具有组合位置和倾斜主题的百叶窗的完整示例。示例中的百叶窗有可移动的板条，它们随位置变化而倾斜。在示例中，百叶窗移动 6% 即为板条完全旋转一次。

以下变量可在 `position_template`、`set_position_template`、`tilt_command_template` 和 `tilt_status_template`、`json_attributes_template`（仅 `entity_id`）中使用。

- `entity_id` - 实体本身的 ID。可以借助 [states](/home-assistant/docs/configuration/templating/#states) 模板函数引用其属性。
- `position_open`
- `position_closed`
- `tilt_min`
- `tilt_max`


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "living-room-cover/set"
      state_topic: "living-room-cover/state"
      position_topic: "living-room-cover/position"
      set_position_topic: "living-room-cover/position/set"
      tilt_command_topic: "living-room-cover/position/set" # 与 `set_position_topic` 相同
      qos: 1
      retain: false
      payload_open:  "open"
      payload_close: "close"
      payload_stop:  "stop"
      state_opening: "open"
      state_closing: "close"
      state_stopped: "stop"
      position_open: 100
      position_closed: 0
      tilt_min: 0
      tilt_max: 6
      tilt_opened_value: 3
      tilt_closed_value: 0
      optimistic: false
      position_template: |-
        {% if not state_attr(entity_id, "current_position") %}
          {
            "position" : {{ value }},
            "tilt_position" : 0
          }
        {% else %}
          {% set old_position = state_attr(entity_id, "current_position") %}
          {% set old_tilt_percent = (state_attr(entity_id, "current_tilt_position")) %}

          {% set movement = value | int - old_position %}
          {% set old_tilt_position = (old_tilt_percent / 100 * (tilt_max - tilt_min)) %}
          {% set new_tilt_position = min(max((old_tilt_position + movement), tilt_min), tilt_max) %}
  
          {
            "position": {{ value }},
            "tilt_position": {{ new_tilt_position }}
          }
        {% endif %}
    tilt_command_template: >-
        {% set position = state_attr(entity_id, "current_position") %}
        {% set tilt = state_attr(entity_id, "current_tilt_position") %}
        {% set movement = (tilt_position - tilt) / 100 * tilt_max %}
        {{ position + movement }}
      payload_open: "on"
      payload_close: 
      payload_stop: "on"
```


### 测试您的配置

要测试，您可以使用 `mosquitto` 附带的或 `mosquitto-clients` 包中的命令行工具 `mosquitto_pub` 发送 MQTT 消息。这允许您手动操作遮盖：

```bash
mosquitto_pub -h 127.0.0.1 -t living-room-cover/set -m "CLOSE"
```