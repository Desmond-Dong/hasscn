---
title: 配置条目
description: '配置边界由 Home Assistant 持久配置存储的配置数据。 边界由用户通过 UI。 UI 流程由配置流处理程序(/developers/configentriesconfigflowhandler)由集成定义。 本页属于 Home Assistant 开发者文档。'
---
# 配置条目

配置边界由 Home Assistant 持久配置存储的配置数据。 边界由用户通过 UI。 UI 流程由[配置流处理程序](/developers/config_entries_config_flow_handler)由集成定义。

创建后，用户可以删除配置条目。或者，用户可以通过以下方式更改配置条目[重新配置步骤](/developers/config_entries_config_flow_handler#reconfigure)或者[选项流处理程序](/developers/config_entries_options_flow_handler)，也由集成定义。

### 配置子条目

配置条目可以在逻辑上将存储的配置数据远程子条目，用户可以通过 UI 将子条目添加到现有的配置条目。一个示例是提供警报的集成，其中配置存储条目验证的详细信息，并且应提供队列的每个位置都存储的子条目。

与配置条目类似，子条目可以选择支持重新配置步骤。

## 生命周期

|状态|描述|
| ----- | ----------- |
|未加载|配置条目尚未加载。这是创建配置条目或重新启动 Home Assistant 时的初始状态。|
|设置正在进行中|尝试加载配置条目时的中间状态。|
|已加载|配置条目已加载。|
|设置错误|尝试设置配置条目时发生错误。|
|设置重试|配置条目的依赖项尚未准备好。 Home Assistant 未来会自动重新尝试加载此配置条目。尝试之间的时间会自动增加。|
|迁移错误|配置条目必须迁移到较新的版本，但迁移失败。|
|卸载正在进行中|尝试卸载配置条目时的中间状态。|
|卸载失败|尝试卸载配置条目，但这要么不受支持，要么引发异常。|

有关显示错误和请求重试的更多信息，请参见[处理设置失败](/developers/integration_setup_failures#integrations-using-async_setup_entry).


## 设置条目

在启动过程中，Home Assistant首先调用[正常集成设置](/developers/creating_component_index),
然后为每个条目调用方法`async_setup_entry(hass, entry)`。如果有一个新的配置条目是
在运行时创建，Home Assistant 还会调用 `async_setup_entry(hass, entry)` ([示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L522)).

### 对于平台

如果集成包含平台，则需要将设置的配置条目转发到平台。这个可以
通过调用配置条目管理器上的转发函数来完成（[示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L529)):

```python
await hass.config_entries.async_forward_entry_setups(config_entry, ["light", "sensor", "switch"])
```

对于支持配置条目的平台，需要添加一个设置条目函数（[示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L522)):

```python
async def async_setup_entry(hass, config_entry, async_add_entities):
    """Set up entry."""
```

## 卸载条目

集成可以选择支持卸载配置监听。卸载则监听时，集成需要清理所有实体、取消订阅任何监听器并关闭所有连接。要实现此目的，需要 `async_unload_entry(hass, entry)` 到的添加集成中（[示例](https://github.com/home-assistant/core/blob/f18ddb628c3574bc82e21563d9ba901bd75bc8b5/homeassistant/components/hassio/__init__.py#L534)）。在调用 `async_unload_entry` 之前，配置边界的状态设置为 `ConfigEntryState.UNLOAD_IN_PROGRESS`。

对于您将配置条目转发到的每个平台，您也需要转发卸载。

```python
async def async_unload_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Unload a config entry."""
```

如果您需要清理平台中实体使用的资源，请让该实体实现[`async_will_remove_from_hass`](/developers/core/entity#async_will_remove_from_hass)方法。

## 删除条目

如果集成需要在删除税务时清理代码，则可以定义删除函数`async_remove_entry`。在调用`async_remove_entry`之前，配置删除税务报表`hass.config_entries`中删除。

```python
async def async_remove_entry(hass, entry) -> None:
    """Handle removal of an entry."""
```

## 将配置条目迁移到新版本

如果配置边境版本发生更改，则必须实现 `async_migrate_entry` 以支持旧边境的迁移。这在[配置流程文档](/developers/config_entries_config_flow_handler#config-entry-migration)

```python
async def async_migrate_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Migrate old entry."""
```

## 修改配置条目

`ConfigEntry` 对象（包括数据和选项）绝不能通过集成直接改变，而是集成必须调用 `async_update_entry`，其方式在[配置流程文档](/developers/config_entries_config_flow_handler#config-entry-migration).

## 订阅配置条目状态更改

如果您想收到有关 `ConfigEntry` 更改 `state` 的通知（例如从 `ConfigEntryState.LOADED` 更改为 `ConfigEntryState.UNLOAD_IN_PROGRESS`），添加侦听器，即可该侦听器将通知 `async_on_state_change`。此帮助器还返回一个，您调用再次回调来取消其删除监听器。因此，在登录之前您更改的订阅将是 `entry.async_on_unload(entry.async_on_state_change(notify_me))`。
