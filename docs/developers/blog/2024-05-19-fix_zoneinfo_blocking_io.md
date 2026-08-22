---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: 处理时区而不阻塞 event loop
---

如果传递的 timezone 不在缓存中，构造 `ZoneInfo` 对象可能会进行阻塞 I/O 以从磁盘加载 zone info。

现在可以使用 `dt_util.async_get_time_zone` 来替换 `dt_util.get_time_zone`，以便在 event loop 中异步安全地获取 timezone，它不会在 event loop 中执行阻塞 I/O。

`hass.config.set_time_zone` 已被弃用，并由 `hass.config.async_set_time_zone` 替代。`hass.config.set_time_zone` 将在 2025.6 中移除。设置 timezone 仅影响测试，因为任何集成都不应在生产环境中调用此函数。

直接检查 `dt_util.DEFAULT_TIME_ZONE` 已被弃用，应改用 `dt_util.get_default_time_zone()`。

如果您的集成需要在 event loop 中构造 `ZoneInfo` 对象，建议使用 [`aiozoneinfo` 库](https://pypi.org/project/aiozoneinfo/)。
