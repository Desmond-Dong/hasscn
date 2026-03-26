---
title: "使用 ConfigEntry.runtime_data 存储运行时数据"
related_rules:
  - strict-typing
  - test-before-setup
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

`ConfigEntry` 对象具有可用于存储运行时数据的 `runtime_data` 属性。
这对于存储无需持久化到配置存储、但在配置条目（config entry）生命周期内仍需使用的数据非常有用。

通过使用 `runtime_data`，我们可以为开发人员保持一致性，以一致的类型化方式存储运行时数据。
由于增加了打字，我们可以使用工具来避免打字错误。

## 实施示例

`ConfigEntry` 的类型可以通过放入 `runtime_data` 中的数据类型进行扩展。
在以下示例中，我们使用 `MyClient` 扩展 `ConfigEntry` 类型，这意味着 `runtime_data` 属性的类型将为 `MyClient`。

ZZ保护0ZZ:
```python {1,4,9} showLineNumbers
type MyIntegrationConfigEntry = ConfigEntry[MyClient]


async def async_setup_entry(hass: HomeAssistant, entry: MyIntegrationConfigEntry) -> bool:
    """Set up my integration from a config entry."""

    client = MyClient(entry.data[CONF_HOST])

    entry.runtime_data = client

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True
```

:::info
如果集成实现 `strict-typing`，则需要使用自定义类型的 `MyIntegrationConfigEntry`，并且必须始终使用。
:::

## 其他资源

有关配置条目（config entry）及其生命周期的更多信息，请参阅 [config entry documentation](/developers/config_entries_index)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
