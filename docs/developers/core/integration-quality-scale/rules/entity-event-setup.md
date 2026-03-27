---
title: "实体事件以正确的生命周期方法订阅"
description: '实体可能需要订阅事件，例如。从集成库中获取，并在新事件出现时更新状态。 为了执行正确的此操作，实体应在实体方法 asyncaddedtohass 中订阅并注册回调更新。 在实体平台帮助程序注册实体之后调用此实体方法，并且该实体现在将具有调用的所有接口。'
---
# 实体事件以正确的生命周期方法订阅

## 推理

实体可能需要订阅事件，例如。从集成库中获取，并在新事件出现时更新状态。
为了执行正确的此操作，实体应在实体方法 `async_added_to_hass` 中订阅并注册回调更新。
在实体平台帮助程序注册实体之后调用此实体方法，并且该实体现在将具有调用的所有接口，例如 `self.hass` 和 `self.async_write_ha_state`。
注册更新回调之前的这个阶段将导致错误，例如回调。尝试访问 `self.hass` 或写入状态更新。
为了避免内存喷射，实体应该取消订阅事件，即。在实体方法 `async_will_remove_from_hass` 中取消注册更新回调。

## 实施示例

在下面的示例中，`self.client.events.subscribe` 返回一个函数，调用该函数时，会取消实体对事件的订阅。
因此我们在 `async_added_to_hass` 中订阅事件并在 `async_will_remove_from_hass` 中取消订阅。

ZZ保护0ZZ
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
可以使用生命周期函数来简化上面的示例。
这节省了在实体中存储回调函数的需要。
```python showLineNumbers
    async def async_added_to_hass(self) -> None:
        """Subscribe to the events."""
        await super().async_added_to_hass()
        self.async_on_remove(
            self.client.events.subscribe("my_event", self._handle_event)
        )
```
:::

## 例外情况

这条规则没有例外。
