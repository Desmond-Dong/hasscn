---
title: "通知命令"
id: "notification-commands"
---

伴侣应用提供许多不同的通知选项。您可以发送命令作为 `message` 来触发手机上的某些操作，而不是在设备上发布实际通知。请阅读以下内容，了解每个平台支持哪些命令。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />

| 命令 | 描述 |
| ------- | ----------- |
| `request_location_update` | 从设备请求位置更新，有关此命令的影响，[见下文](#request-location-updates)。 |
| `clear_badge` | 静默地从应用图标中移除徽章，而不显示通知。 |
| `clear_notification` | 移除通知，[更多详情](basic.md#clearing)。 |
| `update_complications` | 更新配对 Apple Watch 上的复杂功能。[更多详情](/companion/apple-watch/complications)。 |
| `update_widgets`* | 更新应用 v2024.7 中引入的"仪表"和"详情"小部件（iOS 将决定是否允许更新，所以如果它不总是工作，请不要担心）。 |

\* 在 iOS 上，手动小部件重新加载限制为每 24 小时约 40-70 次，具体取决于您查看小部件的频率。这不会总是在午夜整点重置。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

| 命令 | 描述 |
| ------- | ----------- |
| `clear_notification`* | 从状态栏移除通知，[更多详情](basic.md#clearing)。 |
| `command_activity` | 使用指定的 URI 启动任何应用的活动，[更多详情](#activity)和下面的用例。 |
| `command_app_lock` | 更改伴侣应用锁定设置，[更多详情](#app-lock)和下面的用例。 |
| `command_auto_screen_brightness` | 控制是否启用自动屏幕亮度。 |
| `command_bluetooth` | 打开或关闭蓝牙。 |
| `command_ble_transmitter` | 打开或关闭 BLE 信标发射器。 |
| `command_beacon_monitor` | 打开或关闭信标监控。 |
| `command_broadcast_intent` | 向另一个应用发送广播意图，[见下文](#broadcast-intent)了解其工作原理和要求。 |
| `command_dnd` | 控制设备上的勿扰模式，[见下文](#do-not-disturb)了解其工作原理和要求。 |
| `command_flashlight` | 打开或关闭手电筒 LED。 |
| `command_high_accuracy_mode` | 控制后台位置传感器的高精度模式，[见下文](#high-accuracy-mode)了解其工作原理和要求。 |
| `command_launch_app` | 启动应用程序，[见下文](#launch-app)了解其工作原理和要求。 |
| `command_media` | 控制设备上播放的媒体，[见下文](#media)了解其工作原理和要求。 |
| `command_ringer_mode` | 控制设备上的铃响模式，[见下文](#ringer-mode)了解其工作原理和要求。 |
| `command_screen_brightness_level` | 控制设备上的屏幕亮度级别。 |
| `command_screen_off_timeout` | 控制设备上的屏幕关闭超时。 |
| `command_screen_on` | 打开设备屏幕。 |
| `command_stop_tts`* | 如果当前正在使用文本转语音，则停止它。 |
| `command_persistent_connection` | 切换持久连接模式，[见下文](#persistent)了解可用模式。 |
| `command_update_sensors` | 更新所有已启用的传感器，如果自上次更新以来状态已更改。 |
| `command_volume_level` | 控制所有可用音频流的音量，[见下文](#volume-level)了解其工作原理和要求。 |
| `command_wake_word_detection` | 打开或关闭助手唤醒词检测。<span class="beta">测试版</span> |
| `command_webview` | 打开应用到主页或任何仪表板或视图，[见下文](#webview)了解如何操作。 |
| `remove_channel`* | 从设备设置中移除通知渠道，[更多详情](basic.md#removing-a-channel)。 |
| `request_location_update` | 从设备请求位置更新，[见下文](#request-location-updates)了解此命令的影响。 |

\*  这些命令将始终工作，即使其他命令被禁用。

## Activity

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

在 Android 上，您可以发送 `message: command_activity` 来启动任何活动。此命令需要特定权限，应用无法提示或自动接受。相反，通过首次发送命令，应用将启动一个活动，允许用户启用 Home Assistant 访问设备的"在其他应用上显示"策略。这是应用获得对此设置控制权所必需的。

`intent_action` 参数需要设置为意图操作字符串，否则通知将正常发布。如果活动需要 URI，则需要将其设置为 `intent_uri`，否则通知将正常发布。`intent_package_name` 可以设置为要启动活动的包，否则 Android 将尽力选择默认值。如果找不到包，则通知将正常发布。您必须知道预期的 URI（如果需要）、操作和包来启动活动。通常，如果应用支持，这将是一个记录的功能。

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) 也在 `intent_extras` 参数下支持。由于可以向意图添加任意数量的额外内容，我们需要用逗号 `,` 分隔每个额外内容。然后每个额外内容名称和值需要用冒号 `:` 分隔。请参阅[广播意图](#broadcast-intent)中的示例以查看正确的格式。

如果需要设置 MIME 类型，也可以将 `intent_type` 设置为 MIME 类型。如果活动需要，您需要知道 MIME 类型字符串。

某些应用还需要提供类或组件。对于这些应用，您需要将包作为 `intent_package_name` 提供，并将完整且完整的类名在 `intent_class_name` 参数下提供。您需要知道提供什么类名，因为每个应用都不同。

下面的示例遵循 [Google 的文档](https://developers.google.com/maps/documentation/urls/android-intents#launch-turn-by-turn-navigation)，通过启动 Google 地图导航向您展示此功能的工作原理。

示例：

```yaml
automation:
  - alias: 导航
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          data:
            intent_package_name: "com.google.android.apps.maps"
            intent_action: "android.intent.action.VIEW"
            intent_uri: "google.navigation:q=arbys"
```

继续上面的示例，您还可以使用以下内容启动[搜索结果](https://developer.android.com/guide/components/intents-common#Maps)：

```yaml
automation:
  - alias: 搜索谷歌地图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          data:
            intent_package_name: "com.google.android.apps.maps"
            intent_action: "android.intent.action.VIEW"
            intent_uri: "geo:0,0?q=1600+Amphitheatre+Parkway%2C+CA"
```

为了使用意图操作 `android.intent.action.CALL`，您还需要授予应用电话权限。如果未授予，应用将引导您到应用信息屏幕授予权限，并显示一条 toast 消息让您知道缺少的权限。


## 应用锁定

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

要控制 Android 伴侣应用的安全性，用户可以使用 `message: command_app_lock` 更改应用锁定设置。与应用锁定相关的所有设置都可以在单个命令中配置。以下设置可通过通知命令访问：

| 参数 | 类型 | 描述 |
|---------|---------|--------|
| `app_lock_enabled` | 布尔值 | 是否启用生物识别/屏幕锁定 |
| `app_lock_timeout` | 整数 | 会话超时时间（秒） |
| `home_bypass_enabled` | 布尔值 | 连接到家庭 WiFi 时是否绕过锁定 |

示例：

```yaml
automation:
  - alias: 将应用锁定重置为默认值
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_app_lock"
          data:
            app_lock_enabled: true
            app_lock_timeout: 60
            home_bypass_enabled: false
```


## 自动屏幕亮度

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

您可以使用 `message: command_auto_screen_brightness` 控制设备上是否启用自动亮度，`command` 为 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述预期值之一，则通知将正常发布。

示例：

```yaml
automation:
  - alias: 关闭自动屏幕亮度
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_auto_screen_brightness"
          data:
            command: "turn_off"
```

## BLE 信标发射器

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

用户可以使用 `message: command_ble_transmitter` 打开或关闭 iBeacon 发射器，`command` 为 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述预期值之一，则通知将正常发布。

示例：

```yaml
automation:
  - alias: 关闭 BLE 发射器
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "turn_off"
```

您还可以调整 BLE 发射器的广播模式和发射功率。要调整广播模式，您需要将 `command` 设置为 `ble_set_advertise_mode`，然后将 `ble_advertise` 参数设置为 `ble_advertise_low_latency`、`ble_advertise_balanced` 或 `ble_advertise_low_power`

```yaml
automation:
  - alias: 更改 BLE 发射器广播模式
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_advertise_mode"
            ble_advertise: "ble_advertise_balanced"
```

要调整发射功率，您需要将 `command` 设置为 `ble_set_transmit_power`，然后将 `ble_transmit` 参数设置为 `ble_transmit_high`、`ble_transmit_medium`、`ble_transmit_low` 或 `ble_transmit_ultra_low`

```yaml
automation:
  - alias: 更改 BLE 发射器发射功率
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_transmit_power"
            ble_transmit: "ble_transmit_high"
```


用户还可以使用以下命令及其各自的参数更改报告的 UUID、Major 和 Minor 参数。您可以为 UUID、Major 和 Minor 属性发送任何类型的字符串值。如果缺少任何数据，通知将在设备上正常发布。

| 命令 | 参数 |
|---------|---------|
| `ble_set_uuid` | `ble_uuid` |
| `ble_set_major` | `ble_major` |
| `ble_set_minor` | `ble_minor` |

更改发射器 UUID 的示例：

```yaml
automation:
  - alias: 更改 BLE 发射器 UUID
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_uuid"
            ble_uuid: "b4306bba-0e3a-44df-9518-dc74284e8214"
```

用户还可以更改 1 米处的测量功率，以帮助改善其设备的检测。此数字必须为负数。在某些情况下，如垃圾字符、缺少数据或数字为正数时，将设置默认值 `-59`，通知将在设备上正常发布。

```yaml
automation:
  - alias: 更改 BLE 发射器测量功率
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: command_ble_transmitter
          data:
            command: ble_set_measured_power
            ble_measured_power: "-75"
```

## 信标监控

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <br />

您可以使用 `message: command_beacon_monitor` 打开或关闭信标监控，`command` 为 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述预期值之一，则通知将正常发布。

示例：

```yaml
automation:
  - alias: 关闭信标监控
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_beacon_monitor"
          data:
            command: "turn_off"
```

## 蓝牙

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> &nbsp;Android 12 或更早版本

用户可以使用 `message: command_bluetooth` 打开或关闭蓝牙，`command` 为 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述预期值之一，则通知将正常发布。

示例：

```yaml
automation:
  - alias: 命令蓝牙
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_bluetooth"
          data:
            command: "turn_off"
```

## 广播意图

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

使用通知命令，您现在可以向另一个应用发送广播意图，以便根据意图控制该应用。并非所有应用都支持意图，如果支持，它们可能会为用户记录它以进行控制。您必须设置 `message: command_broadcast_intent`，`intent_action` 必须包含意图操作，而 `intent_package_name` 必须包含意图的包。包名和操作由您希望发送意图的应用提供。

某些应用还需要提供类或组件。对于这些应用，您需要将包作为 `intent_package_name` 提供，并将完整且完整的类名在 `intent_class_name` 参数下提供。您需要知道提供什么类名，因为每个应用都不同。
如果发送了无效格式，您可能会看到通知或 toast 消息。

示例：

```yaml
automation:
  - alias: 发送广播意图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "package-name"
            intent_action: "action"
```

接受广播意图的应用示例是 [Sleep as Android](https://docs.sleep.urbandroid.org/devs/intent_api.html#action-intents-to-control-sleep)。要启动睡眠跟踪事件，格式如下：

```yaml
automation:
  - alias: 发送广播意图开始睡眠跟踪
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_action: "com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK"

```

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) 也在 `intent_extras` 参数下支持。由于可以向意图添加任意数量的额外内容，我们需要用逗号 `,` 分隔每个额外内容。然后每个额外内容名称和值需要用冒号 `:` 分隔。下面的示例向您展示如何在 Sleep as Android 应用中打开标记为 `work` 的闹钟。在此示例中，有 2 个额外内容添加到意图中。

```yaml
automation:
  - alias: 发送带额外内容的广播意图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_extras: "alarm_label:work,alarm_enabled:false"
            intent_action: "com.urbandroid.sleep.alarmclock.ALARM_STATE_CHANGE"

```

如果您不指定特定类型，则根据您的输入猜测类型。数字将转换为整数，`true` 或 `false` 将转换为布尔值。否则意图额外内容将设置为字符串。

您尝试发送的数据包含特殊字符或用作解析 intent_extra 参数时的分隔符的字符（`,`、`:` 或 `;`）的情况并不少见。在这种情况下，建议您通过在末尾附加另一个冒号 `:` 将数据类型指定为 `String.urlencoded`。例如，要将 JSON 格式的额外内容发送到 Gadgetbridge，您可以使用以下内容：

```yaml
automation:
  - alias: 发送带 JSON 格式额外内容的广播意图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "nodomain.freeyourgadget.gadgetbridge"
            intent_extras: "EXTRA_CONFIG_JSON:%7B%22push%22%3A%7B%22set%22%3A%7B%22widgetCustom0._.config.upper_text%22%3A%22Hi%22%7D%7D%7D:String.urlencoded"
            intent_action: "nodomain.freeyourgadget.gadgetbridge.Q_PUSH_CONFIG"

```

字符串可以通过应用[过滤器](https://www.home-assistant.io/docs/configuration/templating/#string-filters) `urlencode` 在模板中进行 urlencoded。例如，模板 `{{ ",:;" | urlencode }}` 结果为 `%2C%3A%3B`。

如果您尝试将数据作为数组或 ArrayList 发送，则各个值用分号 `;` 分隔。以这种方式发送值时必须指定数组的类型，例如 `float[]`。例如，您可以使用[可穿戴集成 API](https://docs.sleep.urbandroid.org/devs/wearable_api.html#send-movement-data) 将多个传感器值作为运动数据发送到 Sleep as Android：

```yaml
automation:
  - alias: 发送带 float 数组运动数据的广播意图到 Sleep as Android
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_extras: "MAX_RAW_DATA:0.2;0.2;0.4;0.3;5.4;6.8;1.2:float[]"
            intent_action: "com.urbandroid.sleep.watch.DATA_UPDATE"

```

除了上述类型外，您还可以向意图额外内容添加其他特定类型。然后，您的值将根据您指定的类型进行转换。确保类型转换是可能/有意义的。

目前支持的类型有：

|类型|示例|
|----|-------|
|[Integer](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20int))|`EXTRA:101:int`|
|[Integer Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20int[]))|`EXTRA:101;102;103:int[]`|
|[ArrayList\<Integer\>](https://developer.android.com/reference/android/content/Intent#putIntegerArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.Integer%3E))|`EXTRA:1;2;3:ArrayList<Integer>`|
|[Double](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20double))|`EXTRA:10.1:double`|
|[Double Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20double[]))|`EXTRA:10.1;10.2;10.3:double[]`|
|[Float](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20float))|`EXTRA:10.1:float`|
|[Float Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20float[]))|`EXTRA:10.1;10.2;10.3:float[]`|
|[Long](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20long))|`EXTRA:101:long`|
|[Long Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20long[]))|`EXTRA:101;102;103:long[]`|
|[Short](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20short))|`EXTRA:1:short`|
|[Short Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20short[]))|`EXTRA:1;2;3:short[]`|
|[Byte](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20byte))|`EXTRA:127:byte`|
|[Byte Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20byte[]))|`EXTRA:127;64:byte[]`|
|[Boolean](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20boolean))|`EXTRA:true:boolean`|
|[Boolean Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20boolean[]))|`EXTRA:true;true;false:boolean[]`|
|[Char](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20char))|`EXTRA:a:char`|
|[Char Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20char[]))|`EXTRA:a;b;c:char[]`|
|[String](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String))|`EXTRA:abc:String`|
|[String (urlencoded)](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String))|`EXTRA:%2C%3A%3B:String.urlencoded` 或 `EXTRA:%2C%3A%3B:urlencoded`|
|[String Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String[]))|`EXTRA:a;b;c:String[]`|
|[String Array (urlencoded)](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String[]))|`EXTRA:colon%3A;semicolon%3B;comma%2C:String[].urlencoded`|
|[ArrayList\<String\>](https://developer.android.com/reference/android/content/Intent#putStringArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.String%3E))|`EXTRA:a;b;c:ArrayList<String>`|
|[ArrayList\<String\> (urlencoded)](https://developer.android.com/reference/android/content/Intent#putStringArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.String%3E))|`EXTRA:colon%3A;semicolon%3B;comma%2C:ArrayList<String>.urlencoded`|

## 勿扰模式

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

在 Android 上，您可以发送 `message: command_dnd` 来控制设备上的勿扰模式状态。此命令需要特定权限，应用无法提示或自动接受。相反，通过首次发送命令，应用将启动一个活动，允许您启用 Home Assistant 访问设备的通知策略。这是应用获得对此设置控制权所必需的。

除了发送 `message` 外，您还必须提供您希望设置的勿扰模式状态作为 `command`，请参阅下表了解接受的内容。如果 `command` 与列出的命令之一不匹配，则通知将正常发布，命令将不会处理。

:::info
在 Android 15 及更高版本上，Android 将跟踪哪些应用正在启用/禁用勿扰模式，并且只允许应用调整之前由应用设置的设置。这意味着：

- 如果多个应用启用勿扰模式，Android 将使用最严格的勿扰模式过滤器。例如，如果您发送一个仅闹钟的通知命令，而另一个应用将勿扰模式设置为无中断，则无中断过滤器将"胜出"。
- 应用只能禁用勿扰模式（`off`），如果它之前是使用来自 Home Assistant 的通知命令启用的。
:::
<br />


| `command` | 描述 |
| ------- | ----------- |
| `alarms_only` | 仅闹钟中断过滤器 - 除闹钟类别中的通知外，所有通知都被抑制。某些音频流被静音。 |
| `off` | 正常中断过滤器 - 没有通知被抑制。 |
| `priority_only` | 优先中断过滤器 - 除符合优先级标准的通知外，所有通知都被抑制。某些音频流被静音。 |
| `total_silence` | 无中断过滤器 - 所有通知都被抑制，所有音频流（用于电话呼叫的除外）和振动都被静音。 |
| 其他 | 通知将作为正常通知发布，命令将不会处理。 |
<br />

```yaml
automation:
  - alias: 命令勿扰模式
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_dnd"
          data:
            command: "priority_only"
```

## 手电筒

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

此命令允许您直接从通知打开或关闭手电筒，无需打开应用即可控制设备的手电筒。要使用它，发送 `message: command_flashlight`，并将 `command` 参数设置为 `turn_on` 或 `turn_off` 来控制手电筒状态。

示例：

```yaml
automation:
  - alias: 打开手电筒
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_flashlight"
          data:
            command: "turn_on"
```

## 高精度模式

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

用户可以使用 `message: command_high_accuracy_mode` 打开或关闭后台位置传感器的高精度模式，`command` 为 `turn_off`、`turn_on`、`force_off` 或 `force_on`。如果 `command` 为空、未设置或不是上述预期值之一，则通知将正常发布。`turn` 和 `force` 之间的区别仅在高精度模式设置中设置了区域和/或蓝牙约束时才相关。在这种情况下，`force_on` 将使高精度模式保持活动，直到发送 `force_off`，或者约束从活动变为非活动。类似地，`force_off` 将关闭高精度模式，直到发送 `force_on`，或者约束从非活动变为活动。

示例：

```yaml
automation:
  - alias: 关闭高精度模式
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          data:
            command: "turn_off"
```

您还可以按照以下示例调整高精度模式的更新间隔。您必须发送一个有效值，不能小于 `5`。其他任何值都将导致通知发布到设备。执行此命令后，高精度模式将重新启动，这可能需要几秒钟才能完成。

```yaml
automation:
  - alias: 设置高精度更新间隔
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          data:
            high_accuracy_update_interval: 60
            command: "high_accuracy_set_update_interval"
```

## 启动应用

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

如果您只想简单地启动一个应用程序，可以使用 `message: command_launch_app` 来启动设备上安装的任何应用程序。您必须使用 `package_name` 参数发送您希望打开的包名，如果未设置，则您将看到通知正常发布。如果设备上未安装该应用程序，用户将被引导到 Google Play 商店安装该应用程序。此命令需要"在其他应用上绘制"权限，第一次发送此命令时，您将被引导授予 Home Assistant 应用此特殊权限。

```yaml
automation:
  - alias: 启动应用
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_launch_app"
          data:
            package_name: "com.twitter.android"
```

## 媒体

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

用户可以控制其设备上的任何活动媒体会话。您必须设置 `message: command_media`，`media_command` 必须是下面列表中的一个。`media_package_name` 必须设置为您希望控制的包名。如果必填字段之一为空、数据不正确或媒体会话未活动，通知将正常发布。

接受的 `media_command` 媒体命令列表：
*  `fast_forward`
*  `next`
*  `pause`
*  `play`
*  `play_pause`
*  `previous`
*  `rewind`
*  `stop`

示例：

```yaml
automation:
  - alias: 暂停 Spotify
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_media"
          data:
            media_command: "pause"
            media_package_name: "com.spotify.music"
```

## 请求位置更新

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
:::caution
由于下面提到的时间限制，不要依赖此功能。
:::

您可以通过发送特殊通知强制设备尝试报告其位置。通知对设备所有者不可见，仅在应用运行或处于后台时工作。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
成功时，sensor.last_update_trigger 将更改为"Push Notification"。

```yaml
automation:
  - alias: 请求位置更新
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "request_location_update"
```

假设设备收到通知，它将尝试在 5 秒内获取位置更新并将其报告给 Home Assistant。这有点碰运气，因为 Apple 对应用处理通知和位置更新的最大时间有限制，有时由于等待 GPS 获取等因素而需要比平时更长的时间。

:::danger
虽然可以在 Home Assistant 中创建自动化来定期调用此操作以更新传感器，但不建议这样做，因为这样做太频繁可能会对设备的电池寿命和健康状况产生负面影响。
:::


## 铃响模式

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

在 Android 上，您可以通过发送 `message: command_ringer_mode` 并附加上下表中概述的适当 `command` 来控制设备的铃响模式。某些设备需要授予特殊权限，如果尚未授予权限，将在收到第一个命令时出现。这与上面的[勿扰模式](#do-not-disturb)权限相同。如果设备启用了勿扰模式，则设置为 `normal` 或 `vibrate` 将关闭它。如果设备未启用勿扰模式，则 `silent` 将打开它。<br />

| `command` | 描述 |
| ------- | ----------- |
| `normal` | 将设备设置为正常铃响模式，如果启用且支持，将关闭勿扰模式。 |
| `silent` | 将设备设置为静音铃响模式，如果禁用且支持，将打开勿扰模式。 |
| `vibrate` | 将设备设置为振动铃响模式，如果启用且支持，将关闭勿扰模式。 |
| 其他 | 通知将作为正常通知发布，命令将不会处理。 |
<br />

```yaml
automation:
  - alias: 命令铃响模式
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ringer_mode"
          data:
            command: "vibrate"
```

## 屏幕亮度级别

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

您可以通过发送 `message: command_screen_brightness_level` 来控制设备上的屏幕亮度级别，`command` 为屏幕应有的亮度级别。有效值在 `0` 到 `255` 之间。如果您不发送数字或发送空值，则通知将正常发布。如果您发送低于 `0` 或高于 `255` 的值，则应用将分别默认为 `0` 或 `255`。

```yaml
automation:
  - alias: 设置屏幕亮度级别
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_brightness_level"
          data:
            command: 50
```

## 屏幕关闭超时

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 

您可以通过发送 `message: command_screen_off_timeout` 来控制设备上的屏幕关闭超时，`command` 为超时值（毫秒）。如果您不发送数字或发送空值，则通知将正常发布。这些值将遵守 android 系统定义的最小值和最大值，例如在 Pixel 设备上，低于 `10000` 的任何值将被视为 10 秒超时。

```yaml
automation:
  - alias: 设置屏幕关闭超时
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_off_timeout"
          data:
            command: 10000
```

## 屏幕开启

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

在 Android 上，您可以通过简单地发送 `message: command_screen_on` 使用通知打开屏幕。这不会移除或禁用您在设备上设置的任何锁屏。原因是与应用无法将设备策略设置回去（应用崩溃）或设备在移除后需要再次设置策略相关的风险。所有这些都超出了应用的控制范围。您可能需要调整设备上的屏幕超时设置来控制屏幕何时会重新关闭。

您还可以选择添加 `command: keep_screen_on` 来启用[配置](https://my.home-assistant.io/redirect/config/)中伴侣应用部分内的[保持屏幕开启](https://companion.home-assistant.io/docs/integrations/android-webview#keep-screen-on)功能。屏幕将仅在 webview 活动当前处于活动状态时保持开启，否则它将重新关闭。`command` 具有另一个值的通知将此设置重置为默认禁用状态。

```yaml
automation:
  - alias: 屏幕开启
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_on"
          data:
            command: "keep_screen_on"
```

## 停止 TTS

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

如果您希望停止设备完成其文本转语音通知，可以通过发送命令 `message: command_stop_tts` 来停止它。

```yaml
automation:
  - alias: 停止 TTS
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_stop_tts"
```

## 持久连接

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

在 Android 上，您可以通过发送 `message: command_persistent_connection` 并传递 `data -> persistent: (always, home_wifi, screen_on, never)` 来使用通知切换持久连接模式。

```yaml
automation:
  - alias: 打开持久连接
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_persistent_connection"
          data:
            persistent: always
```

## 更新传感器
<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

应用将检查所有已启用的传感器是否有更新，如果自上次更新以来状态已更改，它将发送更新。查看[传感器](/companion/core/sensors)文档以获取有关传感器的更多详细信息。

```yaml
automation:
  - alias: 更新传感器
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_update_sensors"
```

## 音量级别

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

在 Android 上，您可以通过发送 `message: command_volume_level` 并附带必须是数字的适当 `command` 来控制设备的音量级别。如果 `command` 大于最大级别，则将使用最大级别，或者如果 `command` 小于 `0`，则我们将默认为 `0`，其他任何值都将导致通知发布到设备。还需要 `media_stream`，如下表所述。某些设备需要授予特殊权限，如果尚未授予权限，将在收到第一个命令时出现。这与上面的[勿扰模式](#do-not-disturb)权限相同。更改音量级别将直接影响勿扰模式和铃响模式，行为因设备而异。<br />

| `media_stream` | 描述 |
| ------- | ----------- |
| `alarm_stream` | 设置闹钟流的音量级别。 |
| `call_stream` | 设置语音通话流的音量级别。 |
| `dtmf_stream` | 设置 DTMF 音调的音量级别。 |
| `music_stream` | 设置音乐流的音量级别。 |
| `notification_stream` | 设置通知流的音量级别。 |
| `ring_stream` | 设置铃声流的音量级别。 |
| `system_stream` | 设置系统流的音量级别。 |
| 其他 | 通知将作为正常通知发布，命令将不会处理。 |
<br />

```yaml
automation:
  - alias: 命令音量级别
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_volume_level"
          data:
            media_stream: "music_stream"
            command: 20
```

## 唤醒词检测

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> <span class="beta">测试版</span>

当 Home Assistant 设置为设备上的默认数字助手应用时，您可以启用使用唤醒词打开助手。此命令允许您使用通知而不是打开应用来启用或禁用唤醒词检测。要使用它，发送 `message: command_wake_word_detection`，并将 `command` 参数设置为 `turn_on` 或 `turn_off` 来控制唤醒词检测状态。

:::warning
唤醒词检测可能会消耗大量电池，请使用此命令仅在需要时通过自动化启用它。
:::

示例：

```yaml
automation:
  - alias: 打开唤醒词检测
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_wake_word_detection"
          data:
            command: "turn_on"
```

## Webview

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

如果您只想打开伴侣应用到任何页面甚至主页，您将需要发送 `message: command_webview`。如果您希望导航到特定[视图](https://www.home-assistant.io/lovelace/views/)或[仪表板](https://www.home-assistant.io/lovelace/dashboards/)，您将需要使用 `command` 指定[`path`](https://www.home-assistant.io/lovelace/views/#path)（例如：`/lovelace/settings`）。您还可以通过使用以下格式的 `command` 打开任何实体的更多信息面板：`entityId:sun.sun`，只需将 `sun.sun` 替换为您希望打开的实体。如果未提供 `command`，用户将被引导到主页。第一次发送此命令时，您将被带到权限屏幕以授予应用访问"在其他应用上显示"策略的权限。此权限对于功能在后台工作是必要的，我们无法提示用户授予它。

示例：

```yaml
automation:
  - alias: 打开 Android webview
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_webview"
          data:
            command: "/lovelace/settings"
```
