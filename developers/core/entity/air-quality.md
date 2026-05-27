# 空气质量实体

## 特性

:::caution 已弃用
空气质量实体已弃用，不应使用。相反，使用
用于这些测量的单独传感器。

应迁移仍然依赖空气质量实体的集成。
:::

:::caution
空气质量实体不支持[实体属性定义](/developers/core/entity.md)中的属性简写
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| particulate\_matter\_2\_5 | <code>str | int | float | None</code> | **Required** | 颗粒物2.5（<=2.5μm）水平。
| particulate\_matter\_10 | <code>str | int | float | None</code> | `None` | 颗粒物10（<=10μm）级。
| particulate\_matter\_0\_1 | <code>str | int | float | None</code> | `None` | 颗粒物0.1（<=0.1μm）级。
| air\_quality\_index | <code>str | int | float | None</code> | `None` | 空气质量指数（AQI）。
| ozone | <code>str | int | float | None</code> | `None` | O3（臭氧）水平。
| carbon\_monoxide | <code>str | int | float | None</code> | `None` | CO（一氧化碳）水平。
| carbon\_dioxide | <code>str | int | float | None</code> | `None` | CO2（二氧化碳）水平。
| sulphur\_dioxide | <code>str | int | float | None</code> | `None` | SO2（二氧化硫）水平。
| nitrogen\_oxide | <code>str | int | float | None</code> | `None` | N2O（氮氧化物）水平。
| nitrogen\_monoxide | <code>str | int | float | None</code> | `None` | NO（一氧化氮）水平。
| nitrogen\_dioxide | <code>str | int | float | None</code> | `None` | NO2（二氧化氮）水平。支持的单位：`ppb`、`ppm`、`µg/m³`。

属性必须遵循 `unit_system` 中定义的单位。
