---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "FlowManager.async_show_progress 的变更"
---

`FlowHandler.async_show_progress` 已更新：
- 添加了一个新参数 `progress_task`，它在 Home Assistant core 发布版 2024.8 中将成为必填项

如果传递了 `progress_task`，`FlowManager` 将：
- 在任务完成后向 frontend 发送一个事件
- 如果用户在任务完成前关闭了 config flow 对话框，则取消 `progress_task`

这意味着派生类不再负责 progress task 状态与 UI 之间的交互。

`FlowHandler.async_show_progress` 在未传入 `progress_task` 的情况下被调用时会记录警告。在 Home Assistant core 发布版 2024.8 中，该调用将失败。

更多详情可在[文档](/developers/data_entry_flow_index#show-progress--show-progress-done)、[core PR #107668](https://github.com/home-assistant/core/pull/107668) 和 [#107802](https://github.com/home-assistant/core/pull/107802) 中找到。
