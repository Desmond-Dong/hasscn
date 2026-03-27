---
title: 家庭助理伴侣 Android 应用程序版本 3.0.0
description: '大家好，自从我们上次谈话以来已经有一段时间了。我们推出了全新的 Android 版 Home Assistant Companion，我们很高兴能将其交付给您，并将于第二天左右在 Google Play 商店中推出。 本页属于 Home Assistant 中文博客与更新记录。'
---
# 家庭助理伴侣 Android 应用程序版本 3.0.0

大家好，自从我们上次谈话以来已经有一段时间了。我们推出了全新的 Android 版 Home Assistant Companion，我们很高兴能将其交付给您，并将于第二天左右在 Google Play 商店中推出。

在我们讨论发布细节之前，我想提一下，本月标志着 Home Assistant Companion 应用程序的 [1 year anniversary](https://youtu.be/tc17q1Zn0Xs?t=3487) 在 Google Play 商店中提供！想想整个应用程序从最初的 alpha 状态到今天发布的版本已经走了多远。你能相信已经过去一年了吗？

在 Hacktoberfest 期间，Android 方面的事情非常繁忙！我们总共收到来自众多贡献者的 84 个拉取请求，我们对此表示感谢，感谢你们的所有努力！如果您错过了，我们实际上在 2.4.0 版本之后不久就发布了一个版本，但由于我们没有附带的博客文章，因此我们将遮盖自上次在这篇文章中谈到以来的新内容。下面列出的所有功能均已记录在 [Companion](https://companion.home-assistant.io/) 网站上，请务必查看该网站以了解更多详细信息。在继续介绍新内容之前，让我们先回顾一下此版本的向后不兼容的更改。

## 向后不兼容的更改

在我们的 [last 博客 post](https://www.home-assistant.io/博客/2020/09/12/android-240-发布/) 中，我们提到我们将分解一些传感器及其属性。从 3.0.0 开始，我们已经完成了这项任务，并且不再将非静态属性作为任何传感器的一部分。如果您丢失任何数据，请检查应用程序配置下的管理传感器屏幕，并启用您之前用作属性的传感器。

此版本中的另一个重大突破性更改是重构了小部件以与应用程序架构保持一致。不幸的是，这意味着一些现有的小部件可能会从您的主屏幕上消失，需要重新创建。我们对此表示歉意，并且无法找回丢失的现有小部件。如果您忘记了那里有哪些数据，我们确实保存了这些数据，请在 [below](#other-enhancements) 下了解更多信息。

## 入职改进

第一个重大变化是我们的登录屏幕发生了变化，我们现在要求用户输入他们首选的设备名称，该名称会附加到应用程序创建的所有实体上。这让一些用户感到沮丧，因为这意味着每当他们登录应用程序时，他们都需要将实体重命名为他们真正想要的名称。默认情况下，设备名称是设备型号，但这对某些用户来说没有意义，特别是当他们拥有多个相同型号的设备时。

<p class='img'>
<img src='/home-assistant/images/blog/2020-11-06-android-300-release/onboarding.png' alt='Screenshot of the new onboarding flow'></a>
新的入门流程的屏幕截图。
</p>

## 新传感器

我们有几个新的传感器欢迎使用该应用程序，默认情况下所有这些传感器都是禁用的。第一组传感器实际上是在2.5.0中引入的：

- [Traffic Stat sensor](https://companion.home-assistant.io/docs/core/sensor#traffic-stats-sensor) - 传感器，其状态代表设备发送和接收的数据量。移动数据可能不准确，这取决于我们从API获取的数据。

以下传感器是 3.0.0 中的新增功能：

- [Keyguard sensor](https://companion.home-assistant.io/docs/core/sensor#keyguard-sensor) - 传感器，代表来自 Keyguard API 的各种状态，例如设备当前是否已锁定或已设置密码。这些传感器将在 15 分钟的周期内更新。
- [Last 通知 sensor](https://companion.home-assistant.io/docs/core/sensor#last-通知-sensor) - 一个非常强大的传感器，需要您必须授予特殊许可才能读取设备上发布的所有通知。通知的所有属性均作为传感器的属性提供。您可以将此传感器视为集成任何向您的设备发布通知的应用程序的好方法，从而使您能够围绕它实现自动化。就我个人而言，我一直在使用它来集成食品配送应用程序，以检测我的订单何时将被交付并围绕它实现自动化。一旦发布通知，该传感器就会更新。
- [Last 更新 触发器](https://companion.home-assistant.io/docs/core/sensor#last-更新-触发器-sensor) - 一个传感器，其状态将代表上次发送到您的 Home Assistant 实例的更新的原因。只要更新发送到您的 Home Assistant 实例，该传感器就会更新。

## 传感器 设置

我们不仅仅只是添加新的传感器，我们还增强了整体传感器体验。从版本 2.5.0 开始，某些传感器具有自定义设置，可以帮助将哪些更新实际发送到您的 Home Assistant 实例。

<p class='img'>
<img src='/home-assistant/images/blog/2020-11-06-android-300-release/location_sensor_settings.png' alt='Screenshot of location 设置'></a>
位置设置的屏幕截图。
</p>

- 下一个警报 - 该传感器具有允许列表设置。这意味着，如果您有一个应用程序将非常奇怪的时间戳报告为实际的报警，您现在可以通过告诉应用程序从哪些包发送报告来忽略它们。默认情况下，该列表为空。建议 Tasker 用户使用此设置。
- 最后通知 - 该传感器还有一个允许列表，让用户创建一个他们想要从中获取通知数据的应用程序列表。默认情况下，所有通知都会发送到您的 Home Assistant 实例。我们强烈建议您在想到允许列表后立即设置一个允许列表，以防止大量更新。您会对短时间内显示的数据量感到惊讶。
- 上次重新启动 - 发现了一个错误，有时设备上次重新启动的计算时间可能会关闭，从而导致不必要的更新。现在有一个死区设置，允许您调整时间以忽略更新。默认情况下，此设置为 1 分钟，您很可能不需要更改此设置。
- 位置传感器 - 所有 3 个位置传感器现在都已设置，允许您调整向 Home Assistant 实例发送更新所需的最低精度。还有一个设置可以调整更新之间的最短时间。这应该可以帮助很多没有得到他们期望的位置结果的用户。我们建议您在评估 3.0.0 中的所有位置修复后更改此设置，因为位置跟踪可能已经得到改进，无需调整这些。
- WiFi BSSID - 该传感器有一个设置，允许用户为当前连接的 BSSID 提供别名。不是每个人都能记住一个 MAC 地址，更不用说几十个了。此设置旨在帮助那些使用此传感器的人更好地理解事物，而无需秘密或模板。如果您居住在有多个接入点的家庭中，您可能会发现设置别名来帮助处理诸如“房间在场”之类的事情很有用。默认情况下，该传感器报告连接的 MAC 地址。

## Android 11 电源菜单

我们现在集成了 Android 11 的电源菜单设备控制功能。以下域是 [currently supported](https://companion.home-assistant.io/docs/integrations/android-power-menu)：

- `automation` 在 /Off
- `climate` 温度滑块
- `cover` 打开/Close
- `fan` 开 /Off, 速度滑块
- `input_boolean` 在 /Off
- `input_number` 数字控制滑块
- `light` 开/Off, 亮度控制滑块
- `lock` 门锁/Unlock
- `scene` 打开场景
- `script`开放脚本
-  `switch` On/Off

<p class='img'>
<img src='/home-assistant/images/blog/2020-11-06-android-300-release/power_menu.png' alt='Screenshot of power menu'></a>
电源菜单的屏幕截图。
</p>

## 通知改进

通知也有一些改进。

- 当通知为 [cleared](https://companion.home-assistant.io/docs/通知/通知-cleared) 时，将发送事件以及所有通知数据。
- 通知可以利用报警流绕过设备的振铃模式设置。如果有重要事件（例如触发警报），这会很有用。请务必检查 [companion site](https://companion.home-assistant.io/docs/通知/critical-通知) 上更新的 Android 示例。
- [Text-to-speech 通知](https://companion.home-assistant.io/docs/通知/通知-basic#text-to-speech-通知)，如果需要，可以使用报警流。默认情况下，它将使用设备的音乐流。还有一个附加选项可以在说话时暂时将音量级别更改为最大级别，然后音量将恢复到之前的水平。
- 用于控制手机的新设备 [commands](https://companion.home-assistant.io/docs/通知/通知-commands)：向另一个应用程序广播意图，控制请勿打扰和铃声模式。
- 打开另一个带有 [actionable 通知](https://companion.home-assistant.io/docs/通知/actionable-通知#building-automation-for-通知-动作) 的应用程序，请确保遵循 Android 示例。

## 其他增强功能

我们还花时间对所有其他区域进行改进，最显着的是应用程序配置内部：

<p class='img'>
<img src='/home-assistant/images/blog/2020-11-06-android-300-release/settings.png' alt='Screenshot of 设置'></a>
设置的截图。
</p>

- 现在可以覆盖应用程序语言以匹配用户的配置文件，这将影响添加的实体的名称以及应用程序配置的外观。默认情况下，您的设备将使用您的手机语言，但是，我们注意到有些用户实际上更喜欢家庭助理在其设备上始终使用不同的语言。通过此功能，您现在可以将语言设置为应用程序支持的任何语言之一。您还可以帮助我们翻译 [Lokalise](https://lokalise.com/public/145814835dd655bc5ab0d0.36753359/) 上的应用程序。
- 最近收到的通知的历史记录，以及发送的所有数据
- 通知速率限制信息，帮助您了解您是否即将超过每日限制。
- 可编辑的小部件，能够删除 [backward-incompatible changes](#backward-incompatible-changes) 中提到的丢失的小部件。如果您曾经创建过一个小部件并意识到您需要再进行一次调整，那么这确实很有帮助。
- 小部件现在会在屏幕打开时更新，以提供更快的更新
- 一个新的小部件来控制任何 [media player](https://companion.home-assistant.io/docs/integrations/android-widgets#media-player)

<p class='img'>
<img src='/home-assistant/images/blog/2020-11-06-android-300-release/media_player_widget.png' alt='Screenshot of media player widget'></a>
媒体播放器小部件的屏幕截图。
</p>

- 启用/Disable所有传感器
- [Events](https://companion.home-assistant.io/docs/integrations/app-events) 用于进入或退出区域以及所有位置数据
- 链接到 GitHub 上当前的发布变更日志
- 文件上传支持插件或人物上传
- 能够选择不发送崩溃报告以帮助团队调查崩溃。如果您决定选择退出，请务必在 GitHub 上报告问题，否则我们可能不知道问题的存在。
- 大量位置修复以实现更准确的报告
- 许多错误修复和其他杂项增强功能

非常感谢所有参与者。希望您花时间消化所有新功能。期待每个人都有的所有新用例和功能请求。

完整的变更日志可以在 [GitHub](https://github.com/home-assistant/android/releases/tag/3.0.0) 上找到。
