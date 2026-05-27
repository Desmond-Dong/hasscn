# 按钮实体

按钮实体是可以触发事件/触发对设备或服务的操作的实体，但从 Home Assistant 的角度来看保持无状态。
它可以与真实的瞬时开关、按钮或某种其他形式的无状态开关进行比较。然而，它不适合实现实际的物理按钮；按钮实体的唯一目的是在 Home Assistant 内提供虚拟按钮。

开关按钮实体源自[`homeassistant.components.button.ButtonEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/button/__init__.py)，
并且有助于控制设备功能，例如（但不限于）：

* 升级固件
* 重新启动/重新启动设备
* 冲泡一杯咖啡
* 重置某些内容（例如计数器、过滤器使用情况）

如果您想表示可以打开和关闭的东西（从而具有实际状态），您应该使用 `switch` 实体。如果您想在 Home Assistant 中集成真实的、物理的、无状态的按钮设备，您可以通过触发自定义事件来实现。实体按钮实体不适合这些情况。

## 特性

由于此集成是无状态的，因此它本身不提供任何特定属性。
所有实体共有的其他属性（例如 `device_class`、`icon`、`name` 等）仍然适用。

## 方法

### 按

press 方法可用于触发针对设备或服务的操作。
当用户按下按钮或
已调用按下按钮的操作。

```python
class MyButton(ButtonEntity):
    # Implement one of these methods.

    def press(self) -> None:
        """Handle the button press."""

    async def async_press(self) -> None:
        """Handle the button press."""
```

### 可用设备类别

可以选择指定它是什么类型的实体。它可能会映射到 Google 设备类型。

| 常量 | 说明
| ----- | -----------
| `ButtonDeviceClass.IDENTIFY` | 按钮实体标识设备。
| `ButtonDeviceClass.RESTART` | 按钮实体重新启动设备。
| `ButtonDeviceClass.UPDATE` | 按钮实体更新设备的软件。应避免使用此设备类，请考虑使用 [`update`](/developers/core/entity/update.md) 实体。
