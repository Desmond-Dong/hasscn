---
title: 'Android 配套应用程序：已经有一段时间了'
description: '<img src=''/home-assistant/images/blog/2025-07-android-companion/art.png'' style=''border: 0;box-shadow: none;'' alt="Android 配套应用程序：已经有一段时间了"。'
  应用程序的发展和未来。
---
# Android 配套应用程序：已经有一段时间了

<img src='/home-assistant/images/blog/2025-07-android-companion/art.png' style='border: 0;box-shadow: none;' alt="Android 配套应用程序：已经有一段时间了">

Android 版 Home Assistant 配套应用程序每次发布都变得越来越好，最近，它获得了一些专门的支持，以帮助加速其开发。几个月前，我（Timothy Nibeaudeau，也称为 [@TimoPtr](https://github.com/TimoPtr)）作为我们的专用 Android 开发人员加入了 Open Home Foundation。
自从我们为我们的社区发布有关应用程序开发的专门更新以来，已经[两年多了](/home-assistant/blog/2023/03/30/android-20233/) 和数十万次安装，我想向您快速介绍一下最近的改进和接下来的内容。<!--more-->

## 屏幕后面
一开始，Home Assistant 的所有官方【配套应用】(https://companion.home-assistant.io/) 都是社区利用业余时间开发的，其中很多还是兼职项目。他们为构建这些应用程序付出的努力令人难以置信。这使您不仅能够在旅途中（或在房子周围）查看您的 Home Assistant 实例，还可以利用设备上提供的许多传感器，同时向用户提供丰富的通知。
<p class="img"><img src='/home-assistant/images/blog/2025-07-android-companion/download-growth.png' alt="Android 安装量随时间增长的屏幕截图"/>多年来安装量增长非常惊人！</p>

仅 Android 应用程序就已收到超过 [2,700](https://github.com/home-assistant/android) 份贡献！跟上 Android 版本、Home Assistant 的新功能以及错误修复需要做大量工作。该应用程序不仅支持 Android 手机和平板电脑，还支持它们连接的设备，特别是 Android Auto、Android Automotive 和 Wear OS。
### 数以百万计的进步
他们完成了所有这些工作，同时达到了近 **150 万次安装**，多年来总安装量超过 600 万次。日活跃用户40万，月活跃用户100万。该手机应用程序在 [Play 商店](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) 上也获得了非常好的 **4.3 星评级**，在 [GitHub](https://github.com/home-assistant/android) 上拥有 **2,800 星** 🤩。这些反馈确实有助于我们改进。
自从 Apple 配套应用程序有了一位全职开发人员以及令人惊叹的 [Bruno Pantaleão](/home-assistant/blog/2023/12/27/companion-app-for-ios-202312-lets-go/) 😎 以来，已经过去了一年半多了。大约在布鲁诺被聘用的同时，我们开始寻找一名 Android 开发人员，可以说这花了更长的时间。
我的名字是 Timothy Nibeaudeau，正如本文开头提到的，我是你们新任的专职 Android 工程师。作为一个从 2018 年开始使用 Home Assistant 的人，我对开源和智能家居技术充满热情。我从事软件开发工作近十年了，为从医疗级物联网产品到智能牙刷等各种项目开发应用程序。
我致力于将我的才能投入到这个项目中，但我无法独自完成。社区让 Home Assistant 与众不同，只要齐心协力，我们就能取得更大成就。具体来说，我要感谢 [@dshokouhi](https://github.com/dshokouhi)、[@jpelgrom](https://github.com/jpelgrom) 和 [@JBassett](https://github.com/JBassett) 多年来的工作，使这个应用程序成为今天的样子！
我还要谢谢你！您的支持（通过订阅 [家庭助理云](/home-assistant/cloud/) 和购买 [官方硬件](https://www.nabucasa.com/#:~:text=the%20first%20boot.-,Official%20Home%20Assistant%20hardware,-Get%20the%20best)）允许 [开放家庭基金会](https://www.openhomefoundation.org/) 雇用专门的开发人员。敬业的开发人员始终专注于开发，帮助社区共同努力提供他们热衷的功能。
## 自从我们上一篇博客以来
<img src='/home-assistant/images/blog/2025-07-android-companion/playstore-cards.jpg' class="no-shadow" alt="Google Play Store 屏幕截图 Home Assistant 的反馈"/>

正如我在顶部所说，自从我们发布博客强调 Android 应用程序的改进以来，已经过去了很长一段时间（两年多了🫢）。您可能已经享受这些新功能一段时间了，但以防万一您错过了，以下是社区在那段时间做出的一些最大的改进。
- 添加了与 Android 手机链接的 Health Connect 传感器，包括心率、健身数据和血糖水平（与往常一样，您可以完全控制与 Home Assistant 实例共享的内容，并且该数据保留在本地）。
- 通过与 Android [原生](/home-assistant/blog/2023/07/20/year-of-the-voice-chapter-3/#native-assist-on-android) 配合使用，Assist 现在可以取代手机（或 Wear OS 设备）的助手。
- 您现在可以将 Home Assistant 应用程序设置为设备的默认启动器，这对于墙壁面板设置非常有用。
- 我们更新了小部件以支持一些新功能，例如待办事项列表。
- Wear OS 改进了其 Tile 功能，并添加了新的恒温器 Tile。
- 现在有更多 Android Auto 传感器，例如速度和剩余里程。
- 通过蓝牙（一种使用蓝牙将设备连接到 Wi-Fi 的开放标准，由开放家庭基金会构建）使用 [Improv Wi-Fi](https://www.improv-WiFi.com/) 将 Wi-Fi 兼容设备连接到家庭网络（例如 Home Assistant 语音预览版）的更简单方法。
- 通过添加 QR 码扫描仪，改进了 Z-Wave 设备的登录体验。
- 我们还提高了应用程序的速度和稳定性。
- 现在，新贡献者比以往任何时候都更容易加入并开始帮助该应用程序（更多内容请参见下文👇）。
有关应用程序功能的完整列表，请查看我们的[配套文档中配套应用程序的详细信息](https://companion.home-assistant.io/docs/core/)。
## 我们的 Android 应用程序的下一步是什么
在 Android 应用程序的最新更新 [2025.7.1](https://github.com/home-assistant/android/releases/tag/2025.7.1) 中，我们添加了一些有用的功能。包括一个新的基本邀请流程，该流程将在 Android 和 iOS 之间共享，从而在我们最常用的配套应用程序之间添加良好的一致性。其想法是让添加新用户或设置新设备变得更加无缝（无需在 Android Automotive 设备中输入 URL！）。
我们还使[我的链接](https://my.home-assistant.io/) 更好地工作。如果您不熟悉“我的链接”，它们就是那些很酷的链接（[任何人都可以创建](https://my.home-assistant.io/create-link/)），可将您直接带到集成、蓝图、附加组件或设置页面。它们在桌面上一直运行良好，但直到最近，它们在移动设备上使用起来有点笨拙。现在，您只需单击一下即可到达链接的目的地。
Android 有许多不同的屏幕尺寸和布局，我们正在努力通过边缘到边缘的支持来更好地利用它们。我们最近的更新对 Android 原生 UI 元素（如设置页面）进行了全面的处理，我们希望在未来的更新中在其他地方实现它们，以便我们可以充分利用您的屏幕空间。
## 针对 Android 用户的重要变化
<p class="img"><img src='/home-assistant/images/blog/2025-07-android-companion/android-distribution.png' alt="Play 商店中不同 Android 版本的安装量饼图"/>我们很大一部分用户使用的是相当新的 Android 版本，但我们希望支持尽可能多的旧设备。</p>

即将发生的一项重大变化是终止对 Android 5.0 和 5.1（也称为 Android Lollipop，于 2014 年发布……运行良好 🫡）的支持。 [Google 已宣布](https://developer.android.com/jetpack/androidx/versions/all-channel#:~:text=Note%3A%20Starting%20in%20June%202025%2C%20new%20releases%20of%20many%20AndroidX%20libraries%20previously%20targeting%20minSdk%2021%20will%20be%20updated%20to%20require%20minSdk%2023.%20Some%20libraries%20won%27t%20be%20re%2Dreleased%20and%20will%20therefore%20continue%20to%20support%20minSdk%2021.)，从 2025 年 6 月开始，许多 AndroidX 库将至少需要 Android 6.0 (API 23)。 Google 已经更新了 [Firebase Cloud Messaging](https://firebase.google.com/support/发布-notes/android#messaging_v25-0-0) 以要求这一点。这意味着我们需要停止支持 Android 5.0 和 5.1（API 21 和 22）以跟上新功能和安全更新。不到 0.3% 的安装是低于 API 23 (Android 6.0) 的 Android 版本，我们始终努力保持旧设备正常运行，但有时我们的手是被迫的。如果您使用的是较旧的设备，该应用程序不会被删除，但一旦我们进行此更改，您将不会收到新的更新。我们计划在支持结束之前为这些旧版本发布一个最终版本。此版本预计在夏末之前发布，因此在我们继续之前，您将获得适用于您的设备的最新更新。
## 让我们一起努力吧
我们希望让您能够更轻松地做出贡献，无论您是经验丰富的开发人员还是初学者。这包括让贡献之旅更加顺畅，并为人们提供一个轻松的起点。我们甚至编制了一份[为潜在开发者解决的“首要问题”](https://github.com/home-assistant/android/contribute) 列表，希望能提供帮助。我们已经开始专门的 [Android 开发人员文档](https://开发者.home-assistant.io/docs/android)，它将提供有关此应用程序内部工作原理的深入信息。
我们进行了许多幕后更改来改善开发人员体验（定义最佳实践、用于更快/automated 反馈的 linters，以及用于更快地反馈 PR 的持续集成）。我们的重点始终是提高稳定性、降低崩溃率和及早发现问题。其中一个例子是我们新的快速失败[方法](https://开发者.home-assistant.io/docs/android/best_practices/?_highlight=failfa#fail-fast)，它已经帮助我们及早发现并解决问题。
我们想要更多的 Android 原生 /exclusive 功能，同时平衡 Android 和 iOS 配套应用程序之间保持对等的需求（iOS 应用程序非常出色，每个应用程序的社区都在互相学习）。
### 你可以如何提供帮助
Android 配套应用程序是社区的努力成果，您的帮助会带来真正的改变。您可以通过以下方式参与：
- [加入测试计划](https://play.google.com/apps/testing/io.homeassistant.companion.android) 测试新功能。
- [建议功能](https://community.home-assistant.io/c/feature-requests/13) 并分享您的想法。
- 在 [GitHub](https://github.com/home-assistant/android/issues)、[Discord](https://discord.com/channels/330944238910963714/1284965926336335993) 或 [Home Assistant 论坛](https://community.home-assistant.io/tag/android) 上帮助分类问题。
- 加入 Discord 上的 Android 项目 [主题](https://discord.com/channels/330944238910963714/1346948551892009101)。 （如果您看不到该主题，请前往_频道和角色_并选择“我想贡献开发人员技能！”为自己分配开发人员角色。）
- [提交问题](https://github.com/home-assistant/android/issues)，审查拉取请求，[开始您的第一个拉取请求](https://github.com/home-assistant/android/issues?q=is%3Aissue+状态%3Aopen+label%3A%22good+first+issue%22)，并提出问题 - 您的反馈很有价值。
- 帮助我们[翻译应用程序](https://开发者.home-assistant.io/docs/translations)。
再次感谢您[使这一切成为可能](/home-assistant/cloud/)。我期待您的帮助，让这个应用程序变得更加精彩！