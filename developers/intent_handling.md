任何 component 都可以注册来处理 intents。这使得单个 component 能够处理来自多个 voice assistants 所 fire 的 intents。

一个 component 需要为它想要处理的每一种类型注册一个 intent handler。Intent handlers 必须继承 `homeassistant.helpers.intent.IntentHandler`。

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers import intent
from homeassistant.helpers.typing import ConfigType

DATA_KEY = "example_key"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.data[DATA_KEY] = 0
    intent.async_register(hass, CountInvocationIntent())
    return True


class CountInvocationIntent(intent.IntentHandler):
    """Handle CountInvocationIntent intents."""

    # 要处理的 intent 类型
    intent_type = "CountInvocationIntent"

    description = "Count how often it has been called"

    # 可选。用于校验 slots 的 schema
    # slot_schema = {
    #     'item': cv.string
    # }

    async def async_handle(self, intent_obj: intent.Intent) -> intent.IntentResponse:
        """Handle the intent."""
        intent_obj.hass.data[DATA_KEY] += 1
        count = intent_obj.hass.data[DATA_KEY]

        response = intent_obj.create_response()
        response.async_set_speech(
            f"This intent has been invoked {count} times"
        )
        return response
```
