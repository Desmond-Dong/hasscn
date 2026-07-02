# 连接到实例

当用户首次打开应用时，需要连接到其本地实例，以完成认证并注册设备。

## 对用户进行认证

如果 Home Assistant 配置了 [zeroconf integration]，则可以通过搜索 `_home-assistant._tcp.local.` 发现本地实例。如果未配置，则需要向用户询问其实例的本地地址。

当已知实例地址后，应用会要求用户通过 [OAuth2 with Home Assistant] 完成认证。Home Assistant 使用 IndieAuth，这意味着如果你要重定向到能触发应用的 URL，需要额外执行一些步骤。请务必仔细阅读 “Clients” 小节的最后一段。

[zeroconf integration]: https://www.home-assistant.io/integrations/zeroconf

[OAuth2 with Home Assistant]: auth_api.md

## 注册设备

*这要求 Home Assistant 版本为 0.90 或更高。*

Home Assistant 提供了 `mobile_app` 组件，允许应用自行注册并与实例交互。这是一个用于处理大多数常见移动应用任务的通用组件。如果你的应用需要超出该组件现有能力的更多交互类型，也可以对其进行扩展。

当你已经获得代表用户进行认证的令牌后，就可以开始通过 Home Assistant 中的 mobile app 集成注册应用。

### 准备工作

首先，你必须确保已加载 `mobile_app` 集成。有两种方法可以做到这一点：

* 你可以发布一个 Zeroconf/Bonjour 记录 `_hass-mobile-app._tcp.local.`，以触发 `mobile_app` 集成的自动加载。发布该记录后，继续之前应至少等待 60 秒。
* 你也可以要求用户将 `mobile_app` 添加到其 `configuration.yaml` 中，并重启 Home Assistant。如果用户的配置中已经包含 `default_config`，那么 `mobile_app` 应该已经被加载。

你可以通过检查 [`/api/config` REST API 调用](/developers/api/rest.md) 返回结果中的 `components` 数组，来确认 `mobile_app` 组件是否已加载。如果你继续进行设备注册时收到 404 状态码，则很可能说明它还没有加载完成。

### 注册设备

要注册设备，请向 `/api/mobile_app/registrations` 发起一个带认证的 POST 请求。关于如何发起带认证请求的更多信息，请参阅[认证 API](/developers/auth_api.md)。

发送到注册端点的示例负载：

```json
{
  "device_id": "ABCDEFGH",
  "app_id": "awesome_home",
  "app_name": "Awesome Home",
  "app_version": "1.2.0",
  "device_name": "Robbies iPhone",
  "manufacturer": "Apple, Inc.",
  "model": "iPhone X",
  "os_name": "iOS",
  "os_version": "iOS 10.12",
  "supports_encryption": true,
  "app_data": {
    "push_notification_key": "abcdef"
  }
}
```

| Key                   | Required | Type   | Description |
| --------------------- | -------- | ------ | ----------- |
| `device_id`           | V        | string | 该设备的唯一标识符。自 Home Assistant 0.104 起提供 |
| `app_id`              | V        | string | 该应用的唯一标识符。 |
| `app_name`            | V        | string | 移动应用名称。 |
| `app_version`         | V        | string | 移动应用版本。 |
| `device_name`         | V        | string | 运行该应用的设备名称。 |
| `manufacturer`        | V        | string | 运行该应用的设备制造商。 |
| `model`               | V        | string | 运行该应用的设备型号。 |
| `os_name`             | V        | string | 运行该应用的操作系统名称。 |
| `os_version`          | V        | string | 运行该应用的设备操作系统版本。 |
| `supports_encryption` | V        | bool   | 应用是否支持加密。另见[发送数据](/developers/api/native-app-integration/sending-data.md)。 |
| `app_data`            |          | Dict   | 如果应用有扩展 `mobile_app` 功能的配套组件，则可使用应用数据。 |

当你收到 200 响应时，说明移动应用已在 Home Assistant 中注册成功。响应是一个 JSON 文档，其中包含与 Home Assistant 实例交互所需的 URL。你应永久保存这些信息。

```json
{
  "cloudhook_url": "https://hooks.nabu.casa/randomlongstring123",
  "remote_ui_url": "https://randomlongstring123.ui.nabu.casa",
  "secret": "qwerty",
  "webhook_id": "abcdefgh"
}
```

| Key             | Type   | Description |
| --------------- | ------ | ----------- |
| `cloudhook_url` | string | Home Assistant Cloud 提供的 cloudhook URL。仅在用户当前订阅了 Nabu Casa 时提供。 |
| `remote_ui_url` | string | Home Assistant Cloud 提供的远程 UI URL。仅在用户当前订阅了 Nabu Casa 时提供。 |
| `secret`        | string | 用于加密通信的密钥。仅在应用和 Home Assistant 实例双方都支持加密时才会包含该字段。[更多信息](/developers/api/native-app-integration/sending-data.md)。 |
| `webhook_id`    | string | 可用于回传数据的 webhook ID。 |
