---
title: 阀门实体
description: '阀门实体控制阀门设备，例如家中的水阀或燃气阀。平台实体派生自homeassistant.components.valve.ValveEntity(https://github.com/home-assistant/core/blob/dev/homeassistant/components/valve/ini。'
sidebar_label: 阀门
---
# 阀门实体

阀门实体控制阀门设备，例如家中的水阀或燃气阀。平台实体派生自[`homeassistant.components.valve.ValveEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/valve/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ----------------------- | ---- | ------- | -----------
| current_valve_position | <code>int &#124; None</code> | `None` | 阀门的当前位置，其中 0 表示关闭，100 表示完全打开。具有 `reports_position = True` 的阀门需要此属性，用于确定状态。
| is_closed | <code>bool &#124; None</code> | `None` | 阀门是否关闭。用于确定不报告位置的阀门的 `state`。
| is_closing | <code>bool &#124; None</code> | `None` | 阀门是否关闭。用于确定 `state`。
| is_opening | <code>bool &#124; None</code> | `None` | 阀门是否打开。用于确定 `state`。
| reports_position | <code>bool</code> | **Required** | 阀门是否知道其位置。

### 设备类别

| 常量 | 说明
|----------|-----------------------|
| `ValveDeviceClass.WATER` | 水阀的控制。
| `ValveDeviceClass.GAS` | 燃气阀的控制。

### 状态

状态是通过设置其属性来定义的。结果状态是使用 `ValveState` 枚举返回以下成员之一。

| 值 | 说明 |
|----------|--------------------------------------------------------------------|
| `OPENING` | 阀门正在打开以到达设定位置。 |
| `OPEN` | 阀门已到达打开位置。 |
| `CLOSING` | 阀门正在关闭以达到设定位置。 |
| `CLOSED` | 阀门已到达关闭位置。 |

## 支持的功能

支持的功能通过使用 `ValveEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------------------- | -------------------------------------------------------------------------------- |
| `OPEN` | 阀门支持开启。 |
| `CLOSE` | 阀门支持关闭。 |
| `SET_POSITION` | 阀门支持移动到打开和关闭之间的特定位置。 |
| `STOP` | 阀门支持停止当前动作（开、关、设定位置） |

## 方法

### 打开阀门

仅当设置了标志 `SUPPORT_OPEN` 时才实现此方法。对于阀门来说
可以设置位置，该方法不应该实现，只需要`set_valve_position`。

```python
class MyValve(ValveEntity):
    # Implement one of these methods.

    def open_valve(self) -> None:
        """Open the valve."""

    async def async_open_valve(self) -> None:
        """Open the valve."""
```

### 关闭阀门

仅当设置了标志 `SUPPORT_CLOSE` 时才实现此方法。  对于阀门来说
可以设置位置，该方法不应该实现，只需要`set_valve_position`。

```python
class MyValve(ValveEntity):
    # Implement one of these methods.

    def close_valve(self) -> None:
        """Close valve."""

    async def async_close_valve(self) -> None:
        """Close valve."""
```

### 设置阀门位置

仅当设置了标志 `SUPPORT_SET_POSITION` 时才实现此方法。此方法必须在可设定位置的阀门中实施。

```python
class MyValve(ValveEntity):
    # Implement one of these methods.

    def set_valve_position(self, position: int) -> None:
        """Move the valve to a specific position."""

    async def async_set_valve_position(self, position: int) -> None:
        """Move the valve to a specific position."""
```

### 截止阀

仅当设置了标志 `SUPPORT_STOP` 时才实现此方法。

```python
class MyValve(ValveEntity):
    # Implement one of these methods.

    def stop_valve(self) -> None:
        """Stop the valve."""

    async def async_stop_valve(self) -> None:
        """Stop the valve."""
```