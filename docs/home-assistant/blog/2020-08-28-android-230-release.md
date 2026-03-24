---
title: 'Home Assistant Companion Android 应用：新功能'
description: Home Assistant Companion Android 应用 2.3.0 的新变化
---

大家好，距离我们上次更新移动应用动态已经很久了，所以现在是时候再来一次！这次我们重点聊 Android 应用的新内容。过去几个版本更新了不少东西，我们会把直到刚刚发布到 Google Play 商店的 2.3.0 版本为止的内容都覆盖到。

## 管理传感器

从 2.2.0 版本开始，应用新增了“管理传感器”页面，你可以在 App 配置里找到它。现在你可以关闭不想使用的传感器，同时保留你关心的传感器更新。这也包括在保留位置追踪的情况下关闭地理编码传感器。顺带一提，原来在 App 配置中的两个位置开关也已移动到这个新页面。你还能看到最近发送到 Home Assistant 实例的实时数据，以及对应属性和其他传感器细节。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-28-android-230-release/manage_sensors.png' alt='Screenshot of Manage 传感器'></a>
Screenshot of the Manage 传感器.
</p>

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-28-android-230-release/sensor_management.png' alt='Screenshot of 传感器 Management'></a>
Screenshot of 传感器 Management.
</p>

## 新增传感器

自上次沟通以来，我们新增了不少传感器，下面是新内容。其中一些传感器会在特定状态变化时立即更新你 Home Assistant 实例中的状态。下列所有传感器也会按默认 15 分钟更新间隔进行更新。若想了解每个传感器更详细的行为，请查看[文档](https://companion.home-assistant.io/docs/core/sensor)。

仅 Google Play 商店版本可用：

- Activity

所有用户都可用：

- Audio
- 蓝牙
- Do Not Disturb
- Last Reboot
- 灯光
- Phone
- Pressure
- Proximity
- Next 报警
- Sim 1 & 2
- Steps
- Storage

## 传感器增强

除了上面提到的新传感器，我们也改进了现有传感器。电池状态传感器现在会将电池健康度作为属性上报，并且在接入电源后几秒会进行第二次更新调用，以便更快刷新状态。WiFi 连接传感器也已更新，状态和部分属性会在任何网络变更被检测到时立即更新。这也意味着如果你有多个接入点，你将能实时看到设备切换过程。

## NFC

应用现在支持读取和写入 NFC 标签，你可以基于扫描标签来构建自动化。此功能需要 Home Assistant 核心 0.114 及以上版本。请注意，某些手机需要先解锁才能读取标签。更多用法细节请看[文档](https://companion.home-assistant.io/docs/integrations/universal-links)。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-28-android-230-release/nfc.png' alt='Screenshot of NFC'></a>
Screenshot of NFC.
</p>

## 模板小部件

我们新增了一个模板小部件，让你几乎可以自由定义想展示的任意数据。用户在编辑时就能实时看到模板渲染结果。我个人建议先在桌面端完成模板构建，因为在手机或平板上操作会稍微费劲一些。这个小部件每 15 分钟更新一次，或在点击时更新。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-28-android-230-release/template_widget.png' alt='Screenshot of the 模板 Widget'></a>
Screenshot of the 模板 Widget.
</p>

## 主题

现在你可以将应用主题与设备主题分开设置。这对喜欢设备用深色主题、而 Home Assistant 用浅色主题的用户非常有用。除了这一变化，我们还修复了几项与主题相关的问题。

<p class='img'>
<img src='/home-assistant/images/blog/2020-08-28-android-230-release/app_theme.png' alt='Screenshot of App Theme selection'></a>
Screenshot of App Theme selection.
</p>

## 其他改进

- 新增对 H265 视频的支持
- 实体状态小部件增强，支持多个属性和自定义分隔符
- 小部件整体增强，支持 Material Icons
- 通知现在支持像 Discord 一样使用 `:smiley:`
- 另外还有大量修复

特别感谢 [chriss158](https://github.com/chriss158)、[colincachia](https://github.com/colincachia)、[David-Development](https://github.com/David-Development)、[JBassett](https://github.com/JBassett)、[klejejs](https://github.com/klejejs)、[noam148](https://github.com/noam148)、[skynetua](https://github.com/skynetua) 和 [uvjustin](https://github.com/uvjustin) 的贡献。欢迎继续通过 [issues](https://github.com/home-assistant/android/issues/new/choose) 提交 Bug 报告和功能建议，我们很快再聊！
