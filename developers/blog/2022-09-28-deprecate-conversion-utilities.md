从 Home Assistant Core 2022.10 开始，以下工具已被弃用：

* `homeassistant/util/distance`
* `homeassistant/util/pressure`
* `homeassistant/util/speed`
* `homeassistant/util/temperature`
* `homeassistant/util/volume`

请改用 `homeassistant/util/unit_conversion` 中相应的静态类：

* `DistanceConverter`
* `PressureConverter`
* `SpeedConverter`
* `TemperatureConverter`
* `VolumeConverter`
