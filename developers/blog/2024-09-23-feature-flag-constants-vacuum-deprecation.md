自 Home Assistant Core 2022.5 起，`StateVacuumEntity` 中使用的 feature flag 常量已被 deprecated，并由 `VacuumEntityFeature` enum 取代。

然而，当时并没有执行正确的 deprecation 流程，因此现在在 2024.10 中我们正式开始为期一年的 deprecation 期。这些常量将从 2025.10 起停止工作，以确保所有自定义集成作者都有时间进行调整。
