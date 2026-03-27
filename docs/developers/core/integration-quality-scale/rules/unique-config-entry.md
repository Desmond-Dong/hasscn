---
title: "不允许同一设备或服务设置两次"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - config-flow
  - test-before-configure
  - config-flow-test-coverage
  - discovery
  - reauthentication-flow
  - reconfiguration-flow
---
# 不允许同一设备或服务设置两次

import RelatedRules from './_includes/related_rules.jsx'

## 推理

由于使用 UI 可以轻松设置集成，因此用户可能会意外地将同一设备或服务设置两次。
这可能会导致具有唯一标识符的重复设备和实体发生冲突，从而产生负面影响。
任何发现流程还必须确保配置条目是唯一可识别的，否则它会发现已设置的设备。

为了防止这种情况，我们需要确保用户只能设置一次设备或服务。

## 实施示例

集成有两种常见的方法来检查它是否已经设置。
第一种方法是将 `unique_id` 分配给配置条目。
第二种方法是检查配置条目中的数据是否唯一。

以下示例展示了如何在配置流程中实现这些检查。

### 唯一标识符

第一种方法是将 `unique_id` 分配给配置条目。
此唯一 ID 对于每个集成域都是唯一的，因此另一个集成可以毫无问题地使用相同的唯一 ID。
下面是一个配置流程示例，该流程获取客户端输入的配置的 `unique_id` 并检查 `unique_id` 是否已存在。
如果是这样，流程将中止并向用户显示错误消息。

ZZ保护0ZZ:
```python {16-17} showLineNumbers
    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        errors: dict[str, str] = {}
        if user_input:
            client = MyClient(user_input[CONF_HOST])
            try:
                identifier = await client.get_identifier()
            except MyException:
                errors["base"] = "cannot_connect"
            except Exception:  # noqa: BLE001
                LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"
            else:
                await self.async_set_unique_id(identifier)
                self._abort_if_unique_id_configured()
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

### 独特的数据

第二种方法是检查配置条目中的数据是否唯一。
在以下示例中，用户填写主机和密码。
如果同一主机已存在配置条目，流程将中止并向用户显示错误消息。

ZZ保护0ZZ:
```python
    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        errors: dict[str, str] = {}
        if user_input:
            self._async_abort_entries_match({CONF_HOST: user_input[CONF_HOST]})
            client = MyClient(user_input[CONF_HOST], user_input[CONF_PASSWORD])
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
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_HOST): TextSelector(),
                    vol.Required(CONF_PASSWORD): TextSelector(),
                }
            ),
            errors=errors,
        )
```


## 其他资源

有关配置流的更多信息可以在 [config flow documentation](/developers/config_entries_config_flow_handler) 中找到。
有关唯一标识符要求的更多信息，请参阅[实体注册表文档](/developers/entity_registry_index)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
