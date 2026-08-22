---
author: Frenck
authorURL: https://github.com/frenck
authorImageURL: https://avatars.githubusercontent.com/u/195327?v=4
title: "引入 Labs：在成为标准之前预览功能"
---

我们很高兴宣布 Home Assistant 中用于发布预览功能的新系统：**Labs**。Labs 为集成提供了一种标准化的方式，在功能成为标准之前让用户可以选择加入，从而使我们能够收集反馈并根据实际使用来完善设计。

## 什么是 Labs 预览功能？

Labs 预览功能不同于 beta 测试。虽然 beta 测试评估即将发布的 Home Assistant 版本的稳定性，但 Labs 侧重于完善用户界面和设计。Labs 功能经过全面测试且功能完整，但在我们收集实际使用和反馈的过程中，其设计和行为仍可能改变。这意味着它们可能包含 breaking changes，可能被扩展新功能，甚至如果效果不佳可能会被移除。

可以这样理解：

- **Beta**：评估即将发布的 Home Assistant 版本的稳定性
- **Labs**：经过全面测试的功能，设计和用户界面在不断演进，通过实际使用和反馈进行完善

## 工作原理

集成在其 `manifest.json` 中声明预览功能，并提供反馈、文档和 issue 报告的链接。然后用户可以在 **Settings** → **System** → **Labs** 中启用这些功能，它们会立即激活而无需重启。集成代码会检查功能是否已启用并相应地作出响应。

## 为什么需要 Labs？

我们许多最重要的改进在成为标准之前都需要经过实际测试。Labs 提供：

1. **结构化反馈渠道**：每个功能都有专门的 URL，用于反馈、文档和 issue 报告
2. **运行时激活**：功能可以即时启用和禁用，无需配置更新或重启
3. **清晰的预期**：用户知道他们正在尝试经过全面测试的功能，其设计可能会根据反馈而改变
4. **迭代开发**：将用户反馈直接融入开发过程

## 示例：Kitchen Sink special repair

[Kitchen Sink](https://www.home-assistant.io/integrations/kitchen_sink/) 演示集成包含一个工作示例。启用时，"special repair" 功能会创建一个 repair issue，以演示 Labs 功能如何与其他 Home Assistant 集成交互。请参阅[开发文档](/developers/development/labs#complete-example-kitchen-sink-special-repair) 获取完整的实现。

## 开始使用

准备向您的集成添加 Labs 预览功能吗？查看我们的[综合指南](/developers/development/labs)，涵盖：

- 何时使用 Labs（以及何时不使用）
- 如何在 manifest 中定义功能
- 后端和前端功能的实现模式
- 运行时激活要求
- 测试方法
- 功能生命周期（preview → 标准或移除）

## 接下来做什么？

我们鼓励集成开发者考虑将 Labs 用于：

- 重大的 UI 变更或重新设计
- 受益于实际测试的重大架构变更
- 用户反馈将塑造最终设计的功能

Labs **不适合**用于：

- 永久配置选项（请改用集成 options）
- 可以直接进入发布版本的小改动
- 存在关键 bug 或根本上不完整的功能

## 亲自试一试

想看看 Labs 的实际效果？安装 Kitchen Sink 演示集成，并在 Settings → System → Labs 中启用"Special repair"功能。您将亲身体验预览功能的工作原理。