`TemperatureConverter` 中的方法 `convert_interval`（允许在 °F 和 °C 区间之间转换）已被弃用，建议改用 `TemperatureDeltaConverter.convert`。
新的 converter 和 device class 现在是处理温度区间的推荐方式。

更多详情请参阅 [core PR 155689](https://github.com/home-assistant/core/pull/155689) 和 [core PR 147358](https://github.com/home-assistant/core/pull/147358)。
