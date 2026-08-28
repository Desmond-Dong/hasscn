如果你的功能开发耗时较长，并希望跟上当前 Home Assistant `dev` 分支的内容，可以使用 `git merge` 或 `git rebase`。下面提供了使用 `git merge` 的操作说明。这会在本地拉取最新的 Home Assistant 更改，并通过创建 merge commit 将它们合并到你的分支中。

你应该在 clone fork 之后添加一个额外的 `remote`。如果还没有添加，请在继续之前执行以下操作：

```shell
git remote add upstream https://github.com/home-assistant/core.git
```

```shell
# Run this from your feature branch
git fetch upstream dev  # to fetch the latest changes into a local dev branch
git merge upstream/dev  # to put those changes into your feature branch before your changes
```

如果 git 检测到冲突，请按以下步骤解决：

1. 使用 `git status` 查看有冲突的文件；编辑该文件，并解决 `<<<< | >>>>` 之间的行
2. 添加已修改的文件：`git add <file>` 或 `git add .`
3. 通过提交来结束合并（可以保持默认的 merge commit 消息不变）：`git commit`

最后，像平常一样推送更改：

```shell
# Run this from your feature branch
git push
```

如果该命令失败，说明自上次更新以来，该分支上有新工作被推送，来源可能是你或其他贡献者。在这种情况下，只需将它们拉取到本地分支，解决任何冲突，然后再次推送所有内容：

```shell
# Run this from your feature branch
git pull --no-rebase
git push
```

其他工作流在 [Github documentation](https://docs.github.com/get-started/quickstart/fork-a-repo) 中有详细说明。
