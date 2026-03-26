---
title: "事件"
---

Home Assistant 的核心由事件驱动。这意味着如果你想对某些事情的发生作出响应，就必须响应事件。大多数情况下你不会直接与事件系统交互，而是使用某个[事件监听辅助工具][helpers]。

事件系统非常灵活。事件类型没有限制，只要它是字符串即可。每个事件都可以包含数据。数据是一个字典，只要可被 JSON 序列化，就可以包含任意内容。这意味着你可以使用数字、字符串、字典和列表。

[Home Assistant 触发的事件列表。][object]

## 触发事件

要触发一个事件，你需要与事件总线交互。事件总线可通过 Home Assistant 实例上的 `hass.bus` 访问。请注意数据结构，并参考我们的 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 中的文档。

下面是一个组件示例，它会在加载时触发一个事件。请注意，自定义事件名称会以组件名作为前缀。

```python
DOMAIN = "example_component"


def setup(hass, config):
    """Set up is called when Home Assistant is loading our component."""

    # Fire event example_component_my_cool_event with event data answer=42
    hass.bus.fire("example_component_my_cool_event", {"answer": 42})

    # Return successful setup
    return True
```

## 监听事件

大多数时候你不会触发事件，而是监听事件。例如，实体的状态变化就会作为事件广播。

```python
DOMAIN = "example_component"


def setup(hass, config):
    """Set up is called when Home Assistant is loading our component."""
    count = 0

    # Listener to handle fired events
    def handle_event(event):
        nonlocal count
        count += 1
        print(f"Answer {count} is: {event.data.get('answer')}")

    # Listen for when example_component_my_cool_event is fired
    hass.bus.listen("example_component_my_cool_event", handle_event)

    # Return successful setup
    return True
```

### 辅助工具

Home Assistant 内置了大量辅助工具，用于监听特定类型的事件。这些辅助工具可以跟踪某个时间点、时间间隔、状态变化或日落。[查看可用方法。][helpers]

[helpers]: https://developers.home-assistant.io/docs/integration_listen_events#available-event-helpers
[object]: https://www.home-assistant.io/docs/configuration/events/
