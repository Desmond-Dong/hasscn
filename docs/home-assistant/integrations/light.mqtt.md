---
title: "MQTT Light"
description: "介绍如何在 Home Assistant 中使用默认架构设置 MQTT 灯光。"
ha_category:
  - Light
ha_iot_class: Configurable
ha_release: 0.8
ha_domain: mqtt
---

**MQTT 灯光**集成可让你通过支持的消息架构之一来控制启用 MQTT 的灯具，支持 `default`、`json` 和 `template`。

## MQTT 灯光架构对比

| Function          | [`default`](#default-schema) | [`json`](#json-schema) | [`template`](#template-schema) |
| ----------------- | ---------------------------- | ---------------------- | ------------------------------ |
| Brightness        | ✔                            | ✔                      | ✔                              |
| Color mode        | ✔                            | ✔                      | ✘                              |
| Color temperature | ✔                            | ✔                      | ✔                              |
| Effects           | ✔                            | ✔                      | ✔                              |
| Flashing          | ✘                            | ✔                      | ✔                              |
| HS Color          | ✔                            | ✔                      | ✔                              |
| RGB Color         | ✔                            | ✔                      | ✔                              |
| RGBW Color        | ✔                            | ✔                      | ✘                              |
| RGBWW Color       | ✔                            | ✔                      | ✘                              |
| Transitions       | ✘                            | ✔                      | ✔                              |
| White             | ✔                            | ✔                      | ✘                              |
| XY Color          | ✔                            | ✔                      | ✘                              |

## 默认架构

使用默认架构的 `mqtt` 灯光平台可让你控制启用 MQTT 的灯具。它支持亮度、色温、效果、开关、RGB 颜色、XY 颜色和白光设置。

## 默认架构 - 配置

理想情况下，MQTT 设备会有一个用于发布状态变化的状态主题。如果这些消息使用 `RETAIN` 标志发布，MQTT 灯光在订阅后会立即收到状态更新，并以正确状态启动。否则，实体的初始状态将为 `unknown`。MQTT 设备也可以通过发送 `None` 载荷将当前状态重置为 `unknown`。

当没有状态主题时，灯光将以乐观模式运行。在该模式下，每次发送命令后灯光都会立即更新状态。否则，灯光会等待来自设备的状态确认（即来自 `state_topic` 的消息）。在乐观模式下，初始状态设为 `False` / `off`。

即使 `state_topic` 可用，也可以强制启用乐观模式。如果灯光工作不正确，可以尝试启用该模式。

Home Assistant 在内部假定灯光状态会对应一个明确的 `color_mode`。
对于默认架构下同时支持颜色和色温的 MQTT 灯光，`color_mode` 会根据最后一次收到的有效颜色或色温值自动设置。你也可以配置 `color_mode_state_topic` 来显式控制 `color_mode`。

要在你的安装中使用 MQTT 基础灯光，请[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      command_topic: "office/rgb1/light/switch"
```

此外，也可以通过更高级的 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 方式进行设置。

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
brightness_command_topic:
  description: The MQTT topic to publish commands to change the light’s brightness.
  required: false
  type: string
brightness_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `brightness_command_topic`. Available variables: `value`."
  required: false
  type: template
brightness_scale:
  description: "Defines the maximum brightness value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
brightness_state_topic:
  description: The MQTT topic subscribed to receive brightness state updates.
  required: false
  type: string
brightness_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the brightness value."
  required: false
  type: template
color_mode_state_topic:
  description: "The MQTT topic subscribed to receive color mode updates. If this is not configured, `color_mode` will be automatically set according to the last received valid color or color temperature. The unit used is mireds, or if `color_temp_kelvin` is set to `true`, in Kelvin."
  required: false
  type: string
color_mode_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the color mode."
  required: false
  type: template
color_temp_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `color_temp_command_topic`. Available variables: `value`."
  required: false
  type: template
color_temp_command_topic:
  description: The MQTT topic to publish commands to change the light’s color temperature state. By default the color temperature command slider has a range of 153 to 500 mireds (micro reciprocal degrees) or a range of 2000 to 6535 Kelvin if `color_temp_kelvin` is set to `true`.
  required: false
  type: string
color_temp_kelvin:
  description: "When set to `true`, `color_temp_command_topic` will publish color mode updates in Kelvin and process `color_temp_state_topic` will process state updates in Kelvin. When not set the `color_temp` values are converted to mireds."
  required: false
  type: boolean
  default: false
color_temp_state_topic:
  description: "The MQTT topic subscribed to receive color temperature state updates."
  required: false
  type: string
color_temp_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the color temperature value."
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: true
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `light.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
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
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: 'The name of the device.'
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
      description: 'The firmware version of the device.'
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
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
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
effect_command_topic:
  description: "The MQTT topic to publish commands to change the light's effect state."
  required: false
  type: string
effect_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `effect_command_topic`. Available variables: `value`."
  required: false
  type: template
effect_list:
  description: The list of effects the light supports.
  required: false
  type: [string, list]
effect_state_topic:
  description: The MQTT topic subscribed to receive effect state updates.
  required: false
  type: string
effect_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the effect value."
  required: false
  type: template
hs_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `hs_command_topic`. Available variables: `hue` and `sat`."
  required: false
  type: template
hs_command_topic:
  description: "The MQTT topic to publish commands to change the light's color state in HS format (Hue Saturation).
  Range for Hue: 0° .. 360°, Range of Saturation: 0..100.
  Note: Brightness is sent separately in the `brightness_command_topic`."
  required: false
  type: string
hs_state_topic:
  description: "The MQTT topic subscribed to receive color state updates in HS format. The expected payload is the hue and saturation values separated by commas, for example, `359.5,100.0`.
  Note: Brightness is received separately in the `brightness_state_topic`."
  required: false
  type: string
hs_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the HS value."
  required: false
  type: template
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_kelvin:
  description: The maximum color temperature in Kelvin.
  required: false
  type: integer
  default: 6535
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_kelvin:
  description: The minimum color temperature in Kelvin.
  required: false
  type: integer
  default: 2000
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Light
on_command_type:
  description: "Defines when on the payload_on is sent. Using `last` (the default) will send any style (brightness, color, etc) topics first and then a `payload_on` to the `command_topic`. Using `first` will send the `payload_on` and then any style topics. Using `brightness` will only send brightness commands instead of the `payload_on` to turn the light on."
  required: false
  type: string
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
payload_off:
  description: The payload that represents the off state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents the on state.
  required: false
  type: string
  default: "ON"
platform:
  description: Must be `light`. Only allowed and required in [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload).
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
rgb_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `rgb_command_topic`. Available variables: `red`, `green` and `blue`."
  required: false
  type: template
rgb_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGB state."
  required: false
  type: string
rgb_state_topic:
  description: "The MQTT topic subscribed to receive RGB state updates. The expected payload is the RGB values separated by commas, for example, `255,0,127`."
  required: false
  type: string
rgb_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the RGB value."
  required: false
  type: template
rgbw_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `rgbw_command_topic`. Available variables: `red`, `green`, `blue` and `white`."
  required: false
  type: template
rgbw_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGBW state."
  required: false
  type: string
rgbw_state_topic:
  description: "The MQTT topic subscribed to receive RGBW state updates. The expected payload is the RGBW values separated by commas, for example, `255,0,127,64`."
  required: false
  type: string
rgbw_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the RGBW value."
  required: false
  type: template
rgbww_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `rgbww_command_topic`. Available variables: `red`, `green`, `blue`, `cold_white` and `warm_white`."
  required: false
  type: template
rgbww_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGBWW state."
  required: false
  type: string
rgbww_state_topic:
  description: "The MQTT topic subscribed to receive RGBWW state updates. The expected payload is the RGBWW values separated by commas, for example, `255,0,127,64,32`."
  required: false
  type: string
rgbww_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the RGBWW value."
  required: false
  type: template
schema:
  description: The schema to use. Must be `basic` or omitted to select the default schema.
  required: false
  type: string
  default: basic
state_topic:
  description: "The MQTT topic subscribed to receive state updates. A \"None\" payload resets to an `unknown` state. An empty payload is ignored. By default, valid state payloads are `OFF` and `ON`. The accepted payloads can be overridden with the `payload_off` and `payload_on` config options."
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the state value. The template should return the values defined by `payload_on` (defaults to \"ON\") and `payload_off` (defaults to \"OFF\") settings, or \"None\"."
  required: false
  type: template
unique_id:
  description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
white_command_topic:
  description: "The MQTT topic to publish commands to change the light to white mode with a given brightness."
  required: false
  type: string
white_scale:
  description: "Defines the maximum white level (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
xy_command_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) to compose message which will be sent to `xy_command_topic`. Available variables: `x` and `y`."
  required: false
  type: template
xy_command_topic:
  description: "The MQTT topic to publish commands to change the light's XY state."
  required: false
  type: string
xy_state_topic:
  description: The MQTT topic subscribed to receive XY state updates. The expected payload is the X and Y color values separated by commas, for example, `0.675,0.322`.
  required: false
  type: string
xy_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the XY value."
  required: false
  type: template
```

:::important
请确保主题完全一致。`some-topic/` 和 `some-topic` 是不同的主题。

:::
:::note
XY 和 RGB 不能同时使用。如果两者都提供，XY 会覆盖 RGB。

:::
## 默认架构 - 示例

本节提供了一些实际使用示例。

### 亮度与 RGB 支持

要在你的安装中启用支持亮度和 RGB 的灯光，请将以下内容添加到 `configuration.yaml` 文件中：


```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      name: "Office Light RGB"
      state_topic: "office/rgb1/light/status"
      command_topic: "office/rgb1/light/switch"
      brightness_state_topic: "office/rgb1/brightness/status"
      brightness_command_topic: "office/rgb1/brightness/set"
      rgb_state_topic: "office/rgb1/rgb/status"
      rgb_command_topic: "office/rgb1/rgb/set"
      state_value_template: "{{ value_json.state }}"
      brightness_value_template: "{{ value_json.brightness }}"
      rgb_value_template: "{{ value_json.rgb | join(',') }}"
      qos: 0
      payload_on: "ON"
      payload_off: "OFF"
      optimistic: false
```


### 亮度支持但不支持 RGB

要在你的安装中启用仅支持亮度（不支持 RGB）的灯光，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      name: "Office light"
      state_topic: "office/light/status"
      command_topic: "office/light/switch"
      brightness_state_topic: 'office/light/brightness'
      brightness_command_topic: 'office/light/brightness/set'
      qos: 0
      payload_on: "ON"
      payload_off: "OFF"
      optimistic: false
```

### 无需开机命令的亮度控制

如果灯光通过发送亮度主题即可开机，请将以下内容添加到 `configuration.yaml` 文件中。在这种情况下，`command_topic` 仅用于发送关机命令：

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      name: "Brightness light"
      state_topic: "office/light/status"
      command_topic: "office/light/switch"
      payload_off: "OFF"
      brightness_state_topic: 'office/light/brightness'
      brightness_command_topic: 'office/light/brightness/set'
      on_command_type: 'brightness'
```

## 默认架构 - 实现示例

- 一个[基础示例](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light)，使用 NodeMCU 开发板（ESP8266）控制其内置 LED（开/关）。
- 另一个[示例](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light)用于控制 RGB LED（开/关、亮度和颜色）。
- 面向 ESPUrna 固件（ESP8285/ESP8266）的[集成指南](https://github.com/xoseperez/espurna/wiki/HomeAssistant)。

## JSON 架构

使用 JSON 架构的 `mqtt` 灯光平台可让你控制能够接收 [JSON](https://en.wikipedia.org/wiki/JSON) 消息的 MQTT 灯具。

该架构支持开关、亮度、RGB 颜色、XY 颜色、色温、过渡以及短/长闪烁。发送到灯具和从灯具接收的消息大致如下，未使用的字段会被省略。发送到灯具的消息中不会包含 `color_mode`。它在从灯具接收的消息中是可选的，但可用于明确灯具当前所处的模式。在下面的示例中，`color_mode` 设置为 `rgb`，因此 `color_temp`、`color.c`、`color.w`、`color.x`、`color.y`、`color.h`、`color.s` 都会被 Home Assistant 忽略：

```json
{
  "brightness": 255,
  "color_mode": "rgb",
  "color_temp": 155,
  "color": {
    "r": 255,
    "g": 180,
    "b": 200,
    "c": 100,
    "w": 50,
    "x": 0.406,
    "y": 0.301,
    "h": 344.0,
    "s": 29.412
  },
  "effect": "colorloop",
  "state": "ON",
  "transition": 2,
}
```

## JSON 架构 - 配置

理想情况下，MQTT 设备会有一个用于发布状态变化的状态主题。如果这些消息使用 RETAIN 标志发布，MQTT 灯光在订阅后会立即收到状态更新，并以正确状态启动。否则，灯光的初始状态将为关闭。

当没有状态主题时，灯光将以乐观模式运行。在该模式下，每次发送命令后灯光都会立即更新状态。否则，灯光会等待来自设备的状态确认（即来自 `state_topic` 的消息）。

即使状态主题可用，也可以强制启用乐观模式。如果灯光运行不正确，可以尝试启用该模式。

要在你的安装中使用 MQTT JSON 灯光，请[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      command_topic: "home/rgb1/set"
```

此外，也可以通过更高级的 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 方式进行设置。

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
brightness:
  description: Flag that defines if light supports brightness when the `rgb`, `rgbw`, or `rgbww` color mode is supported.
  required: false
  type: boolean
  default: false
brightness_scale:
  description: "Defines the maximum brightness value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
color_temp_kelvin:
  description: "When set to `true`, `command_topic` will publish color mode updates in Kelvin, and process `state_topic` will process state updates in Kelvin. By default, the `color_temp` values are converted to and from mireds."
  required: false
  type: boolean
  default: false
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `light.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
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
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    name:
      description: 'The name of the device.'
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
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
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
effect:
  description: Flag that defines if the light supports effects.
  required: false
  type: boolean
  default: false
effect_list:
  description: The list of effects the light supports.
  required: false
  type: [string, list]
flash:
  description: Flag that defines if light supports the flash feature.
  required: false
  type: boolean
  default: true
flash_time_long:
  description: The duration, in seconds, of a “long” flash.
  required: false
  type: integer
  default: 10
flash_time_short:
  description: The duration, in seconds, of a “short” flash.
  required: false
  type: integer
  default: 2
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_kelvin:
  description: The maximum color temperature in Kelvin.
  required: false
  type: integer
  default: 6535
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_kelvin:
  description: The minimum color temperature in Kelvin.
  required: false
  type: integer
  default: 2000
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT JSON Light
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
platform:
  description: Must be `light`. Only allowed and required in [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload).
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
schema:
  description: The schema to use. Must be `json` to select the JSON schema.
  required: false
  type: string
  default: basic
state_topic:
  description: 'The MQTT topic subscribed to receive state updates in a JSON-format. The JSON payload may contain the elements: `"state"`: `"ON"` the light is on, `"OFF"` the light is off, `null` the state is `unknown`; `"color_mode"`: one of the `supported_color_modes`; `"color"`: A dict with the color attributes*; `"brightness"`: The brightness; `"color_temp"`: The color temperature; `"effect"`: The effect of the light.'
  required: false
  type: string
supported_color_modes:
  description: A list of color modes supported by the light. Possible color modes are `onoff`, `brightness`, `color_temp`, `hs`, `xy`, `rgb`, `rgbw`, `rgbww`, `white`. Note that if `onoff` **or** `brightness` are used, that must be the _only_ value in the list.
  required: false
  type: list
transition:
  description: Flag that defines if light supports the transition feature.
  required: false
  type: boolean
  default: true
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
   required: false
   type: string
white_scale:
  description: "Defines the maximum white level (i.e., 100%) of the MQTT device. This is used when setting the light to white mode."
  required: false
  type: integer
  default: 255
```

*The `color` attribute dict in the JSON state payload should contain the following keys based on the `color_mode`:

- `hs`:
  - `h`: The hue value
  - `s`: The saturation value
- `xy`:
  - `x`: X color value
  - `y`: Y color value
- `rgb`:
  - `r`: Red color value
  - `g`: Green color value
  - `b`: Blue color value
- `rgbw`:
  - `r`: Red color value
  - `g`: Green color value
  - `b`: Blue color value
  - `w`: White value
- `rgbww`:
  - `r`: Red color value
  - `g`: Green color value
  - `b`: Blue color value
  - `c`: Cool white value
  - `w`: Warm white value

More details about the different colors, color modes and range values [can be found here](https://www.home-assistant.io/integrations/light/).

:::important
请确保主题完全一致。`some-topic/` 和 `some-topic` 是不同的主题。

:::
:::note
在 `state_topic` 消息中，RGB、XY 和 HSV 不能同时使用。请确保状态 MQTT 载荷的 `color` 部分中只包含一种颜色模型。

:::
## JSON 架构 - 示例

本节提供了一些实际使用示例。

### 亮度与 RGB 支持

要在你的安装中启用支持亮度和 RGB 的灯光，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/rgb1"
      command_topic: "home/rgb1/set"
      brightness: true
      supported_color_modes: ["rgb"]
```

### 亮度支持但不支持 RGB

要在你的安装中启用支持亮度但不支持颜色的灯光，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/rgb1"
      command_topic: "home/rgb1/set"
      brightness: true
      supported_color_modes: ["brightness"]
```

### 亮度比例缩放

如果灯光使用的亮度范围不是 8 位，可添加 `brightness_scale` 选项来表示“全亮”值：

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/light"
      command_topic: "home/light/set"
      brightness: true
      brightness_scale: 4095
      supported_color_modes: ["brightness"]
```

随后，Home Assistant 会在消息与设备之间自动转换其 8 位亮度值：

```json
{
  "brightness": 4095,
  "state": "ON"
}
```

### HS 颜色

如果灯光使用色相 + 饱和度作为颜色模型，请在平台配置中将 `supported_color_modes` 设置为 `["hs"]`：

```yaml
mqtt:
  - light:
      schema: json
      name: mqtt_json_hs_light
      state_topic: "home/light"
      command_topic: "home/light/set"
      supported_color_modes: ["hs"]
```

Home Assistant 要求色相值范围为 0 到 360，饱和度值范围为 0 到 100。例如，下面表示一种蓝色色调：

```json
{
  "state": "ON",
  "color_mode": "hs",
  "color": {
    "h": 24.0,
    "s": 100.0
  }
}
```

### 亮度与 RGBW 支持

要在你的安装中启用支持亮度、RGB 以及独立白光通道（RGBW）的灯光，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/rgbw1"
      command_topic: "home/rgbw1/set"
      brightness: true
      supported_color_modes: ["rgbw"]
```

## 实现示例

- 使用此平台和 ESP8266 微控制器的完整自定义灯光示例可在[这里](https://github.com/corbanmailloux/esp-mqtt-rgb-led)查看。它支持开关、亮度、过渡、RGB 颜色和闪烁。

- 还有一个从上述仓库分叉的实现，支持相同功能，但面向在 NodeMCU V3 上使用 FastLED 的可寻址 LED 灯带，可在[这里](https://github.com/JammyDodger231/nodemcu-mqtt-rgb-led)查看。

- [McLighting](https://github.com/toblum/McLighting) 是另一个面向 WS2812 可寻址 LED 的 ESP8266 固件。

- [MQTT JSON Light](https://github.com/mertenats/Open-Home-Automation/tree/master/ha_mqtt_rgbw_light_with_discovery) 是另一个用于 ESP8266 的实现，并包含 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery)。

- [ESPHome](https://esphome.io) 为基于 MQTT 的安装实现了 JSON 架构，并支持 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery)。

- [AiLight](https://github.com/stelgenhof/AiLight) 是用于 Ai-Thinker（及同类）RGBW WiFi 灯泡的自定义固件，设备内置 ESP8266 并由 MY9291 LED 驱动控制。它实现了 [MQTT JSON light](/home-assistant/integrations/light.mqtt) 平台，支持开关、RGBW 颜色、亮度、色温、闪烁和过渡。同时还包含 [MQTT Auto Discovery](/home-assistant/integrations/mqtt/#mqtt-discovery)，并启用了 MQTT 遗嘱消息（LWT）。

- [h801-mqtt-json](https://github.com/starkillerOG/h801-mqtt-json) 是面向 H801 LED 调光器的自定义固件。H801 是一款 5 通道（RGBWWCW）的 12V WiFi 灯带控制器。该固件用于控制 H801 的 5 个通道，可同时控制 RGB 灯带和暖白/冷白灯带，例如 5050 RGB 灯带与 5025 双白灯带。它实现了 [MQTT JSON light](/home-assistant/integrations/light.mqtt) 平台，支持开关、RGB 颜色（RGB 灯带）、亮度、色温（冷白/暖白灯带）和过渡。

## 模板架构

使用模板架构的 `mqtt` 灯光平台，可让你控制支持 MQTT 的灯具。设备在命令主题上接收命令，并可选地在状态主题上发送状态更新。
该架构与数据格式无关，因此你可以使用任意数据格式（如字符串、JSON），只需通过模板进行配置。

该架构支持开关、亮度、RGB 颜色、XY 颜色、HS 颜色、色温、过渡、短/长闪烁和效果。

## 模板架构 - 配置

在理想情况下，MQTT 设备会有一个用于发布状态变化的状态主题。如果这些消息以 RETAIN 标志发布，MQTT 灯光在订阅后会立即收到状态更新，并以正确状态启动。否则，灯光初始状态为关闭。

当没有状态主题时，灯光将以乐观模式运行。在该模式下，每次发送命令后灯光会立即更新状态。否则，灯光会等待来自设备（`state_topic` 消息）的状态确认。

即使已配置状态主题，也可以强制启用乐观模式。如果灯光运行不正确，可尝试启用。

要在你的安装中使用 MQTT 模板灯光，请[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      command_topic: "home/rgb1/set"
      command_on_template: "on"
      command_off_template: "off"
```

此外，更高级的方式是通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

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
blue_template:
  description: "[Template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract blue color from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
brightness_template:
  description: "[Template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract brightness from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
color_temp_kelvin:
  description: "When set to `true`, `command_topic` will publish color mode updates in Kelvin and process `state_topic` will process state updates in Kelvin. When not set the `color_temp` values are converted to mireds."
  required: false
  type: boolean
  default: false
color_temp_template:
  description: "[Template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract color temperature from the state payload value. Expected result of the template is an integer. If `color_temp_kelvin` is `true` the expected value is in Kelvin else mireds are expected."
  required: false
  type: template
command_off_template:
  description: "The [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) for *off* state changes. Available variables: `state` and `transition`."
  required: true
  type: template
command_on_template:
  description: "The [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) for *on* state changes. Available variables: `state`, `brightness`, `color_temp`, `red`, `green`, `blue`, `hue`, `sat`, `flash`, `transition` and `effect`. Values `red`, `green`, `blue`, `brightness` are provided as integers from range 0-255. Value of `hue` is provided as float from range 0-360. Value of `sat` is provided as float from range 0-100. Value of `color_temp` is provided as integer representing mired or Kelvin units if `color_temp_kelvin` is `true`."
  required: true
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `light.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
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
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    name:
      description: 'The name of the device.'
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
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
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
effect_list:
  description: 可用效果列表。
  required: false
  type: [string, list]
effect_template:
  description: "[Template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract effect from the state payload value."
  required: false
  type: template
green_template:
  description: "[Template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract green color from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_kelvin:
  description: The maximum color temperature in Kelvin.
  required: false
  type: integer
  default: 6535
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_kelvin:
  description: The minimum color temperature in Kelvin.
  required: false
  type: integer
  default: 2000
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: 灯光名称。
  required: false
  type: string
  default: MQTT Template Light
optimistic:
  description: 定义灯光是否以乐观模式工作。
  required: false
  type: boolean
  default: "`true` if no state topic or state template is defined, else `false`."
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
platform:
  description: Must be `light`. Only allowed and required in [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
red_template:
  description: "用于从状态载荷中提取红色值的[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)。模板预期返回 0-255 范围内的整数。"
  required: false
  type: template
schema:
  description: 要使用的架构。选择模板架构时必须为 `template`。
  required: false
  type: string
  default: basic
state_template:
  description: "用于从状态载荷中提取状态值的[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)。"
  required: false
  type: template
state_topic:
  description: 订阅以接收状态更新的 MQTT 主题。载荷为 "None" 时会重置为 `unknown` 状态。空载荷会被忽略。
  required: false
  type: string
unique_id:
  description: 用于唯一标识此灯光的 ID。如果两个灯光使用相同的唯一 ID，Home Assistant 会抛出异常。与基于设备的发现一起使用时为必填项。
  required: false
  type: string
```

:::important
确保你的主题完全匹配。`some-topic/` 和 `some-topic` 是不同的主题。

:::
## 模板架构 - 示例

本节提供一些此灯光的实际使用示例。

### 简单字符串载荷

如果使用格式为 `state,brightness,r-g-b,h-s` 的简单字符串载荷（例如 `on,255,255-255-255,360-100`），请将以下内容添加到 "`configuration.yaml`" 文件中：


```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      command_topic: "home/rgb1/set"
      state_topic: "home/rgb1/status"
      command_on_template: "on,{{ brightness|d }},{{ red|d }}-{{ green|d }}-{{ blue|d }},{{ hue|d }}-{{ sat|d }}"
      command_off_template: "off"
      state_template: "{{ value.split(',')[0] }}"  # must return `on` or `off`
      brightness_template: "{{ value.split(',')[1] }}"
      red_template: "{{ value.split(',')[2].split('-')[0] }}"
      green_template: "{{ value.split(',')[2].split('-')[1] }}"
      blue_template: "{{ value.split(',')[2].split('-')[2] }}"
```


### JSON 载荷

如果使用格式为 `{"state": "on", "brightness": 255, "color": [255, 255, 255], "effect": "rainbow"}` 的 JSON 载荷，请将以下内容添加到 "`configuration.yaml`" 文件中：


```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      effect_list:
        - rainbow
        - colorloop
      command_topic: "home/rgb1/set"
      state_topic: "home/rgb1/status"
      command_on_template: >
        {"state": "on"
        {%- if brightness is defined -%}
        , "brightness": {{ brightness }}
        {%- endif -%}
        {%- if red is defined and green is defined and blue is defined -%}
        , "color": [{{ red }}, {{ green }}, {{ blue }}]
        {%- endif -%}
        {%- if hue is defined and sat is defined -%}
        , "huesat": [{{ hue }}, {{ sat }}]
        {%- endif -%}
        {%- if effect is defined -%}
        , "effect": "{{ effect }}"
        {%- endif -%}
        }
      command_off_template: '{"state": "off"}'
      state_template: '{{ value_json.state }}'
      brightness_template: '{{ value_json.brightness }}'
      red_template: '{{ value_json.color[0] }}'
      green_template: '{{ value_json.color[1] }}'
      blue_template: '{{ value_json.color[2] }}'
      effect_template: '{{ value_json.effect }}'
```


### CCT 灯光（亮度和色温）

此示例来自 Shelly RGBW 灯泡在白光模式下的配置。
`max_mireds` 和 `min_mireds` 将色温边界设置为 3000K 到 6500K。请注意，`command_on_template` 中也应用了相同限制，但这次使用的是开尔文单位。这是因为 mired 到开尔文的转换可能导致结果超出设备可接受范围。
该配置还确保亮度在 0-100（设备要求）和 0-255（Home Assistant 要求）之间进行双向转换。
将以下内容添加到 "`configuration.yaml`" 文件中：


```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      name: "Bulb-white"
      command_topic: "shellies/bulb/color/0/set"
      state_topic: "shellies/bulb/color/0/status"
      availability_topic: "shellies/bulb/online"
      command_on_template: >
        {"turn": "on", "mode": "white"
        {%- if brightness is defined -%}
        , "brightness": {{brightness | float | multiply(0.39215686) | round(0)}}
        {%- endif -%}
        {%- if color_temp is defined -%}
        , "temp": {{ [[(1000000 / color_temp | float) | round(0), 3000] | max, 6500] | min }}
        {%- endif -%}
        }
      command_off_template: '{"turn":"off", "mode": "white"}'
      state_template: "{% if value_json.ison and value_json.mode == 'white' %}on{% else %}off{% endif %}"
      brightness_template: "{{ value_json.brightness | float | multiply(2.55) | round(0) }}"
      color_temp_template: "{{ (1000000 / value_json.temp | float) | round(0) }}"
      payload_available: "true"
      payload_not_available: "false"
      max_mireds: 334
      min_mireds: 153
      qos: 1
      retain: false
      optimistic: false
```


### 模板架构 - 不支持亮度或颜色

如果你不需要亮度、颜色或效果支持，只需省略对应的配置部分。
