---
title: "传感器"
id: 'sensors'
---

Wear OS 应用还提供[传感器](../core/sensors.md#android-sensors)，以便在 Home Assistant 中使用您的可穿戴数据，请参考链接了解有关 Android 上传感器更新的更多信息。并非手机应用提供的所有传感器都由 Wear OS 应用提供。请查看以下列表，了解 Wear OS 应用当前支持的传感器。如果传感器需要权限，系统会提示您接受，否则传感器将不会启用和发送数据。

需要注意的是，传感器更新需要应用向设备发送通知，以防止被操作系统终止。您可以转到 Wear 设备设置并关闭 SensorWorker 通知渠道，以停止这些通知在手腕上震动。

:::info
传感器更新取决于手表是否有数据连接以及应用是否被允许发送更新。某些设备实施了比其他设备更严格的省电技术，因此更新可能不会像您预期的那样频繁。

目前不支持传感器设置。因此，某些传感器可能无法完全运行。例如，BLE 发射器和信标监视器传感器只能启用，目前无法更改任何设置。在我们努力添加传感器设置的同时，这些传感器可能无法完全正常工作，默认设置将允许主要功能。
:::

## 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| [应用数据](../core/sensors.md#app-data-sensors) | 无 | 显示应用发送或接收了多少数据的传感器。 |
| [应用重要性](../core/sensors.md#app-importance-sensor) | 无 | 应用当前的重要性，用于确定它是在前台还是被缓存。 |
| [应用内存](../core/sensors.md#app-memory-sensor) | 无 | 关于应用可用内存的信息。 |
| [应用使用](../core/sensors.md#app-usage-sensors) | 无 | 表示应用根据使用情况如何被对待的传感器。 |
| [音频](../core/sensors.md#audio-sensors) | 无 | 关于设备不同类型音频检测的几个不同传感器。 |
| [电池](../core/sensors.md#battery-sensors)（默认启用） | 无 | 关于设备电池状态的几个不同传感器。默认仅启用 `battery_level`、`battery_state` 和 `charger_type`。 |
| `binary_sensor.bedtime_mode` | 无 | 反映设备上就寝模式状态的传感器。为获得最佳效果，请启用勿扰或交互传感器。仅在 Wear OS 3 设备上可用 |
| [蓝牙传感器](../core/sensors.md#bluetooth-sensors) | [参见属性](../core/sensors.md#bluetooth-sensors) | 关于设备蓝牙状态的几个不同传感器。还提供用于信标发射和监视的传感器。 |
| `sensor.current_time_zone` | [参见属性](../core/sensors.md#current-time-zone-sensor) | 设备所在的当前时区。 |
| [当前版本](../core/sensors.md#current-version-sensor) | 无 | 应用当前安装的版本。 |
| [勿扰](../core/sensors.md#do-not-disturb-sensor) | 无 | 设备上勿扰模式的状态。 |
| [休眠](../core/sensors.md#doze-sensor) | 无 | 设备是否处于休眠模式。 |
| [健康服务](#health-services) | [见下文](#health-services) | 由健康服务 API 提供的一组传感器。 |
| `sensor.heart_rate` | 准确度 | 当前心率（每分钟心跳数）。此传感器使用[心率传感器](https://developer.android.com/reference/android/hardware/Sensor#TYPE_HEART_RATE)。 |
| [交互](../core/sensors.md#interactive-sensor) | 无 | 设备是否处于交互状态。 |
| [键盘锁传感器](../core/sensors.md#keyguard-sensors) | 无 | 表示设备被锁定或安全等各种状态的传感器。 |
| `sensor.last_reboot` | [参见属性](../core/sensors.md#last-reboot-sensor) | 设备上次重启的时间戳。 |
| [上次更新](../core/sensors.md#last-update-trigger-sensor) | 无 | 状态将反映导致发送上次更新的意图。 |
| `sensor.light_sensor` | 无 | 设备检测到的当前照度级别。 |
| [移动数据传感器](../core/sensors.md#mobile-data-sensors) | 无 | 关于移动数据状态的几个不同传感器。 |
| `binary_sensor.nfc_state` | 无 | 设备是否启用了 NFC 传感器。 |
| `sensor.phone_state` | 无 | 唯一跟踪的状态是 `idle`、`ringing` 或 `offhook`，不访问其他信息。 |
| `sensor.pressure_sensor` | 无 | 设备的压力读数。 |
| `sensor.proximity_sensor` | 无 | 设备当前的近距离读数，某些设备只会显示 `near` 或 `far` 的布尔值。 |
| [网络](../core/sensors.md#connection-type-sensor) | 无 | 关于 WiFi 状态的几个不同传感器。 |
| [下次闹钟](../core/sensors.md#next-alarm-sensor) | [参见属性](../core/sensors.md#next-alarm-sensor) | 下一个计划闹钟的日期。 |
| `binary_sensor.on_body_sensor` | 无 | 指示可穿戴设备是否认为它在身上的传感器。此传感器使用[低延迟离身检测](https://developer.android.com/reference/android/hardware/Sensor#TYPE_LOW_LATENCY_OFFBODY_DETECT)传感器。 |
| [省电](../core/sensors.md#power-save-sensor) | 无 | 设备是否处于省电模式。 |
| `sensor.screen_brightness` | [参见属性](../core/sensors.md#screen-brightness-sensor) | 屏幕亮度的当前值。 |
| `sensor.screen_off_timeout` | 无 | 屏幕关闭超时设置的当前值。 |
| `sensor.sim_1` | [参见属性](../core/sensors.md#cellular-provider-sensor) | 您的蜂窝运营商名称。 |
| `sensor.sim_2` | [参见属性](../core/sensors.md#cellular-provider-sensor) | 您的蜂窝运营商名称。 |
| [步数](../core//sensors.md#pedometer-sensors) | 无 | 自上次设备重启以来用户的步数。在支持的设备上需要活动识别权限。 |
| [存储传感器](../core/sensors.md#storage-sensor) | [参见属性](../core/sensors.md#storage-sensor) | Android 设备上内部和外部存储的总量和可用量。 |
| `binary_sensor.theater_mode` | 无 | 反映设备上影院模式状态的传感器。为获得最佳效果，请启用交互传感器。 |
| [流量统计传感器](../core/sensors.md#traffic-stats-sensor) | 无 | 自上次重启以来移动设备和总设备使用传输和接收的数据量。 |
| `binary_sensor.wet_mode` | 无 | 指示当前设备上湿模式的传感器。此传感器在某些设备上也称为触摸锁或水锁。这是一种特殊模式，用户必须按住表冠/电源按钮 2 秒钟才能重新启用触摸。 |


### 健康服务

仅限 Wear OS 3+<br />

包含 Google [健康服务 API](https://developer.android.com/training/wearables/health-services/passive#useractivityinfo) 提供的数据的传感器列表。

以下传感器可用（如果您的设备支持）：

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `sensor.activity_state` | 运动类型，时间 | 反映当前用户活动状态的传感器，可以是：睡眠、运动、被动或未知。|
| `sensor.daily_calories` | 无 | 一天内的总卡路里数（包括基础代谢率和活动卡路里），前一天结束和新的一天开始于当地时间上午 12:00。 |
| `sensor.daily_distance` | 无 | 一天内的总距离，前一天结束和新的一天开始于当地时间上午 12:00。 |
| `sensor.daily_floors` | 无 | 一天内爬楼的总层数，前一天结束和新的一天开始于当地时间上午 12:00。 |
| `sensor.daily_steps` | 无 | 一天内的总步数，前一天结束和新的一天开始于当地时间上午 12:00。 |