---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: "弃用 `async_run_job` 和 `async_add_job`"
---

`async_run_job` 和 `async_add_job` 已被弃用，并将在 Home Assistant 2025.4 中移除。此弃用不适用于 sync API `add_job` 方法，该方法计划保留不移除。

转而使用其他 job 方法更高效，因为不需要去判断 job 的调用方式：

如果 callable 是从 config entry 运行的 coroutine 函数：
`entry.async_create_background_task`、`entry.async_create_task`

如果 callable 是从其他位置运行的 coroutine 函数：
`hass.async_create_background_task`、`hass.async_create_task`

如果 callable 应该在 executor 中运行：
`hass.async_add_executor_job`
