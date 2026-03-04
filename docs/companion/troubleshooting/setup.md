---
title: 故障排除
id: 'faqs'
---

以下是常见问题列表和解决这些问题的故障排除建议。如需更多支持，请[查看更多帮助页面](more-help.md)

## 应用在设置时崩溃

如果您运行的是 Home Assistant 0.110，并且应用在设置期间点击"继续"后崩溃，您需要为 `internal_url` 和 `external_url` 添加值。这可以通过用户界面在您的[常规设置](https://my.home-assistant.io/redirect/general/)中完成。如果您没有看到此部分，可能需要先从个人资料页面打开"高级模式"。如果这些字段被禁用，很可能是您的配置存储在 `configuration.yaml` 中，在这种情况下，在 `homeassistant:` 下添加条目，即：

```yaml
homeassistant:
  ...
  external_url: URL
  internal_url: URL
```

将 `URL` 替换为您用于访问 Home Assistant 实例的地址。`internal_url` 和 `external_url` 的值可以相同，并且应该与您在 `configuration.yaml` 的 `http:` 中的 `url:` 相同。

当您保存这些更改后，重启 Home Assistant，在 Home Assistant 完成重启后，重新打开应用。

## 我在 `dev-services` 面板中看不到我设备的 `notify.mobile_app` 操作
一旦您[设置](/companion/getting_started/index)了伴侣应用，您需要重启 Home Assistant 才能注册 `notify.mobile_app` 操作。在 iOS 上，如果您在设置期间授予了通知权限，将创建 `notify.mobile_app_<Device_ID>` 操作；在 Android 上，操作将在重启后出现。如果您看不到这个，请在 iOS 上[强制退出](https://support.apple.com/HT201330)或在 Android 上强制停止。然后重新启动伴侣应用，最后重启您的 Home Assistant 实例。该操作现在应该列在 `开发者工具 > 操作` 面板中。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 如果您在 iOS 上看不到该操作，请检查应用内的通知设置（向右滑动以显示侧边栏，然后点击"[设置](https://my.home-assistant.io/redirect/config/)"，然后点击"伴侣应用"，再点击"通知"）。如果"Push ID"框为空，请点击其下方的重置按钮。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 如果您在 Android 上仍然看不到该操作，请按照步骤[重新开始](#重新开始使用-android-应用)。

## 我有 `notify.mobile_app_<Device_ID>` 操作但没有收到通知
首先，检查您的消息负载是否有效。查看[通知文档](../notifications/basic.md)中的示例，或在 `开发者工具 > 服务` 页面上尝试向您的 `notify.mobile_app_<Device_ID>` 服务发送以下简单示例。
```json
{"message": "Hello World"}
```

如果此通知被送达，问题很可能出在您的负载上。

如果上述方法不起作用，请尝试以下操作：

1.  _检查您的消息限制：_ 为了让我们提供免费的通知服务，每个应用目标每天限制 500 条通知。[位置更新](/companion/notifications/commands#request-location-updates)和其他特殊通知不计入此限制。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 在 iOS 中，您可以在伴侣应用中检查剩余通知，方法是向右滑动打开侧边栏，点击"[设置](https://my.home-assistant.io/redirect/config/)"，然后点击"伴侣应用"再点击"通知"，滚动到页面底部。限制每天午夜 UTC 重置。

2.  _重置您的 Push ID 令牌：_ <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 如果您检查后仍有剩余通知，您可以在[设置](https://my.home-assistant.io/redirect/config/)的"伴侣应用"页面内的"通知"页面顶部重置您的通知。执行此操作后，您可能需要[强制退出](https://support.apple.com/HT201330) iOS 伴侣应用，然后重新打开应用，最后重启您的 Home Assistant 实例。

3.  _检查您的系统设置：_
    - <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 在 iOS 设置应用中，导航到通知，然后选择 Home Assistant，并确保"允许通知"已打开。
    - <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 在 Android 设置应用中，导航到应用，然后选择 Home Assistant，然后选择通知，并确保"所有 Home Assistant 通知"已打开。如果您只收到部分通知，请检查您使用的[通知渠道](/companion/notifications/basic)#notification-channels)是否已打开。

4. _重新开始使用 Android 应用：_ <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 如果您仍然无法在 Android 应用中收到通知，请尝试[重新开始](#重新开始使用-android-应用)。

## 我收到 SSL 错误和/或离家时无法连接到我的 Home Assistant 实例
这通常发生在您启用了 [Home Assistant Cloud](https://www.home-assistant.io/cloud/) 但没有打开[远程 UI](https://www.nabucasa.com/config/remote/) 时。要解决此问题，请启用[远程 UI](https://www.nabucasa.com/config/remote/)，或向右滑动打开侧边栏，点击"设置"，然后点击"伴侣应用"，在"设置"下点击"连接"。确保"通过云连接"旁边的开关已关闭，并在"外部 URL"字段中输入您的 Home Assistant 实例的远程地址。此地址必须是加密连接，有关设置到 Home Assistant 实例的加密远程连接的说明，请参阅 [Home Assistant 文档](https://www.home-assistant.io/docs/configuration/remote/)或[此使用 Duck DNS 设置 Let's Encrypt 的指南](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/)。

如果您根本没有设置 [Home Assistant Cloud](https://www.home-assistant.io/cloud/)，问题很可能是远程连接不安全。伴侣应用需要加密连接来进行远程连接。请参阅 [Home Assistant 文档](https://www.home-assistant.io/docs/configuration/remote/)或[此使用 Duck DNS 设置 Let's Encrypt 的指南](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/)以获取设置安全连接的说明。

## Home Assistant 中的某些功能在桌面上的工作方式不同
这可能不是伴侣应用的问题，而更可能是 Home Assistant 或表现异常的特定组件的问题。要测试原因，请尝试以下步骤。

1.  首先，在 iOS 伴侣应用中向下滑动以刷新您的视图。在 Android 应用中强制停止应用程序并重新启动它。
2.  如果问题仍然存在，在 Safari/Chrome 浏览器中打开您的 Home Assistant 实例（您可能需要登录）。如果问题在 Safari/Chrome 中存在，请在 [Home Assistant 前端 GitHub](https://github.com/home-assistant/frontend/issues) 或如果是自定义组件，与该组件的开发者提出问题。在您的问题报告中，说明问题在移动浏览器上查看时存在，不一定是伴侣应用。
3.  如果问题在 Safari 中没有发生，请在 [iOS 伴侣应用 GitHub](https://github.com/home-assistant/iOS/issues) 或 [Android 伴侣应用 GitHub](https://github.com/home-assistant/android/issues) 提出问题。请说明您遵循了这些步骤，问题只发生在伴侣应用中。

## 状态栏（顶部带有手机/Wi-Fi 信号强度的栏）与我的主题不匹配
如果您使用的是 2020.2 之前的 iOS 应用或 Android 应用，要将状态栏的颜色更改为与您的 Home Assistant 主题匹配，请使用 [`frontend.set_theme`](https://www.home-assistant.io/components/frontend/#theme-automation) 操作而不是 Home Assistant 个人资料页面中的下拉菜单。使用该操作将生成一个事件，允许伴侣应用检测主题更改并将正确的颜色应用于状态栏。有关使用哪些键的详细信息，请参阅[主题](../integrations/theming.md)文档。请注意，颜色必须在您的主题中指定为十六进制值（例如 `#0099ff`），不支持通过变量名指定元素颜色。

## 我在多个设备上运行伴侣应用，`sensor` 名称太相似且令人困惑，我该怎么办？
从 Home Assistant Core 0.106 开始，默认传感器名称将在 iOS 设置应用或 Android 伴侣应用配置页面中设置您的设备名称注册。目前，您需要按照以下步骤从 Home Assistant 配置页面的[集成仪表板](https://my.home-assistant.io/redirect/integrations/)中重命名每个传感器。

1.  转到配置中的[集成仪表板](https://my.home-assistant.io/redirect/integrations/)。
2.  找到与您希望重命名传感器的设备对应的"移动应用：_设备名称_"集成并打开它
3.  对于您希望重命名的每个传感器，点击或点击传感器名称，然后点击齿轮符号。
4.  在"实体 ID"下，根据需要更改实体 ID。**不要**更改 ID 的 `sensor.` 或 `device_tracker.` 部分
5.  对您希望重命名的每个传感器重复步骤 4 和 5

## 下拉手动刷新应用/更新位置时出现 `kCLError`

要解决此问题，请在 iOS 设置 > 隐私 > 位置服务中将 Home Assistant 应用的位置权限更改为"始终"。

## 人员实体未更新最近位置

如果您使用的是 `person` 实体而不是提供的 `device_tracker` 实体，您有时可能会注意到 `person` 实体状态没有按您的预期更新。默认情况下，您使用应用登录的任何新设备都将作为跟踪器添加到登录的人员中，这可能会导致此问题。您可以按照以下步骤检查 `person` 实体：

1.  转到[人员](https://my.home-assistant.io/redirect/people/)
2.  选择有跟踪器问题的人员
3.  查看属于此人员的设备
4.  移除任何位于家中或不再使用的设备。在此列表中只保留与您一起出行的设备。
5.  保存更改

## 重新开始使用 Android 应用
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 有时您可能需要重新开始使用 Android 应用，因为新功能可能无法正常工作或出现一些奇怪的情况。请确保精确遵循每一步，不要跳过任何内容。

:::info
并非所有但有些问题可以通过简单地从应用注销并重新登录来解决。如果您在服务器中设置了[受信任的网络](https://www.home-assistant.io/docs/authentication/providers/#trusted-networks)，请确保输入您的凭据登录应用，以便应用在不在受信任网络时仍能继续工作。如果您尝试注销并重新登录后问题仍然存在，请继续执行以下步骤。
:::

1.  检查 Home Assistant Core、[Android 应用](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android)和 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) 是否都是最新的。
2.  清除 Android 应用中的存储或应用数据。不要假设卸载和重新安装是安全的，因为这会触发自动备份，而我们要避免这种情况。
3.  在 Home Assistant 中导航到[集成仪表板](https://my.home-assistant.io/redirect/integrations/)。移除相关设备的移动应用条目。如果您看到超过 1 个，请全部移除。
4.  重启 Home Assistant。
5.  重新登录 Android 应用。如果您有超过 1 个设备，请确保在入门期间重命名设备。记得使用您的凭据而不是受信任网络登录。


## Android 应用中设备跟踪器未更新
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 如果您发现设备跟踪器没有按您的预期更新，请按照以下步骤确保最佳设置。

1.  确保您的设备和服务器满足位置跟踪的先决条件：
    - 为您的服务器启用[远程访问](https://www.home-assistant.io/docs/configuration/remote/)。
    - 在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理传感器中，启用以下**位置传感器**：后台位置、位置区域和单次精确位置。
      - 如果您使用多个服务器，请确保每个传感器在正确的服务器上已启用。
    - 如果您不是从 Play 商店安装的应用，请验证您使用的是[`full` 版本](../core/android-flavors.md)。
    - 如果您使用 `person` 实体进行跟踪，请仔细检查它是否[设置正确](#人员实体未更新最近位置)。
2.  确保应用已授予位置权限，始终允许。（在 Android 12 及更新版本上，提示时允许精确位置）
3.  确保设备上已启用位置（GPS）。
4.  允许后台访问并为应用关闭"电池优化"。
    - 您可以在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中检查后台访问。设置应显示勾号 ✔️。
    - 某些制造商可能会添加额外的电池节省功能（例如：省电模式），请确保也禁用所有这些功能。您通常可以从系统设置应用访问这些功能。
5.  为应用开启无限制数据。
    - 如果数据节省模式开启，Home Assistant 可能无法正确发送/接收数据。

有时上述步骤仍然不会导致位置更新到达您的服务器。应用可能会收到大量位置更新并跳过其中一些。要确定原因，请查看应用位置历史日志。

转到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 故障排除 > 位置跟踪并启用位置历史。应用现在将保留过去 48 小时内收到的所有位置更新的日志。

 - 每次更新将显示来源（例如，"后台位置"）和结果（例如，"已发送"）。应用在发送之前会验证位置是否有效，更新可能会由于时间、准确性、重复或其他原因而被跳过。
 - 应用应该每小时多次接收更新。如果您在启用历史记录后没有看到更新，请确保遵循前面提到的步骤。没有位置历史通常是由于 Home Assistant 应用的后台访问受限，或 Android 系统杀死了应用。
 - 如果由于准确性而跳过多次更新，请检查 GPS 坐标以确保它们正确，并考虑增加[准确性的传感器设置](../core/location.md#location-sensor-settings)。例如，如果您看到有效位置被跳过，准确性约为 `350`，则将最小准确性设置设为 `400` 作为缓冲。较大的值也可能导致不一致的结果，因此以日志中的有效报告为准。

<details>
<summary>手动审查步骤</summary>

您还可以使用[崩溃日志](#android-crash-logs)手动查看位置历史以确定发生了什么。这些日志包含更多详细信息，但仅在应用打开时保留。整个位置决策过程都会打印到日志中，以帮助您了解正在发生的事情。当您查看日志时，请注意包含 `LocBroadcastReceiver` 的行以跟踪决策。请记住，您需要大约 10 分钟的日志，因此您可能需要在问题发生时保持应用打开以生成更长的日志。

下面是一个您可以期望看到的示例，以确保位置更新传到手机。应用在将其发送回去之前会验证位置是否有效。这些是收到重复位置时您可以期望看到的日志。如果自上次更新发送以来位置没有更改 15 分钟，应用将不会向服务器发送相同的位置更新。

```
2021-02-03 09:03:00.900 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 4.663
    Bearing: 86.759346
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Received location that is 74 milliseconds old, 1612371780829 compared to 1612371780903 with source fused
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Duplicate location received, not sending to HA
```

下面您将找到成功位置结果的预期日志。如果您没有看到这样的行，请确保遵循前面提到的步骤。

```
2021-02-03 09:06:34.241 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 13.279
    Bearing: 0.0
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Received location that is 1126 milliseconds old, 1612371993119 compared to 1612371994245 with source fused
2021-02-03 09:06:34.309 7306-7430/? D/LocBroadcastReceiver: Location update sent successfully
```

日志将指示报告是否由于时间、准确性、重复或其他原因而被跳过。
</details>

如果您在遵循上述步骤后仍然没有收到位置更新，并认为这不正确，请提交 GitHub [问题](https://github.com/home-assistant/android/issues/new?assignees=&labels=bug&template=Bug_report.md&title=)。如果可能，请附上此故障排除步骤的至少 10 分钟日志，以便其他人更容易帮助您（可能会被请求）。

## 在 Android 上使用自签名证书导致空白页面
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 如果您在 Android 上使用自签名证书，那么在输入和/或选择您的 Home Assistant 实例后，您可能会卡在空白屏幕上。要解决此问题，您需要确保 URL 有效，并将证书导入到 Android 的受信任证书中。执行此操作的步骤可以在[这里](https://support.google.com/nexus/answer/2844832?hl=en)找到。这些步骤是为 Android 9+ 的设备编写的，但对于较旧的受支持设备非常接近。

## Android 小部件不工作
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 如果您发现小部件不再工作，这些步骤可能会帮助您解决问题。

1.  检查设备上的数据节省模式是否已禁用，小部件在启用时将不工作。
2.  检查 Home Assistant 应用的后台数据是否已启用。
3.  移除并重新创建小部件。

## 通知操作太相似或在 Android 中不显示
如果您有超过 1 台相同型号的设备，并且登录后在伴侣应用配置中没有重命名您的设备，那么您可能会有冲突。

1.  在侧边栏中导航到[设置](https://my.home-assistant.io/redirect/config/)。
2.  点击"伴侣应用"
3.  在设备注册下更改设备名称。
4.  重启 Home Assistant 以注册新的通知操作。（即 `notify.mobile_app_<device_name>`）

## 传感器缺失或未更新
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 当应用不在前台时，传感器更新与位置更新绑定，因此您需要确保在 iOS 设置中将位置权限设置为"始终允许"。

应用也会尝试在后台发送更新，但是这些更新的频率由 iOS 决定，并且为了保护电池寿命而受到严格限制。iOS 使用一个内部指标（对应用开发者不可见）来优先处理应用的后台活动。您更多使用的应用将被允许更频繁地在后台做更多事情，这意味着您越多使用伴侣应用，iOS 将学习到该应用对您很重要，并允许通过后台获取更频繁地更新。

如果您想确保在设备开始充电或电池电量低于或高于某个限制时更新传感器，最可靠的方法是在 iOS 的[快捷指令](/companion/integrations/siri-shortcuts)应用中使用自动化。将"When"部分设置为所需条件，在"Do"部分选择 Home Assistant 的"更新传感器"操作。您很可能想要关闭"运行前询问"以避免在发送更新之前被提示。由于 iOS 的限制，当这些更新发送时，您将始终看到来自快捷指令应用的通知。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 在 Android 上，传感器会在有更新时显示。有些会在启用后立即显示，其他的会在授予权限并检索状态后显示。如果您没有看到传感器，您可能需要等待传感器获取状态更新，以便它可以将其发送到您的 Home Assistant 服务器。

## 文本转语音通知不工作
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 检查[语音识别与合成](https://play.google.com/store/apps/details?id=com.google.android.tts)是否已更新。检查它是否也设置为默认的文本转语音引擎，这可能是某些制造商所要求的。

## Android 崩溃日志
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用使用 Google 的 ADB [Logcat](https://developer.android.com/studio/command-line/logcat) 功能来记录错误。有时您可能希望检查日志，或者开发者可能会要求提供崩溃日志以解决您的问题。在[设置](https://my.home-assistant.io/redirect/config/)伴侣应用 > 故障排除 > 显示和分享日志下有一个选项。此功能使刷新、分享和查看日志变得更加容易。然后，当您想要创建[问题](https://github.com/home-assistant/android/issues/new?assignees=&labels=bug&template=Bug_report.md&title=)或当开发者要求它们来解决问题时，可以使用这些日志。需要注意的是，设备日志可能包含也可能不包含敏感信息，如您的 Home Assistant URL，因此在分享之前确保删除敏感信息。

## Android 应用电池消耗
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用提供许多功能，其中一些可能比其他功能消耗更多电池。应用上的默认设置力求使应用尽可能省电。可能会出现您启用某个功能导致比预期更多电池消耗的情况。本节将列出在您决定[重新开始](#重新开始使用-android-应用)之前需要在应用程序上检查的所有内容。对于以下选项，您需要转到伴侣应用设置逐个检查并禁用它们。

1.  如果在完整版上，检查高精度模式是否没有一直启用。
2.  如果在完整版上，检查单次精确位置传感器是否没有启用"包含在传感器更新中"选项。
3.  检查持久连接是否设置为"从不"。
4.  如果蓝牙发射器传感器已启用，检查发射器是否没有一直开启，只在您希望使用时启用它。
5.  检查传感器更新频率是否设置为"正常"。
6.  检查没有任何通知传感器在其各自的设置中禁用允许列表。您总是希望定义一个允许列表以防止严重的电池使用。
7.  如果您的默认仪表板包含任何类型的直播流，请尝试移除或将默认仪表板替换为没有直播流的仪表板。