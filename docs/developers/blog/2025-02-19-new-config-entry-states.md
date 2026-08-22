---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Config entry state 转换已更改"
---

在卸载和移除 entries 时的 config entry state 转换已被修改：

- 新增了一个状态 `ConfigEntryState.UNLOAD_IN_PROGRESS`，在调用集成的 `async_unload_entry` 之前设置<br />
  原因：
    - 使编写在最后一条 config entry 卸载之后应运行的清理代码变得更简单
    - 改善与 config entries 的 reload 和 unload 相关的问题的调试

- 当集成的 `async_unload_entry` 返回 False 时，config entry state 将被设置为 `ConfigEntryState.FAILED_UNLOAD`<br />
  原因：
    - 如果 `async_unload_entry` 返回 `False`，我们不能假设集成仍处于已加载状态，很可能它已经部分卸载了自身，尤其是考虑到这是我们推荐的模式：
  ```py
  async def async_unload_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Unload a config entry."""
    # async_unload_platforms 在至少有一个 platform 未卸载时返回 False
    if (unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS)):
        entry.runtime_data.listener()
    # 完成与 platforms 无关的清理
    return unload_ok
    ```

- 在调用集成的 `async_remove_entry` 之前，config entry 会从 `hass.config_entries` 中移除<br />
  原因：
    - 使编写在最后一条 config entry 移除之后应运行的清理代码变得更简单

自定义集成作者需要检查并在必要时更新他们的集成的 `async_unload_entry` 和 `async_remove_entry`。
最常见的需要更新的模式如下：

```python
async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    loaded_entries = [
        entry
        for entry in hass.config_entries.async_entries(DOMAIN)
        if entry.state is ConfigEntryState.LOADED
    ]
    if len(loaded_entries) == 1:
        # 最后一条 config entry 正在卸载，释放共享资源、注销 services 等。
        ...
```

如果自定义集成的最低 Home Assistant 版本设置为 2025.3.0，现在可以简化为：
```python
async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    if not hass.config_entries.async_loaded_entries(DOMAIN):
        # 最后一条 config entry 正在卸载，释放共享资源、注销 services 等。
        ...
```


如果自定义集成需要与早期版本的 Home Assistant Core 保持向后兼容：
```python
async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    other_loaded_entries = [
        _entry
        for _entry in hass.config_entries.async_loaded_entries(DOMAIN)
        if _entry.entry_id != entry.entry_id
    ]
    if not other_loaded_entries:
        # 最后一条 config entry 正在卸载，释放共享资源、注销 services 等。
        ...
```

更多背景信息请参阅 [config entry 文档](/developers/config_entries_index) 以及 [home assistant core PR #138522](https://github.com/home-assistant/core/pull/138522)。