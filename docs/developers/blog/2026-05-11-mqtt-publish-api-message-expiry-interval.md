---
author: Jan Bouwhuis
authorURL: https://github.com/jbouwh
authorImageURL: https://avatars.githubusercontent.com/u/7188918?s=96&v=4
title: "MQTT publish API 支持 message expiry interval"
---

MQTT publish API 现在支持设置 message expiry interval。

以前，保留消息会存储在 broker 中，直到被替换或显式清除。设置了 `message_expiry_interval`（以秒为单位）后，发布的消息——包括保留消息——将在指定间隔后自动过期。

此选项仅在使用 MQTT 协议版本 5 时受支持；在使用早期协议版本时会被忽略。

新的 API 签名为：

```python
def publish(
    hass: HomeAssistant,
    topic: str,
    payload: PublishPayloadType,
    qos: int = 0,
    retain: bool = False,
    encoding: str | None = DEFAULT_ENCODING,
    *,
    message_expiry_interval: int | None = None,
) -> None:
    """Publish message to a MQTT topic."""
```

以及

```python
async def async_publish(
    hass: HomeAssistant,
    topic: str,
    payload: PublishPayloadType,
    qos: int = 0,
    retain: bool = False,
    encoding: str | None = DEFAULT_ENCODING,
    *,
    message_expiry_interval: int | None = None,
) -> None:
    """Publish message to a MQTT topic."""
```
