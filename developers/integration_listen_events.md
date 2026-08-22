你的 integration 可能需要对 Home Assistant 内部发生的特定事件采取行动。Home Assistant 提供了 event helpers 来监听特定的 event 类型，并且可以直接访问 event bus。这些 helpers 经过高度优化，以尽量减少回调数量。如果你需要监听的事件已经有对应的 helper，那么优先使用 helper 而不是直接监听 event bus。

## 可用的 event helpers

Event helpers 位于 `homeassistant.helpers.event` 命名空间中。这些函数返回一个用于取消 listener 的 callable。

这些函数中许多也有不带 `async_` 前缀的同步版本。

### 示例

```python
unsub = async_track_state_change_event(hass, entity_ids, state_automation_listener)
unsub()
```

### 跟踪 entity state 变更

| Function                             | Use case
| ------------------------------------ | --------------------------------------------------------------------------
| `async_track_state_change`           | 跟踪特定的 state 变更（已弃用，请使用 `async_track_state_change_event`）
| `async_track_state_change_event`     | 跟踪以 entity\_id 索引的特定 state 变更 events
| `async_track_state_added_domain`     | 跟踪当 entity 被添加到 domains 时的 state 变更 events
| `async_track_state_removed_domain`   | 跟踪当 entity 从 domains 中移除时的 state 变更 events
| `async_track_state_change_filtered`  | 跟踪带有 TrackStates filter 的 state 变更，该 filter 可以更新
| `async_track_same_state`             | 跟踪 entities 的 state 持续一段时间并执行 action

### 跟踪 template 变更

| Function                             | Use case
| ------------------------------------ | --------------------------------------------------------------------------
| `async_track_template`               | 添加一个 listener，当 template 求值为 'true' 时触发
| `async_track_template_result`        | 添加一个 listener，当 template 的结果发生变化时触发

### 跟踪 entity registry 变更

| Function                                    | Use case
| ------------------------------------------- | --------------------------------------------------------------------------
| `async_track_entity_registry_updated_event` | 跟踪以 entity\_id 索引的特定 entity registry 更新 events

### 跟踪时间变更

| Function                                    | Use case
| ------------------------------------------- | --------------------------------------------------------------------------
| `async_track_point_in_time`                 | 添加一个 listener，在特定时间点之后触发一次
| `async_track_point_in_utc_time`             | 添加一个 listener，在特定 UTC 时间点之后触发一次
| `async_call_later`                          | 添加一个带有延迟调用的 listener
| `async_track_time_interval`                 | 添加一个 listener，在每个 timedelta 间隔重复触发
| `async_track_utc_time_change`               | 添加一个 listener，当时间与某模式匹配时触发
| `async_track_time_change`                   | 添加一个 listener，当本地时间与某模式匹配时触发

### 跟踪太阳

| Function                                    | Use case
| ------------------------------------------- | --------------------------------------------------------------------------
| `async_track_sunrise`                       | 添加一个 listener，每天在 sunrise 之后指定偏移量触发
| `async_track_sunset`                        | 添加一个 listener，每天在 sunset 之后指定偏移量触发

## 直接监听 event bus

有两个函数可用于创建 listeners。这两个函数都返回一个取消 listener 的 callable。

* `async_listen_once` — 监听一次该 event，之后不再触发
* `async_listen` — 持续监听直到被取消

`async_listen` 很少被使用，因为 `EVENT_HOMEASSISTANT_START`、`EVENT_HOMEASSISTANT_STARTED` 和 `EVENT_HOMEASSISTANT_STOP` 每次运行只触发一次。

### Async context

```python
cancel = hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, disconnect_service)
cancel()
```

```python
cancel = hass.bus.async_listen(EVENT_STATE_CHANGED, forward_event)
cancel()
```

### Sync context

```python
cancel = hass.bus.listen_once(EVENT_HOMEASSISTANT_STOP, disconnect_service)
cancel()
```

```python
cancel = hass.bus.listen(EVENT_STATE_CHANGED, forward_event)
cancel()
```

### 常见 events

以下 events 通常被直接监听。

| Event Name                        | Description
| --------------------------------- | --------------------------------------------------------------------------
| `EVENT_HOMEASSISTANT_START`       | 已完成 setup 并进入 start 阶段
| `EVENT_HOMEASSISTANT_STARTED`     | 已完成 start 阶段，且所有 integrations 都获得了加载的机会；主要用于 voice assistants 以及将 states 导出到外部服务的 integrations
| `EVENT_HOMEASSISTANT_STOP`        | 已进入 stop 阶段

### 其他 events

这些 events 很少被直接监听，除非该 integration 属于 core。通常会有消耗这些 events 的 helper 可用，此时不应直接监听。

| Event Name                        | Description                                  | Preferred helper
| --------------------------------- | -------------------------------------------- | ----------------------------
| `EVENT_HOMEASSISTANT_FINAL_WRITE` | 最后一次将 data 写入磁盘的机会               |
| `EVENT_HOMEASSISTANT_CLOSE`       | 拆除（Teardown）                             |
| `EVENT_COMPONENT_LOADED`          | 一个 integration 已完成加载                  | `homeassistant.helpers.start.async_at_start`
| `EVENT_SERVICE_REGISTERED`        | 注册了一个新的 service                       |
| `EVENT_SERVICE_REMOVED`           | 移除了一个 service                           |
| `EVENT_CALL_SERVICE`              | 调用了一个 service                           |
| `EVENT_STATE_CHANGED`             | 一个 entity 的 state 发生了变化              | [跟踪 entity state 变更](#tracking-entity-state-changes)
| `EVENT_THEMES_UPDATED`            | Themes 已更新                                |
| `EVENT_CORE_CONFIG_UPDATE`        | Core configuration 已更新                    |
| `EVENT_ENTITY_REGISTRY_UPDATED`   | Entity registry 已更新                       | [跟踪 entity registry 变更](#tracking-entity-registry-changes)
