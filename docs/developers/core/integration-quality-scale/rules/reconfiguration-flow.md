---
title: "集成应该有重新配置流程"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - config-flow
  - test-before-configure
  - unique-config-entry
  - config-flow-test-coverage
  - reauthentication-flow
---
# 集成应该有重新配置流程

import RelatedRules from './_includes/related_rules.jsx'

## 推理

用户可能会更改设备或服务中的某些信息，例如密码或 IP 地址。
理想情况下，Home Assistant 能捕获这些变化，并提示用户需要重新认证或采取进一步操作。
重新配置流程允许用户主动发起重新配置，在不删除并重新添加设备或服务的前提下更新其配置。

这为用户提供了更多排查问题的手段，而不必重启软件或直接进入重新认证流程。

## 实施示例

在 `config_flow.py` 中添加一个名为 `reconfigure` 的新步骤，以允许用户重新配置集成。
在下面的示例中，我们会检查新的 API 令牌是否有效。
同时还会确保用户没有尝试使用其他账户重新配置该集成，因为集成绑定的账户不应被更换。

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

## 其他资源

有关重新配置流程的更多信息，请参阅 [reconfigure flow documentation](/developers/config_entries_config_flow_handler#reconfigure)。

## 例外情况

不通过配置流设置的集成不受此规则约束。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
