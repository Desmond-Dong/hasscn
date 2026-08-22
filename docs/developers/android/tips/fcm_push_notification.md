---
title: "Android FCM push notifications"
sidebar_label: "FCM push notifications"
---

## FCM push notifications 设置

:::note
设置 Firebase Cloud Messaging (FCM) 可能很复杂。除非你特别需要它，否则建议开发时使用 WebSocket 发送通知。
:::

如果你想要自己的 FCM 设置来实现 push notifications，请遵循以下步骤：

1. **创建 Firebase 项目**
   前往 [Firebase Console](https://console.firebase.google.com) 并创建一个新的 Firebase 项目。

2. **将 Android 应用添加到 Firebase 项目**
   在 Firebase 项目中将以下 package name 添加为 Android 应用：
   - `io.homeassistant.companion.android`
   - `io.homeassistant.companion.android.debug`
   - `io.homeassistant.companion.android.minimal`
   - `io.homeassistant.companion.android.minimal.debug`

3. **部署 push notification 服务**
   访问 [mobile-apps-fcm-push 仓库](https://github.com/home-assistant/mobile-apps-fcm-push) 并将服务部署到你的 Firebase 项目。

4. **设置 push notification URL**
   获取已部署服务的 `androidV1` URL 后，将其添加到 `${GRADLE_USER_HOME}/gradle.properties` 文件中。例如：

   ```properties
   homeAssistantAndroidPushUrl=https://mydomain.cloudfunctions.net/androidV1
   ```

   可选地，你还可以定义 rate limit 函数 URL：

   ```properties
   homeAssistantAndroidRateLimitUrl=https://mydomain.cloudfunctions.net/checkRateLimits
   ```

5. **下载并放置 `google-services.json` 文件**
   从 Firebase 项目下载 `google-services.json` 文件并将其放置在以下文件夹中：
   - `/app`
   - `/automotive`
   - `/wear`

:::note
`google-services.json` 文件必须包含上述所有 package name 的 client ID。否则，FCM push notifications 将无法工作（仅 WebSocket 通知功能正常）。
:::
