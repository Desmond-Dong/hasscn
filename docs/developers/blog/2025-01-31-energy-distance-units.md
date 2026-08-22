---
author: jschlyter
authorURL: https://github.com/jschlyter
title: "每距离能量单位"
---

### 变更摘要

现在为 number 和 sensor entities 新增了一个 `ENERGY_DISTANCE` device class，用于表示每单位距离消耗的能量，并支持基于 unit system 的自动单位转换。
例如，这个新的 device class 可用于显示电动汽车消耗的电能量的 entities。同时新增了相应的 `UnitOfEnergyDistance` unit enumerator 和 `EnergyDistanceConverter` converter class，以支持新的 device class。

以下单位可用：

- kWh/100km
- mi/kWh
- km/kWh

更多详情请参阅 [Number 文档](/developers/core/entity/number#available-device-classes) 和 [Sensor 文档](/developers/core/entity/sensor#available-device-classes)


### 倒数单位

实现 `EnergyDistanceConverter` 也为 `BaseUnitConverter` 带来了倒数单位的支持。这简化了添加互为倒数的新单位（例如 kWh/100km 和 km/kWh）的工作。