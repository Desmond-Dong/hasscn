---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "长期统计现在跟踪源实体的单位"
---

长期统计现在允许以与存储时不同的单位显示统计。例如，可以将以 `kWh` 存储的统计显示为 `Wh`、`kWh` 或 `MWh`。

这些变更通过一系列 PR 实现：

- https://github.com/home-assistant/core/pull/78031
- https://github.com/home-assistant/core/pull/78578
- https://github.com/home-assistant/core/pull/79370

背景是我们允许覆盖多个 sensor device class 的单位，此覆盖在查看长期统计时也应反映出来。

这会影响调用以下 WS API 的代码作者：

- `recorder/adjust_sum_statistics` - 新增了一个必填参数 `adjustment_unit_of_measurement`，它定义了 `adjustment` 参数使用的单位。
- `recorder/statistics_during_period` - 对于从 sensor entities 生成的统计，返回统计的单位将转换为 sensor 的 `unit_of_measurement`。此行为可以通过传递可选的 `units` 参数来控制。
