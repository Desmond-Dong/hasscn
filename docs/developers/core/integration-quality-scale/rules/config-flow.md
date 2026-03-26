---
title: "需要能够通过界面设置集成"
related_rules:
  - test-before-configure
  - unique-config-entry
  - config-flow-test-coverage
  - discovery
  - reauthentication-flow
  - reconfiguration-flow
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

自 2018 年推出以来，配置流已经成为在 Home Assistant 中设置集成的标准方式。
它能够为不同集成提供一致的用户体验，并引导用户逐步完成设置过程。

由于配置流带来了更好的用户体验，我们希望所有集成都能通过配置流完成设置。

因为这是用户开始使用集成的入口，所以我们也应确保配置流足够友好、易于理解。
这意味着要在合适的位置使用合适的工具，在需要时验证输入，并在 `strings.json` 中通过 `data_description` 为相关输入字段提供上下文。

集成应将建立连接所需的配置存储在 `ConfigEntry.data` 中，而用户可调整的设置应存储在 `ConfigEntry.options` 中。

## 实施示例

若要在集成中使用配置流，需要在集成目录中创建 `config_flow.py` 文件，并将 `manifest.json` 中的 `config_flow` 设置为 `true`。
配置流中显示的文本则定义在 `strings.json` 文件中。

```python
class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """My config flow."""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        errors: dict[str, str] = {}
        if user_input:
            return self.async_create_entry(
                title="MyIntegration",
                data=user_input,
            )
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Required(CONF_HOST): str}),
            errors=errors,
        )
```

```json
{
  "config": {
    "step": {
      "user": {
        "data": {
          "host": "Host"
        },
        "data_description": {
          "host": "The hostname or IP address of the MyIntegration device."
        }
      }
    }
  }
}
```

## 其他资源

有关配置流的更多信息，请参阅 [config flow documentation](/developers/config_entries_config_flow_handler)。
有关配置流架构决策的更多信息，请参阅 [ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md)。

## 例外情况

[ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md) 中列出的集成不受此规则约束。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
