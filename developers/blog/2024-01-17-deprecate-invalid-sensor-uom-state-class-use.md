自 Home Assistant Core 2022.12 起，如果具有 device class 的 sensor entity 错误地使用了 unit of measurement 和 state class（会考虑其 device class），则会在日志中发出警告。

无效的用法示例：具有 `SensorDeviceClass.TEMPERATURE` device class 的 sensor entity，但使用了 unit of measurement `%` 而不是 `°C` 或 `°F`；或者使用了 state class `SensorStateClass.TOTAL` 而不是 `SensorStateClass.MEASUREMENT`。

将有一个六个月的弃用期，以确保所有自定义集成作者有时间进行调整。自 Home Assistant Core 2024.8 起，该警告将被异常所取代。
