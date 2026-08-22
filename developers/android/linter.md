## 什么是 linter？

Linter 是一种静态代码分析器，有助于识别代码中已知问题和潜在改进。它超越了编译器的功能，通过确保语言的正确使用和遵循最佳实践来实现这一点。编译器根据语法规则验证代码，而 linter 则专注于代码质量和架构。

:::note
Linter 没有提出任何意见并不意味着一切都完美。仍然需要另一位开发者的审查来再次确认。
:::

## 为什么要使用 linter？

使用 linter 可确保：

* **一致性**: 强制执行标准代码风格，类似于我们的 [编码风格](/developers/android/codestyle.md)。
* **专注**: 使审查者能够专注于逻辑，而不是格式或琐碎问题。
* **预防**: 通过捕获常见错误来帮助避免崩溃和 bug，例如使用了目标 Android API 级别不支持的 API。

例如，在使用不支持的 API 之前未检查 Android API 版本，可能会导致崩溃。

## 项目中使用的 Linter

### KTLint

我们使用 [KTLint](https://pinterest.github.io/ktlint) 作为我们的 Kotlin linter，通过 [Gradle 插件](https://github.com/JLLeitschuh/ktlint-gradle) 集成。配置位于主 `build.gradle.kts` 文件中。我们大多使用默认配置，但启用了 [SARIF](/developers/android/tips/sarif_reports.md) 报告，以便 GitHub Actions 在 pull request 中标注问题。

#### 忽略问题

请始终尝试修复问题，而不是忽略它们。如果必须忽略，请遵循以下步骤：

1. 对特定构造使用 `@Suppress` 注解：
   ```kotlin
   @Suppress("trailing-comma-on-call-site")
    fun myCallSiteExample() {
        myFunction(
            "value1",
            "value2", // 这个尾随逗号通常会引发警告
        )
    }
   ```

2. 对于项目范围的抑制，根据[此指南](https://pinterest.github.io/ktlint/0.49.1/faq/#how-do-i-globally-disable-a-rule-without-editorconfig) 更新 `.editorconfig` 文件。打开一个专门的 PR 并附上禁用该规则的说明：
   ```ini
   ...
   # Allow trailing commas but do not enforce it to follow Kotlin convention
   ktlint_standard_trailing-comma-on-call-site = disabled
   ij_kotlin_allow_trailing_comma_on_call_site = true
   ktlint_standard_trailing-comma-on-declaration-site = disabled
   ij_kotlin_allow_trailing_comma = true
   ```

#### 在本地运行 KTLint

运行以下命令以检查仓库中的所有代码：

```bash
./gradlew ktlintCheck :build-logic:convention:ktlintCheck --continue
```

:::note
使用 `--continue` 以获取 Gradle 模块中的所有问题，而不是在第一次失败时停止。
:::

你可以通过运行以下命令，将此检查添加为通过 git [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 自动运行的任务：

```bash
./gradlew addKtlintCheckGitPreCommitHook
```

### Android 检查器

Android linter 对所有变体启用，以确保全面检查。其配置位于 `build-logic/convention/src/main/kotlin/AndroidCommonConventionPlugin.kt`。会生成 SARIF 报告，以便 GitHub Actions 在 pull request 中标注问题。

#### 忽略问题

请遵循以下步骤来忽略问题：

1. 对特定构造使用 `@Suppress` 注解。
2. 将问题添加到 `lint-baseline.xml` 文件中。（参见 [如何操作](#updating-the-baseline)）
3. 直接在 lint 设置中禁用该问题。

如果你禁用了某个问题，请打开一个专门的 PR 并附上说明。

#### 在本地运行 Android linter

运行以下命令：

```bash
./gradlew lintDebug --continue
```

:::note
使用 `--continue` 以获取 Gradle 模块中的所有问题，而不是在第一次失败时停止。
:::

## 管理 lint 规则

### 更改问题的 lint 级别

Android linter 内置了预定义规则，打包在 Android Gradle 插件中。一些库（如 [Timber](https://github.com/JakeWharton/timber)）也提供自定义 lint 规则。

要更改规则的严重级别，请更新 `build-logic/convention/src/main/kotlin/AndroidCommonConventionPlugin.kt` 中的 Gradle 配置：

```kotlin
lint {
    ...
    disable += "MissingTranslation"
    error += "LogNotTimber"
}
```

* **`LogNotTimber`**: 从警告提升为错误，以强制使用 Timber 而非经典 logger。
* **`MissingTranslation`**: 已禁用，因为翻译只在 CI 发布构建时添加。

对 lint 级别的更改应通过 PR 进行，并附上清晰的说明。

## 基线管理

### 什么是基线？

基线是每个 Gradle 模块中的一个 XML 文件（`lint-baseline.xml`），列出了被忽略的错误。它在首次启用 linter 时创建，以避免修复数百个已存在的问题。

:::note
通过修复基线中的问题来移除它们，是一个极好的首次贡献。
:::

### 更新基线

在更新 Android Gradle Plugin 时，可能会产生新的 lint 问题，或现有问题会发生变化。要重新生成基线：

```bash
./gradlew updateLintBaseline
```

更新后，请审查被忽略的错误，以确定是现在就解决还是以后处理。根据需要打开 GitHub PR 或 issue。

## 扩展 lint 规则

我们鼓励你提出针对我们项目的特定 linter 规则。这些规则可以帮助识别 API 的误用或强制使用我们希望在项目中采用的设计模式。

### 项目中的自定义 lint 规则

一个专用的 Gradle 模块 `:lint` 包含了我们所有的自定义 lint 规则。

* **MissingSerializableAnnotationIssue**: 在使用 [Kotlinx.serialization](https://github.com/Kotlin/kotlinx.serialization) 时检测缺失的 `@Serializable` 注解。

## 对贡献者的建议

* 尽可能修复 lint 问题，而不是忽略它们。
* 在 PR 中为 lint 配置或基线的任何更改提供清晰的说明。
* 在本地使用 linter 尽早发现问题，并节省 CI 资源。

快乐 lint！ 🚀
