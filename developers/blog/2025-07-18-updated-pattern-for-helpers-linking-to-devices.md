helper 集成不应将其自己的 config entry 添加到源 entity 的 device 或用户选择的 device。相反，它们应仅将其 entity 链接到源 entity 的 device。

将 helper config entry 添加到其他集成的 device 已不再受支持，并将在 Home Assistant Core 2026.8 中停止工作。

### 背景

架构提案 [home-assistant/architecture#1226](https://github.com/home-assistant/architecture/discussions/1226) 使 device 的连接和标识符在每个集成 domain 中唯一，而非全局唯一。这对大多数集成来说不是问题，但带 config flow 的 helper 集成是例外。

### 建议的变更

#### 将 helper entity 直接链接到源集成的 device

在 helper entity 的构造函数中，将 `self.device_entry` 设置为源 device

```py
class HelperEntity(Entity)

    def __init__(hass: HomeAssistant, source_entity_id: str, ...) -> None:
        self.device_entry = async_entity_id_to_device(
            hass,
            source_entity_id,
        )
```

#### 不要直接将 helper config entry 添加到源 device

不要将 config entry 直接添加到源 device，这意味着以下模式不再允许

```py
device_registry.async_update_device(
    source_device.id,
    add_config_entry_id=helper_config_entry.entry_id,
)
```

#### 不要隐式地将 helper config entry 添加到源 device

不要设置 `self._attr_device_info`，也不要覆盖 `device_info` 以返回另一个集成 device 的 identifiers 和 connections，因为这会导致 helper config entry 被添加到源 device。相反，应在 helper entity 中设置 `self.device_entry`，以将 helper entity 链接到其他集成的 device，如上面的示例所示。

#### 清理 device registry

提供了一个 helper 函数 `homeassistant.helpers.helper_integration.async_remove_helper_config_entry_from_source_device` 来辅助清理。核心集成已被修改为在 config entry 迁移步骤中调用此 helper。

#### 处理已移除的 device

如何处理已移除的 device 由 helper 集成自行决定；大多数核心 helper 将 `self.device_entry` 设置为 `None`。请注意，如果传入的 `device_id` 不存在，`DeviceRegistry.async_get` 会返回 `None`。

#### 示例实现

derivative 核心集成之前将其 config entry 添加到源 entity 的 device，现已更新为仅将 helper entity 链接到源 entity 的 device，见核心 [PR #148674](https://github.com/home-assistant/core/pull/148674)。

template 核心集成之前将其 config entry 添加到用户选择的 device，现已更新为仅将 helper entity 链接到用户选择的 device，见核心 [PR #148756](https://github.com/home-assistant/core/pull/148756)。
