---
title: "实施诊断"
description: '诊断是用户收集有关集成的数据的一种简单方法，并且在调试集成时非常有用。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 实施诊断

## 推理

诊断是用户收集有关集成的数据的一种简单方法，并且在调试集成时非常有用。

我们认为实施诊断是一个很好的做法。
需要记住的是，诊断不应泄露任何敏感信息，例如密码、令牌或坐标。

## 实施示例

在以下示例中，我们提供诊断，其中包括来自各种来源的数据，例如集成的配置和当前状态。
由于配置可能包含敏感信息，因此我们在返回诊断信息之前编辑敏感信息。

ZZ保护0ZZ:
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

## 其他资源

要了解有关诊断的更多信息，请查看[diagnostics documentation](/developers/core/integration_diagnostics)。

## 例外情况

这条规则没有例外。
