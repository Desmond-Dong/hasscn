---
author: Joakim Plate
authorURL: https://github.com/elupus
title: "在 update coordinator 中支持 context"
---

从 Home Assistant 2022.7 开始，update coordinator 支持跟踪每个监听 entity 的 context。这可用于基于启用的 entities 限制对 API 的请求。

对于依赖 update coordinators 并检查内部变量 `self._listeners` 和/或重载方法 `async_remove_listener()` 以检测监听器何时耗尽的 custom components，这可能会是一个 breaking change。改用 `async_update_listeners()` 触发对所有监听器的更新，并重载 `_unschedule_refresh()` 以检测监听器耗尽的情况。

更多信息请参见更新的[集成数据获取文档](/developers/integration_fetching_data#polling-api-endpoints)。
