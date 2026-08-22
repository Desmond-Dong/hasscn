本页提供一些可能对你有帮助的技巧和窍门，作为 Home Assistant 的贡献者。这里的列表绝不完整，如果你发现了其他未记录的技巧和窍门，请提交 PR 将它们添加到这里。

## 技巧与窍门

### 保持 PR 简单

有关 PR 的预期，请参阅[Component 检查清单](/developers/creating_component_code_review.md#5-make-your-pull-request-as-small-as-possible)。

### 在 Home Assistant 中测试包依赖项的更改

有关更多信息，请参阅[API 库文档](/developers/api_lib_index.md#trying-your-library-inside-home-assistant)。

### 在你生产环境的 Home Assistant 中测试 Core 集成更改

要在生产 Home Assistant 环境中测试 core 集成的更改：

1. 将集成文件夹复制到 `/config/custom_components`。
2. 在 `manifest.json` 中添加 **version** 字段（例如，`"version": "0.0.0"`）。
3. 如果该集成使用了本地化的字符串，请按照[自定义集成本地化](/developers/internationalization/custom_integration.md)中的说明，将 `strings.json` 复制到集成文件夹下的 `translations/en.json`。
4. 重启 Home Assistant。

Home Assistant 总是优先考虑 `custom_components` 中的集成而不是 core 集成。测试完成后，别忘了移除它，否则你将停留在该版本上。

### 为集成添加 config flow 时，请注意前端

Home Assistant 前端会进行积极缓存，因此，当你首次使用新更改运行 Home Assistant 时，集成可能不会出现在集成列表中。请检查日志以确保没有错误，如果没有，请对浏览器窗口执行强制刷新（hard refresh），然后重试；在很多情况下，这就能解决问题。

### 获取更多支持

Home Assistant [Discord](https://www.home-assistant.io/join-chat/) 服务器上的 `#developers` 频道是提问的好地方。专业提示：在发布问题之前，将正在工作的代码推送到一个分支，并将该分支推到某个公开位置，然后将链接连同你的问题一起粘贴，这样帮助你的人就能看到你的代码。请不要将代码大片段粘贴到频道中，因为这样很难阅读，而且会掩盖其他问题/讨论。

如果你发现可以改进开发者文档的地方，请将它传递下去，提交 PR 来更新它们。有关更多详情，请查看下一个技巧。

### 开发者文档中缺失的信息

Home Assistant 维护者努力保持开发者文档的最新状态，但我们也依赖像你这样的贡献者来帮助纠正、改进和扩展现有的文档。与 Home Assistant 一样，[此文档是开源的](https://github.com/home-assistant/developers.home-assistant)，欢迎提交 PR。如有疑问，请点击左下角的 `Edit this page` 按钮，进入源文件并直接在 GitHub 上编辑该文件。无需命令行！
