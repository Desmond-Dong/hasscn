# 提示和技巧

本页整理了一些提示和技巧，帮助你更顺利地为 Home Assistant 做贡献。这里的内容并不完整，如果你发现其他尚未记录的经验，欢迎提交 PR 补充。

## 提示和技巧

### 保持 PR 简单

关于 PR 的期望，请参阅[组件清单](/developers/creating_component_code_review.md#5-make-your-pull-request-as-small-as-possible)。

### Home Assistant 中测试包依赖项更改

请参阅[API 库文档](/developers/api_lib_index.md#trying-your-library-inside-home-assistant)了解更多信息。

### 在生产 Home Assistant 环境中测试 Core 集成更改

要在生产 Home Assistant 环境中测试 Core 集成更改：

1. 将集成文件夹复制到 `/config/custom_components` 中。
2. 将 **version** 字段添加到 `manifest.json`（例如，`"version": "0.0.0"`）。
3. 如果集成使用本地化字符串，请按照[自定义集成本地化](/developers/internationalization/custom_integration.md)中的说明，将 `strings.json` 复制到集成目录下的 `translations/en.json`。
4. 重启 Home Assistant。

Home Assistant 会始终优先加载 `custom_components` 中的集成，而不是 Core 中自带的集成。测试完成后别忘了把它删除，否则你会一直停留在那个版本。

### 给集成添加配置流时，请注意前端缓存

Home Assistant 前端会积极使用缓存，因此第一次带着新改动启动 Home Assistant 时，你可能看不到该集成出现在集成列表中。请先检查日志，确认没有错误；如果没有，再对浏览器执行一次强制刷新后重试。很多情况下这就能解决问题。

### 获得额外支持

Home Assistant 的 `#developers` [Discord](https://www.home-assistant.io/join-chat/) 频道是一个很适合提问的地方。一个实用建议是：在提问前，先把你正在处理的代码提交到某个分支，并将该分支推送到公开可访问的位置，然后把链接附在问题中，这样愿意帮你的人就能直接看到你的代码。请尽量不要把大段代码直接贴到频道里，因为那样既难读，也会淹没其他问题和讨论。

如果你发现开发者文档还有改进空间，欢迎直接提交 PR 更新。更多说明请参见下一条提示。

### 开发者文档中缺少信息

Home Assistant 维护者一直在努力让开发者文档保持最新，但我们也依赖像你这样的贡献者来帮助纠正、改进并扩展现有内容。与 Home Assistant 一样，这套[文档也是开源的](https://github.com/home-assistant/developers.home-assistant)，欢迎提交 PR。若有疑问，也可以直接在 GitHub 中打开对应源文件进行在线编辑，不一定非要使用命令行。
