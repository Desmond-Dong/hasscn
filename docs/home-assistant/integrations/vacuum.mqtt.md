---
title: "MQTT Vacuum"
description: 'The MQTT Vacuum integration allows you to control your MQTT-enabled vacuum. The initial state of the MQTT vacuum entity will set to unknown and can be。'

ha_category:
  - Vacuum
ha_release: 0.54
ha_domain: mqtt
---
# MQTT Vacuum

The **MQTT Vacuum** integration allows you to control your MQTT-enabled vacuum.
The initial state of the MQTT vacuum entity will set to `unknown` and can be reset by a device by sending a `null` payload as state.

## Configuration

To use an MQTT vacuum in your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes.

```yaml
# Example configuration.yaml entry
mqtt:
  - vacuum:
      state_topic: state-topic
      command_topic: command-topic
```

或者，更高级的方法是通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

```yaml
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
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
      description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to control the vacuum.
  required: false
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `vacuum.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Information about the device this switch is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [string, list]
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
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
fan_speed_list:
  description: List of possible fan speeds for the vacuum.
  required: false
  type: [string, list]
json_attributes_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the vacuum. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Vacuum
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_clean_spot:
  description: The payload to send to the `command_topic` to begin a spot cleaning cycle.
  required: false
  type: string
  default: clean_spot
payload_locate:
  description: The payload to send to the `command_topic` to locate the vacuum (typically plays a song).
  required: false
  type: string
  default: locate
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_pause:
  description: The payload to send to the `command_topic` to pause the vacuum.
  required: false
  type: string
  default: pause
payload_return_to_base:
  description: The payload to send to the `command_topic` to tell the vacuum to return to base.
  required: false
  type: string
  default: return_to_base
payload_start:
  description: "The payload to send to the `command_topic` to begin the cleaning cycle."
  required: false
  type: string
  default: start
payload_stop:
  description: "The payload to send to the `command_topic` to stop cleaning."
  required: false
  type: string
  default: stop
platform:
  description: Must be `vacuum`. Only allowed and required in [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
send_command_topic:
  description: The MQTT topic to publish custom commands to the vacuum.
  required: false
  type: string
set_fan_speed_topic:
  description: The MQTT topic to publish commands to control the vacuum's fan speed.
  required: false
  type: string
state_topic:
  description: "The MQTT topic subscribed to receive state messages from the vacuum. Messages received on the `state_topic` must be a valid JSON dictionary, with a mandatory `state` key and optionally `fan_speed` keys as shown in the [example](#configuration-example)."
  required: false
  type: string
supported_features:
  description: "List of features that the vacuum supports (possible values are `start`, `stop`, `pause`, `return_home`, `status`, `locate`, `clean_spot`, `fan_speed`, `send_command`)."
  required: false
  type: [string, list]
  default: "`start`, `stop`, `return_home`, `status`, `clean_spot`"
unique_id:
   description: An ID that uniquely identifies this vacuum. If two vacuums have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
   required: false
   type: string
```

## 配置示例

```yaml
# Example configuration.yaml entry
mqtt:
  - vacuum:
      name: "MQTT Vacuum"
      supported_features:
        - start
        - pause
        - stop
        - return_home
        - status
        - locate
        - clean_spot
        - fan_speed
        - send_command
      command_topic: "vacuum/command"
      set_fan_speed_topic: "vacuum/set_fan_speed"
      fan_speed_list:
        - min
        - medium
        - high
        - max
      send_command_topic: "vacuum/send_command"
```

## MQTT Protocol

此集成的配置需要如下所示的 MQTT 协议。

### Basic Commands

MQTT 主题：`真空/命令`

可能的 MQTT 有效负载：

- `start` - 开始清洁
- `暂停` - 暂停清洁
- `return_to_base` - 返回基地/码头
- `停止` - 停止真空。
- `clean_spot` - 初始化定点清洁周期
- `locate` - 定位真空（通常通过播放歌曲）

### 发送自定义命令

Vacuum send_command 允许三个参数：

- 实体_id
- 命令
- 参数 - 可选

如果未提供参数，它将命令作为有效负载发送到 MQTT send_command 主题。
如果提供了参数，服务将发送 JSON 作为具有以下结构的有效负载：

```json
{
  'command': 'command',
  'param1-key': 'param1-value'
}
```

动作触发示例：

```yaml
- alias: "Push command based on sensor"
    triggers:
      - trigger: state
        entity_id: sensor.sensor
    actions:
      - action: vacuum.send_command
        target:
          entity_id: vacuum.vacuum_entity
        data:
          command: "custom_command"
          params:
            - key: value
```

MQTT 主题：`vacuum/send_command`

### 状态/传感器更新

MQTT 主题：`真空/状态`

MQTT payload:

```json
{
    "state": "docked",
    "fan_speed": "off"
}
```

状态必须是 Home Assistant 支持的真空状态之一：

- 清洁，
- 停靠，
- 暂停，
- 闲置，
- 返回，
- 错误。

### Set Fan Speed

MQTT 主题：`vacuum/set_fan_speed`

可能的 MQTT 有效负载：

- `min` - 最小风扇速度
- `中` - 中等风扇速度
- `高` - 高风扇速度
- `max` - 最大风扇速度

## Usage examples

### 使用无云小米吸尘器

此集成由无云的小米 Vacuum Web 界面 [Valetudo](https://github.com/Hypfer/Valetudo) 支持。

### 改造非 WiFi 吸尘器

- 使用 ESP8266 改造您的旧 Roomba。 [此存储库](https://github.com/johnboiles/esp-roomba-mqtt) 提供 MQTT 客户端固件。
- 如果您拥有非 wifi Neato，您可以参考[此存储库](https://github.com/jeroenterheerdt/neato-serial)，它使用 Raspberry Pi 来改造旧的 Neato。