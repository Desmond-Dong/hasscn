# MQTT Sensor

**MQTT Sensor** 集成使用 MQTT 消息负载作为传感器值。如果此 `state_topic` 中的消息以 *RETAIN* 标志发布，传感器会立即收到最后一次已知值的更新。否则，初始状态将是未定义的。

## 配置

要在您的安装中使用 MQTT 传感器，请[将 MQTT 设备添加为子条目](/home-assistant/integrations/mqtt/index.md#configuration)，或将以下内容添加到您的 `configuration.yaml` 文件中。
更改 `configuration.yaml` 文件后，请[重启 Home Assistant](/home-assistant/docs/configuration/index.md#reloading-the-configuration-to-apply-changes) 以应用更改。

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "Bedroom Temperature"
      state_topic: "home/bedroom/temperature"
```

或者，更高级的方法是通过 [MQTT discovery](/home-assistant/integrations/mqtt/index.md#mqtt-discovery) 进行设置。

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
  description: The MQTT topic subscribed to receive availability (online/offline) updates.
  required: false
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `sensor.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Information about the device this sensor is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/device_registry_index/). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
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
device_class:
  description: The [type/class](/home-assistant/integrations/sensor/#device-class) of the sensor to set the icon in the frontend. The `device_class` can be `null`.
  required: false
  type: device_class
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity. When set, the entity category must be `diagnostic` for sensors.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
expire_after:
  description: If set, it defines the number of seconds after the sensor's state expires if it's not updated. After expiry, the sensor's state becomes `unavailable`. Default the sensors state never expires. By default, the sensor's state never expires. Note that when a sensor's value was sent retained to the MQTT broker, the last value sent will be replayed by the MQTT broker when Home Assistant restarts or is reloaded. As this could cause the sensor to become available with an expired state, it is not recommended to retain the sensor's state payload at the MQTT broker. Home Assistant will store and restore the sensor's state for you and calculate the remaining time to retain the sensor's state before it becomes unavailable.
  required: false
  type: integer
  default: 0
force_update:
  description: Sends update events even if the value hasn't changed. Useful if you want to have meaningful value graphs in history.
  required: false
  type: boolean
  default: false
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies `force_update` of the current sensor state when a message is received on this topic.
  required: false
  type: string
last_reset_value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the last_reset. When `last_reset_value_template` is set, the `state_class` option must be `total`. Available variables: `entity_id`. The `entity_id` can be used to reference the entity's attributes."
  required: false
  type: template
name:
  description: The name of the MQTT sensor. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Sensor
options:
  description: List of allowed sensor state value. An empty list is not allowed. The sensor's `device_class` must be set to `enum`. The `options` option cannot be used together with `state_class` or `unit_of_measurement`.
  required: false
  type: list
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
  description: Must be `sensor`. Only allowed and required in [MQTT auto discovery device messages](/home-assistant/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
suggested_display_precision:
  description: The number of decimals which should be used in the sensor's state after rounding.
  required: false
  type: integer
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
state_class:
  description: The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor.
  required: false
  type: string
state_topic:
  description: The MQTT topic subscribed to receive sensor values. If `device_class`, `state_class`, `unit_of_measurement` or `suggested_display_precision` is set, and a numeric value is expected, an empty value `''` will be ignored and will not update the state, a `'None'` value will set the sensor to an `unknown` state. If a `value_template` is used to parse a JSON payload, a `null` value in the JSON [will be rendered as](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) `'None'`. Note that the `device_class` can be `null`.
  required: true
  type: string
unique_id:
  description: "An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery."
  required: false
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any. The `unit_of_measurement` can be `null`.
  required: false
  type: string
value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the value. If the template throws an error, the current state will be used instead."
  required: false
  type: template
```

## 示例

在本节中，您将找到一些展示如何使用此传感器的现实示例。

### 处理 Unix EPOCH 时间戳

下面的示例显示了 MQTT 传感器如何处理 Unix EPOCH 有效负载。

通过 YAML 设置：

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "turned on"
      state_topic: "pump/timestamp_on"
      device_class: "timestamp"
      value_template: "{{ as_datetime(value) }}"
      unique_id: "hp_1231232_ts_on"
      device:
        name: "Heat pump"
        identifiers:
          - "hp_1231232"
```

或者通过 MQTT 发现进行设置：

发现主题：`homeassistant/sensor/hp_1231232/config`

```json
{
  "name": "turned on",
  "state_topic": "pump/timestamp_on",
  "device_class": "timestamp",
  "value_template": "{{ as_datetime(value) }}",
  "unique_id": "hp_1231232_ts_on",
  "device": {
    "name": "Heat pump",
    "identifiers": [
      "hp_1231232"
    ]
  }
}
```

为了进行测试，您可以使用“mosquitto”或“mosquitto-clients”包附带的命令行工具“mosquitto\_pub”来发送 MQTT 消息。

有效负载主题：`pump/timestamp_on`
有效负载：`1707294116`

手动设置传感器的状态：

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -u username -P some_password -t pump/timestamp_on -m '1707294116'
```

确保使用 MQTT 代理的 IP 地址并且已正确设置用户凭据。

`value_template` 会将 Unix EPOCH 时间戳呈现为正确的格式：`2024-02-07 08:21:56+00:00`。

### JSON 属性主题配置

下面的示例传感器显示了一个配置示例，它使用以下单独的主题和 JSON 结构来添加额外的属性。

主题：`home/sensor1/attributes`

```json
{
   "ClientName": <string>,
   "IP": <string>,
   "MAC": <string>,
   "RSSI": <string>,
   "HostName": <string>,
   "ConnectedSSID": <string>
}
```

它还使用了 `availability` 主题。

额外属性会显示在前端中，也可以在[模板](/home-assistant/docs/configuration/templating/index.md#attributes)中提取。例如，要从下面的传感器提取 `ClientName` 属性，可使用类似这样的模板：`{{ state_attr('sensor.bs_rssi', 'ClientName') }}`。

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "RSSI"
      state_topic: "home/sensor1/infojson"
      unit_of_measurement: "dBm"
      value_template: "{{ value_json.RSSI }}"
      availability:
        - topic: "home/sensor1/status"
      payload_available: "online"
      payload_not_available: "offline"
      json_attributes_topic: "home/sensor1/attributes"
```

### JSON 属性模板配置

下面的示例传感器显示了一个配置示例，该示例使用以下主题和 JSON 结构以及模板来添加“Timer1.Arm”和“Timer1.Time”作为额外属性。

主题：`tele/sonoff/sensor`

```json
{
    "Timer1": {
        "Arm": <status>,
        "Time": <time>
    },
    "Timer2": {
        "Arm": <status>,
        "Time": <time>
    }
}
```

如果只想将 `Timer1.Arm` 作为额外属性添加，请将 `json_attributes_template` 改为：`"{{ {'Arm': value_json.Timer1} | tojson }}"`。

额外属性会显示在前端中，也可以在[模板](/home-assistant/docs/configuration/templating/index.md#attributes)中提取。例如，要从下面的传感器提取 `Arm` 属性，可使用类似这样的模板：`{{ state_attr('sensor.timer1', 'Arm') }}`。

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "Timer 1"
      state_topic: "tele/sonoff/sensor"
      value_template: "{{ value_json.Timer1.Arm }}"
      json_attributes_topic: "tele/sonoff/sensor"
      json_attributes_template: "{{ value_json.Timer1 | tojson }}"

    - name: "Timer 2"
      state_topic: "tele/sonoff/sensor"
      value_template: "{{ value_json.Timer2.Arm }}"
      json_attributes_topic: "tele/sonoff/sensor"
      json_attributes_template: "{{ value_json.Timer2 | tojson }}"
```

:::warning
如果 `json_attributes_topic` 和 `state_topic` 使用同一个主题，则状态更新只会发生一次，除非该次状态更新没有改变状态，或者 `force_update` 被设置为 `true`。

不建议为 MQTT 传感器配置会在每次更新时变化的额外状态属性（例如时间戳），也不建议启用 `force_update` 选项，因为这会在每次更新时触发状态写入，严重影响整体系统性能。更好的做法是改为创建独立的传感器。

:::

### 在模板中使用 `entity_id`

下面的示例显示了如何在模板中实现一个简单的过滤器，该过滤器通过添加 90% 的新值和 10% 的先前值来计算值。

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "Temp 1"
      state_topic: "sensor/temperature"
      value_template: |-
        {% if states(entity_id) == None %}
          {{ value | round(2) }}
        {% else %}
          {{ value | round(2) * 0.9 + states(entity_id) * 0.1 }}
        {% endif %}
```

### OwnTracks 电池电量传感器

如果您使用 [OwnTracks](/home-assistant/integrations/owntracks.md) 并启用电池电量报告，那么您可以使用 MQTT 传感器来跟踪电池。来自 OwnTracks 的常规 MQTT 消息如下所示：

Topic: `owntracks/tablet/tablet`

```json
{
    "_type": "location",
    "lon": 7.21,
    "t": "u",
    "batt": 92,
    "tst": 144995643,
    "tid": "ta",
    "acc": 27,
    "lat": 46.12
} 
```

因此，诀窍是从有效负载中提取电池电量。

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "Battery Tablet"
      state_topic: "owntracks/tablet/tablet"
      unit_of_measurement: "%"
      value_template: "{{ value_json.batt }}"
```

### 温度和湿度传感器

如果您使用 DHT 传感器和 NodeMCU 板 (esp8266)，则可以使用 MQTT 传感器检索温度和湿度。可以在[此处](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_sensor_dht22)找到代码示例。此示例中的常规 MQTT 消息如下所示：

Topic: `office/sensor1`

```json
  {
    "temperature": 23.20,
    "humidity": 43.70
  }
```

然后使用此配置示例从有效负载中提取数据：

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "Temperature"
      state_topic: "office/sensor1"
      suggested_display_precision: 1
      unit_of_measurement: "°C"
      value_template: "{{ value_json.temperature }}"
    - name: "Humidity"
      state_topic: "office/sensor1"
      unit_of_measurement: "%"
      value_template: "{{ value_json.humidity }}"
```

### 使用 ESPEasy 从设备获取传感器值

假设您已经为 ESP8266 设备刷入了 [ESPEasy](https://github.com/letscontrolit/ESPEasy)。在 “Config” 中为您的设备设置一个名称（“Unit Name:”）（这里使用 “bathroom”）。同时配置一个使用 “OpenHAB MQTT” 协议的 MQTT “Controller”，并根据需要调整相关条目（“Controller Subscribe:” 和 “Controller Publish:”）。本示例中的主题以前缀 `home` 开头。请注意，ESPEasy 的默认主题以 `/` 开头，并且在为 `configuration.yaml` 编写配置项时只包含名称。

* **控制器订阅**：`home/%sysname%/#`（而不是`/%sysname%/#`）
* **控制器发布**：`home/%sysname%/%tskname%/%valname%`（而不是`/%sysname%/%tskname%/%valname%`）

另外，在“设备”点击中添加一个传感器，名称为“模拟”，值为“亮度”。

一旦设备在线，您将获得传感器的状态。

```bash
home/bathroom/status Connected
...
home/bathroom/analog/brightness 290.00
```

配置将如下例所示：

```yaml
# Example configuration.yaml entry
mqtt:
  sensor:
    - name: "Brightness"
      state_topic: "home/bathroom/analog/brightness"
```
