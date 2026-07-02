# 发送数据回家

当你的应用完成 mobile app 组件注册后，就可以通过提供的 webhook 信息开始与 Home Assistant 交互。

## 通过 Rest API 发送 webhook 数据

第一步是把返回的 webhook ID 组装成完整 URL：`<instance_url>/api/webhook/<webhook_id>`。后续所有交互都只需要这个 URL。该 webhook 端点不需要认证请求。

如果注册过程中提供了 Cloudhook URL，应默认优先使用它；只有在请求失败时，才回退到上面所述的拼接 URL。

如果注册过程中提供了 remote UI URL，那么在构造 URL 时应优先将它作为 `instance_url` 使用；只有当 remote UI URL 失败时，才回退到用户提供的 URL。

总结一下，请按以下顺序发起请求：

1. 如果有 Cloudhook URL，就持续使用它，直到请求失败。失败后进入第 2 步。
2. 如果有 remote UI URL，就用它构造 webhook URL：`<remote_ui_url>/api/webhook/<webhook_id>`。请求失败后进入第 3 步。
3. 使用设置过程中提供的实例 URL 构造 webhook URL：`<instance_url>/api/webhook/<webhook_id>`。

## 通过 WebSocket API 发送 webhook 数据

Webhook 也可以通过 WebSocket API 发送，只需发送 `webhook/handle` 命令：

```json
{
  "type": "webhook/handle",
  "id": 5,
  "method": "GET",
  // Below fields are optional
  "body": "{\"hello\": \"world\"}",
  "headers": {
    "Content-Type": "application/json"
  },
  "query": "a=1&b=2",
}
```

响应格式如下：

```json
{
  "type": "result",
  "id": 5,
  "result": {
    "body": "{\"ok\": true}",
    "status": 200,
    "headers": {"Content-Type": response.content_type},
  }
}
```

## 关于实例 URL 的简短说明

有些用户会使用动态 DNS 服务，让 Home Assistant 在家庭网络外也可访问。但部分路由器不支持 hairpinning / NAT loopback：也就是设备在路由器内网中，通过外部 DNS 地址访问同样位于内网中的 Home Assistant。

为解决这个问题，应用应记录用户家庭网络对应的 WiFi SSID，并在连接到该家庭 WiFi 时改用直连方式。

## 交互基础

### 请求

所有交互都通过向 webhook URL 发起 HTTP POST 请求完成，这些请求不需要包含认证信息。

负载格式会因交互类型而异，但都基于同一个通用结构：

```json
{
  "type": "<type of message>",
  "data": {}
}
```

如果你在注册期间收到了 `secret`，那么你**必须**加密消息，并按如下方式放入负载：

```json
{
  "type": "encrypted",
  "encrypted": true,
  "encrypted_data": "<encrypted message>"
}
```

### 响应

通常情况下，你的所有请求都应收到 `200` 响应。但在以下几种场景中会返回其他状态码：

* 如果 JSON 无效，你会收到 `400` 状态码；但如果无效的是加密后的 JSON，则不会返回这个错误。
* 创建传感器时会收到 `201`。
* 如果收到 `404`，很可能是 `mobile_app` 组件尚未加载。
* 收到 `410` 表示该集成已被删除。你应通知用户，并通常需要重新注册。

## 实现加密

`mobile_app` 支持通过 [Sodium](https://libsodium.gitbook.io/doc/) 进行双向加密通信。

:::info
Sodium 是一个现代、易用的软件库，可用于加密、解密、签名、密码哈希等。
:::

### 选择库

大多数现代编程语言和平台都有对 Sodium 的封装库。Sodium 本身是用 C 编写的。

下面是我们建议使用的库，不过你也可以选择任何更适合自己的实现。

* Swift/Objective-C: [swift-sodium](https://github.com/jedisct1/swift-sodium) (official library maintained by Sodium developers).

对于其他语言，请参阅 [Bindings for other languages](https://doc.libsodium.org/bindings_for_other_languages) 列表。如果有多个可选项，我们建议优先选择最近仍在更新、且经过更多同行审查的实现（一个简单判断方式是查看 GitHub star 数量）。

### 配置

We use the [secret-key cryptography](https://doc.libsodium.org/secret-key_cryptography) features of Sodium to encrypt and decrypt payloads. All payloads are JSON encoded in Base64. For Base64 type, use `sodium_base64_VARIANT_ORIGINAL` (that is, "original", no padding, not URL safe). If the payload does not contain a `data` key when unencrypted (such as with the [get\_config](https://developers.home-assistant.io/docs/api/native-app-integration/sending-data#get-config) request), an empty JSON object (`{}`) must be encrypted instead.

### 标示支持加密

启用加密支持有两种方式：

* **首次注册时** 将 `supports_encryption` 设为 `true`。
* **首次注册后** 调用 `enable_encryption` webhook 动作。

The Home Assistant instance must be able to install `libsodium` to enable encryption. Confirm that you should make all future webhook requests encrypted by the presence of the key `secret` in the initial registration or enable encryption response.

You must store this secret forever. There is no way to recover it via the Home Assistant UI and you should **not** ask users to investigate hidden storage files to re-enter the encryption key. You should create a new registration if encryption ever fails and alert the user.

A registration may not initially support encryption due to a lack of Sodium/NaCL on the Home Assistant Core side. You should always strive to encrypt communications if possible. Therefore, we politely request that from time to time you attempt to enable encryption automatically or allow the user to manually enable encryption via a button in your app. That way, they can attempt to first fix whatever error is causing Sodium/NaCL to be uninstallable and then have an encrypted registration later. Home Assistant Core will log exact details if Sodium/NaCL is uninstallable.

## 更新设备位置

This message will inform Home Assistant of new location information.

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

| 键 | 类型 | 说明
| --- | ---- | -----------
| `location_name` | string | Name of the zone the device is in.
| `gps` | latlong | Current location as latitude and longitude.
| `gps_accuracy` | int | GPS accuracy in meters. Must be greater than 0.
| `battery` | int | Percentage of battery the device has left. Must be greater than 0.
| `speed` | int | Speed of the device in meters per second. Must be greater than 0.
| `altitude` | int | Altitude of the device in meters. Must be greater than 0.
| `course` | int | The direction in which the device is traveling, measured in degrees and relative to due north. Must be greater than 0.
| `vertical_accuracy` | int | The accuracy of the altitude value, measured in meters. Must be greater than 0.

## 调用服务动作

调用 Home Assistant 中的服务动作。

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

| 键 | 类型 | 说明
| --- | ---- | -----------
| `domain` | string | The domain of the service action
| `service` | string | The service action name
| `service_data` | dict | The data to send to the service action

## 触发事件

在 Home Assistant 中触发一个事件。请留意数据结构，并参考我们的 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 文档。

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

| 键 | 类型 | 说明
| --- | ---- | -----------
| `event_type` | string | Type of the event to fire
| `event_data` | string | Data of the event to fire

## 渲染模板

渲染一个或多个模板，并返回结果。

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

`data` must contain a map of `key`: `dictionary`. Results will be returned like `{"my_tpl": "Hello Paulus, you are home"}`. This allows for rendering multiple templates in a single call.

| 键 | 类型 | 说明
| --- | ---- | -----------
| `template` | string | The template to render
| `variables` | Dict | The extra template variables to include.

## 更新注册

更新你的应用注册信息。当应用版本或其他任意字段发生变化时，都应使用此操作。

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

所有键都是可选的。

| 键 | 类型 | 说明
| --- | --- | --
| `app_data` | Dict | App data can be used if the app has a supporting component that extends mobile\_app functionality or wishes to enable the notification platform.
| `app_version` | string | Version of the mobile app.
| `device_name` | string | Name of the device running the app.
| `manufacturer` | string | The manufacturer of the device running the app.
| `model` | string | The model of the device running the app.
| `os_version` | string | The OS version of the device running the app.

## 获取区域

获取所有已启用的区域。

```json
{
  "type": "get_zones"
}
```

## 获取配置

返回一个适合应用配置使用的 `/api/config` 精简版本。

```json
{
  "type": "get_config"
}
```

## 启用加密

*这需要 Home Assistant 0.106 或更高版本。*

为现有注册启用加密支持。

```json
{
  "type": "enable_encryption"
}
```

你可能会收到以下两种错误：

* `encryption_already_enabled` - Encryption is already enabled for this registration
* `encryption_not_available` - Sodium/NaCL is unable to be installed. Cease all future attempts to enable encryption.

## 串流摄像头

*这需要 Home Assistant 0.112 或更高版本。*

获取摄像头串流所需的路径信息。

```json
{
  "type": "stream_camera",
  "data": {
    "camera_entity_id": "camera.name_here"
  }
}
```

| 键 | 类型 | 说明
| --- | ---- | -----------
| `camera_entity_id` | string | The camera entity to retrieve streaming information about

响应会包含 HLS 串流路径，或 MJPEG 图像预览路径。

```json
{
  "hls_path": "/api/hls/…/playlist.m3u8",
  "mjpeg_path": "/api/camera_proxy_stream/…"
}
```

如果 HLS 串流不可用，`hls_path` 将为 `null`。如何拼接完整 URL，请参考前文关于实例 URL 的说明。

## 处理对话

*这需要 Home Assistant 2023.2.0 或更高版本。*

通过对话集成处理一句话。

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

可用字段及响应格式请参阅[对话 API 文档](/developers/intent_conversation_api.md)。
