自 Home Assistant Core 2024.11 起，`CoverEntity` 中用于返回 state 的常量已被 deprecated，并由 `CoverState` enum 取代。

设有为期一年的 deprecation 期，这些常量将从 2025.11 起停止工作，以确保所有自定义集成作者都有时间进行调整。

由于 `state` 属性本来就不应被覆盖，在大多数情况下，这一变更仅会影响其他 Entity 属性或测试，而不是 `state` 属性本身。

更多详情请参阅 [cover 文档](/developers/core/entity/cover.md#states)。
