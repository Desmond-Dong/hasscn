---
author: Jan Bouwhuis
authorURL: https://github.com/jbouwh
authorImageURL: https://avatars.githubusercontent.com/u/7188918?s=96&v=4
title: 新的 scaling 工具与 import 变更
---

## 用于缩放亮度的新工具

多个集成实现各自自己的 scaling 算法来缩放亮度。现在在 `homeassistant.util.color` 中引入了新的工具，以简化亮度 scaling 的实现：

```python
def brightness_to_value(low_high_range: tuple[float, float], brightness: int) -> float:
    """Given a brightness_scale convert a brightness to a single value.

    Do not include 0 if the light is off for value 0.

    Given a brightness low_high_range of (1,100) this function
    will return:

    255: 100.0
    127: ~49.8039
    10: ~3.9216
    """
    ...
```

如果你更倾向于将亮度缩放到一个整数范围，也可以使用 `scale_ranged_value_to_int_range`，详情见[此处](#background)。

```python
def value_to_brightness(low_high_range: tuple[float, float], value: float) -> int:
    """Given a brightness_scale convert a single value to a brightness.

    Do not include 0 if the light is off for value 0.

    Given a brightness low_high_range of (1,100) this function
    will return:

    100: 255
    50: 127
    4: 10

    The value will be clamped between 1..255 to ensure valid value.
    """
    ...
```

这也确保了返回有效的亮度值。

### 背景

为了缩放 fan speed 百分比，我们已经有一些工具在 `homeassistant.utils.percentage` 中：

```python
def ranged_value_to_percentage(
    low_high_range: tuple[float, float], value: float
) -> int:
    ...
```

以及

```python
def percentage_to_ranged_value(
    low_high_range: tuple[float, float], percentage: int
) -> float:
    ...
```

这些百分比工具现在将在 `homeassistant.utils.scaling` 中使用新的通用 scaling 工具：

`scale_ranged_value_to_int_range` 和 `scale_to_ranged_value`

```python
def scale_ranged_value_to_int_range(
    source_low_high_range: tuple[float, float],
    target_low_high_range: tuple[float, float],
    value: float,
) -> int:
    """Given a range of low and high values convert a single value to another range.

    Given a source low value of 1 and a high value of 255 and
    a target range from 1 to 100 this function
    will return:

    (1,255), 255: 100
    (1,255), 127: 50
    (1,255), 10: 4
    """
    ...
```

以及

```python
def scale_to_ranged_value(
    source_low_high_range: tuple[float, float],
    target_low_high_range: tuple[float, float],
    value: int,
) -> float:
    """Given a range of low and high values convert a single value to another range.

    Do not include 0 in a range if 0 means off,
    e.g. for brightness or fan speed.

    Given a source low value of 1 and a high value of 255 and
    a target range from 1 to 100 this function
    will return:

    (1,255), 255: 100
    (1,255), 127: ~49.8039
    (1,255), 10: ~3.9216
    """
    ...
```

## 工具 `int_states_in_range` 和 `states_in_range` 已迁移

这些工具现在位于 `homeassistant.util.scaling` 下。如果它们在自定义集成中被使用，请确保更新 import 到新模块。
