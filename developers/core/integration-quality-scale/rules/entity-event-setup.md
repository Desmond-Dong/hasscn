## 理由

entity 可能需要订阅事件，例如来自集成库的事件，并在新事件到来时更新状态。
为了正确地做到这一点，entity 应该在 entity 方法 `async_added_to_hass` 中订阅并注册 update callback。
此 entity 方法在 entity 被 entity platform helper 注册后调用，此时 entity 将拥有所有可调用接口，如 `self.hass` 和 `self.async_write_ha_state`。
在此阶段之前注册 update callback 会导致错误，例如 callback 尝试访问 `self.hass` 或写入状态更新时。
为避免内存泄漏，entity 应该在 entity 方法 `async_will_remove_from_hass` 中取消订阅事件，即注销 update callback。

## 示例实现

在下面的示例中，`self.client.events.subscribe` 返回一个函数，调用该函数即可取消实体对事件的订阅。
因此，我们在 `async_added_to_hass` 中订阅事件，在 `async_will_remove_from_hass` 中取消订阅。

`sensor.py`

```python {10-13,15-19} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    unsubscribe: Callable[[], None] | None = None

    def __init__(self, client: MyClient) -> None:
        """Initialize the sensor."""
        self.client = client

    async def async_added_to_hass(self) -> None:
        """Subscribe to the events."""
        await super().async_added_to_hass()
        self.unsubscribe = self.client.events.subscribe("my_event", self._handle_event)

    async def async_will_remove_from_hass(self) -> None:
        """Unsubscribe from the events."""
        if self.unsubscribe:
            self.unsubscribe()
        await super().async_will_remove_from_hass()

    async def _handle_event(self, event: Event) -> None:
        """Handle the event."""
        ...
        self.async_write_ha_state()
```

:::info
上述示例可以使用 lifecycle 函数进行简化。
这样就不需要在 entity 中存储 callback 函数。

```python showLineNumbers
    async def async_added_to_hass(self) -> None:
        """Subscribe to the events."""
        await super().async_added_to_hass()
        self.async_on_remove(
            self.client.events.subscribe("my_event", self._handle_event)
        )
```

:::

## 例外

本规则没有例外。
