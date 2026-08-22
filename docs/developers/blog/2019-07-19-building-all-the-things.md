---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: Building All The Things
---

import DiscussionBox from '../static/js/discourse_discussion.jsx'

_Home Assistant 如何使用 Azure Pipelines 自动化一切。_

在 Home Assistant，我们热爱自动化！不仅是在我们的家中，也在开发工作中。我们每三周发布一次版本，包含来自 80 多个不同人员的代码。所有这些都由两名全职人员管理（感谢 [Nabu Casa](https://www.nabucasa.com)！）。

我们将 Home Assistant 作为 Python 包分发，并作为我们名为 Hass.io 的一体化系统的一部分。Hass.io 有自己的操作系统、一个 supervisor Docker 容器和 Home Assistant docker 容器。除此之外，Hass.io 还支持 add-ons，我们有一套官方 add-ons 也进行维护。对于 Hass.io 所做的每一件事，我们都要做五次，每次针对我们支持的一种架构：amd64、i386、armv6、armv7、aarch64。

为了保持快速推进，我们花了很多时间自动化构建任务。在试用了 [TravisCI](https://travis-ci.org/) 和 [CircleCI](https://circleci.com/) 之后，我们最终选择了 [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/)。

我们最初从 Travis 开始，但意识到可以通过利用包含 4 个 worker、测试分布和构建 artifact 缓存的 CircleCI 开源计划来显著加速构建。我们尝试从 CircleCI 获取更多 worker，但根据他们的新定价计划添加 worker 太贵了。

[Pascal Vizeli](https://www.github.com/pvizeli) 在以前的工作中有 Azure 经验，他能够在几天内迁移并构建所有基于 YAML 的 pipelines。他得到了 [Kees Schollaart](https://twitter.com/keesschollaart) 的支持，后者是 Azure 的 DevRel，但在我们的社区中因创建 [Home Assistant Companion extension for VS Code](https://marketplace.visualstudio.com/items?itemName=keesschollaart.vscode-home-assistant) 而闻名。每当我们卡住时，他都给予了很多帮助。

Azure 的开源计划附带 10 个免费 agents，在我们联系 Microsoft 后，他们额外提供了 20 个 agents 来帮助我们自动化一切！

有兴趣看看我们用这些 Azure 能力做了什么吗？

<!--truncate-->

## 持续集成

对 Home Assistant 的所有更改都经过我们的 CI pipeline。当有 pull request 提交到 Home Assistant 仓库时，它将触发按 [`azure-pipelines-ci.yml`](https://github.com/home-assistant/home-assistant/blob/dev/azure-pipelines-ci.yml) 配置的 pipeline。

Home Assistant 的贡献会经过我们的测试套件、代码风格和类型检查，以确保贡献不会破坏东西。我们将测试套件拆分为 3 个不同的 stages。通过使用 stages，我们可以运行快速的验证 stage，如果不正确就快速失败。

这一策略使我们在已知基础 linting 无法通过时，不会浪费任何 worker 时间运行完整的测试套件。

下面是我们 Home Assistant CI pipeline 的截图。由于所有工作分布在多个 worker 上，总运行时间是第一列中最长的任务，加上第二列中最长的任务。

<center>
![Home Assistant CI pipeline 的截图。](/img/en/blog/2019-07-building-all-the-things/test-stages.png)
</center>

为了在 Azure 上改善我们的 CI 时间，我们使用了 [pipeline artifact caching](https://marketplace.visualstudio.com/items?itemName=1ESLighthouseEng.PipelineArtifactCaching) 的预览版本。这允许我们构建一次依赖，将其作为包存储在测试 runner 附近，并在 jobs 和 pipeline runs 之间重用。

另一个我们进行的优化是使用自己的 base images 作为测试 runner。这些镜像已经安装了正确的 Python 和其他基础工具。我们将它们添加到 [resources](https://github.com/home-assistant/core/blob/de3d28d9d5bd5dd69cf9f84d021d683da2c322d6/azure-pipelines-ci.yml#L12-L18)，然后在 [strategy](https://github.com/home-assistant/core/blob/de3d28d9d5bd5dd69cf9f84d021d683da2c322d6/azure-pipelines-ci.yml#L72-L80) 部分引用它们。

CircleCI 有一个不错的功能，它可以通过跟踪每个测试的持续时间将测试分布在多个 worker 上。这将 PyTest 套件的持续时间减少到约 10 分钟。但这使用了更多 agents，我们会很快耗尽 agents，产生大量积压。后续 stages 只有在 "Overview" stage 完成后才会排队，导致它们排在其他贡献后面。

使用 Azure，我们获得更多 runner，它们更强大、更快，但没有 parallelization。这意味着单个构建将花费更长时间，但随着许多构建涌入，单个构建时间大致保持不变，因为我们没有遇到积压。

<center>
![Home Assistant CI pipeline 的截图。](/img/en/blog/2019-07-building-all-the-things/test-results.png)<br />
[测试结果](https://dev.azure.com/home-assistant/Home%20Assistant/_build/results?buildId=3976&view=ms.vss-test-web.build-test-results-tab)的截图。
</center>

## 构建 HassOS

HassOS 是我们自己的嵌入式 Linux 发行版。它专为在 Docker 容器中运行 Home Assistant 所需的最基本功能而定制。BuildRoot 驱动构建，我们针对五种不同的处理器架构。

Azure Pipelines agents 使用 amd64 CPU 架构。可以使用称为 cross-compiling 的方法为不同架构编译。我们尝试了，但意识到它比使用与我们目标相同的 native CPU 进行编译要慢得多。

我们使用 Azure Pipelines 上称为 [self-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops#install) 的功能，在具有正确架构的自有硬件上托管 build agents。Azure Pipelines 管理 pipeline 定义和编排，但执行在我们的自有硬件上飞速运行。

<center>
![Home Assistant CI pipeline 的截图。](/img/en/blog/2019-07-building-all-the-things/build-cabinet.jpg)<br />
我们的 build cabinet。
</center>

## 构建 Python Wheels

Home Assistant 作为独立的 Python 包分发，并捆绑在 Docker 容器中。我们的 Docker 容器包含不同 integrations 的所有 Python 包预装。因此，创建 Docker 容器需要很长时间，因为我们必须为每种架构安装和构建每个 Python 包。Home Assistant + 所有 integrations 依赖于超过 1000 个不同的 Python 包。

为了加速这个过程，我们利用 Python Wheels。Wheels 是一种二进制格式，包含特定操作系统和 CPU 架构的预构建 Python 包。我们有一个 Azure pipeline 帮助在所有支持的 CPU 架构上为所有不同包构建 wheels。总计 5000 个 wheels！

有一种特殊的 wheels 格式，可以通过单次构建针对多个平台。我们无法使用它，因为它与 musl libc 不兼容，而 Alpine 使用 musl。

该 pipeline 在贡献被接受并合并到开发中且更改了任何 requirements 时自动触发（[pipeline 定义](https://github.com/home-assistant/core/blob/de3d28d9d5bd5dd69cf9f84d021d683da2c322d6/azure-pipelines-wheels.yml#L3-L10)）。我们还每天运行它以确保捕获所有更改。

由于使用 wheel 安装要快得多，我们还允许 custom integrations [注册自己](https://github.com/home-assistant/custom-components-wheels)。我们将每天扫描每个 custom integration 一次，以确保我们有它们使用的 Python 包的 wheels。

通过利用 wheels，我们将 Home Assistant containers 的构建时间从 1 小时减少到 10 分钟（来自 amd64 构建的测量）。

_（旁注。Python 是以 Monty Python 命名的，包索引则因他们著名的一个段子被叫做 "the Cheese Shop"。因此 Wheel 格式是以一块轮状奶酪命名的，而不是汽车的轮子。5000 块轮状奶酪是很多的奶酪。）_

## 构建 Home Assistant 发布版本

Home Assistant 每三周发布一次稳定版本。在这个稳定版本之前，我们通常有大约 6 个 beta 版本。稳定版本发布后，我们通常有 2 到 3 个 patch 版本。

每个版本都需要构建为独立的 Python 包，以及针对五种支持的 CPU 架构之一的 Docker 容器。

该 pipeline 在[新 release 打 tag](https://github.com/home-assistant/core/blob/dev/azure-pipelines-release.yml#L3-L7)时触发。我们首先验证 tag 名是否匹配代码中的版本，并且 release 是由我们白名单中的 release 管理员之一创建的。然后我们将自动构建所有 releases 并发布。

## 构建 Hass.io add-ons

Hass.io 的功能之一是 add-ons。Add-ons 允许开发者重用 Home Assistant 在 Hass.io 中运行所使用的相同基础设施，但用于你想在网络上运行的任何其他程序。这些 add-ons 可以与 Home Assistant 紧密集成。例如，可以从 [Community Add-ons](https://github.com/hassio-addons/repository) 一键安装 AdGuard，并使其数据可以在 Home Assistant 中访问。

Hass.io 包含几个核心 add-ons。这些 add-ons 的每个版本也需要为所有五种架构构建。我们将所有 add-ons 保存在一个仓库中，但每个 add-on 有自己的 pipeline 定义，仅在该 add-on 更改时触发（[示例](https://github.com/home-assistant/hassio-addons/blob/master/mosquitto/azure-pipelines.yml)）。

## 结论

构建广泛的自动化系统确实帮助 Home Assistant 以最少的资源进行了扩展。我们对从 Azure 及其员工那里得到的所有帮助感到非常高兴。干杯！

## 链接

- [Home Assistant on Azure Pipelines](https://dev.azure.com/home-assistant/Home%20Assistant/_build)
- [Hass.io on Azure Pipelines](https://dev.azure.com/home-assistant/Hass.io/_build)

## 评论

<div id='discourse-comments'></div>

<DiscussionBox discourseUrl="https://community.home-assistant.io/"
      discourseEmbedUrl="https://developers.home-assistant.io/blog/2019/07/19/building-all-the-things.html" />