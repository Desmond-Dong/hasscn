自 Home Assistant Core 2024.10 起，`Camera` 中用于返回 state 的常量已被 deprecated，并由 `CameraState` enum 取代。

设有为期一年的 deprecation 期，这些常量将从 2025.10 起停止工作，以确保所有自定义集成作者都有时间进行调整。

由于 `state` 属性本来就不应被覆盖，在大多数情况下，这一变更仅会影响其他 Entity 属性或测试。
