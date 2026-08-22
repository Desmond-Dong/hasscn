---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Utility 函数 homeassistant.util.dt.utc_to_timestamp 已弃用"
---

Utility 函数 `homeassistant.util.dt.utc_to_timestamp` 已被 deprecated，并将在 Home Assistant Core 2026.1 中移除。调用该函数的自定义集成应改为调用 stdlib 方法 `datetime.datetime.timestamp()`。

弃用的原因是 stdlib 方法与 utility 函数速度一样快。

更多详情请参阅 [core PR](https://github.com/home-assistant/core/pull/131787)。