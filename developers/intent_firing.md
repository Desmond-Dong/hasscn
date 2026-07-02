# 触发意图

如果你的代码能够将用户的语音或文本匹配到意图，你可以让 Home Assistant 来处理该意图。这既可以在你自己的集成内部完成，也可以通过通用的 Intent handle API 来完成。

当你触发一个意图时，你会收到响应，或者抛出错误。如何将结果返回给用户，由你的代码自行决定。

## HTTP API

当 intent 集成被加载后，一个 HTTP API 端点会在 `/api/intent/handle` 可用。你可以向它 POST JSON 数据，其中包含意图名称及其数据：

```json
{
  "name": "HassTurnOn",
  "data": {
    "name": "Kitchen Light"
  }
}
```

## Home Assistant integration

在 Home Assistant 中处理意图的示例代码。

```python
from homeassistant.helpers import intent

intent_type = "TurnLightOn"
slots = {"entity": {"value": "Kitchen"}}

try:
    intent_response = await intent.async_handle(
        hass, "example_component", intent_type, slots
    )

except intent.UnknownIntent as err:
    _LOGGER.warning("Received unknown intent %s", intent_type)

except intent.InvalidSlotInfo as err:
    _LOGGER.error("Received invalid slot data: %s", err)

except intent.IntentError:
    _LOGGER.exception("Error handling request for %s", intent_type)
```

意图响应是 `homeassistant.helpers.intent.IntentResponse` 的一个实例。

| Name | Type | Description |
| ---- | ---- | ----------- |
| `intent` | Intent | 触发该响应的意图实例。 |
| `speech` | Dictionary | 语音响应。每个键代表一种类型。允许的类型是 `plain` 和 `ssml`。 |
| `reprompt` | Dictionary | 重新提示响应。每个键代表一种类型。允许的类型是 `plain` 和 `ssml`。<br />当需要用户继续回复时，会用它来保持会话开启。这种情况下，`speech` 通常是一个问题。 |
| `card` | Dictionary | 卡片响应。每个键代表一种类型。 |

speech 字典中的值：

| Name | Type | Description |
| ---- | ---- | ----------- |
| `speech` | String | 要说出的文本 |
| `extra_data` | Any | 与该语音内容相关的额外信息。 |

reprompt 字典中的值：

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reprompt` | String | 当用户过久未响应时要说出的文本 |
| `extra_data` | Any | 与该语音内容相关的额外信息。 |

card 字典中的值：

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | String | 卡片标题 |
| `content` | Any | 卡片内容 |
