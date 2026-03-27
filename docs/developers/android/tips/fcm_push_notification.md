---
title: "安卓推送通知（FCM）"
description: '设置 Firebase 云消息传递 (FCM) 可能很复杂。除非您特别需要，否则请考虑使用通过 WebSocket 的通知来进行开发。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: "FCM 推送通知"
---
# 安卓推送通知（FCM）

## FCM 推送通知设置

:::note
设置 Firebase 云消息传递 (FCM) 可能很复杂。除非您特别需要，否则请考虑使用通过 WebSocket 的通知来进行开发。
:::

如果您想要自己的 FCM 设置来推送通知，请按照以下步骤操作：

1. @@格式0@@
转到 [Firebase Console](https://console.firebase.google.com) 并创建一个新的 Firebase 项目。

2. @@格式0@@
在您的 Firebase 项目中添加以下包名称作为 Android 应用：
   - @@保护0@@
   - @@保护0@@
   - @@保护0@@
   - @@保护0@@

3. @@格式0@@
访问 [mobile-apps-fcm-push repository](https://github.com/home-assistant/mobile-apps-fcm-push) 并将服务部署到您的 Firebase 项目。

4. @@格式0@@
获得已部署服务的`androidV1` URL 后，将其添加到您的`${GRADLE_USER_HOME}/gradle.properties` 文件中。例如：

   ```properties
   homeAssistantAndroidPushUrl=https://mydomain.cloudfunctions.net/androidV1
   ```

或者，您还可以定义速率限制功能 URL：

   ```properties
   homeAssistantAndroidRateLimitUrl=https://mydomain.cloudfunctions.net/checkRateLimits
   ```

5. @@格式0@@
从 Firebase 项目下载 `google-services.json` 文件并将其放置在以下文件夹中：
   - @@保护0@@
   - @@保护0@@
   - @@保护0@@

:::note
`google-services.json` 文件必须包含上面列出的所有包名称的客户端 ID。如果没有这个，FCM 推送通知将无法工作（只有 WebSocket 通知才能工作）。
:::
