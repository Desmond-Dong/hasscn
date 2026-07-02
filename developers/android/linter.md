# 安卓代码检查指南

## 什么是短绒棉？

linter 是一种静态代码分析器，可帮助识别代码中的引人注目的问题和潜在的改进。它通过确保正确使用语言并遵守最佳实践来超越编译器的作用。编译器根据语法验证代码，而 linter 则侧重于代码质量和架构。

:::note
没有来自 linter 的抱怨并不意味着一切都是完美的。仍然需要另一位开发人员的审查来进行双重检查。
:::

## 为什么要使用linter？

使用linter可确保：

* **一致性**：强制执行标准代码风格，类似于我们的[codestyle](/developers/android/codestyle.md)。
* **焦点**：允许审阅者专注于逻辑而不是格式或处理碎片问题。
* **预防**：通过发现常见错误（例如使用目标Android API级别不支持的API）来帮助避免崩溃和错误。

例如，在使用不受支持的 API 之前未能检查 Android API 版本可能会导致崩溃。

## 项目中使用的Linter

### KTLint

我们使用 [KTLint](https://pinterest.github.io/ktlint) 作为 Kotlin linter，通过 [Gradle plugin](https://github.com/JLLeitschuh/ktlint-gradle) 集成。配置位于主`build.gradle.kts` 文件中。我们主要使用默认配置，但为 GitHub Actions 启用 [SARIF](/developers/android/tips/sarif_reports.md) 报告来注释拉取请求中的问题。

#### 忽略一个问题

始终尝试解决问题而不是忽略它们。如果需要，请按照以下步骤操作：

1. 对构造特定使用`@Suppress`注释：
   ```kotlin
   @Suppress("trailing-comma-on-call-site")
    fun myCallSiteExample() {
        myFunction(
            "value1",
            "value2", // This trailing comma would normally cause a warning
        )
    }
   ```

2. 对于项目范围的抑制，请按照[this guide](https://pinterest.github.io/ktlint/0.49.1/faq/#how-do-i-globally-disable-a-rule-without-editorconfig)更新`.editorconfig`文件。打开一个专门的PR，其中包含取消该规则的说明：
   ```ini
   ...
   # Allow trailing commas but do not enfoce it to follow Kotlin convention
   ktlint_standard_trailing-comma-on-call-site = disabled
   ij_kotlin_allow_trailing_comma_on_call_site = true
   ktlint_standard_trailing-comma-on-declaration-site = disabled
   ij_kotlin_allow_trailing_comma = true
   ```

#### 本地运行 KTLint

运行以下命令检查存储库中的所有代码：

```bash
./gradlew ktlintCheck :build-logic:convention:ktlintCheck --continue
```

:::note
使用`--continue`获取Gradle模块中的所有问题，而不是在第一次失败时停止。
:::

您可以通过运行此命令来添加此检查以通过 git [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 自动运行

```bash
./gradlew addKtlintCheckGitPreCommitHook
```

### Android 短绒

Android linter 已针对所有变体启用，以确保全面检查。其配置位于`build-logic/convention/src/main/kotlin/AndroidCommonConventionPlugin.kt`。为 GitHub Actions 生成 SARIF 报告，以注释拉取请求中的问题。

#### 忽略一个问题

请按照以下步骤忽略问题：

1. 对构造特定使用`@Suppress`注释。
2. 将问题添加到`lint-baseline.xml`文件。 （参见[how to](#updating-the-baseline)）
3. 直接在 lint 设置中取消该问题。

如果您忽略某个问题，请打开一个专门的 PR 并进行解释。

#### 在本地运行 Android linter

运行以下命令：

```bash
./gradlew lintDebug --continue
```

:::note
使用`--continue`获取Gradle模块中的所有问题，而不是在第一次失败时停止。
:::

## 管理 lint 规则

### 更改问题的 lint 级别

Android linter 附带了一系列到 Android Gradle 插件中的预定义规则。一些库，例如 [Timber](https://github.com/JakeWharton/timber)，还提供自定义 lint 规则。

要更改规则的严重性，请更新 `build-logic/convention/src/main/kotlin/AndroidCommonConventionPlugin.kt` 中的 Gradle 配置：

```kotlin
lint {
    ...
    disable += "MissingTranslation"
    error += "LogNotTimber"
}
```

* **@@保护0@@**：从警告升级为错误，以强制使用Timber而不是经典记录器。
* **@@保护0@@**：已禁用，因为仅在 CI 发布版本期间添加翻译。

应在 PR 中对 lint 级别进行更改并提供明确的解释。

## 基线管理

### 什么是核心？

基线是每个 Gradle 模块中的 XML 文件 (`lint-baseline.xml`)，其中列出了忽略的错误。它是在首次启用 linter 时创建的，小区修复了数百个预先存在的问题。

:::note
第一个伟大的贡献是通过修复问题来消除核心问题。
:::

### 更新基线

更新 Android Gradle 插件时，可能会出现新的 lint 问题，或者现有的问题可能会发生变化。重新生成核心：

```bash
./gradlew updateLintBaseline
```

更新后，检查忽略的错误是否应立即解决或稍后解决。根据需要打开 GitHub PR 或问题。

## 扩展 lint 规则

我们鼓励您针对我们的项目提出新的linter规则。这些规则可以帮助识别API的盗版或强制执行我们希望在项目中使用的设计模式。

### 项目中自定义 lint 规则

专用的Gradle模块`:lint`包含我们所有的自定义lint规则。

* **缺少序列化注释问题**：使用[Kotlinx.serialization](https://github.com/Kotlin/kotlinx.serialization)时检测丢失的`@Serializable`注释。

## 给贡献者的提示

* 修复 lint 问题，无需关心它们。
* 在 PR 中对 lint 配置或主板的任何更改提供清晰的解释。
* 在本地使用 linter 可以及早发现问题并节省 CI 资源。

快乐的棉绒！🚀
