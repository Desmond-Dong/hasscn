## 为什么要强制编码风格

我们的目标是维护一个**一致且标准的代码库**。通过强制编码风格：

* 我们减少了 PR 上不必要的评论，使审查者能够专注于逻辑而非格式。
* 我们确保代码更易于阅读和维护。

## 语言指南

* 所有代码必须使用**英文**编写。
* 避免拼写错误和语法错误。虽然错误是可以接受的（因为许多贡献者是非母语者），但鼓励审查者提出修正建议。
* 使用拼写检查器来辅助纠错。

## KTLint 格式化器

我们使用 [KTLint](https://pinterest.github.io/ktlint) 来强制 Kotlin 代码风格。它已集成到我们的 Gradle 模块中，并通过 `.editorconfig` 文件进行配置。

### 自定义规则

我们在必要时会覆盖部分 KTLint 规则。要启用或禁用某条规则：

1. 提交一个**专门的 PR**，并对变更进行适当说明。
2. 如果变更影响代码库，请创建**两个提交**：
   * 一个用于更新规则。
   * 另一个用于应用变更。

:::note
在 `.editorconfig` 文件中的覆盖规则上方添加注释，说明更改的原因。如果需要更多解释，可以链接到 GitHub issue。
:::

### 运行 KTLint

你可以通过 Gradle 使用 KTLint 自动重新格式化代码：

```bash
./gradlew :build-logic:convention:ktlintFormat ktlintFormat
```

### CI 集成

如果检测到 KTLint 错误，CI 将会失败，GitHub 会使用生成的 [SARIF](/developers/android/tips/sarif_reports.md) 报告以评论的形式将其报告到 PR 中。

## Yamllint

我们使用 [Yamllint](https://github.com/adrienverge/yamllint) 来强制 YAML 格式。仓库中所有 YAML 文件都遵循 `github` 格式。

### 运行 Yamllint

在仓库根目录运行以下命令来检查 YAML 格式：

```bash
yamllint --strict --format github .
```

:::note
Yamllint 不会重新格式化你的代码，它只会报告需要修复的错误。请使用 IDE 的代码格式化器或手动修复问题。
:::

### CI 集成

如果 YAML 格式无效，CI 将阻止该 PR。

## 避免使用 TODO

代码中的 TODO 往往会随着时间推移而被遗忘。当以后有人再读到它们时，通常已经过时或不相关了。我们建议避免在代码中使用 TODO。但是，如果在审查过程中你与审查者达成一致认为某事需要在以后处理，你应该创建一个 `TODO`。为了妥善跟踪 TODO，请始终将它们与 GitHub issue 关联。

### 示例

```bash
// TODO Missing feature https://github.com/home-assistant/android/issues/404
```

始终使用完整的 HTTP 链接引用 GitHub，切勿使用裸 `#404`——在 GitHub 之外，数字具有歧义且不可点击。链接到代码（文件或行）时，请使用永久链接（在 GitHub 上按 <kbd>y</kbd> 获取固定到提交的 URL），以确保链接在文件移动和编辑后依然有效。

## 常量

### 命名约定

我们遵循 [Kotlin 属性命名指南](https://kotlinlang.org/docs/coding-conventions.html#property-names)。

### 避免魔法数字和字符串

代码中的魔法数字或字符串会让人难以理解某个值的用途，导致可维护性差。请始终用命名常量替换魔法数字或字符串。

#### ❌ 不要这样做

```kotlin
if (value == 42) {
  // 执行某操作
}
```

在这个例子中，不清楚为什么要使用值 42。至少，你应该添加注释说明其用途。最好将其定义为常量，因为这样可以提供一个清晰、描述性的名称，使代码更易于阅读、理解和维护。此外，在一个地方定义值便于在代码库中复用，例如在测试中或函数、类或其他模块内。这种方法简化了未来的变更，因为在一个地方更新常量会自动将变更传播到所有使用它的地方。它还允许你通过 IDE 轻松找到常量使用的地方，避免像在整个代码库中搜索 "42" 那样产生不相关的搜索结果。

#### ✅ 应该这样做

```kotlin
// 关于为什么选择 42 的解释或链接
const val SUPER_IMPORTANT_THRESHOLD = 42

if (value == SUPER_IMPORTANT_THRESHOLD) {
    // 执行某操作
}
```

### 常量的组织

常量应当有组织地定义，以确保清晰、可维护性和一致性。请遵循以下指南来决定在哪里以及如何定义常量：

1. 如果常量暴露到文件之外，导入时应能通过其自身名称或其父级名称轻松识别它。
2. 大多数常量应定义在与其关联的类所在的同一文件中（如果可能，放在 `companion object` 之外）。
3. 如果某个文件中的常量过多，请将它们移动到专门的文件中，并在一个 `object` 下分组以提供命名空间。

:::note
这条指南是近期引入的，以标准化代码库中常量的使用。因此，你可能会遇到违反此指南的情况。在遇到这些问题时，请随时予以纠正，以帮助提高代码质量。
:::

#### 与类一起定义

对于与某个特定类紧密耦合的常量，在与该类相同的文件中定义它们。除非绝对必要，否则避免使用 `companion object`。相反，将私有常量放在文件顶部、类定义之外。这种方法减少了样板代码，并使类保持专注。

**示例：**

```kotlin
// filepath: UserRepository.kt
package io.homeassistant.companion.android.user

private const val DEFAULT_USER_ID = "guest"

class UserRepository {
    fun getUserById(userId: String = DEFAULT_USER_ID): User {
        // 实现代码
    }
}
```

:::note
如果你需要在测试中使用该常量，以避免将其暴露给生产代码的其他部分，请使用 `VisibleForTesting` 注解。

```kotlin
@VisibleForTesting
const val DEFAULT_USER_ID = "guest"
```

:::

#### 使用 companion object

何时使用 companion object：

* **为外部使用提供命名空间**: 当常量或工具函数必须被外部访问时（例如，public 或 internal）。
* **有意的命名冲突**: 当同一文件中的多个类或实体对概念上相似的常量使用相同名称时（例如，EMPTY、DEFAULT）。

**示例：**

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

#### 在专用文件中通过 object 定义

如果某个文件中的常量过多，或者常量在多个类或模块间共享，请将它们移动到专用文件中。使用 object 对相关的常量进行分组并提供命名空间。文件名后缀应为 `*Constants.kt`。

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
