---
author: Wendelin Peleska
authorURL: https://github.com/wendevlin
title: "Frontend 新的 dialogs 方式"
---

## 问题

由 dialog manager 管理的每个 dialog 只打开一次，并在整个应用程序生命周期内保留在 DOM 中。这会导致：

- **更多内存占用**：Dialogs 即使在不可见时也会堆积在 DOM 中
- **因缺少 state 重置而导致的更多 bugs**：Dialog state 在多次打开之间持久存在，导致过期数据或意外行为

## 解决方案：DialogMixin

我们使用 `DialogMixin` 实现了一种处理 dialogs 的新方式。这种方式具有以下特点：

- **Dialogs 在打开时创建，关闭时销毁**：无需在关闭时手动重置 dialog 的 state
- **关闭事件自动处理**：Dialog mixin 负责清理工作
- **Subscribe mixin 现在可以在 dialogs 中使用**：由于 dialogs 被正确销毁，subscriptions 会被自动清理
- **使用正常的 Lit lifecycle methods**：使用 `connectedCallback` 在 dialog 打开时初始化，而不是依赖 `showDialog` 方法

## 示例

查看 `ha-dialog-date-picker` 作为参考实现。`DialogMixin` 如果可用的话，会将 dialog params 添加到 `this.params`。
