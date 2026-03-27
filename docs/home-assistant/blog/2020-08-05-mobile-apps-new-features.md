---
title: “家庭助理配套应用程序：新功能和即将推出的功能”
description: '您好，我们已经有一段时间没有让您了解使用适用于 Android 和 iOS 的 Home Assistant 应用程序可以完成所有重大事情了，所以现在让我们修改这一点，因为有很多令人兴奋的更新。不过，在我们开始之前，iOS 用户应该花点时间阅读 this 博客。'
---
# “家庭助理配套应用程序：新功能和即将推出的功能”

您好，我们已经有一段时间没有让您了解使用适用于 Android 和 iOS 的 Home Assistant 应用程序可以完成所有重大事情了，所以现在让我们修改这一点，因为有很多令人兴奋的更新。不过，在我们开始之前，iOS 用户应该花点时间阅读 [this 博客 post](/home-assistant/blog/2020/07/28/ios-app-migration) ，其中包含一些有关即将发生的小变化的重要信息。

## 关于隐私的说明

目前，我们使用 Google 的 Firebase 通知服务向您的设备发送通知并跟踪我们的崩溃情况。我们之所以是因为很简单，由于通知在 iOS 上的工作方式，不能使用任何服务器来发送通知，事实上，选择范围相当窄。使用 Firebase 使我们能够保持较低的成本，Nabu Casa论文概述了这一点，以便能够免费使用它。然而，许多人感到不舒服，而且我们更喜欢人们不依赖谷歌服务器的应用程序。我们听到了您的声音，正在积极考虑转向其他工作。虽然我们尚未完成这项工作，但我们只是想让您知道正在积极开发中，希望我们很快就会有更多消息。

## Android最小应用程序

与此相关的是，我们很高兴地说，我们现在提供了一种安装 Android 应用程序最小版本的方法，该方法完全不依赖于 Google。此版本的应用程序没有跟踪或通知。我们希望通过提供此版本的应用程序，更多开发者能够为该应用程序做出贡献而感到兴奋。从版本 2.1.0 开始，您可以在 GitHub 上的 [发布](https://github.com/home-assistant/android/releases) 上找到该 APK。

## 新增内容

简短的回答很多！Android和iOS应用程序是由不同的团队开发的因此，功能相似，但它们并不相同，并且不遵循共同的路线图。接下来是Android的改变，[click here to jump to the iOS 更新](#ios)

＃＃＃ 安卓

#### 通知改进

在过去的几个版本中，Android通知通过新功能和修复得到了极大的改进。

从1.8.0开始，我们增强了图像通知，不仅允许相对路径（即存储在 [__PH0__](/home-assistant/integrations/http#hosting-files) 文件夹中），而且您还因此可以使用 [摄像头 Proxy API](https://开发者.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id) 请求快照。所有认证均通过应用处理程序，耗费担心。还可以使用 [click 动作](https://companion.home-assistant.io/docs/通知/通知-basic/#通知-click-actio) 和 [actionable 通知](https://companion.home-assistant.io/docs/通知/actionable-通知#building-automation-for-通知-动作) 导航到特定的 Lovelace 视图。

从1.9.0开始，您现在可以创建动态和删除[通知 channels](https://companion.home-assistant.io/docs/通知/通知-basic#通知-channels)。这很有帮助，因此您可以创建可以覆盖您的干扰禁止设置的通道，特别是像报警这样的通知，而洗衣通知可以继续让您退出干扰。

在 1.10.0 中，我们进一步增强了通知以允许许多新选项。用户现在可以更改消息的 [LED Color](https://companion.home-assistant.io/docs/通知/通知-basic#通知-led-color)、[vibration pattern](https://companion.home-assistant.io/docs/通知/通知-basic#通知-vibration-pattern) 和 [importance](https://companion.home-assistant.io/docs/通知/通知-basic#通知-channel-importance)。这些选项还可以与通道一起使用，以帮助设置默认值，允许进一步区分通知。您现在可以 [group](https://companion.home-assistant.io/docs/通知/通知-basic#Thread-id-grouping-通知) 您的通知来帮助下拉的通知。还引入了 [Persistent 通知](https://companion.home-assistant.io/docs/通知/通知-basic#persistent-通知)，您不能简单地刷那些重要的通知，您可以将其与[__PH0__](https://companion.home-assistant.io/docs/通知/通知-basic#sticky-通知) 属性设置，这样通知就不会消失。 `message` 现在允许 [HTML formatting](https://companion.home-assistant.io/docs/通知/通知-basic#通知-message-html-formatting) ，您可以突出显示重要部分。用户还可以提供 [icon](https://companion.home-assistant.io/docs/通知/通知-basic#通知-icon)，就像提供图像一样。对于不重要的通知，您可以设置 [timeout](https://companion.home-assistant.io/docs/通知/通知-basic#通知-timeout) 后，方便在 x 秒自动通知。

```yaml
automation:
  - alias: "Alarm triggered"
    trigger:
      platform: state
      entity_id: alarm_control_panel.home
      to: triggered
    action:
      service: notify.mobile_app_pixel_4_xl
      data:
        message: "Front alarm <b>triggered</b>"     # some HTML formatting to highlight the alert
        data:
          channel: Alarm             # creates a new channel called Alarm that you can manage from your device
          importance: high           # set the channel importance to high
          ledColor: red              # make the LED flash red for this notification
          vibrationPattern: "100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100"     # SOS vibration pattern
          persistent: true           # set to persistent
          sticky: true               # make sure it doesn't dismiss if selected
          clickAction: /lovelace/alarm    # navigate user to the lovelace alarm view
          icon: /local/alarm.jpg     # relative path to the icon
          color: red                 # set the color of the notification to red
          group: alarm               # the group name to group together notifications
          tag: alarm                 # tag is required in order to remove the persistent notification
```

在上面的自动化示例中，将创建一个名为 `Alarm` 的新通道，并使用振动、LED 和重要性的默认设置。该通知也将是持久的，并且是组和标签的一部分，以及图标以及其他更改。

#### 传感器

从 1.8.0 开始，我们引入了新的 [Geocoded sensor](https://companion.home-assistant.io/docs/core/sensor#geocoded-location-sensor)，可以帮助您将 GPS 位置转换为实际的街道地址。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-05-mobile-apps-new-features/geocoded_sensor.png' alt='Screenshot of the Geocoded 传感器'></a>
地理编码传感器的屏幕截图。
</p>

它的电池传感器在 1.9.0 中被拆分为包含 [battery 状态 sensor](https://companion.home-assistant.io/docs/core/sensor#battery-sensor)，因此您可以在活动状态时您的设备 `charging`、`not_charging`、`discharging` 和 `full`。还可以区分是 `wireless`、`ac` 还是 `usb`。现在看到了，您的状态会在插入和拔出后立即更新，以实现更快的自动化。

#### 生物识别

生物识别技术于 1.9.0 中引入，允许用户在不使用应用程序时对其进行门锁。启动应用程序后，您将看到如下所示的锁屏，要求您提供指纹或面部解锁应用程序。您可以通过访问应用程序内的应用程序配置屏幕来设置此功能。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-05-mobile-apps-new-features/biometric_unlock.png' alt='Screenshot of Biometric Unlock'></a>
生物识别解锁的屏幕截图。
</p>

#### 其他改进

我们还努力改进应用程序的其他区域：

- 现在可以设置2个[widgets](https://companion.home-assistant.io/docs/integrations/android-widgets)，实体状态是最新添加的。实体状态小组件将显示选定实体的状态和任何属性。每30分钟或点击时更新一次。服务调用小组件也得到了有效的增强，允许您从且可用的服务列表添加中进行选择，并能够服务可能需要的其他数据字段。
- 在应用程序配置中，家庭网络 WiFi SSID 选项现在允许用户选择多个 SSID。
- 我们的WebView中添加了Cookie管理器，允许您保存您可能在[webpage 卡片](/home-assistant/dashboards/iframe/)中使用的网站中的cookie。
- 添加了更多描述性 SSL 错误消息，以帮助用户解决在设置应用程序时可能遇到的本地问题。
- 设备 ID 现在与可操作通知的事件数据一起发送。

### iOS

首先，我们应该向 Zac ([@zacwest](https://github.com/zacwest)) 打个招呼，他加入了 iOS 团队，并在过去几个月贡献了大量代码。事实上，扎克当时重写了应用程序的大部分底层代码，虽然看起来很相似，但在场景背后，它几乎是一个新的应用程序！ iOS 应用程序中现在的一些功能包括：

＃＃＃＃ 稳定

使应用程序可靠并消除错误是一个重点。您不必经常拉动刷新，传感器更新更可靠，并且编辑动作和通知等内容不会意外删除它们。

无论是晚上回家时打开灯光，还是向某人发送您要下班以及行程需要多长时间的通知，我们知道这是很多人使用该应用程序最多的功能，我们也知道性能尚未达到100%，而最近版本的iOS的变化似乎使这个功能变得可插拔。为了解决这些问题，我们进行了大量的更改（不幸的是，Apple的CoreLocation框架是一个黑匣子），我们现在正在将位置数据发送到家在此之前助理进行精度检查，检查精度是否可以接受，或者一分钟前的更新是否具有更好的精度。当精度荧光时，我们同时尝试获取新的更新。虽然我们仍然使用重大的位置更改（例如更改手机信号塔）来从后台唤醒应用程序，但现在会自动丢弃提供它们的数据并尝试获取更省的 GPS 位置。

#### 赋予通知权力

通知是您与应用程序交互的一些更强大的方式，现在它们的功能更加强大。当您实现 `stream` 集成时，[摄像头 通知](https://companion.home-assistant.io/docs/通知/dynamic-content) 现在将通过 HTTP Live Streaming (HLS) 而不是以前的 MJPEG 标准进行流式传输，为您提供更实时的体验；摄像头通知也以正确的长宽比显示；您应添加为通知的每个动作启动的每个动作 URL；相对 URL（如 `/lovelace-tacos/0`）现在将在应用程序中打开，从而使您退出野生动物园。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-05-mobile-apps-new-features/ios-notification-examples.png' alt='Screenshot of new 通知 example 触发器 and 服务 calls'></a>
示例触发和服务调用通知的屏幕截图。
</p>

#### 使用应用程序时更频繁地更新传感器

许多人要求更新传感器。我们遇到的问题是，当应用程序在后台运行时，它会处于睡眠状态，这是 iOS 保存通知的一部分。但是，当您使用该应用程序时，应该能够间隔发送数据。现在，您可以在打开应用程序时设置所需的传感器更新频率。该速度可以慢至每隔 20 秒一次，也可以快至每 20 秒一次！希望这对于使用 iPad 作为壁挂式信息亭的人们来说将是一个巨大的改进。

#### 不再有重复的集成

以前，当您删除并重新安装应用程序时，您将在 Home Assistant 中获得新的 `..._2` 集成以及一组新的传感器，例如 `sensor.freds_iphone_2`。这太痛苦了！特别是对于我们出色的 Beta 测试人员来说，他们经常在一天内多次完成应用程序的入门过程以检查错误（谢谢！）。现在，应用程序向 Home Assistant 发送注册其唯一ID，这意味着在大多数情况下，当您重新安装或重置应用程序时，它应该只选择并使用旧的集成和实体。

#### 可用性

另一个改进找到的途径是让事情变得更容易配置一些。现在，在应用程序中通知类别和动作时，您将事件行为和服务调用；主题颜色的选择应该始终贯穿；您调整页面的缩放比例或传感器更新的频率（如果应用程序保持打开状态）等；还有更多！您肯定会想深入研究 [releases](https://github.com/home-assistant/iOS/releases) 或在应用程序的设置中进行尝试。

#### iOS 14 展望

iOS 14 中新增了小部件，毫无疑问这里蕴藏着巨大的潜力。对于它们的功能，一个很好的类比就是将它们视为 Apple Watch 的复杂功能。相对静态的显示可以使用大量数据进行更新。我们想要的一件事是了解您在接下来的几个月内构建小部件时的兴趣，在这里看到的信息和显示。请告诉我们您对 [this Thread](https://community.home-assistant.io/t/what-kind-of-ios-14-big-sur-widgets-would-you-like-to-see) 的任何想法。

iOS 14 还引入了 [Local Push Connectivity](https://developer.apple.com/docs/networkextension/local_push_connectivity)，它对本地网络上增加了对您的通知的支持，从而增加了访问权限。与严重警告一样，这需要 Apple 的明确批准，但我们希望改善船只和车辆的体验！

## 就这样了，差不多了

哇，非常感谢您一路读到这里！如果没有敬业的志愿者团队，您所读到的所有内容都是不可能实现的。除了上面的亮点之外，我们还修复了大量错误并全面进行了其他改进。感谢Android端的[JBassett](https://github.com/JBassett)、[KBerstene](https://github.com/KBerstene)、[chriss158](https://github.com/chriss158)、[timmmeeeh](https://github.com/timmmeeeh)、[timmoo001](https://github.com/timmoo001)、[craftykoala](https://github.com/craftykoala)、[jeroenseegers](https://github.com/jeroenseegers)、[yoxjames](https://github.com/yoxjames)和[neopilou](https://github.com/neopilou)，以及iOS端的[robbiet480](https://www.github.com/robbiet480)和[zacwest](https://www.github.com/zacwest)。

最后两件事，首先提醒您，可以在 [their own site](https://companion.home-assistant.io) 上找到我们的应用程序的完整文档。另外，由于您是那种会阅读整个博客的人（再次做得好！），您可能是我们应用程序的完美文章 Beta 测试员，如果您认为可以为您提供帮助，可以您注册 Android 应用程序 [here](https://play.google.com/apps/testing/io.homeassistant.companion.android) 或 iOS 应用程序 [here](https://companion.home-assistant.io/app/ios/beta)。
