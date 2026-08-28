Home Assistant 现在支持翻译 services。此前，service 及其 service 字段的名称和描述被硬编码在每个集成的 `services.yaml` 文件中。

现在，我们已添加使用翻译系统翻译这些名称和描述的支持。这意味着 service 及其 service 字段的名称和描述现在可以被翻译成任何语言。

为实现这一点，每个 service 和 service 字段的 `name` 与 `description` 键从硬编码的 `services.yaml` 文件中移动到每个集成的翻译文件中。

`services.yaml` service 描述更新的示例可在[我们的文档中](/developers/dev_101_services.md#service-action-descriptions)找到。[后端本地化](/developers/internationalization/core.md#service-actions)也已扩展，包含一个已翻译 service 的示例，与 service 描述中的示例相匹配。

service 翻译自 Home Assistant 2023.8 起可用。我们希望这能让 Home Assistant 对非英语用户更加友好。
