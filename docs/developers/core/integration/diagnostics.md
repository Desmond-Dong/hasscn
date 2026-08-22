---
title: Integration diagnostics
sidebar_label: "Diagnostics"
---

集成可以提供 diagnostics 以帮助用户收集数据，辅助进行故障排除。可以为 config entries 提供 diagnostics，也可以单独为每个 device entry 提供。

用户可以从集成页面上的 config entry options 菜单下载 config entry diagnostics。对于 device diagnostics，用户可以从 device 信息部分下载（或从其菜单下载，具体取决于集成）。请注意，如果集成未实现 device diagnostics，则 device 页面将提供 config entry diagnostics。

:::warning
确保不暴露敏感数据至关重要。包括但不限于：
- 密码和 API keys
- Authentication tokens
- 位置数据
- 个人信息

Home Assistant 提供了 `async_redact_data` 工具函数，你可以使用它安全地从 diagnostics 输出中删除敏感数据。
:::

以下是一个实现 config entry 和 device entry diagnostics 的示例：

```python
TO_REDACT = [
    CONF_API_KEY,
    APPLIANCE_CODE
]

async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: MyConfigEntry
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""

    return {
        "entry_data": async_redact_data(entry.data, TO_REDACT),
        "data": entry.runtime_data.data,
    }

async def async_get_device_diagnostics(
    hass: HomeAssistant, entry: MyConfigEntry, device: DeviceEntry
) -> dict[str, Any]:
    """Return diagnostics for a device."""
    appliance = _get_appliance_by_device_id(hass, device.id)
    return {
        "details": async_redact_data(appliance.raw_data, TO_REDACT),
        "data": appliance.data,
    }
```

集成可以同时提供这两种类型的 diagnostics，或者只提供其中一种。
