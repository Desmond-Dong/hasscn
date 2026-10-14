调用 `hass.config_entries.async_forward_entry_setup` 已被弃用，并将在 Home Assistant 2025.6 中移除。相反，请 await `hass.config_entries.async_forward_entry_setups`，因为它可以一次性加载多个 platform，并且效率更高，因为它不需要为每个 platform 单独使用一个 import executor job。

如果在 config entry 正在设置时调用 `hass.config_entries.async_forward_entry_setups`，必须始终 await 它，以确保它在 config entry 设置完成之前结束。更多详情请参阅[此博客文章](https://developers.home-assistant.io/blog/2022/07/08/config_entry_forwards)。
