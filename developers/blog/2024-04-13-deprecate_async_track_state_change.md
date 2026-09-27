`async_track_state_change` 已被弃用，并将在 Home Assistant 2025.5 中移除。应改用 `async_track_state_change_event`。

`async_track_state_change` 总是为 `EVENT_STATE_CHANGED` 创建一个顶层 listener，这会拒绝所有与所需 entity 不匹配的 state changes。当有多个集成使用 `async_track_state_change` 时，这种设计会带来性能问题。自从引入 `async_track_state_change_event` 以来，`async_track_state_change` 在 `core` 中已被逐步淘汰，最后一个实例在 2024.5 中被移除。

使用 `async_track_state_change` 的示例：

```python
from homeassistant.core import State, callback
from homeassistant.helpers.event import async_track_state_change

@callback
def _async_on_change(entity_id: str, old_state: State | None, new_state: State | None) -> None:
    ...

unsub = async_track_state_change(hass, "sensor.one", _async_on_change)
unsub()
```

使用 `async_track_state_change_event` 替换的示例：

```python
from homeassistant.core import Event, EventStateChangedData, callback
from homeassistant.helpers.event import async_track_state_change_event

@callback
def _async_on_change(event: Event[EventStateChangedData]) -> None:
    entity_id = event.data["entity_id"]
    old_state = event.data["old_state"]
    new_state = event.data["new_state"]
    ...

unsub = async_track_state_change_event(hass, "sensor.one", _async_on_change)
unsub()
```
