---
title: "关键通知"
id: "critical-notifications"
---
关键通知的配置和行为在 iOS 和 Android 之间有所不同。

## <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />
关键通知在 iOS 12 中引入，旨在发送您不希望错过的高优先级通知 - 例如安全系统、水泄漏传感器和烟雾/CO2 警报警报。

iOS 对此类通知给予特殊优先级。关键警报始终显示在锁屏顶部，位于所有其他通知之上，即使启用了勿扰模式或 iPhone 处于静音状态也会播放声音。因为我们永远不希望您错过关键通知，所以它们也被允许绕过应用[通知速率限制](details.md)。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />示例

```yaml
automations:
  - alias: "检测到火灾 iOS"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "快醒醒！"
          message: "房子着火了，猫被困在烘干机里！"
          data:
            push:
              sound:
                name: "default"
                critical: 1
                volume: 1.0

```
如果您之前阅读过[声音文档](sounds.md)，此语法应该大部分熟悉。注意示例扩展了 `sound` 属性以包含 `critical: 1` 标志，以及 `volume: 1.0` 将音量设置为 100%。

或者，您可以使用 [`interruption-level` 语法](basic.md#interruption-level)使通知变为关键通知。
```yaml
automations:
  - alias: "狗叫得很响"

    trigger:
      - platform: numeric_state
        entity_id: sensor.dog_bark_decibel_meter
        above: "90"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "史努比要吵醒邻居了"
          message: "狗在叫，很可能会吵醒邻居！"
          data:
            push:
              interruption-level: critical

```

对于 **CarPlay** 用户，还值得一提的是，关键通知是唯一可以出现在汽车内置显示屏上的通知，如果您想在开车时知道发生了什么关键事件，这非常有用。

## <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

:::info
以下选项仅在未使用[本地推送通知](local.md)时生效。如果您使用的是精简版本，则无需担心此问题。
:::

对于 Android，通知在大多数情况下会立即显示。但是，在某些情况下（例如手机静止或屏幕长时间关闭），默认通知不会响铃，直到屏幕打开。

要覆盖该行为，请设置 `priority: high` 和 `ttl: 0`。

默认情况下，它们也不会覆盖勿扰设置，如果您想覆盖此设置，则需要使用[通知渠道](basic.md#notification-channels)。 

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> &nbsp; Android 示例

```yaml
automations:
  - alias: "检测到火灾 Android"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "快醒醒！"
          message: "房子着火了，猫被困在烘干机里！"
          data:
            ttl: 0
            priority: high
```

### <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 闹钟流
您还可以强制通知从闹钟流播放，这样即使设备处于振动/静音铃声模式也会响铃。Android 7 及以下版本的用户仍可以使用下面的 `channel` 示例，因为我们只是用它来覆盖默认的通知声音行为。要使通知立即显示并无论铃声模式如何都发出声音，请按照以下示例之一操作。

使用此方法可以发送普通通知：

```yaml
automations:
  - alias: "检测到火灾 Android 闹钟流"
    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "快醒醒！"
          message: "房子着火了，猫被困在烘干机里！"
          data:
            ttl: 0
            priority: high
            channel: alarm_stream
```


### <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 文字转语音闹钟流
或者您可以使用文字转语音来朗读通知：

```yaml
automations:
  - alias: "检测到火灾 TTS 闹钟"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            ttl: 0
            priority: high
            media_stream: alarm_stream
            tts_text: "房子着火了，猫被困在烘干机里！"
```

### <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 文字转语音闹钟流最大音量
或者使用文字转语音，您还可以让通知以最大音量播放，然后恢复到原始音量级别：

```yaml
automations:
  - alias: "检测到火灾 TTS 大声"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            ttl: 0
            priority: high
            media_stream: alarm_stream_max
            tts_text: "房子着火了，猫被困在烘干机里！"
```