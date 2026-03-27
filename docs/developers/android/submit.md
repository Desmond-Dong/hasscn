---
title: "安卓提交贡献"
description: '首先感谢您的贡献！现在是时候获取反馈并为真实用户准备您的工作了。按照 GitHub Documentation(https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your。'
sidebar_label: "提交贡献"
---
# 安卓提交贡献

## 提交您的第一份贡献

首先感谢您的贡献！现在是时候获取反馈并为真实用户准备您的工作了。按照 [GitHub Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) 从您的分叉创建拉取请求 (PR)。

### 提交 PR 的清单

创建 PR 时，GitHub 会使用清单预先填写描述。确保您遵循所有步骤。这是一份可以帮助您的扩展清单：

- **公关说明**：提供您的更改的清晰完整的描述。
- **测试**：在我们的[testing guidelines](/developers/android/testing/introduction)之后添加所有必要的测试。
- **文档**：确保您的代码已正确记录。
- **用户界面更改**：如果 UI 被修改，请包含屏幕截图。
- **用户文档**：如果用户文档需要更新，请在[GitHub](https://github.com/home-assistant/companion.home-assistant) 上打开 PR。
- **开发者文档**：如果本文档需要更新，请在 [GitHub](https://github.com/home-assistant/developers.home-assistant/) 上打开 PR。
- **构建**：验证所有内容是否在本地正确构建（应用程序、汽车、穿戴）。
- **最佳实践**：遵循[best practices](/developers/android/best_practices)。
- **代码风格**：遵守[code style](/developers/android/codestyle)。
- **棉绒**：确保不会引入 lint 问题 ([linter](/developers/android/linter))。

### 打开 PR 草稿

如果您的 PR 尚未准备好接受正式审核，但您需要反馈，可以在 **草稿模式** 中打开它。这在处理 CI 相关的更改或不完整的功能时特别有用。

#### CI触发

如果您是新贡献者，每次 CI 运行都必须得到维护者的批准。

:::warning
@@格式0@@
运行 CI 工作流程会消耗大量资源。如果您的工作不完整，除非有必要，否则请推迟打开 PR（即使是草稿模式）。让我们注意资源的使用和我们的星球。 🌍 但这并不妨碍您定期推动以避免丢失工作。
:::

### 更新您的分支

有时您的分支可能落后于`main`。在合并拉取请求之前，您可能需要解决冲突。您可以通过以下两种方式之一更新您的分支：

- **合并** `main` 分支到您的分支和[resolve any conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)。
- **变基** 按照[Git rebase documentation](https://docs.github.com/en/get-started/using-git/about-git-rebase) 将您的分支转移到`main`。

请遵循以下准则：

- 如果您的拉取请求已审核**不是**，您可以重新设置基准或合并。
- 如果您的拉取请求**已被审查**，请使用合并而不是变基。审核后重新设定基准可能会破坏之前的评论并删除有价值的反馈。

在审核之前可以选择重新设定基准；合并始终是允许的。该存储库使用 [squash and merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits) 策略来保持提交历史记录干净且有意义。

### 审核流程

#### 谁可以审核？

每个人都可以对您的 PR 发表评论，因为它是公开的。我们鼓励通过评论做出贡献。审阅可能比编码更快，甚至 10 分钟的审阅也很有价值。

如果您对**审查** 没有信心，您仍然可以通过以下方式提供帮助：

- 通过安装 APK 来测试该功能（可在 PR 的“检查”选项卡中找到；您必须登录到 GitHub 帐户才能访问它）。
- 提供有关 UI/UX 的反馈。
- 报告崩溃或错误。

#### 获得维护者的批准

一旦您的 PR 满足清单要求，请等待维护人员对其进行审核。请记住，维护人员是在业余时间做出贡献的志愿者。保持尊重、耐心和友善。

维护者的反馈如下：

- **评论**：代码中的建议或所需更改。
- **问题**：有关事情如何运作的问题。

### 收到反馈后

#### 重新要求审核

如果您已处理反馈并对 PR 进行了更改，则可以请求维护人员重新审核。执行此操作之前，请确保 CI 为绿色。

### 合并你的公关

- 通过 `main` 分支让您的 PR 保持最新状态。
- 一旦一切都是绿色的并得到维护者的批准，他们就会合并你的 PR。您无需采取任何进一步的操作。

### 自动发布和 PR 关闭

我们的机器人在 **90天** 不活动后将问题/PR 标记为过时。如果 **7天** 之后仍然没有任何活动，该问题/PR 将自动关闭。

---

感谢您为家庭助理做出贡献！ 🎉
