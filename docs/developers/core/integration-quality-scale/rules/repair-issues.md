---
title: "当需要用户干预时使用修复问题和修复流程"
---

## 推理

修复问题和修复流程是一种非常用户友好的方式，可以让用户知道出现了问题并且可以采取措施。
修复问题只是让用户知道他们可以自行修复问题的一种方式，而修复流程可以为他们修复问题。

修复问题和修复流程应该是可操作的并且提供有关问题的信息。
因此，我们不应该仅仅让用户知道出现问题而他们无法自行修复而提出修复问题。

## 实施示例

在下面的示例中，我们集成了本地托管服务。
启动时，我们检查是否支持正在运行的服务版本。
如果不这样做，我们会提出修复问题，让用户知道他们应该更新其服务，然后才能再次使用集成。

ZZ保护0ZZ
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

## 其他资源

有关修复问题和修复流程的更多信息，请参阅 [repairs](/developers/core/platform/repairs) 文档。

## 例外情况

这条规则没有例外。