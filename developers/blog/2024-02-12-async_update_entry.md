自 Home Assistant 2024.3 起，对 `ConfigEntry` 的修改应使用 `hass.config_entries.async_update_entry`。
直接在 `ConfigEntry` 对象上设置属性已被弃用，并将在 2024.9 及更高版本中开始失败。
直接在 `ConfigEntry` 上设置 `unique_id` 没有弃用期，因为这样做会破坏内部状态，并且会立即开始失败。

以下属性现在必须通过 `hass.config_entries.async_update_entry` 设置：

* data
* minor\_version
* options
* pref\_disable\_new\_entities
* pref\_disable\_polling
* title
* unique\_id
* version

测试必须确保在调用 `hass.config_entries.async_update_entry` 之前，通过 `entry.add_to_hass(hass)` 将 `MockConfigEntry` 对象添加到 Home Assistant 中。
