import RelatedRules from './\_includes/related\_rules.jsx'

## 原因

集成应支持配置条目卸载。
这允许 Home Assistant 在运行时卸载集成，使用户能够在无需重启 Home Assistant 的情况下移除集成或重新加载它。

由于用户无需重启 Home Assistant 即可执行更多操作，这改善了用户体验。

## 示例实现

在 `async_unload_entry` 接口函数中，集成应清理所有订阅，并关闭在集成设置期间打开的所有连接。

在此示例中，我们有一个监听器，存储在配置条目的 `runtime_data` 中，我们希望对其进行清理以避免内存泄漏。

`__init__.py`:

```python showLineNumbers
async def async_unload_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Unload a config entry."""
    if (unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS))
        entry.runtime_data.listener()
    return unload_ok
```

:::info
集成可以使用 `entry.async_on_unload` 注册回调函数，这些回调函数将在配置条目卸载或设置失败时被调用。
这对于无需自己跟踪清理方法来清理资源非常有用。
注册的回调函数将在以下情况下被调用：

* `async_setup_entry` 抛出 `ConfigEntryError`、`ConfigEntryAuthFailed` 或 `ConfigEntryNotReady`
* `async_unload_entry` 成功，即返回 True 且未抛出异常。

请注意，集成始终需要实现 `async_unload_entry` 以支持配置条目卸载，仅调用 `entry.async_on_unload` 是不够的。
:::

## 更多资源

关于配置条目及其生命周期的更多信息，请参见[config entry 文档](/developers/config_entries_index.md)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
