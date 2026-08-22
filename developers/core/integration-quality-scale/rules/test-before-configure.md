import RelatedRules from './\_includes/related\_rules.jsx'

## 原因

配置流程不仅非常易于使用，还是一种让用户在配置完成后立即知道某些设置无法正常工作的有效方式。
它可以捕获以下问题：

* DNS 问题
* 防火墙问题
* 错误的凭据
* 错误的 IP 地址或端口
* 不支持的设备

一旦集成设置完成，这类问题往往很难排查，因此最好尽早捕获，避免用户被一个无法正常工作的集成困住。

由于这改善了用户体验，在配置流程中测试连接是必需的。

## 示例实现

要验证用户输入，你可以像往常一样使用数据调用你的库，并进行一次测试调用。
如果调用失败，你可以向用户返回错误信息。

在下面的示例中，如果 `client.get_data()` 调用抛出 `MyException`，用户将看到一条集成无法连接的错误信息。

`config_flow.py`:

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

## 更多资源

关于配置流程的更多信息，请参见[config flow 文档](/developers/core/integration/config_flow.md)。

## 例外

不与设备或服务建立连接的集成（例如 helpers）无需在配置流程中测试连接，免于此规则。
依赖运行时自动发现的集成（如 Google Cast）也免于此规则。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
