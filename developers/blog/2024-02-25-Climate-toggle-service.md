自 Home Assistant Core 2024.3 起，我们在 `ClimateEntity` 中添加了一个新的 `toggle` 方法，用户现在可以在 service 调用中调用 `climate.toggle`。

支持 `turn_on` 和 `turn_off` 的集成隐式也支持 `toggle` 方法。

[在我们的文档中了解更多关于 toggle 方法的内容](/developers/core/entity/climate.md#toggle)

示例（默认实现）：

```python
async def async_toggle(self) -> None:
    """Toggle the entity."""
    if self.hvac_mode == HVACMode.OFF:
        await self.async_turn_on()
    else:
        await self.async_turn_off()

```
