# 安卓代码风格

## 为什么要强制执行代码风格

我们的目标是维护**一致且标准的代码库**。通过强制执行代码风格：

* 我们减少对 PR 的不必要评论，让审阅者能够专注于逻辑而不是格式。
* 我们确保代码更容易阅读和维护。

## 语言指南

* 所有代码必须用**英语**编写。
* 避免拼写错误和错误。虽然错误是可以接受语法的（因为许多贡献者都是非母语人士），但鼓励审稿人提出更正确的建议。
* 使用语音检查器来帮助纠正错误。

## KTLint 清理程序

我们使用 [KTLint](https://pinterest.github.io/ktlint) 来强制 Kotlin 代码风格。它集成到我们的 Gradle 模块中并通过 `.editorconfig` 文件进行配置。

### 自定义规则

必要时我们会覆盖一些 KTLint 规则。要启用或禁用规则：

1. 提交**专用公关** 以及对更改的正确解释。
2. 如果更改影响代码库，请创建**提交两个**：
   * 一个用于更新规则。
   * 另一个用于应用更改。

:::note
在`.editorconfig`文件中被覆盖规则上面添加注释，解释了其更改原因。如果需要更多解释，您可以链接到GitHub问题。
:::

### 运行KTLint

您可以通过 Gradle 使用 KTLint 自动重新整理您的代码：

```bash
./gradlew :build-logic:convention:ktlintFormat ktlintFormat
```

### CI集成

如果检测到 KTLint 错误，CI 将失败，GitHub 将使用生成的 [SARIF](/developers/android/tips/sarif_reports.md) 报告将其作为 PR 中的评论进行报告。

## 亚姆林特

我们使用[Yamllint](https://github.com/adrienverge/yamllint)来强制执行YAML格式。存储库中的所有YAML文件均遵循`github`格式。

### 运行 Yamllint

在存储库的根目录运行以下命令来检查 YAML 格式：

```bash
yamllint --strict --format github .
```

:::note
Yamllint 不会重新清理您的代码；它只报告需要修复的错误。使用 IDE 的代码清理程序或手动修复问题。
:::

### CI集成

如果 YAML 格式无效，CI 将阻止 PR。

## 避免使用 TODO

随着时间的推移，代码中的 TODO 往往会被遗忘。当有人后来阅读它们时，它们通常已经过时或无关紧要。我们建议您避免在代码中使用 TODO。但是，如果在审阅过程中您和审阅者同意稍后需要解决某些问题，则应该创建`TODO`。要正确跟踪 TODO，请始终将它们与 GitHub 关联问题。

### 例子

```bash
// TODO Missing feature (linked issue #404)
```

## 帕

### 起源规定

我们遵循[Kotlin property naming guidelines](https://kotlinlang.org/docs/coding-conventions.html#property-names)。

### 避免魔术数字和字符串

代码中的幻数或字符串可能会导致难以理解值的用途，从而导致可维护性故障。始终用命名常量替换幻数或字符串。

#### ❌不要这样做

```kotlin
if (value == 42) {
  // Do something
}
```

在此示例中，尚坟为什么使用值 42。至少，您应该添加一条注释来解释目的。将其定义为常量甚至更好，因为它提供了描述的性名称，使代码更容易阅读、理解和维护。此外，在处定义有助于跨代码库重用，例如在测试中或在函数、类或其他模块内。这种方法简化了其未来的更改，因为在一个位置更新常量会自动将更改传播到任何使用它的位置。它还允许您轻松找到 IDE使用常量的位置，避免出现不相关的搜索结果，例如在整个代码库中搜索“42”。

#### ✅这样做

```kotlin
// Explanation or link about why we picked 42
const val SUPER_IMPORTANT_THRESHOLD = 42

if (value == SUPER_IMPORTANT_THRESHOLD) {
    // Do something
}
```

### 组织商标

常量的组织应确保清晰、可维护性和一致性。请遵循以下准则来确定在何处以及如何定义常量：

1. 如果常量暴露在文件外部，则在导入时应该可以通过其自身的名称或父级的名称轻松识别该常量。
2. 大多数常量应在与其关联的类相同的文件中定义（如果可能，在 `companion object` 之外）。
3. 如果文件中的常量太多，则将它们移动到`object`下一个分区的专用文件中以提供命名空间。

:::note
最近引入了该指南，以标准化整个代码库中常量的使用。因此，您可能会遇到违反此标准的情况。当您遇到这些问题时，请立即修正它们，以帮助代码质量。
:::

#### 侧面课程

对于与类紧密耦合的常量，承认它们定义在与该类相同的文件中。除非绝对必要，否则避免使用`companion object`。相反，其间常量放置在文件顶部、定义类之外。这种方法减少了样板代码并保持课程的重点。

@@格式0@@

```kotlin
// filepath: UserRepository.kt
package io.homeassistant.companion.android.user

private const val DEFAULT_USER_ID = "guest"

class UserRepository {
    fun getUserById(userId: String = DEFAULT_USER_ID): User {
        // Implementation here
    }
}
```

:::note
如果您在测试中需要常量穆斯林将其引入生产代码的其余部分，请使用`VisibleForTesting`注释。

```kotlin
@VisibleForTesting
const val DEFAULT_USER_ID = "guest"
```

:::

#### 使用附带对象

何时使用伴生对象：

* **提供外部使用的命名空间**：当必须从外部访问常量或实用函数时（例如，公共或内部）。
* **造成错误**：当相同文件中的多个类或实体对于概念上相似的常量共享相同的名称时（例如，EMPTY、DEFAULT）。

@@格式0@@

```kotlin
// filepath: ApiClient.kt
package io.homeassistant.companion.android.network

class RestApiClient {
    companion object {
        val DEFAULT_TIMEOUT = 60.seconds
    }
}

class WSClient {
    companion object {
        val DEFAULT_TIMEOUT = 10.seconds
    }
}
```

#### 在使用对象的专用文件中

如果文件中的常量过多，或者常量在多个类或模块之间共享，则将它们移动到专用文件中。使用对象对相关常量进行分组并提供命名空间。该文件应以`*Constants.kt` 为后缀。

```kotlin
// filepath: NetworkConstants.kt
package io.homeassistant.companion.android.network

object NetworkConstants {
    val TIMEOUT = 30.seconds
    const val BASE_URL = "https://api.example.com"
}

object WSConstants {
    val KEEP_ALIVE_INTERVAL = 5.seconds
}
```
