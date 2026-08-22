---
author: Allen Porter
authorURL: https://github.com/allenporter
title: "Calendar best practices"
---

Home Assistant 改进了 Calendar entity 的 best practices，以确保
在所有情况下 calendar triggers/automations 和 UI 均能正常工作。

特别地，现在有更多文档化的期望和不变量强制，包括：
- `CalendarEvent` 属性 `end` 是 exclusive 的。例如，持续一天的全日事件，其 end date 应为 start date 之后的 1 天。
- `CalendarEvent` 可以接受任何时区的 `datetime`。不允许无时区的 floating dates。
- 创建 `CalendarEvent` 时现在会强制验证不变量。
- 由 `async_get_events` 返回的事件应按顺序返回。
- 由 `async_get_events` 返回的全日事件必须在 Home Assistant 本地时区中评估。即，全日事件应按其在本地时间午夜开始的顺序排列。

[Calendar Entity 开发者文档](/developers/core/entity/calendar) 已更新，包含更多详细信息。