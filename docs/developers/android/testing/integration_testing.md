---
title: "Android 集成测试"
sidebar_label: "集成测试"
---

## 为什么要进行集成测试？

[单元测试](/developers/android/testing/unit_testing)很棒，应是你编写测试时的首选。然而，集成测试确保在真实 Android 环境中应用的行为得到验证。集成测试通过模拟器在真实的 Android 操作系统上运行，使用终端用户也将使用的相同 JVM。

### 在真实 JVM 上测试

在开发过程中，你可能只在最新的 Android 操作系统版本或本地安装的 JVM（很可能是 JDK 21）上测试。但请记住以下几点：

- Android API 21 仅部分支持[Java 8 语言特性](https://developer.android.com/studio/write/java8-support)。
- Android 使用专用的[runtime](https://source.android.com/docs/core/runtime)，与开发环境中使用的那个（通常用于执行单元测试）不同。

#### 具体示例

考虑 [Jackson 库](https://github.com/FasterXML/jackson)。从 2.14 版本开始，它要求最低 Android 版本为 26。遗憾的是，此错误仅在运行时才会出现，这意味着捕获它的唯一方式是通过 instrumentation tests 或用户报告的崩溃。你可以在这个 [PR](https://github.com/home-assistant/android/pull/5108) 中看到此问题的具体示例。

### 有 UI 还是无 UI？

集成测试并不总是涉及显示 UI。它们也用于测试[foreground services](https://developer.android.com/develop/background-work/services/fgs)，此时不显示 UI。在这些情况下，我们仅验证数据以及与系统的交互。

### 使用对应的 Home Assistant Core 版本进行测试

:::note
这些测试目前仍在开发中
:::

我们旨在针对 Home Assistant Core 的最新版本运行集成测试。这确保当前代码能与核心版本无缝工作。

### 不使用 Home Assistant Core 进行测试

我们的大部分测试不应依赖 Home Assistant Core，以避免引入额外的错误来源。这些测试旨在验证 screen 在用户交互期间的行为。为此，我们使用 [Espresso](https://developer.android.com/training/testing/espresso) 框架。

在此场景中，与 core 的交互可以使用 [mockk](https://mockk.io/) 的 mock 来替换，甚至更好的方式是使用 fake 对象来控制行为。

## Android 模拟器中的 flakiness

Android 模拟器以不可靠而闻名。偶尔，某个平台可能因未知原因失败。唯一的解决方案是重启该任务。请注意，只有维护者才能重新运行任务。

## 在 Android 5（API 21）上测试

如果你的测试需要 WebView，你可能需要遵循这些[Lollipop 模拟器提示](/developers/android/tips/lollipop_emulator)。
