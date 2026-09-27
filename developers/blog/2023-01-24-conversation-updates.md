Home Assistant 2023.2 版本包含 [PR 86592](https://github.com/home-assistant/core/pull/86592) 和 [PR 86484](https://github.com/home-assistant/core/pull/86484)，其中包含对 [conversation agent](/developers/core/entity/conversation.md) API 的 breaking changes，以做未来兼容设计。

* 设置 agent 现在需要 config entry：\`conversation.async\_set\_agent(hass, config\_entry, agent).
* 取消设置 agent 现在通过新端点：\`conversation.async\_unset\_agent(hass, config\_entry)
* `AbstractConversationAgent` API 已更改：
  * 移除了所有 onboarding 逻辑
  * `async_process` 现在接收新的 `ConversationInput` 参数，参数相同。Language 现在始终被设置。
  * `async_process` 现在应始终返回 `ConversationResult`。不再允许返回 `None` 或期望为你进行错误处理。
