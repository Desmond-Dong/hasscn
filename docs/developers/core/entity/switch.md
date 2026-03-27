---
title: 开关实体
description: '开关实体用于打开或关闭某个对象，例如继电器。平台实体派生自homeassistant.components.switch.SwitchEntity(https://github.com/home-assistant/core/blob/dev/homeassistant/components/switch/i。'
sidebar_label: 开关
---
# 开关实体

开关实体用于打开或关闭某个对象，例如继电器。平台实体派生自[`homeassistant.components.switch.SwitchEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/switch/__init__.py)。
如果要表示具有开/关状态但无法控制的对象，例如只能上报状态、无法通过 Home Assistant 控制的墙壁开关，更适合使用二进制传感器。
如果要表示没有状态的对象，例如门铃按钮、自定义事件或设备触发器，则应使用其他实体类型。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| is_on | boolean | `None` | 如果开关当前处于打开或关闭状态。

## 方法

### 打开

打开开关。

```python
class MySwitch(SwitchEntity):
    # Implement one of these methods.

    def turn_on(self, **kwargs) -> None:
        """Turn the entity on."""

    async def async_turn_on(self, **kwargs):
        """Turn the entity on."""
```

### 关

关闭开关。

```python
class MySwitch(SwitchEntity):
    # Implement one of these methods.

    def turn_off(self, **kwargs):
        """Turn the entity off."""

    async def async_turn_off(self, **kwargs):
        """Turn the entity off."""
```

### 切换

可选。如果未实现，将默认使用 `is_on` 属性检查要调用的方法。

```python
class MySwitch(SwitchEntity):
    # Implement one of these methods.

    def toggle(self, **kwargs):
        """Toggle the entity."""

    async def async_toggle(self, **kwargs):
        """Toggle the entity."""
```

### 可用设备类别

可选。用于指明设备类型；它可能会映射为 Google 设备类型。

| 常量 | 说明
| ----- | -----------
| `SwitchDeviceClass.OUTLET` | 设备是电源插座。
| `SwitchDeviceClass.SWITCH` | 设备本身就是开关类型设备。
