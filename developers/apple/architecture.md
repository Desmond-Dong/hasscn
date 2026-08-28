Home Assistant iOS 是一个多目标 Apple 平台项目。它最初是一个围绕 web 体验的 companion app，现已发展为一个混合代码库，具备原生 onboarding、传感器、widgets、Apple Watch 支持、CarPlay、App Intents 以及由通知驱动的功能。

该仓库将特定应用的代码、共享平台代码、extension 和一个小的 Swift server 组件组合在单个 workspace 中。

## 核心原则

### 多目标设计

该仓库的组织方式尽可能在各目标间共享逻辑，同时允许在需要时使用平台特定实现。数据库访问、网络、设计系统组件、通知、widgets 和共享模型等跨领域关注点都放在 common 模块中，以便多个目标可以复用它们。请参阅[目标指南](/developers/apple/targets.md)，了解每个 surface 的概述。

### 混合 UI 栈

该项目同时使用 **SwiftUI** 和 **UIKit**。更新的工作流和组件越来越多地使用 SwiftUI，而遗留和平台特定的集成仍直接依赖 UIKit 和其他 Apple 框架。

## 仓库结构

### `Sources/App`

这里包含 iOS 应用特定的功能，例如 onboarding、设置、场景、摄像头、通知、web/frontend 集成、kiosk 功能和工具。

### `Sources/Shared`

这是共享代码库的核心。它包括：

* API 和网络支持
* 围绕 GRDB 构建的数据库代码
* 共享模型和 domain 逻辑
* 设计系统工具
* Widget 和通知支持
* 位置、Assist 和服务集成

### `Sources/Extensions`

该区域包含 extension 和系统集成的代码，包括：

* Widgets
* App Intents
* Share extension
* 通知服务和内容 extension
* Matter 支持
* Push provider 支持

### 其他重要目录

* `Sources/CarPlay`: CarPlay 模板和功能逻辑
* `Sources/Watch` 和 `Sources/WatchApp`: Apple Watch 通信和 watch app 代码
* `Sources/Thread`: Thread 凭据管理和共享流程
* `Sources/MacBridge`: Mac 构建使用的 macOS 特定 bridge 代码
* `Sources/PushServer` 和 `Sources/SharedPush`: 基于 Swift 包的 server 和共享 push 逻辑
* `Tests`: 应用、共享、UI 和 widget 测试
* `fastlane`: Linting、测试、版本控制和构建自动化

## 关键技术

当前代码库大量使用：

* [**Swift**](https://www.swift.org/)
* **Xcode workspace 和 scheme**
* [**CocoaPods**](https://cocoapods.org/)
* [**Fastlane**](https://fastlane.tools/)
* 用于 frontend 集成的 [**WKWebView**](https://developer.apple.com/documentation/webkit/wkwebview)
* [**SwiftUI**](https://developer.apple.com/xcode/swiftui/) 和 [**UIKit**](https://developer.apple.com/documentation/uikit)
* [**App Intents**](https://developer.apple.com/documentation/appintents) 和 [**WidgetKit**](https://developer.apple.com/documentation/widgetkit)

## 值得注意的第三方依赖

除了 Apple 框架之外，应用还依赖几个开源库。完整列表位于 [`Podfile`](https://github.com/home-assistant/iOS/blob/main/Podfile) 中，但以下是被频繁触碰的：

* [**HAKit**](https://github.com/home-assistant/HAKit) — Home Assistant API client（WebSocket 和 REST）
* [**GRDB.swift**](https://github.com/groue/GRDB.swift) — SQLite 数据库访问
* [**Alamofire**](https://github.com/Alamofire/Alamofire) — HTTP 网络
* [**PromiseKit**](https://github.com/mxcl/PromiseKit) — 基于 promise 的异步流程
* [**Starscream**](https://github.com/daltoniam/Starscream) — HAKit 使用的 WebSocket 传输层（我们跟踪一个带有特定修复的 fork）
* [**SFSafeSymbols**](https://github.com/SFSafeSymbols/SFSafeSymbols) — 类型安全地访问 SF Symbols
* [**KeychainAccess**](https://github.com/kishikawakatsumi/KeychainAccess) — keychain 存储辅助
* [**Eureka**](https://github.com/xmartlabs/Eureka) — 遗留 screen 中的表单式 UI
* [**ObjectMapper**](https://github.com/tristanhimmelman/ObjectMapper) — 遗留模型中的 JSON 映射
* [**XCGLogger**](https://github.com/DaveWoodCom/XCGLogger) — 日志记录
* [**Improv-iOS**](https://github.com/home-assistant/Improv-iOS) — Improv Bluetooth onboarding

## 实践中应用的架构模式

### 共享环境访问

项目在许多地方使用共享的 `Current` 环境模式（参见 [How to control the world](https://www.pointfree.co/blog/posts/21-how-to-control-the-world)）来访问依赖和服务。实际上，这意味着单个 `Current` 值将应用所需的依赖分组在一起，这使得它们很容易从任何地方读取，也很容易在测试中替换。代码库对此处理得很谨慎，以至于 SwiftLint 有一条自定义规则来防止随意的重新赋值。

### Extension 是一等公民

我们鼓励你从一开始就把 widgets、通知、CarPlay、watchOS 支持和 App Intents 考虑在内。应用需要良好地在所有这些 surface 上工作，同时保持代码质量，因此变更往往需要考虑 extension-safe 代码、共享存储和跨目标复用。

### App 加平台 surface

一个功能可能会触及主应用之外的部分。例如，一个实体操作可能会出现在应用 UI、widgets、Apple Watch、App Intents 或 CarPlay 中。在开始编码之前，值得检查一下变更是否应该放在 `Sources/App`、`Sources/Shared` 或某个 extension 目标中。

## 如何浏览代码库

下图显示了顶部的实际 Xcode 发布产品，以及为每个产品提供输入的 `Sources/*` 目录。可以双向阅读：

* **从产品开始**（例如，Apple Watch 应用）：沿着箭头向外看，可以看到包含在其中的每个 source 目录。
* **从 source 目录开始**（例如，`Shared`）：沿着入箭头看，可以看到消费它的每个产品。

有一些组件位于主 workspace 之外：

* [`Sources/PushServer`](https://github.com/home-assistant/iOS/tree/main/Sources/PushServer) 是一个独立的 Swift 包，用于 server 侧的 push relay。
* [`Sources/SharedTesting`](https://github.com/home-assistant/iOS/tree/main/Sources/SharedTesting) 是一个仅用于测试的 framework，由测试目标使用。

如果你是仓库的新手，一个很好的定位方法是：

1. 从 `Sources/App` 开始，了解主 iPhone 和 iPad 应用的组织方式。大多数功能都源自这里。
2. 将多个目标需要的逻辑放在 `Sources/Shared` 中，以便 extension、watch 和 CarPlay 可以复用。
3. 对于特定目标的功能（例如仅 watch 或仅 widget 的变更），在 `Sources/Extensions`、`Sources/CarPlay` 或 `Sources/Watch` 中查找匹配的 surface。
4. 在添加新代码之前，在 `Tests/App` 和 `Tests/Shared` 中查看示例。
