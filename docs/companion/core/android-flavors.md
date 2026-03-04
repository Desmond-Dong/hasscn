---
title: "Android 版本"
id: 'android-flavors'
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用提供两种不同的版本：`完整版`（full）或 `精简版`（minimal）。应用的 `完整版` 通过 [Play 商店](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) 提供，因为它需要 Google Play 服务，所以具有完整的功能集。`完整版` 同时提供正式版和[测试版](https://play.google.com/apps/testing/io.homeassistant.companion.android)。

应用的 `精简版` 不需要 Google Play 服务，可以在 GitHub 的[发布](https://github.com/home-assistant/android/releases)部分以 APK 形式获取。它也可以从 [F-Droid](https://f-droid.org/en/packages/io.homeassistant.companion.android.minimal) 安装。但是，由于 F-Droid 独立构建新版本，更新可能会有延迟。此版本不支持位置追踪。此外，以下传感器不可用：[活动传感器](/companion/core/sensors.md#activity-sensors)。

除了这两种版本，用户还可以在 GitHub 上每个拉取请求的 [actions](https://github.com/home-assistant/android/actions) 部分找到 `调试版` APK。应用的 `调试版` 可以与正式版或测试版并排安装。这允许用户帮助测试即将推出的功能和修复。`精简版` 和 `完整版` 都提供 `调试版`。

<details>
<summary>证书指纹</summary>
  
以下是签名证书的 SHA-256 指纹。

Play 商店/GitHub 发布版：
`11:19:4B:A8:09:B4:2D:DF:0E:1A:7D:EC:68:42:A5:9C:7F:F1:11:9C:54:82:E9:5F:EB:FF:D5:C6:01:4D:AA:5A`

F-Droid 发布版：
`17:48:52:50:A0:3A:0F:2B:3F:29:2A:05:4F:59:5A:9E:79:4B:EE:F8:0C:F9:10:F7:B3:BB:B8:09:8A:BF:6D:50`

您可以使用 `apksigner verify --print-certs app-(full/minimal)-release.apk` 或 [AppVerifier](https://github.com/soupslurpr/AppVerifier) 与您下载的 apk / 已安装的应用进行比较
</details>