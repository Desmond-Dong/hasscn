---
title: 粉丝实体
sidebar_label: 扇子
---

风扇实体是一种控制风扇不同矢量（例如速度、方向和振动）的设备。从['homeassistant.components.fan.FanEntity'](https://github.com/home-assistant/core/blob/dev/homeassistant/components/fan/__init__.py)派生实体平台。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| current_direction | <code>str &#124; None</code> | `None` | 风扇当前的方向。 |
| is_on | <code>bool &#124; None</code> | `None` | 如果风扇打开则为真。 |
| oscillating | <code>bool &#124; None</code> | `None` | 如果风扇正在振荡，则为真。 |
| percentage | <code>int &#124; None</code> | `0` | 当前速度百分比。必须是 0（关闭）和 100 之间的值。 |
| preset_mode | <code>str &#124; None</code> | `None` | 当前的预设模式。如果没有活动预设，则为 `preset_modes` 或 `None` 中的值之一。 |
| preset_modes | <code>list[str] &#124; None</code> | `None` | 支持的预设模式列表。这是一个任意的 str 列表，不应包含任何速度。 |
| speed_count | `int` | 100 | 风扇支持的速度数。 |

### 预设模式

风扇可能具有自动控制百分比速度或其他功能的预设模式。常见示例包括 `auto`、`smart`、`whoosh`、`eco` 和 `breeze`。如果未设置预设模式，则 `preset_mode` 属性必须设置为 `None`。

预设模式不应包括命名（手动）速度设置，因为这些设置应以百分比表示。

手动设置速度必须禁用任何设置的预设模式。如果可以在不禁用预设模式的情况下手动设置百分比速度，请创建一个开关或服务操作来表示该模式。

## 支持的功能

支持的功能通过使用 `FanEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------------- | ------------------------------------------------------------------------ |
| `DIRECTION` | 风扇支持改变方向。 |
| `OSCILLATE` | 风扇支持振荡。 |
| `PRESET_MODE` | 风扇支持预设模式。 |
| `SET_SPEED` | 风扇支持设置转速百分比和可选的预设模式。 |
| `TURN_OFF` | 风扇支持关闭。 |
| `TURN_ON` | 风扇支持开启。 |

## 方法

### 设定方向

仅当设置了标志 `FanEntityFeature.DIRECTION` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def set_direction(self, direction: str) -> None:
        """Set the direction of the fan."""

    async def async_set_direction(self, direction: str) -> None:
        """Set the direction of the fan."""
```

### 设置预设模式

仅当设置了标志 `FanEntityFeature.PRESET_MODE` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def set_preset_mode(self, preset_mode: str) -> None:
        """Set the preset mode of the fan."""

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        """Set the preset mode of the fan."""
```

### 设置速度百分比

仅当设置了标志 `FanEntityFeature.SET_SPEED` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def set_percentage(self, percentage: int) -> None:
        """Set the speed percentage of the fan."""

    async def async_set_percentage(self, percentage: int) -> None:
        """Set the speed percentage of the fan."""
```

:::tip 转换速度

Home Assistant 包含一个转换速度的实用程序。

如果设备有命名速度列表：

```python
from homeassistant.util.percentage import ordered_list_item_to_percentage, percentage_to_ordered_list_item

ORDERED_NAMED_FAN_SPEEDS = ["one", "two", "three", "four", "five", "six"]  # off is not included

percentage = ordered_list_item_to_percentage(ORDERED_NAMED_FAN_SPEEDS, "three")

named_speed = percentage_to_ordered_list_item(ORDERED_NAMED_FAN_SPEEDS, 23)

...

    @property
    def percentage(self) -> Optional[int]:
        """Return the current speed percentage."""
        return ordered_list_item_to_percentage(ORDERED_NAMED_FAN_SPEEDS, current_speed)

    @property
    def speed_count(self) -> int:
        """Return the number of speeds the fan supports."""
        return len(ORDERED_NAMED_FAN_SPEEDS)
```

如果设备有速度的数字范围：

```python
from homeassistant.util.percentage import ranged_value_to_percentage, percentage_to_ranged_value
from homeassistant.util.scaling import int_states_in_range

SPEED_RANGE = (1, 255)  # off is not included

percentage = ranged_value_to_percentage(SPEED_RANGE, 127)

value_in_range = math.ceil(percentage_to_ranged_value(SPEED_RANGE, 50))

...

    @property
    def percentage(self) -> Optional[int]:
        """Return the current speed percentage."""
        return ranged_value_to_percentage(SPEED_RANGE, current_speed)

    @property
    def speed_count(self) -> int:
        """Return the number of speeds the fan supports."""
        return int_states_in_range(SPEED_RANGE)
```
:::

### 打开

仅当设置了标志 `FanEntityFeature.TURN_ON` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def turn_on(self, speed: Optional[str] = None, percentage: Optional[int] = None, preset_mode: Optional[str] = None, **kwargs: Any) -> None:
        """Turn on the fan."""

    async def async_turn_on(self, speed: Optional[str] = None, percentage: Optional[int] = None, preset_mode: Optional[str] = None, **kwargs: Any) -> None:
        """Turn on the fan."""
```

:::tip `speed` 已弃用。

对于新集成，不应实现 `speed`，而应仅使用 `percentage` 和 `preset_mode`。

:::

### 关

仅当设置了标志 `FanEntityFeature.TURN_OFF` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def turn_off(self, **kwargs: Any) -> None:
        """Turn the fan off."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the fan off."""
```

### 切换

可选。如果未实现，将默认使用 is_on 属性检查要调用的方法。
仅当设置了标志 `FanEntityFeature.TURN_ON` 和 `FanEntityFeature.TURN_OFF` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def toggle(self, **kwargs: Any) -> None:
        """Toggle the fan."""

    async def async_toggle(self, **kwargs: Any) -> None:
        """Toggle the fan."""
```

### 摆动

仅当设置了标志 `FanEntityFeature.OSCILLATE` 时才实现此方法。

```python
class FanEntity(ToggleEntity):
    # Implement one of these methods.

    def oscillate(self, oscillating: bool) -> None:
        """Oscillate the fan."""

    async def async_oscillate(self, oscillating: bool) -> None:
        """Oscillate the fan."""
```