---
title: Number entity
sidebar_label: Number
---

`number` 是一种允许用户向集成输入任意值的 entity。从 [`homeassistant.components.number.NumberEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/number/__init__.py) 派生 entity platforms。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| device_class | string | `None` | Number 的类型。
| mode | string | `auto` | 定义 number 在 UI 中的显示方式。建议使用默认值 `auto`。可以是 `box` 或 `slider` 以强制显示模式。
| native_max_value | float | 100 | Number 的 `native_unit_of_measurement` 中接受的最大值（inclusive）
| native_min_value | float | 0 | Number 的 `native_unit_of_measurement` 中接受的最小值（inclusive）
| native_step | float | **见下文** | 定义 values 的 resolution，即 number 的 `native_unit_of_measurement` 中最小的增量或减量。
| native_value | float | **必需** | Number 的 `native_unit_of_measurement` 中的 value。
| native_unit_of_measurement | string | `None` | Number 的 value 所表示的计量单位。如果 `native_unit_of_measurement` 是 °C 或 °F，且其 `device_class` 是 temperature，则 number 的 `unit_of_measurement` 将为用户配置的 preferred temperature unit，number 的 `state` 将是可选单位转换后的 `native_value`。如果提供了 [unit translation](/developers/internationalization/core#unit-of-measurement-of-entities)，则不应定义 `native_unit_of_measurement`。

其他在所有 entity 中通用的 properties（如 `icon`、`name` 等）也适用。

默认 step 值根据 range（max - min）值动态选择。如果 max_value 和 min_value 之间的差值大于 1.0，则默认 step 为 1.0。如果 range 较小，则 step 会迭代除以 10，直到小于 range。

### 可用的设备类型

如果指定 device class，你的 number entity 还需要返回正确的计量单位。

| Constant | Supported units | Description
| ---- | ---- | -----------
| `NumberDeviceClass.ABSOLUTE_HUMIDITY` | g/m³, mg/m³ | Absolute humidity
| `NumberDeviceClass.APPARENT_POWER` | mVA, VA, kVA | Apparent power
| `NumberDeviceClass.AQI` | None | Air Quality Index
| `NumberDeviceClass.AREA` | m², cm², km², mm², in², ft², yd², mi², ac, ha | Area
| `NumberDeviceClass.ATMOSPHERIC_PRESSURE` | cbar, bar, hPa, mmHG, inHg, inH₂O, kPa, mbar, Pa, psi | Atmospheric pressure
| `NumberDeviceClass.BATTERY` | % | 剩余 battery 百分比
| `NumberDeviceClass.BLOOD_GLUCOSE_CONCENTRATION` | mg/dL, mmol/L | Blood glucose concentration```
| `NumberDeviceClass.CO2` | ppm | 二氧化碳浓度。
| `NumberDeviceClass.CO` | ppb, ppm, µg/m³, mg/m³ | 一氧化碳浓度。
| `NumberDeviceClass.CONDUCTIVITY` | S/cm, mS/cm, µS/cm | Conductivity
| `NumberDeviceClass.CURRENT` | A, mA, µA | Current
| `NumberDeviceClass.DATA_RATE` | bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, GiB/s | Data rate
| `NumberDeviceClass.DATA_SIZE` | bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB | Data size
| `NumberDeviceClass.DISTANCE` | km, m, cm, mm, mi, nmi, yd, in | Generic distance
| `NumberDeviceClass.DURATION` | d, h, min, s, ms, µs | Time period。不应仅因时间流逝而更新。Device 或 service 需要给出新的数据点才能更新。
| `NumberDeviceClass.ENERGY` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | Energy，此 device class 应用于表示 energy consumption，例如 electricity meter。表示 _power_ over _time_。不要与 `power` 混淆。
| `NumberDeviceClass.ENERGY_DISTANCE` | kWh/100km, Wh/km, mi/kWh, km/kWh | Energy per distance，此 device class 应用于表示按距离的 energy consumption，例如 electric car 消耗的 electric energy 量。
| `NumberDeviceClass.ENERGY_STORAGE` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | Stored energy，此 device class 应用于表示 stored energy，例如 battery 中当前存储的 electric energy 量或 battery 的 capacity。表示 _power_ over _time_。不要与 `power` 混淆。
| `NumberDeviceClass.FREQUENCY` | mHz, Hz, kHz, MHz, GHz | Frequency
| `NumberDeviceClass.GAS` | L, m³, ft³, CCF, MCF | Gas 的体积。以 kWh 的 energy 测量的 gas consumption 而不是体积，应归类为 energy。
| `NumberDeviceClass.HUMIDITY` | % | Relative humidity
| `NumberDeviceClass.ILLUMINANCE` | lx | Light level
| `NumberDeviceClass.IRRADIANCE` | W/m², BTU/(h⋅ft²) | Irradiance
| `NumberDeviceClass.MOISTURE` | % | Moisture
| `NumberDeviceClass.MONETARY` | [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) | 带有 currency 的 Monetary value。
| `NumberDeviceClass.NITROGEN_DIOXIDE` | ppb, ppm, µg/m³ | 二氧化氮浓度
| `NumberDeviceClass.NITROGEN_MONOXIDE` | ppb, µg/m³ | 一氧化氮浓度
| `NumberDeviceClass.NITROUS_OXIDE` | µg/m³ | 一氧化二氮浓度
| `NumberDeviceClass.OZONE` | ppb, ppm, µg/m³ | 臭氧浓度
| `NumberDeviceClass.PH` | None | 水溶液的 Potential hydrogen（pH）
| `NumberDeviceClass.PM1` | µg/m³ | 小于 1 微米的 particulate matter 浓度
| `NumberDeviceClass.PM25` | µg/m³ | 小于 2.5 微米的 particulate matter 浓度
| `NumberDeviceClass.PM4` | µg/m³ | 小于 4 微米的 particulate matter 浓度
| `NumberDeviceClass.PM10` | µg/m³ | 小于 10 微米的 particulate matter 浓度
| `NumberDeviceClass.POWER` | mW, W, kW, MW, GW, TW | Power。
| `NumberDeviceClass.POWER_FACTOR` | %, None | Power Factor
| `NumberDeviceClass.PRECIPITATION` | cm, in, mm | Accumulated precipitation
| `NumberDeviceClass.PRECIPITATION_INTENSITY` | in/d, in/h, mm/d, mm/h | Precipitation intensity
| `NumberDeviceClass.PRESSURE` | cbar, bar, hPa, mmHg, inHg, kPa, mbar, Pa, psi, mPa | Pressure。
| `NumberDeviceClass.RADON` | Bq/m³, pCi/L | Radon 浓度
| `NumberDeviceClass.REACTIVE_ENERGY` | varh, kvarh | Reactive energy
| `NumberDeviceClass.REACTIVE_POWER` | mvar, var, kvar | Reactive power
| `NumberDeviceClass.SIGNAL_STRENGTH` | dB, dBm | Signal strength
| `NumberDeviceClass.SOUND_PRESSURE` | dB, dBA | Sound pressure
| `NumberDeviceClass.SPEED` | ft/s, in/d, in/h, in/s, km/h, kn, m/s, mph, mm/d, mm/s | Generic speed
| `NumberDeviceClass.SULPHUR_DIOXIDE` | ppb, µg/m³ | 二氧化硫浓度
| `NumberDeviceClass.TEMPERATURE` | °C, °F, K | Temperature。
| `NumberDeviceClass.TEMPERATURE_DELTA` | °C, °F, K | 此 device class 表示 temperature interval（delta），即两个 temperature values 之间的差。
| `NumberDeviceClass.VOLATILE_ORGANIC_COMPOUNDS` | µg/m³, mg/m³ | Volatile organic compounds 浓度
| `NumberDeviceClass.VOLATILE_ORGANIC_COMPOUNDS_PARTS` | ppm, ppb | Volatile organic compounds 比率
| `NumberDeviceClass.VOLTAGE` | V, mV, µV, kV, MV | Voltage
| `NumberDeviceClass.VOLUME` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | Generic volume，此 device class 应用于表示 consumption，例如 vehicle 消耗的 fuel 量。
| `NumberDeviceClass.VOLUME_FLOW_RATE` | m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, mL/s | Volume flow rate，此 device class 应用于表示某些 volume 的 flow，例如瞬间消耗的水量。
| `NumberDeviceClass.VOLUME_STORAGE` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | Generic stored volume，此 device class 应用于表示 stored volume，例如 fuel tank 中的 fuel 量。
| `NumberDeviceClass.WATER` | L, gal, m³, ft³, CCF, MCF | Water consumption
| `NumberDeviceClass.WEIGHT` | kg, g, mg, µg, oz, lb, st | Generic mass；`weight` 用于代替 `mass` 以符合日常语言。
| `NumberDeviceClass.WIND_DIRECTION` | ° | Wind direction
| `NumberDeviceClass.WIND_SPEED` | ft/s, km/h, kn, m/s, mph | Wind speed

## 恢复 number 状态

在 restart 或 reload 后恢复 state 的 numbers 不应扩展 `RestoreEntity`，因为它不存储 `native_value`，而是存储可能被 number base entity 修改的 `state`。恢复 state 的 numbers 应扩展 `RestoreNumber`，并从 `async_added_to_hass` 调用 `await self.async_get_last_number_data`，以访问存储的 `native_min_value`、`native_max_value`、`native_step`、`native_unit_of_measurement` 和 `native_value`。

## 方法

### 设置值

当用户或 automation 想要更新 value 时调用。

```python
class MyNumber(NumberEntity):
    # 实现以下方法之一。

    def set_native_value(self, value: float) -> None:
        """Update the current value."""

    async def async_set_native_value(self, value: float) -> None:
        """Update the current value."""

```
