# 监听事件

当 Home Assistant 内部发生特定事件时，您的 集成 可能需要采取行动。 Home Assistant 提供事件助手来侦听特定事件类型并直接访问事件总线。这些助手经过高度优化，可最大程度地减少回调次数。如果您需要侦听的特定事件已经有一个帮助程序，那么最好使用该帮助程序而不是直接侦听事件总线。

## 可用的事件助手

事件助手在 `homeassistant.helpers.event` 命名空间中可用。这些函数返回一个取消侦听器的可调用函数。

以下函数的同步版本也可用，无需 `async_` 前缀。

### 示例

```python
unsub = async_track_state_change_event(hass, entity_ids, state_automation_listener)
unsub()
```

### 跟踪实体状态变化

|功能| Use case
| ------------------------------------ | --------------------------------------------------------------------------
|`async_track_state_change`| Track specific state changes
|`async_track_state_change_event`| Track specific state change events indexed by entity\_id
|`async_track_state_added_domain`| Track state change events when an entity is added to domains
|`async_track_state_removed_domain`| Track state change events when an entity is removed from domains
|`async_track_state_change_filtered`| Track state changes with a TrackStates filter that can be updated
|`async_track_same_state`| Track the state of entities for a period and run an action

### 跟踪模板更改

|功能| Use case
| ------------------------------------ | --------------------------------------------------------------------------
|`async_track_template`| Add a listener that fires when a template evaluates to 'true'
|`async_track_template_result`| Add a listener that fires when the result of a template changes

### 跟踪实体注册表更改

|功能| Use case
| ------------------------------------------- | --------------------------------------------------------------------------
|`async_track_entity_registry_updated_event`| Track specific entity registry updated events indexed by entity\_id

### 跟踪时间变化

|功能| Use case
| ------------------------------------------- | --------------------------------------------------------------------------
|`async_track_point_in_time`| Add a listener that fires once after a specific point in time
|`async_track_point_in_utc_time`| Add a listener that fires once after a specific point in UTC time
|`async_call_later`| Add a listener that is called with a delay
|`async_track_time_interval`| Add a listener that fires repetitively at every timedelta interval
|`async_track_utc_time_change`| Add a listener that will fire if time matches a pattern
|`async_track_time_change`| Add a listener that will fire if local time matches a pattern

### 追踪太阳

|功能| Use case
| ------------------------------------------- | --------------------------------------------------------------------------
|`async_track_sunrise`| Add a listener that will fire a specified offset from sunrise daily
|`async_track_sunset`| Add a listener that will fire a specified offset from sunset daily

## 直接监听事件总线

有两个函数可用于创建侦听器。这两个函数都返回一个可取消侦听器的可调用函数。

* `async_listen_once` - 监听该事件一次，不再触发
* `async_listen` - 收听直至取消

使用 `async_listen` 的情况很少见，因为 `EVENT_HOMEASSISTANT_START`、`EVENT_HOMEASSISTANT_STARTED` 和 `EVENT_HOMEASSISTANT_STOP` 每次运行仅触发一次。

### 异步上下文

```python
cancel = hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, disconnect_service)
cancel()
```

```python
cancel = hass.bus.async_listen(EVENT_STATE_CHANGED, forward_event)
cancel()
```

### 同步上下文

```python
cancel = hass.bus.listen_once(EVENT_HOMEASSISTANT_STOP, disconnect_service)
cancel()
```

```python
cancel = hass.bus.listen(EVENT_STATE_CHANGED, forward_event)
cancel()
```

### 常见事件

以下事件通常是直接监听的。

|活动名称| Description
| --------------------------------- | --------------------------------------------------------------------------
|`EVENT_HOMEASSISTANT_START`| Completed the setup and entered the start phase
|`EVENT_HOMEASSISTANT_STARTED`| Completed the start phase, and all integrations have had a chance to load; Mostly used by voice assistants and integrations that export states to external services
|`EVENT_HOMEASSISTANT_STOP`| Entered the stop phase

### 其他活动

除非 集成 是 Core 的一部分，否则很少直接监听这些事件。通常有一个可用的帮助程序来使用这些事件，在这种情况下，不应直接侦听它们。

|活动名称|描述| Preferred helper
| --------------------------------- | -------------------------------------------- | ----------------------------
|`EVENT_HOMEASSISTANT_FINAL_WRITE`|将数据写入磁盘的最后机会|
|`EVENT_HOMEASSISTANT_CLOSE`|拆解|
|`EVENT_COMPONENT_LOADED`|集成 已完成加载| `homeassistant.helpers.start.async_at_start`
|`EVENT_SERVICE_REGISTERED`|已注册新服务|
|`EVENT_SERVICE_REMOVED`|服务已被删除|
|`EVENT_CALL_SERVICE`|已调用服务|
|`EVENT_STATE_CHANGED`|实体 的状态已更改| [Tracking entity state changes](#tracking-entity-state-changes)
|`EVENT_THEMES_UPDATED`|主题已更新|
|`EVENT_CORE_CONFIG_UPDATE`|Core配置已更新|
|`EVENT_ENTITY_REGISTRY_UPDATED`|实体注册表已更新| [Tracking entity registry changes](#tracking-entity-registry-changes)
