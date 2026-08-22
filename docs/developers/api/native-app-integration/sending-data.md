---
title: "发送数据"
---

一旦你将应用注册到 mobile app 组件，你就可以开始通过提供的 webhook 信息与 Home Assistant 进行交互。

## 通过 Rest API 发送 webhook 数据

第一步是将返回的 webhook ID 转换为完整的 URL：`<instance_url>/api/webhook/<webhook_id>`。这将是我们所有交互所需要的唯一 url。webhook 端点不需要经过认证的请求。

如果在注册期间提供了 Cloudhook URL，你应默认使用该 URL，仅在该请求失败时才回退到上述构造的 URL。

如果在注册期间提供了 remote UI URL，你应在构造 URL 时将其用作 `instance_url`，仅在该 URL 失败时才回退到用户提供的 URL。

总结一下，请求应按如下方式进行：

1. 如果你有 Cloudhook URL，使用它直到某个请求失败。当请求失败时，进入步骤 2。
2. 如果你有 remote UI URL，用它构造 webhook URL：`<remote_ui_url>/api/webhook/<webhook_id>`。当请求失败时，进入步骤 3。
3. 使用设置期间提供的 instance URL 构造 webhook URL：`<instance_url>/api/webhook/<webhook_id>`。

## 通过 WebSocket API 发送 webhook 数据

Webhooks 也可以通过 WebSocket API 发送 `webhook/handle` 命令来交付：

```json
{
  "type": "webhook/handle",
  "id": 5,
  "method": "GET",
  // 以下字段为可选
  "body": "{\"hello\": \"world\"}",
  "headers": {
    "Content-Type": "application/json"
  },
  "query": "a=1&b=2",
}
```

响应将如下所示：

```json
{
  "type": "result",
  "id": 5,
  "result": {
    "body": "{\"ok": true}",
    "status": 200,
    "headers": {"Content-Type": response.content_type},
  }
}
```

## 关于 instance URLs 的简短说明

一些用户已配置 Home Assistant，使其通过动态 DNS 服务可在家庭网络外部访问。有些路由器不支持 hairpinning / NAT loopback：设备从路由器网络内部，通过外部配置的 DNS 服务，向同样位于本地网络内部的 Home Assistant 发送数据。

为解决此问题，应用应记录用户家庭网络的 WiFi SSID，并在连接到家庭 WiFi 网络时使用直接连接。

## 交互基础

### 请求

所有交互都通过向 webhook url 发送 HTTP POST 请求来完成。这些请求不需要包含认证信息。

payload 格式取决于交互类型，但它们都共享一个共同的基底：

```json
{
  "type": "<消息类型>",
  "data": {}
}
```

如果你在注册时收到 `secret`，你**必须**加密你的消息，并将其放入 payload 中，如下所示：

```json
{
  "type": "encrypted",
  "encrypted": true,
  "encrypted_data": "<加密消息>"
}
```

### 响应

作为一般规则，期望所有请求都收到 200 响应。但有几种情况你会收到其他代码：

- 如果你的 JSON 无效，你将收到 400 状态码。但如果加密的 JSON 无效，你将不会收到此错误。
- 在创建 sensor 时，你将收到 201。
- 如果你收到 404，则很可能是 `mobile_app` 组件未加载。
- 收到 410 表示该集成已被删除。你应该通知用户，并且很可能需要重新注册。

## 实现加密

`mobile_app` 支持通过 [Sodium](https://libsodium.gitbook.io/doc/) 进行双向加密通信。

:::info
Sodium 是一个现代、易于使用的软件库，用于加密、解密、签名、密码哈希等。
:::

### 选择库

针对大多数现代编程语言和平台，都有封装 Sodium 的库。Sodium 本身用 C 编写。

以下是我们建议使用的一些库，尽管你可以自由使用任何对你来说效果良好的库。

- Swift/Objective-C: [swift-sodium](https://github.com/jedisct1/swift-sodium)（由 Sodium 开发者维护的官方库）。

对于其他语言，请参阅[Bindings for other languages](https://doc.libsodium.org/bindings_for_other_languages)列表。如果有多个选择，我们推荐使用最近更新且经过最多同行评审（一个简便的检查方法是查看项目有多少 GitHub stars）的选择。

### 配置

我们使用 Sodium 的[secret-key cryptography](https://doc.libsodium.org/secret-key_cryptography)功能来加密和解密 payload。所有 payload 都以 Base64 编码的 JSON。对于 Base64 类型，使用 `sodium_base64_VARIANT_ORIGINAL`（即"original"，无 padding，非 URL safe）。如果 payload 在未加密时不包含 `data` key（例如 [get_config](https://developers.home-assistant.io/docs/api/native-app-integration/sending-data#get-config) 请求），则应改为加密一个空的 JSON 对象（`{}`）。

### 信令加密支持

有两种方式启用加密支持：

- **在初始注册期间**将 `supports_encryption` 设置为 `true`。
- **在初始注册之后**调用 `enable_encryption` webhook 操作。

Home Assistant 实例必须能够安装 `libsodium` 才能启用加密。通过初始注册或启用加密响应中是否存在 key `secret` 来确认你应该使所有未来的 webhook 请求加密。

你必须永远存储此 secret。无法通过 Home Assistant UI 恢复它，并且你**不应当**要求用户调查隐藏的存储文件以重新输入加密密钥。如果加密失败，你应当创建一个新的注册并提醒用户。

某个注册可能最初不支持加密，原因是 Home Assistant Core 一侧缺少 Sodium/NaCL。如果可能，你应始终努力加密通信。因此，我们礼貌地请求你时不时尝试自动启用加密，或允许用户通过应用中的按钮手动启用加密。这样，他们可以首先尝试修复导致 Sodium/NaCL 无法安装的任何错误，然后再拥有一个加密的注册。如果 Sodium/NaCL 无法安装，Home Assistant Core 会记录确切细节。

## 更新设备位置

此消息将通知 Home Assistant 新的位置信息。

```json
{
  "type": "update_location",
  "data": {
    "gps": [12.34, 56.78],
    "gps_accuracy": 120,
    "battery": 45
  }
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| `location_name` | string | 设备所在的 zone 名称。 |
| `gps` | latlong | 当前位置的纬度和经度。 |
| `gps_accuracy` | int | GPS 精度（米）。必须大于 0。 |
| `battery` | int | 设备剩余电池百分比。必须大于 0。 |
| `speed` | int | 设备速度（米/秒）。必须大于 0。 |
| `altitude` | int | 设备海拔（米）。必须大于 0。 |
| `course` | int | 设备行进方向，以度为单位测量，相对于正北。必须大于 0。 |
| `vertical_accuracy` | int | 海拔值的精度，以米为单位。必须大于 0。 |

## 调用 service action

在 Home Assistant 中调用 service action。

```json
{
  "type": "call_service",
  "data": {
    "domain": "light",
    "service": "turn_on",
    "service_data": {
      "entity_id": "light.kitchen"
    }
  }
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| `domain` | string | service action 的 domain |
| `service` | string | service action 名称 |
| `service_data` | dict | 要发送给 service action 的数据 |

## 触发 event

在 Home Assistant 中触发 event。请注意 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 上记录的数据结构。

```json
{
  "type": "fire_event",
  "data": {
    "event_type": "my_custom_event",
    "event_data": {
      "something": 50
    }
  }
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| `event_type` | string | 要触发的 event 类型 |
| `event_data` | string | 要触发的 event 数据 |

## 渲染 templates

渲染一个或多个 templates 并返回结果。

```json
{
  "type": "render_template",
  "data": {
    "my_tpl": {
      "template": "Hello {{ name }}, you are {{ states('person.paulus') }}.",
      "variables": {
        "name": "Paulus"
      }
    }
  }
}
```

`data` 必须包含一个 `key`: `dictionary` 的映射。结果将以 `{"my_tpl": "Hello Paulus, you are home"}` 的形式返回。这允许在单次调用中渲染多个 template。

| Key | Type | Description |
| --- | ---- | ----------- |
| `template` | string | 要渲染的 template |
| `variables` | Dict | 要包含的额外 template 变量。 |

## 更新注册

更新你的应用注册。如果 app 版本或其他值发生变化，请使用此功能。

```json
{
  "type": "update_registration",
  "data": {
    "app_data": {
      "push_token": "abcd",
      "push_url": "https://push.mycool.app/push"
    },
    "app_version": "2.0.0",
    "device_name": "Robbies iPhone",
    "manufacturer": "Apple, Inc.",
    "model": "iPhone XR",
    "os_version": "23.02"
  }
}
```

所有 key 均为可选。

| Key | Type | Description |
| --- | --- | --- |
| `app_data` | Dict | 如果应用有支持组件来扩展 mobile_app 功能或希望启用 notification platform，则可使用应用数据。 |
| `app_version` | string | 移动应用的版本。 |
| `device_name` | string | 运行该应用的设备的名称。 |
| `manufacturer` | string | 运行该应用的设备的制造商。 |
| `model` | string | 运行该应用的设备的型号。 |
| `os_version` | string | 运行该应用的设备的 OS 版本。 |

## 获取 zones

获取所有启用的 zones。

```json
{
  "type": "get_zones"
}
```

## 获取 config

返回一个版本的 `/api/config`，其中包含有助于配置应用的值。

```json
{
  "type": "get_config"
}
```

## 启用加密

_这需要 Home Assistant 0.106 或更高版本。_

为现有注册启用加密支持。

```json
{
  "type": "enable_encryption"
}
```

你可能收到两种错误：

- `encryption_already_enabled` - 此注册已经启用了加密
- `encryption_not_available` - 无法安装 Sodium/NaCL。停止所有未来启用加密的尝试。

## 流式传输 camera

_这需要 Home Assistant 0.112 或更高版本。_

获取有关如何流式传输 Camera 的路径信息。

```json
{
  "type": "stream_camera",
  "data": {
    "camera_entity_id": "camera.name_here"
  }
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| `camera_entity_id` | string | 要获取流式信息的 camera entity |

响应将包含通过 HLS 或通过 MJPEG image 预览流式传输的路径。

```json
{
  "hls_path": "/api/hls/…/playlist.m3u8",
  "mjpeg_path": "/api/camera_proxy_stream/…"
}
```

如果 HLS 流式传输不可用，`hls_path` 将为 `null`。有关如何构造完整 URL，请参见上面关于 instance URL 的说明。

## 处理 conversation

_这需要 Home Assistant 2023.2.0 或更高版本。_

使用 conversation 集成处理一个句子。

```json
{
  "type": "conversation_process",
  "data": {
    "text": "Turn on the lights",
    "language": "en",
    "conversation_id": "ABCD",
  }
}
```

有关可用的 key 和响应，请参阅[conversation API 文档](../../intent_conversation_api)。