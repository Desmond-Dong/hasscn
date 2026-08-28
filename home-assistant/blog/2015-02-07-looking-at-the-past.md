# 回望过去

自 Home Assistant 发布以来，你一直可以追踪家中的状态。但过去只能看到“当前状态”，无法看到“曾经状态”。今天我们将通过两个全新组件改变这一点：

* Recorder 组件：把每个事件记录到 SQLite 数据库
* History 组件：查询并聚合这些历史事件

通过增加“过去视角”，我们为家庭状态增加了一个新的维度，也为未来功能带来了更多可能。本次发布重点是先让你开始记录并积累数据。为展示记录内容，我们新增了一个视图，用于显示过去 24 小时的家庭状态。未来我们会继续提供更强大的历史探索工具。

把历史功能加入 UI 本身就是个挑战，因为旧 UI 不利于导航。借这次发布，Home Assistant 的界面也一并焕新了。

新用户默认启用 history 组件。现有用户请运行 `scripts/update` 升级到最新版本，并在 `home-assistant.conf` 中添加 `[history]`。

<p class='img'>
  <a href='/home-assistant/images/screenshots/history_graph.png'>
    <img src='/home-assistant/images/screenshots/history_graph.png' />
  </a>
</p>

:::note
事件会保存在本地数据库中。图表由 Google Graphs 绘制，绘制过程 100% 在浏览器内完成，任何时候都不会把数据传给他人。
:::

<!--more-->

历史追踪是 Home Assistant 令人兴奋的下一步，也将驱动下一代功能。下面是一些现在已经可以实现的方向：

* Time Machine：查看家中任意过去时刻的状态
* Smart Home：分析行为模式并用于家庭自动化
* 汇总家中不同组件的使用情况
