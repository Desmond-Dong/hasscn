---
title: Sensor entity
sidebar_label: Sensor
---

Sensor 是一种提供某些信息的 read-only entity。信息具有一个 value，以及选项性的计量单位。从 [`homeassistant.components.sensor.SensorEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/sensor/__init__.py) 派生 entity platforms。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| device_class | `SensorDeviceClass \| None` | `None` | Sensor 的类型。
| last_reset | `datetime.datetime \| None` | `None` | 累积型 sensor（如 electricity usage meter、gas meter、water meter 等）被初始化的时间。如果初始化时间未知，设为 `None`。注意，`last_reset` property 返回的 `datetime.datetime` 在更新 entity 的 state attributes 时将被转换为 ISO 8601 格式字符串。更改 `last_reset` 时，`state` 必须是有效的 number。
| native_unit_of_measurement | `str \| None` | `None` | Sensor 的 value 所表示的计量单位。如果 `native_unit_of_measurement` 是 °C 或 °F，且其 `device_class` 是 temperature，则 sensor 的 `unit_of_measurement` 将为用户配置的 preferred temperature unit，sensor 的 `state` 将是可选单位转换后的 `native_value`。如果提供了 [unit translation](/developers/internationalization/core#unit-of-measurement-of-entities)，则不应定义 `native_unit_of_measurement`。
| native_value | `str \| int \| float \| date \| datetime \| Decimal \| None` | **必需** | Sensor 的 `native_unit_of_measurement` 中的 value。使用 `device_class` 可能限制此 property 可返回的 types。
| options | `list[str] \| None` | `None` | 如果此 sensor 提供 text state，此 property 可用于提供可能的 states 列表。要求设置 `enum` device class。不能与 `state_class` 或 `native_unit_of_measurement` 组合使用。
| state_class | `SensorStateClass \| str \| None` | `None` | State 的类型。如果非 `None`，则假设 sensor 为数值型，前端将显示为 line-chart 而不是离散 values。
| suggested_display_precision | `int \| None` | `None` | 显示 sensor 的 state 时应使用的小数位数。
| suggested_unit_of_measurement | `str \| None` | `None` | 用于 sensor state 的计量单位。对于具有 `unique_id` 的 sensors，这将用作初始计量单位，用户随后可以覆盖。对于没有 `unique_id` 的 sensors，这将是 sensor state 的计量单位。此 property 旨在供集成覆盖自动单位转换规则，例如使 temperature sensor 无论配置的 unit system 首选 `°C` 还是 `°F` 都始终显示为 `°C`，或使 distance sensor 即使配置的 unit system 是 metric 也始终显示为 miles。

:::tip
对于 sensor entity，不要添加 `extra_state_attributes`，而应创建额外的 sensor entity。不改变的 attributes 只保存一次到 database 中。如果 `extra_state_attributes` 和 sensor value 都频繁变化，会迅速增加 database 的大小。
:::

### 可用的设备类型

如果指定 device class，你的 sensor entity 还需要返回正确的计量单位。

| Constant | Supported units | Description
| ---- | ---- | -----------
| `SensorDeviceClass.ABSOLUTE_HUMIDITY` | g/m³, mg/m³ | Absolute humidity
| `SensorDeviceClass.APPARENT_POWER` | mVA, VA, kVA | Apparent power
| `SensorDeviceClass.AQI` | None | Air Quality Index
| `SensorDeviceClass.AREA` | m², cm², km², mm², in², ft², yd², mi², ac, ha | Area
| `SensorDeviceClass.ATMOSPHERIC_PRESSURE` | cbar, bar, hPa, mmHG, inHg, inH₂O, kPa, mbar, Pa, psi | Atmospheric pressure
| `SensorDeviceClass.BATTERY` | % | 剩余 battery 百分比
| `SensorDeviceClass.BLOOD_GLUCOSE_CONCENTRATION` | mg/dL, mmol/L | Blood glucose concentration
| `SensorDeviceClass.CO2` | ppm | 二氧化碳浓度。
| `SensorDeviceClass.CO` | ppb, ppm, µg/m³, mg/m³ | 一氧化碳浓度。
| `SensorDeviceClass.CONDUCTIVITY` | S/cm, mS/cm, µS/cm | Conductivity
| `SensorDeviceClass.CURRENT` | A, mA, µA | Current
| `SensorDeviceClass.DATA_RATE` | bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, GiB/s | Data rate
| `SensorDeviceClass.DATA_SIZE` | bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB | Data size
| `SensorDeviceClass.DATE` | | Date。要求 `native_value` 是 Python `datetime.date` 对象，或 `None`。
| `SensorDeviceClass.DISTANCE` | km, m, cm, mm, mi, nmi, yd, in | Generic distance
| `SensorDeviceClass.DURATION` | d, h, min, s, ms, µs | Time period。不应仅因时间流逝而更新。Device 或 service 需要给出新的数据点才能更新。
| `SensorDeviceClass.ENERGY` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | Energy，此 device class 应用于表示 energy consumption 的 sensors，例如 electricity meter。表示 _power_ over _time_。不要与 `power` 混淆。
| `SensorDeviceClass.ENERGY_DISTANCE` | kWh/100km, Wh/km, mi/kWh, km/kWh | Energy per distance，此 device class 应用于表示按距离的 energy consumption，例如 electric car 消耗的 electric energy 量。
| `SensorDeviceClass.ENERGY_STORAGE` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | Stored energy，此 device class 应用于表示 stored energy 的 sensors，例如 battery 中当前存储的 electric energy 量或 battery 的 capacity。表示 _power_ over _time_。不要与 `power` 混淆。
| `SensorDeviceClass.ENUM` | | Sensor 具有有限的（非 numeric）states 集。使用此 device class 时，`options` property 必须设为可能的 states 列表。
| `SensorDeviceClass.FREQUENCY` | mHz, Hz, kHz, MHz, GHz | Frequency
| `SensorDeviceClass.GAS` | L, m³, ft³, CCF, MCF | Gas 的体积。以 kWh 的 energy 测量的 gas consumption 而不是体积，应归类为 energy。
| `SensorDeviceClass.HUMIDITY` | % | Relative humidity
| `SensorDeviceClass.ILLUMINANCE` | lx | Light level
| `SensorDeviceClass.IRRADIANCE` | W/m², BTU/(h⋅ft²) | Irradiance
| `SensorDeviceClass.MOISTURE` | % | Moisture
| `SensorDeviceClass.MONETARY` | [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) | 带有 currency 的 Monetary value。
| `SensorDeviceClass.NITROGEN_DIOXIDE` | ppb, ppm, µg/m³ | 二氧化氮浓度
| `SensorDeviceClass.NITROGEN_MONOXIDE` | ppb, µg/m³ | 一氧化氮浓度
| `SensorDeviceClass.NITROUS_OXIDE` | µg/m³ | 一氧化二氮浓度
| `SensorDeviceClass.OZONE` | ppb, ppm, µg/m³ | 臭氧浓度
| `SensorDeviceClass.PH` | None | 水溶液的 Potential hydrogen（pH）
| `SensorDeviceClass.PM1` | µg/m³ | 小于 1 微米的 particulate matter 浓度
| `SensorDeviceClass.PM25` | µg/m³ | 小于 2.5 微米的 particulate matter 浓度
| `SensorDeviceClass.PM4` | µg/m³ | 小于 4 微米的 particulate matter 浓度
| `SensorDeviceClass.PM10` | µg/m³ | 小于 10 微米的 particulate matter 浓度
| `SensorDeviceClass.POWER` | mW, W, kW, MW, GW, TW | Power。
| `SensorDeviceClass.POWER_FACTOR` | %, None | Power Factor
| `SensorDeviceClass.PRECIPITATION` | cm, in, mm | Accumulated precipitation
| `SensorDeviceClass.PRECIPITATION_INTENSITY` | in/d, in/h, mm/d, mm/h | Precipitation intensity
| `SensorDeviceClass.PRESSURE` | cbar, bar, hPa, mmHg, inHg, kPa, mbar, Pa, psi, mPa | Pressure。
| `SensorDeviceClass.RADON` | Bq/m³, pCi/L | Radon 浓度
| `SensorDeviceClass.REACTIVE_ENERGY` | varh, kvarh | Reactive energy
| `SensorDeviceClass.REACTIVE_POWER` | mvar, var, kvar | Reactive power
| `SensorDeviceClass.SIGNAL_STRENGTH` | dB, dBm | Signal strength
| `SensorDeviceClass.SOUND_PRESSURE` | dB, dBA | Sound pressure
| `SensorDeviceClass.SPEED` | ft/s, in/d, in/h, in/s, km/h, kn, m/s, mph, mm/d, mm/s | Generic speed
| `SensorDeviceClass.SULPHUR_DIOXIDE` | ppb, µg/m³ | 二氧化硫浓度
| `SensorDeviceClass.TEMPERATURE` | °C, °F, K | Temperature。
| `SensorDeviceClass.TEMPERATURE_DELTA` | °C, °F, K | 此 device class 表示 temperature interval（delta），即两个 temperature values 之间的差。
| `SensorDeviceClass.TIMESTAMP` | | Timestamp。要求 `native_value` 返回 Python `datetime.datetime` 对象，带 timezone 信息，或 `None`。
| `SensorDeviceClass.UPTIME` | | Timestamp。表示 device 上次 boot 的 datetime。要求 `native_value` 返回 Python `datetime.datetime` 对象，带 timezone 信息，或 `None`。
| `SensorDeviceClass.VOLATILE_ORGANIC_COMPOUNDS` | µg/m³, mg/m³ | Volatile organic compounds 浓度
| `SensorDeviceClass.VOLATILE_ORGANIC_COMPOUNDS_PARTS` | ppm, ppb | Volatile organic compounds 比率
| `SensorDeviceClass.VOLTAGE` | V, mV, µV, kV, MV | Voltage
| `SensorDeviceClass.VOLUME` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | Generic volume，此 device class 应用于表示 consumption 的 sensors，例如 vehicle 消耗的 fuel 量。
| `SensorDeviceClass.VOLUME_FLOW_RATE` | m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, mL/s | Volume flow rate，此 device class 应用于表示某些 volume 的 flow 的 sensors，例如瞬间消耗的水量。
| `SensorDeviceClass.VOLUME_STORAGE` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | Generic stored volume，此 device class 应用于表示 stored volume 的 sensors，例如 fuel tank 中的 fuel 量。
| `SensorDeviceClass.WATER` | L, gal, m³, ft³, CCF, MCF | Water consumption
| `SensorDeviceClass.WEIGHT` | kg, g, mg, µg, oz, lb, st | Generic mass；`weight` 用于代替 `mass` 以符合日常语言。
| `SensorDeviceClass.WIND_DIRECTION` | ° | Wind direction，如果 wind speed 为 0 或太低而无法准确测量 wind direction，则应设为 `None`。
| `SensorDeviceClass.WIND_SPEED` | ft/s, km/h, kn, m/s, mph | Wind speed

### 可用的 state classes

:::caution
选择 sensor 的 state class 时要谨慎。在大多数情况下，应选择 state class `SensorStateClass.MEASUREMENT` 或没有 `last_reset` 的 state class `SensorStateClass.TOTAL`，下面 [How to choose `state_class` and `last_reset`](#how-to-choose-state_class-and-last_reset) 中进一步解释了这一点。
:::

| Type | Description
| ---- | -----------
| `SensorStateClass.MEASUREMENT` | State 表示 _present time 的 measurement_，而不是历史聚合（如统计）或未来预测。应归类为 `SensorStateClass.MEASUREMENT` 的示例有：current temperature、humidity 或 electric power。不应归类为 `SensorStateClass.MEASUREMENT` 的示例有：明天的 forecasted temperature、昨天的 energy consumption 或任何不包含 _current_ measurement 的内容。对于支持的 sensors，每小时 min、max 和平均 sensor readings 的 statistics 每 5 分钟更新一次。
| `SensorStateClass.MEASUREMENT_ANGLE` | 与上述 `SensorStateClass.MEASUREMENT` 类似，state 表示以 degrees（`°`）测量的 angles 在 _present time 的 measurement_。应归类为 `SensorStateClass.MEASUREMENT_ANGLE` 的示例有：current wind direction
| `SensorStateClass.TOTAL` | State 表示既可以增加又可以减少的 total amount，例如 net energy meter。从 sensor 首次添加以来其 value 的 accumulated growth 或 decline 的 statistics 每 5 分钟更新一次。此 state class 不应用于对 absolute value 感兴趣而不是 accumulated growth 或 decline 的 sensors，例如剩余 battery capacity 或 CPU load；在这种情况下应改用 state class `SensorStateClass.MEASUREMENT`。
| `SensorStateClass.TOTAL_INCREASING` | 类似于 `SensorStateClass.TOTAL`，但限制为 state 表示单调递增的 positive total，并定期从 0 重新开始计数，例如每日消耗的 gas 量、每周 water consumption 或 lifetime energy consumption。从 sensor 首次添加以来其 value 的 accumulated growth 的 statistics 每 5 分钟更新一次。Decreasing value 被解释为新 meter cycle 的开始或 meter 的更换。

### entity 选项

Sensors 可以由用户配置，这是通过在其 entity registry entry 中存储 `sensor` entity options 来实现的。

| Option | Description
| ------ | -----------
| `unit_of_measurement` | 对于 device class 为 `SensorDeviceClass.PRESSURE` 或 `SensorDeviceClass.TEMPERATURE` 的 sensors，可以覆盖 sensor 的计量单位。

## 恢复 sensor 状态

在 restart 或 reload 后恢复 state 的 sensors 不应扩展 `RestoreEntity`，因为它不存储 `native_value`，而是存储可能被 sensor base entity 修改的 `state`。恢复 state 的 sensors 应扩展 `RestoreSensor`，并从 `async_added_to_hass` 调用 `await self.async_get_last_sensor_data`，以访问存储的 `native_value` 和 `native_unit_of_measurement`。

## 长期统计

Home Assistant 支持将 sensors 存储为 long-term statistics，前提是 entity 具有
正确的 properties。要 opt-in 进入 statistics，sensor 必须将
`state_class` 设为有效的 state class 之一：`SensorStateClass.MEASUREMENT`、`SensorStateClass.TOTAL` 或
`SensorStateClass.TOTAL_INCREASING`。
对于某些 device classes，statistics 的 unit 会被 normalized，例如使
能够在单个 graph 中绘制多个 sensors。

### 不表示总量的 entities

Home Assistant 在 statistics 期间跟踪 min、max 和 mean value。
`state_class` property 必须设为 `SensorStateClass.MEASUREMENT`，且 `device_class` 不能
是 `SensorDeviceClass.DATE`、`SensorDeviceClass.ENUM`、`SensorDeviceClass.ENERGY`、`SensorDeviceClass.GAS`、`SensorDeviceClass.MONETARY`、
`SensorDeviceClass.TIMESTAMP`、`SensorDeviceClass.VOLUME` 或 `SensorDeviceClass.WATER` 中的任何一种。

### 表示总量的 entities

跟踪 total amount 的 entities 具有一个可能定期重置的 value，
例如本月 energy consumption、今天的 energy production、过去一周用于供暖的 pellets 重量，或 stock portfolio 的年度增长。首次编译 statistics 时 sensor 的 value 用作初始零基准点。

#### 如何选择 `state_class` 和 `last_reset`

建议尽可能使用没有 `last_reset` 的 state class `SensorStateClass.TOTAL`，只有在没有 `last_reset` 的 state class `SensorStateClass.TOTAL` 不适用于 sensor 时，才应使用 state class `SensorStateClass.TOTAL_INCREASING` 或带有 `last_reset` 的 `SensorStateClass.TOTAL`。

示例：

- Sensor 的 value 从不重置，例如 lifetime total energy consumption 或 production：state_class `SensorStateClass.TOTAL`，`last_reset` 未设置或设为 `None`
- Sensor 的 value 可能重置为 0，且其 value 只能增加：state class `SensorStateClass.TOTAL_INCREASING`。示例：与 billing cycle 对齐的 energy consumption（例如每月），每次断开连接时重置为 0 的 energy meter
- Sensor 的 value 可能重置为 0，且其 value 既可以增加又可以减少：state class `SensorStateClass.TOTAL`，在 value 重置时更新 `last_reset`。示例：与 billing cycle 对齐的 net energy consumption（例如每月）。
- Sensor 的 state 每次 state update 时重置，例如每分钟更新一次、显示过去一分钟 energy consumption 的 sensor：state class `SensorStateClass.TOTAL`，每次 state change 时更新 `last_reset`。

#### 状态类 `SensorStateClass.TOTAL`

对于 state class 为 `SensorStateClass.TOTAL` 的 sensors，`last_reset` attribute 可以
选项性地设置，以获取对 meter cycles 的 manual control。
Sensor 首次添加到 Home Assistant 时的 state 用作初始
零基准点。当 `last_reset` 改变时，零基准点将设为 0。
如果未设置 last_reset，则计算 `sum` statistics 时使用 sensor 首次添加时的 value 作为
零基准点。

换句话说：更新 statistics 时的逻辑是用当前 state 与前一个 state 之间的差来更新
sum 列，除非 `last_reset` 已改变，此时不添加任何内容。

没有 last_reset 的 state class `SensorStateClass.TOTAL` 示例：

| t                      | state  | sum    | sum_increase | sum_decrease
| :--------------------- | -----: | -----: | -----------: | -----------:
|   2021-08-01T13:00:00  |  1000  |     0  |           0  |           0
|   2021-08-01T14:00:00  |  1010  |    10  |          10  |           0
|   2021-08-01T15:00:00  |     0  | -1000  |          10  |        1010
|   2021-08-01T16:00:00  |     5  |  -995  |          15  |        1010

带有 last_reset 的 state class `SensorStateClass.TOTAL` 示例：

| t                      | state  | last_reset          | sum    | sum_increase | sum_decrease
| :--------------------- | -----: | ------------------- | -----: | -----------: | -----------:
|   2021-08-01T13:00:00  |  1000  | 2021-08-01T13:00:00 |     0  |           0  |           0
|   2021-08-01T14:00:00  |  1010  | 2021-08-01T13:00:00 |    10  |          10  |           0
|   2021-08-01T15:00:00  |  1005  | 2021-08-01T13:00:00 |     5  |          10  |           5
|   2021-08-01T16:00:00  |     0  | 2021-09-01T16:00:00 |     5  |          10  |           5
|   2021-08-01T17:00:00  |     5  | 2021-09-01T16:00:00 |    10  |          15  |           5

新 meter cycle 开始时初始 state 不为 0、但将 0 用作零基准点的 state class `SensorStateClass.TOTAL` 示例：

| t                      | state  | last_reset          | sum    | sum_increase | sum_decrease
| :--------------------- | -----: | ------------------- | -----: | -----------: | -----------:
|   2021-08-01T13:00:00  |  1000  | 2021-08-01T13:00:00 |     0  |           0  |           0
|   2021-08-01T14:00:00  |  1010  | 2021-08-01T13:00:00 |    10  |          10  |           0
|   2021-08-01T15:00:00  |  1005  | 2021-08-01T13:00:00 |     5  |          10  |           5
|   2021-08-01T16:00:00  |     5  | 2021-09-01T16:00:00 |    10  |          15  |           5
|   2021-08-01T17:00:00  |    10  | 2021-09-01T16:00:00 |    15  |          20  |           5

#### 状态类 `SensorStateClass.TOTAL_INCREASING`

对于 state_class 为 `SensorStateClass.TOTAL_INCREASING` 的 sensors，decreasing value 被
解释为新 meter cycle 的开始或 meter 的更换。重要的是，集成要确保从带有 measurement noise 的 sensor 计算 value 时，value 不会错误地减少。
有一定的容差，state change 之间减少 < 10% 不会触发新 meter cycle。此 state class 适用于 gas meters、electricity meters、water meters 等。
计算 `sum` statistics 时，sensor reading 减少时的 value 不会用作零基准点，而是将零基准点设为 0。

换句话说：更新 statistics 时的逻辑是用当前 state 与前一个 state 之间的差来更新
sum 列，除非该差为负，此时不添加任何内容。

State class `SensorStateClass.TOTAL_INCREASING` 示例：

| t                      | state  | sum
| :--------------------- | -----: | ---:
|   2021-08-01T13:00:00  |  1000  |   0
|   2021-08-01T14:00:00  |  1010  |  10
|   2021-08-01T15:00:00  |     0  |  10
|   2021-08-01T16:00:00  |     5  |  15

Sensor 不重置为 0 的 state class `SensorStateClass.TOTAL_INCREASING` 示例：

| t                      | state  | sum
| :--------------------- | -----: | ---:
|   2021-08-01T13:00:00  |  1000  |   0
|   2021-08-01T14:00:00  |  1010  |  10
|   2021-08-01T15:00:00  |     5  |  15
|   2021-08-01T16:00:00  |    10  |  20

### 处理从不支持到支持计量单位的迁移

集成可能有具有自定义计量单位的 sensors，即它们不使用 Home Assistant 常量来设置 units。
在将这样的 sensor 迁移到 Home Assistant unit system 支持的 unit 时，旧的自定义 unit 必须与 Home Assistant 常量的值完全匹配，否则 Home Assistant 会将其视为 unit change。

例如，集成可能已将 energy sensor 的 unit 设为 `KWh`，这与 `UnitOfEnergy.KILO_WATT_HOUR`（kWh）的值不同。

在编译 long-term statistics 时会检测到这种 unit change。在没有旧 unit 和新 unit 之间关系的知识的情况下，
会抑制 statistics 的收集并生成关于 unit 不稳定的 warning。

为了便于这些 migration 情况，集成可以提供自定义 unit mapping 来声明任何不支持的 unit
等同于一个支持的 unit。这通过在集成的目录中创建 recorder platform `recorder.py`
并实现函数 `async_custom_equivalent_units`，为任何相关的 `entity_id` 返回一个 equivalent units 字典来完成。
此 mapping 将在 statistics 编译期间收集，并使集成能够平稳过渡到 Home Assistant 的 unit system。

示例实现：
```python
@callback
def async_custom_equivalent_units(hass: HomeAssistant) -> dict[str, dict[str | None, str]]:
    """Return custom equivalent units per entity id."""
    return {
        "sensor.example_sensor_1": {
            "b/s": UnitOfDataRate.BYTES_PER_SECOND, # B/s
        },
        "sensor.example_sensor_2": {
            "KWh": UnitOfEnergy.KILO_WATT_HOUR, # kWh
        },
    }
```
