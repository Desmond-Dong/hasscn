---
title: 事件实体
sidebar_label: 事件
---

事件是发生某些事情时发出的信号，例如，当用户按下门铃等物理按钮或按下遥控器上的按钮时。事件实体捕获物理世界中的这些事件，并使它们作为实体在 Home Assistant 中可用。

事件实体源自[`homeassistant.components.event.EventEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/event/__init__.py)。

## 状态

事件实体是无状态的，这意味着您不必维护状态。相反，当物理世界发生某些事情时，您可以触发事件。 Home Assistant 将跟踪发出的最后一个事件，并将其显示为实体的当前状态。

实体的主要状态是发出最后一个事件的时间戳，此外还跟踪事件的类型以及随事件提供的可选额外状态数据。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----------- | --------------- | ------------ | ---------------------------------------------------- |
| event_types | `list[str]` | **Required** | 该实体可以触发的可能事件类型的列表。 |

所有实体共有的其他属性（例如 `device_class`、`icon`、`name` 等）也适用。

## 射击事件

事件实体与其他实体相比略有不同。 Home Assistant 管理状态，但集成
负责触发事件。这是通过调用事件实体上的 `_trigger_event` 方法来完成的。

此方法将事件类型作为第一个参数，并可选择额外的状态数据作为第二个参数。

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

只能触发 `event_types` 属性中定义的事件类型。如果触发未在 `event_types` 属性中定义的事件类型，则会引发 `ValueError`。

:::tip
当实体从 Home Assistant 中删除时，请务必取消注册任何回调。
:::

### 可用设备类别

可以选择指定它是什么类型的实体。

| 常量 | 说明 |
| --------------------------- | ----------------------------------------------------- |
| `EventDeviceClass.BUTTON` | 遥控器的按钮被按下。 |
| `EventDeviceClass.DOORBELL` | 专门用于用作门铃的按钮。 |
| `EventDeviceClass.MOTION` | 用于运动传感器检测到的运动事件。 |