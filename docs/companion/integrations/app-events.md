---
title: 应用事件
id: 'app-events'
---

## 概述


为了帮助运行自动化，例如清除应用图标角标，或您可能希望根据应用使用情况触发的其他任务，Home Assistant 伴侣应用会在某些情况下向 Home Assistant [事件总线](https://www.home-assistant.io/docs/configuration/events/)触发不同的事件。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />

| 事件 | 原因 |
| ----- | ----- |
| `ios.finished_launching` | 应用在尚未在后台运行时打开。这也会触发 `ios.became_active`。 |
| `ios.entered_background` | 应用关闭但继续在后台运行（通过按主页按钮或在没有主页按钮的机型上向上滑动）。 |
| `ios.became_active` | 应用打开，无论它是否已在后台。 |
| `ios.zone_entered` | 进入区域。如果此区域小于 100m，这将包含一个 `multi_region_zone_id` 键。 |
| `ios.zone_exited` | 离开区域。如果此区域小于 100m，这将包含一个 `multi_region_zone_id` 键。 |

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />


| 事件 | 原因 |
| ----- | ----- |
| `android.intent_received` | 当应用收到来自[上次更新传感器](../core/sensors.md#last-update-trigger-sensor)的注册意图的广播意图时。事件数据将包含意图操作字符串和任何意图附加信息（如果有）。 |
| `android.navigation_started` | 当从 Android Auto/Automotive 中选择 `导航` 类别下的实体时。事件数据将包含选定的实体 ID。 |
| `android.zone_entered` | 进入区域。事件数据将包含所有位置数据，包括触发区域。仅限 [`full` 版本](/companion/core/android-flavors)用户可用。 |
| `android.zone_exited` | 离开区域。事件数据将包含所有位置数据，包括触发区域。仅限 [`full` 版本](/companion/core/android-flavors)用户可用。 |
| `mobile_app.migration_failed` | 应用数据库已损坏，并在迁移期间重置以允许应用打开。传感器需要重新启用，小部件需要重新创建。设备上也会发布通知告知用户该问题。 |

您可以使用 Home Assistant 开发者工具中的事件页面来显示特定事件的所有信息，方法是订阅您感兴趣的事件，并在您的设备上执行相应的操作。