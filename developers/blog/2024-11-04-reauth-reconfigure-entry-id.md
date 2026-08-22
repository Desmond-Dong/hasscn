在没有关联到 config entry 的情况下启动 reauth 或 reconfigure flow 已被 deprecated，并将在 2025.12 开始失效。

自定义集成应更新为使用 `entry.async_start_reauth(hass)` 辅助函数来触发 reauth flow。

```python
    async def async_press(self) -> None:
        """Handle the button press."""
        try:
            await self.device.press_button()
        except DevicePasswordProtected as ex:
            self.entry.async_start_reauth(self.hass)
```

旧的错误代码：

```python
    async def async_press(self) -> None:
        """Handle the button press."""
        try:
            await self.device.press_button()
        except DevicePasswordProtected as ex:
            # old incorrect code:
            self.hass.async_create_task(
                hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_REAUTH}
            )
    )
```

自定义集成还可以在初始化阶段，或在 data update coordinator 的 update 方法内抛出 `ConfigEntryAuthFailed` 异常。

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up integration from a config entry."""
    username = entry.data[CONF_USERNAME]
    password = entry.data[CONF_PASSWORD]

    if not _credentials_valid(username, password):
        raise ConfigEntryAuthFailed()
```

启动 reconfigure flow 只能由前端完成，自定义集成不应需要对这些 flow 做任何更改。

更多详情请参阅 [reconfigure](/developers/core/integration/config_flow.md#reconfigure) 和 [reauthentication](/developers/core/integration/config_flow.md#reauthentication) 文档。
