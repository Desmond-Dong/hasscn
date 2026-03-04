---
title: "本地推送"
id: "notification-local"
---

本地推送使用 [WebSocket API](https://developers.home-assistant.io/docs/api/websocket) 将通知传递到您的设备，而不是使用 Apple 的推送通知服务或 Google 的 Firebase 云消息传递。

| 平台 | 版本 |
| -------- | ------- |
| <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> | 2021.7 |
| <img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /> | 2021.7 |
| <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> | 2022.2 |

:::info
本地推送需要 HA core-2021.6 或更高版本，并结合上述支持的平台。
:::

## 要求

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 有一些限制：

1. 本地推送仅在通过内部 URL 连接时发生，并且需要配置 SSIDs 以将其视为内部。这是操作系统的限制，因为此功能是为低或最小连接情况设计的。
2. 虽然很小，但当启用本地推送时，电池使用量会增加少量，因为它会保持与您的 HA 服务器的持续连接。您可以在服务器的连接设置中禁用它。

<img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /> 只要应用正在运行，就会始终维持本地推送连接，并且不会对电池产生额外影响。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 将按照您的配置维持本地推送连接。为了保持此连接，应用需要创建一个持久通知，您将能够在设备上最小化 `Persistent Connection` 的通知渠道以隐藏它。根据您的设置，这可能会对电池寿命产生不利影响。如果您使用的是精简版本，您需要将此设置保持为"始终"，并考虑授予应用后台访问权限以使连接更可靠。

## 速率限制

通过本地推送传递的通知不计入[速率限制](details.md)。

## 配置

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 可以通过编辑服务器的内部连接设置来禁用本地推送。转到[设置](https://my.home-assistant.io/redirect/config/)，然后伴侣应用，点击服务器行，然后点击内部 URL。

<img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /> 没有禁用本地推送的选项，请参阅上面的要求了解更多信息。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 可以在[设置](https://my.home-assistant.io/redirect/config/)中配置本地推送设置，然后伴侣应用，点击服务器行，然后选择持久连接。

## 查看状态
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 和 <img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" />：
您可以在[设置](https://my.home-assistant.io/redirect/config/)的伴侣应用服务器部分查看本地推送的状态。这将显示以下几种状态之一：

* 已禁用，当连接设置关闭或当前不在内部网络时。
* 不支持，当 iOS 版本不支持本地推送时。
* 不可用，当核心版本不支持本地推送时。
* 正在建立，当它最初连接到服务器时。
* 可用，当它已连接并准备好接收推送时。后面的数字表示自连接开始以来收到的消息数，这对于调试很有用。