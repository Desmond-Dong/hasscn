---
title: "MQTT binary sensor"
description: 'MQTT 二值传感器集成使用接收到的 MQTT 消息将二值传感器的状态设置为 on、off 或 unknown。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
ha_release: 0.9
ha_iot_class: Configurable
ha_domain: mqtt
---
# MQTT binary sensor

**MQTT 二值传感器**集成使用接收到的 MQTT 消息将二值传感器的状态设置为 `on`、`off` 或 `unknown`。

状态只有在 `state_topic` 上发布与 `payload_on`、`payload_off` 或 `None` 匹配的新消息后才会更新。如果这些消息在发布时设置了 `retain` 标志，二值传感器将在订阅后立即接收状态更新，Home Assistant 将在启动时显示正确的状态。否则，Home Assistant 中显示的初始状态将为 `unknown`。

无状态设备（如按钮、遥控器等）更适合用 [MQTT 设备触发器](/home-assistant/integrations/device_trigger.mqtt/) 而不是二值传感器来表示。

## 配置

`mqtt` 二值传感器平台可选地支持 `availability` 主题列表，用于从 MQTT 设备接收在线和离线消息（birth 和 LWT 消息）。在正常运行期间，如果 MQTT 传感器设备离线（即向 `availability` 主题发布 `payload_not_available`），Home Assistant 将把二值传感器显示为 `unavailable`。如果这些消息在发布时设置了 `retain` 标志，二值传感器将在订阅后立即接收更新，Home Assistant 将在启动时显示二值传感器的正确可用性状态。如果未设置 `retain` 标志，Home Assistant 将在启动时将二值传感器显示为 `unavailable`。如果未定义 `availability` 主题，Home Assistant 将认为 MQTT 设备是 `available` 的，并显示其状态。

要在您的安装中使用 MQTT 二值传感器，请[将 MQTT 设备添加为子条目](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - binary_sensor:
      state_topic: "basement/window/contact"
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

```yaml
availability:
  description: 订阅用于接收可用性（在线/离线）更新的 MQTT 主题列表。不能与 `availability_topic` 一起使用。
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
      description: 订阅用于接收可用性（在线/离线）更新的 MQTT 主题。
      required: true
      type: string
    value_template:
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `topic` 中提取设备的可用性。此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较以确定设备的可用性。"
      required: false
      type: template
availability_mode:
  description: 当配置了 `availability` 时，此选项控制设置实体为 `available` 所需的条件。有效值为 `all`、`any` 和 `latest`。如果设置为 `all`，则必须在所有配置的可用性主题上收到 `payload_available` 后，实体才会被标记为在线。如果设置为 `any`，则必须在至少一个配置的可用性主题上收到 `payload_available` 后，实体才会被标记为在线。如果设置为 `latest`，则在任何配置的可用性主题上最后收到的 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `availability_topic` 中提取设备的可用性。此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较以确定设备的可用性。"
  required: false
  type: template
availability_topic:
  description: "订阅用于从 MQTT 设备接收 birth 和 LWT 消息的 MQTT 主题。如果未定义 `availability`，二值传感器将始终被视为 `available`，其状态将是 `on`、`off` 或 `unknown`。如果定义了 `availability`，二值传感器默认将被视为 `unavailable`，传感器的初始状态将是 `unavailable`。不能与 `availability` 一起使用。"
  required: false
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而非名称来自动生成实体 ID。例如 `binary_sensor.foobar`。当没有 `unique_id` 时，如果实体 ID 可用，则实体 ID 将在重启或重新加载期间更新。如果实体 ID 已存在，则将在末尾创建一个带数字的实体 ID。当使用 `unique_id` 时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "关于此二值传感器所属设备的信息，用于将其关联到[设备注册表](https://developers.home-assistant.io/docs/device_registry_index/)。仅在设置了 [`unique_id`](#unique_id) 时有效。必须至少存在 identifiers 或 connections 之一来识别设备。"
  required: false
  type: map
  keys:
    configuration_url:
      description: '可以管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
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
    serial_number:
      description: "设备的序列号。"
      required: false
      type: string
    suggested_area:
      description: '如果设备尚未在某个区域中，建议一个区域。'
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
  description: 设置[设备类别](/home-assistant/integrations/binary_sensor/#device-class)，更改前端显示的设备状态和图标。`device_class` 可以是 `null`。
  required: false
  type: string
enabled_by_default:
  description: 定义首次添加时实体是否应启用的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收到的负载的编码。设置为 `""` 可禁用传入负载的解码。
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: 实体的[类别](https://developers.home-assistant.io/docs/core/entity/#generic-properties)。设置时，传感器的实体类别必须是 `diagnostic`。
  required: false
  type: string
entity_picture:
  description: "实体的图片 URL。"
  required: false
  type: string
expire_after:
  description: 如果设置，它定义传感器状态在未更新时过期的秒数。过期后，传感器状态变为 `unavailable`。默认情况下，传感器状态永不过期。请注意，当传感器的值以保留方式发送到 MQTT 代理时，当 Home Assistant 重启或重新加载时，MQTT 代理将重放最后发送的值。由于这可能导致传感器以过期状态变为可用，因此不建议在 MQTT 代理处保留传感器的状态负载。Home Assistant 将为您存储和恢复传感器的状态，并计算在传感器变为不可用之前保持状态的剩余时间。
  required: false
  type: integer
force_update:
  description: 即使传感器状态未更改，也发送更新事件（这将导致 [状态对象](/home-assistant/docs/configuration/state_object/) 的 `last_changed` 更新）。如果您想在历史记录中有有意义的数值图表，或者想创建一个在*每次*传入状态消息时触发的自动化（不仅在传感器的新状态与当前状态不同时），这很有用。
  required: false
  type: boolean
  default: false
icon:
  description: "实体的[图标](/home-assistant/docs/configuration/customizing-devices/#icon)。"
  required: false
  type: icon
json_attributes_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。用法示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) 文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅用于接收 JSON 字典负载并设置为传感器属性的 MQTT 主题。用法示例可在 [MQTT 传感器](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) 文档中找到。
  required: false
  type: string
name:
  description: 二值传感器的名称。如果仅设备名称相关，可设置为 `null`。
  required: false
  type: string
  default: MQTT binary sensor
off_delay:
  description: "对于只发送 `on` 状态更新的传感器（如 PIR），此变量设置一个延迟（秒），在此之后传感器的状态将被更新回 `off`。"
  required: false
  type: integer
payload_available:
  description: 表示 `online` 状态的字符串。
  required: false
  type: string
  default: online
payload_not_available:
  description: 表示 `offline` 状态的字符串。
  required: false
  type: string
  default: offline
payload_off:
  description: 表示 `off` 状态的字符串。它将与 `state_topic` 中的消息进行比较（详见 `value_template`）
  required: false
  type: string
  default: "OFF"
payload_on:
  description: 表示 `on` 状态的字符串。它将与 `state_topic` 中的消息进行比较（详见 `value_template`）
  required: false
  type: string
  default: "ON"
platform:
  description: 必须是 `binary_sensor`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload) 中允许且必需。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
state_topic:
  description: 订阅用于接收传感器状态的 MQTT 主题。有效状态为 `OFF` 和 `ON`。可以使用 `payload_off` 和 `payload_on` 配置选项设置自定义的 `OFF` 和 `ON` 值。
  required: true
  type: string
unique_id:
  description: 唯一标识此传感器的 ID。如果两个传感器具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时必需。
  required: false
  type: string
value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，返回一个要与 `payload_on`/`payload_off` 比较的字符串或空字符串（在这种情况下，MQTT 消息将被删除）。当 `payload_on` 和 `payload_off` 足以匹配您的负载时（即不需要对原始消息进行预处理），请删除此选项。"
  required: false
  type: template
```

## 示例

在本节中，您将找到一些使用此传感器的实际示例。

### 使用 JSON 数据的完整配置

这是一个从 JSON 格式的 MQTT 消息中提取状态的配置示例。
要测试，您可以使用 `mosquitto` 附带的命令行工具 `mosquitto_pub` 或 `mosquitto-clients` 包发送 MQTT 消息。

手动设置二值传感器的状态：

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/availability -m "online"
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m '{"state":"ON"}'
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m '{"state":"OFF"}'
```

下面的示例显示了一个二值传感器的完整配置：


```yaml
# Example configuration.yaml entry
mqtt:
  - binary_sensor:
      name: "Window Contact Sensor"
      state_topic: "bedroom/window/contact"
      payload_on: "ON"
      availability:
        - topic: "bedroom/window/availability"
          payload_available: "online"
          payload_not_available: "offline"
      qos: 0
      device_class: opening
      value_template: "{{ value_json.state }}"
```


### 每次在 state_topic 上收到消息时切换二值传感器


```yaml
# Example configuration.yaml entry
mqtt:
  - binary_sensor:
      state_topic: "lab_button/cmnd/POWER"
      value_template: "{%if is_state(entity_id,\"on\")-%}OFF{%-else-%}ON{%-endif%}"
```


### 获取 ESPEasy 设备的状态

假设您已经使用 [ESPEasy](https://github.com/letscontrolit/ESPEasy) 刷写了 ESP8266 设备，并在 **Config** 下为设备设置了名称（**Unit Name:**，此处为 **bathroom**）。同时，还配置了一个使用 **OpenHAB MQTT** 协议的 MQTT **Controller**，并将其中的 **Controller Subscribe:** 和 **Controller Publish:** 条目调整为符合您的需求。在此示例中，主题以 **home** 为前缀。另外，在 **Devices** 选项卡中添加一个 **Switch Input**，名称为 **switch**，值为 **button**。

一旦设备上线，您将获得附加按钮的状态。

```text
home/bathroom/status Connected
...
home/bathroom/switch/button 1
```

配置将如下例所示：

```yaml
# Example configuration.yaml entry
mqtt:
  - binary_sensor:
      name: Bathroom
      state_topic: "home/bathroom/switch/button"
      payload_on: "1"
      payload_off: "0"
```
