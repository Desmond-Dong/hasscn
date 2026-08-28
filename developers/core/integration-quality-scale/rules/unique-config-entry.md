import RelatedRules from './\_includes/related\_rules.jsx'

## 原因

由于通过 UI 设置集成非常简便，用户可能会意外地将同一设备或服务设置两次。
这可能导致重复的设备以及具有相同唯一标识符的实体发生冲突，从而产生负面影响。
任何发现流程也必须确保配置条目具有唯一标识性，否则就会发现已经设置过的设备。

为了防止这种情况，我们需要确保用户只能设置一次设备或服务。

## 示例实现

集成检查自己是否已经设置过通常有两种常见方式。
第一种方式是为配置条目分配 `unique_id`。
第二种方式是检查配置条目中的数据片段是否唯一。

以下示例展示了如何在配置流程中实现这些检查。

### 唯一标识符

第一种方式是为配置条目分配 `unique_id`。
该唯一 ID 在每个集成 domain 内是唯一的，因此其他集成可以使用相同的唯一 ID 而不会出现问题。
下面是一个配置流程的示例，它通过 client 获取输入配置对应的 `unique_id`，并检查该 `unique_id` 是否已经存在。
如果已存在，流程将中止并向用户显示错误信息。

`config_flow.py`:

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

### 唯一数据

第二种方式是检查配置条目中的数据片段是否唯一。
在下面的示例中，用户输入 host 和密码。
如果已经存在针对同一 host 的配置条目，流程将中止并向用户显示错误信息。

`config_flow.py`:

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

## 更多资源

关于配置流程的更多信息，请参见[config flow 文档](/developers/core/integration/config_flow.md)。
关于唯一标识符要求的更多信息，请参见[相关文档](/developers/entity_registry_index.md#unique-id-requirements)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
