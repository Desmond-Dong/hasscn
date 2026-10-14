`NumberEntity` 现在支持温度单位转换，采用的模式与 `SensorEntity` 支持的单位转换类似。

对于 device class 设置为 `temperature` 的 number entities，温度转换将根据用户配置的温度单位自动进行。

为此，custom component 集成应更新为覆写属性 `native_max_value`、`native_min_value`、`native_step`、`native_unit_of_measurement`、`native_value`，而不是 `max_value`、`min_value`、`step`、`unit_of_measurement`、`value`，并覆写方法 `async_set_native_value` 和 `set_native_value`，而不是 `async_set_value` 和 `set_value`。

同样的重命名也已应用于 `_attr_*` 属性和 `NumberEntityDescription` 的成员。

在 Home Assistant Core 2023.1 中，覆写 `async_set_value`、`max_value`、`min_value`、`set_value`、`step`、`unit_of_measurement`、`value`，设置 `_attr_max_value`、`_attr_min_value`、`_attr_unit_of_measurement`、`_attr_step`、`_attr_value` 以及在 `NumberEntityDescription` 实例上设置 `max_value`、`min_value`、`unit_of_measurement`、`step` 将不再受支持。
