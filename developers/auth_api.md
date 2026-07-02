# 认证API

本页介绍应用程序如何获取对 Home Assistant 实例的授权并完成集成。[查看演示](https://hass-auth-demo.glitch.me)，该演示基于我们的辅助库 [home-assistant-js-websocket](https://github.com/home-assistant/home-assistant-js-websocket)。

每个用户都有自己的 Home Assistant 实例，因此每位用户都能掌控自己的数据。同时，我们也希望第三方开发者能够轻松创建与 Home Assistant 集成的应用。为此，我们采用了 \[OAuth 2 规范]\[oauth2-spec]，并结合 \[OAuth 2 IndieAuth 扩展]\[indieauth-spec] 来生成客户端。

## 客户端

在让用户通过您的应用授权其实例之前，您需要先准备一个客户端。在传统 OAuth2 中，客户端通常由服务器生成，然后用户再进行授权。但由于这里的每个服务器都归某个用户所有，因此我们采用了与 \[IndieAuth 客户端]\[indieauth-clients] 类似的方式。

要使用的客户端 ID 就是您应用程序的网站地址。重定向 URL 必须与客户端 ID 具有相同的主机和端口。例如：

* 客户端 ID：`https://www.my-application.io`
* 重定向 URI：`https://www.my-application.io/hass/auth_callback`

如果您需要使用不同的重定向 URL（例如在构建原生应用时），可以在应用网站（即客户端 ID 对应的网站）的 HTML 中添加已批准的重定向 URL。例如，若要将重定向 URI `hass://auth` 加入白名单，需要在网站中添加：

```html
<link rel='redirect_uri' href='hass://auth'>
```

Home Assistant 将扫描网站的前 10kB 来查找链接标签。

## 授权

<a href='https://www.websequencediagrams.com/?lz=dGl0bGUgQXV0aG9yaXphdGlvbiBGbG93CgpVc2VyIC0-IENsaWVudDogTG9nIGludG8gSG9tZSBBc3Npc3RhbnQKABoGIC0-IFVzZXI6AEMJZSB1cmwgAD4JACgOOiBHbyB0bwAeBWFuZCBhAC0ICgBQDgB1DACBFw5jb2RlAHELAE4RZXQgdG9rZW5zIGZvcgAoBgBBGlQAJQUK&s=qsd'>
<img class='invertDark' src='/developers/img/en/auth/authorize_flow.png' alt='Overview of how the different parts interact' />
</a>

:::info
此处显示的所有示例URL均带有额外的空格和换行符，仅用于显示目的。
:::

授权 URL 应包含 `client_id` 和 `redirect_uri` 这两个查询参数。

```txt
http://your-instance.com/auth/authorize?
    client_id=https%3A%2F%2Fhass-auth-demo.glitch.me&
    redirect_uri=https%3A%2F%2Fhass-auth-demo.glitch.me%2F%3Fauth_callback%3D1
```

您还可以选择加入 `state` 参数，该参数会在重定向时原样带回。它很适合用来保存您发起认证时所对应的实例 URL。例如：

```txt
http://your-instance.com/auth/authorize?
    client_id=https%3A%2F%2Fhass-auth-demo.glitch.me&
    redirect_uri=https%3A%2F%2Fhass-auth-demo.glitch.me%2Fauth_callback&
    state=http%3A%2F%2Fhassio.local%3A8123
```

用户访问该链接后，会看到登录并授权您的应用程序的页面。授权完成后，用户会被重定向回 `redirect_uri`，并在查询参数中附带授权码和 `state`。例如：

```txt
https://hass-auth-demo.glitch.me/auth_callback?
    code=12345&
    state=http%3A%2F%2Fhassio.local%3A8123
```

随后可将该授权码发送到令牌端点，以换取令牌（见下一节）。

## 令牌

令牌端点会为有效授权返回令牌。这里的授权既可以是从授权端点获取的授权码，也可以是刷新令牌。对于刷新令牌，令牌端点还支持执行撤销操作。

与该端点的所有交互都必须通过向 `http://your-instance.com/auth/token` 发送 HTTP POST 请求完成，且请求体需要使用 `application/x-www-form-urlencoded` 编码。

### 授权码

:::tip
发往该端点的所有请求都必须包含此前用于将用户重定向到授权端点的客户端 ID。
:::

当用户成功完成授权后，使用 `authorization_code` 授权类型来获取令牌。请求体如下：

```txt
grant_type=authorization_code&
code=12345&
client_id=https%3A%2F%2Fhass-auth-demo.glitch.me
```

返回结果会包含访问令牌和刷新令牌：

```json
{
    "access_token": "ABCDEFGH",
    "expires_in": 1800,
    "refresh_token": "IJKLMNOPQRST",
    "token_type": "Bearer"
}
```

访问令牌是短期令牌，可用于访问 API。刷新令牌可用于换取新的访问令牌。`expires_in` 表示访问令牌的有效秒数。

如果请求无效，接口会返回 HTTP 状态码 400。如果是为未激活用户请求令牌，则会返回 HTTP 状态码 403。

```json
{
    "error": "invalid_request",
    "error_description": "Invalid client id",
}
```

### 刷新令牌

通过 `authorization_code` 获取到刷新令牌后，您便可以用它换取新的访问令牌。请求体如下：

```txt
grant_type=refresh_token&
refresh_token=IJKLMNOPQRST&
client_id=https%3A%2F%2Fhass-auth-demo.glitch.me
```

返回结果会包含一个访问令牌：

```json
{
    "access_token": "ABCDEFGH",
    "expires_in": 1800,
    "token_type": "Bearer"
}
```

如果发出无效请求，将返回 HTTP 状态代码 400。

```json
{
    "error": "invalid_request",
    "error_description": "Invalid client id",
}
```

### 撤销刷新令牌

:::tip
撤销刷新令牌时无需提供 `client_id`
:::
令牌端点也支持撤销刷新令牌。撤销后，该刷新令牌以及它曾签发的所有访问令牌都会立即失效。要撤销刷新令牌，请发送以下请求：

```txt
token=IJKLMNOPQRST&
action=revoke
```

无论请求是否成功，接口都会返回空响应体和 HTTP 状态码 200。

## 长期访问令牌

长期访问令牌的有效期为 10 年。它们非常适合用于第三方 API 集成以及 webhook 风格的集成。用户可以在 Home Assistant 个人资料页面底部的 **“长期访问令牌”** 部分创建此类令牌。

您也可以通过 WebSocket 命令 `auth/long_lived_access_token` 生成长期访问令牌，这会为当前用户创建一个新的长期访问令牌。Home Assistant 不会保存该访问令牌字符串，因此您必须自行妥善保管。

```json
{
    "id": 11,
    "type": "auth/long_lived_access_token",
    "client_name": "GPS Logger",
    "client_icon": null,
    "lifespan": 365
}
```

响应包括一个长期访问令牌：

```json
{
    "id": 11,
    "type": "result",
    "success": true,
    "result": "ABCDEFGH"
}
```

## 发出经过身份验证的请求

获得访问令牌后，您就可以向 Home Assistant API 发起已认证请求。

对于 WebSocket 连接，请在[认证消息](/developers/api/websocket.md#authentication-phase)中发送访问令牌。

对于 HTTP 请求，请在 `Authorization` 请求头中提供令牌类型和访问令牌：

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

如果访问令牌已失效，您会收到 HTTP 状态码 401 Unauthorized。这表示您需要使用刷新令牌获取新的访问令牌。如果刷新令牌也失效，则表示该用户的授权状态已经失效。此时您应清除本地保存的用户数据，并要求用户重新授权。

\[oauth2-spec]：https://tools.ietf.org/html/rfc6749
\[indieauth-spec]: https://indieauth.spec.indieweb.org/
\[indieauth-clients]: https://indieauth.spec.indieweb.org/#client-identifier

## 签名路径

有时您会希望用户直接向 Home Assistant 发出 GET 请求来下载数据。在这种场景下，常规认证机制无法生效，因为我们无法把用户与一个带有认证请求头的 API 请求绑定起来。这时，签名路径就很有用。

签名路径是服务器上的普通路径，例如 `/api/states`，只是额外附带了一个安全签名。用户可以直接访问该路径，并以创建该签名路径时所对应的访问令牌权限完成授权。签名路径可通过 WebSocket 连接创建，且仅短时间有效，默认超时时间为 30 秒。

获取签名路径有两种方式。

如果您正在开发集成，请从 `homeassistant.components.http.auth` 导入 `async_sign_path`。如果它是在 HTTP 请求或 WebSocket 连接对应的上下文中调用，系统会自动使用相应的刷新令牌。如果两者都不可用（例如在自动化内部调用时），则会使用一个特殊的 “Home Assistant Content” 用户。

如果您在前端中使用，则可以通过以下 WebSocket 命令创建签名路径：

```js
{
  "type": "auth/sign_path",
  "path": "/api/states",
  // optional, expiration time in seconds. Defaults to 30 seconds
  "expires": 20
}
```

响应中将包含签名路径：

```js
{
  "path": "/api/states?authSig=ABCDEFGH"
}
```

关于签名路径，需要注意以下几点：

* 如果刷新令牌被删除，签名 URL 将立即失效。
* 如果用户被删除，签名 URL 也会失效，因为对应的刷新令牌会被删除。
* 如果 Home Assistant 重启，签名 URL 将失效。
* 访问权限只会在收到请求时校验一次。如果响应过程持续超过过期时间（例如下载大文件），下载仍会继续完成。
