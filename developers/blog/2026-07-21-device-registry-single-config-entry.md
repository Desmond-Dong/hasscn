## 摘要

Device 现在由单个 config entry 拥有，并由单个（或无）config subentry 拥有。Devices 不再跨集成合并：由多个集成支持的物理设备现在由每个 config entry 一个 device 表示，而不是单个共享 device。

以前绑定到多个 config entries 的 devices，在 device registry 加载时会被拆分为每个 config entry 一个 device。Entity registry 会被更新，使 entities 指向正确的 device。

**大多数集成不直接与 device registry 交互，无需任何更改。** 与它直接交互的集成需要处理下面列出的弃用。

此实现在 core [PR #175785](https://github.com/home-assistant/core/pull/175785) 中，原因在 architecture proposal [home-assistant/architecture#1226](https://github.com/home-assistant/architecture/discussions/1226) 中有描述。这些变更将在 Home Assistant Core 2026.8 中落地。

## 背景

直到现在，由多个集成支持的物理设备会被合并为单个共享 device。这是通过以全局唯一的 connections 和 identifiers 来标识 devices 来实现的，因此例如 device tracker 和指向同一 MAC 地址的原生集成最终会落在同一个 device 上。

这导致了一些问题：

* 对于 device 信息（如名称或型号）没有单一可信来源；冲突的值被丢弃而不是保留。
* 用户获得令人困惑的体验，device page 包含来自多个集成的 entity 大杂烩。
* 存在长期 bug，修改 device 的 connections 和 identifiers 会导致多个 devices 拥有相同的 connections，违反了 device registry 的原始设计。

新行为是通过使 identifiers 和 connections 在每个 config entry 中唯一，而不是全局唯一来实现的。

## 弃用项

使用下面已弃用的功能会在运行时记录警告。除非另有说明，已弃用的功能将持续支持到 Home Assistant Core 2027.8。

### `DeviceEntry.config_entries`

已弃用，改用 `DeviceEntry.config_entry_id`。该属性作为兼容 shim 保留，返回一个包含 device 单个 config entry 的 set。

### `DeviceEntry.config_entries_subentries`

已弃用，改用 `DeviceEntry.config_entry_id` 和 `DeviceEntry.config_subentry_id`。该属性作为兼容 shim 保留。

### `DeviceEntry.primary_config_entry`

已弃用，改用 `DeviceEntry.config_entry_id`。Device 现在属于单个 config entry，这就是它的 primary config entry。

### 读取 composite device 的 config entries

`DeviceEntry.config_entries`、`DeviceEntry.config_entries_subentries` 和 `DeviceEntry.primary_config_entry` 仅对普通 devices（属于单个 config entry）弃用。当与合成的 composite device（向后兼容解析为迁移前 composite device id 返回的只读 device，见[向后兼容](#向后兼容)）交互时，它们并未弃用。此类 device 跨多个 config entries，而 `config_entry_id` 和 `config_subentry_id` 无法表示，因此这三个报告跨拆分 device 的并集的属性，仍然是读取该信息的方式。

### `DeviceInfo["via_device"]` 和 `DeviceRegistry.async_get_or_create(via_device=...)`

已弃用，改用 `via_device_id`。由于 identifiers 在每个 config entry 中唯一，一个 identifier 对不再明确指向单个 device，这就是为什么 `via_device` 被弃用。

同时传递 `via_device` 和 `via_device_id` 会引发 `HomeAssistantError`。

### `DeviceRegistry.async_update_device()` 的 config entry 参数

`add_config_entry_id`、`add_config_subentry_id`、`remove_config_entry_id` 和 `remove_config_subentry_id` 参数都已弃用。Device 属于单个 config entry 和 subentry，因此添加和移除 config entries 不再有意义；device 取而代之被移动或移除。

要将 device 移动到另一个 config entry 或 subentry，传递新的 `new_config_entry_id` 和 `new_config_subentry_id` 参数：

```py
device_registry.async_update_device(
    device.id,
    new_config_entry_id=config_entry.entry_id,
    new_config_subentry_id=subentry.subentry_id,
)
```

使用旧参数移动 device 需要集成进行多次 `async_update_device` 调用，将 device 添加到新的 config entry 和 subentry，然后从旧的移除，对于仅在相同 config entry 内更改 subentry 的 device 还有单独的情况。上面显示的单个调用取代了所有这些。此外，device registry 现在在 device 移动到已启用的 config entry 时清除 `CONFIG_ENTRY` disable，因此集成不再需要手动在移动过程中携带 `disabled_by` flag。

相关地，`async_update_device` 现在验证 `disabled_by` flag 相对于拥有 config entry 的 disabled 状态。对 disabled config entry 上的 device 设置 `disabled_by=None`，或对 enabled config entry 上的 device 设置 `disabled_by=DeviceEntryDisabler.CONFIG_ENTRY` 是不一致的；此类值现在被忽略并记录，并将在 Home Assistant Core 2027.8 中引发。

核心集成已作为示例进行了更新：[PR #176662](https://github.com/home-assistant/core/pull/176662) 中的 `openai_conversation`、[PR #176663](https://github.com/home-assistant/core/pull/176663) 中的 `scrape`、[PR #176664](https://github.com/home-assistant/core/pull/176664) 中的 `waqi` 以及 [PR #176665](https://github.com/home-assistant/core/pull/176665) 中的 `wolflink`。

要移除 device，调用 `DeviceRegistry.async_remove_device()`：

```py
device_registry.async_remove_device(device.id)
```

核心集成已在 PRs [#176669](https://github.com/home-assistant/core/pull/176669)、[#176671](https://github.com/home-assistant/core/pull/176671)、[#176672](https://github.com/home-assistant/core/pull/176672) 和 [#176673](https://github.com/home-assistant/core/pull/176673) 中更新为以这种方式移除 devices。

### `DeviceRegistry.async_get_device()`

已弃用。Identifiers 和 connections 在每个 config entry 中唯一，因此按 identifiers 或 connections 查找可以设计性地匹配多个 devices，`async_get_device` 返回的内容因此是模糊的。

当知道拥有 config entry 时，用新方法 `DeviceRegistry.async_get_device_by_identifier()` 或 `DeviceRegistry.async_get_device_by_connection()` 限定在该 config entry 范围内查找 device。每个方法接受单个 identifier 或 connection 元组加上 config entry id，因此查找不再模糊：

```py
# 之前
device = device_registry.async_get_device(identifiers={(DOMAIN, serial_number)})
# 之后
device = device_registry.async_get_device_by_identifier(
    (DOMAIN, serial_number), entry.entry_id
)
```

在 entity 内，优先使用 `self.device_entry` 而不是 registry 查找。如果你确实需要匹配某个 key 的每个 device（可能跨 config entries），使用 `DeviceRegistry.async_get_devices()`，它返回一个 list。

核心集成已迁移到新方法，`heos` 在 core [PR #176932](https://github.com/home-assistant/core/pull/176932) 中是一个示例。

在弃用期间，`async_get_device` 会如 [向后兼容](#向后兼容) 中所述解析模糊查找。注意，这种向后兼容的解析只通过 `DeviceRegistry` 的查找方法（如 `async_get()` 和 `async_get_device()`）发生；直接与 `devices` 容器交互（例如 `DeviceRegistry.devices.get(device_id)`）不会合成 composite device。

### 将 helper config entry 添加到其他集成的 device 上

Helper 集成不得将它们的 config entry 添加到 source entity 的 device 或用户选择的 device 上，它们应该将自己的 entities 链接到该 device。这是此处描述变更的直接后果：device 现在属于单个 config entry，因此 helper config entry 不能再添加到由其他集成拥有的 device 上。

这已在去年 [Updated guidelines for helper integrations linking to other integration's device](/developers/blog/2025-07-18-updated-pattern-for-helpers-linking-to-devices.md) 中宣布，并将在 Home Assistant Core 2026.8 中停止工作。

### `helpers.device.async_device_info_to_link_from_entity()` 和 `async_device_info_to_link_from_device_id()`

这两个 helper 现在总是返回 `None`。

它们返回一个携带另一个 device 的 identifiers 和 connections 的 `DeviceInfo`，这会隐式地将调用者的 config entry 添加到该 device。拥有单个 config entry 的 device 无法表示这种情况，它会静默地派生一个重复 device。

改为在 entity 的构造函数中设置 `self.device_entry` 将 helper entity 链接到 device：

```py
self.device_entry = async_entity_id_to_device(hass, source_entity_id)
```

这些 helper 将在 Home Assistant Core 2027.8 中移除。

### `helpers.helper_integration.async_handle_source_entity_changes(add_helper_config_entry_to_device=...)`

该参数不再有任何效果，应从调用中移除。

当 source entity 移动到另一个 device 时，`async_handle_source_entity_changes` 现在仅更新 helper entity 以链接到新 device，不再从旧 device 移除 helper config entry 并添加到新 device。

传递该参数在 Home Assistant Core 2027.8 之前被接受，并会记录警告。

### 清理 helper devices

用于从 config entry 迁移步骤清理 helper 集成 devices 的 helper 已在 core [PR #176714](https://github.com/home-assistant/core/pull/176714) 中从 `async_remove_helper_config_entry_from_source_device` 重命名为 `homeassistant.helpers.helper_integration.async_remove_helper_devices`。旧名称作为弃用别名保留，将持续工作到 Home Assistant Core 2027.8。新签名为：

```py
def async_remove_helper_devices(
    hass: HomeAssistant,
    *,
    helper_config_entry_id: str,
    source_device_id: str | None,
    remove_all_devices: bool = False,
    keep_device_ids: Collection[str] = (),
) -> None:
```

### `helpers.device.async_remove_stale_devices_links_keep_entity_device()` 和 `async_remove_stale_devices_links_keep_current_device()`

两者现在都是 no-ops。改为从 helper 的 `async_setup_entry` 中用 `remove_all_devices=True` 调用 `async_remove_helper_devices`：

```py
async_remove_helper_devices(
    hass,
    helper_config_entry_id=entry.entry_id,
    source_device_id=entry.options.get(CONF_DEVICE_ID),
    remove_all_devices=True,
)
```

`template` helper 已在 core [PR #176900](https://github.com/home-assistant/core/pull/176900) 中作为示例进行了迁移。这些函数将在 Home Assistant Core 2027.8 中移除。

## Devices 只能有一个 config subentry

Device 不能再绑定到多于一个 config subentry。这是一个没有向后兼容 shim 的 breaking change；将多个 subentries 附加到同一 device 的集成必须为每个 subentry 创建一个 device。

### 示例：`telegram_bot`

`telegram_bot` 集成已在 core [PR #176606](https://github.com/home-assistant/core/pull/176606) 中为此进行了调整，可以作为示例。

它以前有一个由每个 chat 共享的单个 bot device，每个 chat 的 subentry 附加到同一个 device。现在它为每个 chat 创建一个单独的 device，作为 via device 链接到 bot device。Config entry 迁移将每个 chat 的 notify entity 移动到自己的 device 上，并从 bot device 剥离 chat subentries，使 bot device 不再拥有 subentry。

注意，该 PR 是在添加 `via_device_id` 之前编写的，新代码应改用 `via_device_id` 而不是 `via_device`。

当[child devices](https://github.com/home-assistant/architecture/discussions/1414) 引入时，用 via device 建模此类结构的集成应迁移到 child devices。

## 将 entity 链接到拆分 device

迁移前的 composite device id 不再指向真实 device。尝试通过将 id 传递给 `EntityRegistry.async_get_or_create(device_id=...)` 或 `EntityRegistry.async_update_entity(device_id=...)` 将 entity 链接到此类 id，会被忽略并记录警告，而不是被应用。然后会创建一个没有 device 的新 entity，现有的 entity 保持其当前 device。传递真正不存在的 device id 仍会像以前一样引发 `ValueError`。

存储的 device 是一个没有 entity 的 config entry 所拥有的拆分的 composite device 的 entities，在 registry 加载时会被从 device 分离；拥有集成预期会将它们重新链接。

改为将 entities 链接到拆分 device 之一，用 `async_get_device_by_identifier` 或 `async_get_device_by_connection` 查找它。

## Device registry 事件

拆分迁移前的 composite device 发生在 registry 从存储加载时，在任何 listeners 运行之前，因此不会发出 `EVENT_DEVICE_REGISTRY_UPDATED` events；devices 在启动时已经拆分。

对于订阅 `EVENT_DEVICE_REGISTRY_UPDATED` 或使用 `async_track_device_registry_updated_event` 并检查 payload 的集成，有两点变更：

* `update` 事件的 `changes` dict 用 `config_entry_id` 和 `config_subentry_id` keys 报告 device 移动，取代先前的 `config_entries` 和 `config_entries_subentries`。
* 更新或移除迁移前的 composite device id 会将操作转发到每个拆分 device，因此每个拆分 device 发出一个 event，而不是为 composite id 发出单个 event。

Device 现在属于单个 config entry，因此它不能再丢失一个 config entry 同时继续存在用于另一个。以前观察 `update` 事件中 `config_entries` 或 `config_entries_subentries` keys 变更的集成（通常用于检测其 config entry 从与其他集成共享的 device 中移除），现在可能只需要处理 `remove` events：device 丢失 config entry 意味着 device 被移除。

## 向后兼容

拆分 devices 会改变自定义集成可能依赖的假设，存储在 automations 和 scripts 中的 device ids 不再作为 devices 存在。为了缓解这一点，device registry 做出最大努力尝试保持未修改的自定义集成正常工作，通过将迁移前的 composite device id 解析为它被拆分成的 devices。

这是最大努力，不是保证。Shims 无法覆盖自定义集成与 device registry 交互的每种方式，对拆分 devices 之间模糊的操作根本无法应用。对 462 个直接与 device registry 交互的自定义集成的 AI 辅助分析表明，至少 90% 预期会不受影响地工作，这也意味着有些不会。请将你的集成迁移到新 API，而不是依赖这些 shims；它们将在 Home Assistant Core 2027.8 中移除。

在弃用期间：

* `DeviceRegistry.async_get()` 在传入迁移前 composite device 的 id 时会合成一个只读恢复的 composite device。其 identifiers、connections 和 config entries 是拆分 devices 的并集。合成仅在 `async_get()` 中发生；直接与 `devices` 容器交互（例如 `DeviceRegistry.devices.get(device_id)`）不会合成 composite，对迁移前 composite device id 返回 `None`。
* `DeviceRegistry.async_get_device()` 在可能时将通过匹配多个 config entries 的 identifiers 或 connections 的查找解析为单个 device，优先选择 config entry domain 与查找的 identifier 匹配的 device。如果剩余匹配是一个迁移前 composite device 的拆分，则返回跨它们的只读 composite。对于共享 identifier 或 connection 的独立 devices，优先选择由调用集成拥有的 device，回退到第一个匹配。
* `DeviceRegistry.async_update_device()` 和 `DeviceRegistry.async_remove_device()` 将调用转发到每个拆分 device。重写 device 身份或移动它的参数在拆分 devices 之间是模糊的；它们被忽略并向违规集成报告。
* Entity registry `get_entries_for_device_id()` 和 `async_entries_for_device()` 将迁移前 composite device id 展开为它被拆分成的 devices 的 entities。
* 针对迁移前 composite device id 的 actions 级联到拆分 devices。
* 用户自定义（area、floor、labels、name）在 device 拆分时保留。

新方法 `DeviceRegistry.async_get_devices_for_composite_device_id()` 返回迁移前 composite device 被拆分成的 devices。`DeviceRegistry.async_is_composite_device_id()` 返回一个 device id 是否是迁移前 composite device id，即已被拆分为每个 config entry 一个 device 且不再指向注册 device 的 id。
