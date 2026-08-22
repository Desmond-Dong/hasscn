### send\_message service notify entity platform 的 Title 选项

最近我们添加了 notify [entity platform](https://developers.home-assistant.io/docs/core/entity/notify/)。新的 `notify` platform 方法实现了 service `send_message`。该 service 现在还将可选的 `title` 作为参数接受。这使得一些新的集成现在可以迁移到使用新的 entity platform：

* cisco\_webex\_teams
* file
* sendgrid
* syslog
* tibber

[architecture discussion](https://github.com/home-assistant/architecture/discussions/1041) 仍在进行中。

当集成完成迁移后，用户将需要使用新的 `notify.send_message` service，因此在弃用期结束后，迁移变更将导致自动化失效。
