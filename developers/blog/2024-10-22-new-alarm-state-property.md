自 Home Assistant Core 2024.11 起，我们在 `AlarmControlPanelEntity` 中引入了 `alarm_state` 属性。这个新属性应取代直接设置 `state` 属性。

新的 `alarm_state` 属性应使用新的 `AlarmControlPanelState` enum 返回其 state，而不是像以前那样使用 `STATE_ALARM_*` 常量设置 state。

设有为期一年的 deprecation 期，这些常量将从 2025.11 起停止工作，以确保所有自定义集成作者都有时间进行调整。

### 示例

```python

from homeassistant.components.alarm_control_panel import AlarmControlPanelEntity, AlarmControlPanelState

class MyAlarm(AlarmControlPanelEntity):
    """My alarm."""

    @property
    def alarm_state(self) -> AlarmControlPanelState | None:
        """Return the state of the alarm."""
        if self.device.is_on():
            return AlarmControlPanelState.ARMED_AWAY
        return AlarmControlPanelState.DISARMED

```

更多详情请参阅 [alarm control panel 文档](/developers/core/entity/alarm-control-panel.md#states)。
