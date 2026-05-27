# 开发者游乐场

## 为什么是开发者游乐场？

该应用程序严重依赖于 WebView 和与服务器的活动连接，这使得在开发过程中快速测试功能变得具有挑战性。通常，您可能需要多次重建应用程序以测试特定行为。虽然 **撰写预览** 功能可以帮助进行 UI 测试，但有时它们还不够，需要您完成整个 UX 流程，这可能会很乏味。

为了节省开发时间，我们创建了**开发者游乐场**。这个游乐场只能在调试版本中通过应用程序[shortcut](https://developer.android.com/develop/ui/views/launch/shortcuts/creating-shortcuts#static)访问。这确保它不会干扰应用程序的其余部分。

:::note
Playground 代码位于 `app/src/debug` sourceSet 中。
:::

您可以根据需要自由使用游乐场，但只有在为其他开发人员提供价值时才提交更改。对 Playground 进行更改时，请确保遵循 [codestyle](/developers/android/codestyle.md) 和 [best practices](/developers/android/best_practices.md)。然而，可以省略翻译。

### 有价值贡献的例子

* 一种故意使应用程序崩溃以测试缓存文件夹中的错误报告的方法。
* 一个显示应用程序中使用的所有组件和主题的工具。
