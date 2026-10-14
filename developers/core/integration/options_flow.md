通过 config entry 配置的集成可以向用户公开 options，以允许调整集成的行为，例如应集成哪些设备或位置。

Config Entry Options 使用 [Data Flow Entry framework](data_entry_flow_index.md) 允许用户更新 config entry 的 options。想要支持 config entry options 的组件需要定义一个 Options Flow Handler。

## 选项支持

为了让集成支持 options，它需要在 config flow handler 中有一个 `async_get_options_flow` 方法。调用它将返回组件 options flow handler 的实例。

```python
@staticmethod
@callback
def async_get_options_flow(
    config_entry: ConfigEntry,
) -> OptionsFlowHandler:
    """Create the options flow."""
    return OptionsFlowHandler()
```

## Flow 处理器

Flow handler 的工作原理与 config flow handler 相同，只是 flow 中的第一个 step 始终是 `async_step_init`。当前 config entry 的详细信息可通过 `self.config_entry` 属性访问。

```python
from homeassistant.config_entries import OptionsFlow

OPTIONS_SCHEMA = vol.Schema(
    {
        vol.Required("show_things"): bool,
    }
)
class OptionsFlowHandler(OptionsFlow):
    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(
                OPTIONS_SCHEMA, self.config_entry.options
            ),
        )
```

## 自动重新加载的选项流

如果集成应在 config options 更改后重新加载，它可以继承 `OptionsFlowWithReload` 而不是 `OptionsFlow`。一旦 options 更改，`OptionsFlowWithReload` 将自动重新加载集成。

由于添加 update listener 最常见的原因是当 options 更改时重新加载集成，因此 `OptionsFlowWithReload` 避免了需要该 listener。

```python
from homeassistant.config_entries import OptionsFlowWithReload

OPTIONS_SCHEMA = vol.Schema(
    {
        vol.Required("show_things"): bool,
    }
)
class MyOptionsFlow(OptionsFlowWithReload):
    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(
                OPTIONS_SCHEMA, self.config_entry.options
            ),
        )
```

## 信号更新

如果集成应在 options 更新后做出响应，你可以注册一个 update listener 到 config entry，当 entry 被更新时将调用它。通过在集成的 `__init__.py` 中的 `async_setup_entry` 函数中添加以下内容来注册 listener：

```python
entry.async_on_unload(entry.add_update_listener(update_listener))
```

使用上述方法意味着 Listener 在 entry 加载时附加，并在卸载时分离。Listener 应是一个 async 函数，其输入与 async\_setup\_entry 相同。然后可以从 `entry.options` 访问 Options。

```python
async def update_listener(hass: HomeAssistant, config_entry: ConfigEntry):
    """Handle options update."""
```
