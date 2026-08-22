---
title: "Fan entity"
sidebar_label: "Fan"
---

Fan entity 是控制 fan 的各个向量（如 speed、direction 和 oscillation）的 device。从 [`homeassistant.components.fan.FanEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/fan/__init__.py) 派生 entity platforms。

## 属性

:::tip
Properties 应始终只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| current_direction  | `str \| None`       | `None` | Fan 当前的 direction。 |
| is_on              | `bool \| None`      | `None` | 如果 fan 已开启则为 `True`。 |
| oscillating        | `bool \| None`       | `None` | 如果 fan 正在 oscillating 则为 `True`。 |
| percentage         | `int \| None`       | `0`    | 当前的 speed percentage。必须是 0（off）到 100 之间的值。 |
| preset_mode        | `str \| None`       | `None` | 当前的 preset_mode。为 `preset_modes` 中的值之一，或如果没有活跃的 preset 则为 `None`。 |
| preset_modes       | `list[str] \| None` | `None` | 支持的 preset_modes 列表。这是一个任意 str 列表，不应包含任何 speed。 |
| speed_count        | `int`               | 100    | Fan 支持的 speed 数量。 |

### 预设模式

Fan 可能有 preset modes，自动控制 percentage speed 或其他功能。常见示例包括 `auto`、`smart`、`whoosh`、`eco` 和 `breeze`。如果没有设置 preset mode，`preset_mode` property 必须设为 `None`。

Preset modes 不应包含命名的（手动）speed settings，因为这些应表示为 percentage。

手动设置 speed 必须禁用任何已设置的 preset mode。如果可以在不禁用 preset mode 的情况下手动设置 percentage speed，请创建一个 switch 或 service action 来代表该 mode。

## 支持的功能

Supported features 通过使用 `FanEntityFeature` 枚举中的值来定义，
并使用按位或（`|`）运算符组合。

| Value         | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| `DIRECTION`   | Fan 支持更改 direction。 |
| `OSCILLATE`   | Fan 支持 oscillation。 |
| `PRESET_MODE` | Fan 支持 preset modes。 |
| `SET_SPEED`   | Fan 支持设置 speed percentage 和可选 preset modes。 |
| `TURN_OFF`    | Fan 支持关闭。 |
| `TURN_ON`     | Fan 支持开启。 |

## 方法

### 设置方向

仅当设置了 `FanEntityFeature.DIRECTION` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def set_direction(self, direction: str) -> None:
        """Set the direction of the fan."""

    async def async_set_direction(self, direction: str) -> None:
        """Set the direction of the fan."""
```

### 设置预设模式

仅当设置了 `FanEntityFeature.PRESET_MODE` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def set_preset_mode(self, preset_mode: str) -> None:
        """Set the preset mode of the fan."""

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        """Set the preset mode of the fan."""
```

### 设置速度百分比

仅当设置了 `FanEntityFeature.SET_SPEED` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def set_percentage(self, percentage: int) -> None:
        """Set the speed percentage of the fan."""

    async def async_set_percentage(self, percentage: int) -> None:
        """Set the speed percentage of the fan."""
```

:::tip Converting speeds

Home Assistant 包含用于转换 speed 的 utility。

如果 device 有命名的 speed 列表：

```python
from homeassistant.util.percentage import ordered_list_item_to_percentage, percentage_to_ordered_list_item

ORDERED_NAMED_FAN_SPEEDS = ["one", "two", "three", "four", "five", "six"]  # 不包含 off

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

如果 device 有数值的 speed range：

```python
from homeassistant.util.percentage import ranged_value_to_percentage, percentage_to_ranged_value
from homeassistant.util.scaling import int_states_in_range

SPEED_RANGE = (1, 255)  # 不包含 off

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

### 开启

仅当设置了 `FanEntityFeature.TURN_ON` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def turn_on(self, percentage: Optional[int] = None, preset_mode: Optional[str] = None, **kwargs: Any) -> None:
        """Turn on the fan."""

    async def async_turn_on(self, percentage: Optional[int] = None, preset_mode: Optional[str] = None, **kwargs: Any) -> None:
        """Turn on the fan."""
```

:::tip `speed` 已弃用。

对于新集成，不应实现 `speed`，而应仅使用 `percentage` 和 `preset_mode`。

:::

### 关闭

仅当设置了 `FanEntityFeature.TURN_OFF` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def turn_off(self, **kwargs: Any) -> None:
        """Turn the fan off."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the fan off."""
```

### 切换

可选。如果未实现，默认会通过检查 `is_on` property 来确定调用哪个 method。
仅当设置了 `FanEntityFeature.TURN_ON` 和 `FanEntityFeature.TURN_OFF` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def toggle(self, **kwargs: Any) -> None:
        """Toggle the fan."""

    async def async_toggle(self, **kwargs: Any) -> None:
        """Toggle the fan."""
```

### 摆头

仅当设置了 `FanEntityFeature.OSCILLATE` 标志时，才实现此 method。

```python
class FanEntity(ToggleEntity):
    # 实现以下方法之一。

    def oscillate(self, oscillating: bool) -> None:
        """Oscillate the fan."""

    async def async_oscillate(self, oscillating: bool) -> None:
        """Oscillate the fan."""
```
