---
title: 阀门实体
sidebar_label: Valve
---

Valve 实体控制如水阀或气阀等阀门设备。从 [`homeassistant.components.valve.ValveEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/valve/__init__.py) 派生平台实体。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 描述
| ----------------------- | ---- | ------- | -----------
| current_valve_position | `int \| None` | `None` | 阀门的当前位置，其中 0 表示关闭，100 表示完全打开。此属性在 `reports_position = True` 的阀门上必填，用于确定状态。
| is_closed | `bool \| None` | `None` | 阀门是否已关闭。用于确定不报告位置的阀门的 `state`。
| is_closing | `bool \| None` | `None` | 阀门是否正在关闭。用于确定 `state`。
| is_opening | `bool \| None` | `None` | 阀门是否正在打开。用于确定 `state`。
| reports_position | <code>bool</code> | **必填** | 阀门是否知道其位置。

### 设备类型

| 常量 | 描述
|----------|-----------------------|
| `ValveDeviceClass.WATER` | 水阀的控制。
| `ValveDeviceClass.GAS` | 气阀的控制。

### 状态

状态通过设置其属性来定义。结果状态使用 `ValveState` 枚举返回以下成员之一。

| 值    | 描述                                                        |
|----------|--------------------------------------------------------------------|
| `OPENING`| 阀门正在打开以达到设定的位置。    |
| `OPEN`   | 阀门已到达打开位置。                           |
| `CLOSING`| 阀门正在关闭以达到设定的位置。    |
| `CLOSED` | 阀门已到达关闭位置。                         |

## 支持的功能

支持的功能通过使用 `ValveEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值               | 描述                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| `OPEN`              | 阀门支持打开。                                                 |
| `CLOSE`             | 阀门支持关闭。                                                 |
| `SET_POSITION`      | 阀门支持移动到打开和关闭之间的特定位置。      |
| `STOP`              | 阀门支持停止当前操作（打开、关闭、设置位置）       |

## 方法

### 打开阀门

仅当设置了 `ValveEntityFeature.OPEN` 标志时实现此方法。对于可以设置位置的阀门，此方法应留空实现，仅需要 `set_valve_position`。

```python
class MyValve(ValveEntity):
    # 实现以下方法之一。

    def open_valve(self) -> None:
        """Open the valve."""

    async def async_open_valve(self) -> None:
        """Open the valve."""
```

### 关闭阀门

仅当设置了 `ValveEntityFeature.CLOSE` 标志时实现此方法。对于可以设置位置的阀门，此方法应留空实现，仅需要 `set_valve_position`。

```python
class MyValve(ValveEntity):
    # 实现以下方法之一。

    def close_valve(self) -> None:
        """Close valve."""

    async def async_close_valve(self) -> None:
        """Close valve."""
```

### 设置阀门位置

仅当设置了 `ValveEntityFeature.SET_POSITION` 标志时实现此方法。能够设置位置的阀门必须实现此方法。

```python
class MyValve(ValveEntity):
    # 实现以下方法之一。

    def set_valve_position(self, position: int) -> None:
        """Move the valve to a specific position."""

    async def async_set_valve_position(self, position: int) -> None:
        """Move the valve to a specific position."""
```

### 停止阀门

仅当设置了 `ValveEntityFeature.STOP` 标志时实现此方法。

```python
class MyValve(ValveEntity):
    # 实现以下方法之一。

    def stop_valve(self) -> None:
        """Stop the valve."""

    async def async_stop_valve(self) -> None:
        """Stop the valve."""
```
