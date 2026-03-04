---
title: "隐私、速率限制和安全"
id: "notification-details"
---

## 隐私

通知内容不会存储在远程服务器上。仅保留所需的推送注册数据以及每个设备每天发送的推送通知总数的简单计数器（用于速率限制目的）。

## 架构
为了提供通知服务，应用使用 Google 的 Firebase 云消息传递服务。有关 Firebase 的更多信息，请[点击这里](https://firebase.google.com/docs/cloud-messaging)。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
如果您不希望与 Google 的服务器交换数据，可以在使用应用时在[配置](https://my.home-assistant.io/redirect/config/)的伴侣应用设置的隐私部分选择退出 Firebase 服务。这样做将停止通知功能。  

## 速率限制

目前，每个设备每天最多允许发送 500 条推送通知。速率限制每天 UTC 午夜重置。这是为了确保服务的维护成本保持低廉。将来我们可能会添加支持升级以允许更多通知。

iOS 应用中的应用内通知设置屏幕显示您当天的当前速率限制，分为以下类别：尝试、已送达、错误、总计，以及到下次每日重置的确切时间。对于 Android，您可以在[配置](https://my.home-assistant.io/redirect/config/)的伴侣应用屏幕上找到这些详细信息。或者，您也可以通过为 [`logger`](https://www.home-assistant.io/integrations/logger/) 集成设置 `homeassistant.components.mobile_app.notify: info` 来查看它们。

如果发送通知时发生错误，则不计入您的速率限制。[关键警报](critical.md)和[通知命令](commands.md)也不计入您的速率限制。


## 安全

您的 Home Assistant 实例、推送基础架构和设备操作系统之间的所有流量都使用 SSL 加密。通知内容在 Firebase 云消息传递服务上未加密，因此可能被 Google 处理。