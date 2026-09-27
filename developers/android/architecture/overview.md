## 介绍

Home Assistant 的 Android 项目始于 2019 年。自那时以来，Android 生态发生了巨大变化，许多贡献者塑造了该项目。因此，你可能会遇到不符合当前最佳实践的陈旧代码。本文档作为应用架构和开发实践的真实来源。

Home Assistant 一直是 [PWA](https://en.wikipedia.org/wiki/Progressive_web_app) 开发领域的领先者，这一理念也体现在原生应用中。应用的核心是一个 [WebView](https://developer.android.com/reference/android/webkit/WebView)，它与 Home Assistant 的 frontend 集成。随着时间的推移，原生功能（如后台传感器数据采集）被逐步添加。

## 核心原则

### Kotlin 优先

整个代码库使用 [Kotlin](https://kotlinlang.org) 编写，确保现代化、简洁且类型安全的开发。

### Android 版本支持

* **Target SDK**: 我们力求紧跟最新的 Android SDK 发布，并在新版本发布时对其进行测试。
* **Min SDK**: 为了确保广泛的兼容性，应用支持 Android [Lollipop](https://en.wikipedia.org/wiki/Android_Lollipop)（API 21）。

## 应用架构

我们遵循 Google 推荐的 [Android 架构](https://developer.android.com/topic/architecture)，并从 [NowInAndroid 仓库](https://github.com/android/nowinandroid) 中汲取灵感。单个 screen 如何构建（ViewModel、其输出以及它下面的各个 block）在 [UI 架构](/developers/android/architecture/ui_architecture.md) 中有描述；它适用于每个 screen，而不仅仅是 frontend。

### 构建逻辑

项目使用多个 Gradle 模块。共享逻辑集中放在一个名为 `build-logic` 的独立 Gradle 项目中，并通过 `includeBuild` 包含在主项目中。

### 通用 Gradle 模块

为了在不同应用间共享代码，我们使用一个名为 `:common` 的通用 Gradle 模块。

## UI 开发

### 原生 UI

所有新的 UI 组件均使用 [Jetpack Compose](https://developer.android.com/compose) 构建，确保采用现代化和声明式的 UI 开发方法。

### 遗留 UI

应用中仍存在部分遗留的 XML 布局、`databinding` 和 `viewbinding`。这些应作为持续现代化工作的一部分，替换为 Compose。

### 主题

应用使用多个主题来支持遗留的 XML 和基于 Compose 的 UI。所有新组件应使用 `HomeAssistantAppTheme`，它基于 [Material Design](https://developer.android.com/develop/ui/compose/components)。

## 关键特性

### 依赖注入 (DI)

我们广泛使用 [Hilt](https://developer.android.com/training/dependency-injection/hilt-android) 进行依赖注入，确保代码模块化且可测试。

### 并发

所有并发都使用 [Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html) 处理，提供了一种结构化且高效的方式来管理异步任务。

### 服务

我们使用 [Foreground Services](https://developer.android.com/develop/background-work/services/fgs) 异步获取传感器值并将其上传到 Home Assistant Core。

### WebSocket

应用使用 [OkHttp](https://square.github.io/okhttp/) 维护与 Home Assistant Core WebSocket 的直接连接。这对于 Assist 和实时讨论等功能至关重要。

### REST API

与 Home Assistant 的 REST API 通信使用 [Retrofit](https://square.github.io/retrofit/) 处理，实现了与后端的无缝交互。

### 本地存储

* **Room**: 用户数据使用 [Room](https://developer.android.com/training/data-storage/room) 存储在本地，它提供了强大的数据库解决方案。
* **SharedPreferences**: 对于应用特定的设置，我们使用带有名为 `LocalStorage` 抽象层的 [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)。

### 深度链接

应用使用 `homeassistant://` URL 支持深度链接，以导航到应用的特定部分。更多细节请参阅[用户文档](https://companion.home-assistant.io/docs/integrations/url-handler/)。

## 平台特定功能

### 车载

Automotive 应用复用了 `:app` 模块的源代码，简化了开发。

### Wear OS

Wear OS 应用使用 [Messaging API](https://developer.android.com/training/wearables/data/messages) 与移动应用通信，以获取 Home Assistant 服务器的凭据和其他配置。它只与 `full` flavor 一起工作，因为它需要 Google Play Services。一旦初始设置完成，所有进一步的通信都通过 WebSocket 以及为该应用创建的 [webhook](/developers/api/native-app-integration/sending-data.md) 直接与 Home Assistant 进行。

## Frontend 通信

Home Assistant 的 frontend 渲染在 [WebView](https://developer.android.com/reference/android/webkit/WebView) 内部，应用通过 [external authentication](/developers/frontend/external-authentication.md) 和 [external bus](/developers/frontend/external-bus.md) 与其通信。承载它的 screen、JavaScript bridge、消息流程以及 V1/V2 协议记录在 [Frontend screen](/developers/android/architecture/frontend_screen.md) 中。
