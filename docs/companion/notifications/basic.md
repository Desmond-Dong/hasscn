---
title: "简介"
id: "notifications-basic"
---

`mobile_app` 通知平台接受通知平台使用的标准 `title`（标题）、`message`（消息）和 `target`（目标）参数。mobile_app 通知平台支持目标作为服务。只要您在设置过程中授予了通知权限，您将在通知操作中找到所有设备列为目标，名称前缀为 `notify.mobile_app_` 后跟您设备的设备 ID。这可以在 [Home Assistant 配置菜单](https://my.home-assistant.io/redirect/config/) 的 Companion App 菜单中检查，默认为 iOS/macOS 设置应用中的通用>关于或 Android 设置中的关于>电话中指定的名称（空格和非字母数字字符替换为下划线）。通知平台的要求是您必须在负载中指定至少 `message:`。通知的最小工作示例是：

```yaml
automation:
  - alias: '发送通知'
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "通知文本"
```

mobile_app 平台为上面生成的简单通知提供了许多增强功能。例如，下图显示了一个 [iOS 可操作通知](actionable.md)，允许您从每个按钮触发不同的自动化。
![一个推送通知，显示所有基本选项 `title` 和 `message` 以及 `subtitle` 和操作。](/companion-assets/ios/example.png)

:::info
Wear OS 应用支持某些通知功能。请查看[文档](/companion/wear-os/index#notifications)以了解当前支持的功能。
:::

## 向多个设备发送通知

要向多个设备发送通知，请创建一个[通知组](https://www.home-assistant.io/integrations/group#notify-groups)：
```yaml
notify:
  - name: ALL_DEVICES
    platform: group
    services:
      - action: mobile_app_iphone_one
      - action: mobile_app_iphone_two
      - action: mobile_app_ipad_one
      - action: mobile_app_pixel_4_xl
```
现在，您可以使用以下方式向组中的每个人发送通知：
```yaml
  automation:
    - alias: "通知移动应用组"
      trigger:
        ...
      action:
        - action: notify.ALL_DEVICES
          data:
            message: "家里发生了一些事情！"
```

## 通用选项

### 附件

您可以将媒体和其他内容附加到通知中。请参阅[附件](/companion/notifications/attachments)。

### 打开 URL

当点击通知时，您可以选择打开一个 URL，它可以属于以下类别之一：

- Home Assistant 实例的相对 URL，如 `/lovelace/test`。
    - <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 如果您将多个服务器连接到 iOS 或 mac 应用，相对 URL 将相对于发送通知的服务器处理。
- 完整的 URL，如 `https://example.com`
- 对于可操作通知中的特定操作，请参阅[其文档](/companion/notifications/actionable)。
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 使用 `app://<package name>` 的应用程序，其中 `<package name>` 替换为您希望打开的实际包。
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 使用 `entityId:<entity_ID>` 的实体的更多信息面板，其中 `<entity_id>` 替换为您希望查看的实体 ID。例如：`entityId:sun.sun`。
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 您还可以使用 `settings://notification_history` 打开通知历史记录
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 您还可以使用 [intent scheme URI](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) 在已安装的应用程序中启动操作。
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 您可以使用 `deep-link://<deep_link>` 向应用发送特定的[深层链接](https://developer.android.com/training/app-links#deep-links)，其中 `<deep_link>` 是您希望发送的实际深层链接。
- <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 如果您希望默认不打开应用而是什么都不做，可以使用 `noAction`。

对于相对 URL，您可以以 `/lovelace/test` 格式打开 lovelace 视图，其中 `test` 替换为定义视图中的 [`path`](https://www.home-assistant.io/dashboards/views#path)，或以 `/lovelace-dashboard/view` 格式打开 lovelace 仪表板，其中 `/lovelace-dashboard/` 替换为您定义的 [`dashboard`](https://www.home-assistant.io/dashboards/dashboards/) URL，`view` 替换为该仪表板中定义的 [`path`](https://www.home-assistant.io/dashboards/views#path)。



```yaml
automation:
  - alias: "通知运动点击操作"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            # iOS URL
            url: "https://google.com"
            # Android URL
            clickAction: "https://google.com"
```

```yaml
automation:
  - alias: "发送带链接的通知"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            # iOS URL
            url: "/lovelace/cameras"
            # Android URL
            clickAction: "/lovelace/cameras"
```

:::info
下面关于[分组](#grouping)、[替换](#replacing)和[清除](#clearing)的部分不考虑多个服务器。如果您为 `group` 或 `tag` 使用相同的文本，无论哪个服务器发送通知，您都应该期望看到相同的行为。您可以考虑将服务器名称添加到当前文本中，以使行为特定于服务器。
:::

### 分组

将通知在视觉上组合在一起。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 不支持[关键通知](critical.md)的分组。

```yaml
automation:
  - alias: "通知移动应用分组"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "智能家居警报"
          message: "家里发生了一些事情！"
          data:
            group: "example-notification-group"
```

### 替换
使用通知的标签替换现有通知。所有后续通知将替换具有相同标签的通知。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 不支持[关键通知](critical.md)的替换。

```yaml
automation:
  - alias: "通知运动 iOS 替换"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            tag: "backyard-motion-detected"
```

:::info
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 不要在不同的 `group` 中使用相同的 `tag`，以避免意外行为。
:::

### 清除

:::note <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 版本要求
在 iOS 上清除通知需要应用版本 2021.5 或更高版本。
:::

您可以通过发送 `clear_notification` 来清除具有标签的现有通知。

平台限制可能需要 Companion 应用最近被使用过才能清除通知：这适用于所有 iOS 通知以及任何未标记为关键的 Android 通知。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 只会清除给定标签的最近一个[关键通知](critical.md)。

```yaml
automation:
  - alias: "通知运动清除通知"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "clear_notification"
          data:
            tag: "backyard-motion-detected"
```

### 副标题 / 主题

副标题和主题是您可以在通知中使用的次要标题，超出标题属性之外。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> <img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /><br />
除了标题和消息外，还会显示 `subtitle`。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
根据您的设备，`subject` 可能会取代较长的内容（超过 6 行）。

```yaml
automation:
  - alias: "通知移动应用副标题"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "智能家居警报"
          message: "家里发生了一些事情！"
          data:
            # iOS 示例
            subtitle: "副标题在这里"
            # Android 示例
            subject: "长文本主题"
```

## Android 专属

### 通知颜色

在 Android 中，您可以设置通知的 `color`，您可以使用颜色名称或十六进制代码。

```yaml
automation:
  - alias: "通知运动颜色"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            color: "#2DF56D" # 或 "red"
```

### 粘性通知

您可以设置是否在选择通知后将其关闭。将 `sticky` 设置为 `'true'` 将阻止通知在用户选择时被关闭。将其设置为 `'false'`（默认）将在选择时关闭通知。

```yaml
automation:
  - alias: "通知运动粘性"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            sticky: "true" # 或 "false"
```

### 通知渠道

通知渠道（在某些设备上：_通知类别_）允许您轻松分离通知（例如闹钟与洗衣），并自定义通知声音和许多其他设备特定功能等方面。运行 Android 8.0+ 的设备能够使用自动化动态创建和管理通知渠道。一旦创建了渠道，您可以导航到通知设置，您将找到新创建的渠道，从那里您可以根据设备允许的内容自定义行为。

#### 创建渠道

为了创建通知，您需要指定要使用的 `channel`。默认情况下，如果未定义 `channel`，所有通知都使用 `General`。

在下面的示例中，将创建一个名为 `Motion` 的新渠道：

```yaml
automation:
  - alias: "通知运动渠道"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            channel: "Motion" # 您希望创建或使用的渠道名称
```

如果未提供，渠道的默认值如下：
- 重要性：默认，意味着默认通知重要性：随处显示，发出声音，但不会在视觉上打扰。
- 振动模式：振动已禁用
- LED 颜色：LED 已禁用

#### 删除渠道

如果您希望删除渠道，您需要发送 `message: remove_channel` 以及您希望删除的 `channel`。
删除渠道不会将设置重置为默认值，它只是将其从通知渠道列表中删除。如果您向已删除的渠道发送通知，它将恢复它。真正删除渠道的唯一方法是清除应用数据，这将删除所有内容。

根据您安装应用的时间，您可能希望向 `channel: default` 发送 `remove_channel` 以清理旧的默认渠道：

```yaml
automation:
  - alias: 删除运动渠道
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "remove_channel"
          data:
            channel: "Motion" # 您希望删除的渠道名称
```

#### 特定渠道属性

:::info
如果您的设备是 Android 8.0+，以下属性将在首次设置时成为 `channel` 的默认值：
- [`vibrationPattern`](#notification-vibration-pattern)
- [`ledColor`](#notification-led-color)
- [`importance`](#notification-channel-importance)

这些选项一旦为特定渠道设置，将被忽略，只有降低 `importance` 才有效（如果用户尚未修改此设置）。

运行 Android 6-7.1.2 的设备没有渠道，无需担心此说明。
:::

### 通知渠道重要性

当您为通知设置 `channel` 时，您还可以选择为每个通知设置渠道的 `importance`。此属性的可能值有 `high`、`low`、`max`、`min` 和 `default`。要了解更多关于每个值的作用，请参阅 [FCM 文档](https://developer.android.com/training/notify-user/channels#importance)。对于 Android 8.0 之前的设备，此属性可以像 `priority` 一样使用，具有上面描述的相同选项。

有关此属性的重要行为，请参阅[特定渠道属性](#specific-channel-properties)。

```yaml
automation:
  - alias: "通知运动渠道重要性"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            channel: "Motion" # 仅适用于 Android 8.0+ 的设备
            importance: high
```

### 通知振动模式

您可以通过设置 `vibrationPattern` 属性来设置渠道的振动模式。可能的值是数字列表。例如："100, 1000, 100, 1000, 100" 等。模式规范是"关闭时间、开启时间、关闭时间、开启时间、关闭时间"等。

有关此属性的重要行为，请参阅[特定渠道属性](#specific-channel-properties)。

```yaml
automation:
  - alias: "通知运动振动"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            vibrationPattern: "100, 1000, 100, 1000, 100" # 您希望设置的振动模式
            channel: "Motion" # 仅适用于 Android 8.0+ 的设备
```

### 通知 LED 颜色

某些 Android 设备具有多色通知 LED。通过设置 `ledColor` 属性，您可以控制 LED 闪烁的颜色。可能的值与 [color](#notification-color) 属性相同，例如 '#2DF56D' # 或 'red'。

有关此属性的重要行为，请参阅[特定渠道属性](#specific-channel-properties)。

```yaml
automation:
  - alias: "通知运动 LED 颜色"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: 检测到运动
          data:
            ledColor: "red" # 将 LED 设置为红色
            channel: "Motion" # 仅适用于 Android 8.0+ 的设备
```

### 持久通知

持久通知是无法通过滑动关闭的通知。如果您有重要的事情，如触发警报，这些通知非常有用。要使用此属性，您还必须设置 `tag` 属性。`persistent` 属性只接受布尔值（`true/false`），默认为 `false`。持久通知在选择后仍会被关闭，要避免这种情况，请使用 `sticky: true` 使通知保持。

在下面的示例中，我们将创建一个通知，然后在稍后删除它。

```yaml
automation:
  - alias: "通知运动持久"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            persistent: true # 设置为 true 以创建持久通知
            tag: "motion" # 持久通知需要一个标签，它可以是任何值
```

:::info
从 [Android 14](https://developer.android.com/about/versions/14/behavior-changes-all#non-dismissable-notifications) 开始，持久通知将可以被关闭，除非设备被锁定或选择了"全部清除"按钮。
:::

要删除持久通知，我们向定义的 `tag` 发送 `clear_notification`。

```yaml
automation:
  - alias: "通知运动持久删除"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "clear_notification"
          data:
            tag: "motion" # 您希望清除的持久通知的标签
```

### 通知超时

您可以设置通知在用户设备上显示多长时间后自动删除/关闭。您可以使用 `timeout` 属性和以秒为单位的值来实现这一点。

```yaml
automation:
  - alias: "通知运动超时"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            timeout: 600 # 设备应该收到通知的秒数
```

### 通知消息 HTML 格式

您可以在通知的 `message` 中添加一些自定义 HTML 标签。

```yaml
automation:
  - alias: "通知运动 HTML"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: >
            这是一个 <b><span style="color: red">HTML</span></b> <i>文本</i><br><br>这是新行后的文本
          title: "酷炫的 HTML 格式"
```

:::note 设备兼容性
并非所有设备都支持通知中的 HTML 格式，某些格式在深色模式下可能不会显示。不支持时，通知将显示未格式化的文本。无效的 HTML 可能导致文本缺失或显示不当。
:::

### 通知图标

您可以通过提供 `icon_url` 来设置通知的图标。提供的 URL 必须是公开可访问的，或者是相对路径（即 `/local/icon/icon.png`），更多详细信息可以在[附件](attachments.md)中找到。重要的是要注意，如果您设置了 `image`，Android 将不会显示通知的图标，`image` 将在其位置显示。因此 `message` 将与 `image` 一起显示，并以图像作为图标。

```yaml
automation:
  - alias: "通知运动图标"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            icon_url: "https://github.com/home-assistant/brands/blob/master/core_integrations/_homeassistant/icon.png?raw=true"
```

### 通知敏感度 / 锁屏可见性

您可以使用 `visibility` 选项更改通知在锁屏上的可见程度。此属性的可能值有：

 - `public`：始终显示所有通知内容
 - `private`（默认）：可见性取决于您在系统设置应用 > 通知中的设置；如果锁屏时显示敏感通知的选项已启用，则将显示所有通知内容，否则只显示基本信息，如图标和应用名称
 - `secret`：始终在锁屏上隐藏通知

:::info
当您在系统设置中更改 _专门针对 Home Assistant 通知_ 的锁屏可见性以在锁屏时隐藏敏感通知内容时，这也会将任何 `public` 通知视为 `private`，您将无法在锁定的设备上看到内容。
:::

```yaml
automation:
  - alias: "通知丢失设备"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "此手机已丢失，请归还至..."
          data:
            visibility: public
```

### 文字转语音通知

您可以让设备朗读通知，而不是在设备上发布通知。此通知与其他通知不同。您将设置 `message: TTS`，实际要朗读的文本在 `tts_text` 中。当前支持仅限于设备上设置的当前文字转语音区域设置。如果处理消息时出错，您将在设备上看到 toast 消息。请确保 [语音识别和合成](https://play.google.com/store/apps/details?id=com.google.android.tts) 引擎是最新的并设置为默认，以防遇到任何问题。

```yaml
automation:
  - alias: 通知运动 TTS
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "TTS"
          data:
            tts_text: "已检测到运动"
```

默认情况下，文字转语音通知使用音乐流，因此只要设备的音量未设置为 0，它们将绕过设备上的铃声模式。您可以选择使用 `media_stream: alarm_stream` 让您的通知无论音乐音量如何都能朗读出来。

```yaml
automation:
  - alias: "通知运动 TTS 闹钟"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            tts_text: "已检测到运动"
            media_stream: "alarm_stream"
```

如果您发现闹钟流音量太低，可以使用 `media_stream: alarm_stream_max`，它会临时将闹钟流音量设置为最大级别，播放通知，然后恢复到原始音量级别。

```yaml
automation:
  - alias: "通知警报触发"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "TTS"
          data:
            tts_text: "警报已触发"
            media_stream: "alarm_stream_max"
```

您可能不希望在某些情况下朗读 TTS 通知（例如，如果铃声模式不是 `normal` 或 DND 已启用）。这可以通过在自动化中添加检查[其他传感器](/companion/core/sensors)状态的条件来实现。以下是一些示例：

```yaml
automation:
  - alias: "带条件的运动通知"
    trigger:
      ...
    condition:
      - condition: state
        entity_id: sensor.<your_device_id_here>_ringer_mode # 仅当铃声为正常时朗读（不是振动或静音）
        state: normal
      - condition: state
        entity_id: sensor.<your_device_id_here>_do_not_disturb_sensor # 仅当 DND 未启用时朗读
        state: 'off'
      - condition: state
        entity_id: sensor.<your_device_id_here>_audio_mode # 仅当电话空闲时朗读（不是响铃或通话中）
        state: normal
      - condition: state
        entity_id: binary_sensor.<your_device_id_here>_music_active # 仅当电话未播放音乐时朗读
        state: 'off'
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            tts_text: 已检测到运动
```

### 计时器通知

您可以通过传递 `chronometer` 和 `when` 选项创建带有向上/向下计时器（计时器）的通知。此功能至少需要 Android 7.0。

请注意，当计时器达到 0 时，通知不会消失。相反，它将继续递减为负值。
您可能希望使用[通知超时](#notification-timeout)或在计时器归零时[替换通知](#replacing)。

- chronometer - 设置为 true 以启用计时器模式
- when - 要向上或向下计数的时间戳（自 1970 年 1 月 1 日以来的秒数）
- when_relative - 设置为 true 使 "when" 的值相对，以秒为单位，如 "timeout"

```yaml
automation:
  - alias: 通知下一个闹钟时间
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "下一个闹钟"
          message: >-
            下一个闹钟时间 {{ states('sensor.<your_device_id_here>_next_alarm') }}
          data:
            timeout: 120
            chronometer: true
            when: 120
            when_relative: true
```

### 进度通知

您可以通过传递 `progress` 选项创建带有进度条的通知。

通知需要持续更新以跟踪进度。确保使用 `tag` 来[替换](#replacing)现有通知。一旦进程完成，您可以通过发送进度值 `-1` 来删除进度条。

- progress - 当前进度值
- progress_max - 进度的最大值（默认为 `1`）
- progress_indeterminate - 设置为 `true` 使进度条不显示特定进度，而是显示连续动画（默认为 `false`）

```yaml
automation:
  - alias: 通知文件传输进度
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "文件传输"
          message: "文件传输进行中：6 / 32 MB"
          data:
            tag: file-transfer
            progress: 6
            progress_max: 32
```

### 实时更新 <span class='beta'>BETA</span> {#live-updates}

在 Android 16.0+ 上，您可以创建"实时更新"通知。这些通知固定在通知栏顶部，并显示在锁屏和常亮显示上。它们还将作为芯片显示在状态栏中，带有可选的短文本。这可能因制造商而异。

要使通知显示为"实时更新"通知，必须提供 `title`。

- `live_update` - 设置为 `true` 以显示为"实时更新"通知
- `critical_text` - 设置一个可选的短文本显示在状态栏芯片中
  - `live_update` 必须同时设置为 `true`
  - 如果状态栏中没有足够的空间显示文本，则只会显示图标
  - 如果使用 `chronometer` 参数，它将替换 `critical_text` 值

#### 基本配置

```yaml
automation:
  - alias: 通知实时更新
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "实时更新"
          message: "这将显示在常亮显示上"
          data:
            live_update: true
            critical_text: "42%"
```

这些截图显示通知在状态栏中的显示方式（带或不带关键文本）
![状态栏芯片](/companion-assets/android/live_updates_without_critical_text.png)
![使用关键文本时的状态栏芯片](/companion-assets/android/live_updates_with_critical_text.png)

#### 与进度、计时器、标签和图标组合的配置

```yaml
automation:
  - alias: 通知实时更新
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: 显示进度的示例通知
          message: 当前进度为 42%
          data:
            live_update: true
            chronometer: true
            when: 315
            when_relative: true
            progress: 42
            progress_max: 100
            tag: live_progress_notification
            notification_icon: mdi:progress-helper
```

此截图显示上述配置在常亮显示上的外观
![常亮显示上显示进度和计时器的示例通知](/companion-assets/android/live_updates_always_on_display.png)

### 仅警报一次

在 Android 上，您可以选择使通知仅在设备上警报一次。这意味着它只会在第一次发出声音、振动和/或闪烁 LED。虽然这不是 Android 的要求，但如果您没有设置 [`tag`](#replacing)，此功能将无法正常工作。此设置默认为 `false`，因为每个通知都会提醒用户。此功能使用 [Alert Once API](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setOnlyAlertOnce(boolean))

```yaml
  - alias: 通知一次
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "一次"
          message: "这只会在第一次提醒我"
          data:
            tag: "Alarm"
            alert_once: true
```

### 通知状态栏图标
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

在 Android 上，您还可以选择将通知状态栏图标更改为 [Material Design](https://materialdesignicons.com/) 上的任何图标。默认情况下，将显示 Home Assistant 图标。预期格式与 Home Assistant 中的相同 `mdi:cellphone`。如果您提供无效的图标名称，则不会显示图标。

```yaml
  - alias: 检查您的手机
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "手机图标"
          message: "这将在状态栏中显示手机图标"
          data:
            notification_icon: "mdi:cellphone"
```

### Android Auto 可见性

默认情况下，Home Assistant 通知不会显示在 Android Auto 界面中。通过添加 `car_ui: true`，通知将变得可见，并且从 Android Auto 打开它们将启动驾驶界面。有关通知在 Android Auto 中如何工作的更多详细信息，请[查看 Android Auto 文档](/companion/android-auto/index#notifications)。

```yaml
  - alias: 发送门未锁警报
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "门未锁"
          message: "所有人都离开了家，但门仍然未锁"
          data:
            car_ui: true
```

## iOS/macOS 专属

### 声音
默认情况下，收到通知时会播放默认通知声音（iOS 上为 Tri-tone）。有关可用声音以及如何添加自定义声音的详细信息，请参阅[声音文档](sounds.md)。可以通过在数据负载中将 `sound` 设置为 `none` 来禁用默认通知声音（Tri-tone）：

```yaml
automation:
  - alias: 发出一些噪音
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "叮咚"
          data:
            push:
              sound: none
```

### 徽章
您可以在负载中设置应用图标徽章。以下示例将使应用图标徽章显示 5：

```yaml
automation:
  - alias: "通知移动应用更新徽章"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "智能家居警报"
          message: "家里发生了一些事情！"
          data:
            push:
              badge: 5
```

通过将消息设置为 `delete_alert`，您可以在后台静默更新应用图标徽章，而无需向手机发送通知。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 2021.7 将在启动应用时自动将徽章重置为 0。您可以在 [配置](https://my.home-assistant.io/redirect/config/) > Companion App > 通知中控制此行为。

### 中断级别

在 iOS 15 上，您可以设置通知的中断级别，它有以下类型：

| 值 | 描述 | 覆盖专注模式 |
| -- | -- | -- |
| `passive` | 安静的通知，不唤醒屏幕 | 否 |
| `active` | 默认行为 | 否 |
| `time-sensitive` | 重要通知 | 是 |
| `critical` | [关键通知](critical.md) | 是，甚至静音 |

:::note <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 要求
`time-sensitive` 需要 iOS/macOS-2021.12 或更高版本。
:::

您可以在 [Apple 文档](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/notifications/) 中阅读有关这些级别的更多信息。

默认情况下，`time-sensitive` 通知将作为公告朗读。您可以在系统设置应用 > 通知 > 公告通知 > Home Assistant 中控制哪些通知被公告。

此级别在负载中设置。以下示例传递一个 `passive` 通知：

```yaml
automation:
  - alias: "通知移动应用香蕉状态"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "香蕉状态更新"
          message: "香蕉熟了。"
          data:
            push:
              interruption-level: passive
```

### 展示选项

默认情况下，如果通知到达时应用处于打开状态（在前台），它将显示与应用未活动（在后台）时相同的方式，带有显示通知内容的视觉警报、徽章更新（如果通知中发送了一个）和您选择的声音。您可以通过设置 `presentation_options` 字符串数组来控制应用在前台时如何显示通知。允许的值有 `alert`、`badge` 和 `sound`。

```yaml
automation:
  - alias: "通知移动应用展示"
    trigger:
      ...
    action:
      - action: notify.ALL_DEVICES
        data:
          message: "家里发生了一些事情！"
          data:
            presentation_options:
              - alert
              - badge
```

### 执行快捷方式

您可以在启动通知时执行快捷方式，并从结果中触发事件。请参阅 [Siri 快捷方式文档](/companion/integrations/siri-shortcuts.md#executing-a-shortcut-via-home-assistant-notifications)。