---
author: Abílio Costa
authorURL: https://github.com/abmantis
authorImageURL: https://avatars.githubusercontent.com/u/974569?v=4
title: "Doorbell event entities 的标准 event type"
---

Doorbell event entities 现在有了一个标准的 `ring` event type。使用 `EventDeviceClass.DOORBELL` 的集成必须在它们的 `event_types` 列表中包含 `DoorbellEventType.RING`。

查看 [architecture discussion](https://github.com/home-assistant/architecture/discussions/1363) 了解完整背景。

<!--truncate-->

## 原因

以前，每个集成使用自己的字符串来表示"门铃被按下"事件——`ding`、`ring`、`doorbell_chime`、`single_press` 等。这种不一致性使得无法构建适用于所有集成的通用 doorbell 自动化。

新的 `DoorbellEventType.RING` 标准 event type 通过确保每个 doorbell 集成在门铃被按下时触发通用的 `ring` 事件来解决这个问题。

## 需要做什么

从 `homeassistant.components.event` 导入 `DoorbellEventType`，并在你的 doorbell entity 的 `event_types` 中包含 `DoorbellEventType.RING`。每当门铃被按下时触发它：

```python
from homeassistant.components.event import DoorbellEventType, EventDeviceClass, EventEntity


class MyDoorbellEvent(EventEntity):

    _attr_device_class = EventDeviceClass.DOORBELL
    _attr_event_types = [DoorbellEventType.RING]

    @callback
    def _async_handle_event(self) -> None:
        """Handle the doorbell press event."""
        self._trigger_event(DoorbellEventType.RING)
        self.async_write_ha_state()
```

除了标准的 `ring` type 之外，仍然允许额外的自定义 event types（例如 `double_press`、`long_press`）。

不包含 `DoorbellEventType.RING` 的 doorbell entities 会记录一条 deprecation 警告，并且将在 **Home Assistant 2027.4 中停止工作**。

更多详情，请参阅 [event entity 文档](/developers/core/entity/event)。
