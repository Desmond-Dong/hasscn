---
title: "支持配置项卸载"
related_rules:
  - entity-event-setup
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

集成应支持卸载配置条目（config entry）。
这样 Home Assistant 就能在运行时卸载集成，让用户无需重启 Home Assistant 也能删除或重新加载集成。

这改善了用户体验，因为用户无需重新启动 Home Assistant 即可执行更多操作。

## 实施示例

在 `async_unload_entry` 函数中，集成应清理所有订阅，并关闭设置配置条目期间打开的所有连接。

例如，如果我们把一个监听器存放在配置条目（config entry）的 `runtime_data` 中，就应在卸载时清理它，以避免内存泄漏。

ZZ保护0ZZ:
```python showLineNumbers
async def async_unload_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Unload a config entry."""
    if (unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS))
        entry.runtime_data.listener()
    return unload_ok
```

:::info
集成可以使用 `entry.async_on_unload` 注册回调；当配置条目被卸载、卸载被取消或设置失败时，这些回调会被调用。
这对于清理资源很有用，而无需自己跟踪删除方法。
在以下情况下，已注册的回调会被调用：
 - `async_setup_entry` 触发 `ConfigEntryError`、`ConfigEntryAuthFailed` 或 `ConfigEntryNotReady`
 - `async_unload_entry` 成功，即返回 True 并且不触发。

请注意，集成始终需要实现 `async_unload_entry` 来支持配置条目卸载，仅调用 `entry.async_on_unload` 并不足够。
:::

## 其他资源

有关配置条目（config entry）及其生命周期的更多信息，请参阅 [config entry documentation](/developers/config_entries_index)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
