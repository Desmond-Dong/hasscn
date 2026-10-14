默认情况下，前端会自行管理其认证 token。如果未找到 token，它会将用户重定向到登录页面，并负责更新 token。

如果你想在外部应用中嵌入 Home Assistant 前端，你会希望将认证信息存储在应用中，但同时让前端能够访问它。为此，Home Assistant 提供了一个外部认证 API。

要激活此 API，请在 URL 末尾附加 `?external_auth=1` 加载前端。如果传入了此参数，Home Assistant 将期望定义了 `window.externalAppV2`（Android V2，推荐）、`window.externalApp`（Android V1，备选）或 `window.webkit.messageHandlers`（iOS），并包含下面描述的方法。

:::note
V2（`window.externalAppV2`）要求 WebView 支持 [`WebViewFeature.WEB_MESSAGE_LISTENER`][web-message-listener]。否则应用应回退到 V1。
:::

## 获取 access token

当前端加载时，它会向外部认证请求一个 access token。它通过调用以下方法之一来实现。选项中包含要使用响应调用的回调方法，以及一个可选的 `force` 布尔值；无论 access token 是否已过期，如果它应该被刷新，该值设为 `true`。在 Android 上，选项以序列化 JSON 字符串的形式传递，而在 iOS 上，它们以对象的形式传递。

回调名称是稳定的，不会更改。应用应验证回调名称与预期值是否匹配，以确保回调未被伪造。

`force` 布尔值是在 Home Assistant 0.104 中引入的，可能并不总是可用。

```js
// Android V2（推荐）
window.externalAppV2.postMessage(
  JSON.stringify({
    type: "getExternalAuth",
    payload: { callback: "externalAuthSetToken", force: true },
  })
);

// Android V1（备选）
window.externalApp.getExternalAuth(
  JSON.stringify({ callback: "externalAuthSetToken", force: true })
);

// iOS
window.webkit.messageHandlers.getExternalAuth.postMessage({
  callback: "externalAuthSetToken",
  force: true,
});
```

响应应包含一个布尔值，表示是否成功，以及一个包含 access token 及其有效秒数的对象。将响应传递给选项对象中定义的函数。

```js
// 由外部应用调用
window.externalAuthSetToken(true, {
  access_token: "qwere",
  expires_in: 1800
});

// 如果无法获取新的 access token
window.externalAuthSetToken(false);
```

当页面首次加载时，以及每当前端需要一个有效 token 但之前收到的 token 已过期时，前端都会调用此方法。

## 撤销 token

当用户在个人资料页面上按下注销按钮时，外部应用必须[撤销 refresh token](auth_api.md#revoking-a-refresh-token)，并将用户注销。

回调名称是稳定的，不会更改。应用应验证回调名称与预期值是否匹配，以确保回调未被伪造。

```js
// Android V2（推荐）
window.externalAppV2.postMessage(
  JSON.stringify({
    type: "revokeExternalAuth",
    payload: { callback: "externalAuthRevokeToken" },
  })
);

// Android V1（备选）
window.externalApp.revokeExternalAuth(
  JSON.stringify({ callback: "externalAuthRevokeToken" })
);

// iOS
window.webkit.messageHandlers.revokeExternalAuth.postMessage({
  callback: "externalAuthRevokeToken",
});
```

完成后，外部应用必须调用选项对象中定义的函数。

```js
// 由外部应用调用
window.externalAuthRevokeToken(true);

// 如果无法注销
window.externalAuthRevokeToken(false);
```

[web-message-listener]: https://developer.android.com/reference/androidx/webkit/WebViewCompat.WebMessageListener
