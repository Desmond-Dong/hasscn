将来，MQTT publish API 将要求为 `qos` 和 `retain` 显式提供值。对这两个参数传递 `None` 将不再受支持。

自定义集成应更新代码以接受默认值，或传递有效的 typed arguments。

`qos` 和 `retain` 从 `None` 回退到有效值的功能将在 HA Core 2027.6 中停止工作。

新的 API 签名为：

```python
def publish(
    hass: HomeAssistant,
    topic: str,
    payload: PublishPayloadType,
    qos: int = 0,
    retain: bool = False,
    encoding: str | None = DEFAULT_ENCODING,
) -> None:
    """Publish message to a MQTT topic."""
    hass.create_task(async_publish(hass, topic, payload, qos, retain, encoding))
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
) -> None:
    """Publish message to a MQTT topic."""
```
