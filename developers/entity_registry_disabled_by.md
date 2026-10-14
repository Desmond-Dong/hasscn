Entity registry 跟踪所有具有 unique IDs 的 entities。对于每个 entity，registry 会跟踪影响 entity 如何与 core 交互的选项。其中之一是 `disabled_by`。

当 `disabled_by` 被设置且不为 `None` 时，当 integration 将该 entity 传递给 `async_add_entities` 时，该 entity 不会被添加到 Home Assistant 中。

## 集成架构

Integrations 需要确保当它们的 entities 被禁用时能正常工作。如果你的 integration 保存了对已创建的 entity objects 的引用，它应该只在 entity 的 lifecycle method `async_added_to_hass` 内部注册这些引用。该 lifecycle method 只有在 entity 实际被添加到 Home Assistant（即未被禁用）时才会被调用。

Entity 禁用机制适用于通过 config entry 或 configuration.yaml 中的条目提供的 entities。如果你的 integration 是通过 config entry 设置的，并且支持 [unloading](/developers/config_entries_index.md#unloading-entries)，Home Assistant 将能够在 entities 被启用/禁用后重新加载你的 integration，而无需重启即可应用更改。

## 用户编辑 entity registry

禁用 entity 的一种方式是通过 UI 由用户编辑 entity registry。在这种情况下，`disabled_by` 值将被设置为 `RegistryEntryDisabler.USER`。这只适用于已经注册的 entities。

## Integration 为新 entity registry entries 设置 disabled\_by 的默认值

作为 integration，你可以控制你的 entity 在首次注册时是否被启用。这由 `entity_registry_enabled_default` 属性控制。它默认为 `True`，这意味着 entity 将被启用。

如果该属性返回 `False`，新注册 entity 的 `disabled_by` 值将被设置为 `RegistryEntryDisabler.INTEGRATION`。

## Config entry system options 为新 entity registry entries 设置 disabled\_by 的默认值

用户还可以通过将 config entry 的 system option `disable_new_entities` 设置为 `True`，来控制与 config entry 相关的新 entities 如何被接收。这可以通过 UI 完成。

如果一个 entity 正在被注册，并且此 system option 被设置为 `True`，则 `disabled_by` 属性将被初始化为 `RegistryEntryDisabler.CONFIG_ENTRY`。

如果 `disable_new_entities` 被设置为 `True`，且 `entity_registry_enabled_default` 返回 `False`，则 `disabled_by` 值将被设置为 `RegistryEntryDisabler.INTEGRATION`。

## Integration 提供控制 disabled\_by 的选项

一些 integrations 希望为用户提供选项来控制哪些 entities 被添加到 Home Assistant。例如，Unifi integration 提供选项来启用/禁用无线和有线客户端。

Integrations 可以通过 [configuration.yaml](/developers/core/integration/yaml_configuration.md) 或使用 [Options Flow](/developers/core/integration/options_flow.md) 为用户提供选项。

如果 integration 提供了此选项，你不应该在 entity registry 中利用 disabled\_by 属性。相反，如果 entities 是通过 config options flow 禁用的，应从 device 和 entity registry 中移除它们。
