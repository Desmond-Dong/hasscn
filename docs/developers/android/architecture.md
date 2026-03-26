---
title: "安卓架构"
sidebar_label: "建筑学"
---

## 介绍

Home Assistant 的 Android 项目于 2019 年启动。从那时起，Android 生态系统发生了显着的发展，许多贡献者塑造了该项目。因此，您可能会遇到不符合当前最佳实践的传承代码。该文档是应用程序架构和开发实践的真实来源。

Home Assistant一直是[PWA](https://en.wikipedia.org/wiki/Progressive_web_app)开发的领跑者，这个理念也体现在本机应用程序中。该应用程序的核心是[WebView](https://developer.android.com/reference/android/webkit/WebView)，它与Home Assistant的集成。随着时间的推移，添加了本机功能，例如后台传感器数据收集。

## 核心原则

### 首先是科特林

整个代码库都是用现代[Kotlin](https://kotlinlang.org)编写的，确保了、简洁和类型安全的开发。

### 安卓版本支持

- **目标SDK**：我们的目标是跟上最新的Android SDK版本并在新版本发布时进行测试。
- **最小化SDK**：为了保证广泛的兼容性，该应用程序支持Android [Lollipop](https://en.wikipedia.org/wiki/Android_Lollipop) (API 21)。

## 应用架构

我们遵循Google推荐的[Android architecture](https://developer.android.com/topic/architecture)并从[NowInAndroid repository](https://github.com/android/nowinandroid)中汲取灵感。

### 构建逻辑

该项目使用多个 Gradle 模块。共享逻辑集中在一个名为 `build-logic` 的单独 Gradle 项目中，通过 `includeBuild` 包含在主项目中。

### 通用Gradle模块

为了在不同的应用程序之间共享代码，我们使用名为 `:common` 的通用 Gradle 模块。

## 用户界面开发

### 刚刚用户界面

所有新的 UI 组件均使用 [Jetpack Compose](https://developer.android.com/compose) 构建，确保采用声明现代式的 UI 开发方法。

### 旧版用户界面

一些旧版本的XML布局`databinding`和`viewbinding`仍然存在于应用程序中。作为推测的现代化工作的一部分，这些应该被替换。

### 主题化

该应用程序使用多个主题来支持旧版本的 XML 并基于 Compose 的 UI。所有新组件都应使用`HomeAssistantAppTheme`，它基于[Material Design](https://developer.android.com/develop/ui/compose/components)。

## 主要特点

### 依赖注入（DI）

我们广泛使用[Hilt](https://developer.android.com/training/dependency-injection/hilt-android)进行依赖注入，确保代码定制和可测试。

### 随机性

所有的并发均使用[Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)处理，提供结构化有效的方式来管理任务异步。

### 服务

我们使用[Foreground Services](https://developer.android.com/develop/background-work/services/fgs)传感器搜索值将其异步上传到Home Assistant Core。

### WebSocket

该应用程序使用 [OkHttp](https://square.github.io/okhttp/) 保持与 Home Assistant Core 的 WebSocket 的直接连接。这对于帮助和实时讨论等功能关键。

### 休息API

使用 [Retrofit](https://square.github.io/retrofit/) 处理与 Home Assistant 的 REST API 的通信，从而实现与拓扑的无缝交互。

### 本地存储

- **房间**：用户数据使用[Room](https://developer.android.com/training/data-storage/room)本地存储，这提供了强大的数据库解决方案。
- **共享首选项**：对于特定于应用程序的设置，我们使用[SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)和名为`LocalStorage`的抽象层。

### 核心链接

该应用程序支持使用`homeassistant://` URL进行深度链接以导航到应用程序的特定部分。有关详细信息，请参阅[user documentation](https://companion.home-assistant.io/docs/integrations/url-handler/)。

## 针对特定平台的功能

### 汽车

汽车应用重复使用`:app`模块的源代码，简化了开发。

### 合格

Wear OS 应用程序与移动应用程序通信，以使用 [Messaging API](https://developer.android.com/training/wearables/data/messages) 搜索 Home Assistant 服务和其他配置的凭据。它仅适用于 `full` 风格，因为最终的 Google Play 服务。设置完成后，所有后续的通信都将通过 WebSocket 并为应用程序创建的 [webhook](/developers/api/native-app-integration/sending-data) 直接与 Home Assistant 处理。