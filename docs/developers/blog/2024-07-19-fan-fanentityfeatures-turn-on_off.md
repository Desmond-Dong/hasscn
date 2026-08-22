---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
title: "FanEntity 中的新 entity feature flag"
---

从 Home Assistant Core 2024.8 起，我们为 `FanEntityFeature` 添加了两个新 flag：`TURN_ON`、`TURN_OFF`。

实现了 `turn_on` service call 的集成需要设置 `TURN_ON` feature flag。
实现了 `turn_off` service call 的集成需要设置 `TURN_OFF` feature flag。

将有 6 个月的弃用期（至 2025.2），在此期间 `FanEntity` 将代表实现了相应方法的集成设置这些 flag。从 2025.2 起，如果 entity feature 未相应设置，集成将无法使用相应的方法。

在不设置相应 feature flag 的情况下实现这些方法，将创建一条警告日志，引导用户为集成创建 issue。

集成应在 `FanEntity` 子类实例中将属性 `_enable_turn_on_off_backwards_compatibility` 设置为 `False`，一旦迁移到使用或不使用新的 feature flag 之后。
这将停止在弃用期间自动设置新的 feature flag，并应在弃用结束后移除。
