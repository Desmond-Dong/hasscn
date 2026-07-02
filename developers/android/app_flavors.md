# 安卓风格

:::info
仅`:app` 和`:automotive` 模块受这些风格影响。
:::

## 概述

Android应用采用三种风格构建：`full` 和 `minimal`。这些风格使我们能够满足不同用户的喜好。本文档解释了各种风格之间的差异、它们的功能以及它们实现背后的基本原理。

## 应用风格程序

### 共享代码

我们努力尝试使集中源码的所有内容与风格无关`main`，以便每个人都可以从新功能中受益。如果可以的话，我们将始终支持开源解决方案。

### 风格外观

`full` 风格使用**谷歌播放服务**，支持以下功能：

* 位置追踪
* 群众通知
* 与 Wear OS 设备通信

这种口味是通过 Google Play 商店分发的。

### 最小的味道

`minimal`风格专为喜欢或不需要带**谷歌播放服务**的应用程序的用户而设计。它有以下限制：

* ❌[presence detection](https://www.home-assistant.io/getting-started/presence-detection/#adding-zone-presence-detection-with-a-mobile-phone) 没有位置跟踪
* ❌使用集体无通知（通过WebSocket [local notification](https://companion.home-assistant.io/docs/notifications/notification-local#requirements)时）
* ❌ 无法与 Wear OS 设备通信
* ❌没有崩溃报告

尽管有这些限制，`minimal`风格使我们能够向更广泛的受众提供该应用程序，包括没有Google Play服务的设备的用户。如果找到Google Play服务功能的小型开源替代方案，则考虑将它们存在于可以存在于`minimal`风格中以消除存在这些限制。

使用这种味道，例如：

* 用于手动下载APK或通过F-Droid。
* 适用于Meta Quest 设备。
* 适用于OEM的汽车制造。
