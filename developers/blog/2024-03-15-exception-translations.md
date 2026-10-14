### 记录支持翻译的 exception

翻译支持适用于 `HomeAssistantError` 及其子类，如 `ServiceValidationError`。当设置了 `translation_domain` 和 `translation_key`，并且错误消息已添加到 `strings.json` 中时，不再需要为本地 logging 添加错误消息字符串。Home Assistant 会自动从翻译缓存中获取英文错误消息。

在抛出带有翻译支持的 `HomeAssistantError` 或其子类时，我们应该从参数列表中移除 log message，以便从翻译缓存中获取它。

例如：

```python
async def async_select_index(hass: HomeAssistant, index: int) -> None:
    """Setup the config entry for my device."""
    try:
        check_index(index)
    except ValueError as exc:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="invalid_index",
            translation_placeholders={
                "index": index,
                "expected": expected,
            },
        ) from exc
```

错误消息放置在 `strings.json` 中：

```json
{
    ...
    "exceptions": {
        "invalid_index": {
            "message": "选择了无效的索引，期望值：{expected}，实际值：{index}"
        }
    }
}
```
