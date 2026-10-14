模板句子需要提交到我们在 [GitHub 上的 Intents 仓库](https://github.com/home-assistant/intents)。句子将由[语言负责人](/developers/voice/language-leaders.md)审核，如果正确则合并。你可以贡献新句子或改进现有句子。

Intent 仓库结构如下：

* `sentences/<language>/` - 每种语言的模板句子 - [了解更多](/developers/voice/intent-recognition/template-sentence-syntax.md)
* `tests/<language>/` - 每种语言的测试 - [了解更多](/developers/voice/intent-recognition/test-syntax.md)

我们更倾向于许多小贡献而不是少数大贡献。包含大量更改的贡献很难审核。因此，我们希望每次贡献仅限于单一语言和单一 domain。

句子和测试的文件名格式为 `<domain>_<intent>.yaml`。因此，如果你为 cover domain 做贡献，你将更新以下文件：

* `sentences/<language>/cover_HassCoverOpen.yaml`
* `sentences/<language>/cover_HassCoverClose.yaml`
* `tests/<language>/cover_HassCoverOpen.yaml`
* `tests/<language>/cover_HassCoverClose.yaml`

## 如何贡献

所有贡献都通过 GitHub 上的 Pull Request 完成。我们推荐使用 GitHub CodeSpaces。[按照本教程开始。](https://github.com/home-assistant/intents/blob/main/docs/codespace/README.md)

我们的仓库有很多检查，你可以使用它们确保提交的句子有效。你可以在 VS Code 中使用 `terminal -> run task` 在本地运行它们。

当你创建 Pull Request 时，这些检查也会自动运行。如果检查失败，贡献将无法接受。

## 添加新语言

新语言应基于 `python3 -m script.intentfest add_language <language code> <language name>` 的输出，它会生成一个包含新语言所需所有文件的空语言目录。

首次贡献应限于 `_common.yaml` 中错误句子的翻译，以及为 `homeassistant` domain 添加句子和测试。

如果你无法在本地运行 add\_language 脚本，请在 Discord 中请求维护者为你运行。
