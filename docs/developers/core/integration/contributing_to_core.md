---
title: "向 Core 贡献集成"
sidebar_label: "向 Core 贡献"
---

在此页面上，你将找到有关如何将集成贡献到 Home Assistant Core 的信息。

我们非常乐意接收向 Home Assistant Core 贡献的新集成。

由于这些更改通常比对现有集成的功能更复杂，我们有一组准则，将使所有相关人员的过程更顺利。

## 集成是否适合纳入？

作为流行的项目，Home Assistant 收到了大量贡献。我们希望确保将时间和资源花在审查和维护用户今天和未来都能受益的集成上。

这意味着我们有一些要求，集成必须满足才能被纳入 Home Assistant Core：

- 集成所连接的产品或服务应该可供 Home Assistant 用户购买和使用。这意味着我们不接受尚未发布的产品或处于 private beta 阶段的服务（如 Kickstarter 项目或类似项目）的集成。
- 产品或服务应该是成熟的。我们希望避免公司利用 Home Assistant 作为其新产品的营销平台，因此我们要求产品或服务已广泛可用并拥有一定的用户基础。

如果你的集成不符合这些要求，你可以改为将其作为 custom integration 发布到 GitHub 和 HACS 上。

## 集成需要满足哪些要求？

符合条件的新集成应满足一系列要求才能被接受。

### 集成质量量表

为了衡量集成的质量，我们使用 [integration quality scale]。

该量表定义了一套集成应遵循的规则，以被视为达到特定质量级别。

这些规则涵盖集成的各个方面，如文档、测试、代码质量等。

新集成必须达到集成质量量表的 [bronze] 级别。

不要立即追求更高的级别——正如在 [使你的 pull request 尽可能小](#make-your-pull-request-as-small-as-possible) 部分所述，我们应该保持 pull request 小而集中。

[bronze]: /docs/core/integration-quality-scale/rules#-bronze
[integration quality scale]: /docs/core/integration-quality-scale

### 用于通信的 Python library

一个重要的 [集成质量量表规则] 是要求使用 Python library 与产品或服务进行通信。

如果我们需要在集成中实现与产品或服务的通信，Home Assistant 代码库将会非常庞大，也会使维护和测试集成变得更加困难。

通过使用 Python library，我们可以将集成代码聚焦在 Home Assistant 特定的部分（如 entity 定义），并将与产品或服务的通信委托给 library。

这也允许该 library 被其他项目和集成重用，从而改善整个生态系统。

要查看 Python library 的要求，请查看集成质量量表中的 [dependency transparency] 规则。

:::tip
有关如何创建 Python library 的更多信息，请查阅我们关于 [创建 Python library] 的指南。
:::

[integration quality scale rule]: /docs/core/integration-quality-scale/rules/dependency-transparency.md
[dependency transparency]: /docs/core/integration-quality-scale/rules/dependency-transparency.md
[creating a Python library]: /docs/api_lib_index.md

## 如何将集成贡献到 Core

一旦你的集成处于良好状态并准备好贡献到 Home Assistant Core，你需要遵循几个步骤来确保它能够被审查。

### 使你的 pull request 尽可能小

新集成应具有最少的代码和功能，以对用户有用。

范围明确的 pull request 更容易审查和合并，因为这允许审查者审批和合并较小的代码块。

**包含大型代码转 dump 且不遵循这些准则的 pull request 可能会被关闭。**

对于新集成，这意味着：

- 限制为单一 platform。
- 不要添加对初始 platform 工作非必要的功能。这包括以下功能：
  - Diagnostics
  - Custom service actions
  - Reauthentication 和 reconfiguration flows
- 理想情况下，避免复杂的集成质量量表规则（如 `dynamic-devices` 和 `stale-devices`）。

要了解更多有关如何界定 pull request 范围的信息，请查看我们关于 [创建完美的 PR] 的指南。

[creating the perfect PR]: /docs/review-process.md#creating-the-perfect-pr

### 确保代码检查通过

请确保你已经设置了合适的开发环境，并在打开 pull request 之前已在本地运行了代码检查。

如果 CI checks 因你的更改而失败，在 checks 通过之前我们无法审查和合并你的 pull request。

请注意，某些测试可能不稳定，因此如果你确信失败与你的代码无关，请等待维护者，而不是每次失败时都尝试重新运行 CI。

:::info
我们的 pre-commit checks 可以更新你的集成目录之外的文件。这些更改应包含在你的 pull request 中。
:::

### 在 pull request 描述中提供足够的上下文

当你打开 pull request 以将集成贡献到 Home Assistant Core 时，请确保在 pull request 描述中提供足够的上下文。

这包括：

- 描述集成所连接的产品或服务。
- 指向用于与产品或服务通信的 library 的 git repository 链接。
