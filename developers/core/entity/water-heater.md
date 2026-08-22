从 [`homeassistant.components.water_heater.WaterHeaterEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/water_heater/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称                  | 类型        | 默认值   | 描述
| --------------------- | ----------- | --------- | -----------
| `min_temp`            | `float`     | 110°F     | 可以设置的最低温度。
| `max_temp`            | `float`     | 140°F     | 可以设置的最高温度。
| `current_temperature` | `float`     | `None`    | 当前温度。
| `target_temperature`  | `float`     | `None`    | 我们试图达到的温度。
| `target_temperature_high` | `float` | `None`    | 我们试图达到的温度的上界。
| `target_temperature_low` | `float`  | `None`    | 我们试图达到的温度的下界。
| `target_temperature_step` | `float`  | `None`    | 目标温度可增加或减少的步长。
| `temperature_unit`    | `str`       | `NotImplementedError` | `UnitOfTemperature.CELSIUS`、`UnitOfTemperature.FAHRENHEIT` 或 `UnitOfTemperature.KELVIN` 之一。
| `current_operation`   | `string`    | `None`    | 当前的 operation mode。
| `operation_list`      | `List[str]` | `None`    | 可能的 operation mode 列表。
| `supported_features`  | `WaterHeaterEntityFeature` | `WaterHeaterEntityFeature(0)`（无功能） | 支持的功能列表。
| `is_away_mode_on`     | `bool`      | `None`    | away mode 的当前状态。

允许的 operation mode 是基础组件中指定的状态，water\_heater 组件的实现不能有所不同。

属性必须遵循 `temperature_unit` 中定义的单位。

## 状态

| 状态 | 描述
| ----- | -----------
| `STATE_ECO` | 节能模式，提供节能和快速加热。
| `STATE_ELECTRIC` | 仅电动模式，能耗最高。
| `STATE_PERFORMANCE` | 高性能模式。
| `STATE_HIGH_DEMAND` | 当热水器功率不足时满足高需求。
| `STATE_HEAT_PUMP` | 加热最慢，但能耗较少。
| `STATE_GAS` | 仅燃气模式，能耗最高。
| `STATE_OFF` | 热水器已关闭。

## 支持的功能

支持的功能通过使用 `WaterHeaterEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值                | 描述               |
| -------------------- | ------------------------- |
| `TARGET_TEMPERATURE` | 可以设置温度    |
| `OPERATION_MODE`     | 可以设置 operation mode |
| `AWAY_MODE`          | 可以设置 away mode      |
| `ON_OFF`             | 可以开启或关闭   |

## 方法

### `set_temperature` 或 `async_set_temperature`

设置热水器应将水加热到的温度。

### `set_operation_mode` 或 `async_set_operation_mode`

设置热水器的 operation mode。必须在 operation\_list 中。

### `turn_away_mode_on` 或 `async_turn_away_mode_on`

将热水器设置为 away mode。

### `turn_away_mode_off` 或 `async_turn_away_mode_off`

将热水器恢复到上一个 operation mode。关闭 away mode。

### `turn_on` 或 `async_turn_on`

开启热水器。

### `turn_off` 或 `async_turn_off`

关闭热水器。
