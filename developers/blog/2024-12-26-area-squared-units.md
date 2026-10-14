### 变更摘要

现在为 number 和 sensor entities 新增了一个 `AREA` device class，并支持基于 unit system 的自动单位转换。
同时新增了相应的 `UnitOfArea` unit enumerator 和 `AreaConverter` converter class，以支持新的 device class。

### 向后兼容性

`AREA_SQUARE_METERS` 常量已被 deprecated，并将在 Home Assistant `2025.12` 中移除。
自定义集成应调整为使用 `UnitOfArea.SQUARE_METERS`。

更多详情请参阅 [Number 文档](/developers/core/entity/number.md#available-device-classes) 和 [Sensor 文档](/developers/core/entity/sensor.md#available-device-classes)。
