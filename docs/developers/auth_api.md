---
title: "认证 API"
sidebar_label: API
---

本页将描述你的应用程序对 Home Assistant 实例进行授权和集成所需的步骤。[查看演示](https://hass-auth-demo.glitch.me)，由我们的 helper lib [home-assistant-js-websocket](https://github.com/home-assistant/home-assistant-js-websocket) 提供支持。

每个用户都有自己的 Home Assistant 实例，这使每个用户能够控制自己的数据。然而，我们也希望使第三方开发者能够轻松创建允许用户与 Home Assistant 集成的应用程序。为此，我们采用了 [OAuth 2 规范][oauth2-spec]，并结合 [OAuth 2 IndieAuth 扩展][indieauth-spec] 来生成客户端。

## 客户端（Clients）

在你请求用户将其实例与你的应用程序授权之前，你需要一个客户端。在传统的 OAuth2 中，服务器需要在用户授权之前生成客户端。然而，由于每个服务器都属于一个用户，我们采用了与 [IndieAuth][indieauth-clients] 略有不同的方法。

你需要使用的 client ID 是你应用程序的网站。redirect URI 必须与 client ID 使用相同的主机和端口。例如：

- client ID：`https://www.my-application.io`
- redirect URI：`https://www.my-application.io/hass/auth_callback`

如果你需要不同的 redirect URI（例如在构建原生应用时），你可以在你的应用程序网站（即 client ID）的内容中添加一个 HTML 标签，包含已批准的 redirect URI。例如，将此添加到你的站点以允许 redirect URI `hass://auth`：

```html
<link rel='redirect_uri' href='hass://auth'>
```

Home Assistant 将扫描网站的前 10kB 以查找 link 标签。

## 授权（Authorize）

<a href='https://www.websequencediagrams.com/?lz=dGl0bGUgQXV0aG9yaXphdGlvbiBGbG93CgpVc2VyIC0-IENsaWVudDogTG9nIGludG8gSG9tZSBBc3Npc3RhbnQKABoGIC0-IFVzZXI6AEMJZSB1cmwgAD4JACgOOiBHbyB0bwAeBWFuZCBhAC0ICgBQDgB1DACBFw5jb2RlAHELAE4RZXQgdG9rZW5zIGZvcgAoBgBBGlQAJQUK&s=qsd'>
<img class='invertDark' src='/img/en/auth/authorize_flow.png' alt='各部分之间如何交互的概览' />
</a>

:::info
此处所有示例 URL 为显示目的添加了额外的空格和换行。
:::

Authorize URL 应包含 `client_id` 和 `redirect_uri` 作为查询参数。

```txt
http://your-instance.com/auth/authorize?
    client_id=https%3A%2F%2Fhass-auth-demo.glitch.me&
    redirect_uri=https%3A%2F%2Fhass-auth-demo.glitch.me%2F%3Fauth_callback%3D1
```

你还可以选择包含一个 `state` 参数，它将被添加到 redirect URI 中。state 非常适合存储你正在认证的实例 URL。示例：

```txt
http://your-instance.com/auth/authorize?
    client_id=https%3A%2F%2Fhass-auth-demo.glitch.me&
    redirect_uri=https%3A%2F%2Fhass-auth-demo.glitch.me%2Fauth_callback&
    state=http%3A%2F%2Fhomeassistant.local
```

用户将导航到该链接，并看到登录并授权你的应用程序的说明。一旦授权，用户将被重定向回传入的 redirect URI，其中包含 authorization code 和 state 作为查询参数的一部分。示例：

```txt
https://hass-auth-demo.glitch.me/auth_callback?
    code=12345&
    state=http%3A%2F%2Fhomeassistant.local
```

这个 authorization code 可以通过将其发送到 token 端点来交换为 tokens（见下一节）。

## Token

Token 端点在给定有效 grant 时返回 tokens。该 grant 是从 authorize 端点获取的 authorization code 或 refresh token。在 refresh token 的情况下，token 端点还能够撤销 token。

与该端点的所有交互都需要向 `http://your-instance.com/auth/token` 发送 HTTP POST 请求，并使用 `application/x-www-form-urlencoded` 编码请求体。

### Authorization code

:::tip
所有对 token 端点的请求必须包含与将用户重定向到 authorize 端点时使用的完全相同的 client ID。
:::

在用户成功完成 authorize 步骤后，使用 grant type `authorization_code` 获取 tokens。请求体为：

```txt
grant_type=authorization_code&
code=12345&
client_id=https%3A%2F%2Fhass-auth-demo.glitch.me
```

返回的响应将是一个 access token 和 refresh token：

```json
{
    "access_token": "ABCDEFGH",
    "expires_in": 1800,
    "refresh_token": "IJKLMNOPQRST",
    "token_type": "Bearer"
}
```

Access token 是一个短期有效的 token，可用于访问 API。Refresh token 可用于获取新的 access token。`expires_in` 值是 access token 有效的秒数。

如果发出了无效请求，将返回 HTTP 状态码 400。如果为非活动用户请求 token，HTTP 状态码将为 403。

```json
{
    "error": "invalid_request",
    "error_description": "Invalid client id",
}
```

### Refresh token

一旦通过 grant type `authorization_code` 获取了 refresh token，你就可以使用它来获取新的 access token。请求体为：

```txt
grant_type=refresh_token&
refresh_token=IJKLMNOPQRST&
client_id=https%3A%2F%2Fhass-auth-demo.glitch.me
```

返回的响应将是一个 access token：

```json
{
    "access_token": "ABCDEFGH",
    "expires_in": 1800,
    "token_type": "Bearer"
}
```

如果发出了无效请求，将返回 HTTP 状态码 400。

```json
{
    "error": "invalid_request",
    "error_description": "Invalid client id",
}
```

### 撤销 refresh token

:::tip
撤销 refresh token 不需要 `client_id`
:::

要撤销 refresh token，请向 `http://your-instance.com/auth/revoke` 发送 HTTP POST 请求，并使用 `application/x-www-form-urlencoded` 编码请求体。撤销 refresh token 将立即撤销该 refresh token 以及它曾经授予的所有 access token。请求体为：

```txt
token=IJKLMNOPQRST
```

请求将始终返回空响应体和 HTTP 状态 200，无论请求是否成功。

以前，撤销是通过向 token 端点（`/auth/token`）发送 `action=revoke` 来完成的。此形式已弃用，但为了向后兼容仍然有效：

```txt
token=IJKLMNOPQRST&
action=revoke
```

## 长期 access token

长期 access token 的有效期为 10 年。它们适用于与第三方 API 和 webhook 风格的集成。长期 access token 可以在用户 Home Assistant 个人资料页面底部的 **"Long-Lived Access Tokens"** 部分中创建。

你还可以使用 WebSocket 命令 `auth/long_lived_access_token` 生成长期 access token，它将为当前用户创建一个长期 access token。Access token 字符串不会保存在 Home Assistant 中；你必须将其记录在安全的地方。

```json
{
    "id": 11,
    "type": "auth/long_lived_access_token",
    "client_name": "GPS Logger",
    "lifespan": 365
}
```

响应包含一个长期 access token：

```json
{
    "id": 11,
    "type": "result",
    "success": true,
    "result": "ABCDEFGH"
}
```

## 发起经过认证的请求

一旦你有了 access token，你就可以向 Home Assistant API 发起经过认证的请求。

对于 WebSocket 连接，在 [authentication message](/developers/api/websocket#authentication-phase) 中传递 access token。

对于 HTTP 请求，将 token type 和 access token 作为 authorization header 传递：

```http
Authorization: Bearer ABCDEFGH
```

### 示例：cURL

```shell
curl -X GET \
  https://your.awesome.home/api/error/all \
  -H 'Authorization: Bearer ABCDEFGH'
```

### 示例：Python

```python
import requests

url = "https://your.awesome.home/api/error/all"
headers = {
    "Authorization": "Bearer ABCDEFGH",
}
response = requests.request("GET", url, headers=headers)

print(response.text)
```

### 示例：NodeJS

```javascript
fetch('https://your.awesome.home/api/error/all', {
  headers: { Authorization: 'Bearer ABCDEFGH' }
}).then(function (response) {
  if (!response.ok) {
    return Promise.reject(response);
  }
  return response.text();
}).then(function (body ) {
  console.log(body);
});
```

如果 access token 不再有效，你将收到 HTTP 状态码 401 unauthorized 的响应。这意味着你需要刷新 token。如果 refresh token 不起作用，说明 token 已不再有效，用户已登出。你应该清除用户数据并请求用户重新授权。

[oauth2-spec]: https://tools.ietf.org/html/rfc6749
[indieauth-spec]: https://indieauth.spec.indieweb.org/
[indieauth-clients]: https://indieauth.spec.indieweb.org/#client-identifier

## 签名路径（Signed paths）

有时你希望用户向 Home Assistant 发起 GET 请求以下载数据。在这种情况下，普通的认证系统无法满足要求，因为我们无法将用户与带有认证头的 API 关联起来。在这种情况下，签名路径可以帮助。

签名路径是我们服务器上的一个普通路径，如 `/api/states`，但附加了安全认证签名。用户可以导航到该路径，并将作为创建签名路径的 access token 进行授权。签名路径可以通过 WebSocket 连接创建，并且设计为短期有效。默认过期时间为 30 秒。

有两种方式获取签名路径。

如果你正在创建集成，请从 `homeassistant.components.http.auth` 导入 `async_sign_path`。该方法在从 HTTP 请求或 WebSocket 连接的上下文中调用时，会自动采用 refresh token。如果两者都不可用（例如，因为它在一个自动化内部），它将使用一个特殊的 "Home Assistant Content" 用户。

如果你正在处理前端，你可以使用以下 WebSocket 命令创建签名路径：

```js
{
  "type": "auth/sign_path",
  "path": "/api/states",
  // 可选，过期时间以秒为单位。默认为 30 秒
  "expires": 20
}
```

响应将包含签名路径：

```js
{
  "path": "/api/states?authSig=ABCDEFGH"
}
```

关于签名路径的注意事项：

- 如果 refresh token 被删除，签名 URL 将不再有效。
- 如果用户被删除，签名 URL 将不再有效（因为 refresh token 将被删除）。
- 如果 Home Assistant 重启，签名 URL 将不再有效。
- 访问仅在收到请求时验证。如果响应耗时超过过期时间（例如下载大文件），下载将在过期时间过去后继续进行。
