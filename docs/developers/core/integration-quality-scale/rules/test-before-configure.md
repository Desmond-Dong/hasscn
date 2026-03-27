---
title: "在配置流程中测试连接"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - config-flow
  - unique-config-entry
  - config-flow-test-coverage
  - discovery
  - reauthentication-flow
  - reconfiguration-flow
---
# 在配置流程中测试连接

import RelatedRules from './_includes/related_rules.jsx'

## 推理

除了非常易于使用之外，配置流也是让用户知道配置完成后某些功能将无法正常工作的好方法。
这可以捕获以下问题:
- DNS问题
- 防火墙问题
- 凭证错误
- IP 地址或端口错误
- 不支持的设备

一旦设置了集成，此类问题通常很难调试，因此最好尽早发现它们，这样用户就不会陷入无法正常工作的集成。

由于这改善了用户体验，因此需要在配置流程中测试连接。

## 实施示例

要验证用户输入，您可以像平常一样使用数据调用库并进行测试调用。
如果调用失败，您可以向用户返回错误消息。

在以下示例中，如果 `client.get_data()` 调用引发 `MyException`，用户将看到集成无法连接的错误消息。

ZZ保护0ZZ:
```python {10-17} showLineNumbers
class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """My config flow."""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        errors: dict[str, str] = {}
        if user_input:
            client = MyClient(user_input[CONF_HOST])
            try:
                await client.get_data()
            except MyException:
                errors["base"] = "cannot_connect"
            except Exception:  # noqa: BLE001
                LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"
            else:
                return self.async_create_entry(
                    title="MyIntegration",
                    data=user_input,
                )
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Required(CONF_HOST): TextSelector()}),
            errors=errors,
        )
```

## 其他资源

有关配置流的更多信息可以在 [config flow documentation](/developers/config_entries_config_flow_handler) 中找到。

## 例外情况

没有与设备或服务的连接（例如助手）的集成不需要在配置流中测试连接，并且不受此规则的约束。
依赖于运行时自动发现的集成（如 Google Cast）也不受此规则的约束。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>