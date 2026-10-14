## 为什么要进行单元测试？

单元测试帮助你自信地构建功能，并确保代码行为符合预期。它应是协助开发的工具，而非负担。[测试驱动开发 (Test-Driven Development, TDD)](https://en.wikipedia.org/wiki/Test-driven_development) 是一种知名方法，在编写实际代码之前或同时编写测试。这种方法允许你快速验证代码而无需等待整个应用运行。

:::info
不要为了写测试而写测试。测试应在开发过程中提供帮助，或帮助未来的开发者维护代码库。
:::

单元测试专注于测试**你的代码**。除非绝对必要，否则避免测试外部库的行为。如果你发现自己正在测试库的行为，请考虑为该库做贡献并将测试添加在那里。

:::note
此规则有例外情况。有时我们添加测试以确保库的行为不会随时间改变。在这种情况下，请明确记录测试的原因。
:::

## 测试公共接口

专注于测试你类的**公共 API**，而不是每个单独的函数。为所有函数（尤其是小型函数）编写测试可能会导致大量难以维护的测试。通过集中测试公共接口，确保测试保持相关性并对内部变更具有弹性。

当你需要访问类的私有部分进行测试时，考虑使用 [VisibleForTesting](https://developer.android.com/reference/kotlin/androidx/annotation/VisibleForTesting) 注解。此注解允许你仅出于测试目的暴露私有方法或属性。[linter](/developers/android/linter.md) 确保此暴露仅限于测试作用域。

:::note
除非绝对必要，否则避免使用 `VisibleForTesting`。最好以不需要暴露私有成员的方式设计代码。
:::

## 测试框架和 mocking

项目已配置使用 [JUnit 5](https://junit.org/junit5/)，应作为你的主要测试框架。

### 模拟

编写单元测试时，你通常需要 mock 被测代码的依赖来隔离它。项目使用 [MockK](https://mockk.io/)。使用该工具为外部依赖创建 mock 或 fake，确保测试保持聚焦于你的代码行为。

### 在 Gradle 模块间共享代码

项目包含一个名为 `:testing-unit` 的 Gradle 模块，用于在其他 Gradle 模块间共享代码。如果代码在多个模块中使用，请将其添加到此模块。确保 `:testing-unit` 与 `:common` 等模块保持独立，以避免循环依赖。

## 使用 Android API 进行测试

对于代码与无法正确 mock 或 fake 的 Android API 交互的情况，项目包含 [Robolectric](https://robolectric.org/)。Robolectric 允许你在 JVM 环境中运行 Android 特定测试，避免了对模拟器的需要。

### 何时使用 Robolectric

* 当测试难以 mock 或 fake 的 Android API 时使用 Robolectric。
* 在可能的情况下，优先使用 Robolectric 而非 instrumentation tests，因为 instrumentation tests 需要更多资源且设置更复杂。

### 注意事项

* Robolectric 不与 JUnit 5 一起工作（请参见此 [issue](https://github.com/robolectric/robolectric/issues/3477)）。为解决此问题，项目包含了 JUnit 4 的依赖，用于需要 Robolectric 的测试。
* 确保被测代码不依赖于 Android API 的状态，因为这样可能导致不可靠的测试。如果情况如此，考虑编写[instrumented test](/developers/android/testing/integration_testing.md)。

## 单元测试最佳实践

* **与代码同步编写测试**：在开发时编写测试，确保代码可测试并降低 bug 风险。
* **聚焦行为**：测试代码的行为，而非其实现细节。
* **保持测试小而专注**：每个测试应验证单一行为或场景。
* **使用描述性测试名称**：测试名称应清晰描述测试的场景和预期结果。
* **Mock 外部依赖**：使用 mock 或 fake 来隔离被测代码。
* **避免过度测试**：除非对功能至关重要，否则不要为琐碎方法或内部实现细节编写测试。

## 示例：编写单元测试

以下是一个使用 JUnit 5 和 MockK 的结构性良好的单元测试示例：

```kotlin
@Test
fun `Given a valid user ID when fetching user details then return user data`() {
    // Given
    val userId = "12345"
    val expectedUser = User(id = userId, name = "John Doe")
    every { userRepository.getUser(userId) } returns expectedUser

    // When
    val result = userService.getUserDetails(userId)

    // Then
    assertEquals(expectedUser, result)
}
```
