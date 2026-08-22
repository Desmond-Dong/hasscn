---
title: Button entity
sidebar_label: Button
---

Button entity 是一种可以触发事件/动作指向 device 或 service 的 entity，但从 Home Assistant 的角度来看它保持无状态。
它类似于真实的一次性 switch、push-button 或其他形式的无状态 switch。然而，它不适合实现实际的物理按钮；button entity 的唯一目的是在 Home Assistant 内提供一个虚拟按钮。

Button entity 从 [`homeassistant.components.button.ButtonEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/button/__init__.py) 派生，
对于控制 device features（包括但不限于以下）很有用：

- 升级 firmware
- 重启/重新启动 device
- 冲泡一杯咖啡
- 重置某些内容（如 counter、filter usage）

如果你想表示一个可以开启和关闭的东西（因此具有实际的 state），应改用 `switch` entity。如果想在 Home Assistant 中集成真实的、物理的无状态按钮 device，可以通过触发自定义 events 来实现。Button entity 不适合这些情况。

## 属性

由于该集成是无状态的，它没有提供任何特定的 property。
其他在所有 entity 中通用的 properties（如 `device_class`、`icon`、`name` 等）仍然适用。

## 方法

### 按下

Press method 可用于触发指向 device 或 service 的动作。
当用户按下按钮或调用了按下按钮的动作时，由 Home Assistant 调用。

```python
class MyButton(ButtonEntity):
    # 实现以下方法之一。

    def press(self) -> None:
        """Handle the button press."""

    async def async_press(self) -> None:
        """Handle the button press."""
```

### 可用的设备类型

选项性地指定 entity 的类型。它可能会映射到 Google device types。

| Constant | Description
| ----- | -----------
| `ButtonDeviceClass.IDENTIFY` | Button entity 用于识别 device。
| `ButtonDeviceClass.RESTART` | Button entity 用于重启 device。
| `ButtonDeviceClass.UPDATE` | Button entity 用于更新 device 的软件。应避免使用此 device class，请考虑改用 [`update`](/developers/core/entity/update) entity。
