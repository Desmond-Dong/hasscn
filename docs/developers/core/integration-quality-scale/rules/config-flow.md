---
title: "集成需要能够通过 UI 设置"
sidebar_label: 🥉 config-flow
related_rules:
  - test-before-configure
  - unique-config-entry
  - config-flow-test-coverage
  - discovery
  - reauthentication-flow
  - reconfiguration-flow
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

自 2018 年推出以来，config flow 已成为在 Home Assistant 中设置集成的标准方式。
它们在各个集成中提供一致的用户体验，并提供一种引导用户完成设置过程的方式。

由于更好的用户体验，我们希望确保所有集成都能通过 config flow 设置。

由于这是用户开始使用集成的入口点，我们应该确保 config flow 非常用户友好且易于理解。
这意味着我们应该在合适的位置使用合适的 selectors，在需要的地方验证输入，并在 `strings.json` 中使用 `data_description` 来提供有关输入字段的上下文。

集成应将所有配置存储在 `ConfigEntry.data` 字段中，而所有连接不需要的设置应存储在 `ConfigEntry.options` 字段中。

## 示例实现

要在集成中使用 config flow，你需要在集成文件夹中创建一个 `config_flow.py` 文件，并在 `manifest.json` 中将 `config_flow` 设置为 `true`。
config flow 中显示的文本在 `strings.json` 文件中定义。

`config_flow.py`:
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

`strings.json`:
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

## 附加资源

有关 config flows 的更多信息，请参阅[config flow 文档](/developers/core/integration/config_flow)。
有关 config flows 架构决策的更多信息，请参阅 [ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md)

## 例外

在 [ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md) 中豁免的集成不适用于此规则。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>