---
title: "外部身份验证"
description: '默认情况下，前端会自行处理认证 token。如果没有找到 token，它会将用户重定向到登录页，并负责更新 token。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 外部身份验证

默认情况下，前端会自行处理认证 token。如果没有找到 token，它会将用户重定向到登录页，并负责更新 token。

如果你想在外部应用中嵌入 Home Assistant 前端，你通常会希望将认证信息存储在应用内部，但同时让前端也能使用它。为支持这一点，Home Assistant 暴露了一个外部身份验证 API。

要激活这个 API，请在加载前端时在 URL 后附加 `?external_auth=1`。传入该参数后，Home Assistant 会期望 `window.externalApp`（Android）或 `window.webkit.messageHandlers`（iOS）已定义，并且其中包含下文描述的方法。

## 获取 access token

_该 API 于 Home Assistant 0.78 引入。_

当前端加载时，它会向外部身份验证请求一个 access token。它会使用一个 options 对象调用以下方法之一。该 options 对象定义了一个回调方法，用于接收响应；还可以包含一个可选的 `force` 布尔值，当其为 `true` 时，无论 access token 是否已过期，都应强制刷新。

`force` 布尔值于 Home Assistant 0.104 引入，因此并不一定总是可用。

```js
window.externalApp.getExternalAuth({
  callback: "externalAuthSetToken",
  force: true
});
// or
window.webkit.messageHandlers.getExternalAuth.postMessage({
  callback: "externalAuthSetToken",
  force: true
});
```

响应应包含一个表示是否成功的布尔值，以及一个对象，其中包含 access token 和它还能保持有效的秒数。请将响应传递给 options 对象中定义的函数。

```js
// To be called by external app
window.externalAuthSetToken(true, {
  access_token: "qwere",
  expires_in: 1800
});

// If unable to get new access token
window.externalAuthSetToken(false);
```

当前端首次加载页面时，以及任何时候它需要一个有效 token 但之前收到的 token 已过期时，都会调用此方法。

## 撤销 token

_该 API 于 Home Assistant 0.78 引入。_

当用户在个人资料页面点击退出登录按钮时，外部应用必须[撤销 refresh token](/developers/auth_api#revoking-a-refresh-token)，并将用户登出。

```js
window.externalApp.revokeExternalAuth({
  callback: "externalAuthRevokeToken"
});
// or
window.webkit.messageHandlers.revokeExternalAuth.postMessage({
  callback: "externalAuthRevokeToken"
});
```

完成后，外部应用必须调用 options 对象中定义的函数。

```js
// To be called by external app
window.externalAuthRevokeToken(true);

// If unable to logout
window.externalAuthRevokeToken(false);
```
