---
title: "Android 提交贡献"
sidebar_label: "提交贡献"
---

## 提交你的第一个贡献

首先，感谢你的贡献！现在该获取反馈并为真实用户准备你的工作了。请遵循 [GitHub 文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) 从你的 fork 创建一个 pull request (PR)。

### 提交 PR 检查清单

在创建 PR 时，GitHub 会使用检查清单预填充描述。请确保遵循所有步骤。以下是一份扩展的检查清单以帮助你：

- **PR 描述**: 提供关于你更改的清晰完整的描述。
- **测试**: 遵循我们的 [测试指南](/developers/android/testing/introduction) 添加所有必要的测试。
- **文档**: 确保代码已妥善记录。
- **UI 更改**: 如果 UI 被修改，请附上截图。
- **用户文档**: 如果需要更新用户文档，请在 [GitHub](https://github.com/home-assistant/companion.home-assistant) 上打开一个 PR。
- **开发者文档**: 如果本文档需要更新，请在 [GitHub](https://github.com/home-assistant/developers.home-assistant/) 上打开一个 PR。
- **构建**: 验证所有内容（应用、automotive、wear）在本地构建正常。
- **最佳实践**: 遵循 [最佳实践](/developers/android/best_practices)。
- **编码风格**: 遵循 [编码风格](/developers/android/codestyle)。
- **Linting**: 确保没有引入 lint 问题（[linter](/developers/android/linter)）。

### 打开 draft PR

如果你的 PR 还没有准备好进行正式审查，但你希望获得反馈，你可以以 **draft 模式** 打开它。这在处理 CI 相关更改或不完整的功能时特别有用。

#### CI 触发

如果你是新贡献者，每次 CI 运行都需要维护者批准。

:::warning
**避免不必要的 CI 运行**
运行 CI 工作流会消耗大量资源。如果你的工作尚未完成，请推迟打开 PR（即使是 draft 模式），除非确有必要。请留意资源使用和我们共同的地球。🌍 但这并不妨碍你定期推送以避免丢失工作。
:::

### 更新你的分支

有时你的分支可能会落后于 `main`。在你的 pull request 合并之前，你可能需要解决冲突。你可以通过以下两种方式来更新你的分支：

- **Merge** `main` 分支到你的分支中，并[解决任何冲突](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)。
- 按照 [Git rebase 文档](https://docs.github.com/en/get-started/using-git/about-git-rebase) 将你的分支 **Rebase** 到 `main` 上。

请遵循以下指南：

- 如果你的 pull request **尚未**被审查，你可以 rebase 或 merge。
- 如果你的 pull request **已被审查**，请使用 merge 而不是 rebase。在审查后 rebase 可能会破坏之前的评论并移除有价值的反馈。

在审查前 rebase 是可选的；merge 始终允许。本仓库使用 [squash and merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits) 策略，以保持提交历史干净且有意义。

### 审查流程

#### 谁可以审查？

任何人都可以评论你的 PR，因为它是公开的。我们通过审查鼓励贡献。审查往往比编写代码更快，即使是 10 分钟的审查也很有价值。

如果你对**审查**没有信心，你仍然可以通过以下方式提供帮助：

- 通过安装 APK 来测试该功能（可在 PR 的 Checks 选项卡中找到；你必须登录 GitHub 账户才能访问它）。
- 提供关于 UI/UX 的反馈。
- 报告崩溃或 bug。

#### 获得维护者的批准

一旦你的 PR 满足检查清单要求，请等待维护者审查。请记住，维护者是利用业余时间贡献的志愿者。请保持尊重、耐心和友善。

来自维护者的反馈会以以下形式出现：

- **评论**: 对代码的建议或必要更改。
- **问题**: 关于某事如何运作的问题。

### 收到反馈后

#### 重新请求审查

如果你已处理反馈并将更改推送到 PR，你可以请求维护者重新审查。请确保在执行此操作前 CI 状态为绿色。

### 合并你的 PR

- 保持你的 PR 与 `main` 分支同步。
- 一旦一切状态为绿色并获得维护者批准，他们会合并你的 PR。你无需采取任何进一步的操作。

### 自动关闭 issue 和 PR

我们的 bot 会在**90 天**不活动后将 issue/PR 标记为陈旧。如果**7 天**后仍没有活动，issue/PR 将被自动关闭。

---

感谢你为 Home Assistant 作出的贡献！🎉
