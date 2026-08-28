# iOS 2024.9 配套应用：为 iOS 18 做好准备

![iOS 2024.9 配套应用程序](/home-assistant/images/blog/2024-09-16/ios-og.jpg)

Bruno 再次为您带来一系列关于您最喜欢的 iOS 应用程序的新闻😉。在此版本中，我们将引入一些新功能来补充 iOS 18 的发布，以及配置 Home Assistant Apple Watch 应用程序的新方法。

<!--more-->

## 深色和有色的应用程序图标

在今天推出的 iOS 更新中，Apple 引入了应用程序图标的主屏幕自定义功能。这包括一个新的深色模式变体和一个有色选项，用户可以在其中选择图标的强调色。当然，Home Assistant也加入了这个行列。

<p class='img'><img src='/home-assistant/images/blog/2024-09-16/new-icons.png' style='border: 0;box-shadow: none;' alt="Dark and tinted variants are available for the main App Icon and some custom icons">主应用程序图标和一些自定义图标可使用深色和有色变体</p>

## 控制中心

新的 iOS 还为控制中心带来了新的定制级别，为此我们引入了五个新控件：辅助、切换灯光、运行脚本、激活场景和打开页面。

![iOS 18 控制中心选项](/home-assistant/images/blog/2024-09-16/control-center.jpg)

通过这些选项，您可以更快地使用 Home Assistant 功能，从询问 Assist 问题到运行完整的脚本流程。

这些控件也可与 iPhone 15 Pro 和 16 系列上的动作按钮一起使用。在[上一篇发布博客](/home-assistant/blog/2024/05/22/companion-app-for-ios-20245-assist/) 中，我们讨论了这是访问 Assist 的好方法，与使用电源按钮控制 Siri 的方式非常相似。好吧，这个发布通过不再使用快捷方式显着加快了速度。只需检查一下差异即可。

<p class='img'><lite-youtube videoid="v7NXQJMUK2c" videotitle="Comparing Assist launch from Shortcuts and iOS 18 Control"></lite-youtube>在 iOS 18 控制上辅助打开（右）与通过快捷方式打开（左）</p>

## 新 Apple Watch 配置

很长一段时间，我们的Watch应用程序只能显示【Home Assistant内置的iOS动作】（https://companion.home-assistant.io/docs/core/动作/）。通过此发布，您将能够展示脚本、场景、iOS 动作以及将来的更多内容。更新后，打开 iOS 应用程序并转到配套应用程序“设置”以找到新的 Apple Watch 配置屏幕，您可以在其中选择要显示的项目、它们的顺序以及自定义外观。

一个真正有用的自定义是 **需要确认** 选项，它将在运行该项目之前提示您弹出确认窗口。如果您像我一样瞄准不好，不小心打开了车库门而不是打开电视，这将非常有帮助。

![新 Apple Watch 配置](/home-assistant/images/blog/2024-09-16/watch.png)

## 其他值得注意的变化

* 我们正在引入新的传感器，包括 Apple Watch 电池电量和状态、应用程序版本和位置权限类别。
* 一个新的脚本主屏幕小部件。
* 我们正在努力向 Apple Watch 添加 Assist，今天就尝试一下，但请注意它仍处于测试阶段。
* 此版本中包含多个错误修复，
  * 防止小部件在 iOS 15/16 上不起作用。
  * 允许 Watch LTE 在远离 iPhone 时运行动作（需要启用位置权限）。
  * 修复运行旧版本核心时的黑色状态栏。
  * 解决仪表和详细信息门锁屏幕小部件崩溃的问题。

## 需要帮助吗？加入社区！

Home Assistant 拥有一个庞大的用户社区，他们都非常愿意互相帮助。那么，加入我们吧！我们非常活跃的 [Discord 聊天服务器](https://www.home-assistant.io/join-chat) 是一个绝佳的去处，不要忘记加入我们精彩的[论坛](https://community.home-assistant.io/)。

发现错误或问题？请在我们的[问题跟踪器](https://github.com/home-assistant/iOS/issues) 中报告它，以修复它！或者，查看[我们的帮助页面](https://www.home-assistant.io/help) 以获取更多您可以去的地方的指南。
