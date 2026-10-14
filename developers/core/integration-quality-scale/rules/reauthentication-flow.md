import RelatedRules from './\_includes/related\_rules.jsx'

## 原因

用户可能会更改设备或服务密码，却忘记设备或账户仍然与 Home Assistant 关联。
为了避免用户必须删除配置条目并重新添加，我们会启动重新身份验证流程。
在此流程中，用户可以提供新的凭据以供后续使用。

这是一种非常友好的方式，让用户知道他们需要采取行动并更新凭据。

## 示例实现

在下面的示例中，我们展示了一个身份验证流程，允许用户使用新的 API token 重新验证身份。
当我们收到新 token 时，会检查是否能够连接到服务，以避免用户输入无效的 token。
如果连接成功，我们将使用新 token 更新配置条目。

`config_flow.py`:

```python {6-11,13-35} showLineNumbers
class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """My config flow."""

    host: str

    async def async_step_reauth(
        self, entry_data: Mapping[str, Any]
    ) -> ConfigFlowResult:
        """Perform reauthentication upon an API authentication error."""
        self.host = entry_data[CONF_HOST]
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Confirm reauthentication dialog."""
        errors: dict[str, str] = {}
        if user_input:
            client = MyClient(self.host, user_input[CONF_API_TOKEN])
            try:
                user_id = await client.check_connection()
            except MyException as exception:
                errors["base"] = "cannot_connect"
            else:
                await self.async_set_unique_id(user_id)
                self._abort_if_unique_id_mismatch(reason="wrong_account")
                return self.async_update_reload_and_abort(
                    self._get_reauth_entry(),
                    data_updates={CONF_API_TOKEN: user_input[CONF_API_TOKEN]},
                )
        return self.async_show_form(
            step_id="reauth_confirm",
            data_schema=vol.Schema({vol.Required(CONF_API_TOKEN): TextSelector()}),
            errors=errors,
        )

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        errors: dict[str, str] = {}
        if user_input:
            client = MyClient(user_input[CONF_HOST], user_input[CONF_API_TOKEN])
            try:
                user_id = await client.check_connection()
            except MyException as exception:
                errors["base"] = "cannot_connect"
            else:
                await self.async_set_unique_id(user_id)
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title="MyIntegration",
                    data=user_input,
                )
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_HOST): TextSelector(),
                    vol.Required(CONF_API_TOKEN): TextSelector(),
                }
            ),
            errors=errors,
        )
```

## 更多资源

关于处理过期凭据的更多信息，请查阅[相关文档](/developers/integration_setup_failures.md#handling-expired-credentials)。

## 例外

如果集成不需要任何身份验证，本规则不适用。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
