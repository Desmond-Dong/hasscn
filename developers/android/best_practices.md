# 安卓最佳实践

## 一般原则

我们应该遵循标准的开发原则，总体来说例如：

* **坚硬的**：单一职责、开放/封闭、里氏替换、接口隔离、依赖倒置。通过[Kotlin SOLID Principles Examples](https://medium.com/huawei-developers/kotlin-solid-principles-tutorial-examples-192bf8c049dd)了解更多信息
* **吻**：保持简单，傻瓜。
* **干**：不要重复自己
* **社区基准**：遵循[NowInAndroid](https://github.com/android/nowinandroid)存储库中展示的实践。

## 文档

代码中的文档应该随着代码库的发展而带来价值。请记住以下几点：

* **保持最新**：文档必须随着代码的更改而更新。
* **平衡评论**：避免过度评论，但不要忘记在必要时进行评论。
* **面向未来**：询问自己，*“我能理解我在 6 个月内做了什么？”*

:::info
文档应该有所帮助，而不是被阻碍。
:::

## 记录

日志记录很重要，但应严格使用。 正如 Jake Wharton 在他的 [Timber](https://github.com/JakeWharton/timber) 图书馆中所说：

> 你登录生产环境时，会有一只小狗终止。

* 避免生产中过度记录。
* 使用构造且有意义的日志消息。
* 利用木材等工具有效管理日志记录。

## 时间和持续时间

使用时间、日期或持续时间时，避免使用原始类型。相反，使用强类型来防止单位混乱。

:::note\[Example]

#### ❌不要这样做

```kotlin
const val THRESHOLD = 600000

fun main() {
    val now = System.currentTimeMillis()
    
    if (now > THRESHOLD) {
        // Do something
    }
}
```

#### ✅这样做

```kotlin
val THRESHOLD = Instant.ofEpochSecond(60)

fun main() {
    val now = Instant.now()

    if (now > THRESHOLD) {
        // Do something
    }
}
```

:::

:::warning
如果必须使用基本类型，请确保变量名称包含单位（例如`THRESHOLD_MS`而不是`THRESHOLD`）以减少歧义。
:::

* 对日期、持续时间和时钟应用的逻辑相同。
* 对于使用 `long`时间（例如，毫秒与秒）的 API，请加速将值转换为强类型，以最大程度地减少对非类型化单位的调用。

## 随机性

曼哈顿性很强烈，但需要仔细处理特区占地和补贴条件等问题。

### 协程范围

将您的协程与Android生命周期联系起来（例如`viewModelScope`或`lifecycleScope`）以防止内存泄漏。

### 访问

* 保证在协程外部访问的任何引用都是线程安全的。
* 如果引用不安全，或者设置安全，或者不使用它。
* 开发中存在的问题（如竞争条件）可能会随之而来，请仔细设计。

有关竞争条件的更多详细信息，请参阅[Race Condition](https://en.wikipedia.org/wiki/Race_condition#In_software)。

## 使用强类型而不是字符串进行逻辑

使用字符串来存储和显示文本，而不是控制代码中的逻辑或。依赖字符串进行逻辑（例如输入字符串来目的地确定或）可能会引入拼写错误等错误，整理或重构代码变得更加困难。相反，请使用强类型（例如`sealed`类，或者如果需要，使用`enum`）来表示这些概念。为来自第三方的原始值或UI显示保留字符串。如果必须使用字符串，则满足它们的定义为`const val`（遵循我们的[codestyle](/developers/android/codestyle.md#avoid-magic-numbers-and-strings)）或将它们包装在强类型中，例如[inline value class](https://kotlinlang.org/docs/inline-classes.html)。

:::note\[Example]

#### ❌避免这种模式

```kotlin
fun newInstance(destination: String): Intent {
    // Logic based on string value
    return Intent().apply {
        putExtra("destination", destination)
    }
}
```

#### ✅ 更喜欢这种方法

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
        Destination.General -> // Handle General
        Destination.Notifications -> // Handle Notifications
        Destination.Privacy -> // Handle Privacy
        null -> // Handle missing destination
    }
}
```

:::

对目标使用强类型有助于防止错误、改进代码导航重构更加可靠。当您将 `sealed` 类与 `when` 一起使用时，编译器可能会丢失的情况，并且您的 IDE 可以快速找到特定目标的所有手段，从而使更新和维护变得更加容易。

### 为什么密封类比枚举更好

密封类比枚举提供了更大的灵活性和安全性。使用密封类，您可以定义具有自己属性的子类，从而允许您根据散热器类型的需要提供附加数据。这使您的API具有更强的性能和易用性。

例如，如果`Notifications`目标需要`title`参数，请按以下方式定义：

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
        Destination.General -> // Handle General
        is Destination.Notifications -> {
            val title = destination.title
            // Handle Notifications with title
        }
        Destination.Privacy -> // Handle Privacy
        null -> // Handle missing destination
    }
}
```

:::note
当您将`when`与密封类一起使用时，请避免添加`else`分支。这确保了如果您添加新的情况，编译器将要求您处理它，从而使您的代码更安全且更易于维护。
:::

通过使用密封类，您可以安全地添加新的目标类型及其自己的必填字段，并且编译器将强制处理所有情况。与使用枚举或字符串进行逻辑控制相比，这种方法使您的代码更加健壮、可维护且不易出错。

在[Kotlin documentation](https://kotlinlang.org/docs/sealed-classes.html)上阅读有关密封修饰符的更多信息。

## 代码组织

### 保持小班授课

* 大类通常有太多的职责，使得它们更难以审查、测试和维护。
* 以小班为目标，适当分离关注点和抽象。

### 让你的函数小而有意义

* 任务应该集中于单一职责。
* 函数的名称应该清楚地描述它的作用。如果很难命名，则该函数可能做了太多的事情。
* 调用良好的小函数可以减少对文档的需求，净化代码不言自明。

:::note
命名很困难，但是较小的函数可以更轻松地选择有意义的名称。
:::

## 保持公关较小

* **为什么？** 较小的 PR 更容易审查、减少延迟并最大限度地减少失望感。
* **怎么办？** 将大的重组划分为更小的逻辑块。

有关更多详细信息，请参阅[submit](/developers/android/submit.md)。

## 依赖注入（DI）

我们使用依赖注入（DI）来帮助编写自定义、可测试和可的代码。通过使用 DI，我们可以将类相互依赖关系解耦，从而更容易地交换实现、编写单元测试和管理复杂的对象图。DI 还提高了代码的必然性并有助于实施单一职责原则。

### 在`@Named`上使用显式限定符注释

当需要注入相同类型（或基本类型）的多个实现时，必须使用限定符来区分它们。虽然`@Named`注释是一种常见方法，但它依赖于字符串标识符，这可能容易出错且难以重构。使用自定义限定符注释代替`@Named`具有以下几个优点：

* **可发现性**：自定义限定符可以更轻松地查找代码库中使用特定依赖项的位置。
* **可重构性**：重命名自定义注释既简单又安全，而更改字符串标识符则需要搜索所有字符串用法。
* **类型安全**：在编译时检查自定义注释，降低字符串可能出现的拼写错误或不匹配的风险。
* **报表**：自定义限定符使代码不再言明，更容易理解。

:::note\[Example]

#### ❌不要这样做

```kotlin
@Inject
@Named("keyChainRepository")
lateinit var keyChainRepository: KeyChainRepository
```

#### ✅这样做

```kotlin
@Inject
@NamedKeyChain
lateinit var keyChainRepository: KeyChainRepository
```

类似这样定义注释：

```kotlin
package io.homeassistant.companion.android.common.data.keychain

import javax.inject.Qualifier

/**
 * Qualifier for the [KeyChainRepository] used to select the key chain.
 */
@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class NamedKeyChain
```

:::

有关从`@Named("keyChainRepository")`迁移到`@NamedKeyChain`的实际示例，请参阅[this pull request](https://github.com/home-assistant/android/pull/5667)。

## 快速失败

开发问题很难。注意错误，即使是那些您认为不太可能发生的错误。始终致力于构建时而不是运行时捕获错误。初步使用 Kotlin 编译器功能，如果无法在编译时强制执行检查，请考虑添加 [lint rule](/developers/android/linter.md)。

### 使用 Kotlin 编译器

Kotlin 编译器可以帮助您及早发现问题。例如，将`when` 符号与`sealed` 类/接口一起使用可确保处理所有情况。

:::note
设计类时请支持[composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)。组合允许您从更简单、可重用的组件构建复杂的行为，而不是依赖严格的类层次结构，从而产生更灵活、可维护和可测试的代码。
:::

@@格式0@@

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

如果您添加一个实现`Shape`的新类，编译器将无法构建，您直到处理新的情况。当整个代码库使用该接口时，这尤其有用。请注意，这仅在不添加`else`分支时才有效。

### 不要默默地忽视异常

虽然捕获异常对于防止崩溃很重要，但默默地他们可能会隐藏隐藏层次的问题并使调试变得更加困难。例如，考虑一个需要使用 API 密钥进行初始化的第三方库。如果初始化失败并且在没有适当日志记录的情况下查询异常，那么在某些内容停止工作时确定根本原因可能会很困难。

@@格式0@@

```kotlin
fun foo() {
    
    // Always catch the error and proceed with fallback value
    val value = try {
        ExternalThirdPartyJavaAPI.value()    
    } catch (e: Exception) {
        // Fortunately we log the error to help with troubleshooting
        Timber.w(e, "Couldn't get ExternalThirdParty value, current state: ${ExternalThirdPartyJavaAPI.state()}")
        "fallback"
    }
}
```

正确的日志记录可确保用户和开发人员能够发现日志中的错误并有效报告问题。

要进一步改进开发过程中的错误处理，请使用 `FailFast` API。此 API 通过在发生错误时使 `debug` 风格的应用程序崩溃来应用攻击性编程原则，从而使问题在开发过程的早期更加明显。

@@格式0@@

```kotlin
import io.homeassistant.companion.android.common.util.FailFast

fun foo() {

    // In case of a failure, this will print a message and stack trace to the logs. In debug builds, it
    // will also crash the app, while in production it will use the fallback value instead of crashing.
    val value = FailFast.failOnCatch(
        message = { "Couldn't get ExternalThirdParty value, current state: ${ExternalThirdPartyJavaAPI.state()}" },
        fallback = "fallback",
    ) {
        ExternalThirdPartyJavaAPI.value()
    }
}
```

通过快速失败并清晰地记录错误，您可以更轻松地识别、
在问题投入生产之前进行调试和修复。

当 FailFast API 被触发时，它会生成清晰的日志队列，易于发现和调查：

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
