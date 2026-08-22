---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: 温度转换移至 SensorEntity
---

温度单位转换正从 `Entity` base class 移至 `SensorEntity` base class。仅当 sensor 的 `device_class` 属性设置为 `DEVICE_CLASS_TEMPERATURE` 时，才会进行单位转换。如果 `device_class` 未设置或未设置为 `DEVICE_CLASS_TEMPERATURE`，温度转换将在过渡期间进行，并记录警告。

为此，sensor entity 模型已更新，增加了两个新 properties：`native_value` 和 `native_unit_of_measurement`。这使我们在未来可以添加额外的单位转换，而无需依赖 integrations 自行处理。

Sensor 实现不应再实现 `state()` property 函数或设置 `_attr_state` 属性。Sensor 实现也不应实现 `unit_of_measurement` property 函数，设置 `_attr_unit_of_measurement` 属性，或设置 `EntityDescription` 中的 `unit_of_measurement` 成员。

### native_value

sensor 报告的值。
写入 state machine 的实际 state 可能会因单位转换而被 `SensorEntity` 修改。

### native_unit_of_measurement

sensor 的测量单位（如果有）。
写入 state machine 的 `unit_of_measurement` 可能会因单位转换而被 `SensorEntity` 修改。