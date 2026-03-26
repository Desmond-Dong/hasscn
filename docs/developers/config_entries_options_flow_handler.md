---
title: 选项流
---

通过配置条目设置的集成可以向用户公开选项，以便调整集成行为，例如选择要纳入的设备或位置。

配置条目的选项基于 [Data Entry Flow 框架](/developers/data_entry_flow_index)，允许用户更新配置条目的选项。要支持配置条目选项，集成需要定义一个选项流处理程序。

## 选项支持

要让集成支持选项，需要在配置流处理程序中实现 `async_get_options_flow` 方法。调用该方法时，应返回组件选项流处理程序的实例。

```python
@staticmethod
@callback
def async_get_options_flow(
    config_entry: ConfigEntry,
) -> OptionsFlowHandler:
    """Create the options flow."""
    return OptionsFlowHandler()
```

## 流程处理程序

选项流处理程序的工作方式与配置流处理程序类似，但流程的第一步始终是 `async_step_init`。当前配置条目的详细信息可通过 `self.config_entry` 属性获取。

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

如果在配置选项变更后需要重新加载集成，可以继承 `OptionsFlowWithReload`，而不是 `OptionsFlow`。一旦选项发生变化，`OptionsFlowWithReload` 会自动重新加载集成。

由于添加更新监听器最常见的原因就是在选项变化时重新加载集成，因此 `OptionsFlowWithReload` 可以避免手动注册监听器。

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

## 监听更新

如果集成需要在选项更新后执行操作，可以为配置条目注册更新监听器。该监听器会在配置条目更新时被调用。可在集成的 `__init__.py` 中，于 `async_setup_entry` 函数里添加以下代码来注册监听器。

```python
entry.async_on_unload(entry.add_update_listener(update_listener))
```

这种写法表示：监听器会在卸载时自动注销。监听器应是一个异步函数，接受与 `async_setup_entry` 相同的参数。随后即可通过 `entry.options` 访问选项。

```python
async def update_listener(hass: HomeAssistant, config_entry: ConfigEntry):
    """Handle options update."""
```
