---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "ConfigSubentryFlow 的变更"
---

`ConfigSubentryFlow._reconfigure_entry_id` 已重命名为 `ConfigSubentryFlow._entry_id`，`ConfigSubentryFlow._get_reconfigure_entry` 已重命名为 `ConfigSubentryFlow._get_entry`。

进行此项变更的原因是，sub entry user flow 和 subentry reconfigure flow 都需要访问父 config entry，例如获取 options、data 等。

调用了上述任一重命名方法的自定义集成需要更新其实现。

此变更引入于 [home assistant core PR #141017](https://github.com/home-assistant/core/pull/141017)。