## 理由

Diagnostics 是用户收集集成数据的便捷方式，在调试集成时可能很有用。

我们认为实现 diagnostics 是一项良好的实践。
需要注意的是，diagnostics 不应暴露任何敏感信息，例如密码、tokens 或坐标。

## 示例实现

在以下示例中，我们提供了包含来自各种来源数据的 diagnostics，例如配置和集成的当前状态。
由于配置可能包含敏感信息，我们在返回 diagnostics 之前隐藏了敏感信息。

`diagnostics.py`:

```python showLineNumbers
TO_REDACT = [
    CONF_API_KEY,
    CONF_LATITUDE,
    CONF_LONGITUDE,
]

async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: MyConfigEntry
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""

    return {
        "entry_data": async_redact_data(entry.data, TO_REDACT),
        "data": entry.runtime_data.data,
    }
```

## 附加资源

要了解有关 diagnostics 的更多信息，请参阅[diagnostics 文档](/developers/core/integration/diagnostics.md)。

## 例外

此规则没有例外。
