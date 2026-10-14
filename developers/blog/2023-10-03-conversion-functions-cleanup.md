以下工具在 [Home Assistant 2022.10 中被弃用](/developers/blog/2022-09-28-deprecate-conversion-utilities.md)），现在自 2023.11 起已被移除：

* `homeassistant/util/distance`
* `homeassistant/util/pressure`
* `homeassistant/util/speed`
* `homeassistant/util/temperature`
* `homeassistant/util/volume`

请使用 `homeassistant/util/unit_conversion` 中对应的静态类：

* `DistanceConverter`
* `PressureConverter`
* `SpeedConverter`
* `TemperatureConverter`
* `VolumeConverter`

这些已弃用的函数在内置 Home Assistant 集成中已不再使用，使用它们的社区集成在过去 12 个月中应该已经看到过警告。现在尝试导入原始工具将导致错误。
