---
title: Home Assistant Companion for Android 1.6 and 1.7
description: Today we're releasing a big update for our Android companion app including
  actionable 通知, requesting location updates, 传感器 and more
---
# Home Assistant Companion for Android 1.6 and 1.7

在过去一周里，我们为 Home Assistant Companion for Android 带来了一些很棒的新功能和改进。我想借这个机会，重点介绍一下 1.6 和 1.7 版本中最近加入的内容。

## 可交互通知

现在你可以动态为通知定义操作按钮。当你点击这些按钮中的任意一个时，应用会把事件回传给 Home Assistant，这样你就能根据用户点击的按钮执行对应操作。

下面是一个示例：当车库门持续打开 30 分钟后，询问用户是否要将其关闭：

```yaml
automation:
  - alias: "Notify apps when the garage door opens"
    trigger:
      platform: state
      entity_id: cover.garage_door
      from: "closed"
      to: "open"
      for: ‘0:30:00’
    action:
      service: notify.mobile_app_robbies_pixel_5
      data:
        message: "The garage has been left open"
        data:
          image: https://www.home-assistant.io/images/merchandise/shirt-frontpage.png
          actions:
            - action: "close_garage" # The key you are sending for the event
              title: "Close Garage Door" # The button title

  - alias: "Close the garage when notification action is tapped"
    trigger:
      platform: event
      event_type: mobile_app_notification_action
      event_data:
        action: close_garage
    action:
      service: cover.close_cover
      target:
        entity_id: cover.garage_door
```

添加这些自动化后，只要车库门持续打开 30 分钟，你的设备就会收到一条类似下面的通知：

![A 通知 showing an open garage](/home-assistant/images/blog/2020-02-android-16-17-release/garage.png)

当你按下“关闭车库门”按钮时……车库门就会自动关闭！

接下来几个版本里，我们还计划继续扩展通知能力，让它逐步追上 iOS 应用中已有的功能，比如把文本回复发送回 Home Assistant，以及支持关键警报等。

## 通过通知请求位置更新

现在你只需发送一条内容为 `request_location_update` 的通知；当它到达设备后，应用就会在 Home Assistant 中更新当前位置。不过也别过度使用这个功能，因为它会消耗电池电量。

## 传感器

在 1.7 版本中，我们首次为应用加入了传感器支持。目前你可以看到以下几个新传感器：

- Battery percentage
- Battery 状态
- Current Wi-Fi network information

接下来我们还会继续扩展传感器支持，加入蜂窝网络状态等更多项目。

## 文档

感谢几位投入的志愿者以及一轮冲刺式推进，[我们的文档网站已经焕然一新](https://companion.home-assistant.io/)。新站点基于最新版 [Docusaurus](https://docusaurus.io/)，不仅整体视觉更新了，还加入了深色模式支持，看起来舒服多了！

除了工具链更新之外，我们也开始系统整理 Android 与 iOS 之间的差异。之后你会看到 Android 和 Apple 的图标，用来标识各项功能适用于哪个平台。

长期来看，我们希望 Android 和 iOS 在功能以及与 Home Assistant 的交互方式上尽可能保持一致。这样一来，同时使用两个平台、或者准备切换平台的用户，都能几乎无缝地继续使用，而无需重新调整配置。

## 结语

除了上面这些重点内容，我们还顺手消灭了数量相当可观的 Bug。感谢 [JBassett](https://github.com/JBassett)、[KBerstene](https://github.com/KBerstene)、[quthla](https://github.com/quthla) 和 [neopilou](https://github.com/neopilou) 为这些工作做出的贡献。

祝你用得开心！如果你喜欢这个应用，别忘了留下评分，这也能帮助更多用户发现它。

<a href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png" width="155" style='border: 0;box-shadow: none;'></a>
