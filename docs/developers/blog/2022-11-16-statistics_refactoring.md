---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "长期统计 API 的变更"
---

对长期统计相关 API 做了一些更改，以减少响应大小和数据库负载。

这些更改在[此 PR](https://github.com/home-assistant/core/pull/82131)中实现。

这会影响调用以下 WS API 的代码作者：
 - `recorder/statistics_during_period`
   - 新增了一个可选参数 `types`，允许提供要包含在响应中的统计特征列表。可能的值有：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
   - 时间戳 `start`、`end` 和 `last_reset` 现在是自 UNIX epoch 以来的毫秒整数，而不是 ISO 格式字符串。新格式意味着时间戳可以直接传递给 js `Date()` 构造函数。
   - `statistic_id` 不再在返回的 map 中为每个列表项重复。由于返回类型是以 `statistic_id` 为键的 map，因此此前并未使用该字段。

这会影响调用以下 Python API 的代码作者：
- `homeassistant.recorder.statistics.get_last_short_term_statistics`
  - 新增了一个参数 `types`，允许提供要包含在响应中的统计特征集合。可能的值有：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
  - 时间戳 `start`、`end` 和 `last_reset` 现在是 `datetime` 对象，而不是 ISO 格式字符串。
  - `statistic_id` 不再在返回的 map 中为每个列表项重复。由于返回类型是以 `statistic_id` 为键的 map，因此此前并未使用该字段。
- `homeassistant.recorder.statistics.get_latest_short_term_statistics`
  - 新增了一个参数 `types`，允许提供要包含在响应中的统计特征集合。可能的值有：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
  - 时间戳 `start`、`end` 和 `last_reset` 现在是 `datetime` 对象，而不是 ISO 格式字符串。
  - `statistic_id` 不再在返回的 map 中为每个列表项重复。由于返回类型是以 `statistic_id` 为键的 map，因此此前并未使用该字段。
- `homeassistant.recorder.statistics.statistics_during_period`
  - 新增了一个参数 `types`，允许提供要包含在响应中的统计特征集合。可能的值有：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
  - 时间戳 `start`、`end` 和 `last_reset` 现在是 `datetime` 对象，而不是 ISO 格式字符串。
  - `statistic_id` 不再在返回的 map 中为每个列表项重复。由于返回类型是以 `statistic_id` 为键的 map，因此此前并未使用该字段。