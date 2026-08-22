---
title: "Submit your work"
---

:::tip
请始终基于当前的 **`dev`** 分支创建 Pull Requests，而不是 `master`。
:::

使用 GitHub [Pull Requests](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)，一次一个地将你的改进、修复和新功能提交给 Home Assistant。步骤如下：

1. 从你的 fork 的 dev 分支中，创建一个新分支来保存你的更改：

   `git checkout -b some-feature`

2. 进行你的更改，创建[新平台](creating_platform_index.md)，开发[新集成](creating_component_index.md)，或修复[issues](https://github.com/home-assistant/core/issues)。

3. [测试你的更改](development_testing.md) 并检查是否存在风格违规。
   考虑添加测试以确保你的代码能够正常工作。

4. 如果根据这些[必须项](development_checklist.md) 一切看起来都没问题，提交你的更改：

   `git add .`

   `git commit -m "Add some feature"`

    - 编写有意义的提交消息，而不仅仅是 `Update` 或 `Fix` 之类的内容。
    - 使用大写字母开头，并且不要在末尾加句号。
    - 不要用 `[bla.bla]` 或 `platform:` 前缀你的提交消息。
    - 使用祈使语气编写提交消息，例如 `Add some feature`，而不是 `Adds some feature`。


5. 将提交的更改推送到你在 GitHub 上的 fork：

   `git push origin HEAD`

6. 按照[这些步骤](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) 创建你的 pull request。

   - 在 GitHub 上，导航到 [Home Assistant 仓库的主页面](https://github.com/home-assistant/core)。
   - 在 "Branch" 菜单中，选择包含你提交（来自你的 fork）的分支。
   - 点击 Branch 菜单右侧的 **New pull request**。
   - 使用 base branch 下拉菜单选择要将更改合并到的分支，然后使用 compare branch 下拉菜单选择你进行更改的主题分支。确保 Home Assistant 分支与你的 fork 分支（`dev`）匹配，否则你将提交所有分支之间的提交。
   - 输入标题并填写 pull request 的提供模板。
   - 点击 **Create pull request**。

7. 检查你的 pull request 上的评论和建议，并关注 [CI output](https://github.com/home-assistant/core/actions)。

:::info
如果你是第一次提交 pull request，CI 在维护者批准之前不会运行。只需等待，维护者最终会前来并批准。
:::
