`WeatherEntity` 现在支持温度单位转换，采用的模式与 `NumberEntity` 和 `SensorEntity` 支持的单位转换类似。

降水、气压、温度、能见度和风速会根据用户配置的单位系统自动转换。此外，用户可以为特定的 weather entities 覆盖单位。

为此，custom component 集成应更新为覆写属性 `native_precipitation_unit`、`native_pressure`、`native_pressure_unit`、`native_temperature`、`native_temperature_unit`、`native_visibility`、`native_visibility_unit`、`native_wind_speed` 和 `native_wind_speed_unit`，而不是 `precipitation_unit`、`pressure`、`pressure_unit`、`temperature`、`temperature_unit`、`visibility`、`visibility_unit`、`wind_speed` 和 `wind_speed_unit`。

相同的重命名也已应用于相应的 `_attr_*` 属性以及 `Forecast` typed dict 的成员。

在 Home Assistant Core 2023.1 中，覆写 `precipitation_unit`、`pressure`、`pressure_unit`、`temperature`、`temperature_unit`、`visibility`、`visibility_unit`、`wind_speed`、`wind_speed_unit`，设置 `_attr_precipitation_unit`、`_attr_pressure`、`_attr_pressure_unit`、`_attr_temperature`、`_attr_temperature_unit`、`_attr_visibility`、`_attr_visibility_unit`、`_attr_wind_speed`、`_attr_wind_speed_unit` 以及在 `Forecast` 实例上设置 `precipitation`、`pressure`、`temperature`、`templow`、`wind_speed` 将不再受支持。
