---
title: 气候实体
sidebar_label: 气候
---

气候实体控制温度、湿度或风扇，例如空调系统和加湿器。平台实体派生自[`homeassistant.components.climate.ClimateEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/climate/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----------------------- | ----------------------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| current_humidity | <code>float &#124; None</code> | `None` | 当前湿度。 |
| current_temperature | <code>float &#124; None</code> | `None` | 当前温度。 |
| fan_mode | <code>str &#124; None</code> | **Required by SUPPORT_FAN_MODE** | 当前风扇模式。 |
| fan_modes | <code>list[str] &#124; None</code> | **Required by SUPPORT_FAN_MODE** | 可用风扇模式列表。 |
| hvac_action | <code>HVACAction &#124; None</code> | `None` | 当前的 HVAC 操作（加热、冷却） |
| hvac_mode | <code>HVACMode &#124; None</code> | **Required** | 当前操作（例如加热、冷却、空闲）。用于确定 `state`。 |
| hvac_modes | <code>list[HVACMode]</code> | **Required** | 可用操作模式列表。见下文。 |
| max_humidity | `float` | `DEFAULT_MAX_HUMIDITY` (value == 99) | 最大湿度。 |
| max_temp | `float` | `DEFAULT_MAX_TEMP` (value == 35 °C) | 最高温度为 `temperature_unit`。 |
| min_humidity | `float` | `DEFAULT_MIN_HUMIDITY` (value == 30) | 最低湿度。 |
| min_temp | `float` | `DEFAULT_MIN_TEMP` (value == 7 °C) | 最低温度为 `temperature_unit`。 |
| precision | `float` | According to `temperature_unit` | 系统内温度的精度。 TEMP_CELSIUS 默认为十分之一，否则为整数。 |
| preset_mode | <code>str &#124; None</code> | **Required by SUPPORT_PRESET_MODE** | 当前活动预设。 |
| preset_modes | <code>list[str] &#124; None</code> | **Required by SUPPORT_PRESET_MODE** | 可用的预设。 |
| swing_mode | <code>str &#124; None</code> | **Required by SUPPORT_SWING_MODE** | 摆动设置。 |
| swing_modes | <code>list[str] &#124; None</code> | **Required by SUPPORT_SWING_MODE** | 返回可用摆动模式的列表，仅在实现水平摆动的情况下为垂直模式。 |
| swing_horizontal_mode | <code>str &#124; None</code> | **Required by SUPPORT_SWING_HORIZONTAL_MODE** | 水平摆动设置。 |
| swing_horizontal_modes | <code>list[str] &#124; None</code> | **Required by SUPPORT_SWING_HORIZONTAL_MODE** | 返回可用水平摆动模式的列表。 |
| target_humidity | <code>float &#124; None</code> | `None` | 设备试图达到的目标湿度。 |
| target_humidity_step | <code>int &#124; None</code> | `None` | 可以在针对设备的操作调用中增加或减少目标湿度支持的步长。 |
| target_temperature | <code>float &#124; None</code> | `None` | 当前设定的要达到的温度。 |
| target_temperature_high | <code>float &#124; None</code> | **Required by TARGET_TEMPERATURE_RANGE** | 上限目标温度 |
| target_temperature_low | <code>float &#124; None</code> | **Required by TARGET_TEMPERATURE_RANGE** | 下限目标温度 |
| target_temperature_step | <code>float &#124; None</code> | `None` | 可以增加或减少目标温度支持的步长 |
| temperature_unit | <code>str</code> | **Required** | 系统温度测量单位（`TEMP_CELSIUS` 或 `TEMP_FAHRENHEIT`）。 |

### 暖通空调模式

您只能使用 `HVACMode` 提供的内置 HVAC 模式
枚举。如果您想要其他模式，请添加预设。


| 名称 | 说明 |
| -------------------- | ------------------------------------------------------------------- |
| `HVACMode.OFF` | 设备已关闭。 |
| `HVACMode.HEAT` | 该设备被设置为加热到目标温度。 |
| `HVACMode.COOL` | 设备被设置为冷却至目标温度。 |
| `HVACMode.HEAT_COOL` | 该设备设置为加热/冷却至目标温度范围。 |
| `HVACMode.AUTO` | 该设备被设置为时间表、学习行为、人工智能。 |
| `HVACMode.DRY` | 设备设置为干燥/湿度模式。 |
| `HVACMode.FAN_ONLY` | 该设备仅打开风扇。没有加热或冷却发生。 |

### 暖通空调行动

HVAC 操作描述了_current_ 操作。这与模式不同，因为如果将设备设置为加热，并且已经达到目标温度，则设备将不再主动加热。仅允许使用 `HVACAction` 枚举提供的内置 HVAC 操作。

| 名称 | 说明 |
| ----------------------- | --------------------- |
| `HVACAction.OFF` | 设备已关闭。 |
| `HVACAction.PREHEATING` | 设备正在预热。 |
| `HVACAction.HEATING` | 设备正在加热。 |
| `HVACAction.COOLING` | 设备正在冷却。 |
| `HVACAction.DRYING` | 设备正在干燥。 |
| `HVACAction.FAN` | 设备已打开风扇。 |
| `HVACAction.IDLE` | 设备空闲。 |
| `HVACAction.DEFROSTING` | 设备正在除霜。 |

### 预设

设备可以具有可能想要向用户显示的不同预设。常见预设为“离开”或“生态”。有几个内置预设可以提供翻译，但您也可以添加自定义预设。

| 名称 | 说明 |
| ---------- | ------------------------------------------------------ |
| `NONE` | 没有激活的预设 |
| `ECO` | 设备正在运行节能模式 |
| `AWAY` | 设备处于离开模式 |
| `BOOST` | 装置将所有阀门全开 |
| `COMFORT` | 设备处于舒适模式 |
| `HOME` | 设备处于家庭模式 |
| `SLEEP` | 设备已准备好睡眠 |
| `ACTIVITY` | 设备对活动做出反应（例如运动传感器） |

### 风扇模式

设备的风扇可以有不同的状态。有几种内置风扇模式，但您也可以使用自定义风扇模式。

| 名称 |
| ------------- |
| `FAN_ON` |
| `FAN_OFF` |
| `FAN_AUTO` |
| `FAN_LOW` |
| `FAN_MEDIUM` |
| `FAN_HIGH` |
| `FAN_MIDDLE` |
| `FAN_FOCUS` |
| `FAN_DIFFUSE` |

### 摆动模式

设备风扇可以具有希望用户了解/控制的不同摆动模式。

:::note

对于没有独立控制垂直和水平摆动的集成，所有可能的选项应在 `swing_modes` 中列出，否则 `swing_modes` 提供垂直支持，`swing_horizontal_modes` 应提供水平支持。

:::

| 名称 | 说明 |
| ------------------ | ------------------------------------------------- |
| `SWING_OFF` | 风扇不转。 |
| `SWING_ON` | 风扇在摆动。 |
| `SWING_VERTICAL` | 风扇垂直摆动。 |
| `SWING_HORIZONTAL` | 风扇水平摆动。 |
| `SWING_BOTH` | 风扇水平和垂直摆动。 |

### 水平摆动模式

设备风扇可以具有希望用户了解/控制的不同水平摆动模式。

:::note

仅当集成具有垂直和水平摆动的独立控制时才应实施此操作。在这种情况下，`swing_modes` 属性将提供垂直支撑，`swing_horizontal_modes` 属性将提供水平支撑。

:::

| 名称 | 说明 |
| ------------------ | ------------------------------------------------- |
| `SWING_OFF` | 风扇不转。 |
| `SWING_ON` | 风扇在摆动。 |

## 支持的功能

支持的功能通过使用 `ClimateEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `TARGET_TEMPERATURE` | 该设备支持目标温度。 |
| `TARGET_TEMPERATURE_RANGE` | 该器件支持一定范围的目标温度。用于 HVAC 模式 `heat_cool` 和 `auto` |
| `TARGET_HUMIDITY` | 该设备支持目标湿度。 |
| `FAN_MODE` | 该设备支持风扇模式。 |
| `PRESET_MODE` | 该设备支持预设。 |
| `SWING_MODE` | 该设备支持摆动模式。 |
| `SWING_HORIZONTAL_MODE` | 该设备支持水平摆动模式。 |
| `TURN_ON` | 设备支持开机。 |
| `TURN_OFF` | 设备支持关闭。 |

## 方法

### 设置 HVAC 模式

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_hvac_mode(self, hvac_mode):
        """Set new target hvac mode."""

    async def async_set_hvac_mode(self, hvac_mode):
        """Set new target hvac mode."""
```

### 打开

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.
    # The `turn_on` method should set `hvac_mode` to any other than
    # `HVACMode.OFF` by optimistically setting it from the service action
    # handler or with the next state update

    def turn_on(self):
        """Turn the entity on."""

    async def async_turn_on(self):
        """Turn the entity on."""
```

### 关

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.
    # The `turn_off` method should set `hvac_mode` to `HVACMode.OFF` by
    # optimistically setting it from the service action handler or with the
    # next state update

    def turn_off(self):
        """Turn the entity off."""

    async def async_turn_off(self):
        """Turn the entity off."""
```

### 切换

```python
class MyClimateEntity(ClimateEntity):
    # It's not mandatory to implement the `toggle` method as the base implementation
    # will call `turn_on`/`turn_off` according to the current HVAC mode.

    # If implemented, the `toggle` method should set `hvac_mode` to the right `HVACMode` by
    # optimistically setting it from the service action handler
    # or with the next state update.

    def toggle(self):
        """Toggle the entity."""

    async def async_toggle(self):
        """Toggle the entity."""
```

### 设置预设模式

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_preset_mode(self, preset_mode):
        """Set new target preset mode."""

    async def async_set_preset_mode(self, preset_mode):
        """Set new target preset mode."""
```

### 设置风扇模式

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_fan_mode(self, fan_mode):
        """Set new target fan mode."""

    async def async_set_fan_mode(self, fan_mode):
        """Set new target fan mode."""
```

### 设置湿度

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_humidity(self, humidity):
        """Set new target humidity."""

    async def async_set_humidity(self, humidity):
        """Set new target humidity."""
```

### 设置摆动模式

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_swing_mode(self, swing_mode):
        """Set new target swing operation."""

    async def async_set_swing_mode(self, swing_mode):
        """Set new target swing operation."""
```

### 设置水平摆动模式

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_swing_horizontal_mode(self, swing_mode):
        """Set new target horizontal swing operation."""

    async def async_set_swing_horizontal_mode(self, swing_mode):
        """Set new target horizontal swing operation."""
```

### 设定温度

:::note
`ClimateEntity` 具有内置验证，以确保 `target_temperature_low` 参数低于或等于 `target_temperature_high` 参数。因此，集成不需要在自己的实现中验证这一点。
:::

```python
class MyClimateEntity(ClimateEntity):
    # Implement one of these methods.

    def set_temperature(self, **kwargs):
        """Set new target temperature."""

    async def async_set_temperature(self, **kwargs):
        """Set new target temperature."""
```