---
title: 场景实体
sidebar_label: 场景
---

场景实体是 [可以重现想要的状态](/developers/core/platform/reproduce_state) 为一组实体的实体。场景实体可以针对一组设备激活场景，但从 Home Assistant 角度来看保持无状态。

场景实体源自[`homeassistant.components.scene.Scene`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/scene/__init__.py)。

如果您想表示可以打开和关闭的东西（从而具有实际状态），您应该使用 `switch` 实体。

场景实体也可以[由用户通过场景编辑器或 YAML 创建](https://www.home-assistant.io/integrations/scene)。

## 特性

由于此集成是无状态的，因此它本身不提供任何特定属性。
所有实体共有的其他属性（例如 `icon` 和 `name` 等）仍然适用。

## 方法

### 激活

激活场景。

```python
class MyScene(Scene):
    # Implement one of these methods.

    def activate(self, **kwargs: Any) -> None:
        """Activate scene. Try to get entities into requested state."""

    async def async_activate(self, **kwargs: Any) -> None:
        """Activate scene. Try to get entities into requested state."""
```

activate 方法可用于激活设备或服务的场景。
当用户按下场景 `activate` 按钮或调用 `scene.turn_on` 操作来激活场景时，Home Assistant 会调用它。

某些集成可以接收激活 Home Assistant 外部场景的外部事件。这些激活并非源自 Home Assistant UI 或服务调用，而是来自物理按钮等外部源。

为了支持这种场景，集成应该从 `BaseScene` 而不是 `Scene` 扩展，覆盖 `_async_activate()` 以处理 Home Assistant 端的场景激活，并在发生外部场景激活时调用 `_async_record_activation()`。

此外，由于这些场景在 Home Assistant 外部激活，因此集成可能希望延迟更新场景状态时间戳，直到外部场景报告处于活动状态，即使它是从 Home Assistant UI 激活的。

```python
# Inherit from BaseScene
class MyScene(BaseScene):

    # Note the leading underscore
    async def _async_activate(self, **kwargs: Any) -> None:
        """Activate scene."""
        # Call a service to activate scene
        await mqtt.async_publish(self.hass, self._topic, self._payload)

    # Record the activation in the callback of your service
    async def _state_received(self, msg: ReceiveMessage) -> None:
        self._async_record_activation()
        self.async_write_ha_state()
```

### 可用设备类别

没有特定的设备类别。场景实体上未设置 `device_class` 属性。
