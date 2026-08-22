---
title: "Android 截图测试"
sidebar_label: "截图测试"
---

## 为什么要进行截图测试？

截图测试用于验证当前 UI 是否与仓库中存储的参考 UI 匹配。通过这样做，我们可以确保任何影响 UI 的更改都是有意为之且经过验证的。这些测试的范围仅限于 UI。

我们应该在各种设备形状和尺寸上测试，从小屏幕（例如 Wear OS 设备）到大屏幕（例如 55" 电视）。

### 截图测试的好处

- **UI 一致性**：确保 UI 在更新中保持一致。
- **库更新**：验证 UI 库的更新不会引入意外更改。
- **广泛的设备覆盖**：跨多个屏幕尺寸和形状进行测试以确保兼容性。

### 实际示例

在使用 Wear Compose 库等库的 beta 版本时，截图测试已证明很有用，因为库中的更改可能影响 UI。

## Compose 截图测试

我们使用 [Compose Preview Screenshot Testing](https://developer.android.com/studio/preview/compose-screenshot-testing) 框架来断言 UI 没有意外更改。

### Compose 截图测试的优点

- **不需要模拟器**：这些测试不需要模拟器，使它们资源消耗较少且比[集成测试](/developers/android/testing/integration_testing)快得多。
- **快速反馈**：开发者可以快速验证 UI 更改而无需等待模拟器启动时间。

### 参考截图

参考截图存储在每个 Gradle 模块的 `src/debug/screenshotTest/reference` 下。要更新参考截图，请运行以下命令：

```bash
./gradlew updateDebugScreenshotTest updateFullDebugScreenshotTest
```

### CI 集成

我们的[CI 流水线](/developers/android/ci)会验证测试报告中是否有任何错误。如果发现差异，CI 将阻止 pull request，直到问题解决。

## 避免 Compose 预览中的重复

为避免在测试中重复 Compose 预览，请确保尽可能复用现有的 composable 和预览注解。这减少了冗余并确保预览与测试之间的一致性。

## 为测试配置注解

编写截图测试时，使用适当的配置注解来定义设备尺寸、主题和其他参数。这确保测试准确反映预期的 UI。

## 处理阈值更新

在不同操作系统上运行截图测试时可能会失败，因为渲染中的细微差异，例如抗锯齿。此问题在此 [Google issue tracker](https://issuetracker.google.com/issues/348590914) 中有详细讨论。

### 当前方法

我们将阈值保持在尽可能低以避免掩盖真实问题。

:::info
在 CI 上更新截图的工作流仅限于具有写权限的用户，且仅适用于主仓库内的分支。目前不适用于 fork 或外部贡献者。
:::

提供了一个 GitHub Action 工作流 `update_screenshots.yml`，可由仓库维护者手动触发来更新截图以匹配验证主机配置。如果你的截图测试因阈值差异而失败，维护者将在审查过程中处理此问题。

:::note
此工作流直接提交到分支，但不会自动触发 pull request 工作流。要在更新后触发工作流，请在更新后向分支提交一个新的 commit。
:::

## 截图测试最佳实践

- **跨设备测试**：确保测试覆盖一系列屏幕尺寸和形状。
- **保持参考截图更新**：定期更新参考截图以反映有意的 UI 更改，并在 PR 中解释更改内容。
- **最小化阈值**：使用尽可能小的阈值以避免隐藏真实问题。
- **复用预览**：通过复用现有的 composable 和注解来避免重复 Compose 预览。

遵循这些实践，你可以确保 UI 在更新和设备配置中保持可靠和一致。
