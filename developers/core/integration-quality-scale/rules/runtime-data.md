import RelatedRules from './\_includes/related\_rules.jsx'

## 原因

`ConfigEntry` 对象有一个 `runtime_data` 属性，可用于存储运行时数据。
这对于存储那些不需要持久化到配置文件存储、但在配置条目生命周期内所需的数据很有用。

通过使用 `runtime_data`，我们为开发者提供了一致且类型安全的方式来存储运行时数据。
由于增加了类型标注，我们可以使用工具来避免类型错误。

## 示例实现

`ConfigEntry` 的类型可以通过放入 `runtime_data` 的数据类型进行扩展。
在下面的示例中，我们使用 `MyClient` 扩展 `ConfigEntry` 类型，这意味着 `runtime_data` 属性将为 `MyClient` 类型。

`__init__.py`:

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
如果集成实现了 `strict-typing`，则必须使用自定义类型标注的 `MyIntegrationConfigEntry`，并在全局范围内使用。
:::

## 更多资源

关于配置条目及其生命周期的更多信息，请参见[config entry 文档](/developers/config_entries_index.md)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
