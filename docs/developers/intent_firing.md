---
title: "触发意图"
---

如果你的代码将用户的语音或文本匹配到 intents，你可以让该 intent 交由 Home Assistant 处理。这既可以在你自己的 integration 内部完成，也可以通过通用的 Intent handle API 来实现。

当你 fire 一个 intent 时，你会收到一个 response，或者抛出一个 error。由你的代码负责将结果返回给用户。

## HTTP API

当 intent integration 被加载后，会在 `/api/intent/handle` 提供一个 HTTP API endpoint。你可以向它 POST JSON 数据，其中包含 intent name 及其 data：

```json
{
  "name": "HassTurnOn",
  "data": {
    "name": "Kitchen Light"
  }
}
```

## Home Assistant integration

在 Home Assistant 中处理 intent 的示例代码。

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

intent response 是 `homeassistant.helpers.intent.IntentResponse` 的一个实例。

| Name | Type | Description |
| ---- | ---- | ----------- |
| `intent` | Intent | 触发该 response 的 intent 实例。 |
| `speech` | Dictionary | Speech responses。每个 key 对应一个类型。允许的类型为 `plain` 和 `ssml`。 |
| `reprompt` | Dictionary | Reprompt responses。每个 key 对应一个类型。允许的类型为 `plain` 和 `ssml`。<br />当需要从用户处获取 response 时，用于保持 session 处于打开状态。在这种情况下，`speech` 通常是一个问题。 |
| `card` | Dictionary | Card responses。每个 key 对应一个类型。 |

Speech dictionary 的值：

| Name | Type | Description |
| ---- | ---- | ----------- |
| `speech` | String | 要播放的文本 |
| `extra_data` | Any | 与该 speech 相关的额外信息。 |

Reprompt dictionary 的值：

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reprompt` | String | 当用户花费太长时间未响应时要播放的文本 |
| `extra_data` | Any | 与该 speech 相关的额外信息。 |

Card dictionary 的值：

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | String | 该 card 的标题 |
| `content` | Any | 该 card 的内容 |
