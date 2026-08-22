---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "Config entry 现在支持 minor 版本"
---

Config entry 现在支持 minor 版本。

如果 minor 版本不同但 major 版本相同，即使集成未实现 `async_migrate_entry`，集成 setup 也会被允许继续。这意味着 minor 版本提升是向后兼容的，这与 major 版本提升不同，后者会在用户降级 HA Core 且未从备份恢复配置时导致集成 setup 失败。

### 背景

由于 config entry 数据的版本化会破坏降级到旧版 Home Assistant Core 的过程，此前我们对版本化的态度非常保守。这意味着在大多数情况下，我们不做版本化，集成反而进行一种软升级，例如，对初始版本中不存在的 config entry 数据执行 `dict.get`，在 setup 期间转换数据等。

通过引入类似 storage helper 已提供的 minor 版本，此模式不再被推荐。每当新增或更改的数据不会破坏旧版版本时，应改为提升 minor 版本。

更多详情可在[config entry 迁移文档](/developers/core/integration/config_flow#config-entry-migration)和 [core PR #105749](https://github.com/home-assistant/core/pull/105479) 中找到。
