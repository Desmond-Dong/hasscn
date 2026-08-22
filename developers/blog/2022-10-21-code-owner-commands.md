Home Assistant [服务中枢](https://github.com/home-assistant/service-hub/) 已被 [Ludeeus](https://github.com/ludeeus) 扩展了一个新功能：代码所有者的 GitHub 命令。

此功能允许任何代码所有者对其集成标记的 issue 进行分诊。从今天起，可以使用以下命令：

* `@home-assistant close`<br />
  关闭该 issue。仅当只有一个集成被标记时可用

* `@home-assistant rename New Title`<br />
  更改 issue 的标题。仅当只有一个集成被标记时可用

* `@home-assistant unassign <your domain>`<br />
  移除集成标签及相关的 assignee。

当 bot 发布评论以通知代码所有者有新的 issue 或 pull request 时，将包含这些命令（[示例](https://github.com/home-assistant/core/issues/80731#issuecomment-1287084569)）。
