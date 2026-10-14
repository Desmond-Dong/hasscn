自 Home Assistant Core 2024.2 起，我们在 `ClimateEntityFeature` 中添加了两个新标志：`TURN_ON`、`TURN_OFF`。

实现 `turn_on` service 调用的集成需要设置 `TURN_ON` feature flag。
实现 `turn_off` service 调用的集成需要设置 `TURN_OFF` feature flag。

将有一个 10 个月的弃用期（2025.1），在此期间 `ClimateEntity` 将代实现相应方法的集成设置这些标志；自 2025.1 起，如果 entity features 未相应设置，集成将无法使用相应方法。

在未设置相应 feature flag 的情况下实现方法将生成一条警告日志条目，引导用户为集成创建 issue。

集成一旦迁移到使用或不使用新的 feature flags，应在 `ClimateEntity` 子类实例中将属性 `_enable_turn_on_off_backwards_compatibility` 设置为 `False`。
这将在弃用期间停止自动设置新的 feature flags，并可在弃用结束后移除。
