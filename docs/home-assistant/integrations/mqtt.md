---
title: MQTT
description: 'MQTT（又称 MQ 遥测传输）是一种基于 TCP/IP 的机器对机器或"物联网"连接协议。它允许极其轻量级的发布/订阅消息传输。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Hub
  - Update
featured: true
ha_release: pre 0.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@emontnemery'
  - '@jbouwh'
  - '@bdraco'
ha_domain: mqtt
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - device_tracker
  - diagnostics
  - event
  - fan
  - humidifier
  - image
  - lawn_mower
  - light
  - lock
  - notify
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - tag
  - tag
  - text
  - update
  - vacuum
  - valve
  - water_heater
ha_integration_type: service
ha_quality_scale: platinum
---
# MQTT

MQTT（又称 MQ 遥测传输）是一种基于 TCP/IP 的机器对机器或"物联网"连接协议。它允许极其轻量级的发布/订阅消息传输。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

MQTT 设备和实体可以通过 [MQTT 发现](#mqtt-discovery) 设置，或通过 YAML 或子条目[手动添加](#manual-configured-mqtt-items)。

<a name="configuration-via-mqtt-discovery"></a>
<details>
<summary>通过 MQTT 发现配置 MQTT 组件</summary>


- [报警控制面板](/home-assistant/integrations/alarm_control_panel.mqtt/)
- [二值传感器](/home-assistant/integrations/binary_sensor.mqtt/)
- [按钮](/home-assistant/integrations/button.mqtt/)
- [摄像头](/home-assistant/integrations/camera.mqtt/)
- [遮盖](/home-assistant/integrations/cover.mqtt/)
- [温控（HVAC）](/home-assistant/integrations/climate.mqtt/)
- [设备追踪器](/home-assistant/integrations/device_tracker.mqtt/)
- [设备触发器](/home-assistant/integrations/device_trigger.mqtt/)
- [事件](/home-assistant/integrations/event.mqtt/)
- [风扇](/home-assistant/integrations/fan.mqtt/)
- [加湿器](/home-assistant/integrations/humidifier.mqtt/)
- [图像](/home-assistant/integrations/image.mqtt/)
- [割草机](/home-assistant/integrations/lawn_mower.mqtt/)
- [灯光](/home-assistant/integrations/light.mqtt/)
- [门锁](/home-assistant/integrations/lock.mqtt/)
- [通知](/home-assistant/integrations/notify.mqtt/)
- [数字](/home-assistant/integrations/number.mqtt/)
- [场景](/home-assistant/integrations/scene.mqtt/)
- [选择器](/home-assistant/integrations/select.mqtt/)
- [传感器](/home-assistant/integrations/sensor.mqtt/)
- [警报器](/home-assistant/integrations/siren.mqtt/)
- [开关](/home-assistant/integrations/switch.mqtt/)
- [更新](/home-assistant/integrations/update.mqtt/)
- [标签扫描器](/home-assistant/integrations/tag.mqtt/)
- [文本](/home-assistant/integrations/text.mqtt/)
- [吸尘器](/home-assistant/integrations/vacuum.mqtt/)
- [阀门](/home-assistant/integrations/valve.mqtt/)
- [热水器](/home-assistant/integrations/water_heater.mqtt/)


</details>

<a name="configuration-via-yaml"></a>
<details>
<summary>通过 YAML 配置 MQTT 组件</summary>


- [报警控制面板](/home-assistant/integrations/alarm_control_panel.mqtt/)
- [二值传感器](/home-assistant/integrations/binary_sensor.mqtt/)
- [按钮](/home-assistant/integrations/button.mqtt/)
- [摄像头](/home-assistant/integrations/camera.mqtt/)
- [温控（HVAC）](/home-assistant/integrations/climate.mqtt/)
- [遮盖](/home-assistant/integrations/cover.mqtt/)
- [设备追踪器](/home-assistant/integrations/device_tracker.mqtt/)
- [事件](/home-assistant/integrations/event.mqtt/)
- [风扇](/home-assistant/integrations/fan.mqtt/)
- [加湿器](/home-assistant/integrations/humidifier.mqtt/)
- [图像](/home-assistant/integrations/image.mqtt/)
- [割草机](/home-assistant/integrations/lawn_mower.mqtt/)
- [灯光](/home-assistant/integrations/light.mqtt/)
- [门锁](/home-assistant/integrations/lock.mqtt/)
- [通知](/home-assistant/integrations/notify.mqtt/)
- [数字](/home-assistant/integrations/number.mqtt/)
- [场景](/home-assistant/integrations/scene.mqtt/)
- [选择器](/home-assistant/integrations/select.mqtt/)
- [传感器](/home-assistant/integrations/sensor.mqtt/)
- [警报器](/home-assistant/integrations/siren.mqtt/)
- [开关](/home-assistant/integrations/switch.mqtt/)
- [文本](/home-assistant/integrations/text.mqtt/)
- [更新](/home-assistant/integrations/update.mqtt/)
- [吸尘器](/home-assistant/integrations/vacuum.mqtt/)
- [阀门](/home-assistant/integrations/valve.mqtt/)
- [热水器](/home-assistant/integrations/water_heater.mqtt/)


</details>

<a name="configuration-via-subentries"></a>
<details>
<summary>通过子条目配置 MQTT 组件</summary>


- [报警控制面板](/home-assistant/integrations/alarm_control_panel.mqtt/)
- [二值传感器](/home-assistant/integrations/binary_sensor.mqtt/)
- [按钮](/home-assistant/integrations/button.mqtt/)
- [温控（HVAC）](/home-assistant/integrations/climate.mqtt/)
- [遮盖](/home-assistant/integrations/cover.mqtt/)
- [风扇](/home-assistant/integrations/fan.mqtt/)
- [图像](/home-assistant/integrations/image.mqtt/)
- [灯光](/home-assistant/integrations/light.mqtt/)
- [门锁](/home-assistant/integrations/lock.mqtt/)
- [通知](/home-assistant/integrations/notify.mqtt/)
- [数字](/home-assistant/integrations/number.mqtt/)
- [选择器](/home-assistant/integrations/select.mqtt/)
- [传感器](/home-assistant/integrations/sensor.mqtt/)
- [警报器](/home-assistant/integrations/siren.mqtt/)
- [开关](/home-assistant/integrations/switch.mqtt/)
- [文本](/home-assistant/integrations/text.mqtt/)
- [阀门](/home-assistant/integrations/valve.mqtt/)
- [热水器](/home-assistant/integrations/water_heater.mqtt/)

要通过子条目添加 MQTT 设备，请按照以下步骤操作：

1. 转到 **[设置 > 设备与服务](https://my.home-assistant.io/redirect/integrations/)**。
2. 选择 MQTT 集成。
3. 通过 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 添加子条目，点击 `[mdi:dots-vertical]` 并选择 **添加 MQTT 设备**。

可以将设备上下文和一个或多个实体添加到子条目中。


</details>

让 MQTT 和 Home Assistant 协同工作的第一步是选择一个代理。

最简单的选择是安装 Home Assistant 的官方 Mosquitto Broker 应用（以前称为 Mosquitto Broker 插件）。您可以在设置 MQTT 集成时选择自动设置和配置此应用。Home Assistant 将自动生成并分配安全的用户名和密码，无需进一步关注。如果您已经提前自行设置此应用，这也同样适用。
您可以使用 [Mosquitto 应用配置](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_mosquitto)为您的 MQTT 设备和服务设置额外的登录。

:::important
当使用官方 Mosquitto MQTT 代理应用设置 MQTT 时，代理的凭据会被生成并保密。如果需要重新安装官方 Mosquitto MQTT 代理，请确保保存应用用户选项的副本，如额外的登录。重新安装应用后，MQTT 集成将自动更新重新安装代理的新密码。然后它会自动重新连接。

:::
或者，您可以使用自己配置的其他 MQTT 代理，确保它与 Home Assistant 兼容。

## 设置代理

虽然有公共 MQTT 代理可用，但最简单和最私密的选择是运行您自己的代理。

推荐的设置方法是使用 [Mosquitto MQTT 代理应用](https://github.com/home-assistant/hassio-addons/blob/master/mosquitto/DOCS.md)。

:::warning
不支持 ActiveMQ MQTT 代理和 RabbitMQ MQTT 插件，请使用已知可用的代理如 Mosquitto。
ActiveMQ MQTT 代理存在[至少两个](https://issues.apache.org/jira/browse/AMQ-6360) [问题](https://issues.apache.org/jira/browse/AMQ-6575)，会破坏 MQTT 消息保留。

:::
## 代理配置

MQTT 代理设置在首次设置 MQTT 集成时配置，如果需要可以稍后更改。

添加 MQTT 集成，然后提供代理的主机名（或 IP 地址）和端口，以及（如果需要）Home Assistant 应使用的用户名和密码。要稍后更改设置，请按照以下步骤操作：

1. 转到 **[设置 > 设备与服务](https://my.home-assistant.io/redirect/integrations/)**。
2. 选择 MQTT 集成。
3. 通过 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 重新配置 MQTT 代理设置，点击 `[mdi:dots-vertical]` 并选择 **重新配置**。

MQTT 子条目也可以重新配置。可以添加额外的实体，或从子条目中删除实体。每个 MQTT 子条目包含一个 MQTT 设备。MQTT 设备必须至少有一个实体。

:::important
如果您遇到类似 `Failed to connect due to exception: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed` 的错误消息，请打开 `高级选项` 并将 [代理证书验证](/home-assistant/integrations/mqtt/#broker-certificate-validation) 设置为 `Auto`。

:::
### 高级代理配置

高级代理配置选项包括设置自定义客户端 ID、设置客户端证书和密钥进行身份验证，以及启用代理证书的 TLS 验证以进行安全连接。要访问高级设置，打开 MQTT 代理设置，打开 `高级选项` 并点击 `下一步`。如果已有高级设置处于活动状态，默认会显示高级选项。

:::tip
只有在启用高级模式（见用户设置）或已配置高级代理设置时，才能访问高级代理选项。

:::
#### 替代客户端 ID

您可以设置自定义 MQTT 客户端 ID，这有助于调试。请注意客户端 ID 必须唯一。如果您希望 Home Assistant 生成唯一 ID，请保留此设置为默认值。

#### 保持活动

此客户端发送保持活动消息之间的时间间隔（秒）。默认为 60 秒。保持活动设置应至少为 15 秒。

#### 代理证书验证

要启用与代理的安全连接，应验证代理证书。如果您的代理使用受信任的证书，则选择 `Auto`。这将允许根据捆绑的证书 CA 进行验证。如果使用自签名证书，选择 `Custom`。可以上传自定义 PEM 或 DER 编码的 CA 证书。点击 `下一步` 显示上传 CA 证书的控件。
如果服务器证书与主机名不匹配，验证将失败。要允许在不验证主机名的情况下连接，请打开 `忽略代理证书验证` 开关。

#### MQTT 协议

MQTT 协议设置默认为版本 `3.1.1`。如果您的 MQTT 代理支持 MQTT 版本 5，您可以将协议设置设为 `5`。

#### 保护连接

使用安全的代理连接，可以使用客户端证书进行身份验证。要设置客户端证书和私钥，打开选项 `使用客户端证书` 并点击"下一步"显示文件上传控件。客户端证书和相应的私钥必须一起上传。客户端证书和私钥都必须是 PEM 或 DER 编码。如果私钥使用密码加密，请确保在上传客户端证书和密钥文件时提供正确的密码。

#### 使用 WebSockets 作为传输

如果您的 MQTT 代理支持，您可以选择 `websockets` 作为传输方法。当您选择 `websockets` 并点击 `下一步` 时，您将能够添加 WebSockets 路径（默认 = `/`）和 WebSockets 头（可选）。目标 WebSockets URI：`ws://{broker}:{port}{WebSockets path}` 是使用 `broker`、`port` 和 `ws_path`（WebSocket 路径）设置构建的。
要配置 WebSocket 的头，请提供有效的 JSON 字典字符串。例如 `{ "Authorization": "token" , "x-header": "some header"}`。默认传输方法是 `tcp`。WebSockets 传输可以使用 TLS 保护，并可选地使用用户凭据或客户端证书。

:::note
只有在启用代理证书验证时，配置的客户端证书才会激活。

:::
## 配置 MQTT 选项

要更改选项，请按照以下步骤操作：

1. 转到 **[设置 > 设备与服务](https://my.home-assistant.io/redirect/integrations/)**。
2. 选择 MQTT 集成。
3. 选择 **配置**，然后选择 **重新配置 MQTT**。
4. 要打开 MQTT 选项页面，选择 **下一步**。

### 更改 MQTT 发现选项

可以按照以下步骤更改 MQTT 发现选项：

1. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 找到 MQTT 集成并选择它。
3. 要打开 MQTT 发现选项页面，选择 **配置 MQTT 选项** 按钮。

### 发现选项

MQTT 发现默认启用。可以关闭发现。也可以在此处更改发现主题的前缀（默认为 `homeassistant`）。
另请参阅 [MQTT 发现部分](#mqtt-discovery)

### Birth 与 Last Will 消息

Home Assistant 的 MQTT 集成支持所谓的 Birth 和 Last Will and Testament（LWT）消息。前者用于在服务启动后发送消息，后者用于通知其他客户端某个客户端已断开连接。请注意，LWT 消息会在正常断开（例如 Home Assistant 关闭）和异常断开（例如 Home Assistant 崩溃或失去网络连接）时发送。

如果禁用的实体在 30 秒后启用并添加，MQTT 集成将重新加载，并导致所有发现的 MQTT 实体被卸载。
当 MQTT 启动时，所有现有的 MQTT 设备、实体、标签和设备触发器将不可用，直到收到并处理发现消息。公开 MQTT 发现的设备或服务应订阅 Birth 消息并使用它作为触发器发送[发现负载](#discovery-payload)。为避免 MQTT 代理上的高 IO 负载，建议在发送发现负载时添加一些随机延迟。

替代方法：

- 保留[发现负载](#discovery-payload)：这会将发现负载存储在 MQTT 代理上，并在 MQTT 集成订阅 MQTT 发现时立即提供给它。当有很多实体时，这可能会导致高 IO 负载。
- 定期重新发送发现负载：这可能会导致一些延迟，或者如果有大量 MQTT 发现消息，会导致大量 IO。

默认情况下，Home Assistant 向 `homeassistant/status` 发送 `online` 和 `offline`。

可以从 UI 自定义或禁用 MQTT Birth 和 Last Will 消息。为此，在 UI 的集成页面中点击"配置"，然后点击"重新配置 MQTT"，然后点击"下一步"。

## 测试您的设置

`mosquitto` 代理包附带命令行工具（通常作为 `*-clients` 包）来发送和接收 MQTT 消息。要向运行在 `localhost` 的代理发送测试消息，您可以使用 [`mosquitto_pub`](https://mosquitto.org/man/mosquitto_pub-1.html)，请查看以下示例：

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/switch/1/on -m "Switch is ON"
```

另一种手动发送 MQTT 消息的方法是使用前端中的 **MQTT** 集成。在左侧菜单中选择"设置"，点击"设备与服务"，在"Mosquitto broker"磁贴中选择"配置"。在"发布数据包"下的"主题"字段中输入类似以下示例的内容，然后按"发布"。

1. 转到 **[设置 > 设备与服务](https://my.home-assistant.io/redirect/integrations/)**。
2. 选择 Mosquitto broker 集成，然后选择 **配置**。
3. 在 **发布数据包** 下的 **主题** 字段中输入类似以下示例的内容。选择 **发布**。

```bash
   homeassistant/switch/1/power
```

在负载字段中

```bash
   ON
```

在"监听主题"字段中，输入 `#` 查看所有内容，或输入 "homeassistant/switch/#" 仅跟踪已发布的主题，然后按"开始监听"。消息应类似以下文本：

```bash
Message 23 received on homeassistant/switch/1/power/stat/POWER at 12:16 PM:
ON
QoS: 0 - Retain: false
Message 22 received on homeassistant/switch/1/power/stat/RESULT at 12:16 PM:
{
    "POWER": "ON"
}
QoS: 0 - Retain: false
```

要读取在主题 `homeassistant` 上发送到运行在 localhost 的代理的所有消息：

```bash
mosquitto_sub -h 127.0.0.1 -v -t "homeassistant/#"
```

## MQTT 实体命名

对于每个配置的 MQTT 实体，Home Assistant 会自动分配一个唯一的 `entity_id`。如果配置了 `unique_id` 选项，您可以在创建后更改 `entity_id`，更改会存储在实体注册表中。`entity_id` 在项目首次加载时生成。

如果设置了 `default_entity_id` 选项，则它将用于生成 `entity_id`。
例如，如果我们配置了一个 `sensor`，并且我们将 `default_entity_id` 设置为 `sensor.test`，那么 Home Assistant 将尝试分配 `sensor.test` 作为 `entity_id`。如果 `sensor.test` 已存在，Home Assistant 将附加后缀使其唯一，例如 `sensor.test_2`。

这意味着作为设备一部分的任何 MQTT 实体将[自动为其 `friendly_name` 属性添加设备名称前缀](https://developers.home-assistant.io/docs/core/entity/#has_entity_name-true-mandatory-for-new-integrations)

未命名的 `binary_sensor`、`button`、`number` 和 `sensor` 实体现在将以其设备类命名，而不是命名为"MQTT binary sensor"等。
允许将 MQTT 实体的名称设置为 `None`（在 YAML 中使用 `null`）以将其标记为设备的主要功能。

请注意，每个 MQTT 实体的 `has_entity_name` 属性将设置为 `True`。更多详情[可在此处找到](https://developers.home-assistant.io/docs/core/entity/#has_entity_name-true-mandatory-for-new-integrations)。

## MQTT 发现

MQTT 设备的发现将使您能够以最少的配置工作在 Home Assistant 端使用 MQTT 设备。配置在设备本身和设备使用的主题上完成。类似于 [HTTP 二值传感器](/home-assistant/integrations/http/#binary-sensor) 和 [HTTP 传感器](/home-assistant/integrations/http/#sensor)。为了防止设备重新连接时出现多个相同条目，需要唯一标识符。设备端需要两部分：配置主题和设备配置作为负载。

MQTT 发现默认启用，但可以禁用。可以更改发现主题的前缀（默认为 `homeassistant`）。
请参阅 [MQTT 选项部分](#configure-mqtt-options)

:::note
支持 MQTT 发现的 MQTT 组件的文档[可在此处找到](/home-assistant/integrations/mqtt/#configuration-via-mqtt-discovery)。

:::
### 发现消息

MQTT 发现支持两种类型的发现消息：

- [设备发现](/home-assistant/integrations/mqtt/#device-discovery-payload)，允许您在单个发现消息中包含多个组件
- [单组件发现](/home-assistant/integrations/mqtt/#single-component-discovery-payload)，您为每个组件发布单独的发现消息

如果您使用具有多个组件的设备，建议使用 MQTT 设备发现。它减少了发送的消息数量，并允许您只发送一次设备信息。

#### 发现主题

发现主题需要遵循特定格式：

```text
<discovery_prefix>/<component>/[<node_id>/]<object_id>/config
```

- `<discovery_prefix>`：发现前缀默认为 `homeassistant`，此前缀可以[更改](#discovery-options)。
- `<component>`：支持的 MQTT 集成之一，例如 `binary_sensor`，或设备发现时的 `device`。
- `<node_id>`：（*可选*）：提供主题的节点 ID，Home Assistant 不使用此 ID，但可用于构建 MQTT 主题结构。节点 ID 必须仅包含字符类 `[a-zA-Z0-9_-]`（字母数字、下划线和连字符）中的字符。
- `<object_id>`：设备的 ID。这允许每个设备有单独的主题。设备的 ID 必须仅包含字符类 `[a-zA-Z0-9_-]`（字母数字、下划线和连字符）中的字符。

> **注意：** 主题中的 `<object_id>` 不影响最终的 `entity_id`；如果需要控制 `entity_id`，请使用 `default_entity_id`。
`<node_id>` 是可选的，客户端可以使用它通过使用一个通配符主题如 `<discovery_prefix>/+/<node_id>/+/set` 来订阅自己的（命令）主题。

具有 `unique_id` 的实体的最佳做法是将 `<object_id>` 设置为 `unique_id` 并省略 `<node_id>`。

#### 设备发现负载

设备可以发送发现负载以公开设备的所有组件。
发现主题中的 `<component>` 部分必须设置为 `device`。

或者，设备也可以[为其想要设置的每个组件发送发现负载](/home-assistant/integrations/mqtt/#single-component-discovery-payload)。

JSON 消息根级别的共享选项必须包括：

- `device` 映射（缩写为 `dev`）
- `origin` 映射（缩写为 `o`）

这些映射是强制性的，不能在实体/组件级别被覆盖。

支持的共享选项有：

- `availability` [选项](/home-assistant/integrations/mqtt/#using-availability-topics)。
- `origin`（必需）[选项](/home-assistant/integrations/mqtt/#adding-information-about-the-origin-of-a-discovery-message)
- `command_topic`
- `state_topic`
- `qos`
- `encoding`

组件特定选项作为映射放置在 `components` 键（缩写为 `cmps`）下，如：

```json
{
  "dev": {
    "ids": "ea334450945afc",
    "name": "Kitchen",
    "mf": "Bla electronics",
    "mdl": "xya",
    "sw": "1.0",
    "sn": "ea334450945afc",
    "hw": "1.0rev2"
  },
  "o": {
    "name":"bla2mqtt",
    "sw": "2.1",
    "url": "https://bla2mqtt.example.com/support"
  },
  "cmps": {
    "some_unique_component_id1": {
      "p": "sensor",
      "device_class":"temperature",
      "unit_of_measurement":"°C",
      "value_template":"{{ value_json.temperature}}",
      "unique_id":"temp01ae_t"
    },
    "some_unique_id2": {
      "p": "sensor",
      "device_class":"humidity",
      "unit_of_measurement":"%",
      "value_template":"{{ value_json.humidity}}",
      "unique_id":"temp01ae_h"
    }
  },
  "state_topic":"sensorBedroom/state",
  "qos": 2
}
```

:::note
要查看每个缩写代表什么，请参阅 [MQTT 发现消息中支持的缩写列表](/home-assistant/integrations/mqtt/#supported-abbreviations-in-mqtt-discovery-messages)。

:::
`components`（`cmps`）键下的组件 ID 用作发现标识的一部分。添加到组件配置的每个组件都需要 `platform`（`p`）配置选项来标识组件平台。对于基于实体的组件，还需要 `unique_id`。

要删除组件，请向发现主题发布一个空（保留）字符串负载。这将删除组件并清除已发布的发现负载。如果没有其他引用，它还将删除设备条目。

可以作为更新发布空配置以从设备发现中删除单个组件。请注意，仍然需要添加 `platform`（`p`）选项。

```json
{
  "dev": {
    "ids": "ea334450945afc",
    "name": "Kitchen",
    "mf": "Bla electronics",
    "mdl": "xya",
    "sw": "1.0",
    "sn": "ea334450945afc",
    "hw": "1.0rev2"
  },
  "o": {
    "name":"bla2mqtt",
    "sw": "2.1",
    "url": "https://bla2mqtt.example.com/support"
  },
  "cmps": {
    "some_unique_component_id1": {
      "p": "sensor",
      "device_class":"temperature",
      "unit_of_measurement":"°C",
      "value_template":"{{ value_json.temperature}}",
      "unique_id":"temp01ae_t"
    },
    "some_unique_id2": {
      "p": "sensor"
    }
  },
  "state_topic":"sensorBedroom/state",
  "qos": 2
}
```

这将显式删除湿度传感器及其条目。

删除组件后，您应该发送另一个更新，从配置中省略已删除的组件。这确保 Home Assistant 拥有最新的设备配置。例如：

```json
{
  "dev": {
    "ids": "ea334450945afc",
    "name": "Kitchen",
    "mf": "Bla electronics",
    "mdl": "xya",
    "sw": "1.0",
    "sn": "ea334450945afc",
    "hw": "1.0rev2"
  },
  "o": {
    "name":"bla2mqtt",
    "sw": "2.1",
    "url": "https://bla2mqtt.example.com/support"
  },
  "cmps": {
    "some_unique_component_id1": {
      "p": "sensor",
      "device_class":"temperature",
      "unit_of_measurement":"°C",
      "value_template":"{{ value_json.temperature}}",
      "unique_id":"temp01ae_t"
    }
  },
  "state_topic":"sensorBedroom/state",
  "qos": 2
}
```

<div class='note warning'>

设备发现负载中的组件配置部分必须设置 `platform`（`p`）选项为 `component` 的名称，并且还必须至少有一个组件特定的配置选项。实体组件必须设置 `unique_id` 选项并具有 `device` 上下文。

</div>

##### 从单组件迁移到设备发现

要允许从单组件发现平滑迁移到设备发现：

1. 确保所有实体都有 `unique_id` 和 `device` 上下文。
2. 将 `object_id` 移到发现负载内部（如果可用），或使用唯一 ID 或组件。
3. 考虑使用以前的 `node_id` 作为设备发现主题的新 `object_id`。
4. 确保 `unique_id` 匹配且 `device` 上下文具有正确的标识符。
5. 向所有现有的单组件发现主题发送以下负载：`{"migrate_discovery": true }`。这将卸载发现的项目，但其设置将被保留。
6. 将发现主题切换到设备发现主题并包含所有组件配置。
7. 使用空负载清理单组件发现消息。

在迁移步骤期间，将记录 INFO 消息以通知您迁移的进度。

:::important
考虑在将迁移过程应用于实时系统之前在非生产环境中进行测试。

:::
#### 发现迁移示例（设备自动化和传感器）

**步骤 1：原始单组件发现配置：**

发现主题单：`homeassistant/device_automation/0AFFD2/bla1/config`
发现 ID：`0AFFD2 bla1` *（`0AFFD2` 和 `bla1` 都来自发现主题）*
发现负载单：

```json
{
  "device": {
    "identifiers": ["0AFFD2"],
    "name": "Test device"
  },
  "o": {
    "name": "foobar"
  },
  "automation_type": "trigger",
  "payload": "short_press",
  "topic": "foobar/triggers/button1",
  "type": "button_short_press",
  "subtype": "button_1"
}
```

发现主题单：`homeassistant/sensor/0AFFD2/bla2/config`
发现 ID：`0AFFD2 bla2` *（`0AFFD2` 和 `bla2` 都来自发现主题）*
发现负载单：

```json
{
  "device": {
    "identifiers": ["0AFFD2"],
    "name": "Test device"
  },
  "o": {
    "name": "foobar"
  },
  "state_topic": "foobar/sensor/sensor1",
  "unique_id": "bla_sensor001"
}
```

**步骤 2：通过向两个发现主题发布来启动迁移：**

当这些单组件发现负载被处理时，如果我们想启动向设备发现的迁移，我们需要发布...

```json
{"migrate_discovery": true }
```

...到两个发现主题...

- `homeassistant/device_automation/0AFFD2/bla1/config`
- `homeassistant/sensor/0AFFD2/bla2/config`

:::important
检查日志以确保此步骤正确执行。

:::
**步骤 3：发布新的设备发现配置：**

发现主题设备：`homeassistant/device/0AFFD2/config`
发现 ID：`0AFFD2 bla` *（`0AFFD2`来自发现主题，`bla`：发现负载中 `cmps` 下的键）*
发现负载设备：

```json
{
  "device": {
    "identifiers": [
      "0AFFD2"
    ]
  },
  "o": {
    "name": "foobar"
  },
  "cmps": {
    "bla1": {
      "p": "device_automation",
      "automation_type": "trigger",
      "payload": "short_press",
      "topic": "foobar/triggers/button1",
      "type": "button_short_press",
      "subtype": "button_1"
    },
    "bla2": {
      "p": "sensor",
      "state_topic": "foobar/sensor/sensor1",
      "unique_id": "bla_sensor001"
    }
  }
}
```

:::important
检查日志以确保迁移成功。

:::
**步骤 4：成功迁移后清理：**

当日志显示成功迁移后，可以通过向单组件发现主题发布空负载安全地清理它们。
日志应指示发现迁移是否成功。

**可选：回滚迁移：**

要回滚，发布...

```json
{"migrate_discovery": true }
```

到设备发现主题。
之后，重新发布单组件发现负载。
最后，通过发布空负载清理设备发现负载。

检查每一步的日志。

#### 单组件发现负载

使用单组件发现消息时，发现主题中的 `<component>` 部分必须是支持的 MQTT 平台之一。

负载中的选项仅用于设置一个特定组件。如果设备包含多个组件，建议改用[设备发现](/home-assistant/integrations/mqtt/#device-discovery-payload)。

MQTT 实体可以共享设备配置，这意味着一个实体可以包含完整的设备配置，其他实体可以通过仅设置必填字段链接到该设备。

:::important
必填字段以前仅限于 `connection` 和 `identifiers` 中的至少一个，但现在已扩展为 `connection` 和 `identifiers` 中的至少一个以及 `name`。

:::
示例发现负载：

```json
{
  "dev": {
    "ids": "ea334450945afc",
    "name": "Kitchen",
    "mf": "Bla electronics",
    "mdl": "xya",
    "sw": "1.0",
    "sn": "ea334450945afc",
    "hw": "1.0rev2"
  },
  "o": {
    "name":"bla2mqtt",
    "sw": "2.1",
    "url": "https://bla2mqtt.example.com/support"
  },
  "device_class":"temperature",
  "unit_of_measurement":"°C",
  "value_template":"{{ value_json.temperature}}",
  "unique_id":"temp01ae_t",
  "state_topic":"sensorBedroom/state",
  "qos": 2
}
```

要删除组件，请向发现主题发布空字符串。这将删除组件并清除已发布的发现负载。如果没有其他引用，它还将删除设备条目。

更多示例[请参阅](/home-assistant/integrations/mqtt/#discovery-examples-with-component-discovery)。

#### 发现负载

负载必须是序列化的 JSON 字典，如果添加新设备，将像 "`configuration.yaml`" 文件中的条目一样进行检查，但未知配置键被允许但被忽略。这意味着缺失的变量将用集成的默认值填充。所有 *必需* 的配置变量必须存在于负载中。允许未知文档键的原因是允许向后兼容，生成 MQTT 发现消息的软件可以与旧版本的 Home Assistant 一起使用，旧版本将简单地忽略新功能。

可以在设置了保留标志的情况下发送发现负载。在这种情况下，发现消息将存储在 MQTT 代理上，并在 MQTT 集成启动时自动处理。这种方法消除了重新发送的需要。但更好的方法是，生成 MQTT 发现消息的软件在 MQTT 集成发送 [Birth 消息](#birth-and-last-will-messages) 时发送发现负载。

在已收到有效负载的主题上的后续消息将被作为配置更新处理，带有空负载的配置更新将导致先前发现的设备被删除。

可以在负载中定义基础主题 `~` 以在多次使用相同主题基础时节省内存。
在以 `_topic` 结尾的配置变量的值中，如果 `~` 出现在值的开头或结尾，`~` 将被替换为基础主题。

发现负载中的配置变量名称可以缩写，以在从内存受限的设备发送发现消息时节省内存。

建议通过在发现负载中包含 `origin` 选项（缩写为 `o`）来添加有关 MQTT 实体来源的信息。对于设备发现，此信息是必需的。当发现或更新项目时，来源详情将记录在核心事件日志中。添加来源信息有助于故障排除，并提供有关 Home Assistant 设置中 MQTT 消息来源的有价值上下文。

注意：这些选项也支持缩写，如下表所示。

```yaml
name:
  description: 作为发现的 MQTT 项目来源的应用程序名称。（必需）
sw_version:
  description: 提供发现的 MQTT 项目的应用程序软件版本。
support_url:
  description: 提供发现的 MQTT 项目的应用程序支持 URL。
```

#### MQTT 发现消息中支持的缩写

<details>
<summary>支持的缩写</summary>


```text
    'act_t':               'action_topic',
    'act_tpl':             'action_template',
    'atype':               'automation_type',
    'aux_cmd_t':           'aux_command_topic',
    'aux_stat_t':          'aux_state_topic',
    'aux_stat_tpl':        'aux_state_template',
    'av_tones':            'available_tones',
    'avty':                'availability',
    'avty_mode':           'availability_mode',
    'avty_t':              'availability_topic',
    'avty_tpl':            'availability_template',
    'away_mode_cmd_t':     'away_mode_command_topic',
    'away_mode_stat_t':    'away_mode_state_topic',
    'away_mode_stat_tpl':  'away_mode_state_template',
    'b_tpl':               'blue_template',
    'bri_cmd_t':           'brightness_command_topic',
    'bri_cmd_tpl':         'brightness_command_template',
    'bri_scl':             'brightness_scale',
    'bri_stat_t':          'brightness_state_topic',
    'bri_tpl':             'brightness_template',
    'bri_val_tpl':         'brightness_value_template',
    'clr_temp_cmd_tpl':    'color_temp_command_template',
    'clr_temp_cmd_t':      'color_temp_command_topic',
    'clr_temp_k':           'color_temp_kelvin',
    'clr_temp_stat_t':     'color_temp_state_topic',
    'clr_temp_tpl':        'color_temp_template',
    'clr_temp_val_tpl':    'color_temp_value_template',
    'clrm_stat_t':         'color_mode_state_topic',
    'clrm_val_tpl':        'color_mode_value_template',
    'cmd_off_tpl':         'command_off_template',
    'cmd_on_tpl':          'command_on_template',
    'cmd_t':               'command_topic',
    'cmd_tpl':             'command_template',
    'cmps':                'components',
    'cod_arm_req':         'code_arm_required',
    'cod_dis_req':         'code_disarm_required',
    'cod_trig_req':        'code_trigger_required',
    'cont_type':           'content_type',
    'curr_temp_t':         'current_temperature_topic',
    'curr_temp_tpl':       'current_temperature_template',
    'def_ent_id':          'default_entity_id',
    'dev':                 'device',
    'dev_cla':             'device_class',
    'dir_cmd_t':           'direction_command_topic',
    'dir_cmd_tpl':         'direction_command_template',
    'dir_stat_t':          'direction_state_topic',
    'dir_val_tpl':         'direction_value_template',
    'dsp_prc':             'display_precision',
    'e':                   'encoding',
    'en':                  'enabled_by_default',
    'ent_cat':             'entity_category',
    'ent_pic':             'entity_picture',
    'evt_typ':             'event_types',
    'exp_aft':             'expire_after',
    'fanspd_lst':          'fan_speed_list',
    'flsh':                'flash',
    'flsh_tlng':           'flash_time_long',
    'flsh_tsht':           'flash_time_short',
    'fx_cmd_t':            'effect_command_topic',
    'fx_cmd_tpl':          'effect_command_template',
    'fx_list':             'effect_list',
    'fx_stat_t':           'effect_state_topic',
    'fx_tpl':              'effect_template',
    'fx_val_tpl':          'effect_value_template',
    'fan_mode_cmd_t':      'fan_mode_command_topic',
    'fan_mode_cmd_tpl':    'fan_mode_command_template',
    'fan_mode_stat_t':     'fan_mode_state_topic',
    'fan_mode_stat_tpl':   'fan_mode_state_template',
    'frc_upd':             'force_update',
    'g_tpl':               'green_template',
    'hs_cmd_t':            'hs_command_topic',
    'hs_cmd_tpl':          'hs_command_template',
    'hs_stat_t':           'hs_state_topic',
    'hs_val_tpl':          'hs_value_template',
    'ic':                  'icon',
    'img_e':               'image_encoding',
    'img_t':               'image_topic',
    'init':                'initial',
    'hum_cmd_t':           'target_humidity_command_topic',
    'hum_cmd_tpl':         'target_humidity_command_template',
    'hum_stat_t':          'target_humidity_state_topic',
    'hum_state_tpl':       'target_humidity_state_template',
    'json_attr':           'json_attributes',
    'json_attr_t':         'json_attributes_topic',
    'json_attr_tpl':       'json_attributes_template',
    'l_ver_t':             'latest_version_topic',
    'l_ver_tpl':           'latest_version_template',
    'lrst_t':              'last_reset_topic',
    'lrst_val_tpl':        'last_reset_value_template',
    'max':                 'max',
    'max_hum':             'max_humidity',
    'max_k':               'max_kelvin',
    'max_mirs':            'max_mireds',
    'max_temp':            'max_temp',
    'migr_discvry':        'migrate_discovery',
    'min':                 'min',
    'min_hum':             'min_humidity',
    'min_k':               'min_kelvin',
    'min_mirs':            'min_mireds',
    'min_temp':            'min_temp',
    'mode':                'mode',
    'mode_cmd_t':          'mode_command_topic',
    'mode_cmd_tpl':        'mode_command_template',
    'mode_stat_t':         'mode_state_topic',
    'mode_stat_tpl':       'mode_state_template',
    'modes':               'modes',
    'name':                'name',
    'o':                   'origin',
    'off_dly':             'off_delay',
    'on_cmd_type':         'on_command_type',
    'ops':                 'options',
    'opt':                 'optimistic',
    'osc_cmd_t':           'oscillation_command_topic',
    'osc_cmd_tpl':         'oscillation_command_template',
    'osc_stat_t':          'oscillation_state_topic',
    'osc_val_tpl':         'oscillation_value_template',
    'p':                   'platform',
    'pct_cmd_t':           'percentage_command_topic',
    'pct_cmd_tpl':         'percentage_command_template',
    'pct_stat_t':          'percentage_state_topic',
    'pct_val_tpl':         'percentage_value_template',
    'pl':                  'payload',
    'pl_arm_away':         'payload_arm_away',
    'pl_arm_custom_b':     'payload_arm_custom_bypass',
    'pl_arm_home':         'payload_arm_home',
    'pl_arm_nite':         'payload_arm_night',
    'pl_arm_vacation':     'payload_arm_vacation',
    'pl_avail':            'payload_available',
    'pl_cln_sp':           'payload_clean_spot',
    'pl_cls':              'payload_close',
    'pl_dir_fwd':          'payload_direction_forward',
    'pl_dir_rev':          'payload_direction_reverse',
    'pl_disarm':           'payload_disarm',
    'pl_home':             'payload_home',
    'pl_inst':             'payload_install',
    'pl_loc':              'payload_locate',
    'pl_lock':             'payload_lock',
    'pl_not_avail':        'payload_not_available',
    'pl_not_home':         'payload_not_home',
    'pl_off':              'payload_off',
    'pl_on':               'payload_on',
    'pl_open':             'payload_open',
    'pl_osc_off':          'payload_oscillation_off',
    'pl_osc_on':           'payload_oscillation_on',
    'pl_paus':             'payload_pause',
    'pl_prs':              'payload_press',
    'pl_ret':              'payload_return_to_base',
    'pl_rst':              'payload_reset',
    'pl_rst_hum':          'payload_reset_humidity',
    'pl_rst_mode':         'payload_reset_mode',
    'pl_rst_pct':          'payload_reset_percentage',
    'pl_rst_pr_mode':      'payload_reset_preset_mode',
    'pl_stop':             'payload_stop',
    'pl_stop_tilt':        'payload_stop_tilt',
    'pl_stpa':             'payload_start_pause',
    'pl_strt':             'payload_start',
    'pl_toff':             'payload_turn_off',
    'pl_ton':              'payload_turn_on',
    'pl_trig':             'payload_trigger',
    'pl_unlk':             'payload_unlock',
    'pos':                 'reports_position',
    'pos_clsd':            'position_closed',
    'pos_open':            'position_open',
    'pr_mode_cmd_t':       'preset_mode_command_topic',
    'pr_mode_cmd_tpl':     'preset_mode_command_template',
    'pr_mode_stat_t':      'preset_mode_state_topic',
    'pr_mode_val_tpl':     'preset_mode_value_template',
    'pr_modes':            'preset_modes',
    'ptrn':                'pattern',
    'r_tpl':               'red_template',
    'rel_s':               'release_summary',
    'rel_u':               'release_url',
    'ret':                 'retain',
    'rgb_cmd_t':           'rgb_command_topic',
    'rgb_cmd_tpl':         'rgb_command_template',
    'rgb_stat_t':          'rgb_state_topic',
    'rgb_val_tpl':         'rgb_value_template',
    'rgbw_cmd_t':          'rgbw_command_topic',
    'rgbw_cmd_tpl':        'rgbw_command_template',
    'rgbw_stat_t':         'rgbw_state_topic',
    'rgbw_val_tpl':        'rgbw_value_template',
    'rgbww_cmd_t':         'rgbww_command_topic',
    'rgbww_cmd_tpl':       'rgbww_command_template',
    'rgbww_stat_t':        'rgbww_state_topic',
    'rgbww_val_tpl':       'rgbww_value_template',
    'send_cmd_t':          'send_command_topic',
    'send_if_off':         'send_if_off',
    'set_fan_spd_t':       'set_fan_speed_topic',
    'set_pos_t':           'set_position_topic',
    'set_pos_tpl':         'set_position_template',
    'pos_t':               'position_topic',
    'pos_tpl':             'position_template',
    'spd_rng_min':         'speed_range_min',
    'spd_rng_max':         'speed_range_max',
    'src_type':            'source_type',
    'stat_cla':            'state_class',
    'stat_closing':        'state_closing',
    'stat_clsd':           'state_closed',
    'stat_jam':            'state_jammed',
    'stat_locked':         'state_locked',
    'stat_locking':        'state_locking',
    'stat_off':            'state_off',
    'stat_on':             'state_on',
    'stat_open':           'state_open',
    'stat_opening':        'state_opening',
    'stat_stopped':        'state_stopped',
    'stat_unlocked':       'state_unlocked',
    'stat_unlocking':      'state_unlocking',
    'stat_t':              'state_topic',
    'stat_tpl':            'state_template',
    'stat_val_tpl':        'state_value_template',
    'step':                'step',
    'stype':               'subtype',
    'sug_dsp_prc':         'suggested_display_precision',
    'sup_clrm':            'supported_color_modes',
    'sup_dur':             'support_duration',
    'sup_vol':             'support_volume_set',
    'sup_feat':            'supported_features',
    'swing_mode_cmd_t':    'swing_mode_command_topic',
    'swing_mode_cmd_tpl':  'swing_mode_command_template',
    'swing_mode_stat_t':   'swing_mode_state_topic',
    'swing_mode_stat_tpl': 'swing_mode_state_template',
    't':                   'topic',
    'temp_cmd_t':          'temperature_command_topic',
    'temp_cmd_tpl':        'temperature_command_template',
    'temp_hi_cmd_t':       'temperature_high_command_topic',
    'temp_hi_cmd_tpl':     'temperature_high_command_template',
    'temp_hi_stat_t':      'temperature_high_state_topic',
    'temp_hi_stat_tpl':    'temperature_high_state_template',
    'temp_lo_cmd_t':       'temperature_low_command_topic',
    'temp_lo_cmd_tpl':     'temperature_low_command_template',
    'temp_lo_stat_t':      'temperature_low_state_topic',
    'temp_lo_stat_tpl':    'temperature_low_state_template',
    'temp_stat_t':         'temperature_state_topic',
    'temp_stat_tpl':       'temperature_state_template',
    'temp_unit':           'temperature_unit',
    'tilt_clsd_val':       'tilt_closed_value',
    'tilt_cmd_t':          'tilt_command_topic',
    'tilt_cmd_tpl':        'tilt_command_template',
    'tilt_max':            'tilt_max',
    'tilt_min':            'tilt_min',
    'tilt_opnd_val':       'tilt_opened_value',
    'tilt_opt':            'tilt_optimistic',
    'tilt_status_t':       'tilt_status_topic',
    'tilt_status_tpl':     'tilt_status_template',
    'tit':                 'title',
    'trns':                'transition',
    'uniq_id':             'unique_id',
    'unit_of_meas':        'unit_of_measurement',
    'url_t':               'url_topic',
    'url_tpl':             'url_template',
    'val_tpl':             'value_template',
    'whit_cmd_t':          'white_command_topic',
    'whit_scl':            'white_scale',
    'xy_cmd_t':            'xy_command_topic',
    'xy_cmd_tpl':          'xy_command_template',
    'xy_stat_t':           'xy_state_topic',
    'xy_val_tpl':          'xy_value_template',
```


</details>
<details>
<summary>设备注册表配置支持的缩写</summary>


```text
    'cu':                  'configuration_url',
    'cns':                 'connections',
    'ids':                 'identifiers',
    'name':                'name',
    'mf':                  'manufacturer',
    'mdl':                 'model',
    'mdl_id':              'model_id',
    'hw':                  'hw_version',
    'sw':                  'sw_version',
    'sa':                  'suggested_area',
    'sn':                  'serial_number',
```


</details>

<details>
<summary>来源信息支持的缩写</summary>


```text
    'name':                'name',
    'sw':                  'sw_version',
    'url':                 'support_url',
```


</details>

### 发现消息和可用性

当设置 MQTT 发现时，设备或服务发送发现消息，MQTT 实体、标签或设备自动化将在收到消息后直接设置。
当 Home Assistant 重启时，具有唯一 ID 的已发现 MQTT 项目将不可用，直到收到新的发现消息。没有唯一 ID 的 MQTT 项目不会在启动时添加。
因此，使用 MQTT 发现的设备或服务必须确保在 **MQTT** 集成（重新）启动后提供配置消息。有两种常见方法来确保发现的项目在启动时设置：

1. 使用 Birth 和 Will 消息触发设置
2. 使用保留消息

最后，发布您的设备或服务可用性状态是最佳做法。

#### 使用 Birth 和 Will 消息触发发现

当 **MQTT** 集成启动时，默认会在 `homeassistant/status` 发布 birth 消息。
连接到共享 `mqtt` 代理的设备或服务可以订阅此主题，并使用 `online` 消息触发发现消息。另请参阅 [birth 和 last will 消息](/home-assistant/integrations/mqtt/#birth-and-last-will-messages)部分。配置发布后，状态主题需要更新，因此需要重新发布。

#### 使用保留配置消息

设备或服务的另一种方法是发布带有 `retain` 标志的发现消息。这将确保当 **MQTT** 集成连接到代理时重放发现消息。
配置发布后，状态主题需要更新。

#### 使用保留状态消息

配置处理后，状态更新也需要重新发布。
这也可以通过发布 `retained` 消息来完成。一旦收到配置（或从保留消息重放），设置将订阅任何状态主题。如果状态主题上有保留消息可用，此消息将被重放，以便可以恢复此主题的状态。

:::warning
使用保留消息的一个缺点是这些消息会保留在代理上，即使设备或服务停止工作。即使系统或代理重启后，它们仍然保留。
保留消息可能会创建不断出现的幽灵实体。

特别是当您有许多实体时，（不需要的）发现消息可能会导致过多的系统负载。因此，请谨慎使用发现消息。

:::
### 使用可用性主题

设备或服务可以通过发布 Birth 消息并在代理处设置 Will 消息来宣布其可用性。
当设备或服务失去与代理的连接时，代理将发布 Will 消息。
这允许 **MQTT** 集成使实体不可用。

平台特定的可用性设置仅适用于 `mqtt` 实体平台。

<details>
<summary>平台特定的可用性设置</summary>


```yaml
availability:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题列表。不得与 `availability_topic` 一起使用。
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
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `topic` 中提取设备的可用性。要确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
      required: false
      type: template
availability_topic:
  description: 订阅以接收可用性（在线/离线）更新的 MQTT 主题。不得与 `availability` 一起使用。
  required: false
  type: string
availability_mode:
   description: 当配置 `availability` 时，这控制将实体设置为 `available` 所需的条件。有效条目有 `all`、`any` 和 `latest`。如果设置为 `all`，则必须在所有配置的可用性主题上收到 `payload_available`，才能将实体标记为在线。如果设置为 `any`，则必须在至少一个配置的可用性主题上收到 `payload_available`，才能将实体标记为在线。如果设置为 `latest`，则任何配置的可用性主题上收到的最后一个 `payload_available` 或 `payload_not_available` 控制可用性。
   required: false
   type: string
   default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)从 `availability_topic` 中提取设备的可用性。要确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
  required: false
  type: template
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
```


</details>

### 组件发现示例

#### 运动检测（二值传感器）

可以用[二值传感器](/home-assistant/integrations/binary_sensor.mqtt/)表示的运动检测设备将作为 JSON 负载发送其配置到配置主题。在向 `config` 发送第一条消息后，发送到状态主题的 MQTT 消息将更新 Home Assistant 中的状态。

- 配置主题：`homeassistant/binary_sensor/garden/config`
- 状态主题：`homeassistant/binary_sensor/garden/state`
- 配置负载（派生设备名称）：

```json
{
   "name":null,
   "device_class":"motion",
   "state_topic":"homeassistant/binary_sensor/garden/state",
   "unique_id":"motion01ad",
   "device":{
      "identifiers":[
         "01ad"
      ],
      "name":"Garden"
   }
}
```

- 保留：添加 -r 开关以在代理中保留配置主题。没有这个，Home Assistant 重启后传感器将不可用。

添加 `unique_id` 以允许更改实体，以及添加 `device` 映射以便我们可以将设备的所有传感器分组也是好主意。如果我们想为实体继承设备名称，可以将"name"设置为 `null`。如果我们设置实体名称，`friendly_name` 将是设备名称和实体名称的组合。如果省略 `name` 并设置了 `device_class`，实体名称部分将从 `device_class` 派生。

- 示例配置负载（未设置名称，派生 `device_class` 名称）：

```json
{
   "name":null,
   "device_class":"motion",
   "state_topic":"homeassistant/binary_sensor/garden/state",
   "unique_id":"motion01ad",
   "device":{
      "identifiers":[
         "01ad"
      ],
      "name":"Garden"
   }
}
```

如果未设置名称，MQTT 将设置默认名称（[参见 MQTT 平台文档](#mqtt-discovery)）。

要手动创建新传感器并将名称设置为 `null` 以派生设备名称"Garden"：

```bash
mosquitto_pub -r -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m '{"name": null, "device_class": "motion", "state_topic": "homeassistant/binary_sensor/garden/state", "unique_id": "motion01ad", "device": {"identifiers": ["01ad"], "name": "Garden" }}'
```

更新状态：

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/state" -m ON
```

通过发送空消息删除传感器。

 ```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m ''
```

更多详情请参阅 [MQTT 测试部分](/home-assistant/integrations/mqtt/#testing-your-setup)。

#### 传感器

设置具有多个测量值的传感器需要多个连续的配置主题提交。

- 配置主题 no1：`homeassistant/sensor/sensorBedroomT/config`
- 配置负载 no1：

```json
{
   "device_class":"temperature",
   "state_topic":"homeassistant/sensor/sensorBedroom/state",
   "unit_of_measurement":"°C",
   "value_template":"{{ value_json.temperature}}",
   "unique_id":"temp01ae",
   "device":{
      "identifiers":[
          "bedroom01ae"
      ],
      "name":"Bedroom",
      "manufacturer": "Example sensors Ltd.",
      "model": "Example Sensor",
      "model_id": "K9",
      "serial_number": "12AE3010545",
      "hw_version": "1.01a",
      "sw_version": "2024.1.0",
      "configuration_url": "https://example.com/sensor_portal/config"
   }
}

```

- 配置主题 no2：`homeassistant/sensor/sensorBedroomH/config`
- 配置负载 no2：

```json
{
   "device_class":"humidity",
   "state_topic":"homeassistant/sensor/sensorBedroom/state",
   "unit_of_measurement":"%",
   "value_template":"{{ value_json.humidity}}",
   "unique_id":"hum01ae",
   "device":{
      "identifiers":[
         "bedroom01ae"
      ]
   }
}
```

传感器 [`identifiers` 或 `connections`](/home-assistant/integrations/sensor.mqtt/#device) 选项允许设置共享同一设备的多个实体。

:::note
如果共享设备配置，则不需要将所有设备详情添加到其他实体配置。只需将共享标识符或连接添加到其他实体配置负载的设备映射中即可。

:::
可以用传感器配置中的 `value_template` 解析的常见状态负载：

```json
{
   "temperature":23.20,
   "humidity":43.70
}
```

#### 具有命令主题的实体

设置灯光、开关等类似，但需要如 [MQTT 开关文档](/home-assistant/integrations/switch.mqtt/) 中所述的 `command_topic`。

- 配置主题：`homeassistant/switch/irrigation/config`
- 状态主题：`homeassistant/switch/irrigation/state`
- 命令主题：`homeassistant/switch/irrigation/set`
- 负载：

```json
{
   "name":"Irrigation",
   "command_topic":"homeassistant/switch/irrigation/set",
   "state_topic":"homeassistant/switch/irrigation/state",
   "unique_id":"irr01ad",
   "device":{
      "identifiers":[
         "garden01ad"
      ],
      "name":"Garden"
   }
}
```

- 保留：添加 -r 开关以在代理中保留配置主题。没有这个，Home Assistant 重启后传感器将不可用。

```bash
mosquitto_pub -r -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/config" \
  -m '{"name": "Irrigation", "command_topic": "homeassistant/switch/irrigation/set", "state_topic": "homeassistant/switch/irrigation/state", "unique_id": "irr01ad", "device": {"identifiers": ["garden01ad"], "name": "Garden" }}'
```

设置状态：

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/set" -m ON
```

#### 使用缩写和基础主题

使用主题前缀和缩写配置变量名称设置开关以减少负载长度。

- 配置主题：`homeassistant/switch/irrigation/config`
- 命令主题：`homeassistant/switch/irrigation/set`
- 状态主题：`homeassistant/switch/irrigation/state`
- 配置负载：

```json
{
   "~":"homeassistant/switch/irrigation",
   "name":"garden",
   "cmd_t":"~/set",
   "stat_t":"~/state"
}
```

:::note
要查看每个缩写代表什么，请参阅 [MQTT 发现消息中支持的缩写列表](/home-assistant/integrations/mqtt/#supported-abbreviations-in-mqtt-discovery-messages)。

:::
#### 另一个使用缩写主题名称和基础主题的示例

设置[接受 JSON 负载的灯光](/home-assistant/integrations/light.mqtt/#json-schema)，使用缩写配置变量名称：

- 配置主题：`homeassistant/light/kitchen/config`
- 命令主题：`homeassistant/light/kitchen/set`
- 状态主题：`homeassistant/light/kitchen/state`
- 示例状态负载：`{"state": "ON", "brightness": 255}`
- 配置负载：

  ```json
  {
    "~": "homeassistant/light/kitchen",
    "name": "Kitchen",
    "uniq_id": "kitchen_light",
    "cmd_t": "~/set",
    "stat_t": "~/state",
    "schema": "json",
    "brightness": true
  }
  ```

#### 在发现消息中使用缩写设备和来源信息的示例

  ```json
  {
    "~": "homeassistant/light/kitchen",
    "name": null,
    "uniq_id": "kitchen_light",
    "cmd_t": "~/set",
    "stat_t": "~/state",
    "schema": "json",
    "dev": {
      "ids": "ea334450945afc",
      "name": "Kitchen",
      "mf": "Bla electronics",
      "mdl": "xya",
      "mdl_id": "ABC123",
      "sw": "1.0",
      "sn": "ea334450945afc",
      "hw": "1.0rev2"
    },
    "o": {
      "name":"bla2mqtt",
      "sw": "2.1",
      "url": "https://bla2mqtt.example.com/support"
    }
  }
  ```

### 第三方工具支持

以下软件内置支持 MQTT 发现：

- [anpr2mqtt](https://anpr2mqtt.rhizomatics.org.uk)
- [ArduinoHA](https://github.com/dawidchyrzynski/arduino-home-assistant)
- [Arilux AL-LC0X LED controllers](https://github.com/smrtnt/Arilux_AL-LC0X)
- [ble2mqtt](https://github.com/devbis/ble2mqtt)
- [diematic_server](https://github.com/IgnacioHR/diematic_server)
- [digitalstrom-mqtt](https://github.com/gaetancollaud/digitalstrom-mqtt)
- [ebusd](https://github.com/john30/ebusd)
- [ecowitt2mqtt](https://github.com/bachya/ecowitt2mqtt)
- [EMS-ESP32 (and EMS-ESP)](https://github.com/emsesp/EMS-ESP32)
- [ESPHome](https://esphome.io)
- [ESPurna](https://github.com/xoseperez/espurna)
- [go-iotdevice](https://github.com/koestler/go-iotdevice)
- [HASS.Agent](https://github.com/LAB02-Research/HASS.Agent)
- [IOTLink](https://iotlink.gitlab.io) (starting with 2.0.0)
- [MiFlora MQTT Daemon](https://github.com/ThomDietrich/miflora-mqtt-daemon)
- [MyElectricalData](https://github.com/MyElectricalData/myelectricaldata_import#english)
- [MqDockerUp](https://github.com/MichelFR/MqDockerUp)
- [Nuki Hub](https://github.com/technyon/nuki_hub)
- [Nuki Smart Lock 3.0 Pro](https://support.nuki.io/hc/articles/12947926779409-MQTT-support), [more info](https://developer.nuki.io/t/mqtt-api-specification-v1-3/17626)
- [OpenMQTTGateway](https://github.com/1technophile/OpenMQTTGateway)
- [OTGateway](https://github.com/Laxilef/OTGateway)
- [rethink](https://github.com/anszom/rethink)
- [room-assistant](https://github.com/mKeRix/room-assistant) (starting with 1.1.0)
- [SmartHome](https://github.com/roncoa/SmartHome)
- [SpeedTest-CLI MQTT](https://github.com/adorobis/speedtest-CLI2mqtt)
- [SwitchBot-MQTT-BLE-ESP32](https://github.com/devWaves/SwitchBot-MQTT-BLE-ESP32)
- [Tasmota](https://github.com/arendst/Tasmota) (starting with 5.11.1e, development halted)
- [TeddyCloud](https://github.com/toniebox-reverse-engineering/teddycloud)
- [Teleinfo MQTT](https://fmartinou.github.io/teleinfo2mqtt) (starting with 3.0.0)
- [Tydom2MQTT](https://tydom2mqtt.github.io/tydom2mqtt/)
- [Updates2MQTT](https://updates2mqtt.rhizomatics.org.uk)
- [What's up Docker?](https://fmartinou.github.io/whats-up-docker/) (starting with 3.5.0)
- [WyzeSense2MQTT](https://github.com/raetha/wyzesense2mqtt)
- [Xiaomi DaFang Hacks](https://github.com/EliasKotlyar/Xiaomi-Dafang-Hacks)
- [Zehnder Comfoair RS232 MQTT](https://github.com/adorobis/hacomfoairmqtt)
- [Zigbee2MQTT](https://github.com/koenkk/zigbee2mqtt)

以下软件也支持使用为 Home Assistant 设计的 MQTT 发现信息。
兼容性和功能会有所不同，并非所有设备可能都能工作。

- [Domoticz](https://wiki.domoticz.com/MQTT#Add_hardware_.22MQTT_Auto_Discovery_Client_Gateway.22)
- [openHAB](https://www.openhab.org/addons/bindings/mqtt.homeassistant/)

## 手动配置的 MQTT 项目

支持[通过配置流作为子条目添加手动项目](#configuration)的功能正在开发中。并非所有实体平台都已支持。

对于大多数集成，也可以在 "`configuration.yaml`" 中手动设置 MQTT 项目。阅读更多[关于 YAML 配置](/home-assistant/docs/configuration/yaml)。

MQTT 支持两种 YAML 配置项目的样式。所有配置项目直接放在 `mqtt` 集成键下。请注意，您不能混用这些样式。如有疑问，请使用 *按项目列出的 YAML 配置* 样式。

### 按项目列出的 YAML 配置

此方法期望所有项目在 YAML 列表中。每个项目都有一个 `{domain}` 键，项目配置直接放在域键下。此方法被视为最佳实践。在所有示例中，我们使用此格式。

```yaml
mqtt:
  - {domain}:
      name: ""
      ...
  - {domain}:
      name: ""
      ...
```

### 按 `{domain}` 分组的 YAML 配置

所有项目按 `{domain}` 分组，列出所有配置。

```yaml
mqtt:
  {domain}:
    - name: ""
      ...
    - name: ""
      ...
```

如果您有大量手动配置的项目，可能需要考虑[拆分配置](/home-assistant/docs/configuration/splitting_configuration/)。

:::note
支持 YAML 的 MQTT 组件的文档[可在此处找到](/home-assistant/integrations/mqtt/#configuration-via-yaml)。

:::
## 实体状态更新

实体通过 MQTT 订阅接收状态更新。在状态主题上收到的负载被处理以确定是否有重大变化。如果检测到变化，实体将被更新。

请注意，MQTT 设备负载通常包含用于更新订阅同一主题的多个实体的信息。例如，灯光状态更新可能包括有关链路质量的信息。此数据可以更新链路质量传感器，但不用于更新灯光本身。当没有变化时，MQTT 会过滤掉实体状态更新。

### 最后报告状态属性

由于 MQTT 状态更新通常频繁重复，即使没有实际变化存在，由 MQTT 订阅者确定是否收到状态更新。如果错过最新更新，可能需要一段时间才能收到下一个更新。如果代理上存在保留负载，该值将首先重放，但它将是先前最后状态的更新。

MQTT 设备通常不断生成大量状态更新。除非设置了 `force_update`，否则 MQTT 不会更新 `last_reported` 以避免影响系统稳定性。或者，可以创建 MQTT 传感器来测量上次更新。

## 使用模板

MQTT 集成支持模板。阅读更多[关于在 MQTT 集成中使用模板](/home-assistant/docs/configuration/templating/#using-templates-with-the-mqtt-integration)。

### 示例

#### REST API

使用 [REST API](https://developers.home-assistant.io/docs/api/rest/) 向给定主题发送消息。

```bash
$ curl -X POST \
    -H "Authorization: Bearer ABCDEFGH" \
    -H "Content-Type: application/json" \
    -d '{"payload": "Test message from HA", "topic": "home/notification"}' \
    http://IP_ADDRESS:8123/api/services/mqtt/publish
```

#### 自动化

在自动化中用作 [`script`](/home-assistant/integrations/script/)。


```yaml
automation:
  alias: "当我到家时给我发送消息"
  triggers:
    - trigger: state
      entity_id: device_tracker.me
      to: "home"
  actions:
    - action: script.notify_mqtt
      data:
        target: "me"
        message: "I'm home"

script:
  notify_mqtt:
    sequence:
      - action: mqtt.publish
        data:
          payload: "{{ message }}"
          topic: home/"{{ target }}"
          retain: true
```


## 发布和转储动作

MQTT 集成将注册 `mqtt.publish` 动作，允许向 MQTT 主题发布消息。

### 动作：发布

`mqtt.publish` 动作向 MQTT 主题发布消息。

| 数据属性 | 可选 | 描述                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `topic`                | 否       | 发布负载的主题。                                 |
| `payload`              | 是      | 要发布的负载。省略 `payload` 时将发布空负载。               |
| `evaluate_payload`     | 是      | 是否应评估 `payload` 中的 `bytes` 字面量以发布原始数据。（默认：false）|
| `qos`                  | 是      | 使用的服务质量。（默认：0）                      |
| `retain`               | 是      | 消息是否应设置保留标志。（默认：false） |

:::note
当 `payload` 在 YAML 脚本或自动化中从[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)渲染时，模板渲染为 `bytes` 字面量，传出 MQTT 负载将仅作为 `raw` 数据发送，如果 `evaluate_payload` 选项标志设置为 `true`。

:::
```yaml
topic: homeassistant/light/1/command
payload: on
```


```yaml
topic: homeassistant/light/1/state
payload: "{{ states('device_tracker.paulus') }}"
```


```yaml
topic: "homeassistant/light/{{ states('sensor.light_active') }}/state"
payload: "{{ states('device_tracker.paulus') }}"
```


请注意 `payload` 必须是字符串。
如果您想使用 YAML 编辑器发送 JSON，则需要正确格式化/转义它。例如：


```yaml
topic: homeassistant/light/1/state
payload: "{\"Status\":\"off\", \"Data\":\"something\"}"` 
```


下面的示例展示了如何发布温度传感器'Bathroom Temperature'。
设置了 `device_class`，因此不需要设置"name"选项。实体将继承设置的 `device_class` 名称，也支持翻译。
如果在负载中设置"name"，实体名称将以设备名称开头。


```yaml
action: mqtt.publish
data:
  topic: homeassistant/sensor/Acurite-986-1R-51778/config
  payload: >-
    {"device_class": "temperature",
    "unit_of_measurement": "\u00b0C",
    "value_template": "{{ value|float }}",
    "state_topic": "rtl_433/rtl433/devices/Acurite-986/1R/51778/temperature_C",
    "unique_id": "Acurite-986-1R-51778-T",
    "device": {
    "identifiers": "Acurite-986-1R-51778",
    "name": "Bathroom",
    "model": "Acurite",
    "model_id": "986",
    "manufacturer": "rtl_433" }
    }
```


如何使用 `qos` 和 `retain` 的示例：

```yaml
topic: homeassistant/light/1/command
payload: on
qos: 2
retain: true
```

### 动作：转储

`mqtt.dump` 动作监听指定的主题匹配器，并将特定持续时间内的所有接收消息转储到配置文件夹中的 `mqtt_dump.txt` 文件。这在调试问题时很有用。

| 数据属性 | 可选 | 描述                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `topic`                | 否       | 要转储的主题。可以包含通配符（`#` 或 `+`）。                         |
| `duration`             | 是      | 监听消息的持续时间（秒）。默认为 5 秒。 |

```yaml
topic: zigbee2mqtt/#
```

## 日志记录

[logger](/home-assistant/integrations/logger/) 集成允许记录接收到的 MQTT 消息。

```yaml
# 示例 configuration.yaml 条目
logger:
  default: warning
  logs:
    homeassistant.components.mqtt: debug
```

## 事件 `event_mqtt_reloaded`

当手动配置的 MQTT 实体已重新加载且实体因此可能已更改时，会触发事件 `event_mqtt_reloaded`。

此事件没有额外数据。

## 删除集成

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

注意：此操作不会删除 [MQTT 代理](#setting-up-a-broker) 或其数据。如果您想完全删除 MQTT：

1. 检查您的 "`configuration.yaml`" 和其他 YAML 文件中与 MQTT 相关的配置并删除它们
2. 查看您的自动化和脚本是否有任何 MQTT 依赖项
3. 考虑在进行这些更改之前备份您的配置
