Button event entities 现在有一组标准 event types，由新的 `ButtonEventType` enum 提供。使用 `EventDeviceClass.BUTTON` 的集成，当交互映射到其中一个 type 时，应使用这些 type 而不是自定义字符串。

查看 [architecture discussion](https://github.com/home-assistant/architecture/discussions/1377) 了解完整背景。

<!--truncate-->

## 原因

以前，每个集成为自己选择的 button 交互使用不同的字符串——`single`、`click`、`hold`、`double_press` 等等。这种不一致性使得无法构建跨集成工作的通用 button 自动化，也阻止了 frontend 提供有意义的触发器建议。

新的 `ButtonEventType` 标准 event types 通过为每个 button 集成提供共享词汇来解决常见交互。

## 事件类型

`ButtonEventType` 定义了六个标准 event types：

* `ButtonEventType.PRESS_START`：button 被按下。
* `ButtonEventType.PRESS_END`：button 在短暂按下后释放（标准的"click"）。
* `ButtonEventType.LONG_PRESS_START`：button 被按住超过了持续时间阈值。
* `ButtonEventType.LONG_PRESS_END`：button 在长时间按住后释放。
* `ButtonEventType.MULTI_PRESS_ONGOING`：检测到多按序列中的中间按下。
* `ButtonEventType.MULTI_PRESS_END`：多按序列完成。

`MULTI_PRESS_ONGOING` 和 `MULTI_PRESS_END` events 在其 event data 中包含 `multi_press_count` 属性（`ATTR_MULTI_PRESS_COUNT` 常量），指示按下次数。

**这些都不是强制的。** 与 doorbell 的 `ring` event 不同，这里没有必需的 type。每个集成只映射其硬件实际能产生的交互，并在 `event_types` 中列出这些。

## 需要做什么

从 `homeassistant.components.event` 导入 `ButtonEventType`，并在 entity 的 `event_types` 中包含你的设备支持的 types。当交互发生时触发它们：

```python
from homeassistant.components.event import (
    ATTR_MULTI_PRESS_COUNT,
    ButtonEventType,
    EventDeviceClass,
    EventEntity,
)


class MyButtonEvent(EventEntity):

    _attr_device_class = EventDeviceClass.BUTTON
    _attr_event_types = [
        ButtonEventType.PRESS_END,
        ButtonEventType.LONG_PRESS_END,
        ButtonEventType.MULTI_PRESS_END,
    ]

    @callback
    def _async_handle_multi_press(self, count: int) -> None:
        """Handle a completed multi-press sequence."""
        self._trigger_event(
            ButtonEventType.MULTI_PRESS_END,
            {ATTR_MULTI_PRESS_COUNT: count},
        )
        self.async_write_ha_state()
```

### 单事件设备

如果设备每次交互只发出一个 event，没有单独的按下和释放，将其映射到匹配的 `_end` type（短按用 `PRESS_END`，按住用 `LONG_PRESS_END`，以此类推）。这在不合成硬件从不发送的 events 的情况下，保持跨设备"button 被按下"触发的一致性。

## 无需迁移

此变更仅添加共享常量；没有弃用，也没有集成被迫迁移。自定义 event types 仍然可以与标准 types 一起使用。当它适合你的设备时采用 `ButtonEventType`。

更多详情，请参阅 [event entity 文档](/developers/core/entity/event.md)。
