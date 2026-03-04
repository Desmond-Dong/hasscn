---
title: 触觉反馈
id: 'haptics'
---

Home Assistant 伴侣应用具有触觉反馈功能，在与 UI 交互时提供物理反馈。您会感受到触觉反馈的区域包括开关（灯光、开关、输入布尔值）和输入选择。某些场景（如无效操作错误）也会产生触觉反馈。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />

支持触觉反馈的 iPhone 机型包括 iPhone 7 和 7 Plus、iPhone 8 和 8 Plus、iPhone X、XR、XS、XS Max、iPhone 11 和 11 Pro。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

具有触觉反馈支持和/或振动马达的 Android 设备可以预期会感受到某种类型的反馈。

## 禁用触觉反馈
Home Assistant 伴侣应用遵循操作系统级别的禁用触觉反馈设置。在 iOS 设置中，导航到"声音与触感"，然后在屏幕底部关闭"系统触感"。有关更多信息，请参阅 [Apple 支持文档](https://support.apple.com/guide/iphone/change-the-sounds-and-vibrations-iph07c867f28/ios)。在 Android 上，您可以从 Home Assistant 用户配置文件页面禁用振动来禁用此功能。

## 开发者：将触觉反馈集成到自定义卡片中
待办：将触觉反馈支持集成到自定义卡片的说明将放在这里。当您的自定义卡片被交互时，您可以触发一个事件，iOS 应用将监听该事件并将其重新解释为触觉反馈。

Home Assistant 伴侣应用支持 [Apple 人机界面指南](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/feedback/)定义的所有七个触觉强度级别。Android 将尝试尽力使用现有的[触觉反馈常量](https://developer.android.com/reference/android/view/HapticFeedbackConstants#constants_1)和/或[振动效果](https://developer.android.com/reference/android/os/VibrationEffect.html#constants_1)来匹配这些级别。

| 触觉反馈 | 描述 |
| ------ | ------ |
| `success` | 表示任务或操作已完成。 |
| `warning` | 表示任务或操作产生了某种警告。 |
| `failure` | 表示任务或操作已失败。 |
| `light` | 提供补充视觉体验的物理隐喻。 |
| `medium` | 提供补充视觉体验的物理隐喻。 |
| `heavy` | 提供补充视觉体验的物理隐喻。 |
| `selection` | 表示选择正在主动更改。 |

**使用触觉反馈的自定义卡片：**
*   [Button Card](https://github.com/custom-cards/button-card) 作者 RomRider
*   [RadialMenu](https://github.com/custom-cards/radial-menu) 作者 Ian Richardson
*   [Harmony Card](https://github.com/sbryfcz/harmony-card) 作者 Sam Bryfczynski
*   [Simple Thermostat Card](https://github.com/nervetattoo/simple-thermostat) 作者 Raymond Julin