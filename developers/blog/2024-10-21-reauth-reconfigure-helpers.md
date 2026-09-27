ConfigFlow 中新增了一些辅助方法，以简化 reauth 和 reconfigure flows 的管理：

* `self._get_reauth_entry()` 和 `self._get_reconfigure_entry()` 可以随时访问对应的 config entry
  * 应优先使用它们，而不是 `self.hass.config_entries.async_get_entry(self.context["entry_id"])`
  * config entry 应在需要时（局部变量，每步一次）请求，而不应作为 class 属性缓存
  * 如果 steps 与 discovery 或 user flows 共享，在访问 entry 前应检查 `self.source` 是否为 `SOURCE_REAUTH` 或 `SOURCE_RECONFIGURE`
* `self._abort_if_unique_id_mismatch` 允许你在 `unique_id` 与待重新认证或重新配置的 config entry 的 `unique_id` 不匹配时中止
  * 应在调用 `self.async_set_unique_id` 之后使用
  * 如果 steps 与 discovery 或 user flows 共享，应检查 `self.source` 是否为 `SOURCE_REAUTH` 或 `SOURCE_RECONFIGURE`
  * 其他 source 应继续使用 `self._abort_if_unique_id_configured`
* `self.async_update_reload_and_abort` 已调整，可为 reconfigure flows 更新默认消息
  * 新消息 `reconfigure_successful` 必须存在于 `strings.json` 中
* `self.async_update_reload_and_abort` 新增参数 `data_updates`，用于将数据更新与已有的数据合并
  * 优先于使用 `data` 参数，因为它降低了在 schema 更新时数据丢失的风险

更多详情请参阅 [reconfigure](/developers/core/integration/config_flow.md#reconfigure) 和 [reauthentication](/developers/core/integration/config_flow.md#reauthentication) 文档。
