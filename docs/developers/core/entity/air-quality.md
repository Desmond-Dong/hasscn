---
title: 空气质量实体
sidebar_label: 空气质量
---

## 特性

:::caution 已弃用
空气质量实体已弃用，不应使用。相反，使用
用于这些测量的单独传感器。

应迁移仍然依赖空气质量实体的集成。
:::

:::caution
空气质量实体不支持[实体属性定义](/developers/core/entity)中的属性简写
:::


| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| particulate_matter_2_5 | <code>str &#124; int &#124; float &#124; None</code> | **Required** | 颗粒物2.5（\<=2.5μm）水平。
| particulate_matter_10 | <code>str &#124; int &#124; float &#124; None</code> | `None` | 颗粒物10（\<=10μm）级。
| particulate_matter_0_1 | <code>str &#124; int &#124; float &#124; None</code> | `None` | 颗粒物0.1（\<=0.1μm）级。
| air_quality_index | <code>str &#124; int &#124; float &#124; None</code> | `None` | 空气质量指数（AQI）。
| ozone | <code>str &#124; int &#124; float &#124; None</code> | `None` | O3（臭氧）水平。
| carbon_monoxide | <code>str &#124; int &#124; float &#124; None</code> | `None` | CO（一氧化碳）水平。
| carbon_dioxide | <code>str &#124; int &#124; float &#124; None</code> | `None` | CO2（二氧化碳）水平。
| sulphur_dioxide | <code>str &#124; int &#124; float &#124; None</code> | `None` | SO2（二氧化硫）水平。
| nitrogen_oxide | <code>str &#124; int &#124; float &#124; None</code> | `None` | N2O（氮氧化物）水平。
| nitrogen_monoxide | <code>str &#124; int &#124; float &#124; None</code> | `None` | NO（一氧化氮）水平。
| nitrogen_dioxide | <code>str &#124; int &#124; float &#124; None</code> | `None` | NO2（二氧化氮）水平。支持的单位：`ppb`、`ppm`、`µg/m³`。

属性必须遵循 `unit_system` 中定义的单位。
