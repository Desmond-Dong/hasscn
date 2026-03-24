---
title: 还有一件事……
description: 隆重推出适用于 macOS 的 Home Assistant Companion。
---

哇，这真是一个生日周啊！感谢 [month of What The Heck?!](/home-assistant/blog/2020/08/18/the-month-of-what-the-heck/)，我们有了 [new supervisor 发布](/home-assistant/blog/2020/09/16/supervisor-joins-the-party)，它是最大且最受用户驱动的核心 [releases](/home-assistant/blog/2020/09/17/release-115) 之一。我们甚至将 [RFID tags](/home-assistant/blog/2020/09/15/home-assistant-tags) 融入了 Home Assistant 的核心，但我们还没有完成！我们还有“还有一件事……”

## 推出适用于 macOS 的 Home Assistant Companion

Home Assistant Companion 是一款适用于 Mac 的新应用程序，用于控制您的 Home Assistant 实例，将您的 Mac 传感器暴露给 Home Assistant 并接收通知。

与 iOS 应用程序最近的许多更新一样，我们要感谢 [@zacwest](https://github.com/zacwest)。 Zac 已将 iOS 应用程序移植到 Mac 上，并添加了一些专门针对 Mac 的出色新功能。

_如果您是 Windows 用户，请不用担心，您可以将您的 PC 与出色的 [IOT Link](https://iotlink.gitlab.io/index.html) 工具集成。_

<p class='img'>
<img src='/home-assistant/images/blog/2020-09-18-mac-companion/render.png' alt='Rendered 图像 of the Home Assistant Lovelace interface running windowed on a 16-inch Mac Book Pro'></a>
在 16 英寸 Mac Book Pro 上运行的 Home Assistant Companion
</p>

## 使用 Mac 进行自动化

Home Assistant Companion for macOS 为您的 Mac 添加了多个新的二元传感器，显示其是否处于活动状态以及特定麦克风或网络摄像头是否正在使用。

每个网络头和麦克风都有自己的 `binary_sensor` 显示其是否处于活动状态。这些可以实现一些真正有用的自动化，特别是对于那些目前在家工作的人来说。您可以在接听电话时自动关闭收音机或关闭身后的百叶窗以提高视频质量。要了解这在现实世界中有多有用，请观看这​​段视频，了解我们自己的 Frenck 如何在他的流媒体设置中使用这些传感器。

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/ssRVjqS40-0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

“活动”传感器报告 Mac 是否正在被积极使用。换句话说，它没有休眠，没有显示屏幕保护程序，没有锁定，也没有闲置。您可以以一分钟为步长配置“空闲前的时间”，最少为 1 分钟。您可以在首选项的传感器部分找到此选项。

与移动设备相比，在 Mac 上运行的一大优势是电池容量大得多。这意味着我们不受节电措施的限制，并且可以解决 iOS 应用程序最常见的问题之一，即更新间隔。在Mac上，当事情发生变化时，实体更新会立即触发。您将看到 `sensor.DEVICE_NAME_last_update_trigger` 报告 `Signaled` 报告的情况。

## 家庭助理小部件（仅限大苏尔）

适用于 macOS 的 Home Assistant Companion 已支持 Big Sur 中的小部件。现在，我们有一个动作小部件，您最多可以在其中拥有八个动作。您还可以创建具有不同动作集的多个小部件。如果您对其他想要查看的小部件有想法，请转到 [the community forums and let us know](https://community.home-assistant.io/t/what-kind-of-ios-14-widgets-would-you-like-to-see/211112/14)。

<p class='img'>
<img src='/home-assistant/images/blog/2020-09-18-mac-companion/actions-widget.png' alt='Screenshot of a large Home Assistant 动作 widget in Big Sur'></a>
大苏尔的大型家庭助理动作小部件。
</p>

＃＃ 界面

Mac 应用程序绝对是一个 _Mac_ 应用程序。应用程序配置页面已从 Home Assistant 的侧边栏删除。相反，配置选项和首选项位于菜单栏上，您希望在任何其他应用程序中找到它们，并且所有标准快捷方式也都可以使用（例如用于首选项的 `⌘,`）。您甚至可以通过“文件”>“新建”打开多个 Lovelace 窗口。

<p class='img'>
<img src='/home-assistant/images/blog/2020-09-18-mac-companion/multi_window.png' alt='Screenshot of two Lovelace windows open side-by-side'></a>
您可以打开多个 Home Assistant Companion 窗口。
</p>

在菜单栏中，您还可以找到一个手动向 Home Assistant 发送更新的选项，以及一个新的动作菜单，您可以在其中查看所有 [动作](https://companion.home-assistant.io/docs/core/动作) 并触发它们。

## 通知

就像 iOS 应用程序一样，您可以使用 `notify.mobile_app_DEVICE_NAME` 等服务将通知发送到您的 Mac。 One small difference is that [critical 通知](https://companion.home-assistant.io/docs/通知/critical-通知) are not yet available for the Mac app.但是，我们所有其他通知功能（例如可操作通知）都可以在 Mac 应用程序上使用。要了解什么是可能的，请查看 [the docs](https://companion.home-assistant.io/)。

## 文档和支持

我们正在使用 Mac 应用程序的详细信息更新 [Companion App docs](https://companion.home-assistant.io)。您也可以前往 [Discord channel](https://discord.com/login?redirect_to=%2Fchannels%2F330944238910963714%2F551871772484698112)。如果您发现错误或对某个功能有想法，请在 [GitHub repository](https://github.com/home-assistant/iOS/issues/new/choose) 上提出问题。

## 获取测试版

您现在可以从 `home-assistant/ios` 存储库获取测试版：从 [latest 发布](https://companion.home-assistant.io/app/mac/latest) 下载 `home-assistant-mac.zip` 文件，解压缩并将其拖到您的应用程序文件夹中。完毕！

就是这样。剩下的就是最后一次祝家庭助理生日快乐，并等待看看明年会带来什么惊人的发展。

汤姆
