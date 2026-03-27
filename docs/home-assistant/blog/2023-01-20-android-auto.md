---
title: "Home Assistant 开进你的汽车！"
description: "今天我们推出适用于 Android Auto 的 Home Assistant，让你能够控制家中设备，并导航到任何带有位置信息的目标。"
date: 2023-01-20 00:00:00
date_formatted: "January 20, 2023"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2023-01-20-android-auto/Companion.png
---
# Home Assistant 开进你的汽车！

![Companion 截图](/home-assistant/images/blog/2023-01-20-android-auto/Companion.png)

大家好，今天我们想宣布，[Android Auto] 版本的开发已经开始。去年 12 月，Google [发布了] Android Auto 的一次更新，并终于开始在 Play 商店接受 IoT 应用。正如你所猜到的，团队立刻开始加入相关功能。来看看团队已经着手开发的这些即将推出的新功能吧！

<i>这些功能目前已在[我们的 Beta 渠道]提供，并将在接下来的 2 周内发布到稳定版。</i>

<lite-youtube videoid="Ngnd6vHb2VU" videotitle="Home Assistant Android Auto"></lite-youtube>

![车内截图](/home-assistant/images/blog/2023-01-20-android-auto/android_auto_garage.jpg)

当你从车机启动这个应用后，就能轻松访问车库门、灯光、门锁，甚至场景等设备。

![域截图](/home-assistant/images/blog/2023-01-20-android-auto/android_auto_domains.png)

点按某个分类后，你可以看到其中的实体及其状态，并且会即时更新！同时也提供了简单的触控操作，比如在出发前先把车库门打开。

![实体控制截图](/home-assistant/images/blog/2023-01-20-android-auto/android_auto_entity_control.png)

除了选择域之外，你还可以导航到 Home Assistant 中任何带有位置信息的内容，比如人员、设备或传感器。

![导航截图](/home-assistant/images/blog/2023-01-20-android-auto/android_auto_navigation.png)

我们还新增了一个[二元传感器]，让你可以根据自己是否在车内并连接到车机来创建自动化。它还额外提供了连接类型属性。

![传感器截图](/home-assistant/images/blog/2023-01-20-android-auto/android_auto_sensor.png)


非常感谢 [Jbassett] 和 [jpelgrom] 为全新 Android Auto 应用做出的贡献。我们也很期待这个新体验接下来继续不断完善。


[JBassett]: https://github.com/JBassett
[jpelgrom]: https://github.com/jpelgrom
[released]: https://developer.android.com/docs/quality-guidelines/car-app-quality?category=iot#dec-22
[Android Auto]: https://www.android.com/auto
[GitHub]: https://github.com/home-assistant/android
[二元传感器]: https://companion.home-assistant.io/docs/core/sensors#android-auto
[我们的 Beta 渠道]: https://play.google.com/apps/testing/io.homeassistant.companion.android
