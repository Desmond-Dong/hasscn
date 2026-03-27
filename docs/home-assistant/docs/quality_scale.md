---
title: 质量等级
description: 'integrations质量等级是 Home Assistant 用来根据用户体验、功能、代码质量和开发者体验对integrations进行评级的框架。 为此，项目制定了一组层级，每个层级都有自己的一套标准。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 质量等级

integrations质量等级是 Home Assistant 用来根据用户体验、功能、代码质量和开发者体验对integrations进行评级的框架。
为此，项目制定了一组层级，每个层级都有自己的一套标准。

## 标准层级

共有 4 个标准层级：铜级、银级、金级和白金级。
要达到某个层级，integrations必须满足该层级及其以下所有层级的规则。

这些层级的定义如下。

### 🥉 铜级

铜级是所有新integrations的基线标准和要求。它在代码质量、功能性和用户体验方面满足最低要求。它符合基本期望，为用户与其devices和服务交互提供可靠的基础。

文档提供了直接从 Home Assistant 用户界面设置integrations的指南。

从技术角度来看，此integrations已经过审查，符合所有基线标准，这是我们对所有新integrations的要求，包括设置integrations的automation测试。

铜级具有以下特征：

- 可以通过 UI 轻松设置。
- 源代码遵循基本编码标准和开发指南。
- automation测试可确保此integrations能够正确configuration。
- 提供基本的最终用户文档，足以让用户轻松入门。

### 🥈 银级

银级在铜级基础上提升，通过提高integrations的可靠性和健壮性确保稳固的运行体验。它确保integrations能够正确处理错误，例如当devices或服务认证失败时、处理离线devices以及其他错误。

这些integrations的文档提供了在 Home Assistant 中使用此integrations时可用的功能信息，以及出现问题时的故障排除信息。

此integrations有一个或多个活跃的代码维护者，帮助维护它以确保当前和未来的体验水平。

银级具有以下特征：

- 提供铜级的所有功能。
- 在各种条件下提供稳定的用户体验。
- 有一个或多个活跃的代码维护者帮助维护integrations。
- 能够正确、自动地从连接错误或离线devices中恢复，不会填满日志文件，也不会产生不必要的消息。
- 如果与devices或服务的认证失败，自动触发重新认证。
- 提供integrations功能的详细文档和问题排查指南。

### 🥇 金级

integrations用户体验的黄金标准，为integrations的devices和服务提供广泛全面的支持。金级integrations旨在用户友好、功能齐全，并面向更广泛的受众。

在可能的情况下，devices可以自动发现以实现轻松无缝的设置，其固件/软件可以直接从 Home Assistant 更新。

所有提供的devices和entities都有逻辑命名且完全可翻译，并已正确分类和启用以供长期统计使用。

这些integrations的文档非常详尽，主要面向最终用户，非技术消费者也能理解。除了提供integrations的常规信息外，文档还提供可能的使用示例、兼容devices列表、integrations提供的entities描述列表，以及integrations提供的可用动作的详细描述和使用示例。强烈鼓励使用示例automation、仪表盘、可用的蓝图以及外部资源的链接。

integrations提供调试问题的方法，包括下载诊断信息和记录故障排除说明。如有需要，可以通过 UI 重新configurationintegrations。

从技术角度来看，integrations需要对其代码库进行完整的automation测试覆盖，以确保当前和未来保持设定的integrations质量。

所有参与 Works with Home Assistant 计划提供devices的integrations至少需要达到此层级。

金级具有以下特征：

- 提供银级的所有功能。
- 拥有integrations能够提供的最佳最终用户体验；流畅直观。
- 可以自动发现，简化integrations设置。
- integrations可以重新configuration和调整。
- 支持翻译。
- 详尽的文档，面向非技术用户。
- 在可能的情况下支持通过 Home Assistant 更新devices的软件/固件。
- integrations有覆盖整个integrations的automation测试。
- 为提供 Works with Home Assistant 计划devices的integrations的必要等级。

### 🏆 白金级

白金是integrations可以达到的最高层级，是 Home Assistant 中质量的典范。它不仅提供最佳的用户体验，还通过遵循最高标准、卓越的代码质量以及优化良好的性能和效率来实现技术卓越。

白金级具有以下特征：

- 提供金级的所有功能。
- 所有源代码遵循所有编码和 Home Assistant integrations标准及最佳实践，并具有完整的类型注释和清晰的代码注释，以提高代码清晰度和可维护性。
- 完全异步的integrations代码库确保高效运行。
- 实现高效的数据处理，减少网络和 CPU 使用。

## 特殊层级

有 4 个特殊层级用于那些不适合标准层级列表的integrations。
这是因为它们要么是 **Home Assistant 核心**的内部组成部分，要么根本不在 **Home Assistant 核心**中，或者它们不符合标准层级的最低要求。

这些特殊层级的定义如下。

### ❓ 无评分

这些integrations可以通过 Home Assistant 用户界面设置。无评分标识并不意味着它们不好或有缺陷，而是表明它们尚未按照质量等级进行评估，或者需要一些维护才能达到现在被认为最低的铜级标准。

无评分层级不能分配给新integrations，因为它们在引入时需要至少达到铜级水平。Home Assistant 项目鼓励社区帮助更新这些无评分的integrations，使其至少达到铜级要求。

特征：

- 尚未评分或缺乏足够的评分信息。
- 可以通过 UI 设置，但可能需要改进以获得更好的体验。
- 可能功能正常，但尚未根据当前标准进行验证。
- 文档通常只提供基本的设置步骤。

### 🏠 内部

内部层级分配给 Home Assistant 内部使用的integrations。这些integrations为 Home Assistant 核心程序或其他在其之上构建的integrations提供基本组件和构建块。

内部integrations由 Home Assistant 项目维护，并遵循严格的架构设计程序。

特征：

- 内部、内置的 Home Assistant 核心程序构建块。
- 为其他integrations使用和构建提供构建块。
- 由 Home Assistant 项目维护。

### 💾 遗留

遗留integrations是较旧的integrations，已成为 Home Assistant 的一部分多年，可能自其诞生之初。它们只能通过configuration文件configuration，通常缺乏活跃的维护者（代码维护者）。这些integrations可能设置复杂，在使用和功能方面不符合当前/现代最终用户的期望。

Home Assistant 项目鼓励社区帮助将这些integrations迁移到 UI，并更新它们以符合现代标准，使这些integrations对每个人都可用。

特征：

- 设置过程复杂；只能通过configuration文件configuration，没有基于 UI 的设置。
- 可能缺乏活跃的代码所有权和维护。
- 可能缺少最近的更新或错误修复。
- 文档可能仍然面向开发者。

### 📦 自定义

自定义integrations由社区开发和分发，为 Home Assistant 提供额外的功能以及对devices和服务的支持。这些integrations不包含在官方 Home Assistant 版本中，可以手动安装或通过 HACS (Home Assistant Community Store) 等第三方工具安装。

Home Assistant 项目不审查、安全审计、维护或支持第三方自定义integrations。我们鼓励用户在安装前谨慎行事，审查自定义integrations的源代码和社区反馈。

我们鼓励并邀请开发者通过将其与integrations质量等级对齐并提交纳入，将他们的自定义integrations贡献给 Home Assistant 项目。

特征：

- 不包含在官方 Home Assistant 版本中。
- 可手动安装或通过社区工具安装，如 <abbr title="Home Assistant Community Store">HACS</abbr>。
- 由个人开发者或社区成员维护。
- 用户体验可能差异很大。
- 功能、安全性和稳定性可能差异很大。
- 文档可能有限。