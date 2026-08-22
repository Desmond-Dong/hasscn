---
title: "集成应具备重新配置流程"
sidebar_label: 🥇 reconfiguration-flow
related_rules:
  - config-flow
  - test-before-configure
  - unique-config-entry
  - config-flow-test-coverage
  - reauthentication-flow
---
import RelatedRules from './_includes/related_rules.jsx'

## 原因

用户可能会更改设备或服务的某些设置，例如修改密码或更改 IP 地址。
理想情况下，Home Assistant 能检测到这些事件并通知用户需要进行重新身份验证或关注。
重新配置流程让用户能够主动触发重新配置，从而更新设备或服务的配置，而无需删除并重新添加设备或服务。

这为用户提供了更多尝试修复问题的方式，无需重启软件或触发重新身份验证。

## 示例实现

在 `config_flow.py` 文件中，添加一个名为 `reconfigure` 的新步骤，允许用户重新配置集成。
在以下示例中，我们检查新的 api token 是否有效。
同时，我们会确认用户是否试图用不同的账户重新配置集成，因为集成使用的账户不应改变。

`config_flow.py`:
```python {4-31} showLineNumbers
class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """My config flow."""

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle reconfiguration of the integration."""
        errors: dict[str, str] = {}
        if user_input:
            client = MyClient(user_input[CONF_HOST], user_input[CONF_API_TOKEN])
            try:
                user_id = await client.check_connection()
            except MyException as exception:
                errors["base"] = "cannot_connect"
            else:
                await self.async_set_unique_id(user_id)
                self._abort_if_unique_id_mismatch(reason="wrong_account")
                return self.async_update_reload_and_abort(
                    self._get_reconfigure_entry(),
                    data_updates=user_input,
                )
        return self.async_show_form(
            step_id="reconfigure",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_HOST): TextSelector(),
                    vol.Required(CONF_API_TOKEN): TextSelector(),
                }
            ),
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

关于重新配置流程的更多信息，请参见[重新配置流程文档](/developers/core/integration/config_flow#reconfigure)。

## 例外

配置流程中没有设置项的集成免于此规则。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
