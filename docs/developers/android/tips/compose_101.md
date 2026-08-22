---
title: "Jetpack Compose 101"
sidebar_label: "Jetpack Compose 101"
---

## 如何在现有应用中创建新的 screen 并快速迭代

要在应用中创建新的 screen 并快速迭代，请遵循以下步骤：

1. **提取 Compose UI screen**：
   为你的 Compose UI screen 创建一个专用的 Kotlin 文件。使用 `@Preview` 注解以在 IDE 中启用预览功能。这也能使 screen 与[截图测试](/developers/android/testing/screenshot_testing)兼容。

2. **利用 hot reload**：
   首次构建应用后，导航到你的 screen。Jetpack Compose 原生提供 hot reload 能力，允许你实时查看更改。但请注意存在一些限制，例如无法重新加载某些结构性元素的更改。

3. **有效使用预览**：
   使用多个 `@Preview` 注解来在不同配置下测试你的 screen（例如，浅色/深色模式、不同的屏幕尺寸）。这有助于确保你的 UI 能很好地适应各种场景。

## 主题/设计系统

我们使用自定义 Compose 主题 `io.homeassistant.companion.android.util.compose.HomeAssistantAppTheme`，基于 [Material Design 2](https://m2.material.io/)。你必须使用此主题以确保与应用整体 UI 的一致性。

### 关键点

- **Material Design 2**：该主题遵循 Material Design 2 原则，确保统一的视觉和体验。
- **自定义组件**：如果你需要创建自定义组件，请确保它们与现有主题和设计系统保持一致。
- **深色模式支持**：该主题同时支持浅色和深色模式。请在两种模式下测试你的 screen 以确保正确的样式。

## 使用 Jetpack Compose 的最佳实践

- **保持 UI 代码模块化**：将 UI 分解为小型、可复用的 composable。这提高了可读性，并使测试更容易。
- **使用 state hoisting**：遵循[state hoisting 模式](https://developer.android.com/jetpack/compose/state#state-hoisting)以有效管理状态。这确保你的 composable 保持无状态且可复用。
- **使用预览进行测试**：使用 `@Preview` 注解以隔离测试你的 composable。添加参数来模拟不同的状态和配置。
- **遵循无障碍指南**：通过提供有意义的 content description 并使用无障碍工具测试，确保你的 UI 是无障碍的。
- **使用样式**：为文本组件应用适当的样式。

## 示例：创建新的 screen

以下是如何创建一个带预览的 Compose screen 的示例：

```kotlin
// filepath: /path/to/your/screen/MyNewScreen.kt

@Composable
fun MyNewScreen(
    title: String,
    onButtonClick: () -> Unit
) {
    HomeAssistantAppTheme {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = title, style = MaterialTheme.typography.h4)
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = onButtonClick) {
                Text(text = "Click Me")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MyNewScreenPreview() {
    MyNewScreen(
        title = "Welcome to Home Assistant",
        onButtonClick = {}
    )
}
```
