---
title: "MQTT Valve"
description: "有关如何将 MQTT 阀门集成到 Home Assistant 的说明。"

ha_category:
  - Valve
ha_iot_class: Configurable
ha_release: 2024.1
ha_domain: mqtt
---

The **MQTT Valve** integration allows you to control an MQTT valve (such a gas or water valve).

## Configuration

阀门实体可以具有以下状态：“打开”、“打开”、“关闭”或“关闭”。

### 阀门由状态控制

如果配置了“state_topic”，则只有在“state_topic”上收到与“state_open”、“state_opening”、“state_close”或“state_looking”匹配的 MQTT 消息后，才会更新实体的状态。通过“payload_open”、“payload_close”和“payload_stop”配置的命令将发布到“command_topic”来控制阀门。

To use an MQTT valve in your installation, [add an MQTT device as a subentry](/home-assistant/integrations/mqtt/#configuration), or add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes.

```yaml
# Example configuration.yaml entry for a value that is set by open or close command
mqtt:
  - valve:
      command_topic: "heater/valve/set"
      state_topic: "heater/valve/state"
```

或者，更高级的方法是通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

### 阀门由位置控制

如果阀门支持报告其位置（“reports_position”配置选项设置为“true”），则“state_topic”上预计会出现数字状态，但仍允许“state_opening”和“state_fitting”进行状态更新。此外，还支持 JSON 格式。它允许同时报告“状态”和“位置”。

JSON 状态更新示例：

```json
{"state": "opening", "position": 10}
```

当调用“valve.open”、“value.close”或“value.set_position”操作时，所需的位置值或“payload_stop”将发布到“command_topic”以控制阀门。

To use your MQTT valve in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for a valve that reports position
mqtt:
  - valve:
      command_topic: "heater/valve/set"
      state_topic: "heater/valve/state"
      reports_position: true
```

###乐观操作

如果未定义“state_topic”，阀门将以乐观模式工作。在此模式下，家庭助理发送每个命令后，阀门将立即改变状态（“打开”或“关闭”）。它不会等待设备的更新。即使定义了“state_topic”，也可以通过将“optimistic”设置为“true”来强制使用乐观模式。如果您遇到阀门操作不正确的情况，请尝试启用它。

```yaml
availability:
  description: "A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`."
  required: false
  type: list
  keys:
    payload_available:
      description: The payload that represents the available state.
      required: false
      type: string
      default: online
    payload_not_available:
      description: The payload that represents the unavailable state.
      required: false
      type: string
      default: offline
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the device's availability from the `topic`. To determine the devices's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the device's availability from the `availability_topic`. To determine the devices's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: "The MQTT topic subscribed to receive birth and LWT messages from the MQTT valve device. If an `availability` topic is not defined, the valve availability state will always be `available`. If an `availability` topic is defined, the valve availability state will be `unavailable` by default. Must not be used together with `availability`."
  required: false
  type: string
command_template:
  description: Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to generate the payload to send to `command_topic`.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to control the valve. The value sent can be a value defined by `payload_open`, `payload_close` or `payload_stop`. If `reports_position` is set to `true`, a numeric value will be published instead.
  required: false
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `valve.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Information about the device this valve is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of the identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: "A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL."
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example, the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: A list of IDs that uniquely identify the device. For example, a serial number.
      required: false
      type: [list, string]
    manufacturer:
      description: The manufacturer of the device.
      required: false
      type: string
    model:
      description: The model of the device.
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: The name of the device.
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    suggested_area:
      description: Suggest an area if the device isn’t in one yet.
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.
      required: false
      type: string
device_class:
  description: Sets the [class of the device](/home-assistant/integrations/valve/#device_class), changing the device state and icon that is displayed on the frontend. The `device_class` can be `null`.
  required: false
  type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: "The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity."
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. A usage example can be found in the [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. A usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the valve. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT valve
optimistic:
  description: Flag that defines if a switch works in optimistic mode.
  required: false
  type: boolean
  default: "`false` if the state or position topic is defined; `true` otherwise."
payload_available:
  description: The payload that represents the online state.
  required: false
  type: string
  default: online
payload_close:
  description: The command payload that closes the valve. Is only used when `reports_position` is set to `false` (default). The `payload_close` is not allowed if `reports_position` is set to `true`. Can be set to `null` to disable the valve's close option.
  required: false
  type: string
  default: CLOSE
payload_not_available:
  description: The payload that represents the offline state.
  required: false
  type: string
  default: offline
payload_open:
  description: The command payload that opens the valve. Is only used when `reports_position` is set to `false` (default). The `payload_open` is not allowed if `reports_position` is set to `true`. Can be set to `null` to disable the valve's open option.
  required: false
  type: string
  default: OPEN
payload_stop:
  description: The command payload that stops the valve. When not configured, the valve will not support the `valve.stop` action.
  required: false
  type: string
platform:
  description: Must be `valve`. Only allowed and required in [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
position_closed:
  description: Number which represents closed position. The valve's position will be scaled to the(`position_closed`...`position_open`) range when an action is performed and scaled back when a value is received.
  required: false
  type: integer
  default: 0
position_open:
  description: Number which represents open position. The valve's position will be scaled to (`position_closed`...`position_open`) range when an is performed and scaled back when a value is received.
  required: false
  type: integer
  default: 100
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
reports_position:
  description: "Set to `true` if the value reports the position or supports setting the position. Enabling the `reports_position` option will cause the position to be published instead of a payload defined by `payload_open`, `payload_close` or `payload_stop`. When receiving messages, `state_topic` will accept numeric payloads or one of the following state messages: `open`, `opening`, `closed`, or `closing`."
  required: false
  type: boolean
  default: false
retain:
  description: Defines if published messages should have the retain flag set.
  required: false
  type: boolean
  default: false
state_closed:
  description: The payload that represents the closed state. Is only allowed when `reports_position` is set to `False` (default).
  required: false
  type: string
  default: closed
state_closing:
  description: The payload that represents the closing state.
  required: false
  type: string
  default: closing
state_open:
  description: The payload that represents the open state. Is only allowed when `reports_position` is set to `False` (default).
  required: false
  type: string
  default: open
state_opening:
  description: The payload that represents the opening state.
  required: false
  type: string
  default: opening
state_topic:
  description: The MQTT topic subscribed to receive valve state messages. State topic accepts a state payload (`open`, `opening`, `closed`, or `closing`) or, if `reports_position` is supported, a numeric value representing the position. In a JSON format with variables `state` and `position` both values can received together. A "None" state value resets to an `unknown` state. An empty string is ignored.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this valve. If two valves have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) that can be used to extract the payload for the `state_topic` topic. The rendered value should be a defined state payload or, if reporting a `position` is supported and `reports_position` is set to `true`, a numeric value is expected representing the position. See also `state_topic`."
  required: false
  type: template
```

:::note
MQTT valve expects position values to be in the range of 0 to 100, where 0 indicates a closed position and 100 indicates a fully open position.
If `position_open` or `position_closed` are set to a different range (for example, 40 to 140), when sending a command to the device, the range will be adjusted to the device range. For example, position 0 will send a value of 40 to device. When the device receives a position payload, it will be adjusted back to the 0 to 100 range. In our example, the device value of 40 will report valve position 0.
`position_open` and `position_closed` can also be used to reverse the direction of the device: If `position_closed` is set to 100 and `position_open` is set to `0`, the device operation will be inverted. For example, when setting the position to 40, a value of 60 will be sent to the device.

:::
## Examples

本节提供一些示例，展示如何使用此平台。

### 不报告位置的值的完整配置

下面的示例显示了不报告位置的阀门的完整配置。


```yaml
# Example configuration.yaml entry
mqtt:
  - valve:
      name: "MQTT valve"
      command_template: '{"x": {{ value }} }'
      command_topic: "heater/valve/set"
      state_topic: "heater/valve/state"
      availability:
        - topic: "heater/valve/availability"
      qos: 0
      reports_position: false
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
      value_template: "{{ value_json.x }}"
```


### 报告位置的阀门配置示例

下面的示例显示了使用 JSON 消息报告位置的阀门的示例配置。


```yaml
# Example configuration.yaml entry
mqtt:
  - valve:
      name: "MQTT valve"
      command_template: '{"x": {{ value }} }'
      command_topic: "heater/valve/set"
      state_topic: "heater/valve/state"
      availability:
        - topic: "heater/valve/availability"
      reports_position: true
      value_template: "{{ value_json.x }}"
```


### 禁用阀门命令的配置

下面的示例显示了没有关闭命令的阀门的配置。
将“payload_close”设置为空或“null”会禁用关闭命令，并且不会显示关闭按钮。


```yaml
# Example configuration.yaml entry
mqtt:
  - valve:
      payload_open: "on"
      payload_close: 
      payload_stop: "on"
```


如果设置了“command_topic”，MQTT 阀门将支持“open”和“close”命令。如果设置了“payload_stop”，则 MQTT 阀门支持“stop”。

### 测试你的配置

为了进行测试，您可以使用“mosquitto”或“mosquitto-clients”包附带的命令行工具“mosquitto_pub”来发送 MQTT 消息。这允许您手动操作阀门：

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/valve/set -m "CLOSE"
```
