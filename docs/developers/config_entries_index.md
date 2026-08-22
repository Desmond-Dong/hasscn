---
title: "配置条目"
---

配置条目（Config entries）是由 Home Assistant 持久存储的配置数据。配置条目由用户通过 UI 创建。UI 流程由集成定义的 [config flow handler](core/integration/config_flow.md) 驱动。

创建后，用户可以删除配置条目。此外，用户还可以通过集成定义的 [reconfigure step](core/integration/config_flow.md#reconfigure) 或 [options flow handler](core/integration/options_flow.md) 修改配置条目。

### 配置子条目

配置条目可以将存储的配置数据逻辑地分离为子条目，用户可以通过 UI 将子条目添加到现有配置条目中。例如，一个提供天气预报的集成，配置条目存储认证信息，每个需要预报天气的位置则作为子条目存储。

与配置条目类似，子条目可以选择性地支持 reconfigure step。

## 生命周期

| 状态 | 描述 |
| ----- | ----------- |
| not loaded | 配置条目尚未加载。这是创建配置条目或重启 Home Assistant 时的初始状态。 |
| setup in progress | 尝试加载配置条目时的中间状态。 |
| loaded | 配置条目已加载。 |
| setup error | 尝试设置配置条目时发生错误。 |
| setup retry | 配置条目的依赖项尚未就绪。Home Assistant 将在未来自动重试加载此配置条目。重试间隔将自动增加。 |
| migration error | 配置条目必须迁移到较新版本，但迁移失败。 |
| unload in progress | 尝试卸载配置条目时的中间状态。 |
| failed unload | 尝试卸载配置条目但失败，可能是因为不支持卸载或抛出了异常。 |

更多关于如何暴露错误和请求重试的信息，参见 [Handling Setup Failures](integration_setup_failures.md#integrations-using-async_setup_entry)。

## 设置条目

启动时，Home Assistant 首先调用[普通集成 setup](/developers/creating_component_index)，
然后对每个条目调用方法 `async_setup_entry(hass, entry)`。如果在运行时创建了新的 Config Entry，Home Assistant 也会调用 `async_setup_entry(hass, entry)` ([示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L522))。

### 对于 platforms

如果集成包含 platforms，它需要将 Config Entry 的设置转发给 platform。这可以通过在 config entry manager 上调用转发函数来完成（[示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L529)）：

```python
await hass.config_entries.async_forward_entry_setups(config_entry, ["light", "sensor", "switch"])
```

Platform 要支持 config entries，需要添加 setup entry 函数（[示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L522)）：

```python
async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: MyConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up entry."""
```

## 卸载条目

集成可以选择性地支持卸载配置条目。卸载条目时，集成需要清理所有 entity、取消订阅任何事件监听器并关闭所有连接。要实现这一点，在集成中添加 `async_unload_entry(hass, entry)`（[示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L534)）。在调用 `async_unload_entry` 之前，配置条目的状态被设置为 `ConfigEntryState.UNLOAD_IN_PROGRESS`。

对于每个你转发了配置条目的 platform，也需要转发卸载操作。

```python
async def async_unload_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Unload a config entry."""
```

如果你需要在 platform 中清理 entity 使用的资源，让 entity 实现 [`async_will_remove_from_hass`](core/entity.md#async_will_remove_from_hass) 方法。

## 删除条目

如果集成需要在条目被删除时清理代码，可以定义删除函数 `async_remove_entry`。在调用 `async_remove_entry` 之前，配置条目已从 `hass.config_entries` 中删除。

```python
async def async_remove_entry(hass: HomeAssistant, entry: MyConfigEntry) -> None:
    """Handle removal of an entry."""
```

## 将配置条目迁移到新版本

如果配置条目的版本发生变化，必须实现 `async_migrate_entry` 以支持旧条目的迁移。详细内容见 [config flow 文档](/developers/core/integration/config_flow#config-entry-migration)。

```python
async def async_migrate_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Migrate old entry."""
```

## 修改配置条目

`ConfigEntry` 对象（包括 data 和 options）绝不应被集成直接修改，集成必须调用 `async_update_entry`，其用法在 [config flow 文档](/developers/core/integration/config_flow#config-entry-migration) 中有示例说明。

## 订阅配置条目状态变更

如果你希望收到 `ConfigEntry` 的 `state` 变更通知（例如，从 `ConfigEntryState.LOADED` 变为 `ConfigEntryState.UNLOAD_IN_PROGRESS`），可以添加一个监听器，该监听器会在 `async_on_state_change` 中被通知。此辅助方法还返回一个回调，你可以调用它以再次移除监听器。因此，订阅变更直到条目卸载的写法为 `entry.async_on_unload(entry.async_on_state_change(notify_me))`。
