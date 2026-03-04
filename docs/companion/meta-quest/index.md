---
title: "概览"
id: "meta-quest"
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

Home Assistant 已开始在 Meta Quest 上提供 Android 应用的[精简版本](/companion/core/android-flavors)。该应用可在 [SideQuest](https://www.sidequestvr.com) 找到，这是 Meta Quest 的替代应用商店。

<a href="https://sidequestvr.com/app/6427/home-assistant" style={{ display: 'inline-block', width: '200px' }}>
    <img class="download-badge" width="175" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" alt="在 SideQuest 下载" />
</a>
<br /><br />


| 型号 | 是否支持？ |
| ----- | --------- |
| Meta Quest | 是 |
| Meta Quest 2 | 是 |
| Meta Quest Pro | 是 |
| Meta Quest 3/3S | 是 |

由于 Quest 运行 Android，该应用具有主要版本提供的许多传感器。请查看设置中的管理传感器屏幕，了解当前支持的传感器。要了解每个 Android 传感器以及传感器的一般工作原理，请务必查看[传感器](/companion/core/sensors.md#android-sensors)文档。

并非 Android 应用的所有功能都能在 Meta Quest 上运行，因为它运行的是经过大量修改的 Android 分支。没有 Google 服务，没有小部件，没有快捷方式，也没有标准通知。

在此页面上，我们将介绍为 Meta Quest 构建的特定功能和传感器，请继续关注更多更新！

### 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
|`binary_sensor.in_use` | 无 | 头显是否正在使用（立即更新） |