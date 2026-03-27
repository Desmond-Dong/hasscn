---
title: HTTP
description: 'HTTP 集成为 Home Assistant 前端提供所需的全部文件和数据。只有当你想更改默认设置时，才需要将它添加到配置文件中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Other
ha_release: pre 0.7
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: http
ha_integration_type: system
---
# HTTP

**HTTP** 集成为 Home Assistant 前端提供所需的全部文件和数据。只有当你想更改默认设置时，才需要将它添加到配置文件中。

Home Assistant 当前支持以下设备类型：

- [二进制传感器](#binary-sensor)
- [传感器](#sensor)

:::warning
`server_host` 选项只能在 Home Assistant Container 安装中使用！

:::
```yaml
# configuration.yaml 配置示例
http:
```

```yaml
server_host:
  description: "仅监听特定 IP/主机上的传入请求。默认情况下，`http` 集成会自动检测 IPv4/IPv6，并监听所有连接。如果你只想监听 IPv4 地址，请使用 `server_host: 0.0.0.0`。此处列出的默认值假定同时支持 IPv4 和 IPv6。"
  required: false
  type: [list, string]
  default: "0.0.0.0, ::"
server_port:
  description: 允许你指定 Home Assistant 应监听的端口。
  required: false
  type: integer
  default: 8123
ssl_certificate:
  description: 用于通过安全连接提供 Home Assistant 服务的 TLS/SSL 证书路径。如果你使用的是 [Home Assistant 的 Let's Encrypt 应用](https://github.com/home-assistant/addons/tree/master/letsencrypt)（以前称为 Let's Encrypt 插件），该路径通常为 `/ssl/fullchain.pem`。相比使用此选项，我们更推荐使用 [Home Assistant 的 NGINX 应用](https://github.com/home-assistant/addons/tree/master/nginx_proxy)（以前称为 NGINX 插件）。
  required: false
  type: string
ssl_peer_certificate:
  description: 用于接受安全连接的客户端/对端 TLS/SSL 证书路径。
  required: false
  type: string
ssl_key:
  description: 用于通过安全连接提供 Home Assistant 服务的 TLS/SSL 密钥路径。如果你使用的是 [Let's Encrypt 应用](https://github.com/home-assistant/addons/tree/master/letsencrypt)，该路径通常为 `/ssl/privkey.pem`。
  required: false
  type: string
cors_allowed_origins:
  description: "允许发起 [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 请求的来源域名列表。启用后，如果请求的 Origin 在列表中，就会将 `Access-Control-Allow-Origin` 头设置为该 Origin，并将 `Access-Control-Allow-Headers` 头设置为 `Origin, Accept, X-Requested-With, Content-type, Authorization`。你必须提供精确的 Origin，也就是说，`https://www.home-assistant.io` 允许来自 `https://www.home-assistant.io` 的请求，但__不允许__来自 `http://www.home-assistant.io` 的请求。"
  required: false
  type: [string, list]
use_x_forwarded_for:
  description: "启用对 `X-Forwarded-For` 请求头的解析，以便在使用代理的环境中传递客户端的真实 IP 地址。要使其生效，你**必须**同时通过 `trusted_proxies` 设置将可信代理加入白名单。未列入白名单且带有此请求头的请求会被视为 IP 欺骗攻击，因此该请求头会被忽略。"
  required: false
  type: boolean
  default: false
use_x_frame_options:
  description: "控制 `X-Frame-Options` 响应头，以帮助防止 [点击劫持](https://en.wikipedia.org/wiki/Clickjacking)。"
  required: false
  type: boolean
  default: true
trusted_proxies:
  description: "可信代理列表，由 IP 地址或网段组成，这些代理被允许设置 `X-Forwarded-For` 请求头。使用 `use_x_forwarded_for` 时必须设置此项，因为无论请求源自哪里，所有请求到达 Home Assistant 时都会显示为来自反向代理的 IP 地址。因此，在反向代理场景中，你需要极其谨慎地设置此选项。如果直接上游代理不在列表中，请求将被拒绝。如果其他中间代理中有任何一个不在列表中，第一个不受信任的代理将被视为客户端。"
  required: false
  type: [string, list]
ip_ban_enabled:
  description: 表示是否启用额外 IP 过滤的标志。
  required: false
  type: boolean
  default: true
login_attempts_threshold:
  description: "当 `ip_ban_enabled` 为 `true` 时，来自同一 IP 的登录失败次数达到该值后会被自动封禁。设置为 -1 时，不会新增自动封禁。"
  required: false
  type: integer
  default: -1
ssl_profile:
  description: 要使用的 [Mozilla SSL 配置文件](https://wiki.mozilla.org/Security/Server_Side_TLS)。仅当某些集成导致 SSL 握手错误时，才应降低该级别。
  required: false
  type: string
  default: modern
```

下面的示例展示了 `configuration.yaml` 文件中的配置条目及其可能的取值：

```yaml
# configuration.yaml 配置示例
http:
  server_port: 12345
  ssl_certificate: /etc/letsencrypt/live/hass.example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/hass.example.com/privkey.pem
  cors_allowed_origins:
    - https://google.com
    - https://www.home-assistant.io
  use_x_forwarded_for: true
  trusted_proxies:
    - 10.0.0.200
    - 172.30.33.0/24
  ip_ban_enabled: true
  login_attempts_threshold: 5
```

[使用 Let's Encrypt 设置加密](/home-assistant/blog/2015/12/13/setup-encryption-using-lets-encrypt/) 这篇博客文章详细介绍了如何使用 [Let's Encrypt](https://letsencrypt.org/) 提供的免费证书来加密你的流量。

## 反向代理

使用反向代理时，你需要启用 `use_x_forwarded_for` 和 `trusted_proxies` 选项。如果未设置这些选项，来自反向代理的请求将被阻止。
  
```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 10.0.0.200      # Add the IP address of the proxy server
    - 172.30.33.0/24  # You may also provide the subnet mask
```

:::important
提供网络掩码时，你必须使用网络地址（例如 `192.168.1.0/24`），而不是主机地址（例如 `192.168.1.50/24`）。

:::
## API

在 `http` 集成之上，还提供了 [REST API](https://developers.home-assistant.io/docs/api/rest/)、[Python API](https://developers.home-assistant.io/docs/api_lib_index/) 和 [WebSocket API](https://developers.home-assistant.io/docs/api/websocket/)。

按照 Home Assistant 中的术语定义，`http` 平台并不是真正的平台。Home Assistant 的 [REST API](/home-assistant/developers/rest_api/) 通过 HTTP 发送和接收消息。

## HTTP 传感器

要在你的安装中使用这类[传感器](#sensor)或[二进制传感器](#binary-sensor)，无需在 Home Assistant 中进行配置。所有配置都在设备本身完成。这意味着你必须能够编辑目标 URL 或端点以及负载。实体会在收到第一条消息后创建。

如果你想使用 HTTP 传感器，请在 Home Assistant UI 中的 [**User profile**](https://my.home-assistant.io/redirect/profile/) 页面里的 **Security** 部分创建一个[长期有效访问令牌](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token)。

所有[请求](https://developers.home-assistant.io/docs/api/rest#post-apistatesentity_id)都必须发送到设备的端点，并且必须使用 **POST** 方法。

## IP 过滤与封禁

如果你想应用额外的 IP 过滤，并自动封禁暴力破解尝试，请将 `ip_ban_enabled` 设为 `true`，并将 `login_attempts_threshold` 设为触发封禁前允许的最大尝试次数。首次封禁后，根配置目录中会创建一个 `ip_bans.yaml` 文件。它会记录被封禁的 IP 地址以及添加封禁时的 UTC 时间：

```yaml
127.0.0.1:
  banned_at: "2016-11-16T19:20:03"
```

添加封禁后，Home Assistant 前端中会显示一条持久通知。

要清除 IP 封禁，你可以：

- 从 `ip_bans.yaml` 中删除对应的 IP 条目
- 删除整个 `ip_bans.yaml` 文件。下次发生封禁时，它会自动重新创建。

完成更改后，重启 Home Assistant 以应用这些更改。

## 文件托管

如果你想使用 Home Assistant 托管或提供静态文件，请在配置路径（`/config`）下创建一个名为 `www` 的目录。`www/` 中的静态文件可以通过 `http://your.domain:8123/local/` 这个 URL 访问，例如 `audio.mp3` 可通过 `http://your.domain:8123/local/audio.mp3` 访问。

:::important
如果这是你第一次创建 `www/` 文件夹，则需要重启 Home Assistant。

:::
:::caution
通过 `www` 文件夹（`/local/` URL）提供的文件不受 Home Assistant 身份验证保护。只要知道 URL，任何人都可以在无需身份验证的情况下访问存储在该文件夹中的文件。

:::
## 二进制传感器

HTTP 二进制传感器会在第一次向其 URL 发出请求时动态创建。你不需要事先在配置中定义它。

之后，只要 Home Assistant 正在运行，该传感器就会一直存在。重启 Home Assistant 后，该传感器会消失，直到再次被触发。

二进制传感器的 URL 如下例所示：

```bash
http://IP_ADDRESS:8123/api/states/binary_sensor.DEVICE_NAME
```

:::important
你应选择一个唯一的设备名称（DEVICE_NAME），以避免与其他设备冲突。

:::
JSON 负载必须包含新的状态，也可以包含友好名称。友好名称会在前端中用作传感器名称。

```json
{"state": "on", "attributes": {"friendly_name": "Radio"}}
```

如需快速测试，可以使用 `curl` 来“模拟”设备。

```bash
$ curl -X POST -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"state": "off", "attributes": {"friendly_name": "Radio"}}' \
    http://localhost:8123/api/states/binary_sensor.radio
```

要检查传感器是否正常工作，可以再次使用 `curl` 获取[当前状态](https://developers.home-assistant.io/docs/api/rest/)。

```bash
$ curl -X GET -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/binary_sensor.radio
{
    "attributes": {
        "friendly_name": "Radio"
    },
    "entity_id": "binary_sensor.radio",
    "last_changed": "16:45:51 05-02-2016",
    "last_updated": "16:45:51 05-02-2016",
    "state": "off"
}
```

要删除传感器，请使用 curl 发送 DELETE 请求。

```bash
$ curl -X DELETE -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       http://localhost:8123/api/states/binary_sensor.radio
```

### 示例

本节提供了一些如何使用此传感器的真实示例，除了前面已经展示过的 `curl` 之外。

#### 使用 Python requests 模块

正如 [API](/home-assistant/developers/rest_api/) 页面中已经展示的那样，使用 Python 和 [Requests](https://requests.kennethreitz.org/en/latest/) 模块与 Home Assistant 交互非常简单。

```python
response = requests.post(
    "http://localhost:8123/api/states/binary_sensor.radio",
    headers={
        "Authorization": "Bearer LONG_LIVED_ACCESS_TOKEN",
        "content-type": "application/json",
    },
    data=json.dumps({"state": "on", "attributes": {"friendly_name": "Radio"}}),
)
print(response.text)
```

#### 使用 `httpie`

[`httpie`](https://github.com/httpie/httpie) 是一个易于使用的命令行 HTTP 客户端。

```bash
$ http -v POST http://localhost:8123/api/states/binary_sensor.radio \
      'Authorization:Bearer LONG_LIVED_ACCESS_TOKEN' content-type:application/json state=off \
      attributes:='{"friendly_name": "Radio"}'
```

## 传感器

HTTP 传感器会在第一次向其 URL 发出请求时动态创建。你不需要事先在配置中定义它。

之后，只要 Home Assistant 正在运行，该传感器就会一直存在。重启 Home Assistant 后，该传感器会消失，直到再次被触发。

传感器的 URL 如下例所示：

```bash
http://IP_ADDRESS:8123/api/states/sensor.DEVICE_NAME
```

:::important
你应选择一个唯一的设备名称（DEVICE_NAME），以避免与其他设备冲突。

:::
JSON 负载必须包含新的状态，并且应包含测量单位和友好名称。友好名称会在前端中用作传感器名称。

```json
{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temperature"}}
```

如需快速测试，可以使用 `curl` 来“模拟”设备。

```bash
$ curl -X POST -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temp"}}' \
       http://localhost:8123/api/states/sensor.bathroom_temperature
```

然后，你可以再次使用 `curl` 获取[当前传感器状态](https://developers.home-assistant.io/docs/api/rest/)，以验证传感器是否正常工作。

```bash
$ curl -X GET -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/sensor.bathroom_temperature
{
    "attributes": {
        "friendly_name": "Bathroom Temp",
        "unit_of_measurement": "\u00b0C"
    },
    "entity_id": "sensor.bathroom_temperature",
    "last_changed": "09:46:17 06-02-2016",
    "last_updated": "09:48:46 06-02-2016",
    "state": "20"
}
```

如需更多示例，请参阅[HTTP 二进制传感器](#examples)部分。
