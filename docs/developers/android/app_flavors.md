---
title: "Android 风味"
sidebar_label: "Flavors"
---

:::info
只有 `:app` 和 `:automotive` 模块受这些 flavors 影响。
:::

## 概述

Android 应用构建了两个 flavor：`full` 和 `minimal`。这些 flavor 使我们能够迎合不同的用户偏好。本文档解释了 flavor 之间的区别、它们的功能以及实现它们背后的原因。

## App 变体

### 共享代码

我们尽量将所有内容都放在 flavor 无关的 `main` source set 中，以便所有人都能受益于新功能。只要有可能，我们总是优先选择开源方案。

### 完整变体

`full` flavor 使用 **Google Play Services**，启用以下功能：

- 位置跟踪
- Push 通知
- 与 Wear OS 设备通信

该 flavor 通过 Google Play Store 分发。

### 精简变体

`minimal` flavor 旨在为偏好或需要无 **Google Play Services** 应用的场景设计。它具有以下限制：

- ❌ 不支持 [存在检测](https://www.home-assistant.io/getting-started/presence-detection/#adding-zone-presence-detection-with-a-mobile-phone) 的位置跟踪
- ❌ 不支持 push 通知（除通过 WebSocket 使用 [本地通知](https://companion.home-assistant.io/docs/notifications/notification-local#requirements) 外）
- ❌ 不支持与 Wear OS 设备通信
- ❌ 不支持崩溃报告

尽管有这些限制，`minimal` flavor 使我们能够向更广泛的受众提供应用，包括没有 Google Play Services 的设备用户。如果找到了可行的替代 Google Play Services 功能的开源方案，可能会考虑将其纳入 `minimal` flavor 以移除这些限制。

该 flavor 被用于以下场景：

- 手动下载 APK 或通过 F-Droid 获取。
- Meta Quest 设备。
- OEM 的 Automotive 构建。
