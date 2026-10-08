Home Assistant 的 MQTT 集成处理 MQTT 消息的方式，以及 subscribe 和 unsubscribe 的执行方式已发生变更。

### MQTT subscribe 和 unsubscribe 的执行方式已更新

Subscribe 和 unsubscribe 不再立即发送到 broker。新增了 debouncer 代码，会在 debounce 时间内延迟向 broker 发送 subscribe 并进行合并。在实际执行（un）subscribe 时，（un）subscribe 会被合并为对 broker 的一次调用。这些变更将加快 MQTT 集成以及注册了大量 MQTT entity 的集成的启动速度，尤其是在 subscribe 共享 topic（例如发布 availability）时。在 MQTT debug 日志中，`mid` 编号显示哪些（un）subscribe 调用已合并为对 MQTT broker 的一次调用。

### retained messages 的处理方式已变更

具有 `retain` 标志的 MQTT 消息的处理方式已发生变更，使得现有 subscriber 不再收到因新的 subscriber 订阅同一 topic 而由 broker 重新发送的 retained messages。相反，broker 重新发送的 retained messages 仅传递给新的 subscriber。

新行为避免了相同 retained message 反复向 subscriber 洪泛，并且更好地符合 MQTT 规范，参见 OASIS MQTT Version 3.1.1 规范（[关于 RETAIN 标志的使用方式](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc385349265)）和规范性声明编号 [MQTT-3.3.1-9](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718134)。
