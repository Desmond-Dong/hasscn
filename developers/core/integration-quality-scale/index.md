import RuleOverview from './\_includes/rule\_overview.jsx'

Integration quality scale 是 Home Assistant 根据用户体验、功能、代码质量和开发者体验对集成进行评级的框架。
为了进行评级，项目提出了一系列 tier，每个 tier 都有其特定含义。

## 等级分级

共有 4 个 scaled tiers：bronze、silver、gold 和 platinum。
要达到某个 tier，集成必须满足该 tier 及其以下所有 tier 的全部规则。

这些 tier 定义如下。

### 🥉 Bronze

Bronze tier 是基准标准，也是所有新集成的要求。它满足代码质量、功能和用户体验方面的最低要求。它符合基本期望，为用户提供与设备和服务交互的可靠基础。

文档提供直接从 Home Assistant 用户界面设置集成的指南。

从技术角度来看，此集成已审查以符合所有基准标准，这是我们要求所有新集成遵守的标准，包括设置集成的自动化测试。

Bronze tier 具有以下特征：

* 可以通过 UI 轻松设置。
* 源代码符合基本编码标准和开发准则。
* 保护此集成的自动化测试可以正确配置。
* 提供基本的最终用户文档，足以让用户轻松分步入门。

### 🥈 Silver

Silver tier 在 "Bronze" 级别的基础上提升了集成的可靠性和稳健性，确保稳定的运行时体验。它确保集成正确处理错误，例如当对设备或服务的认证失败时，处理离线设备以及其他错误。

这些集成的文档提供使用此集成时 Home Assistant 中可用的功能信息，以及出现问题时的故障排除信息。

此集成有一个或多个活跃的 code owners，帮助维护它以确保此级别上的体验现在和未来持续存在。

Silver tier 具有以下特征：

* 提供 "Bronze" 的所有功能。
* 在各种条件下提供稳定的用户体验。
* 有一个或多个活跃的 code owners 帮助维护集成。
* 正确且自动地从连接错误或离线设备中恢复，不会填满日志文件，也不会产生不必要的消息。
* 如果与设备或服务的认证失败，自动触发重新认证。
* 提供有关集成功能的详细文档和问题故障排除说明。

### 🥇 Gold

集成用户体验的金标准，为集成的设备和服务提供广泛而全面的支持。Gold-tier 集成旨在用户友好、功能齐全，并面向更广泛的受众。

在可能的情况下，设备会自动发现以实现轻松无缝的设置，并且它们的 firmware/software 可以直接从 Home Assistant 更新。

所有提供的设备和 entity 都有逻辑化的名称且完全可翻译，并且已正确分类并启用于长期统计使用。

这些集成的文档非常详细，主要面向最终用户且易于理解。除提供集成的一般信息外，文档还提供可能的示例用例、兼容设备列表、集成提供的已描述 entity 列表，以及集成提供的可用 actions 的广泛描述和使用示例。强烈建议结合示例 automations、dashboards、可用 Blueprints 以及指向额外外部资源的链接。

集成提供调试问题的手段，包括下载 diagnostic 信息和文档化的故障排除说明。如有需要，可以通过 UI 重新配置集成。

从技术角度来看，集成需要对其代码库具有完整的自动化测试覆盖，以确保当前和未来的集成质量得以保持。

所有在 Works with Home Assistant 项目中提供设备的集成至少需要达到此 tier。

Gold tier 具有以下特征：

* 提供 "Silver" 的所有功能。
* 提供集成能够提供的最佳最终用户体验；流畅且直观。
* 可以被自动发现，简化集成设置。
* 集成可以被重新配置和调整。
* 支持 translations。
* 面向最终用户的详细文档。
* 在可能时支持通过 Home Assistant 更新设备的 software/firmware。
* 集成具有覆盖整个集成的自动化测试。
* Works with Home Assistant 项目中提供设备的集成的必需级别。

### 🏆 Platinum

Platinum 是集成可以达到的最高 tier，是 Home Assistant 中质量的典范。它不仅提供最佳的用户体验，还通过遵循最高标准、卓越的代码质量以及优化的性能和效率来实现技术卓越。

Platinum tier 具有以下特征：

* 提供 "Gold" 的所有功能。
* 所有源代码遵循所有编码和 Home Assistant 集成标准及最佳实践，并通过类型注释和清晰的代码注释完全类型化，以提高代码清晰度和可维护性。
* 完全异步的集成代码库确保高效运行。
* 实现高效的数据处理，减少网络和 CPU 使用。

### 跟踪已实现的规则

致力于达到更高 tier 或已有 tier 的集成，必须向其集成中添加 `quality_scale.yaml` 文件。
此文件的目的是跟踪已实现规则的进度，并跟踪被豁免的规则及豁免原因。
此文件的示例如下：

```yaml
rules:
  config_flow: done
  docs_high_level_description:
    status: exempt
    comment: This integration does not connect to any device or service.
```

### 调整集成的等级

Home Assistant 鼓励我们的贡献者将其集成提升到尽可能高的 tier，为我们的贡献者提供出色的编码体验，为用户带来最佳体验。

当集成达到某个 tier 的最低要求时，贡献者可以打开 pull request 来调整该集成的级别。
此请求需要附带每个 scale rule 的完整清单（包括所有较低 tier 的规则），证明其已满足这些要求。
清单可以在[此处](/developers/core/integration-quality-scale/checklist.md)找到。

Home Assistant core team 审查并批准后，集成将在 Home Assistant 的下一个 major release 中显示新的 tier。

除了将集成升级到更高的 tier 之外，集成也可能被降级到更低的 tier。
例如，当不再存在活跃的集成 code owner 时就会发生这种情况。
在此特定示例中，即使集成在其他方面完全符合 "Platinum" tier，它也将被降级为 "Bronze"。

无需创建文档 pull request。在集成的 tier 已在代码库中更新后，quality scale 将在 Home Assistant 的下一个 minor release 的文档中自动更新。

### 对各等级中包含的规则的调整

IoT 世界以及 Home Assistant 使用的所有技术都在快速发展；不仅体现在 Home Assistant 可以支持或做的事情上，也体现在 Home Assistant 所基于的软件上。Home Assistant 正在以快速的速度在行业中引领技术。

这也意味着随着时间的推移会出现新的见解和新开发并采用的最佳实践，从而导致集成 quality scale 个别规则的新增和改进。

如果某个 tier 被调整，该 tier 中的所有集成都需要重新评估并相应调整。

:::info
一个例外是拥有属于 Works with Home Assistant 项目设备的集成。这些集成将被标记为沿用其现有 tier。
:::

## 特殊等级

还有 4 个 special tiers，用于无法放入 scaled tier 列表的集成。
这是因为它们要么是 core 的内部组成部分，要么根本不在 core 中，要么不符合与 scaled tiers 相比评级的最低要求。

Special tiers 定义如下。

### ❓ No score

这些集成可以通过 Home Assistant 用户界面设置。"No score" 并不表示它们差或有 bug，而是表示它们尚未根据 quality scale 进行评估，或者需要一些维护才能达到现在被视为最低的 "Bronze" 标准。

"No score" tier 不能分配给新集成，因为它们引入时至少需要达到 "Bronze" 级别。Home Assistant 项目鼓励社区帮助更新这些没有分数的集成，使其至少满足 "Bronze" 级别要求。

特征：

* 尚未评分或缺乏足够的评分信息。
* 可以通过 UI 设置，但可能需要增强以获得更好的体验。
* 可能正常工作，但尚未根据当前标准进行验证。
* 文档通常只提供基本设置步骤。

### 🏠 Internal

此 tier 分配给 Home Assistant 内部使用的集成。这些集成为 Home Assistant 的核心程序或其他集成在其之上构建提供基本组件和构建块。

Internal 集成由 Home Assistant 项目维护，并受严格的架构设计程序约束。

特征：

* Home Assistant 核心程序的内部、内置构建块。
* 提供其他集成使用和在其之上构建的构建块。
* 由 Home Assistant 项目维护。

### 💾 Legacy

Legacy 集成是较旧的集成，已在 Home Assistant 中存留多年，可能从 inception 起就存在。它们只能通过 YAML 文件配置，并且往往缺乏活跃的维护者（code owners）。这些集成可能设置复杂，在使用和功能上不符合当前/现代最终用户的期望。

Home Assistant 项目鼓励社区帮助将这些集成迁移到 UI 并更新它们以符合现代标准，使这些集成对所有人可访问。

特征：

* 设置过程复杂；只能通过 YAML 配置，没有基于 UI 的设置。
* 可能缺乏活跃的 code ownership 和维护。
* 可能缺少近期更新或 bug 修复。
* 文档可能仍面向开发者。

### 📦 Custom

Custom 集成由社区开发并发布，为 Home Assistant 提供额外的功能和设备与服务支持。这些集成不包含在官方的 Home Assistant 发布中，可以手动安装或通过第三方工具（如 HACS（Home Assistant Community Store））安装。

Home Assistant 项目不审查、安全审计、维护或支持第三方 custom 集成。鼓励用户在安装前谨慎行事，并审查 custom 集成的源代码和社区反馈。

鼓励并邀请开发者通过使 custom 集成与 integration quality scale 对齐并提交纳入请求，将其贡献给 Home Assistant 项目。

特征：

* 不包含在官方的 Home Assistant 发布中。
* 可手动安装或通过社区工具（如 HACS）安装。
* 由个人开发者或社区成员维护。
* 用户体验可能差异很大。
* 功能、安全性和稳定性可能差异很大。
* 文档可能有限。
