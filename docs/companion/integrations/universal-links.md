---
title: "通用链接、NFC 和 QR 标签"
id: 'universal-links'
---

对这些功能的支持正在积极开发中，可能尚未完全发布。

| 功能   | <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> | <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android |
| --------- | ----------------------------- | --------------------------------------- |
| NFC 标签  | 2020.5                        | 2.2.0                                   |
| QR 标签   | 2020.5                        | 2.2.0                                   |
| 旧式链接 | 2019.1                        | 不支持                           |

## NFC 标签和二维码

Home Assistant 支持扫描标签作为自动化的触发器。扫描的标签会在[设置中的标签面板](https://my.home-assistant.io/redirect/tags/)中收集。这允许您轻松管理已使用的标签并为它们提供友好的名称。

Home Assistant NFC 标签或二维码包含一个 URL，该 URL 将触发 Home Assistant 中触发标签扫描事件。格式是一个 URL `https://www.home-assistant.io/tag/<标签ID>`，以便 Android/iOS 知道将其路由到我们的应用。应用将提取标签标识符并将其直接发送到您的实例。

- <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />将您的设备靠近 NFC 标签或扫描二维码将显示一个通知，点击后将启动应用并触发一个事件。
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 在 Android 上，将您的设备靠近 Home Assistant NFC 标签或扫描二维码将触发一个事件。

触发的事件在 iOS 和 Android 上是相同的：`tag_scanned`。例如，在自动化中，您可以使用[标签触发器](https://www.home-assistant.io/docs/automation/trigger/#tag-trigger)来处理这些事件：

```yaml
# 对于 https://www.home-assistant.io/tag/50A3C7C8-1FE7-4BE8-8DC9-06E07D41B63D
automation:
- alias: 开门
  trigger:
    - platform: tag
      tag_id: 50A3C7C8-1FE7-4BE8-8DC9-06E07D41B63D
  action:
    # ...
```

两个应用都支持读取和写入 NFC 标签。您可以使用随机生成的标签值（如上所示）或自定义值。

:::info
某些 NFC 标签是只读的，不能用作 Home Assistant NFC 标签。其他标签可能只允许写入一次，之后就会变成只读。
:::

## 写入 NFC 标签

您可以通过打开应用 -> [设置](https://my.home-assistant.io/redirect/config/) -> 伴侣应用 -> NFC 卡片 -> 写入来写入 NFC 标签。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Xc120lClUgA" frameborder="0" allowfullscreen></iframe>
</div>

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xE7wm1bxRLs" frameborder="0" allowfullscreen></iframe>
</div>

## 旧式通用链接

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
通用链接是 [URL 处理器](/companion/integrations/url-handler)和 [X-Callback-URL](/companion/integrations/x-callback-url)的替代方案。

应用已将 `https://www.home-assistant.io/ios/` 下的所有 URL 注册为有效的通用链接。但是，目前应用只理解一个通用链接：

`https://www.home-assistant.io/ios/nfc/?url=<您可以使用现有 URL 处理器的 URL>`

这允许 NFC 支持。您可以使用上述 URL 写入 NFC 标签，当您的设备看到该 NFC 标签时，将显示一个通知让您打开应用。

一旦您打开应用，它将执行您在 URL 中告诉它的任何操作。

如果多个服务器连接到 iOS 或 mac 应用，在打开通用链接时将提示您选择一个服务器。