---
title: "安卓集成测试"
sidebar_label: "集成测试"
---

## 为什么要进行集成测试？

[Unit tests](/developers/android/testing/unit_testing) 很棒，应该是您编写测试时的主要选择。但是，集成测试可确保应用程序在真实 Android 环境中的行为得到验证。集成测试通过模拟器在真实的 Android 操作系统上运行，使用最终用户将使用的相同 JVM。

### 在真实 JVM 上进行测试

在开发过程中，您可能只在最新的 Android 操作系统版本或本地安装的 JVM（最有可能是 JDK 21）上进行测试。但是，请记住以下几点：

- Android API 21 仅部分支持[Java 8 language features](https://developer.android.com/studio/write/java8-support)。
- Android 使用专用的[runtime](https://source.android.com/docs/core/runtime)，该[runtime](https://source.android.com/docs/core/runtime) 与您的开发环境中使用的不同（通常用于执行单元测试）。

#### 具体例子

考虑[Jackson library](https://github.com/FasterXML/jackson)。从版本 2.14 开始，它需要最低 Android 版本为 26。不幸的是，此错误仅在运行时出现，这意味着捕获它的唯一方法是通过仪器测试或用户报告的崩溃。您可以在[PR](https://github.com/home-assistant/android/pull/5108)中看到此问题的具体示例。

### 有用户界面还是没有用户界面？

集成测试并不总是涉及显示 UI。它们还用于测试 [foreground services](https://developer.android.com/develop/background-work/services/fgs)，其中不显示 UI。在这些情况下，我们仅验证数据以及与系统的交互。

### 使用相应的 Home Assistant Core 版本进行测试

:::note
这些测试目前正在开发中
:::

我们的目标是针对最新版本的 Home Assistant Core 运行集成测试。这确保了当前代码能够以简单的方式与核心版本无缝协作。

### 不使用 Home Assistant Core 进行测试

我们的大多数测试不应依赖于 Home Assistant Core，以避免引入额外的错误源。这些测试旨在验证用户交互期间屏幕的行为。为此，我们使用[Espresso](https://developer.android.com/training/testing/espresso)框架。

在这种情况下，与核心的交互可以使用 [mockk](https://mockk.io/) 的模拟来代替，或者更好的是，使用假对象来控制行为。

## Android 模拟器中的不稳定

Android 模拟器是出了名的不可靠。有时，平台可能会因未知原因而失败。唯一的解决办法是重新启动作业。请注意，只有维护人员可以重新运行作业。

## 在 Android 5 (API 21) 上测试

如果您的测试需要WebView，您可能需要遵循这些[tips for the Lollipop emulator](/developers/android/tips/lollipop_emulator)。