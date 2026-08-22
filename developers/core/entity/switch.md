Switch entity 开启或关闭某物，例如 relay。从 [`homeassistant.components.switch.SwitchEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/switch/__init__.py) 派生 platform entity。
要表示具有 on 或 off state 但无法控制的事物（例如只传输其 state 但无法从 Home Assistant 开启或关闭的 wall switch），使用 Binary Sensor 更好。
要表示没有 state 的事物（例如 door bell push button），使用自定义 event 或 Device Trigger 更好。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| is\_on | boolean | `None` | Switch 当前是否开启或关闭。

## 方法

### 开启

开启 switch。

```python
class MySwitch(SwitchEntity):
    # 实现以下方法之一。

    def turn_on(self, **kwargs: Any) -> None:
        """Turn the entity on."""

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the entity on."""
```

### 关闭

关闭 switch。

```python
class MySwitch(SwitchEntity):
    # 实现以下方法之一。

    def turn_off(self, **kwargs: Any) -> None:
        """Turn the entity off."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the entity off."""
```

### 切换

可选。如果未实现，默认会通过检查 `is_on` property 来确定调用哪个 method。

```python
class MySwitch(SwitchEntity):
    # 实现以下方法之一。

    def toggle(self, **kwargs: Any) -> None:
        """Toggle the entity."""

    async def async_toggle(self, **kwargs: Any) -> None:
        """Toggle the entity."""
```

### 可用的设备类型

可选。这是什么类型的 device。它可能会映射到 Google device types。

| Constant | Description
| ----- | -----------
| `SwitchDeviceClass.OUTLET` | Device 是 power 的 outlet。
| `SwitchDeviceClass.SWITCH` | Device 是某种类型 entity 的 switch。
