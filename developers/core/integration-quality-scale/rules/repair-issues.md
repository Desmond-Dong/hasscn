## 原因

Repair issues 和 repair flows 是一种非常友好的方式，让用户知道出现了问题，并且他们可以对此采取行动。
Repair issues 只是告知用户问题可以自行修复，而 repair flows 则可以帮用户自动修复。

Repair issues 和 repair flows 应该是可操作的，并能提供关于问题的详细信息。
因此，我们不应该仅为了告知用户存在问题而提出 repair issue，特别是用户无法自行修复的问题。

## 示例实现

在下面的示例中，我们有一个用于本地托管服务的集成。
启动时，我们会检查是否支持正在运行的服务版本。
如果不支持，我们会提出一个 repair issue，告知用户在能够再次使用集成之前，应该先更新服务。

`__init__.py`

```python {6-14} showLineNumbers
async def async_setup_entry(hass: HomeAssistant, entry: MyConfigEntry) -> None:
    """Set up the integration from a config entry."""
    client = MyClient(entry.data[CONF_HOST])
    version = await client.get_version()
    if version < MINIMUM_VERSION:
        ir.async_create_issue(
            hass,
            DOMAIN,
            "outdated_version",
            is_fixable=False,
            issue_domain=DOMAIN,
            severity=ir.IssueSeverity.ERROR,
            translation_key="outdated_version",
        )
        raise ConfigEntryError(
            "Version of MyService is %s, which is lower than minimum version %s",
            version,
            MINIMUM_VERSION,
        )
```

## 更多资源

关于 repair issues 和 repair flows 的更多信息，请参见[repairs 文档](/developers/core/platform/repairs.md)。

## 例外

本规则没有例外。
