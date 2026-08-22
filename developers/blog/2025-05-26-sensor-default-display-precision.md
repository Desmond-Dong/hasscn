如果数值型 sensor 没有由集成设置建议的显示精度，Home Assistant 现在将根据 sensor 的 device class 使用默认显示精度。

新的 device class 应添加到 `homeassistant/components/sensor/const.py` 中的 `UNITS_PRECISION`，并附带正确的 unit 和期望的默认显示精度。有关如何选择正确的 unit 和精度，请参阅该常量的 docstring。

以前在发生 unit 转换时对 sensor state 进行的舍入现在已被移除，sensor state 包含完整的原始值。

仍然建议集成在其 sensor 上设置 `suggested_display_precision`。此项变更是一个回退机制，以确保所有数值型 sensor 具有一致的体验。

更多详情请参阅实现 [pull request](https://github.com/home-assistant/core/pull/145013) 和 [Sensor entity 文档](/developers/core/entity/sensor.md)。
