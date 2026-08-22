---
title: Scene 实体
sidebar_label: Scene
---

Scene 实体是一种 [可以为一组实体重现所需状态](/developers/core/platform/reproduce_state) 的实体。Scene 实体可以向一组设备激活 scene，但从 Home Assistant 的角度来看是无状态的。

Scene 实体派生自 [`homeassistant.components.scene.Scene`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/scene/__init__.py)。

如果你想表示一个可以开启和关闭的东西（从而有实际状态），应使用 `switch` 实体。

Scene 实体也可以 [通过 Scene 编辑器或 YAML 由用户创建](https://www.home-assistant.io/integrations/scene)。

## 属性

由于此集成是无状态的，它不为其自身提供任何特定属性。
所有实体共有的其他属性（如 `icon`、`name` 等）仍然适用。

## 方法

### 激活

激活 scene。

```python
class MyScene(Scene):
    # 实现以下方法之一。

    def activate(self, **kwargs: Any) -> None:
        """Activate scene. Try to get entities into requested state."""

    async def async_activate(self, **kwargs: Any) -> None:
        """Activate scene. Try to get entities into requested state."""
```

Activate 方法可用于向设备或服务激活 scene。
当用户按下 scene 的 `activate` 按钮或调用 `scene.turn_on` 操作来激活 scene 时，Home Assistant 会调用此方法。

一些集成可以接收外部事件，在 Home Assistant 外部激活 scene。这些激活不源自 Home Assistant UI 或服务调用，而是来自物理按钮等外部来源。

为了支持此场景，集成应从 `BaseScene` 而不是 `Scene` 派生，覆盖 `_async_activate()` 以处理来自 Home Assistant 侧的 scene 激活，并在发生外部 scene 激活时调用 `_async_record_activation()`。

此外，由于这些 scene 在 Home Assistant 外部激活，集成可能希望延迟更新 scene 状态时间戳，直到外部 scene 报告为活动状态，即使在 Home Assistant UI 中激活也是如此。

```python
# 继承自 BaseScene
class MyScene(BaseScene):

    # 注意前面的下划线
    async def _async_activate(self, **kwargs: Any) -> None:
        """Activate scene."""
        # 调用服务以激活 scene
        await mqtt.async_publish(self.hass, self._topic, self._payload)

    # 在服务回调中记录激活
    async def _state_received(self, msg: ReceiveMessage) -> None:
        self._async_record_activation()
        self.async_write_ha_state()
```

### 可用的 device class

没有特定的 device class。`device_class` 属性未在 scene 实体上设置。
