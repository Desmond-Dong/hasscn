---
title: "MQTT Image"
description: "关于如何在 Home Assistant 中将 MQTT 图像消息用作图像的说明。"
ha_category:
  - Image
ha_release: 2023.7
ha_iot_class: Configurable
ha_domain: mqtt
---

**MQTT Image** 集成允许您将通过 MQTT 发送的图像文件内容集成到 Home Assistant 中作为图像。
`image` 平台是 `camera` 平台的简化版本，仅接受图像。
每次在配置中的 `image_topic` 下收到消息时，Home Assistant 中显示的图像也会更新。在 `image_topic` 上收到的消息应包含图像文件的完整内容，例如 JPEG 图像，不带任何额外的编码或元数据。

这可以与能够通过 MQTT 发送图像的应用程序或服务一起使用。

另一种设置是使用 `url_topic` 选项来接收新图片的图像 URL。

## 配置

要在您的系统中使用 MQTT 图像实体，请[将 MQTT 设备添加为子条目](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
mqtt:
  - image:
      url_topic: mynas/status/url
```

或者，更高级的方法是通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery)进行设置。

```yaml
availability:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题列表。不得与 `availability_topic` 一起使用。
  required: false
  type: list
  keys:
    payload_available:
      description: 表示可用状态的载荷。
      required: false
      type: string
      default: online
    payload_not_available:
      description: 表示不可用状态的载荷。
      required: false
      type: string
      default: offline
    topic:
      description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。
      required: true
      type: string
    value_template:
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `topic` 中提取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
      required: false
      type: template
availability_mode:
  description: 当配置 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目是 `all`、`any` 和 `latest`。如果设置为 `all`，必须在所有配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `any`，必须至少在一个配置的可用性主题上收到 `payload_available` 才能将实体标记为在线。如果设置为 `latest`，则最后在任何配置的可用性主题上收到的 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `availability_topic` 中提取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
  required: false
  type: template
availability_topic:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。不得与 `availability` 一起使用。
  required: false
  type: string
content_type:
  description: 在 `image_topic` 上收到的图像数据消息的内容类型。此选项不能与 `url_topic` 一起使用，因为内容类型是在下载图像时派生的。
  required: false
  type: string
  default: image/jpeg
default_entity_id:
  description: 使用 `default_entity_id` 代替名称自动生成实体 ID。例如，`image.foobar`。当不使用 `unique_id` 时，如果实体 ID 可用，则会在重启或重新加载期间更新。如果实体 ID 已存在，则会在末尾创建带数字的实体 ID。当与 `unique_id` 一起使用时，`default_entity_id` 仅在首次添加实体时使用。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: "有关此图像所属设备的信息，以将其绑定到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅通过 [MQTT 发现](/home-assistant/integrations/mqtt/#mqtt-discovery)并且在设置 [`unique_id`](#unique_id) 时有效。必须至少存在标识符或连接之一来识别设备。"
  required: false
  type: map
  keys:
    configuration_url:
      description: '可以管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
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
      description: '在此设备与 Home Assistant 之间路由消息的设备的标识符。此类设备的示例是集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收的载荷的编码。设置为 `""` 以禁用传入载荷的解码。使用 `image_encoding` 在 `image_topic` 上启用 `Base64` 解码。
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
  description: 接收的图像载荷的编码。设置为 `"b64"` 以启用图像载荷的 base64 解码。如果未设置，图像载荷必须是原始二进制数据。
  required: false
  type: string
image_topic:
  description: 订阅以接收要下载的图像的图像载荷的 MQTT 主题。确保 `content_type` 类型选项设置为相应的内容类型。此选项不能与 `url_topic` 选项一起使用。但至少需要其中一个选项。
  required: exclusive
  type: string
json_attributes_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `json_attributes_topic` 上收到的消息中提取 JSON 字典。
  required: false
  type: template
json_attributes_topic:
  description: 订阅以接收 JSON 字典载荷然后设置为传感器属性的 MQTT 主题。意味着当在此主题上收到消息时 `force_update` 当前传感器状态。
  required: false
  type: string
name:
  description: 图像的名称。如果只有设备名称相关，可以设置为 `null`。
  required: false
  type: string
unique_id:
  description: 唯一标识此图像的 ID。如果两个图像具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时必需。
  required: false
  type: string
url_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从 `url_topic` 收到的消息中提取图像 URL。
  required: false
  type: template
url_topic:
  description: 订阅以接收图像 URL 的 MQTT 主题。`url_template` 选项可以从消息中提取 URL。`content_type` 将在下载图像时从图像中派生。此选项不能与 `image_topic` 选项一起使用，但至少需要其中一个选项。
  required: exclusive
  type: string
```

### 从 URL 接收图像的示例

将以下配置添加到您的 "`configuration.yaml`" 中。

要从控制台测试，请将图像 URL 发布到主题：

```bash
mosquitto_pub -h <mqtt_broker> -t mynas/status/url -m "https://design.home-assistant.io/images/logo.png"
```


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - image:
      url_topic: mynas/status/url
```


### 从文件接收图像的示例

将以下配置添加到您的 "`configuration.yaml`" 中。

要测试它，请从控制台将图像 URL 发布到主题：

```bash
mosquitto_pub -h <mqtt_broker> -t mynas/status/file -f <logo.png>
```


```yaml
# 示例 configuration.yaml 条目
mqtt:
  - image:
      image_topic: mynas/status/file
      content_type: image/png
```

