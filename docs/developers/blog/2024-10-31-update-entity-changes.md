---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Update entity 的变更"
---

### 变更摘要

`update` entity 已做出以下调整：
- `in_progress` 属性及其对应的 state attribute 现在应仅为一个 `bool`，用于指示是否有更新正在进行，或者在未知时为 `None`。
- 新增了一个属性和对应的 state attribute `update_percentage`，它可以返回一个表示 0 到 100% 进度的 `int` 或 `float`，或者为 None。
- 新增了一个属性和对应的 state attribute `display_precision`，用于在 `update_percentage` 为 `float` 时控制前端显示的十进制位数。

### 向后兼容性

直到 Home Assistant Core 2025.12，`in_progress` 属性中的数值会自动复制到 `update_percentage` state attribute。

### 文档与 core 实现

详情请参阅 [update entity 开发者文档](https://developers.home-assistant.io/docs/core/entity/update)。

PR 列表：
- 新增 [`update_percentage` state attribute](https://github.com/home-assistant/core/pull/128877) 的 PR
- 新增 [`update_percentage` 属性](https://github.com/home-assistant/core/pull/128908) 的 PR
- 新增 [`display_precision` state attribute 和属性](https://github.com/home-assistant/core/pull/128930) 的 PR
- 一个[更新集成 update entity](https://github.com/home-assistant/core/pull/129380) 的示例