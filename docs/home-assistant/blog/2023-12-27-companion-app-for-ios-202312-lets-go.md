---
title: 'iOS 版 Companion App 2023.12：出发吧！'
description: Bruno Pantaleao 已加入 Nabu Casa 担任 iOS 工程师，并将致力于改善
  iOS 用户的 Companion App 体验。2023.12 带来了 Apple Thread 凭据共享、
  全新的 watchOS 图标、场景的 **全选** 切换，以及一个 **最新内容** 链接。
---

对于期待 iOS Companion App 拥有更多功能和更快开发速度的朋友，我们有个好消息！我，Bruno Pantaleao，已加入 Nabu Casa 担任 iOS 工程师（当然也会参与 watchOS、iPadOS 和 macOS 应用的工作），并计划延续 Robbie Trencheny、Zac West 以及社区所完成的出色工作，给予 iOS 应用应有的关注。那么，让我们来聊聊本月应用的 2023.12 发布吧！

![Companion App for iOS 2023.12](/home-assistant/images/blog/2023-12-ios-lets-go/ios-og.png)

<!--more-->

## Apple Thread 网络凭据共享

如果你有 HomePod 或 Apple TV，同时在 Home Assistant 中也有一个 Thread 边界路由器，你可能会想利用 Apple 的网络来控制家中的设备。现在，你可以将 Apple Thread 凭据导入 Home Assistant，然后将 Apple 设为首选的 Thread 网络。

![Apple Thread network credentials sharing](/home-assistant/images/blog/2023-12-ios-lets-go/1.png)

## 全新的 watchOS 应用图标

我们已将 Apple Watch 应用图标更新为新的 Home Assistant 标志。

![New watchOS App Icon](/home-assistant/images/blog/2023-12-ios-lets-go/2.png)

## 为 watchOS 一键切换全部场景

此前，如果你想在 Apple Watch 上隐藏场景，就必须逐个禁用它们。如果你和我一样，有一个 Philips Hue 网关，那你大概会看到好几个自动生成的场景（比如下面的 “Bathroom concentrate” 和 “Bathroom Arctic aurora” :D），而这些并不总是值得显示在手表上。现在，我们在 iOS companion app 中加入了一个按钮，可以快速一键切换全部场景。

![切换 all 场景 for watchOS](/home-assistant/images/blog/2023-12-ios-lets-go/3.png)

## 在应用中随时查看“最新内容”

我们在 Companion App 设置中新增了一个 **What’s new?** 链接，方便你快速查看最新的应用发布说明。

![Keep up with Whats new in the App](/home-assistant/images/blog/2023-12-ios-lets-go/4.jpeg)

## 2024.01 中对 iOS 12、13 和 14 的支持

在新的一年里，我们会做一些整理工作，以确保 iOS Companion App 为未来做好准备。为此，我们将在 Companion App 的 2024.01 发布中停止支持 iOS 12、13 和 14。我们知道，用户会把旧手机和平板再利用为家中的仪表盘和控制设备，这与我们对可持续性的关注是一致的。这也是为什么我们一直尽可能让应用在旧设备上维持运行更长时间。

目前，仍在使用这三个 iOS 版本的用户不到 1%（根据允许与 Apple 共享数据的用户所提供的 App Store 分析数据）。继续支持它们会让代码库更难维护，也会阻碍我们使用更新的 iOS 特性。这项变更将让新贡献者更容易安心参与 iOS 代码库的开发，而这也是我的目标之一。借助更现代化的代码库，我们可以给予 PR 更多关注，并帮助其他贡献者获得提交 PR 所需的一切条件。

这并不意味着你的 iOS 12、13 或 14 设备已经无法使用。如果你的设备无法更新到高于 iOS 12 的版本，例如 2014 年的 iPhone 6 或 iPad Mini 3，你仍然可以使用浏览器访问 Home Assistant。其他当前能够运行 iOS 13 或 14 的设备，都可以更新到 iOS 15 或更高版本，并继续使用新版 iOS Companion App。

## 路线图展望

想知道我们的 Apple 应用路线图上有什么吗？我们仍在推进中，但你可以期待更多发展，让 Home Assistant 在 Apple 生态中的整合更进一步，为 iPhone、Apple Watch、iPad 和 Mac 带来共享功能——而且我也很期待亲手体验 Apple Vision Pro，看看它能为开放家庭带来哪些可能性。我们还计划改进 Siri 快捷指令、小组件，并尽可能加入更多新传感器。另一个我们正在关注的功能是 Assist；在 2023 年，我们完成了声音之年。相比 iOS 用户，Android 用户已经受益于一些额外功能，而我们也希望尽快补上，把这些功能带到 iPhone 上！
