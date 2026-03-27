---
title: 传感器实体
description: '传感器是提供一些信息的只读实体。信息具有价值，并且可选地具有测量单位。平台实体派生自homeassistant.components.sensor.SensorEntity(https://github.com/home-assistant/home-assistant/blob/master/homeass。'
sidebar_label: 传感器
---
# 传感器实体

传感器是提供一些信息的只读实体。信息具有价值，并且可选地具有测量单位。平台实体派生自[`homeassistant.components.sensor.SensorEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/sensor/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| device_class | <code>SensorDeviceClass &#124; None</code> | `None` | 传感器类型。
| last_reset | <code>datetime.datetime &#124; None</code> | `None` | 电表、煤气表、水表等累计传感器初始化的时间。如果初始化时间未知，则设置为`None`。请注意，当更新实体的状态属性时，`last_reset` 属性返回的 `datetime.datetime` 将转换为 ISO 8601 格式的字符串。更改 `last_reset` 时，`state` 必须是有效号码。
| native_unit_of_measurement | <code>str &#124; None</code> | `None` | 传感器值表示的测量单位。如果 `native_unit_of_measurement` 为 °C 或 °F，且 `device_class` 为温度，则传感器的 `unit_of_measurement` 将是用户配置的首选温度单位，传感器的 `state` 将是经过可选单位转换后的 `native_value`。如果是 [提供单位翻译](/developers/internationalization/core#unit-of-measurement-of-entities)，则不应定义 `native_unit_of_measurement`。
| native_value | <code>str &#124; int &#124; float &#124; date &#124; datetime &#124; Decimal &#124; None</code> | **Required** | 传感器的`native_unit_of_measurement`中的传感器值。使用 `device_class` 可能会限制此属性可返回的类型。
| options | <code>list[str] &#124; None</code> | `None` | 如果该传感器提供文本状态，则该属性可用于提供可能状态的列表。需要设置 `enum` 设备类别。不能与 `state_class` 或 `native_unit_of_measurement` 组合使用。
| state_class | <code>SensorStateClass &#124; str &#124; None</code> | `None` | 状态类型。如果不是 `None`，则假定传感器是数字传感器，并将在前端显示为折线图，而不是离散值。
| suggested_display_precision | <code>int &#124; None</code> | `None` | 显示传感器状态时应使用的小数位数。
| suggested_unit_of_measurement | <code>str &#124; None</code> | `None` | 用于传感器状态的测量单位。对于具有 `unique_id` 的传感器，这将用作初始测量单位，然后用户可以覆盖该单位。对于没有 `unique_id` 的传感器，这将是传感器状态的测量单位。此属性旨在供集成用来覆盖自动单位转换规则，例如，使温度传感器始终以 `°C` 显示，无论配置的单位系统是首选 `°C` 还是 `°F`，或者使距离传感器始终以英里显示，即使配置的单位系统是公制。

:::tip
不要为传感器实体添加 `extra_state_attributes`，而是创建一个附加传感器实体。不改变的属性只在数据库中保存一次。如果 `extra_state_attributes` 和传感器值都频繁变化，这会快速增加数据库的大小。
:::

### 可用设备类别

如果指定设备类别，您的传感器实体还需要返回正确的测量单位。

| 常量 | 支持单位 | 说明
| ---- | ---- | -----------
| `SensorDeviceClass.ABSOLUTE_HUMIDITY` | g/m³, mg/m³ | 绝对湿度
| `SensorDeviceClass.APPARENT_POWER` | mVA, VA, kVA | 视在功率
| `SensorDeviceClass.AQI` | None | 空气质量指数
| `SensorDeviceClass.AREA` | m², cm², km², mm², in², ft², yd², mi², ac, ha | 区域
| `SensorDeviceClass.ATMOSPHERIC_PRESSURE` | cbar, bar, hPa, mmHG, inHg, inH₂O, kPa, mbar, Pa, psi | 气压
| `SensorDeviceClass.BATTERY` | % | 剩余电量百分比
| `SensorDeviceClass.BLOOD_GLUCOSE_CONCENTRATION` | mg/dL, mmol/L | 血糖浓度
| `SensorDeviceClass.CO2` | ppm | 二氧化碳的浓度。
| `SensorDeviceClass.CO` | ppb, ppm, µg/m³, mg/m³ | 一氧化碳浓度。
| `SensorDeviceClass.CONDUCTIVITY` | S/cm, mS/cm, µS/cm | 电导率
| `SensorDeviceClass.CURRENT` | A, mA | 当前的
| `SensorDeviceClass.DATA_RATE` | bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, GiB/s | 数据速率
| `SensorDeviceClass.DATA_SIZE` | bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB | 数据大小
| `SensorDeviceClass.DATE` |  | 日期。要求 `native_value` 是 Python `datetime.date` 对象或 `None`。
| `SensorDeviceClass.DISTANCE` | km, m, cm, mm, mi, nmi, yd, in | 通用距离
| `SensorDeviceClass.DURATION` | d, h, min, s, ms, µs | 时间段。不应仅因时间流逝而更新。设备或服务需要提供新的数据点来更新。
| `SensorDeviceClass.ENERGY` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | 能源，该设备类应用于表示能源消耗的传感器，例如电表。代表_power_超过_time_。不要与 `power` 混淆。
| `SensorDeviceClass.ENERGY_DISTANCE` | kWh/100km, Wh/km, mi/kWh, km/kWh | 每距离能量，该设备类应用于表示按距离的能量消耗，例如电动汽车消耗的电能量。
| `SensorDeviceClass.ENERGY_STORAGE` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal | 存储能量，该设备类应用于表示存储能量的传感器，例如当前存储在电池中的电能数量或电池的容量。代表_power_超过_time_。不要与 `power` 混淆。
| `SensorDeviceClass.ENUM` |  | 传感器具有一组有限的（非数字）状态。使用此设备类时，必须将 `options` 属性设置为可能状态的列表。
| `SensorDeviceClass.FREQUENCY` | Hz, kHz, MHz, GHz | 频率
| `SensorDeviceClass.GAS` | L, m³, ft³, CCF, MCF | 气体体积。以千瓦时而非体积为单位测量的燃气消耗量应归类为能源。
| `SensorDeviceClass.HUMIDITY` | % | 相对湿度
| `SensorDeviceClass.ILLUMINANCE` | lx | 光照水平
| `SensorDeviceClass.IRRADIANCE` | W/m², BTU/(h⋅ft²) | 辐照度
| `SensorDeviceClass.MOISTURE` | % | 水分
| `SensorDeviceClass.MONETARY` | [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) | 货币的货币价值。
| `SensorDeviceClass.NITROGEN_DIOXIDE` | ppb, ppm, µg/m³ | 二氧化氮浓度
| `SensorDeviceClass.NITROGEN_MONOXIDE` | ppb, µg/m³ | 一氧化氮浓度
| `SensorDeviceClass.NITROUS_OXIDE` | µg/m³ | 一氧化二氮浓度
| `SensorDeviceClass.OZONE` | ppb, ppm, µg/m³ | 臭氧浓度
| `SensorDeviceClass.PH` | None | 水溶液的氢势 (pH)
| `SensorDeviceClass.PM1` | µg/m³ | 颗粒物浓度小于1微米
| `SensorDeviceClass.PM25` | µg/m³ | 颗粒物浓度小于2.5微米
| `SensorDeviceClass.PM4` | µg/m³ | 颗粒物浓度小于4微米
| `SensorDeviceClass.PM10` | µg/m³ | 颗粒物浓度小于10微米
| `SensorDeviceClass.POWER` | mW, W, kW, MW, GW, TW | 力量。
| `SensorDeviceClass.POWER_FACTOR` | %, None | 功率因数
| `SensorDeviceClass.PRECIPITATION` | cm, in, mm | 累计降水量
| `SensorDeviceClass.PRECIPITATION_INTENSITY` | in/d, in/h, mm/d, mm/h | 降水强度
| `SensorDeviceClass.PRESSURE` | cbar, bar, hPa, mmHg, inHg, kPa, mbar, Pa, psi, mPa | 压力。
| `SensorDeviceClass.REACTIVE_ENERGY` | varh, kvarh | 无功电能
| `SensorDeviceClass.REACTIVE_POWER` | mvar, var, kvar | 无功功率
| `SensorDeviceClass.SIGNAL_STRENGTH` | dB, dBm | 信号强度
| `SensorDeviceClass.SOUND_PRESSURE` | dB, dBA | 声压
| `SensorDeviceClass.SPEED` | ft/s, in/d, in/h, in/s, km/h, kn, m/s, mph, mm/d, mm/s | 通用速度
| `SensorDeviceClass.SULPHUR_DIOXIDE` | ppb, µg/m³ | 二氧化硫浓度
| `SensorDeviceClass.TEMPERATURE` | °C, °F, K | 温度。
| `SensorDeviceClass.TEMPERATURE_DELTA` | °C, °F, K | 该设备类别表示温度间隔 (delta)，即两个温度值之间的差异。
| `SensorDeviceClass.TIMESTAMP` |  | 时间戳。要求 `native_value` 返回带有时区信息的 Python `datetime.datetime` 对象或 `None`。
| `SensorDeviceClass.VOLATILE_ORGANIC_COMPOUNDS` | µg/m³, mg/m³ | 挥发性有机化合物浓度
| `SensorDeviceClass.VOLATILE_ORGANIC_COMPOUNDS_PARTS` | ppm, ppb | 挥发性有机化合物比例
| `SensorDeviceClass.VOLTAGE` | V, mV, µV, kV, MV | 电压
| `SensorDeviceClass.VOLUME` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | 通用卷，此设备类应用于表示消耗的传感器，例如车辆消耗的燃料量。
| `SensorDeviceClass.VOLUME_FLOW_RATE` | m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, mL/s | 体积流量，该设备类别应用于表示一定体积流量的传感器，例如瞬间消耗的水量。
| `SensorDeviceClass.VOLUME_STORAGE` | L, mL, gal, fl. oz., m³, ft³, CCF, MCF | 通用存储容量，此设备类应用于表示存储容量的传感器，例如油箱中的燃油量。
| `SensorDeviceClass.WATER` | L, gal, m³, ft³, CCF, MCF | 用水量
| `SensorDeviceClass.WEIGHT` | kg, g, mg, µg, oz, lb, st | 通用质量；使用 `weight` 代替 `mass` 以适应日常语言。
| `SensorDeviceClass.WIND_DIRECTION` | ° | 风向，如果风速为0或风速太低而无法准确测量风向，则应设置为`None`。
| `SensorDeviceClass.WIND_SPEED` | ft/s, km/h, kn, m/s, mph | 风速

### 可用状态类

:::caution
请谨慎选择传感器的状态类别。在大多数情况下，应选择状态类 `SensorStateClass.MEASUREMENT` 或不带 `last_reset` 的状态类 `SensorStateClass.TOTAL`，这将在下面的 [如何选择`state_class`和`last_reset`](#how-to-choose-state_class-and-last_reset) 中进一步解释。
:::

| 类型 | 说明
| ---- | -----------
| `SensorStateClass.MEASUREMENT` | 状态代表_当前的测量_，而不是历史聚合，例如统计数据或对未来的预测。应分类为 `SensorStateClass.MEASUREMENT` 的示例包括：当前温度、湿度或电力。  不应归类为 `SensorStateClass.MEASUREMENT` 的示例：明天的预测温度、昨天的能源消耗或不包括_当前_测量的任何其他内容。对于支持的传感器，每小时最小、最大和平均传感器读数的统计数据每 5 分钟更新一次。
| `SensorStateClass.MEASUREMENT_ANGLE` | 与上面的 `SensorStateClass.MEASUREMENT` 类似，该状态表示_当前时间的测量_以度为单位测量的角度 (`°`)。应分类为 `SensorStateClass.MEASUREMENT_ANGLE` 的示例是当前风向
| `SensorStateClass.TOTAL` | 状态表示可以增加和减少的总量，例如净能量计。自首次添加以来传感器值的累计增长或下降的统计数据每 5 分钟更新一次。此状态类不应用于关注绝对值而不是累积增长或下降的传感器，例如剩余电池容量或 CPU 负载；在这种情况下，应使用状态类 `SensorStateClass.MEASUREMENT`。
| `SensorStateClass.TOTAL_INCREASING` | 与 `SensorStateClass.TOTAL` 类似，限制是状态表示单调递增的正总数，定期从 0 重新开始计数，例如每日消耗的燃气量、每周的水消耗量或终生能源消耗量。自首次添加以来传感器值的累计增长统计数据每 5 分钟更新一次。减小的值被解释为新的仪表周期的开始或更换仪表。

### 实体选项

用户可以配置传感器，这是通过将 `sensor` 实体选项存储在传感器的实体注册表项中来完成的。

| 选项 | 说明
| ------ | -----------
| `unit_of_measurement` | 对于设备类别为 `SensorDeviceClass.PRESSURE` 或 `SensorDeviceClass.TEMPERATURE` 的传感器，可以覆盖传感器的测量单位。

## 恢复传感器状态

重新启动或重新加载后恢复状态的传感器不应扩展 `RestoreEntity`，因为它不存储 `native_value`，而是存储可能已被传感器基础实体修改的 `state`。恢复状态的传感器应扩展 `RestoreSensor` 并从 `async_added_to_hass` 调用 `await self.async_get_last_sensor_data`，以访问存储的 `native_value` 和 `native_unit_of_measurement`。

## 长期统计

如果实体有，Home Assistant支持将传感器存储为长期统计数据
正确的属性。要选择统计数据，传感器必须具有
`state_class` 设置为有效状态类之一：`SensorStateClass.MEASUREMENT`、`SensorStateClass.TOTAL` 或
`SensorStateClass.TOTAL_INCREASING`。
对于某些设备类别，统计数据的单位被标准化为例如
可以在一张图中绘制多个传感器。

### 不代表总金额的实体

Home Assistant 跟踪统计期间的最小值、最大值和平均值。这
`state_class` 属性必须设置为 `SensorStateClass.MEASUREMENT`，并且 `device_class` 不得设置为
`SensorDeviceClass.DATE`、`SensorDeviceClass.ENUM`、`SensorDeviceClass.ENERGY`、`SensorDeviceClass.GAS`、`SensorDeviceClass.MONETARY` 之一，
`SensorDeviceClass.TIMESTAMP`、`SensorDeviceClass.VOLUME` 或 `SensorDeviceClass.WATER`。

### 代表总金额的实体

跟踪总金额的实体有一个可以选择定期重置的值，
例如本月的能源消耗量、今天的能源产量、上周用于房屋供暖的颗粒重量或每年的增长量
股票投资组合。编译第一个统计数据时传感器的值用作初始零点。

#### 如何选择`state_class`和`last_reset`

建议尽可能使用不带 `last_reset` 的状态类别 `SensorStateClass.TOTAL`，仅当不带 `last_reset` 的状态类别 `SensorStateClass.TOTAL` 不适用于传感器时，才应使用带 `last_reset` 的状态类别 `SensorStateClass.TOTAL_INCREASING` 或 `SensorStateClass.TOTAL`。

示例：

- 传感器的值永远不会重置，例如一生总能源消耗或生产：state_class `SensorStateClass.TOTAL`、`last_reset` 未设置或设置为 `None`
- 传感器的值可能会重置为 0，并且其值只能增加：状态类别 `SensorStateClass.TOTAL_INCREASING`。示例：能源消耗与计费周期一致，例如每月，每次断开连接时电能表都会重置为 0
- 传感器的值可以重置为 0，并且其值可以增加和减少：状态类 `SensorStateClass.TOTAL`、`last_reset` 在值重置时更新。示例：净能耗与计费周期一致，例如每月。
- 每次状态更新时都会重置传感器的状态，例如传感器每分钟都会更新过去一分钟的能耗：状态类 `SensorStateClass.TOTAL`、`last_reset` 每次状态更改都会更新。

#### 国家级`SensorStateClass.TOTAL`

对于状态类别为 `SensorStateClass.TOTAL` 的传感器，`last_reset` 属性可以
可选择设置为获得仪表周期的手动控制。
传感器首次添加到 Home Assistant 时的状态用作初始状态
零点。当`last_reset`改变时，零点将被设置为0。
如果没有设置last_reset，则传感器第一次添加时的值将用作
计算 `sum` 统计数据时的零点。

换句话说：更新统计数据时的逻辑是更新
当前状态与前一个状态之差的总和列
除非 `last_reset` 已更改，在这种情况下不要添加任何内容。

没有last_reset的状态类`SensorStateClass.TOTAL`的示例：

| t | 状态 | 和 | 总和增加 | 总和减少
| :--------------------- | -----: | -----: | -----------: | -----------:
| 2021-08-01T13:00:00 | 1000 | 0 | 0 | 0
| 2021-08-01T14:00:00 | 1010 | 10 | 10 | 0
| 2021-08-01T15:00:00 | 0 | -1000 | 10 | 1010
| 2021-08-01T16:00:00 | 5 | -995 | 15 | 1010

状态类 `SensorStateClass.TOTAL` 与 last_reset 的示例：

| t | 状态 | 最后重置 | 和 | 总和增加 | 总和减少
| :--------------------- | -----: | ------------------- | -----: | -----------: | -----------:
| 2021-08-01T13:00:00 | 1000 | 2021-08-01T13:00:00 | 0 | 0 | 0
| 2021-08-01T14:00:00 | 1010 | 2021-08-01T13:00:00 | 10 | 10 | 0
| 2021-08-01T15:00:00 | 1005 | 2021-08-01T13:00:00 | 5 | 10 | 5
| 2021-08-01T16:00:00 | 0 | 2021-09-01T16:00:00 | 5 | 10 | 5
| 2021-08-01T17:00:00 | 5 | 2021-09-01T16:00:00 | 10 | 15 | 5

状态类 `SensorStateClass.TOTAL` 的示例，其中初始状态位于开始处
新的仪表周期的值不为0，但以0作为零点：

| t | 状态 | 最后重置 | 和 | 总和增加 | 总和减少
| :--------------------- | -----: | ------------------- | -----: | -----------: | -----------:
| 2021-08-01T13:00:00 | 1000 | 2021-08-01T13:00:00 | 0 | 0 | 0
| 2021-08-01T14:00:00 | 1010 | 2021-08-01T13:00:00 | 10 | 10 | 0
| 2021-08-01T15:00:00 | 1005 | 2021-08-01T13:00:00 | 5 | 10 | 5
| 2021-08-01T16:00:00 | 5 | 2021-09-01T16:00:00 | 10 | 15 | 5
| 2021-08-01T17:00:00 | 10 | 2021-09-01T16:00:00 | 15 | 20 | 5

#### 国家级`SensorStateClass.TOTAL_INCREASING`

对于 state_class `SensorStateClass.TOTAL_INCREASING` 的传感器，递减的值是
解释为新仪表周期的开始或更换仪表。这是
重要的是，集成确保该值不会错误地减少
从存在测量噪声的传感器计算值的情况。有
一定的容忍度，状态变化之间的减少 < 10% 将不会触发新的仪表
循环。该状态类适用于煤气表、电表、水表等。
计算时传感器读数减小时的值不会作为零点
`sum` 统计，零点将设置为 0。

换句话说：更新统计数据时的逻辑是更新
当前状态与前一个状态之差的总和列
除非差值为负，在这种情况下不要添加任何内容。

状态类 `SensorStateClass.TOTAL_INCREASING` 的示例：

| t | 状态 | 和
| :--------------------- | -----: | ---:
| 2021-08-01T13:00:00 | 1000 | 0
| 2021-08-01T14:00:00 | 1010 | 10
| 2021-08-01T15:00:00 | 0 | 10
| 2021-08-01T16:00:00 | 5 | 15

状态类 `SensorStateClass.TOTAL_INCREASING` 的示例，其中传感器未重置为 0：

| t | 状态 | 和
| :--------------------- | -----: | ---:
| 2021-08-01T13:00:00 | 1000 | 0
| 2021-08-01T14:00:00 | 1010 | 10
| 2021-08-01T15:00:00 | 5 | 15
| 2021-08-01T16:00:00 | 10 | 20