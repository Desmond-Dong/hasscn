---
title: "MQTT 设备触发器"
description: 'MQTT 设备触发器 集成使用 MQTT 消息负载来生成设备触发器事件。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Device automation
ha_release: 0.106
ha_iot_class: Configurable
ha_domain: mqtt
---
# MQTT 设备触发器

**MQTT 设备触发器** 集成使用 MQTT 消息负载来生成设备触发器事件。

对于按钮、遥控器等设备，MQTT 设备触发器比 [binary sensor](/home-assistant/integrations/binary_sensor.mqtt/) 是更好的选择。

## 配置

MQTT 设备触发器仅支持通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行配置，不支持通过 `configuration.yaml` 手动设置。
发现主题必须为：`<discovery_prefix>/device_automation/[<node_id>/]<object_id>/config`。请注意，每个唯一的发现主题只能定义一个触发器。同时还要注意，对于同一设备，`type` 和 `subtype` 的组合应保持唯一。

```yaml
automation_type:
  description: 自动化类型，必须为 `trigger`。
  required: true
  type: string
payload:
  description: 可选负载，用于匹配通过该主题发送的负载。
  required: false
  type: string
platform:
  description: 必须为 `device_automation`。仅在 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload) 中允许且必填。
  required: true
  type: string
qos:
  description: 接收和发布消息时要使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
topic:
  description: 用于接收触发器事件的 MQTT 订阅主题。
  required: true
  type: string
type:
  description: "触发器类型，例如 `button_short_press`。前端支持的条目包括：`button_short_press`、`button_short_release`、`button_long_press`、`button_long_release`、`button_double_press`、`button_triple_press`、`button_quadruple_press`、`button_quintuple_press`。如果设置为不受支持的值，将显示为 `subtype type`，例如当 `type` 为 `spammed` 且 `subtype` 为 `button_1` 时，会显示为 `button_1 spammed`"
  required: true
  type: string
subtype:
  description: "触发器的子类型，例如 `button_1`。前端支持的条目包括：`turn_on`、`turn_off`、`button_1`、`button_2`、`button_3`、`button_4`、`button_5`、`button_6`。如果设置为不受支持的值，将显示为 `subtype type`，例如当 `type` 为 `button_short_press` 且 `subtype` 为 `left_button` 时，会显示为 `left_button pressed`"
  required: true
  type: string
device:
  description: "此设备触发器所属设备的信息，用于将其关联到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。必须至少提供 `identifiers` 或 `connections` 之一来标识设备。"
  required: true
  type: map
  keys:
    configuration_url:
      description: '指向可管理该设备配置的网页链接。可以是 `http://`、`https://`，或内部 `homeassistant://` URL。'
      required: false
      type: string
    connections:
      description: '设备与外部世界连接方式的列表，格式为元组列表 `[connection_type, connection_identifier]`。例如网络接口的 MAC 地址：`"connections": [["mac", "02:5b:26:a8:dc:12"]]`。'
      required: false
      type: list
    identifiers:
      description: 唯一标识设备的 ID 列表，例如序列号。
      required: false
      type: [list, string]
    manufacturer:
      description: 设备制造商。
      required: false
      type: string
    model:
      description: 设备型号。
      required: false
      type: string
    model_id:
      description: 设备的型号标识符。
      required: false
      type: string
    name:
      description: 设备名称。
      required: false
      type: string
    serial_number:
      description: "设备的序列号。"
      required: false
      type: string
    suggested_area:
      description: '如果设备尚未分配区域，则建议一个区域。'
      required: false
      type: string
    sw_version:
      description: 设备固件版本。
      required: false
      type: string
    via_device:
      description: '在该设备与 Home Assistant 之间转发消息的设备标识符。这类设备的示例包括 hub，或子设备的父设备。此项用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
value_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)来提取值。"
  required: false
  type: template
```

### 示例

下面展示了一个完整示例：定义一个遥控器类型设备，并包含两个触发器：“left arrow click”和“right arrow click”。

请注意，不需要在每条消息中都提供完整的设备信息，但用于标识设备的信息（本示例中的 `identifier`）必须保持一致。

#### Left arrow click 配置

- 发现主题：`homeassistant/device_automation/0x90fd9ffffedf1266/action_arrow_left_click/config`
- 发现负载：

  ```json
  {
      "automation_type": "trigger",
      "type": "action",
      "subtype": "arrow_left_click",
      "payload": "arrow_left_click",
      "topic": "zigbee2mqtt/0x90fd9ffffedf1266/action",
      "device": {
          "identifiers": [
              "zigbee2mqtt_0x90fd9ffffedf1266"
          ],
          "name": "0x90fd9ffffedf1266",
          "sw_version": "Zigbee2MQTT 1.14.0",
          "model": "TRADFRI remote control (E1524/E1810)",
          "manufacturer": "IKEA"
      }
  }
  ```

- 触发主题：`zigbee2mqtt/0x90fd9ffffedf1266/action`
- 触发负载：`arrow_left_click`

#### Right arrow click 配置

- 发现主题：`homeassistant/device_automation/0x90fd9ffffedf1266/action_arrow_right_click/config`
- 发现负载：

  ```json
  {
      "automation_type": "trigger",
      "type": "action",
      "subtype": "arrow_right_click",
      "payload": "arrow_right_click",
      "topic": "zigbee2mqtt/0x90fd9ffffedf1266/action",
      "device": {
          "identifiers": [
              "zigbee2mqtt_0x90fd9ffffedf1266"
          ]
      }
  }   
  ```

- 触发主题：`zigbee2mqtt/0x90fd9ffffedf1266/action`
- 触发负载：`arrow_right_click`
