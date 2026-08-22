---
title: "事件"
---

Home Assistant 的核心由事件驱动。这意味着，如果你想对某件事做出响应，就必须对事件做出响应。大多数情况下你不会直接与 event system 交互，而是使用其中一个 [event listener helpers][helpers]。

Event system 非常灵活。对 event type 没有限制，只要它是一个字符串。每个 event 都可以包含 data。该 data 是一个字典，可以包含任何数据，只要它是 JSON 可序列化的。这意味着你可以使用数字、字符串、字典和列表。

[Home Assistant 发出的事件列表。][object]

## 发出事件（Firing events）

要发出事件，你需要与 event bus 交互。Event bus 在 Home Assistant 实例上以 `hass.bus` 的形式提供。请注意 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 上记录的 data 结构。

以下是一个 component 示例，加载时会发出事件。注意自定义 event 名称以前缀 component 名称开头。

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

DOMAIN = "example_component"


def setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up is called when Home Assistant is loading our component."""

    # Fire event example_component_my_cool_event with event data answer=42
    hass.bus.fire("example_component_my_cool_event", {"answer": 42})

    # Return successful setup
    return True
```

## 监听事件（Listening to events）

大多数情况下你不会发出事件，而是监听事件。例如，实体的 state 变更会以事件形式广播。

```python
from homeassistant.core import Event, HomeAssistant
from homeassistant.helpers.typing import ConfigType

DOMAIN = "example_component"


def setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up is called when Home Assistant is loading our component."""
    count = 0

    # Listener to handle fired events
    def handle_event(event: Event) -> None:
        nonlocal count
        count += 1
        print(f"Answer {count} is: {event.data.get('answer')}")

    # Listen for when example_component_my_cool_event is fired
    hass.bus.listen("example_component_my_cool_event", handle_event)

    # Return successful setup
    return True
```

### 辅助函数

Home Assistant 附带了许多 bundled helpers 来监听特定类型的事件。有用于跟踪某个时间点的 helper，用于跟踪时间间隔的 helper，跟踪 state 变更的 helper，以及跟踪日落的 helper。[查看可用的 methods。][helpers]

[helpers]: https://developers.home-assistant.io/docs/integration_listen_events#available-event-helpers
[object]: https://www.home-assistant.io/docs/configuration/events/