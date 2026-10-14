随着 Home Assistant 0.70 的发布，我们将前端构建流程从基于 HTML imports 迁移到了 ES module imports（稍后会详细介绍）。带来的影响之一是，我们不再使用 `window` 对象来与其他代码共享类、数据和工具函数。

如果你依赖其中的某些内容，这可能会影响到你。例如 Polymer（`window.Polymer`），或我们以前作为 `window.hassUtil`、`window.HAWS` 或 `window.hassMixins` 提供的工具函数。

为了给开发者留出迁移时间，我们添加了一个临时的 legacy support layer，会在 `window` 对象上重新暴露部分内部内容。我们已经添加了 `window.Polymer`、`window.Polymer.Element` 和 `window.Polymer.html`。如果你还使用了 window 对象上的其他特定内容，[请告诉我们](https://github.com/home-assistant/frontend/issues/1157)。

该 legacy support layer 将在 2018 年 7 月之后的版本中不再包含。
