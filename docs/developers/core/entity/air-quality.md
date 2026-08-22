---
title: Air quality 实体
sidebar_label: Air quality
---

## 属性

:::caution Deprecated
Air Quality 实体已被弃用，不应再使用。取而代之，请为这些测量值使用独立的 sensors。

仍依赖 Air Quality Entity 的集成应进行迁移。
:::

:::caution
Air Quality 实体不支持用于 [属性实现](../entity.md#entity-class-or-instance-attributes) 的属性简写
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| particulate_matter_2_5 | `str \| int \| float \| None` | **必填** | 颗粒物 2.5（<= 2.5 μm）浓度。
| particulate_matter_10 | `str \| int \| float \| None` | `None` | 颗粒物 10（<= 10 μm）浓度。
| particulate_matter_0_1 | `str \| int \| float \| None` | `None` | 颗粒物 0.1（<= 0.1 μm）浓度。
| air_quality_index | `str \| int \| float \| None` | `None` | Air Quality Index (AQI)。
| ozone | `str \| int \| float \| None` | `None` | O3（臭氧）浓度。
| carbon_monoxide | `str \| int \| float \| None` | `None` | CO（一氧化碳）浓度。
| carbon_dioxide | `str \| int \| float \| None` | `None` | CO2（二氧化碳）浓度。
| sulphur_dioxide | `str \| int \| float \| None` | `None` | SO2（二氧化硫）浓度。
| nitrogen_oxide | `str \| int \| float \| None` | `None` | N2O（氧化氮）浓度。
| nitrogen_monoxide | `str \| int \| float \| None` | `None` | NO（一氧化氮）浓度。
| nitrogen_dioxide | `str \| int \| float \| None` | `None` | NO2（二氧化氮）浓度。支持的单位：`ppb`、`ppm`、`µg/m³`。

属性必须遵循 `unit_system` 中定义的单位。
