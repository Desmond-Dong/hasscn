感谢你的贡献。一旦你的更改准备就绪，请向 [home-assistant/iOS](https://github.com/home-assistant/iOS) 的 `main` 分支打开一个 pull request。

## 提交 PR 的清单

在请求 review 之前，请确保你已经完成了基本工作：

* **Description**：解释更改了什么以及为什么。
* **Tests**：当行为变更时添加或更新测试。
* **Linting**：运行 `bundle exec fastlane lint`。
* **Buildability**：确保相关的 scheme 仍能在本地构建。
* **UI changes**：界面变更时附上截图或录屏。
* **Documentation**：当更改影响贡献者工作流或用户可见的行为时，更新开发者文档或用户文档。
* **Cross-target impact**：检查你的更改是否也影响 widgets、watchOS、CarPlay、app extensions 或 macOS packaging。请参见每个表面的 [targets overview](/developers/apple/targets.md)。

## 保持 pull request 小而精

较小的 pull request 更容易 review，也更易于理解。如果更改超过一个思路，请尽可能将其拆分为后续的 PR。

## 打开 draft PR

Draft pull requests 是在一切就绪之前获得关于方向、架构或 CI 密集型更改的早期反馈的好方法。

## Review 期望

维护者和 reviewer 通常关注：

* correctness
* 各 target 间的回归
* test coverage
* maintainability
* 共享代码是否属于正确的模块

CI 是 review 过程的一部分，而不是替代品。

## 更新你的分支

你不需要在每次 push 到 `main` 时都 rebase。在有必要的原因时更新你的分支——例如，与 `main` 存在冲突、由最近更改引起的 CI 失败，或 `main` 上的修复影响了你的工作。如果你的分支尚未 review，rebase 通常是可行的。开始 review 后，请优先选择对 PR 上已有的讨论最不打扰的更新策略。

## Localization 和生成的文件

* Translations 通过 [Lokalise](https://app.lokalise.com/public/834452985a05254348aee2.46389241/) 管理
* 如果你触及 localized strings 或生成的输出，请确保相关的 workflow 和生成的文件保持一致。
* 如果 CI 报告未使用的 strings，请在请求重新 review 之前清理它们。

## 收到反馈后

* 用有针对性的后续提交处理评论。
* 当反馈影响行为时，重新运行本地 lint 和测试。
* 分支变绿后，请求再次 review。
