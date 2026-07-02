# 集成 诊断

集成 可以提供诊断，帮助用户收集数据以帮助排除故障。可以为 配置条目 提供诊断，也可以为每个 设备 条目单独提供诊断。

用户可以从 集成 页面上的 配置条目 选项菜单下载 配置条目 诊断。对于 设备 诊断，用户可以从 设备 信息部分（或从其菜单，具体取决于 集成）下载它们。请注意，如果 集成 未实现 设备 诊断，则 设备 页面将提供 配置条目 诊断。

:::warning
确保不泄露任何敏感数据至关重要。这包括但不限于：

* 密码和 API 密钥
* 身份验证令牌
* 位置数据
* 个人信息

Home Assistant 提供 `async_redact_data` 实用程序函数，您可以使用该函数安全地从诊断输出中删除敏感数据。
:::

以下是如何实现 配置条目 和 设备 进入诊断的示例：

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

集成 可以提供两种类型的诊断或仅提供其中一种。
