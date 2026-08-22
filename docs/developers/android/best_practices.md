---
title: "Android 最佳实践"
sidebar_label: "最佳实践"
---

## 通用原则

总体而言，我们应当遵循标准开发原则，例如：

- **SOLID**: 单一职责、开闭原则、里氏替换、接口隔离、依赖倒置。了解更多请参阅 [Kotlin SOLID Principles Examples](https://medium.com/huawei-developers/kotlin-solid-principles-tutorial-examples-192bf8c049dd)
- **KISS**: Keep It Simple, Stupid。
- **DRY**: Don't Repeat Yourself
- **社区指南**: 遵循 [NowInAndroid](https://github.com/android/nowinandroid) 仓库中展示的实践。
- **保持直接**: 不要为了单个实现或假设性的未来需求而引入抽象。直接使用经过验证的库或 API，只有在出现第二个真实用例时才进行抽象，或者用于隐藏某模块内部的实现细节（例如，在 `common` 中定义一个 public 接口，其 `internal` 实现通过 DI 绑定）。同样，不要存储那些可以从现有状态推导出的值。
- **先找根因再修复**: Bug 修复应说明实际原因以及如何复现。避免用猜测性的变通方法去修补症状。

## 文档

代码中的文档应当具有价值，并随代码库一起演进。请注意以下几点：

- **保持更新**: 文档必须随代码变更而更新。
- **平衡注释**: 避免过度注释，但也不要忘记在必要时添加注释。
- **面向未来**: 问自己，*“6 个月后我还看得懂自己做过的东西吗？”*

:::info
文档应该提供帮助，而不是造成阻碍。
:::

## 日志记录

日志记录至关重要，但应谨慎使用。正如 Jake Wharton 在他的 [Timber](https://github.com/JakeWharton/timber) 库中所说：

> 每次在生产环境中记录一条日志，就有一只小狗死去。

- 避免在生产环境中过度记录日志。
- 使用结构化、有意义的日志消息。
- 借助 Timber 等工具有效管理日志记录。

## 时间与时长

在处理时间、日期或时长时，避免使用基本类型。取而代之，应使用强类型以避免单位混淆。

:::note[示例]

#### ❌ 不要这样做

```kotlin
const val THRESHOLD = 600000

fun main() {
    val now = System.currentTimeMillis()

    if (now > THRESHOLD) {
        // 执行某操作
    }
}
```

#### ✅ 应该这样做

```kotlin
val THRESHOLD = Instant.ofEpochSecond(60)

fun main() {
    val now = Instant.now()

    if (now > THRESHOLD) {
        // 执行某操作
    }
}
```

:::

:::warning
如果必须使用基本类型，请确保变量名中包含单位（例如，使用 `THRESHOLD_MS` 而非 `THRESHOLD`），以减少歧义。
:::

- 对日期、时长和时间戳应用同样的逻辑。
- 对于使用 `long` 表示时间戳的 API（例如，毫秒与秒的区别），应尽快将值转换为强类型，以尽量减少暴露于无类型单位的风险。

## 并发

并发功能强大，但需要谨慎处理，以避免内存泄漏和竞态条件等问题。

### Coroutine 作用域

将你的协程绑定到 Android 生命周期（例如，`viewModelScope` 或 `lifecycleScope`），以防止内存泄漏。

### 并发访问

- 确保在协程外部访问的任何引用都是线程安全的。
- 如果某个引用不安全，要么使其安全，要么不要使用它。
- 调试并发问题（例如，竞态条件）可能极其困难，因此请仔细设计。

关于竞态条件的更多细节，请参阅 [Race Condition](https://en.wikipedia.org/wiki/Race_condition#In_software)。

## 使用强类型而非字符串来控制逻辑

字符串应用于存储和显示文本，而不是用于控制代码中的逻辑或行为。依赖字符串来控制逻辑——例如传递一个字符串来决定目标页面或行为——可能会引入拼写错误等错误，并使代码更难以追踪或重构。相反，请使用强类型（例如 `sealed` 类，或在必要时使用 `enum`）来表示这些概念。将字符串保留用于第三方来源的原始值或 UI 显示。如果必须使用字符串，请将其定义为 `const val`（遵循我们的 [编码风格](/developers/android/codestyle#avoid-magic-numbers-and-strings)），或将其包装在强类型中，例如 [inline value class](https://kotlinlang.org/docs/inline-classes.html)。

:::note[示例]

#### ❌ 避免这种模式

```kotlin
fun newInstance(destination: String): Intent {
    // 基于字符串值的逻辑
    return Intent().apply {
        putExtra("destination", destination)
    }
}
```

#### ✅ 优先采用这种方案

```kotlin
private const val DESTINATION_KEY = "destination"

@Parcelize
sealed interface Destination : Parcelable {
    data object General : Destination
    data object Notifications : Destination
    data object Privacy : Destination
}

fun newInstance(destination: Destination): Intent {
    return Intent().apply {
        putExtra(DESTINATION_KEY, destination)
    }
}

fun onIntent(intent: Intent) {
    val destination = IntentCompat.getParcelableExtra(intent, DESTINATION_KEY, Destination::class.java)
    when (destination) {
        Destination.General -> // 处理 General
        Destination.Notifications -> // 处理 Notifications
        Destination.Privacy -> // 处理 Privacy
        null -> // 处理缺失的 destination
    }
}
```

:::

对目标页面使用强类型有助于防止错误、改善代码导航，并使重构更加可靠。使用 `sealed` 类配合 `when` 时，编译器可以捕获缺失的分支，IDE 也能快速定位某个特定目标的所有用法，从而使更新和维护更加轻松。

### 为什么 sealed 类比 enum 更好

Sealed 类比 enum 提供了更大的灵活性和安全性。使用 sealed 类，你可以定义带有自己属性的子类，从而为每种类型传递所需的数据。这使得你的 API 更具表达力和适应性。

例如，如果 `Notifications` 目标需要一个 `title` 参数，可以这样定义：

```kotlin

private const val DESTINATION_KEY = "destination"

@Parcelize
sealed interface Destination : Parcelable {
    data object General : Destination
    data class Notifications(val title: String) : Destination
    data object Privacy : Destination
}

fun onIntent(intent: Intent) {
    val destination = IntentCompat.getParcelableExtra(intent, DESTINATION_KEY, Destination::class.java)
    when (destination) {
        Destination.General -> // 处理 General
        is Destination.Notifications -> {
            val title = destination.title
            // 使用 title 处理 Notifications
        }
        Destination.Privacy -> // 处理 Privacy
        null -> // 处理缺失的 destination
    }
}
```

:::note
当你在 sealed 类上使用 `when` 时，请避免添加 `else` 分支。这样可以确保当你新增一个分支时，编译器会要求你处理它，使代码更安全、更易于维护。
:::

通过使用 sealed 类，你可以安全地添加带有各自必需字段的新目标类型，编译器会强制要求处理所有分支。这种方法比使用 enum 或字符串来控制逻辑更加健壮、更易维护，且不容易出错。

有关 sealed 修饰符的更多信息，请参阅 [Kotlin 文档](https://kotlinlang.org/docs/sealed-classes.html)。

## 代码组织

### 保持类小巧

- 大型类往往承担了过多职责，导致难以审查、测试和维护。
- 目标是小类，并实现适当的关注点分离和抽象。

### 保持函数小巧且有意义

- 函数应当小巧，专注于单一职责。
- 函数名应清晰描述其功能。如果很难命名，说明该函数可能做了太多事情。
- 命名良好的小函数可以减少文档需求，使代码自解释。

:::note
命名很困难，但更小的函数使你更容易选择有意义的名称。
:::

## 保持 PR 小巧

- **为什么？** 较小的 PR 更易于审查、减少延迟并降低挫败感。
- **怎么做？** 将大型变更拆分为小而可合并的步骤，使应用在每一步都能正常运行。如果重构的工作太大，无法通过一个小型 PR 一次性完成，请将新路径隐藏在 `WIPFeature` 对象的标志后面，这样你仍可以以小步合并，而用户则继续使用旧路径：在那里添加一个标志（通常仅在 debug 构建中通过 `BuildConfig.DEBUG` 启用），用它在新路径与旧路径之间切换，并在功能完全发布后将其移除。

更多细节请参阅 [submit](/developers/android/submit)。

## 依赖注入 (DI)

我们使用依赖注入 (DI) 来帮助编写模块化、可测试且可维护的代码。通过使用 DI，我们可以将类与其依赖项解耦，从而使切换实现、编写单元测试和管理复杂的对象图变得更加容易。DI 还能提高代码可读性，并帮助执行单一职责原则。

### 使用显式限定注解而非 `@Named`

当你需要注入同一类型的多个实现（或基本类型）时，必须使用限定符来区分它们。虽然 `@Named` 注解是一种常见方法，但它依赖于字符串标识符，容易出错且难以重构。使用自定义限定注解而非 `@Named` 具有多项优势：

- **可发现性**: 自定义限定符使在代码库中查找某个特定依赖项的使用位置更加容易。
- **可重构性**: 重命名自定义注解简单且安全，而修改字符串标识符则需要搜索所有字符串使用位置。
- **类型安全**: 自定义注解在编译时进行检查，减少了字符串出现拼写错误或匹配错误的可能性。
- **清晰性**: 自定义限定符使代码更自解释、更易于理解。

:::note[示例]

#### ❌ 不要这样做

```kotlin
@Inject
@Named("keyChainRepository")
lateinit var keyChainRepository: KeyChainRepository
```

#### ✅ 应该这样做

```kotlin
@Inject
@NamedKeyChain
lateinit var keyChainRepository: KeyChainRepository
```

定义注解如下：

```kotlin
package io.homeassistant.companion.android.common.data.keychain

import javax.inject.Qualifier

/**
 * [KeyChainRepository] 的限定符，用于选择 key chain。
 */
@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class NamedKeyChain
```

:::

有关从 `@Named("keyChainRepository")` 迁移到 `@NamedKeyChain` 的真实示例，请参阅 [这个 pull request](https://github.com/home-assistant/android/pull/5667)。

## 快速失败 (Fail fast)

开发进度越深，调试问题就越困难。不要忽略错误，即使是你认为不太可能发生的错误。始终力求在构建时捕获错误，而不是在运行时。尽可能使用 Kotlin 编译器特性，如果无法在编译时强制进行检查，请考虑添加 [lint 规则](/developers/android/linter)。

当同一个问题在审查中反复出现时，请将约定编码到工具中（自定义 [lint 规则](/developers/android/linter)、KTLint 覆盖、`FailFast` 检查或测试监听器），而不是依赖每个人记住它。

### 利用 Kotlin 编译器

Kotlin 编译器可以帮助你尽早发现问题。例如，在 `sealed` 类/接口上使用 `when` 运算符可以确保所有分支都被处理。

:::note
在设计类时，优先考虑[组合优于继承](https://en.wikipedia.org/wiki/Composition_over_inheritance)。组合允许你从更简单、可复用的组件构建复杂行为，而不是依赖于僵化的类层级，从而生成更灵活、更易于维护且更易于测试的代码。
:::

**示例：**

```kotlin
sealed interface Shape {
    class Rectangle: Shape
    class Oval: Shape
}

fun foo(shape: Shape) {
    when(shape) {
        is Shape.Oval -> TODO()
        is Shape.Rectangle -> TODO()
    }
}
```

如果你添加了一个新的实现 `Shape` 的类，编译器将会构建失败，直到你处理该新分支为止。当接口在代码库中被广泛使用时，这一点特别有用。请注意，只有在不添加 `else` 分支时，这种机制才有效。

### 不要静默忽略异常

虽然捕获异常以防止崩溃很重要，但静默忽略它们可能会掩盖更深层次的问题，并使调试更加困难。例如，考虑一个需要用 API key 进行初始化的第三方库。如果初始化失败且异常被捕获但没有适当记录，那么当某些功能停止工作时，就很难识别根本原因。

**示例：**

```kotlin
fun foo() {

    // 始终捕获错误并继续执行回退值
    val value = try {
        ExternalThirdPartyJavaAPI.value()
    } catch (e: Exception) {
        // 幸运的是我们记录了错误以便排查问题
        Timber.w(e, "Couldn't get ExternalThirdParty value, current state: ${ExternalThirdPartyJavaAPI.state()}")
        "fallback"
    }
}
```

适当的日志记录可确保用户和开发者能够在日志中发现错误，并有效报告问题。

为了进一步改善开发过程中的错误处理，请使用 `FailFast` API。该 API 遵循进攻性编程原则，在发生错误时使 `debug` 风味（flavor）的应用崩溃，从而让问题在开发早期阶段更加可见。

**示例：**

```kotlin
import io.homeassistant.companion.android.common.util.FailFast

fun foo() {

    // 如果发生失败，将在日志中打印消息和堆栈跟踪。在 debug 构建中，
    // 它还会使应用崩溃；而在生产环境中，它将使用回退值而非崩溃。
    val value = FailFast.failOnCatch(
        message = { "Couldn't get ExternalThirdParty value, current state: ${ExternalThirdPartyJavaAPI.state()}" },
        fallback = "fallback",
    ) {
        ExternalThirdPartyJavaAPI.value()
    }
}
```

通过快速失败并清晰地记录错误，你可以在问题到达生产环境之前更容易地识别、调试并修复问题。

当 FailFast API 被触发时，它会生成一条清晰可见的日志条目，便于发现和调查：

```log
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  ██████████████████████
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  !!! CRITICAL FAILURE: FAIL-FAST !!!
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  ██████████████████████
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  An unrecoverable error has occurred, and the FailFast mechanism
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  has been triggered. The application cannot continue and will now exit.
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  ACTION REQUIRED: This error must be investigated and resolved.
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  Review the accompanying stack trace for details.
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  ----------------------------------------------------------------
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  io.homeassistant.companion.android.common.util.FailFastException: Couldn't get ExternalThirdParty value, current state: null
2025-06-12 10:53:20.841 29743-29743 CrashFailFastHandler    io....stant.companion.android.debug  E  	at io.homeassistant.companion.android.developer.DevPlaygroundActivityKt.DevPlayGroundScreen$lambda$14$lambda$13$lambda$12(DevPlaygroundActivity.kt:80)
```
