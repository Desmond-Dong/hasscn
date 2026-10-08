需要使用 Bluetooth 适配器的集成应在 [`manifest.json`](/developers/creating_integration_manifest.md) 的 [`dependencies`](/developers/creating_integration_manifest.md#dependencies) 中添加 `bluetooth_adapters`。[`manifest.json`](/developers/creating_integration_manifest.md) 条目确保在集成尝试使用所有受支持的远程适配器之前，它们已连接。这取代了在 [`dependencies`](/developers/creating_integration_manifest.md#dependencies) 中添加 `bluetooth` 的需求。

提供 Bluetooth 适配器的集成应在 [`manifest.json`](/developers/creating_integration_manifest.md) 的 [`dependencies`](/developers/creating_integration_manifest.md#dependencies) 中添加 `bluetooth`，并添加到 `bluetooth_adapters` 集成的 [`after_dependencies`](/developers/creating_integration_manifest.md#after-dependencies) 中。

在构建新的 Bluetooth 集成时，请务必查阅 [集成作者的 Best Practices](/developers/bluetooth.md#best-practices-for-integration-authors)。
