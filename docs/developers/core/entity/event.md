---
title: Event 实体
sidebar_label: Event
---

Event 是在发生某事时发出的信号，例如用户按下门铃等物理按钮或按下遥控器上的按钮时。event 实体捕获物理世界中的这些事件，并将它们作为实体在 Home Assistant 中可用。

Event 实体派生自 [`homeassistant.components.event.EventEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/event/__init__.py)。

## 状态

Event 实体是无状态的，这意味着你无需维护状态。相反，当物理世界中发生某事时，你可以触发一个事件。Home Assistant 会跟踪最后发出的事件，并将其显示为实体的当前状态。

实体的主要状态是最后发出事件的时间戳，此外，还会跟踪事件类型以及随事件提供的可选额外状态数据。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称        | 类型            | 默认值      | 描述                                          |
| ----------- | --------------- | ------------ | ---------------------------------------------------- |
| event_types | `list[str]`     | **必填** | 此实体可以发出的可能事件类型列表。 |

所有实体共有的其他属性（如 `device_class`、`icon`、`name` 等）也适用。

## 触发事件

Event 实体与其他实体略有不同。Home Assistant 管理状态，但集成
负责触发事件。这是通过调用 event 实体上的 `_trigger_event` 方法来实现的。

此方法以事件类型作为第一个参数，以额外的状态数据作为可选的第二个参数。

```python
class MyEvent(EventEntity):

    _attr_device_class = EventDeviceClass.BUTTON
    _attr_event_types = ["single_press", "double_press"]

    @callback
    def _async_handle_event(self, event: str) -> None:
        """Handle the demo button event."""
        self._trigger_event(event, {"extra_data": 123})
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        """Register callbacks with your device API/library."""
        my_device_api.listen(self._async_handle_event)
```

只能发出在 `event_types` 属性中定义的事件类型。如果发出未定义在 `event_types` 属性中的事件类型，将引发 `ValueError`。

:::tip
务必在实体从 Home Assistant 中移除时注销任何回调。
:::

### 可用的 device class

可选指定实体是什么类型。

| 常量                    | 描述                                           |
| --------------------------- | ----------------------------------------------------- |
| `EventDeviceClass.BUTTON`   | 按下了遥控器上的按钮。        |
| `EventDeviceClass.DOORBELL` | 专门用于用作门铃的按钮。 |
| `EventDeviceClass.MOTION`   | 用于运动传感器检测到的运动事件。        |

### 标准事件类型

某些 device class 定义了标准事件类型，以确保集成的了一致性，从而启用与底层集成无关的通用自动化。

#### 门铃

- `DoorbellEventType.RING`：表示标准的"门铃被按下"事件。**此事件类型是必需的**。

#### 按钮

- `ButtonEventType.PRESS_START`：按钮被按下。
- `ButtonEventType.PRESS_END`：按钮在短暂按下后释放（标准的"点击"）。
- `ButtonEventType.LONG_PRESS_START`：按钮被按住超过某个阈值。
- `ButtonEventType.LONG_PRESS_END`：按钮在长按后释放。
- `ButtonEventType.MULTI_PRESS_ONGOING`：检测到多按序列中的中间一次按下。
- `ButtonEventType.MULTI_PRESS_END`：多按序列完成。

`MULTI_PRESS_ONGOING` 和 `MULTI_PRESS_END` 在 `event_data` 中包含 `multi_press_count` 属性，表示按下的次数。

如果设备每次交互仅发出一个事件，没有单独的按下和释放，则将其映射到对应的 `_end` 类型（短按为 `PRESS_END`，长按为 `LONG_PRESS_END`，以此类推）。

对于从单个来源报告方向的按钮（例如上/下滚轮），优先按方向暴露独立的实体。当无法拆分为多个实体时，使用非标准的 `direction` 属性是可接受的替代方案。

也允许其他非标准事件类型。
