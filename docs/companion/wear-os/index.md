---
title: "概览"
id: "wear-os"
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 8+ only

您可以直接从 Wear OS 手表访问 Home Assistant，即使在没有连接手机的情况下，也可以使用手表上的 WiFi 或蜂窝网络连接。

该应用不支持所有 Home Assistant 功能。请关注此页面，随着应用新增功能！查看[传感器！](sensors.md)

## 前提条件

要在手表上设置 Home Assistant，您需要一部已安装 Home Assistant 应用的配对 Android 手机来登录。登录后，不再使用手机应用。

## 主屏幕

登录并选择后，当前支持切换/执行的域列表如下：

* `button`
* `cover`
* `fan`
* `input_boolean`
* `input_button`
* `light`
* `lock`
* `scene`
* `script`
* `switch`

### 收藏

用户可以转到 Wear OS 应用中的设置，设置将显示在列表顶部的收藏实体。这些实体将在其余实体加载之前出现，以便在启动应用时可以立即执行。如果您从 Home Assistant 实例中删除了一个实体，还有一个设置选项可以清除收藏以删除过期实体。

收藏也可以从手机应用管理，方法是转到应用配置 > Wear OS 应用 > 管理收藏。手机应用还允许您拖放实体以更改它们在主屏幕上显示的顺序。

如果您只想显示收藏实体而不显示 Wear OS 应用中的其他内容，可以通过打开应用并导航到设置，然后选择"仅显示收藏"选项来实现。这将隐藏区域和域，使您只能看到收藏。

### 区域

如果任何设备或实体已添加到 Home Assistant 中的区域，这些区域将显示在 Wear OS 应用的收藏下方。点击区域将显示该区域中的所有主要实体。任何未添加到区域的主要实体域将显示在列表底部附近，作为"更多实体"。配置和诊断实体以及隐藏实体仅显示在列表底部的"所有实体"中。

### 更多详情

长按任何实体可打开更多详情屏幕。此屏幕包含有关状态和实体上次更新时间的更多信息。详情屏幕提供以下选项，具体取决于实体支持的功能：

- `fan`: 速度控制
- `light`: 亮度控制和色温控制

### 设置

设置屏幕位于主屏幕底部。您可以在此处添加手表上的收藏以及配置磁贴。您还可以找到启用触觉反馈和/或 toast 确认的选项，以了解何时选择了实体。这些设置将反映在主屏幕和快捷方式磁贴上。

## 磁贴

* 快捷方式磁贴显示最多 7 个快捷方式，可以从 Wear OS 应用的设置部分选择。您将能够选择与主屏幕上可访问的相同实体集。从 Wear OS 3 开始，可以添加任意数量的可单独配置的磁贴，仅受 Wear OS 的磁贴总数限制。
* 模板磁贴显示渲染的模板。模板只能从 Android 伴侣应用设置。注意：磁贴中无法滚动，模板应适合手表屏幕。
* 摄像头磁贴显示所选摄像头的快照。
* Assist 磁贴允许您快速[在手表上打开 Assist](https://www.home-assistant.io/voice_control/android/#assist-on-wear-os)。
* 恒温器磁贴允许您查看和控制气候实体的目标温度。
 
:::note 关于磁贴刷新
Wear OS 限制应用更新磁贴的频率以及交互程度。对于摄像头、模板和恒温器磁贴，您可以选择刷新间隔，向系统指示磁贴应多久刷新一次。

 - 手动（仅在点击刷新按钮时更新）
 - 在视图中（仅在将磁贴滚动到视图中时更新）
 - 每 x 分钟/小时（在后台更新磁贴，即使未查看）

对于除"手动"以外的间隔，系统不保证更新：如果磁贴未放置在磁贴列表的开头或结尾，它们的更新频率可能会低得多。您可能会在磁贴更新时看到旧版本 1-2 秒。

每 x 分钟/小时更新的选项在查看时仍会更新磁贴。例如：选择 1 小时的更新间隔将向系统指示磁贴应在查看时更新，并自上次查看以来每小时在后台更新。
:::

### 设置模板磁贴样式

您可以使用 HTML 来格式化显示的文本。目前支持以下标签：

* 添加新行：`<br>`
* 更改文本样式：`<b>粗体</b>`、`<i>斜体</i>` 或 `<u>下划线</u>`
* 更改文本大小：`<big>大</big>` 或 `<small>小</small>`
* 更改颜色：`<font color='#03a9f4'>彩色文本</font>`
* 使用标题：`<h1>标题</h1>`、`<h2>副标题</h2>` 等

### 恒温器磁贴
恒温器磁贴可用于按步长上下更改气候实体的目标温度。由于磁贴刷新受限，显示的目标温度可能不再准确。因此，如果用户通过磁贴更改温度，当前目标温度总是先刷新。如果用户快速多次更改温度，每次点击都会相对于上一次点击的结果更改温度，而不是从服务器获取目标温度。这样做是为了抵消某些恒温器更改目标温度的延迟。

## 复杂功能

* 实体状态复杂功能可以显示在您的表盘上。复杂功能将显示所选实体的当前状态，以及可选的测量名称和单位。根据表盘的不同，复杂功能可能还会显示实体名称和图标，并支持"短文本"和"长文本"复杂功能类型。

  当您将实体添加到表盘时，可以选择要显示的实体。这仅在手錶上编辑表盘时有效，而不是在手机上的手表应用中。要更改所选实体，只需更改复杂功能并再次选择实体状态复杂功能。每当屏幕打开以及大约每 15 分钟，复杂功能会自动更新。您可以通过在表盘上点击复杂功能来强制更新。

  提示：使用[模板传感器](https://www.home-assistant.io/integrations/template/#state-based-template-binary-sensors-buttons-numbers-selects-and-sensors)以获得完全的灵活性。

* Assist 复杂功能可用于直接从表盘快速与 Assist 功能交互。

## 通知


Wear OS 设备默认会转发连接设备上任何应用的[通知](../notifications/basic.md)，这意味着通知需要先发送到连接设备，然后才能到达可穿戴设备。Wear OS 应用允许将通知直接发送到手錶本身，跳过连接设备。由于平台限制，并非连接设备支持的所有通知功能都被 Wear OS 应用支持。

目前仅支持以下参数。

*  [`channel`](../notifications/basic.md#notification-channels)
*  `message`
*  [`notification_icon`](../notifications/basic.md#notification-status-bar-icon)（并非所有设备都会显示图标）
*  [`tag`](../notifications/basic.md#replacing)（支持仅限于替换通知）
*  `title`
*  [`vibrationPattern`](../notifications/basic.md#notification-vibration-pattern)（如果您的设备默认不振动的可能需要设置振动，模式可能不会根据设备被遵守）

示例：

```yaml
automation:
  - alias: '发送可穿戴通知'
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "通知消息"
          title: "通知标题"
          data:
            notification_icon: "mdi:fire"
            tag: "notification"
```

:::info
为了加快通知传递，您可能需要使用[文档](../notifications/critical.md#android)中列出的第一种关键通知格式。闹钟流通知目前在 Wear OS 中不受支持。
:::

### 通知命令

Wear OS 应用对[通知命令](../notifications/commands.md)有基本支持。不幸的是，并非所有命令都能在应用中得到支持。目前支持以下命令：

*  [BLE 发射器](../notifications/commands.md#ble-beacon-transmitter)
*  [信标监视器](../notifications/commands.md#beacon-monitor)
*  [清除通知](../notifications/basic.md#clearing)
*  [停止 TTS](../notifications/commands.md#stop-tts)
*  [更新传感器](../notifications/commands.md#update-sensors)

### 通知清除

Wear OS 应用还支持[通知清除](/companion/notifications/cleared)事件。当通知被清除时，伴侣应用将发送一个事件。

### 文字转语音通知

Wear OS 应用还支持[文字转语音通知](../notifications/basic.md#text-to-speech-notifications)。请参考上面的链接了解使用的格式以及使用注意事项。