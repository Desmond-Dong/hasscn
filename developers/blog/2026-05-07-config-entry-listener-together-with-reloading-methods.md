从 Home Assistant Core 2026.6 开始，在 config flow 中将 config entry listener 与任何 reloading methods 一起使用已被弃用，并将在 2026.12 产生错误。

## 背景

在 config flow 中将 config entry listener 与任何 reloading methods 一起使用，可能导致集成重新加载两次和/或产生 race condition。

## 可能的解决方案

* 移除 config entry listener，只依赖 config flow 中的 reloading methods。
* 用 `async_update_and_abort()` 替代 `async_update_reload_and_abort()`。
* 在调用 `_abort_if_unique_id_configured()` 时设置 `reload_on_update=False`。

更多详情可在 [core PR](https://github.com/home-assistant/core/pull/169198) 中找到。
