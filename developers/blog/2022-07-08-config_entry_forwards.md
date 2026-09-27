在 2022.8 之前，如果 config entry 加载的 platforms 中有一个尚未加载，那么 `await` config entry platforms forwards 就会导致死锁。

集成需要重构，用等待 `hass.config_entries.async_forward_entry_setups` 替换对 `hass.config_entries.async_setup_platforms` 的调用，以确保 Home Assistant 不会在 entities 和 platforms 仍在设置时意外重新加载集成。

`hass.config_entries.async_setup_platforms` 计划在 2022.12 中移除。
