现在，当集成设置 entity 的 state 时，`State` 对象总是会被更新，并且总是会触发一个事件，无论 state 或 state attribute 是否发生了变化。这是通过添加一个新的时间戳 `State.last_reported` 和一个新的事件 `state_reported` 来实现的。

`state_reported` 事件的触发量很大，使用时必须小心，以避免对系统负载产生不利影响：

* 当触发 `state_reported` 时，不会调用订阅所有事件的 event listener。
* 不允许监听所有 entity 的 `state_reported` 事件。
* 当监听 `state_reported` 时，必须使用 `event_filter` 来过滤掉其他 entity 的事件。
* 当监听 `state_reported` 时，必须设置 `run_immediately` 标志。

### 背景

Home Assistant 以前会丢弃那些 state 和 state attribute 均未发生变化的 state 写入，除非集成设置了 `force_update` 标志。这种行为使得集成很难正确地分析数值型 sensor state 的时间序列。这也意味着用户不知道某个集成是否在更新 sensor。

新的时间戳和相关事件在 architecture discussion [#1062](https://github.com/home-assistant/architecture/discussions/1062) 中进行了讨论。

### 对自定义集成的影响

以下 API 存在 breaking changes：

* `hass.bus.async_fire` 的 `time_fired` 参数现在接受 `float` 时间戳，而不是 `datetime` 对象。
* 可以传递给 `hass.bus.async_listen` 的 event filter 签名已更改。
* `Event()` 的 `time_fired: datetime | None` 参数已被替换为 `time_fired_timestamp: float | None`。
* `State()` 的参数字段列表中间新增了一个参数 `last_reported: datetime`。

更多详情请参阅 [`core PR #113511`](https://github.com/home-assistant/core/pull/113511) 和 [`core PR #113798`](https://github.com/home-assistant/core/pull/113798)。
