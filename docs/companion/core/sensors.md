---
title: "传感器"
id: 'sensors'
---

除了提供[位置服务](location.md)外，Companion 应用还向 Home Assistant 添加了多个额外的传感器。如果您不想要 `device_tracker` 实体但仍想让传感器更新，只需在[实体注册表](https://www.home-assistant.io/integrations/config/#entity-registry)中禁用该实体即可停止位置更新并保持传感器更新。

Companion 应用提供的传感器取决于您使用的应用，请参阅下面的列表。

## 多服务器支持

如果多个服务器连接到 Companion 应用，您可以配置是否针对每个服务器发送传感器数据。目前传感器设置对于所有连接的服务器都是通用的。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 在 [设置](https://my.home-assistant.io/redirect/config/) > Companion App 中，打开服务器设置并在隐私下更改传感器发送设置。可用选项：

- **全部** 发送所有已启用的传感器。
- **无** 不发送任何传感器。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 在 [设置](https://my.home-assistant.io/redirect/config/) > Companion App 中，前往管理传感器并选择您要管理的传感器。点击屏幕顶部的展开/折叠图标可更改特定服务器的设置。

## iOS 和 macOS 传感器

### 传感器何时更新

在 iOS 上，传感器在有限的情况下更新：当您的位置发生变化时、应用在前台运行时定期更新、下拉刷新网页视图时、在后台以 iOS 确定的速率更新时，以及执行"更新传感器"或通过"发送位置"快捷方式或推送通知时。当 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 2022.6 或更高版本中启用并可用 <a href="/docs/notifications/notification-local">本地推送</a> 时，也将执行定期更新。

在 macOS 上，传感器在上述相同情况下以及某些传感器发生变化时立即更新。

### <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 从 2025.5 起
并非所有 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 传感器都默认启用。如果您在 Home Assistant 中看不到您的传感器，请前往 **Companion App 设置** > **传感器**，并手动启用它。

### 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `sensor.battery_level` | 无 | 设备的当前电池电量。 |
| `sensor.battery_state` | `低电量模式` | 设备的当前充电状态（`充电中`、`未充电` 或 `已充满`）。 |
| `sensor.bssid` | 无 | 您手机连接的无线接入点的 MAC 地址。当不在 Wi-Fi 上时，此传感器将报告 `未连接`。 |
| `sensor.connection_type` | iOS: `蜂窝网络技术`<br />macOS: `名称`, `硬件地址` | 设备正在使用的当前数据连接。在 macOS 上，这需要应用版本 2021.2 或更高版本。 |
| `binary_sensor.focus` | 无 | 专注模式当前是否启用。需要 iOS-2021.10 或更高版本，今年晚些时候的 macOS 12 更新。如果 Home Assistant 在"允许的通知"列表中，则不会工作，详见[中断级别](../notifications/basic.md#interruption-level)。 |
| `sensor.geocoded_location` | [见下文](#geocoded-location-sensor) | 基于 GPS 数据计算的地址。 |
| `sensor.last_update_trigger` | 无 | 从设备到 Home Assistant 的位置和传感器数据最后更新的原因 |
| `sensor.ssid` | 无 | 设备当前连接的 Wi-Fi 网络的人类可读名称。当不在 Wi-Fi 上时，此传感器将报告 `未连接`。 |
| `sensor.storage` | [见下文](#storage-sensor) | 设备上的总存储量和可用存储量。 |

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />专属传感器

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `sensor.activity` | `confidence`, `types` | iOS 计算的当前活动类型。需要启用运动权限。 |
| `sensor.app_version` | 无 | 当前的 **Home Assistant iOS 版 Companion App** 应用版本。 |
| `sensor.average_active_pace` | 无 | iOS 从计步器数据计算的平均配速。单位：米每秒，m/s |
| `sensor.distance` | 无 | 自当地午夜以来用户步行的估计距离。单位：米，m |
| `sensor.floors_ascended` | 无 | 自当地午夜以来步行上楼的近似楼层数。 |
| `sensor.floors_descended` | 无 | 步行下楼的近似楼层数。 |
| `sensor.location_permission` | 无 | 用户选择的位置权限。可以通过位置权限弹窗设置或在 iOS 设置中修改。 |
| `sensor.sim_1` | [见下文](#cellular-provider-sensor) | 您的蜂窝运营商名称。 |
| `sensor.sim_2` | [见下文](#cellular-provider-sensor) | 您的蜂窝运营商名称。 |
| `sensor.steps` | 无 | 用户走的步数。 |
| `sensor.watch_battery_level` | 无 | 1 个配对 Apple Watch 的电池电量。需要在您的表盘上安装任何 Home Assistant 复杂功能。 |
| `sensor.watch_battery_state` | 无 | 1 个配对 Apple Watch 的当前充电状态（充电中、未充电或已充满）。需要在您的表盘上安装任何 Home Assistant 复杂功能。 |

<img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" />专属传感器

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `binary_sensor.active` | [见下文](#active-sensor) | 设备是否正在被主动使用。 |
| `sensor.active_camera` | `全部`, `活动` | 活动摄像头的名称，如果未使用则为 `非活动`。 |
| `sensor.active_audio_input` | `全部`, `活动` | 活动音频输入（麦克风）的名称，如果未使用则为 `非活动`。 |
| `sensor.active_audio_output` | `全部`, `活动` | 需要应用版本 2021.12 或更高版本。活动音频输出（扬声器）的名称，如果未使用则为 `非活动`。 |
| `sensor.frontmost_app` | [见下文](#frontmost-app-sensor) | 需要应用版本 2021.2 或更高版本。当前最前端应用的名称。 |
| `binary_sensor.camera_in_use` | 无 | 系统上的摄像头当前是否正在使用。 |
| `binary_sensor.audio_input_in_use` | 无 | 系统上的音频输入（麦克风）当前是否正在使用。 |
| `binary_sensor.audio_output_in_use` | 无 | 需要应用版本 2021.12 或更高版本。系统上的音频输出（扬声器）当前是否正在使用。 |
| `sensor.displays` | `显示器 ID`, `显示器名称` | 需要应用版本 2021.2 或更高版本。连接到设备的显示器数量。 |
| `sensor.primary_display_id` | 无 | 需要应用版本 2021.2 或更高版本。当前主显示器的 ID，即带有菜单栏的显示器。格式为 UUID，例如 `BE82E2E6-EA40-4963-93AD-A0BDC9D2F18F`。 |
| `sensor.primary_display_name` | 无 | 需要应用版本 2021.2 或更高版本。当前主显示器的名称，即带有菜单栏的显示器。 |

可以通过模板访问 `蜂窝网络技术` 等属性：

```
{{ states.sensor.connection_type.attributes['Cellular Technology'] }}
```

## Android 传感器

下面的每个 <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 传感器都可以通过导航到 [设置](https://my.home-assistant.io/redirect/config/) > Companion App > 管理传感器来启用。默认情况下，大多数传感器都是禁用的，除了 `battery_level`、`battery_state`、`charger_type` 以及在引导过程中获得权限的传感器。启用后，传感器将开始向您的 Home Assistant 服务器发送数据，如果您稍后选择禁用它，传感器将停止更新。启用传感器时，如果需要，应用将请求权限。如果您没有在下面看到列出的传感器，则您的设备不支持它。下面的某些传感器为其各自的需求提供自定义设置，请阅读每个传感器的说明以了解其提供的功能。这些设置可以在启用传感器的同一位置找到。

### 传感器如何更新

所有传感器在 15 分钟的定期间隔期间更新，如果满足某些其他条件，它们也会更新。阅读下面每个传感器的说明以了解预期更新的频率。在 15 分钟更新间隔期间，会临时创建一个低优先级前台通知，以防止 Android 系统停止工作器。除非用户安装了拦截通知并决定发出声音的第三方应用，否则此通知不会发出声音。如果您使用的是 Android 8.0+，您可以自由地最小化和/或关闭 `SensorWorker` 的通知渠道。

您可以通过导航到 [设置](https://my.home-assistant.io/redirect/config/) > Companion App > 传感器更新频率来更改传感器更新的频率。您可以选择正常、充电时快速或始终快速。正常是上一段中提到的默认设置。设置为始终快速时，更新将每分钟进行一次。设置为充电时快速时，只有在设备充电时才会每分钟更新一次，否则将使用默认间隔。更改此选项后，您需要重启应用。

### 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `binary_sensor.doze` | [见下文](#doze-sensor) | 设备是否处于打盹模式。 |
| `binary_sensor.interactive` | 无 | 设备是否处于交互状态。 |
| `binary_sensor.nfc_state` | 无 | 设备是否启用了 NFC 传感器。 |
| `binary_sensor.power_save` | 无 | 设备是否处于省电模式。 |
| [活动传感器](#activity-sensors) | 见下文 | Google 计算的当前活动类型、睡眠置信度和睡眠片段。在支持的设备上需要活动识别权限。 |
| `binary_sensor.android_auto` | [见下文](#android-auto) | 一个二进制传感器，用于指示设备是否连接到 Android Auto。 |
| [Android OS 传感器](#android-os-sensors) | 无 | 关于 Android OS 的几个不同传感器。 |
| [应用数据传感器](#app-data-sensors) | 无 | 显示应用发送或接收了多少数据的传感器。 |
| [应用重要性传感器](#app-importance-sensor) | 无 | 应用的当前重要性，以确定它是在前台还是缓存中。 |
| `sensor.app_memory` | [见下文](#app-memory-sensor) | 关于应用可用内存的信息。 |
| [应用使用传感器](#app-usage-sensors) | 无 | 表示根据使用情况如何对待应用的传感器。 |
| [音频传感器](#audio-sensors) | 无 | 关于设备不同类型音频检测的几个不同传感器。 |
| [电池传感器](#battery-sensors) | 无 | 关于设备电池状态的几个不同传感器。 |
| [蓝牙传感器](#bluetooth-sensors) | [见下文](#bluetooth-sensors) | 关于设备蓝牙状态的几个不同传感器。还有用于信标传输和监控的传感器。 |
| [汽车传感器](#car-sensors) | [见下文](#car-sensors) | 关于汽车状态的几个不同传感器。 |
| `sensor.current_time_zone` | [见下文](#current-time-zone-sensor) | 设备所在的当前时区。 |
| `sensor.current_version` | 无 | 应用当前安装的版本。 |
| [显示传感器](#display-sensors)| [见下文](#display-sensors) | 关于设备显示器状态的几个传感器。 |
| [动态颜色](#dynamic-color-sensor) | RGB 颜色 | 当前设备主题中使用的强调色的十六进制颜色值。 |
| `sensor.do_not_disturb` | 无 | 设备上的免打扰状态。 |
| `sensor.geocoded_location` | [见下文](#geocoded-location-sensor) | 基于 GPS 数据计算的地址。 |
| [Health Connect 传感器](#health-connect-sensors) | 多种 | 存储在您设备的 Health Connect 中由其他应用提供的健康和健身数据。 |
| `binary_sensor.high_accuracy_mode` | 无 | 设备上高精度模式的状态。 |
| `sensor.high_accuracy_update_interval` | 无 | 设备上高精度模式的更新间隔。 |
| [Keyguard 传感器](#keyguard-sensors) | 无 | 表示设备锁定或安全各种状态的传感器。 |
| `sensor.last_reboot` | [见下文](#last-reboot-sensor) | 设备上次重启的时间戳。 |
| `sensor.last_update` | 无 | 状态将反映导致最后更新发送的意图。 |
| `sensor.last_used_app` | 无 | 设备上最后使用的应用。 |
| `sensor.light` | 无 | 设备检测到的当前照度级别。 |
| [移动数据传感器](#mobile-data-sensors) | 无 | 关于移动数据状态的几个不同传感器。 |
| `sensor.next_alarm` | [见下文](#next-alarm-sensor) | 下一个计划闹钟的日期。 |
| [通知传感器](#notification-sensors) | 见下文 | 设备上通知的详细信息。 |
| [电话传感器](#phone-sensors) | 无 | 表示电话调制解调器不同状态的传感器。 |
| `sensor.pressure` | 无 | 设备的压力读数。 |
| `sensor.proximity` | 无 | 设备的当前接近读数，某些设备只会显示 `近` 或 `远` 的布尔值。 |
| `sensor.public_ip` | 无 | 由 ipify API 生成的设备的公共 IP 地址。 |
| `sensor.sim_1` | [见下文](#cellular-provider-sensor) | 您的蜂窝运营商名称。 |
| `sensor.sim_2` | [见下文](#cellular-provider-sensor) | 您的蜂窝运营商名称。 |
| `sensor.steps` | 无 | 自上次设备重启以来用户的步数。在支持的设备上需要活动识别权限。 |
| [存储传感器](#storage-sensor) | [见下文](#storage-sensor) | Android 设备上内部和外部存储的总量和可用量。 |
| [流量统计传感器](#traffic-stats-sensor) | 无 | 自上次重启以来移动设备和总设备使用传输和接收的数据量。 |
| [WiFi 传感器](#connection-type-sensor) | 无 | 关于 WiFi 状态的几个不同传感器。 |
| [工作配置文件](#work-profile-sensor) | 无 | 设备上的工作配置文件当前是否处于活动状态。 |

## 活动传感器
<img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /> `sensor.active` 提供设备当前是否正在被使用，基于几个不同的输入，这些输入作为属性提供以供参考。

| 属性 | 描述 |
| --------- | --------- |
| `Idle` | 当机器不是以下任何属性，但输入设备在几分钟内未被使用时为 `true`。 |
| `Screensaver` | 当屏幕保护程序开始播放以变为非活动状态时为 `true` |
| `Locked` | 当设备显示登录屏幕时为 `true` |
| `Screen Off` | 当屏幕已关闭时为 `true` |
| `Fast User Switched` | 当切换到另一个用户时为 `true` |
| `Sleeping` | 当设备正在睡眠时为 `true` |
| `Terminating` | 当应用退出可用时为 `true`。需要应用版本 2021.2 或更高版本。 |

此传感器有一个设置来决定被视为"空闲"的持续时间。

## 活动传感器
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> `sensor.activity` 提供 iOS 计算的当前运动活动以及计算的置信度。iOS 已知并由 `sensor.activity` 提供的活动有：
*   `Stationary`（静止）
*   `Walking`（步行）
*   `Running`（跑步）
*   `Automotive`（乘车）
*   `Cycling`（骑行）

如果 iOS 无法从运动数据计算活动，将给出 `Unknown`（未知）。

可能返回多个活动，例如 `Cycling` 和 `Stationary`（如果您正在骑行但在红灯处停车），传感器的状态只是 iOS 返回的第一个（不一定是最可能的）。完整的计算活动列表由 `types` 属性给出。有关不同场景如何产生多个活动的描述，请参阅 [nshipster](https://nshipster.com/) 上 [@Mattt](https://x.com/mattt) 的[这篇文章](https://nshipster.com/cmmotionactivity/#traveling-without-moving)。

`confidence` 属性对应 iOS 对当前活动报告准确程度的判断。可能的值有：
*   `Low`（低）
*   `Medium`（中）
*   `High`（高）

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 此传感器仅在 Google Play 商店中找到的 Android 应用完整版本上可用，最小版本不可用。对于 Android，用户将有一组不同的状态：
*   `in_vehicle`（在车辆中）
*   `on_bicycle`（在自行车上）
*   `on_foot`（步行）
*   `running`（跑步）
*   `still`（静止）
*   `tilting`（倾斜）
*   `walking`（步行）
*   `unknown`（未知）

状态的属性将反映来自 [Activity Recognition API](https://developers.google.com/location-context/activity-recognition) 的 `confidence` 评级。此传感器需要 [Activity Recognition 权限](https://developer.android.com/reference/android/Manifest.permission#ACTIVITY_RECOGNITION)。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
睡眠置信度和睡眠片段传感器利用 Google 服务的新的 [Sleep API](https://developers.google.com/location-context/sleep)。睡眠片段大约每天更新一次，睡眠置信度大约每 10 分钟更新一次。所有数据由 Google 提供。

## Android Auto
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
此传感器用于确定设备是否连接到 Android Auto。属性将返回特定的连接类型。

## Android OS 传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
关于 Android OS 构建的几个不同传感器。这些传感器使用 [android.os.Build](https://developer.android.com/reference/android/os/Build)。

| 传感器                      | 描述                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------------|
| `android_os_version`        | Android OS 版本（例如 13）。                                                              |
| `android_os_security_patch` | Android OS 安全补丁（例如 2023-03-05）。 |

## 应用数据传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
这些传感器将表示自上次设备重启以来 Home Assistant Android 应用传输和接收了多少数据。这些传感器使用 [Traffic Stats API](https://developer.android.com/reference/kotlin/android/net/TrafficStats)。


## 应用重要性传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
此传感器将表示应用的状态，以反映它是在 `foreground`（前台）、`service`（服务）还是其他任何状态。每当任何其他传感器有更新时，此传感器都会更新。请参阅 [ActivityManager](https://developer.android.com/reference/android/app/ActivityManager.RunningAppProcessInfo) 中的所有重要性变量以了解它们的含义。

可能的状态有：

*   `cached`（缓存）
*   `cant_save_state`（无法保存状态）
*   `foreground`（前台）
*   `foreground_service`（前台服务）
*   `gone`（已消失）
*   `not_running`（未运行）
*   `perceptible`（可感知）
*   `service`（服务）
*   `top_sleeping`（顶部睡眠）
*   `visible`（可见）


## 应用内存传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
此传感器将表示应用正在使用多少内存。属性将包括应用有多少可用内存。此传感器使用 [Runtime API](https://developer.android.com/reference/java/lang/Runtime)。


## 应用使用传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
这些传感器将表示 Android 系统如何根据使用情况对待应用。有一个二进制传感器 `app_inactive`，它将报告系统当前是否认为应用处于非活动状态。另一个传感器 `app_standby_bucket` 将反映 Android 系统为应用考虑的当前待机桶。待机桶决定应用在运行后台任务（如作业和闹钟）时受到多少限制。这两个传感器都使用 [UsageStatsManager API](https://developer.android.com/reference/android/app/usage/UsageStatsManager)。

`app_standby_bucket` 传感器的可能状态（请参阅上面链接的 API 以获取其定义）：

*   `active`（活动）
*   `frequent`（频繁）
*   `rare`（稀有）
*   `restricted`（受限）
*   `working_set`（工作集）
*   `never`（从不）


## 音频传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <br />
这些传感器使用 [AudioManager API](https://developer.android.com/reference/kotlin/android/media/AudioManager?hl=en) 来检索它们的状态。查看下表以了解有关每个传感器的更多信息，包括它们更新的频率。

| 传感器 | 属性 | 描述 |
| --------- | --------- | --------- |
| `audio_mode` | 无 | 设备的当前音频模式可以是：`normal`、`ringing`（与[电话传感器](#phone-state-sensor)相同）、`call_redirect`、`communication_redirect`、`in_call`、`in_communication` 或 `unknown`。此传感器将在正常间隔期间更新。 |
| `is_headphones` | 无 | 如果插入耳机或耳机则为布尔值，一旦设备检测到变化就会更新。 |
| `is_mic_muted` | 无 | 如果麦克风当前静音则为布尔值，Android 10+ 将随着此值的变化而更新。 |
| `is_music_active` | 无 | 如果设备正在主动播放音乐则为布尔值，此传感器将在正常间隔期间更新。 |
| `is_speakerphone_on` | 无 | 如果设备扬声器已启用则为布尔值，Android 10+ 将随着此值的变化而更新。 |
| `ringer_mode` | 无 | 设备上的铃音模式，可能的值为 `normal`、`vibrate` 或 `silent`。此传感器将在铃音模式变化时立即更新。<br />在 Android 9 及更高版本上，当免打扰开启时，铃音模式始终为 `silent`。 |
| [`volume_level_*`](#volume-levels) | [见下文](#volume-levels) | 给定音量流的当前设备音量级别。 |

### 音量级别

给定音量流（`volume_level_*`）的当前设备音量级别。这些传感器将在正常间隔期间更新，或在检测到变化时立即更新。

可能的音量流有：
* `accessibility`（无障碍）
* `alarm`（闹钟）
* `call`（通话）
* `dtmf`
* `music`（音乐）
* `notification`（通知）
* `ring`（铃声）
* `system`（系统）

<span class='beta'>BETA</span> 属性指示最小和最大值。

| 属性 | 描述 |
| --------- | --------- |
| `min` | 提供音量级别的最小值。通常这是 `0`，但根据 Android 版本和设备制造商也可能不同。 |
| `max` | 提供音量级别的最大值。此值因 Android 版本和设备制造商而异。 |

## 电池传感器
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> <br />
电池状态传感器（`sensor.battery_state`）提供有关设备电池当前状态的信息。当设备充电 100% 时，三个可能的值是 `Charging`（充电中）、`Not Charging`（未充电）或 `Full`（已充满）。电池电量传感器（`sensor.battery_level`）报告设备从 0–100% 的当前电池电量。电量级别反映在传感器图标中。此外还有一个"低电量模式"属性，根据您的 iOS 设备是否处于[低电量模式](https://support.apple.com/en-us/HT205234)，报告 `true` 或 `false`。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
下面列出的电池传感器描述了电池在几个不同数据点的状态。传感器的图标反映充电状态和正在使用的充电类型。当设备连接或断开充电器时，`battery_state`、`charger_type` 和 `is_charging` 传感器将更新。当任何其他传感器更新时，以及当设备报告低电量或从低电量警报恢复时，`battery_health`、`battery_level`、`battery_power` 和 `battery_temperature` 传感器都会更新。所有这些传感器都使用 [BatteryManager](https://developer.android.com/reference/android/os/BatteryManager)。

| 传感器 | 描述 |
| --------- | --------- |
| `battery_cycle_count` | 电池完成的充电周期数。需要 Android 14 或更新版本。注意：并非所有设备都会报告或更新周期计数。 |
| `battery_health` | 电池的健康状况 |
| `battery_level` | 剩余电池百分比 |
| `battery_power` | 设备上的当前瓦数 |
| `battery_state` | 设备上的充电状态 |
| `battery_temperature` | 当前电池温度 |
| `charger_type` | 设备上正在使用的充电器类型 |
| `is_charging` | 设备是否正在主动充电 |
| `remaining_charge_time` | 计算的剩余充电时间（分钟）。如果无法计算时间则返回 `unavailable`：要么没有足够的当前数据来做出决定，要么电池当前正在放电。如果计算未完成但设备当前正在充电则返回 `0`。需要 Android 9 或更新版本。 |

:::info
`battery_power` 传感器将设备返回的值转换为安培和伏特。但是，某些设备不遵循 Android 文档，可能以不同的单位返回值，这会导致传感器不正确。对于这些设备，您可能需要调整传感器设置中的"电池电流除数"以正确将 `current` 转换为安培，或调整"电池电压除数"以正确将 `voltage` 转换为伏特。

电池电流除数的常见值：1000000（默认，微安）、1000（毫安）、1000000000（纳安）

电池电压除数的常见值：1000（默认，毫伏）、1（无需转换，伏特）
:::

## 蓝牙传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
蓝牙连接状态将是已连接蓝牙设备的总数。一旦设备的蓝牙状态发生变化，传感器就会更新。此传感器使用 Android 的 [Bluetooth](https://developer.android.com/reference/android/bluetooth/package-summary?hl=en) 包。

| 属性 | 描述 |
| --------- | --------- |
| `Connected Paired Devices` | 当前已连接的配对设备列表。 |
| `Connected Not Paired Devices` | 已连接但未配对的设备列表。 |
| `Paired Devices` | 已配对的设备列表。 |

还会有一个 `bluetooth_state` 的二进制传感器，表示设备上的蓝牙是否已开启。每当蓝牙状态发生变化时，此传感器都会更新。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
BLE 发射器传感器允许您的设备发射 BLE iBeacon。如果您的设备发送设备名称（[见此处原因](https://github.com/home-assistant/android/pull/2941#issuecomment-1272379540)），iBeacon 可以被 [iBeacon 集成](https://www.home-assistant.io/integrations/ibeacon) 检测到。如果您的设备不发送其设备名称，如果您通过 iBeacon 集成选项明确允许 UUID，它仍然可以被检测到。此传感器也可以与 [roomassistant](https://www.room-assistant.io/) 和 [esp32-mqtt-room](https://jptrsn.github.io/ESP32-mqtt-room/) 等项目一起使用，以允许房间级别的追踪。当前发射 ID（UUID-Major-Minor）作为属性报告，可以复制用于这些系统。

:::caution
此传感器可能会影响电池寿命，特别是当发射功率设置为高时。iBeacon 每秒发射一次（低延迟以节省电池，但足以用于房间存在检测）。
:::

设置可用于更改 UUID、Major 和 Minor 掩码。这些可用于更改整体标识符，以及允许分组，例如家庭手机设备可以有特定的 Major 值，可以在 roomassistant 等应用中列入白名单。这些设置经过验证：UUID 应为[标准格式](https://en.wikipedia.org/wiki/Universally_unique_identifier)，Major 和 Minor 需要在 0 和 65535 之间。

还有设置可以更改：
*   发射功率（超低、低、中和高之间）
*   广播模式（低功耗（1Hz）、平衡（3Hz）和低延迟（10Hz）之间）
*   1 米处的测量功率（必须为负数）
*   是否仅在家用 WiFi 网络 SSID 上启用发射

发射设置开关将启动或停止 BLE 发射。此设置以及上述大多数设置可以通过[通知命令](../notifications/commands.md#ble-beacon-transmitter)更改。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <br />
信标监视器显示扫描 BLE iBeacon。传感器的状态显示应用是否正在监视。范围内所有信标及其距离都列在属性中。当有新的距离测量可用时，此传感器将更新。

设置可用于更改扫描周期和间隔，这对于节省电池寿命很有用。设置过滤迭代和过滤 RSSI 乘数可以调整以获得更稳定的测量结果。所有这些设置都会影响传感器的响应性。还有一个 UUID 过滤器，用于将报告的信标限制为匹配（或不匹配）UUID 列表的信标。

监视设置开关将启动或停止扫描 - 此设置也可以通过[通知命令](../notifications/commands.md#beacon-monitor)调整。

当应用主动扫描信标时，将显示通知以使后台扫描更可靠。如果您使用的是 Android 8.0+，您可以自由地最小化和/或关闭 `Beacon Monitor Scanning` 的通知渠道。

## 汽车传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

下面列出的传感器描述了汽车在几个不同数据点的状态。目前这仅适用于 Android Auto。根据您的手机和/或汽车软件，这些传感器可能无法提供数据。如果您看到 `unknown` 状态，请检查 `status` 属性以了解没有数据的原因。

:::caution
 请注意，您需要在每次将手机连接到汽车时在 Android Auto 屏幕上启动 Home-Assistant 应用，以允许这些传感器工作（一旦启动，您可以关闭应用）。如果应用未启动，状态将为 `unavailable`。

 为了简化操作，您可能希望使用 [`car_ui` 参数](/companion/android-auto/index#notifications)在[连接手机](./sensors.md#android-auto)时在汽车上显示通知。
:::

| 传感器 | 描述 |
| --------- | --------- |
| `car_battery` | 剩余电池百分比 |
| `car_charging_status` | 汽车的充电状态（仅适用于电动车）。充电端口的状态在属性中 |
| `car_ev_connector` | 汽车可用的电动车连接器列表 |
| `car_fuel` | 剩余燃油百分比 |
| `car_fuel_type` | 汽车可用的燃料类型列表。 |
| `car_name` | 汽车的名称。制造商名称和制造年份在属性中 |
| `car_odometer` | 汽车里程表的值（米） |
| `car_range_remaining` | 汽车的剩余续航里程（米） |
| `car_speed` | 汽车的速度（米每秒） |

## 蜂窝运营商传感器
蜂窝运营商传感器显示有关用户蜂窝服务提供商的信息，例如其唯一标识符以及是否允许在其网络上进行 VoIP 呼叫。`sensor.sim_1` 对应于安装的物理 SIM 卡，`sensor.sim_2` 对应于 eSIM（仅在启用 eSIM 时显示）。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 用户将在网络发生变化时看到这些传感器更新，这使用 [SubscriptionManager](https://developer.android.com/reference/android/telephony/SubscriptionManager?hl=en)。这些传感器需要 [Read Phone State 权限](https://developer.android.com/reference/android/Manifest.permission#READ_PHONE_STATE)。

| 属性 | 描述 |
| --------- | --------- |
| `Carrier Name` | 用户蜂窝服务提供商的名称。 |
| `Current Radio Technology` | 仅 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />。 |
| `ISO Country Code` | 用户蜂窝服务提供商的 ISO 国家代码。 |
| `Mobile Country Code` | 用户蜂窝服务提供商的移动国家代码（MCC）。 |
| `Mobile Network Code` | 用户蜂窝服务提供商的移动网络代码（MNC）。 |
| `Carrier ID` |  |
| `Allows VoIP` | 指示运营商是否允许在其网络上进行 VoIP 呼叫。<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
| `Is Opportunistic` | 临时订阅连接到功能和/或覆盖范围受限的网络。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> |
| `Data Roaming` | 设备是否启用了数据漫游。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> |


## 连接类型传感器
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
以下连接类型是 Companion 应用已知的：
*   `Wi-Fi`
*   `Cellular`（蜂窝网络）
*   `No Connection`（无连接）

可以在传感器的 `Cellular Technology` 属性中找到数据连接的更具体描述（仅在蜂窝网络上时出现）。此属性的可能值有：

*   `4G`
*   `3G`
*   `2G`
*   `Cellular`（蜂窝网络）
*   `No Connection`（无连接）

如果无法识别连接类型，将返回 `Unknown` 或 `Unknown Technology`。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
对于 Android，有多种不同类型的连接传感器可用，当检测到网络状态变化时它们将更新：

| 传感器 | 描述 |
| --------- | --------- |
| `wifi_connection` | 当前连接网络的名称 |
| `bssid` | 当前连接网络的 MAC 地址 |
| `frequency` | 连接网络的频段 |
| `wifi_ip_address` | 设备在网络上的当前 IP 地址 |
| `link_speed` | 设备到连接网络的当前链路速度 |
| `signal_strength` | 设备到 WiFi 网络的信号强度 |
| `wifi_state` | 设备上的 WiFi 是否已开启 |
| `transport_type` | 当前网络连接的传输类型。属性将反映当前网络是否按流量计费。 |
| `hotspot_state` | 设备当前是否正在广播 WiFi 热点。（在 Wear OS 上不可用） |
| `ip6_addresses` | 绑定到当前活动网络的 ip6_addresses |

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> `bssid` 传感器提供设置让您重命名当前的 MAC 地址，以避免在自动化和前端中使用模板和秘密。如果您有多个接入点并想要一种简单的方法来区分它们，这通常很有用。这些设置默认关闭。这些传感器需要 [Background Location](https://developer.android.com/reference/android/Manifest.permission#ACCESS_BACKGROUND_LOCATION) 或 [Fine Location](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION) 权限，具体取决于您运行的 Android 版本。

## 当前时区传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
此传感器将表示设备所在的当前时区。还有一些属性来帮助描述此时区。数据由 [TimeZone API](https://developer.android.com/reference/java/util/TimeZone.html) 提供。

| 属性 | 描述 |
| --------- | ----------- |
| `in_daylight_time` | 时区当前是否正在观察夏令时。 |
| `time_zone_id` | 时区的显示名称。 |
| `time_zone_short` | 时区的简称。 |
| `uses_daylight_time` | 当前时区是否观察夏令时。 |

## 当前版本传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />
此传感器将表示 Android 应用的当前安装版本。

## 显示传感器

### 屏幕亮度传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器将报告屏幕亮度值作为其状态。如果屏幕当前正在使用自动亮度模式，也存在一个属性。此传感器使用 [Settings.System API](https://developer.android.com/reference/android/provider/Settings.System)。

### 屏幕关闭超时传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <br />
此传感器将报告屏幕关闭超时值作为其状态，单位为毫秒。此传感器使用 [Settings.System API](https://developer.android.com/reference/android/provider/Settings.System)。

### 屏幕方向传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <br />
此传感器报告屏幕的方向，当屏幕开启且方向变化时，此传感器将立即更新。此传感器使用 [Orientation API](https://developer.android.com/reference/android/content/res/Configuration.html#orientation)。

### 屏幕旋转传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <br />
此传感器报告相对于设备"自然"方向的旋转度数。此传感器仅针对以下旋转角度更新：`0`、`90`、`180` 和 `270`。此传感器使用 [Rotation API](https://developer.android.com/reference/android/view/Display.html#getRotation())。


## 免打扰传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 仅限 6+<br />
此传感器将表示设备上免打扰（DND）的状态。DND 的功能取决于 Android 版本。可能的状态值有 `off`、`priority_only`、`total_silence`、`alarms_only`、`unavailable` 或 `unknown`。并非所有状态都会在所有 Android 版本上显示，例如 Pixel 4 XL 只会显示 `off` 或 `priority_only`。如果您从未使用过 DND，您可能会看到 `unavailable`，直到您更改设备上的设置。一旦 DND 状态发生变化，此传感器就会更新。此传感器使用 [NotificationManager API](https://developer.android.com/reference/android/app/NotificationManager#getCurrentInterruptionFilter())。


## 动态颜色传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 仅在支持 Material 3 动态颜色的设备上可用。

此传感器的状态将是当前设备主题中使用的强调色的十六进制颜色值。[动态颜色](https://m3.material.io/styles/color/dynamic-color/overview)可以来自壁纸或由用户选择。还有一个 `rgb_color` 属性，如果您想在自动化中为 [`light.turn_on`](https://www.home-assistant.io/integrations/light/#service-lightturn_on) 服务调用使用此颜色。此传感器使用 [Dynamic Colors API](https://developer.android.com/reference/com/google/android/material/color/DynamicColors)。


## 打盹传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
状态将反映设备是否处于打盹模式。状态将在状态变化时立即更新，数据由 [PowerManager](https://developer.android.com/reference/android/os/PowerManager.html) 提供。有一个属性 `ignoring_battery_optimizations`，如果 Companion 应用正在忽略电池优化，将显示 `true` 或 `false`。如果您好奇状态实际上如何变化，可以按照这些[概述的步骤](https://developer.android.com/training/monitoring-device-state/doze-standby#testing_doze)进行测试。


## 最前端应用传感器
<img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /><br />
当最前端的应用发生变化时，此传感器会立即更新。

| 属性 | 描述 |
| --------- | --------- |
| `Bundle Identifier` | 应用的包标识符。例如，`io.home-assistant.example`。 |
| `Is Hidden` | 应用是否隐藏。 |
| `Launch Date` | 应用启动的日期（ISO 8601，RFC 3339 格式）。例如，`2021-01-06T22:17:30-08:00`。 |
| `Owns Menu Bar` | 应用是否"拥有"菜单栏。例如，仅菜单栏的应用不会更改菜单栏的内容，即使它是最前端的应用，也不一定是主要的。 |

## 地理编码位置传感器
[地理编码](https://en.wikipedia.org/wiki/Geocoding)位置传感器提供用户当前位置坐标的用户友好描述，通常包含地点名称、地址和其他相关信息。此传感器报告许多详细属性，允许您创建有用的[模板传感器](https://www.home-assistant.io/components/template/)。

地理编码由 iOS 的 [MapKit](https://developer.apple.com/documentation/mapkit) 和 [Core Location](https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names) 服务直接处理。在 Android 中，地理编码由内部 [Geocoder](https://developer.android.com/reference/android/location/Geocoder) 处理。

| 属性 | 描述 |
| --------- | --------- |
| `Location` | 地标的纬度和经度坐标。 |
| `Name` | 地标的名称。仅 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 和 <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> |
| `Country` | 与地标关联的国家名称。 |
| `ISOCountryCode` | 缩写的国家名称。 |
| `TimeZone` | 与地标关联的时区。仅 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
| `AdministrativeArea` | 与地标关联的州或省。 |
| `SubAdministrativeArea` | 地标的额外行政区域信息。 |
| `PostalCode` | 与地标关联的邮政编码。 |
| `Locality` | 与地标关联的城市。 |
| `SubLocality` | 地标的额外城市级信息。 |
| `Thoroughfare` | 与地标关联的街道地址。 |
| `SubThoroughfare` | 地标的额外街道级信息。 |
| `AreasOfInterest` | 与地标相关的感兴趣区域。仅 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
| `Ocean` | 与地标关联的海洋名称。仅 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
| `InlandWater` | 与地标关联的内陆水域名称。仅 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
| `phone` | 地标的电话号码（如果有）。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> |
| `premises` | 地标的前提（如果有）。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> |
| `url` | 地标的 URL（如果有）。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> |

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 用户将有一个传感器设置用于最小所需精度，默认为 200 米。如果用户发现报告不准确或报告不足，可以根据自己的需求调整此设置。此传感器需要 [Background Location](https://developer.android.com/reference/android/Manifest.permission#ACCESS_BACKGROUND_LOCATION) 或 [Fine Location](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION) 权限，具体取决于您运行的 Android 版本。所有属性都将小写，所有空格都替换为下划线。传感器只会在准确和最新时发送更新。在 `full` 版本中，如果启用了位置追踪，传感器也会随位置变化更新。有一个设置可以让传感器与位置更新保持同步。默认情况下，此设置是关闭的。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 和 <img src="/companion-assets/macOS.svg" alt="macOS" style="height: 1em; vertical-align: middle;" /> 用户将有一个传感器设置，用于是否使用活动区域的名称（如果存在）而不是地理编码状态，默认不使用。

## Health Connect 传感器

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 9+ 带 Play Store 版本 • （Android 14+ 所有版本 <span class='beta'>BETA</span>）

:::note
在 Android 13 或更早版本上，您需要安装并设置 [Health Connect 应用](https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata)才能使用这些传感器。
:::

这些传感器将反映存储在您设备 [Health Connect](https://health.google/health-connect-android/) 中由其他应用提供的健康和健身数据。除非另有说明，否则仅使用最近 30 天的数据。

| 传感器 | 单位 | 描述 |
| --------- | ---- | --------- |
| `health_connect_active_calories_burned` | 千卡 | 活动卡路里消耗的最后估计值，不包括基础代谢率（BMR）。 |
| `health_connect_blood_glucose` | 毫克每分升 | 最后记录的血糖读数。 |
| `health_connect_body_fat` | 百分比 | 最后记录的体脂百分比。 |
| `health_connect_diastolic_blood_pressure` | 毫米汞柱 | 最后记录的舒张压。 |
| `health_connect_distance` | 米 | 自午夜以来的总行程距离。 |
| `health_connect_elevation_gained` | 米 | 自午夜以来的总海拔增益。 |
| `health_connect_floors_climbed` | 楼层 | 自午夜以来的总爬楼层数。 |
| `health_connect_heart_rate` | 每分钟心跳 | 最后记录的心率。 |
| `health_connect_heart_rate_variability` | 毫秒 | 最后记录的心率变异性。 |
| `health_connect_oxygen_saturation` | 百分比 | 最后记录的血氧饱和度百分比。 |
| `health_connect_respiratory_rate` | 每分钟呼吸 | 最后记录的呼吸频率。 |
| `health_connect_resting_heart_rate` | 每分钟心跳 | 最后记录的静息心率。 |
| `health_connect_sleep_duration` | 分钟 | 最后记录的睡眠时长。 |
| `health_connect_steps` | 步数 | 自午夜以来的总步数。 |
| `health_connect_systolic_blood_pressure` | 毫米汞柱 | 最后记录的收缩压。 |
| `health_connect_total_calories_burned` | 千卡 | 自午夜以来消耗的总卡路里，包括活动和基础能量消耗（BMR）。 |
| `health_connect_vo2_max` | 毫升每分钟每千克 | 最后记录的 VO2 max 得分。 |
| `health_connect_weight` | 克 | 最后记录的体重。 |

## 高精度模式
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 此传感器的状态将反映设备当前是否启用了[高精度模式](location.md#high-accuracy-mode)。一旦高精度模式状态发生变化，此传感器就会更新，直到首次启用高精度模式，传感器才会出现。

## 高精度更新间隔
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 此传感器的状态将反映[高精度模式](location.md#high-accuracy-mode)的设备更新间隔（秒）。一旦值发生变化（手动或通过[通知命令](../notifications/commands.md#high-accuracy-mode)），此传感器就会更新。

## 交互传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 此传感器的状态将反映设备是否处于交互状态。这通常是屏幕开启和关闭时，但可能因设备而异。一旦检测到状态变化，此传感器就会更新，数据由 [PowerManager](https://developer.android.com/reference/android/os/PowerManager.html) 提供。

使用 [History Stats 集成](https://www.home-assistant.io/integrations/history_stats/)，可以监控每日屏幕时间 `type: time` 以及当天屏幕开启的次数 `type: count`。

## Keyguard 传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

这些传感器将反映来自 [Keyguard Manager](https://developer.android.com/reference/android/app/KeyguardManager) 的各种状态。您将能够确定设备是否主动锁定、是否设置了密码，甚至设备是否需要密码才能解锁。这些传感器将在定期传感器间隔期间更新。

## 上次重启传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器的状态将是设备上次重启的日期和时间，采用 UTC 格式。传感器将在正常传感器更新间隔期间更新。如果无法确定时间戳，状态将为 `unavailable`。此传感器使用 [SystemClock](https://developer.android.com/reference/android/os/SystemClock?hl=en) 和当前 [System](https://developer.android.com/reference/java/lang/System?hl=en) 时间来计算时间戳。此传感器提供一个死区设置，默认为 1 分钟，以解决某些运营商上看到的时间计算问题。

| 属性 | 描述 |
| --------- | --------- |
| `Local Time` | 上次重启的本地日期和时间。 |
| `Time in Milliseconds` | 上次重启的日期和时间（毫秒）。 |


## 上次更新触发器传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

对于 Android，此传感器的状态将反映最近发送更新的[意图](https://developer.android.com/reference/android/content/Intent)。此外，传感器提供设置允许用户从广播意图的其他 Android 应用接收[应用事件](../integrations/app-events.md)。用户可以根据需要注册任意数量的意图，一旦收到意图，就会向 Home Assistant 发送事件。保存意图后，请务必重启应用以注册意图。

如果您注意到您在设置中注册的意图不再被应用触发，那么您需要添加意图期望的类别。您可以通过编辑意图的设置并在意图后添加 `,` 后跟类别来添加类别。如果需要多个类别，则需要添加每个类别后跟 `,`，直到没有更多类别要添加。例如，如果您的意图需要 2 个类别，格式将是：`intent,category1,category2`。保存意图和类别后，确保重启应用。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
此传感器准确显示导致从设备到 Home Assistant 的位置和传感器数据最后更新的原因。

| 状态 | 描述 |
| --------- | --------- |
| Manual | 当用户下拉刷新时触发手动更新。 |
| Launch | 初始应用启动时更新传感器。 |
| Periodic | 根据 [配置](https://my.home-assistant.io/redirect/config/) -> Companion App -> 传感器中的设置定期更新。 |
| Significant Location Change | 当设备的位置发生显著变化时触发，例如 500 米或更多。有关更多详细信息，请参阅[位置](location.md)。 |
| Geographic Region Entered | 当进入任何用户指定的 Home Assistant [区域](https://www.home-assistant.io/components/zone/)（也称为地理围栏）时触发。 |
| Geographic Region Exited | 当退出任何用户指定的 Home Assistant [区域](https://www.home-assistant.io/components/zone/)（也称为地理围栏）时触发。 |
| Push Notification | 通过推送通知[请求位置更新](/companion/notifications/commands#request-location-updates)。  |
| Background Fetch | 当应用在后台刷新传感器信息时。 |
| Siri | 通过 [Siri 快捷方式](../integrations/siri-shortcuts.md) "发送位置"快捷方式触发的位置更新。 |
| iBeacon Region Entered | 当看到与已知区域对应的 iBeacon 时触发。 |
| Registration | 当应用首次连接到您的 Home Assistant 实例时触发一次。 |
| Signaled | 当应用在运行时检测到变化（例如电池状态变化）时触发。 |

## 上次使用的应用传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 6+<br />

传感器的状态将始终是上次使用的应用的包名称，以确保它始终是唯一值。应用的标签将是传感器的一个属性（如果已知）。此传感器在正常传感器更新间隔期间更新，并使用 [UsageStatsManager API](https://developer.android.com/reference/android/app/usage/UsageStatsManager)。

## 光线传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器将反映设备检测到的当前照度级别。传感器在正常传感器更新间隔期间或与其他传感器更新一起更新，并使用 [环境传感器](https://developer.android.com/guide/topics/sensors/sensors_environment)。

## 移动数据传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
关于移动数据状态的几个不同传感器。这些传感器使用 [Settings.Global](https://developer.android.com/reference/kotlin/android/provider/Settings.Global?hl=en) 和 [TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en) 来获取移动数据状态。

| 传感器 | 描述 |
| ------ | ----------- |
| `mobile_data` | 设备上的移动数据是否已开启。 |
| `mobile_data_roaming` | 设备上的移动数据漫游是否已开启。 |

## 下一个闹钟传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器的状态将是下一个闹钟的日期和时间，采用 UTC 格式。一旦计划了下一个闹钟，传感器就会更新。当没有下一个闹钟时，状态将为 `unavailable`。此传感器使用 [AlarmManager](https://developer.android.com/reference/android/app/AlarmManager?hl=en) 来获取下一个计划的闹钟，该闹钟可以由任何应用在任何时间设置。此传感器有设置，允许您通过选择要从中获取闹钟事件的包来创建允许列表，请记住 API 只能获取下一个计划的闹钟。此设置默认关闭。

| 属性 | 描述 |
| --------- | --------- |
| `Local Time` | 下一个闹钟的本地日期和时间。 |
| `Package` | 计划下一个闹钟的包。 |
| `Time in Milliseconds` | 下一个闹钟的日期和时间（毫秒）。 |


## NFC 状态传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

此传感器的状态将反映设备是否当前启用了 NFC 传感器。一旦检测到状态变化，此传感器就会更新。数据由 [NfcAdapter](https://developer.android.com/reference/android/nfc/NfcAdapter) 提供。

## 通知传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

注意：带有允许列表的传感器在允许的应用之一收到新通知之前，不会在 Home Assistant 中显示为新实体。

### 最后一个通知

此传感器将反映设备上发布的最后一个通知。此传感器需要一个特殊权限，应用会将用户带到该权限以授予通知访问权限。此传感器的状态默认为通知的文本，如果不可用则为发布包名称。此传感器提供一个允许列表设置，让用户选择他们希望从哪些包获取通知数据，Home Assistant 发送的通知始终被忽略。您需要创建一个允许列表或启用"禁用允许列表要求"的设置。请记住，没有允许列表，此传感器有可能消耗大量电池。我们强烈建议创建允许列表而不是禁用此要求。这对于集成任何发送通知但不提供直接集成的应用（例如：外卖应用或 2FA 短信代码）非常有用。用户可以期待看到几个属性，尽管并非所有属性都包含数据。此传感器使用 [NotificationListenerService API](https://developer.android.com/reference/android/service/notification/NotificationListenerService#onNotificationRemoved(android.service.notification.StatusBarNotification))。有关每个属性的更多详细信息可以在 [Notification Extras](https://developer.android.com/reference/android/app/Notification) 中找到。

### 最后删除的通知

此传感器与最后一个通知类似，不同之处在于当通知已从设备中删除（由用户或应用程序）时，它将更新。您可以为此传感器期待类似的属性，其中一些概述如下。此传感器需要与上面提到的相同的权限。此传感器也有一个允许列表，其功能类似于最后一个通知。

### 活动通知计数

此传感器将反映设备上的活动通知总数。此计数将包括持久和/或静默的通知。有时它甚至可能包括传感器工作器通知。每当任何其他传感器有更新时，此传感器都会更新。此传感器需要与最后一个通知中提到的相同的权限。此传感器没有允许列表。<br /><br />


下面您可以找到某些通知可以提供的详细信息。除非您禁用相应的传感器设置，否则这些将作为属性提供。


| 属性 | 描述 |
| --------- | --------- |
| `android.appInfo` | 包含包名称的应用信息。 |
| `android.infoText` | 通知的信息文本。 |
| `android.largeIcon` | 通知的大图标。 |
| `android.progress` | 通知的进度（如果有进度条）。 |
| `android.progressIndeterminate` | 进度是否可以确定。 |
| `android.progressMax` | 进度的最大位置（例如：100% 为 100）。 |
| `android.reduced.images` | 通知上的图像是否已缩小。 |
| `android.remoteInputHistory` | 通知的最近输入。 |
| `android.showChronometer` | 是否显示计时器。 |
| `android.showWhen` | 通知是否应在特定时间显示。 |
| `android.subText` | 通知的副标题。 |
| `android.text` | 通知的文本。 |
| `android.title` | 通知的标题。 |
| `is_clearable` | 通知是否可以清除。 |
| `is_ongoing` | 通知是否在设备上持久存在。 |
| `package` | 发布通知的包。 |
| `post_time` | 通知在设备上发布的时间。 |
| `channel_id` | 通知发布到的频道的 ID。此属性仅在 Android 8+ 上可用。 |
| `group_id` | 通知发布到的组的 ID。 |
| `category` | 通知定义的类别。 |


### 媒体会话传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器需要通知权限才能启用并发送数据。状态将是主媒体会话的播放状态。如果没有活动的媒体会话，则状态将为 `unavailable`。属性将包括活动会话的总数以及按包名称分隔的所有活动会话的媒体数据。此传感器将在正常传感器更新间隔期间更新。为了充分利用此传感器，我们建议使用[最后一个通知](#last-notification)来挂钩您的媒体应用以发送更快的更新。此传感器使用 [MediaController](https://developer.android.com/reference/android/media/session/MediaController) 和 [MediaSessionManager](https://developer.android.com/reference/android/media/session/MediaSessionManager) API 来获取数据。


## 计步器传感器
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
计步器传感器从设备内置的运动处理器提供步数数据。它们记录您的日常步行活动，并在午夜重置。这些传感器需要启用运动权限。

| 传感器 | 描述 |
| --------- | --------- |
| `sensor.steps` | 用户走的步数。 |
| `sensor.distance` | 用户行走的估计距离（米）。 |
| `sensor.average_active_pace` | 用户的平均配速，以秒每米测量。 |
| `sensor.floors_ascended` | 步行上楼的近似楼层数。 |
| `sensor.floors_descended` | 步行下楼的近似楼层数。 |

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 用户将只有一个 `sensor.steps` 实体，它将表示自上次设备重启以来的总步数。获取每日步数的推荐方法是使用 `cycle: daily` 的 [Utility Meter 集成](https://www.home-assistant.io/integrations/utility_meter)。此传感器将在正常传感器更新间隔期间更新，并使用 [运动传感器](https://developer.android.com/guide/topics/sensors/sensors_motion?hl=en)。此传感器需要 [Activity Recognition 权限](https://developer.android.com/reference/android/Manifest.permission#ACTIVITY_RECOGNITION)。


## 电话传感器

### 数据网络类型传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

SIM 插槽为数据传输提供的无线电技术（网络类型）。数据由 [TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en) 提供。

:::info
并非所有 5G 网络都是平等的，因此某些网络可能会识别为 LTE
:::


### 电话状态传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
只有当用户在设备的应用信息屏幕中明确授予应用 `Phone` 权限时，此传感器才会显示。此传感器跟踪的唯一数据是以下状态：`idle`、`ringing`、`offhook`。每当检测到电话状态变化时，此传感器都会更新，并使用 [TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en)。此传感器需要 [Read Phone State 权限](https://developer.android.com/reference/android/Manifest.permission#READ_PHONE_STATE)。


### 信号强度传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

一个传感器，表示 SIM 插槽提供的蜂窝信号强度（dBm）。属性将存在信号质量以及任意强度单位。由于省电，此数据可能并不总是最新的。数据由 [TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en) 提供。


## 省电传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器将显示设备上省电模式的状态。根据设备的不同，这通常是一个用户可配置的选项，用于指示设备何时应进入特殊省电模式。一旦检测到状态变化，状态就会更新，传感器使用 [PowerManager](https://developer.android.com/reference/android/os/PowerManager.html)。


## 压力传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器将显示设备的当前压力读数。此传感器将在正常传感器更新间隔期间更新，并使用 [环境传感器](https://developer.android.com/guide/topics/sensors/sensors_environment)。


## 接近传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器将显示设备的当前接近读数。此传感器将在正常传感器更新间隔期间更新。并非所有设备都报告实际读数，因此这些设备将根据传感器的最大范围是否为 `5` 来显示 `near` 或 `far`。此传感器使用 [位置传感器](https://developer.android.com/guide/topics/sensors/sensors_position?hl=en)。


## 公共 IP 传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
此传感器使用 [ipify API](https://www.ipify.org/) 来确定设备的公共 IP 地址。此传感器将在正常传感器更新间隔期间更新。

## 存储传感器
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
此传感器显示设备存储的信息。报告的文件大小采用十进制。

| 属性 | 描述 |
| --------- | --------- |
| `Available` | 设备上剩余的可用存储量。 |
| `Available (Important)` | 卷的可用容量（字节），用于存储重要资源。 |
| `Available (Opportunistic)` | 卷的可用容量（字节），用于存储非必要资源。 |
| `Total` | 设备的总存储容量。 |

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
对于 Android，由于两个操作系统的差异，行为略有不同。状态将与 iOS 相同，我们显示可用空间的百分比，属性不会相同。这些传感器将在正常传感器更新间隔期间更新，计算借助于 [StatFs](https://developer.android.com/reference/android/os/StatFs?hl=en) 完成。

`sensor.internal_storage`

| 属性 | 描述 |
| --------- | --------- |
| `Free internal storage` | 设备上剩余的可用内部存储空间。 |
| `Total internal storage` | 设备的总内部存储容量。 |

`sensor.external_storage`

| 属性 | 描述 |
| --------- | --------- |
| `Free external storage` | SD 卡上剩余的可用外部存储，对于没有 SD 卡的设备，它将反映 `No SD Card`。 |
| `Total external storage` | SD 卡的总外部存储，对于没有 SD 卡的设备，它将反映 `No SD Card`。 |


## 流量统计传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
这些传感器将显示设备传输和接收的总数据。有总传感器和移动传感器可供使用，统计数据在设备重启时重置。这些传感器使用 [Traffic Stats API](https://developer.android.com/reference/android/net/TrafficStats)。


## 工作配置文件传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />
如果设备的工作配置文件已启用，此传感器将为 `on`，否则为 `off`。此传感器使用 [Device Policy Manager API](https://developer.android.com/reference/android/app/admin/DevicePolicyManager)。