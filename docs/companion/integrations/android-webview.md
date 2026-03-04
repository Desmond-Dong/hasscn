---
title: "Android WebView"
id: 'android-webview'
---


<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

## 自动播放视频
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够在加载更多信息面板时自动播放视频。某些设备可能默认已经这样做，但其他设备可能需要在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用此设置。启用此设置可能会意外增加数据使用量，请谨慎操作。

## 应用启动时始终显示第一个视图
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够在打开应用时始终打开用户选择的默认仪表板的第一个视图。第一个视图是 Home Assistant 标题栏上的第一个标签页。

![第一个视图](/companion-assets/ha_first_view.png)

这非常有用，如果您的第一个视图包含有关智能家居的所有重要信息。如果您随后在另一个*不太重要的视图*上关闭应用，稍后再次打开应用时，您将立即在第一个视图上再次看到您的重要智能家居信息。

:::caution
如果您在 Home Assistant 配置或伴侣应用配置中，则打开应用时不会显示仪表板的第一个视图！
:::

## 保持屏幕开启
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够通过在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用相应设置，在 WebView 活动处于活动状态时保持屏幕开启。这让您的设备屏幕可以无限期保持开启，并忽略 Android 内置的睡眠设置。

此功能也可以通过通知命令控制，[参见详情](/companion/notifications/commands#screen-on)。

## 链接

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够拦截某些类型的链接，允许用户直接启动设备上找到的其他应用（如果未找到，则带用户去安装应用）。用户还可以使用[意图方案](https://developer.chrome.com/docs/multidevice/android/intents/#syntax)执行应用支持的任何操作。

使用 Lovelace 实体卡片 [weblink](https://www.home-assistant.io/dashboards/entities/#weblink) 的示例：

此示例将在设备上安装了 X 时启动它，否则将打开 Google Play 商店应用或网站。
```yaml
- type: weblink
  name: X
  url: "app://com.twitter.android"
```

此示例将通过意图方案启动条形码扫描应用准备扫描，如果应用未安装，用户将被引导去安装它。
```yaml
- type: weblink
  name: 扫描
  url: "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
```

## 屏幕方向
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够通过在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用相应设置来固定 WebView 横向/纵向/系统方向。

## 双指缩放
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够启用双指缩放以允许多点触控缩放，方法是在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用相应设置。

## 远程调试
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用能够启用 [Chrome 远程调试](https://developer.chrome.com/docs/devtools/remote-debugging/)以便更容易地排查前端问题。您可以在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 故障排除中启用此设置。