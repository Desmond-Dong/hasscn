---
title: "安卓单元测试"
sidebar_label: "单元测试"
---

## 我们为什么要进行单元测试？

单元测试可帮助您充满信心地构建功能，并确保您的代码按预期运行。它应该是协助发展的工具，而不是负担。 [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) 是一种众所周知的方法，其中测试是在实际代码之前或旁边编写的。这种方法允许您快速验证代码，而无需等待整个应用程序运行。

:::info
不要仅仅为了编写测试而编写测试。测试应该在开发过程中为您提供帮助，或者帮助未来的开发人员维护代码库。
:::

单元测试重点测试**你的代码**。除非绝对必要，否则避免测试外部库的行为。如果您发现自己正在测试某个库的行为，请考虑为该库做出贡献并在其中添加测试。

:::note
此规则也有例外。有时，我们添加测试以确保库的行为不会随着时间的推移而改变。在这种情况下，请明确记录测试的原因。
:::

## 测试公共接口

专注于测试类的 **公共API** 而不是每个函数。为所有函数（尤其是小函数）编写测试可能会导致难以维护的大量测试。通过专注于公共接口，您可以确保您的测试保持相关性并能够适应内部变化。

当您需要访问类的私有部分进行测试时，请考虑使用[VisibleForTesting](https://developer.android.com/reference/kotlin/androidx/annotation/VisibleForTesting)注释。此注释允许您公开私有方法或属性，仅用于测试目的。 [linter](/developers/android/linter) 确保这种暴露仅限于测试范围。

:::note
除非绝对必要，否则避免使用`VisibleForTesting`。最好以不需要公开私有成员的方式设计代码。
:::

## 测试框架和模拟

该项目配置为使用[JUnit 5](https://junit.org/junit5/)，它应该是您的主要测试框架。

### 嘲笑

在编写单元测试时，您通常需要通过模拟其依赖项来隔离被测代码。该项目使用[MockK](https://mockk.io/)。使用此工具为外部依赖项创建模拟或伪造，确保您的测试始终专注于代码的行为。

### 在 Gradle 模块之间共享代码

该项目包括一个名为 `:testing-unit` 的 Gradle 模块，用于在其他 Gradle 模块之间共享代码。如果在多个模块中使用，请将代码添加到此模块。确保`:testing-unit` 保持独立于`:common` 等模块，以避免循环依赖。

## 使用 Android API 进行测试

对于您的代码与无法正确模拟或伪造的 Android API 交互的情况，该项目包括 [Robolectric](https://robolectric.org/)。 Robolectric 允许您在 JVM 环境中运行 Android 特定的测试，无需模拟器。

### 何时使用 Robolectric

- 测试难以模拟或伪造的 Android API 时，请使用 Robolectric。
- 尽可能选择 Robolectric 而不是仪器测试，因为仪器测试需要更多资源并且设置起来更复杂。

### 注意事项

- Robolectric 不适用于 JUnit 5（遵循 [issue](https://github.com/robolectric/robolectric/issues/3477)）。为了解决这个问题，该项目包含了对 JUnit 4 的依赖，用于需要 Robolectric 的测试。
- 确保您正在测试的代码不依赖于 Android API 的状态，因为这可能会导致测试不可靠。如果是这种情况，请考虑编写[instrumented test](/developers/android/testing/integration_testing)。

## 单元测试的最佳实践

- **与代码一起编写测试**：在开发时编写测试可确保您的代码可测试并降低出现错误的风险。
- **关注行为**：测试代码的行为，而不是其实现细节。
- **保持测试小而集中**：每个测试应该验证单个行为或场景。
- **使用描述性测试名称**：测试名称应清楚地描述正在测试的场景和预期结果。
- **模拟外部依赖项**：使用模拟或伪造来隔离被测试的代码。
- **避免过度测试**：不要为琐碎的方法或内部实现细节编写测试，除非它们对功能至关重要。

## 示例：编写单元测试

以下是使用 JUnit 5 和 MockK 的结构良好的单元测试示例：

``科特林
@测试
有趣`Given a valid user ID when fetching user details then return user data`() {
// 给定
val 用户 ID = "12345"
val ExpectedUser = User(id = userId, name = "John Doe")
每个 { userRepository.getUser(userId) } 返回预期用户

// 什么时候
val 结果 = userService.getUserDetails(userId)

// 然后
断言Equals（预期用户，结果）
}
