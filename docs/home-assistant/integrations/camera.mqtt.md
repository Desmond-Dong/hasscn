---
title: "MQTT Camera"
description: 'MQTT 摄像头集成允许您将通过 MQTT 发送的图像文件内容作为摄像头集成到 Home Assistant 中。每次收到配置中 topic 下的消息时，Home Assistant 中显示的图像也会更新。在 topic 上收到的消息应包含图像文件的完整内容，例如 JPEG 图像，不含任何额外编码或元数据。'
ha_category:
  - Camera
ha_release: 0.43
ha_iot_class: Configurable
ha_domain: mqtt
---
# MQTT Camera

**MQTT 摄像头**集成允许您将通过 MQTT 发送的图像文件内容作为摄像头集成到 Home Assistant 中。每次收到配置中 `topic` 下的消息时，Home Assistant 中显示的图像也会更新。在 `topic` 上收到的消息应包含图像文件的完整内容，例如 JPEG 图像，不含任何额外编码或元数据。

这可以与能够通过 MQTT 发送图像的应用程序或服务一起使用。

## 配置

要在您的系统中使用 MQTT 摄像头，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - camera:
      topic: zanzito/shared_locations/my-device
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

上面的示例配置可以通过从控制台向主题发布图像来测试：

```bash
mosquitto_pub -h <mqtt_broker> -t zanzito/shared_locations/my-device -f <camera_imaga.jpg>
```

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
  description: 当配置了 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目为 `all`、`any` 和 `latest`。如果设置为 `all`，则必须在所有配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `any`，则必须至少在一个配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `latest`，则最后在任何配置的可用性主题上收到的 `payload_available` 或 `payload_not_available` 控制可用性。
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
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如，`camera.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则实体 ID 将在重启或重新加载期间更新。如果实体 ID 已存在，则将创建带有数字后缀的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此摄像头所属设备的信息，以将其关联到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置了 [`unique_id`](#unique_id) 时有效。必须至少存在 identifiers 或 connections 之一来识别设备。"
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
      description: 设备的硬件版本。
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
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收的负载编码。设置为 `""` 以禁用传入负载的解码。使用 `image_encoding` 在 `topic` 上启用 `Base64` 解码。
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
image_encoding:
  description: 接收的图像负载编码。设置为 `"b64"` 以启用图像负载的 base64 解码。如果未设置，图像负载必须是原始二进制数据。
  required: false
  type: string
json_attributes_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典负载并设置为传感器属性的 MQTT 主题。暗示当在此主题上收到消息时 `force_update` 当前传感器状态。
  required: false
  type: string
name:
  description: 摄像头的名称。如果只有设备名称相关，可以设置为 `null`。
  required: false
  type: string
topic:
  description: 要订阅的 MQTT 主题。
  required: true
  type: string
unique_id:
  description: 唯一标识此摄像头的 ID。如果两个摄像头具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时是必需的。
  required: false
  type: string
```
