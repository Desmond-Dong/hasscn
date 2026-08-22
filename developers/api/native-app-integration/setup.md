当用户首次打开应用时，他们需要连接到本地实例以进行认证并注册设备。

## 用户认证

如果 Home Assistant 已配置 [zeroconf integration]，则可通过搜索 `_home-assistant._tcp.local.` 来发现本地实例。如果未配置，则需要向用户询问其实例的本地地址。

当实例地址已知时，应用会要求用户通过 [OAuth2 with Home Assistant] 进行认证。Home Assistant 使用 IndieAuth，这意味着要能重定向到触发你应用的 url，你需要采取一些额外步骤。务必仔细阅读 "Clients" 部分的最后一段。

[zeroconf integration]: https://www.home-assistant.io/integrations/zeroconf

[OAuth2 with Home Assistant]: auth_api.md

## 注册设备

*这需要 Home Assistant 0.90 或更高版本。*

Home Assistant 有一个 `mobile_app` 组件，允许应用注册自身并与实例交互。这是一个通用的组件，用于处理大多数常见的移动应用任务。如果你的应用需要比该组件提供的更多类型的交互，可以通过自定义交互来扩展此组件。

一旦你获得了用于认证用户的 tokens，就到了在 Home Assistant 中将应用注册到 mobile app 集成的时候了。

### 准备工作

首先，你必须确保 `mobile_app` 集成已加载。有两种方式可以做到这一点：

* 你可以发布一条 Zeroconf/Bonjour 记录 `_hass-mobile-app._tcp.local.` 来触发 `mobile_app` 集成的自动加载。你应在发布记录后至少等待 60 秒再继续。
* 你可以要求用户在他们的 configuration.yaml 中添加 `mobile_app` 并重启 Home Assistant。如果用户的配置中已经有 `default_config`，那么 `mobile_app` 应该已经加载了。

你可以通过检查 [`/api/config` REST API 调用](/developers/api/rest.md#get-api-config) 的 `components` 数组来确认 `mobile_app` 组件已加载。如果你继续设备注册并收到 404 状态码，那么它很可能尚未加载。

### 注册设备

要注册设备，请向 `/api/mobile_app/registrations` 发送一个经过认证的 POST 请求。[有关如何发起经过认证的请求的更多信息。](/developers/auth_api.md#making-authenticated-requests)

发送到注册端点的示例 payload：

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

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| `device_id` | V | string | 该设备的唯一标识符。Home Assistant 0.104 中新增。 |
| `app_id` | V | string | 该应用的唯一标识符。 |
| `app_name` | V | string | 移动应用的名称。 |
| `app_version` | V | string | 移动应用的版本。 |
| `device_name` | V | string | 运行该应用的设备的名称。 |
| `manufacturer` | V | string | 运行该应用的设备的制造商。 |
| `model` | V | string | 运行该应用的设备的型号。 |
| `os_name` | V | string | 运行该应用的 OS 名称。 |
| `os_version` | V | string | 运行该应用的设备的 OS 版本。 |
| `supports_encryption` | V | bool | 应用是否支持加密。另见[加密部分](/developers/api/native-app-integration/sending-data.md#implementing-encryption)。 |
| `app_data` | | Dict | 如果应用有支持组件来扩展 `mobile_app` 功能，则可使用应用数据。 |

当你收到 200 响应时，移动应用已注册到 Home Assistant。响应是一个 JSON 文档，将包含如何与 Home Assistant 实例交互的 URLs。你应该永久存储此信息。

```json
{
  "cloudhook_url": "https://hooks.nabu.casa/randomlongstring123",
  "remote_ui_url": "https://randomlongstring123.ui.nabu.casa",
  "secret": "qwerty",
  "webhook_id": "abcdefgh"
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| `cloudhook_url` | string | 由 Home Assistant Cloud 提供的 cloudhook URL。仅当用户积极订阅 Nabu Casa 时才会提供。 |
| `remote_ui_url` | string | 由 Home Assistant Cloud 提供的 remote UI URL。仅当用户积极订阅 Nabu Casa 时才会提供。 |
| `secret` | string | 用于加密通信的密钥。仅当应用和 Home Assistant 实例都支持加密时才会包含。[更多信息](/developers/api/native-app-integration/sending-data.md#implementing-encryption)。 |
| `webhook_id` | string | 可用于发送数据的 webhook ID。 |
