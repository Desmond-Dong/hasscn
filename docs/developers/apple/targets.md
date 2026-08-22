---
title: "目标概览"
sidebar_label: "目标概览"
---

## Apple 平台目标

Home Assistant iOS 仓库是一个 multi-target workspace。单个更改可能影响的范围不止主 app，因此了解项目中的主要 surface 很有帮助。

## 主应用

主 application target 是 iPhone 和 iPad app。对于本地开发，通常的入口点是 `App-Debug` scheme。仓库还包含面向发布的 `App-Beta` 和 `App-Release` scheme。

## Widgets 和 App Intents

项目在 `Sources/Extensions/Widgets` 和 `Sources/Extensions/AppIntents` 下包含 widget 和 App Intent targets。

这些 target 为 Home Screen widgets、交互式控件以及在主 app 之外展示 Home Assistant actions 的系统集成提供动力。

## Apple Watch

Watch 相关代码位于 `Sources/Watch`、`Sources/WatchApp` 以及 `Sources/Extensions/Watch` 下的 watch 相关 extension 代码中。

涉及 actions、notifications、complications 或共享配置的更改通常需要 watch 特定的验证。

## CarPlay

CarPlay 功能位于 `Sources/CarPlay` 下。这包括模板、列表项、过滤以及受支持实体的 action 执行行为。

## 通知扩展

仓库包含用于丰富 push 处理的专用 notification targets：

- Notification service extension
- Notification content extension
- Push provider support

在处理 notifications、attachments 或 command handling 时，这些 target 很重要。

## Share 和其他 extensions

项目还包含其他 extensions，如：

- Share extension
- Matter extension

如果你的功能与传入内容、home platform setup 或 extension-safe 共享代码交互，也请检查这些 target。

## macOS support

仓库还在 CI 中构建 macOS 工件。`Sources/MacBridge` 包含这些构建使用的 macOS 特定 bridge 代码。

即使你在处理 iOS 功能，共享代码也可能同时编译到 Mac 构建中。

## 支持包

仓库包含支持 app 生态系统的独立 Swift packages：

- `Sources/PushServer`
- `Sources/SharedPush`

当它们的代码发生变更时，会在主 Xcode workspace 之外单独测试。
