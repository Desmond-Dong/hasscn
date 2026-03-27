---
title: "Jetpack Compose 入门"
description: '要在应用程序中创建新屏幕并快速迭代，请按照以下步骤操作：。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: "Jetpack 组合 101"
---
# Jetpack Compose 入门

## 如何在现有应用中创建新屏幕并快速迭代

要在应用程序中创建新屏幕并快速迭代，请按照以下步骤操作：

1. @@格式0@@：
为您的 Compose UI 屏幕创建专用的 Kotlin 文件。使用 `@Preview` 注释在 IDE 中启用预览功能。这也使得屏幕与[screenshot testing](/developers/android/testing/screenshot_testing)兼容。

2. @@格式0@@：
第一次构建应用程序后，导航到您的屏幕。 Jetpack Compose 提供开箱即用的热重载功能，让您可以实时查看更改。但请注意，存在一些限制，例如无法重新加载对某些结构元素的更改。

3. @@格式0@@：
使用多个`@Preview`注释来测试不同配置下的屏幕（例如，亮/暗模式、不同的屏幕尺寸）。这有助于确保您的 UI 很好地适应各种场景。

## 主题/设计系统

我们使用自定义 Compose 主题`io.homeassistant.companion.android.util.compose.HomeAssistantAppTheme`，它基于[Material Design 2](https://m2.material.io/)。您必须使用此主题来确保与应用程序的整体 UI 保持一致。

### 要点

- **材料设计2**：主题遵循 Material Design 2 原则，确保外观和感觉具有凝聚力。
- **定制组件**：如果您需要创建自定义组件，请确保它们与现有主题和设计系统保持一致。
- **深色模式支持**：主题支持浅色和深色模式。在两种模式下测试您的屏幕以确保正确的样式。

## 使用 Jetpack Compose 的最佳实践

- **保持 UI 代码模块化**：将您的 UI 分解为小的、可重用的可组合项。这提高了可读性并使测试更容易。
- **使用状态提升**：遵循[state hoisting pattern](https://developer.android.com/jetpack/compose/state#state-hoisting)有效管理状态。这可确保您的可组合项保持无状态且可重用。
- **使用预览进行测试**：使用`@Preview` 注释来单独测试您的可组合项。添加参数来模拟不同的状态和配置。
- **遵循无障碍指南**：通过提供有意义的内容描述并使用辅助工具进行测试，确保您的 UI 易于访问。
- **使用风格**：对文本组件应用适当的样式。

## 示例：创建一个新屏幕

以下是如何创建带有预览的新 Compose 屏幕的示例：

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
