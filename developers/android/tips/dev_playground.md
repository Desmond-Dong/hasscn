## 为什么需要 developer playground？

该应用严重依赖 WebView 和与服务器的活跃连接，这使得在开发过程中快速测试功能变得困难。通常，你可能需要多次重建应用来测试特定行为。虽然**Compose preview**功能可以帮助进行 UI 测试，但有时它们并不充分，需要走完整个 UX 流程，这可能会很繁琐。

为节省开发时间，我们创建了一个**developer playground**。这个 playground 仅在 debug 构建中可通过应用[快捷方式](https://developer.android.com/develop/ui/views/launch/shortcuts/creating-shortcuts#static)访问。这确保它不会干扰应用的其他部分。

:::note
playground 代码位于 `app/src/debug` sourceSet 中。
:::

你可以根据需要使用 playground，但只有在对其他开发者有价值时才提交更改。在向 playground 提交更改时，请确保遵循[编码风格](/developers/android/codestyle.md)和[最佳实践](/developers/android/best_practices.md)。不过，翻译可以省略。

### 有价值贡献的示例

* 一种故意使应用崩溃以测试缓存文件夹中错误报告的方法。
* 一个用于显示应用中使用的全部组件和主题的工具。
