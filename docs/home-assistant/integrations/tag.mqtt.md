---
title: "MQTT tag scanner"
description: 'The MQTT tag scanner integration uses an MQTT message payload to generate tag scanned events. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Tag scanner
ha_release: 0.116
ha_iot_class: Configurable
ha_domain: mqtt
---
# MQTT tag scanner

The **MQTT tag scanner** integration uses an MQTT message payload to generate tag scanned events.

## Configuration

仅通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 支持 MQTT 扫描仪，不支持通过 `configuration.yaml` 进行手动设置。
发现主题必须是：`<discovery_prefix>/tag/[<node_id>/]<object_id>/config`。

```yaml
topic:
  description: The MQTT topic subscribed to receive tag scanned events.
  required: true
  type: string
value_template:
  description: "Defines a [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) that returns a tag ID."
  required: false
  type: template
device:
  description: "Information about the device this device trigger is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). At least one of identifiers or connections must be present to identify the device."
  required: true
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
```

## Examples

在本节中，您将找到一些如何使用该传感器的现实示例。

### 完整配置，包含从 JSON 数据中提取的标签 ID

这是一个配置示例，其中标签 ID 是从 JSON 格式的 MQTT 消息中提取的。
为了进行测试，您可以使用“mosquitto”或“mosquitto-clients”包附带的命令行工具“mosquitto_pub”来发送 MQTT 消息。

发现标签扫描仪：


```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/tag/0AFFD2/config -m '{"topic": "0AFFD2/tag_scanned", "value_template": "{{ value_json.PN532.UID }}"}'
```


生成标签扫描事件：


```bash
mosquitto_pub -h 127.0.0.1 -t 0AFFD2/tag_scanned -m '{"Time":"2020-09-28T17:02:10","PN532":{"UID":"E9F35959", "DATA":"ILOVETASMOTA"}}'
```


