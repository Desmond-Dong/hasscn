target selector 不再支持 device filter 选项，它已从 [target selector 文档](https://www.home-assistant.io/docs/blueprint/selectors/#target-selector)中移除。

Hassfest 已更新为在 [带有 device filter 的 target 的 service 上失败](https://github.com/home-assistant/core/pull/152794)。

在 Home Assistant Core 2026.11 中，指定了 device filter 的 target selector 验证将会失败。

### 背景

从 target 中提取 entity 的核心 helper 不支持 device filter。当用户选择 floor、area、label 或 category 时，filter 会被忽略。前端在选择 target 的 entity 时也会忽略 device filter。

对所有核心集成的审查发现，没有在 target selector 上正确使用 device filter 的情况。我们没有在 Core 和前端中实现对 device filter 的支持，而是直接从 target selector 中移除了 device filter。

### 对自定义集成和 blueprint 的影响

请更新自定义集成和 blueprint，从 target selector 中移除 device filter。

如果您在 target selector 上使用 device filter 有合理的用例，请通过 Discord 联系我们。
