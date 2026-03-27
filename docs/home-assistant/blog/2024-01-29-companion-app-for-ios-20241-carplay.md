---
title: 'iOS 2024.1 配套应用程序：CarPlay 就在这里！'
description: '嘿，这是布鲁诺。我最近加入了 Nabu Casa，全职开发 Home Assistant iOS 应用程序（感谢 Home Assistant Cloud 订阅者！）。今天我有一个大消息：Home Assistant 现已在 Apple CarPlay 上可用！该版本正在推出。'
---
# iOS 2024.1 配套应用程序：CarPlay 就在这里！

嘿，这是布鲁诺。我最近加入了 Nabu Casa，全职开发 Home Assistant iOS 应用程序（感谢 Home Assistant Cloud 订阅者！）。今天我有一个大消息：Home Assistant 现已在 Apple CarPlay 上可用！该版本正在推出，应该很快就会登陆您的 iOS 设备（版本 2024.1）。

CarPlay 支持现在使Home Assistant用户可以轻松访问其设备和区域，并能够创建自定义动作。自定义动作允许用户创建高级动作序列，例如解锁前门和打开门廊灯光。所有这些都适用于您在应用程序中配置的多个 Home Assistant 服务器。

<lite-youtube videoid="u__oD7OhdJI" videotitle="CarPlay is here!"></lite-youtube>

<img src="/home-assistant/images/blog/2024-01-ios-carplay/dxspark.png" style="border:none; box-shadow: none; float: right;" height="50"> 非常感谢 DXspark 帮助我们奠定了 CarPlay 的基础并启动了该项目。

<!--more-->

## CarPlay 功能

该应用程序分为四个选项卡，可以轻松访问不同的功能。我们遵循 Apple 的指导方针，为用户提供他们从其他 CarPlay 应用程序中获得的熟悉体验。

您不必单独配置 CarPlay 应用程序。它将自动选择应用程序中配置的 Home Assistant 服务器。 

## 动作

动作是 Home Assistant iOS 应用程序中的一个概念，允许您在 Home Assistant 中执行自动化。这意味着您可以执行任何您想要的自动化，例如：

- “打开车库，开始将我的家加热到 22 摄氏度”
- “关闭车库并在厨房宣布我到达”
- “打开前院灯光并打开前门”

这些动作已在 Apple Watch 应用程序的 Home Assistant 中提供，并且可以从 Home Assistant 小部件中调用。通过今天的发布，您还可以从 CarPlay 仪表盘轻松地控制它们。这个功能已经成为我日常生活的一部分。

如果您尚未创建动作，CarPlay 应用程序可以向您的手机发送通知以指导您开始操作。

![创建你的第一个 CarPlay 动作](/home-assistant/images/blog/2024-01-ios-carplay/firstaction.png)
![CarPlay 动作](/home-assistant/images/blog/2024-01-ios-carplay/actions.png)

## 控制

控制选项卡将按其域对您的设备和实体进行分组。我们从小处开始，首先包含最有用的域：

- 按钮
- 遮盖
- 输入布尔值
- 输入按钮
- 灯光
- 门锁
- 场景
- 脚本
- 开关

对于这些域，您可以切换灯光和开关、激活按钮、脚本、场景动作，当然还可以切换车库门或大门。

![创建你的第一个 CarPlay 动作](/home-assistant/images/blog/2024-01-ios-carplay/controls.png)

## 领域

区域选项卡允许您根据区域查找设备和实体。快速滚动浏览某个区域以查看当前状态并切换设备。

![CarPlay 区域](/home-assistant/images/blog/2024-01-ios-carplay/areas.png)

## 服务器

当您开车去父母那里时，您可能希望能够在到达时通知他们或打开他们的车库门。通过“服务器”选项卡，您将能够快速更改和控制不同的 Home Assistant 服务器。

此功能建立在多服务器支持的基础上，该支持多年来一直是 Home Assistant iOS 应用程序的一部分。

![CarPlay 服务器](/home-assistant/images/blog/2024-01-ios-carplay/servers.png)

我希望您会喜欢在 CarPlay 上使用 Home Assistant。请告诉我们您还希望看到哪些 CarPlay 可用功能！

## 发布笔记- 该应用程序现已适用于 iOS 15+
- iOS 16+ 添加了 CarPlay 支持
- 添加了保加利亚语
- 改进了 iOS 动作，使其更易于使用
- 在 macOS 中，再次打开应用程序时窗口大小将恢复