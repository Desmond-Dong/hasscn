从 Home Assistant Core 2024.4 起，config entry 现在可以通过在其 config flow 中添加 `reconfigure` 步骤来进行重新配置。

这并非为了替代可选配置（`OptionsFlow`），而是允许用户在创建 config entry 之后更改设置配置。

### Reconfiguration 与 Reauthentication

`reconfigure` 步骤并不会替代 `reauth` 步骤，它们有不同的目的。

Reauthentication 应该在登录/token/等无效的情况下由集成自动启动，以便用户有机会调整这些设置。

Reconfiguration 由用户从 config entry 的选项菜单启动，应实现用于更新集成正常工作所必需的、非可选的 config entry 数据。认证问题通过 re-authentication flow 处理。（[查看 reauthentication](/developers/core/integration/config_flow.md#reauthentication)）。

### 示例

示例包括：在搬家或拥有移动房屋时更改 `WeatherEntity` 的纬度和经度、更改本地设备的通信端口等。

要实现 `reconfigure` 步骤，请在您的 config flow 中将其包含如下：

```python
import voluptuous as vol

class ExampleConfigFlow(ConfigFlow, domain=DOMAIN):
    """Example 集成的 config flow。"""

    async def async_step_reconfigure(self, user_input: dict[str, Any] | None = None):
        """添加 reconfigure 步骤以允许重新配置 config entry。"""
        if user_input is not None:
            pass  # TODO: 处理用户输入

        return self.async_show_form(
            step_id="reconfigure",
            data_schema=vol.Schema({vol.Required("password"): str}),
        )
```
