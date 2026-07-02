# 自动化

:::warning
此页面中的功能仍在非常活跃地开发中，集成尚不应使用。API 可能会随时变更，恕不另行通知。
:::

## 触发器

触发器会根据事件、状态变化或条件来启动自动化。你可以在集成的 `trigger` 平台（`trigger.py`）中，通过创建并注册触发器类来实现它们。

### 触发器类

每个触发器都必须继承自 `homeassistant.helpers.trigger.Trigger`，并实现 `async_validate_config` 和 `async_attach_runner`。

`async_validate_config` 用于校验配置字典，`async_attach_runner` 则负责在每次触发时调用提供的动作运行器 `run_action`。

如果集成需要等待动作执行完成，可以等待 `run_action` 返回的 `Task`：`await run_action(...)`。

```python
from typing import Any

import voluptuous as vol

from homeassistant.const import CONF_OPTIONS
from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.trigger import Trigger, TriggerActionRunner, TriggerConfig
from homeassistant.helpers.typing import ConfigType

_OPTIONS_SCHEMA = vol.Schema({
    vol.Required("event_type"): cv.string,
})

_CONFIG_SCHEMA = vol.Schema({
    vol.Required(CONF_OPTIONS): _OPTIONS_SCHEMA,
})

class EventTrigger(Trigger):
    """Trigger on events."""

    _options: dict[str, Any]

    @classmethod
    async def async_validate_config(
        cls, hass: HomeAssistant, config: ConfigType
    ) -> ConfigType:
        """Validate trigger-specific config."""
        return _CONFIG_SCHEMA(config)

    def __init__(self, hass: HomeAssistant, config: TriggerConfig) -> None:
        """Initialize trigger."""
        super().__init__(hass, config)
        assert config.options is not None
        self._options = config.options

    async def async_attach_runner(
        self, run_action: TriggerActionRunner
    ) -> CALLBACK_TYPE:
        """Attach the trigger."""
        @callback
        def async_remove() -> None:
            """Remove trigger."""
            # Your code to unregister the trigger

        @callback
        def async_on_event(event_data: dict) -> None:
            """Handle event."""
            payload = {
                "event_type": event_data["type"],
                "data": event_data["data"],
            }
            description = f"Event {event_data['type']} detected"
            run_action(payload, description)

        # Dummy example method to register your event listener
        register_for_events(async_on_event)

        return async_remove
```

### 注册触发器

在 `trigger` 平台中实现 `async_get_triggers`，以注册该集成提供的所有触发器。
每个触发器都使用一个唯一字符串标识，例如上例中的 `"event"`。

```python
async def async_get_triggers(hass: HomeAssistant) -> dict[str, type[Trigger]]:
    """Return triggers provided by this integration."""
    return {
        "event": EventTrigger,
    }
```
