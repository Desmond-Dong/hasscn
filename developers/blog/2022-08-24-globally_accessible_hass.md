现在可以通过调用 `core.async_get_hass()` 获取 `HomeAssistant` 实例的引用。

虽然这意味着不再严格要求传递 `hass`，但建议仍然只在传递 `hass` 非常困难或根本无法传递的地方使用 `core.async_get_hass`。
一个可以使用它的示例是 voluptuous validators，它们之前无法访问 `hass`，因为 voluptuous 没有办法将用户数据传递给 validators。

```python
@callback
def async_get_hass() -> HomeAssistant:
    """Return the HomeAssistant instance.
    Raises LookupError if no HomeAssistant instance is available.
    This should be used where it's very cumbersome or downright impossible to pass
    hass to the code which needs it.
    """
```
