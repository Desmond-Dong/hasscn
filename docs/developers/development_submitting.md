---
title: "提交你的作品"
---

:::tip
始终将您的 Pull 请求基于当前 **`dev`** 分支，而不是 `master`。
:::

使用 GitHub 将您的改进、修复和新功能一次提交到 Home Assistant[请求请求](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)。步骤如下：

1. 从您的分支的开发分支中，创建一个新分支来保存您的更改：

`git checkout -b some-feature`

2. 进行更改，创建[新平台](/developers/creating_platform_index)，开发一个[新集成](/developers/creating_component_index)，或修复[问题](https://github.com/home-assistant/core/issues).

3. [测试您的更改](/developers/development_testing)并检查是否有样式违规。
考虑添加测试以确保您的代码有效。

4. 如果根据这些一切看起来都不错[必须](/developers/development_checklist)，提交您的更改：

`git add .`

`git commit -m "Add some feature"`

- 编写有意义的提交消息，而不仅仅是 `Update` 或 `Fix` 之类的内容。
- 使用 cAPItal 字母以您的提交消息开头，并且不要以句号（句点）结束。
- 不要在提交消息中添加 `[bla.bla]` 或 `platform:` 前缀。
- 使用祈使语气编写您的提交消息，例如`Add some feature` 不是 `Adds some feature`。
     

5. 将您提交的更改推送回 GitHub 上的分支：

`git push origin HEAD`

6. 跟随[这些步骤](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)创建您的拉取请求。

- 在 GitHub 上，导航至[Home Assistant 存储库的主页](https://github.com/home-assistant/core).
- 在“分支”菜单中，选择包含您的提交的分支（来自您的分支）。
- 在“分支”菜单的右侧，单击“**新拉取请求**”。
- 使用基本分支下拉菜单选择您想要将更改合并到的分支，然后使用比较分支下拉菜单选择您在其中进行更改的主题分支。确保 Home Assistant 分支与您的分叉分支 (`dev`) 匹配，否则您将建议分支之间的所有提交。
- 输入标题并完成为您的拉取请求提供的模板。
- 单击**创建拉取请求**。

7. 检查对您的拉取请求的评论和建议，并密切关注[CI输出](https://github.com/home-assistant/core/actions).

:::info
如果这是您第一次提交拉取请求，则 CI 将不会运行，直到维护者批准运行它。只需等待，维护人员最终会过来并批准它。
:::
