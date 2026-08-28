### 新的 notify entity platform

notify platform 现在可以作为 [entity platform](https://developers.home-assistant.io/docs/core/entity/notify/) 使用。新的 `notify` platform 的 MVP [实现](https://github.com/home-assistant/core/pull/110950)了方法和 service `send_message`。它接受 `message` 作为必需属性。
与传统的 `notify.notify` service 不同，我们没有将 targets 作为参数，因为它是 entity，我们在调用 `send_message` 时可以针对多个 `notify` entity。

[architecture discussion](https://github.com/home-assistant/architecture/discussions/1041) 仍在进行中，讨论的主题包括要实现的 device class 以及通过[联系人注册表实现 recipient 支持](https://github.com/home-assistant/architecture/discussions/1041#discussioncomment-8947842)。

实现传统 `notify` service 的现有集成将分阶段迁移。第一步是迁移那些仅使用 `message` 作为参数的集成。

确定要迁移的集成如下：

* circuit
* clickatell
* clicksend
* command\_line
* demo
* ecobee
* flock
* free\_mobile
* knx
* mastodon

一旦我们有了 `title` 和/或 `recipient` 支持，就可以迁移更多集成来使用新的 platform。

当集成完成迁移后，用户将需要使用新的 `notify.send_message` service，因此在弃用期结束后，迁移变更将导致自动化失效。
