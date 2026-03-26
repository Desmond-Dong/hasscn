---
title: "贡献模板句子"
sidebar_label: "贡献句子"
---

模板句子需要提交到我们的 [GitHub Intents 仓库](https://github.com/home-assistant/intents)。这些句子会由[语言负责人](/developers/voice/language-leaders)审核，正确后将被合并。你既可以贡献新句子，也可以改进现有句子。

Intent 仓库的结构如下：

- `sentences/<language>/` - 各语言的模板句子 - [了解更多](/developers/voice/intent-recognition/template-sentence-syntax)
- `tests/<language>/` - 各语言的测试 - [了解更多](/developers/voice/intent-recognition/test-syntax)

相比少量大型贡献，我们更倾向于大量小型贡献。包含大量改动的贡献很难审查。因此，我们希望每次贡献都限制在单一语言和单一 domain 内。

句子和测试文件的命名格式为 `<domain>_<intent>.yaml`。因此，如果你要为 cover domain 做贡献，需要更新以下文件：

- `sentences/<language>/cover_HassCoverOpen.yaml`
- `sentences/<language>/cover_HassCoverClose.yaml`
- `tests/<language>/cover_HassCoverOpen.yaml`
- `tests/<language>/cover_HassCoverClose.yaml`

## 如何贡献

所有贡献都通过 GitHub 上的 Pull Request 完成。我们推荐使用 GitHub CodeSpaces。[按照这篇教程开始。](https://github.com/home-assistant/intents/blob/main/docs/codespace/README.md)

我们的仓库包含许多检查项，可用于确保你贡献的句子有效。你可以在 VS Code 中通过 `terminal -> run task` 在本地运行它们。

这些检查也会在你创建 Pull Request 时自动运行。如果检查失败，贡献将无法被接受。

## 添加新语言

新语言应基于 `python3 -m script.intentfest add_language <language code> <language name>` 的输出，该命令会生成一个空的语言目录，并包含新语言所需的全部文件。

第一次贡献应仅限于翻译 `_common.yaml` 中的错误句子，以及为 `homeassistant` domain 添加句子和测试。

如果你无法在本地运行 `add_language` 脚本，请在 Discord 中请求维护者代为运行。
