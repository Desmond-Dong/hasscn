---
title: 数值实体
sidebar_label: 数值
---

`number` 是一种允许用户向集成输入任意数值的实体平台。请从 [`homeassistant.components.number.NumberEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/number/__init__.py) 派生你的实体。

## 属性

:::tip
属性应始终只从内存中返回信息，而不执行 I/O（例如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------- | ---- |
| `device_class` | string | `None` | 数值的类型。 |
| `mode` | string | `auto` | 定义数值在 UI 中的显示方式。建议使用默认的 `auto`。也可以使用 `box` 或 `slider` 强制指定显示模式。 |
| `native_max_value` | float | 100 | 该数值在 `native_unit_of_measurement` 中允许的最大值（包含）。 |
| `native_min_value` | float | 0 | 该数值在 `native_unit_of_measurement` 中允许的最小值（包含）。 |
| `native_step` | float | **见下文** | 定义值的分辨率，即数值每次可增减的最小步长。 |
| `native_value` | float | **必填** | 该实体在 `native_unit_of_measurement` 中的数值。 |
| `native_unit_of_measurement` | string | `None` | 数值所使用的测量单位。如果 `native_unit_of_measurement` 为 °C 或 °F，且 `device_class` 为温度，则该实体的 `unit_of_measurement` 会使用用户配置的首选温度单位，而实体的 `state` 会是经过可选单位转换后的 `native_value`。如果采用了[单位翻译](/developers/internationalization/core#unit-of-measurement-of-entities)，则不应定义 `native_unit_of_measurement`。 |

所有实体通用的其他属性（例如 `icon`、`name` 等）同样适用。

默认步长会根据取值范围（最大值减最小值）动态选择。如果 `max_value` 和 `min_value` 之间的差值大于 1.0，则默认步长为 1.0。否则，步长会持续除以 10，直到小于该范围为止。

### 可用设备类别

如果指定了设备类别，你的数值实体还需要返回正确的测量单位。

| 设备类别 | 支持的单位 | 说明 |
| ---- | ---- | ---- |
| `NumberDeviceClass.ABSOLUTE_HUMIDITY` | g/m³, mg/m³ | 绝对湿度 |
| `NumberDeviceClass.APPARENT_POWER` | mVA, VA, kVA | 视在功率 |
| `NumberDeviceClass.AQI` | None | 空气质量指数 |
| `NumberDeviceClass.AREA` | m², cm², km², mm², in², ft², yd², mi², ac, ha | 面积 |
| `NumberDeviceClass.ATMOSPHERIC_PRESSURE` | cbar, bar, hPa, mmHG, inHg, inH₂O, kPa, mbar, Pa, psi | 大气压 |
| `NumberDeviceClass.BATTERY` | % | 剩余电量百分比 |
| `NumberDeviceClass.BLOOD_GLUCOSE_CONCENTRATION` | mg/dL, mmol/L | 血糖浓度 |
| `NumberDeviceClass.CO2` | ppm | 二氧化碳浓度 |
| `NumberDeviceClass.CO` | ppb, ppm, µg/m³, mg/m³ | 一氧化碳浓度 |
| `NumberDeviceClass.CONDUCTIVITY` | S/cm, mS/cm, µS/cm | 电导率 |
| `NumberDeviceClass.CURRENT` | A, mA | 电流 |
| `NumberDeviceClass.DATA_RATE` | bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, GiB/s | 数据速率 |
| `NumberDeviceClass.DATA_SIZE` | bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB | 数据大小 |
| `NumberDeviceClass.DISTANCE` | km, m, cm, mm, mi, nmi, yd, in | 通用距离 |
| `NumberDeviceClass.DURATION` | d, h, min, s, ms, µs | 时间段。不应仅因时间流逝而更新；必须由设备或服务提供新的数据点后再更新。 |
| `NumberDeviceClass.ENERGY` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | 能量。此设备类别应用于表示能耗，例如电表。表示的是 _功率_ 在 _时间_ 上的累积，不要与 `power` 混淆。 |
| `NumberDeviceClass.ENERGY_DISTANCE` | kWh/100km, Wh/km, mi/kWh, km/kWh | 单位距离能耗。此设备类别应用于表示按距离计算的能耗，例如电动车消耗的电能。 |
| `NumberDeviceClass.ENERGY_STORAGE` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | 储存的能量。此设备类别应用于表示当前储存的能量，例如电池当前储电量或电池容量。表示的是 _功率_ 在 _时间_ 上的累积，不要与 `power` 混淆。 |
| `NumberDeviceClass.FREQUENCY` | Hz, kHz, MHz, GHz | 频率 |
| `NumberDeviceClass.GAS` | L, m³, ft³, CCF, MCF | 气体体积。若气体消耗以 kWh 等能量形式表示，应归类为能量。 |
| `NumberDeviceClass.HUMIDITY` | % | 相对湿度 |
| `NumberDeviceClass.ILLUMINANCE` | lx | 照度 |
| `NumberDeviceClass.IRRADIANCE` | W/m², BTU/(h⋅ft²) | 辐照度 |
| `NumberDeviceClass.MOISTURE` | % | 含湿量 |
| `NumberDeviceClass.MONETARY` | [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) | 货币数值 |
| `NumberDeviceClass.NITROGEN_DIOXIDE` | ppb, ppm, µg/m³ | 二氧化氮浓度 |
| `NumberDeviceClass.NITROGEN_MONOXIDE` | ppb, µg/m³ | 一氧化氮浓度 |
| `NumberDeviceClass.NITROUS_OXIDE` | µg/m³ | 一氧化二氮浓度 |
| `NumberDeviceClass.OZONE` | ppb, ppm, µg/m³ | 臭氧浓度 |
| `NumberDeviceClass.PH` | None | 水溶液的 pH 值 |
| `NumberDeviceClass.PM1` | µg/m³ | 小于 1 微米颗粒物浓度 |
| `NumberDeviceClass.PM25` | µg/m³ | 小于 2.5 微米颗粒物浓度 |
| `NumberDeviceClass.PM4` | µg/m³ | 小于 4 微米颗粒物浓度 |
| `NumberDeviceClass.PM10` | µg/m³ | 小于 10 微米颗粒物浓度 |
| `NumberDeviceClass.POWER` | mW, W, kW, MW, GW, TW | 功率 |
| `NumberDeviceClass.POWER_FACTOR` | %, None | 功率因数 |
| `NumberDeviceClass.PRECIPITATION` | cm, in, mm | 累积降水量 |
| `NumberDeviceClass.PRECIPITATION_INTENSITY` | in/d, in/h, mm/d, mm/h | 降水强度 |
| `NumberDeviceClass.PRESSURE` | cbar, bar, hPa, mmHg, inHg, kPa, mbar, Pa, psi, mPa | 压力 |
| `NumberDeviceClass.REACTIVE_ENERGY` | varh, kvarh | 无功电能 |
| `NumberDeviceClass.REACTIVE_POWER` | mvar, var, kvar | 无功功率 |
| `NumberDeviceClass.SIGNAL_STRENGTH` | dB, dBm | 信号强度 |
| `NumberDeviceClass.SOUND_PRESSURE` | dB, dBA | 声压 |
| `NumberDeviceClass.SPEED` | ft/s, in/d, in/h, in/s, km/h, kn, m/s, mph, mm/d, mm/s | 通用速度 |
| `NumberDeviceClass.SULPHUR_DIOXIDE` | ppb, µg/m³ | 二氧化硫浓度 |
| `NumberDeviceClass.TEMPERATURE` | °C, °F, K | 温度 |
| `NumberDeviceClass.TEMPERATURE_DELTA` | °C, °F, K | 表示温度区间（差值）的设备类别，即两个温度值之间的差。 |
| `NumberDeviceClass.VOLATILE_ORGANIC_COMPOUNDS` | µg/m³, mg/m³ | 挥发性有机化合物浓度 |
| `NumberDeviceClass.VOLATILE_ORGANIC_COMPOUNDS_PARTS` | ppm, ppb | 挥发性有机化合物比例 |
| `NumberDeviceClass.VOLTAGE` | V, mV, µV, kV, MV | 电压 |
| `NumberDeviceClass.VOLUME` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | 通用体积。此设备类别应用于表示消耗量，例如车辆消耗的燃油量。 |
| `NumberDeviceClass.VOLUME_FLOW_RATE` | m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, mL/s | 体积流量。此设备类别应用于表示某种体积的流动，例如瞬时用水量。 |
| `NumberDeviceClass.VOLUME_STORAGE` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | 储存体积。此设备类别应用于表示储量，例如油箱中的燃油量。 |
| `NumberDeviceClass.WATER` | L, gal, m³, ft³, CCF, MCF | 用水量 |
| `NumberDeviceClass.WEIGHT` | kg, g, mg, µg, oz, lb, st | 通用重量；使用 `weight` 而不是 `mass`，以符合日常语言习惯。 |
| `NumberDeviceClass.WIND_DIRECTION` | ° | 风向 |
| `NumberDeviceClass.WIND_SPEED` | ft/s, km/h, kn, m/s, mph | 风速 |

## 恢复数值状态

如果数值实体需要在重启或重新加载后恢复状态，不应继承 `RestoreEntity`，因为它保存的是 `state`，而不是 `native_value`，而 `state` 可能已经被数值实体基类修改过。

需要恢复状态的数值实体应继承 `RestoreNumber`，并在 `async_added_to_hass` 中调用 `await self.async_get_last_number_data()`，以获取已保存的 `native_min_value`、`native_max_value`、`native_step`、`native_unit_of_measurement` 和 `native_value`。

## 方法

### 设置值

当用户或自动化希望更新该值时，会调用以下方法。

```python
class MyNumber(NumberEntity):
    # 实现以下方法之一。

    def set_native_value(self, value: float) -> None:
        """Update the current value."""

    async def async_set_native_value(self, value: float) -> None:
        """Update the current value."""

```
