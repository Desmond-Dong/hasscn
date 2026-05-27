# 赶上现实

如果需要一段时间来开发您的功能，并且您想赶上当前 Home Assistant `dev` 分支中的功能，您可以使用 `git merge` 或 `git rebase`。
您可以在下面找到有关如何使用 `git merge` 进行操作的说明。这将在本地提取最新的 Home Assistant 更改，并通过创建合并提交将它们合并到您的分支中。

克隆分叉后，您应该添加一个额外的 `remote`。如果您没有这样做，请在继续之前立即执行此操作：

```shell
git remote add upstream https://github.com/home-assistant/core.git
```

```shell
# Run this from your feature branch
git fetch upstream dev  # to fetch the latest changes into a local dev branch
git merge upstream/dev  # to put those changes into your feature branch before your changes
```

如果 git 检测到任何冲突，请执行以下操作来解决它们：

1. 使用`git status`查看有冲突的文件；编辑文件并解析 `<<<< | >>>>` 之间的行
2. 添加修改后的文件：`git add <file>` 或 `git add .`
3. 通过提交完成合并（可以保留默认合并提交消息不变）：`git commit`

最后，只需照常推送您的更改即可：

```shell
# Run this from your feature branch
git push
```

如果该命令失败，则意味着自上次更新以来新工作已从您或其他贡献者推送到分支。在这种情况下，只需将它们拉入本地分支，解决所有冲突并再次推送所有内容：

```shell
# Run this from your feature branch
git pull --no-rebase
git push
```

其他工作流程在[Github 文档](https://docs.github.com/get-started/quickstart/fork-a-repo).
