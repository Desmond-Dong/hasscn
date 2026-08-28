Climate entity 控制 temperature、humidity 或 fans，例如 A/C systems 和 humidifiers。从 [`homeassistant.components.climate.ClimateEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/climate/__init__.py) 派生 platform entity。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name                    | Type                                | Default                              | Description                                                                |
| ----------------------- | ----------------------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| current\_humidity        | `float \| None`      | `None`                               | 当前的 humidity。                                                      |
| current\_temperature     | `float \| None`      | `None`                               | 当前的 temperature。                                                   |
| fan\_mode                | `str \| None`        | **ClimateEntityFeature.FAN\_MODE 必需**     | 当前的 fan mode。                                                      |
| fan\_modes               | `list[str] \| None`  | **ClimateEntityFeature.FAN\_MODE 必需**     | 可用 fan modes 的列表。                                           |
| hvac\_action             | `HVACAction \| None` | `None`                               | 当前正在执行的动作。见下文。                                        |
| hvac\_mode               | `HVACMode \| None`   | **必需**                         | 选择的 operation mode。见下文。用于确定 `state`。                      |
| hvac\_modes              | `list[HVACMode]`     | **必需**                         | 可用 operation modes 的列表。见下文。                                           |
| max\_humidity            | `float`                             | `DEFAULT_MAX_HUMIDITY`（值 == 99） | 最大 humidity。                                                      |
| max\_temp                | `float`                             | `DEFAULT_MAX_TEMP`（值 == 35 °C）  | `temperature_unit` 中的最大 temperature。                             |
| min\_humidity            | `float`                             | `DEFAULT_MIN_HUMIDITY`（值 == 30） | 最小 humidity。                                                      |
| min\_temp                | `float`                             | `DEFAULT_MIN_TEMP`（值 == 7 °C）   | `temperature_unit` 中的最小 temperature。                             |
| precision               | `float`                             | 根据 `temperature_unit`      | 系统中 temperature 的 precision。默认为 `UnitOfTemperature.CELSIUS` 使用十分位，否则使用整数。 |
| preset\_mode             | `str \| None`        | **ClimateEntityFeature.PRESET\_MODE 必需**  | 当前活动的 preset。                                                 |
| preset\_modes            | `list[str] \| None`  | **ClimateEntityFeature.PRESET\_MODE 必需**  | 可用的 presets。                                                     |
| swing\_mode              | `str \| None`        | **ClimateEntityFeature.SWING\_MODE 必需**   | Swing 设置。                                                         |
| swing\_modes             | `list[str] \| None`  | **ClimateEntityFeature.SWING\_MODE 必需**   | 返回可用 swing modes 的列表，如果实现了 horizontal swing，则仅返回 vertical modes。 |
| swing\_horizontal\_mode   | `str \| None`        | **ClimateEntityFeature.SWING\_HORIZONTAL\_MODE 必需**   | Horizontal swing 设置。                                   |
| swing\_horizontal\_modes  | `list[str] \| None`  | **ClimateEntityFeature.SWING\_HORIZONTAL\_MODE 必需**  | 返回可用 horizontal swing modes 的列表。            |
| target\_humidity         | `float \| None`      | `None`                               | Device 试图达到的 target humidity。                         |
| target\_humidity\_step    | `int \| None`        | `None`                               | 在针对 device 的 action call 中 target humidity 可以增减的 supported step size。 |
| target\_temperature      | `float \| None`      | `None`                               | 当前设置要达到的 temperature。                               |
| target\_temperature\_high | `float \| None`      | **TARGET\_TEMPERATURE\_RANGE 必需** | 目标 temperature 的上界                                     |
| target\_temperature\_low  | `float \| None`      | **TARGET\_TEMPERATURE\_RANGE 必需** | 目标 temperature 的下界                                     |
| target\_temperature\_step | `float \| None`      | `None`                               | 目标 temperature 可以增减的 supported step size |
| temperature\_unit        | <code>str</code>                    | **必需**                         | 系统的 temperature 计量单位（`UnitOfTemperature.CELSIUS` 或 `UnitOfTemperature.FAHRENHEIT`）。                    |

### HVAC 模式

HVAC mode 是要求 device 执行的行为。

你只能使用 `HVACMode`
enum 提供的内置 HVAC modes。
对于修改一个或多个 modes 行为的 device options，请添加一个 preset。

| Name                 | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `HVACMode.OFF`       | Device 已关闭。                                           |
| `HVACMode.HEAT`      | Device 设置为加热到目标 temperature。                  |
| `HVACMode.COOL`      | Device 设置为冷却到目标 temperature。                  |
| `HVACMode.HEAT_COOL` | Device 设置为加热/冷却到目标 temperature range。       |
| `HVACMode.AUTO`      | Device 设置为 schedule、learned behavior、AI。              |
| `HVACMode.DRY`       | Device 设置为 dry/humidity mode。                             |
| `HVACMode.FAN_ONLY`  | Device 只开启 fan。没有加热或冷却操作。 |

### HVAC 动作

HVAC action 描述 device 为了完成请求的 HVAC mode 和 preset 而正在执行的 *当前* 动作，
由 device 自己的 control algorithms 决定。

你只能使用 `HVACAction` enum 提供的内置 HVAC actions。

:::note
除非 device 报告额外的信息，否则可能无法准确确定正确的 HVAC action。
例如：

* 具有 hysteresis 的 thermostat 在目标 temperature 附近有一个 ambiguous temperature range，它可能正在执行动作，也可能处于 idle。
* 可变功率 device 在达到目标 temperature 后可能会继续以较低的功率运行，而不是变成 idle。

对于无法准确确定 HVAC action 的 devices，不要实现 `hvac_action`。
:::

| Name                    | Description                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `HVACAction.OFF`        | HVAC mode 为 `HVACMode.OFF`。除非更改 mode，否则 device 不会执行任何动作。             |
| `HVACAction.PREHEATING` | Device 的 heat source 正在运行，但尚未达到 operating temperature。                                 |
| `HVACAction.HEATING`    | Device 正在向 space 添加热量。                                                                     |
| `HVACAction.COOLING`    | Device 正在从 space 移除热量。                                                                 |
| `HVACAction.DRYING`     | Device 正在从 space 中的空气中移除 moisture。                                                  |
| `HVACAction.FAN`        | Device 开启 fan 以仅循环或通风 air。                                                   |
| `HVACAction.IDLE`       | Device 当前未执行任何动作，但如果 conditions 改变，可能会开始执行动作。 |
| `HVACAction.DEFROSTING` | Device 正在移除累积的 ice。                                                                        |

### 预设

Device 可能有不同的 presets，它可能希望向用户展示。常见的 presets 是 "Away" 或 "Eco"。有一些内置的 presets 会提供 translations，但也允许添加自定义 presets。

| Name       | Description                                            |
| ---------- | ------------------------------------------------------ |
| `NONE`     | 没有活跃的 preset                                    |
| `ECO`      | Device 正在运行节能模式                |
| `AWAY`     | Device 处于 away mode                                 |
| `BOOST`    | Device 将所有阀门开到最大                          |
| `COMFORT`  | Device 处于 comfort mode                              |
| `HOME`     | Device 处于 home mode                                 |
| `SLEEP`    | Device 为睡眠做好准备                           |
| `ACTIVITY` | Device 对 activity 作出反应（例如 movement sensors） |

### 风扇模式

Device 的 fan 可以有不同 states。有一些内置的 fan modes，但也允许使用自定义 fan modes。

| Name          |
| ------------- |
| `FAN_ON`      |
| `FAN_OFF`     |
| `FAN_AUTO`    |
| `FAN_LOW`     |
| `FAN_MEDIUM`  |
| `FAN_HIGH`    |
| `FAN_TOP`     |
| `FAN_MIDDLE`  |
| `FAN_FOCUS`   |
| `FAN_DIFFUSE` |

### 摆风模式

Device fan 可以有不同 swing modes，它希望用户了解/控制。

:::note

对于不能独立控制 vertical 和 horizontal swing 的集成，所有可能的 options 都应列在 `swing_modes` 中；否则 `swing_modes` 提供 vertical 支持，`swing_horizontal_modes` 应提供 horizontal 支持。

:::

| Name               | Description                                       |
| ------------------ | ------------------------------------------------- |
| `SWING_OFF`        | Fan 未摆动。                          |
| `SWING_ON`         | Fan 正在摆动。                              |
| `SWING_VERTICAL`   | Fan 正在 vertical 摆动。                     |
| `SWING_HORIZONTAL` | Fan 正在 horizontal 摆动。                   |
| `SWING_BOTH`       | Fan 正在 horizontal 和 vertical 摆动。 |

### 水平摆风模式

Device fan 可以有不同 horizontal swing modes，它希望用户了解/控制。

:::note

仅当集成能够独立控制 vertical 和 horizontal swing 时，才应实现此项。在这种情况下，`swing_modes` property 提供 vertical 支持，`swing_horizontal_modes` 提供 horizontal 支持。

:::

| Name               | Description                                       |
| ------------------ | ------------------------------------------------- |
| `SWING_OFF`        | Fan 未摆动。                          |
| `SWING_ON`         | Fan 正在摆动。                              |

## 支持的功能

Supported features 通过使用 `ClimateEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Value                      | Description                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `TARGET_TEMPERATURE`       | Device 支持 target temperature。                                                   |
| `TARGET_TEMPERATURE_RANGE` | Device 支持 ranged target temperature。用于 HVAC modes `heat_cool` 和 `auto` |
| `TARGET_HUMIDITY`          | Device 支持 target humidity。                                                      |
| `FAN_MODE`                 | Device 支持 fan modes。                                                              |
| `PRESET_MODE`              | Device 支持 presets。                                                                |
| `SWING_MODE`               | Device 支持 swing modes。                                                            |
| `SWING_HORIZONTAL_MODE`    | Device 支持 horizontal swing modes。                                                 |
| `TURN_ON`                  | Device 支持 turn on。                                                                |
| `TURN_OFF`                 | Device 支持 turn off。                                                               |

## 方法

### 设置 HVAC 模式

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_hvac_mode(self, hvac_mode: HVACMode) -> None:
        """Set new target hvac mode."""

    async def async_set_hvac_mode(self, hvac_mode: HVACMode) -> None:
        """Set new target hvac mode."""
```

### 开启

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。
    # `turn_on` method 应将 `hvac_mode` 设置为除
    # `HVACMode.OFF` 之外的任何值，方法是从 service action
    # handler 中 optimistic 地设置它，或通过下一次 state update

    def turn_on(self) -> None:
        """Turn the entity on."""

    async def async_turn_on(self) -> None:
        """Turn the entity on."""
```

### 关闭

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。
    # `turn_off` method 应通过
    # 从 service action handler 中 optimistic 地设置，或通过
    # 下一次 state update 将 `hvac_mode` 设置为 `HVACMode.OFF`

    def turn_off(self) -> None:
        """Turn the entity off."""

    async def async_turn_off(self) -> None:
        """Turn the entity off."""
```

### 切换

```python
class MyClimateEntity(ClimateEntity):
    # 不需要强制实现 `toggle` method，因为 base implementation
    # 会根据当前 HVAC mode 调用 `turn_on`/`turn_off`。

    # 如果实现，`toggle` method 应通过
    # 从 service action handler 中 optimistic 地设置
    # 或通过下一次 state update，将 `hvac_mode` 设置为正确的 `HVACMode`

    def toggle(self) -> None:
        """Toggle the entity."""

    async def async_toggle(self) -> None:
        """Toggle the entity."""
```

### 设置预设模式

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_preset_mode(self, preset_mode: str) -> None:
        """Set new target preset mode."""

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        """Set new target preset mode."""
```

### 设置风扇模式

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_fan_mode(self, fan_mode: str) -> None:
        """Set new target fan mode."""

    async def async_set_fan_mode(self, fan_mode: str) -> None:
        """Set new target fan mode."""
```

### 设置湿度

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_humidity(self, humidity: int) -> None:
        """Set new target humidity."""

    async def async_set_humidity(self, humidity: int) -> None:
        """Set new target humidity."""
```

### 设置摆风模式

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_swing_mode(self, swing_mode: str) -> None:
        """Set new target swing operation."""

    async def async_set_swing_mode(self, swing_mode: str) -> None:
        """Set new target swing operation."""
```

### 设置水平摆风模式

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_swing_horizontal_mode(self, swing_horizontal_mode: str) -> None:
        """Set new target horizontal swing operation."""

    async def async_set_swing_horizontal_mode(self, swing_horizontal_mode: str) -> None:
        """Set new target horizontal swing operation."""
```

### 设置温度

:::note
`ClimateEntity` 有内置 validation，确保 `target_temperature_low` 参数小于或等于 `target_temperature_high` 参数。因此，集成不需要在自己的实现中对此进行 validation。
:::

```python
class MyClimateEntity(ClimateEntity):
    # 实现以下方法之一。

    def set_temperature(self, **kwargs: Any) -> None:
        """Set new target temperature."""

    async def async_set_temperature(self, **kwargs: Any) -> None:
        """Set new target temperature."""
```
