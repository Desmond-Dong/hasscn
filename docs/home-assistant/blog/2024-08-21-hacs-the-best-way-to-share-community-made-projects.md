---
title: HACS 2.0 - 共享社区项目的最佳方式变得更好
description: 2.0 带来了新功能，使其成为共享社区制作的集成和 UI 元素的最佳选择。
---
<p class='img'><img src='/home-assistant/images/blog/2024-08-hacs2/art.png' style='border: 0;box-shadow: none;' alt="HACS 2.0 - The best way to share community-made projects just got better">Clelia Rella 创作</p>

**TL;DR：** HACS 2.0 向前迈出了一大步，添加了更简单的安装方法、更快的更新、新的 UI 以及适当的 Home Assistant 更新/修复通知。

Home Assistant 的社区商店 HACS 现已推出 v2.0，获得了一些重大改进，继续使其成为查找、安装和更新出色的社区制作的集成和 UI 元素的最佳方式。在此之前，HACS 被添加为 [开放家庭基金会](https://www.openhomefoundation.org/) 合作伙伴，认识到其在Home Assistant开放生态系统中的重要作用。

请注意，HACS 是一种高级工具，可以将自定义代码添加到您的 Home Assistant 安装中，这可能会导致您的 Home Assistant 系统出现问题。如果您是初学者或将稳定性放在第一位，[HACS 可能不适合您](#how-to-安装)。

## 跳转到 <!-- omit from toc --> 部分
- [HACS 达到 v2.0](#hacs-reaches-v20)
- [什么是HACS？](#what-is-hacs)
- [为什么要使用HACS？](#why-use-hacs)
- [HACS简史](#a-brief-history-of-hacs)
- [如何安装](#how-to-安装)

***想要跳过博客并开始使用 HACS 2.0？*** 请记住要谨慎行事，并且在安装之前不要跳过备份步骤(#how-to-安装)。

<!--more-->

## HACS 达到 v2.0

这是 HACS 迄今为止最大的更新之一，但如果您不确定 HACS 是什么或为什么考虑使用它，请查看我们的[下面的解释](#what-is-hacs)。

### 新前端 <!-- omit from toc -->

<img src='/home-assistant/images/blog/2024-08-hacs2/frontend.png' style='border: 0;box-shadow: none;' alt="HACS 前端 looks like data tables">

HACS 2.0 [主仪表盘](https://www.hacs.xyz/docs/use/repositories/dashboards/) 从 Home Assistant 中汲取了灵感，现在与您在实体或自动化页面上找到的数据表的原生外观和功能非常匹配。这包括过滤、分组、排序和搜索选项。

### 下载速度更快 <!-- omit from toc -->

<img src='/home-assistant/images/blog/2024-08-hacs2/downloads.png' style='border: 0;box-shadow: none;' alt="HDownload window going very fast">

以前，HACS 100%依赖GitHub来检索信息，从文件位置到星星数量，因此我们需要限制API（因为HACS用户很多）。为了加快速度，我们创建了一个存储在 Cloudflare R2 存储桶中的[远程数据集](https://www.hacs.xyz/docs/faq/data_sources/)，该存储桶会定期更新。  文件仍然从 GitHub 下载，并且仍然联系他们的 API，但是调用会大大减少，并且速度提高很大。在这些场景的背后，这是一项艰巨的工作，需要持续的成本，并展示了 Open Home 基金会可以为 HACS 等社区驱动的项目提供的支持。

### 更新和修复 <!-- omit from toc -->

<img src='/home-assistant/images/blog/2024-08-hacs2/updates-repairs.png' style='border: 0;box-shadow: none;' alt="更新 all your Home Assistant from the same place">

不再需要每天访问 HACS 页面来检查更新。它们现在将出现在系统中的相同位置，并且附加组件[更新](https://my.home-assistant.io/redirect/updates/)以本机Home Assistant格式出现。此外，一旦他们完成更新，他们会给你建议的维修（例如，重新加载仪表盘或重新启动Home Assistant）。

### 其他改进 <!-- omit from toc -->我们还重新命名了一些东西，以帮助它们更有意义，包括将“类别”更改为“类型”，将“Lovelace”更改为“仪表盘”（Lovelace 需要为 [Grace](https://www.home-assistant.io/博客/2024/03/04/仪表盘-chapter-1/#what-is-project-grace) 腾出空间）。我们还包括模板管理，它利用新的[模板类型](https://www.hacs.xyz/docs/publish/template/) 来增强您的 Jinja 模板。

:::注意
**重大变更** - 进行了一些重大变更，例如删除 YAML 配置、不再包括 NetDaemon 类型以及将 [beta 选择移至开关实体](https://www.hacs.xyz/docs/use/entities/开关/)。许多更改更有可能影响那些通过 HACS 共享代码的人，请查看[完整列表的发布说明](https://github.com/hacs/integrations/releases/tag/2.0.0)。
:::

## 什么是 HACS？

Home Assistant 是围绕选择而构建的，HACS 是这一点的缩影，让您可以访问数百个社区制作的集成、响应、主题等。 HACS 实际上并不是“黑客”，因为 Home Assistant 始终允许您添加自定义集成和 UI 元素 - HACS 只是添加了一个简化的界面来查找、安装和更新这些元素。

HACS 代表“Home Assistant社区商店”，尽管名称如此，但它并不出售任何东西 - 它都是免费且开源的。 HACS 是为社区中那些编写自定义代码来解决他们认为 Home Assistant 中缺失的问题的人们提供的。通过将 GitHub 存储库提交到 HACS，他们可以轻松地与社区不受限制地共享此代码。这意味着这些是由上传它们的社区成员维护的，而不是 HACS 或 Home Assistant。如果您想了解有关正在安装的内容的更多信息或报告问题，总有一个指向原始代码的链接。  

只是为了澄清有关 HACS 的最大误解，**它不安装附加组件**。 Home Assistant OS 本身有自己的[Home Assistant 附加组件的内置商店](https://my.home-assistant.io/redirect/supervisor_store/)。附加组件与 Home Assistant 一起运行，而 HACS 安装可以在 Home Assistant 中运行的自定义代码（这对系统稳定性有影响，更多内容见下文）。

## 为什么要使用 HACS？

**更多集成** - 并非所有设备和服务都受到 Home Assistant 开箱即用的支持，HACS 有助于填补这一空白。 HACS 上有数百个集成，其中一些是因为作者没有时间满足 Home Assistant 的要求，而另一些则是在做 Home Assistant 不允许的事情，例如网页抓取（有时这是唯一的方法，但[不是一个好主意](https://github.com/home-assistant/architecture/issues/252)）。请注意，这些决定可能会以牺牲稳定性为代价。

**高级集成** - 一些 HACS 集成是其核心对应项的更复杂和高级版本，而其他集成则结合多个传感器来提供新的数据点。其中一些“集成”甚至为 Home Assistant 提供了高级的新功能和设置。它还允许快速开发，因为它允许在 Home Assistant 刷新周期之外进行更新。

**反应和主题** - 社区开发者和设计师正在构建一些令人惊叹的反应、UI 和主题 - 顺便说一句，如果您是其中之一，[我们的前端团队需要您的帮助](/home-assistant/blog/2024/07/26/dashboard-chapter-2/#process-how-can-we-work-together)。 HACS 使这些设计的安装和更新变得非常简单和快速。

** 脚本和模板** - 这是共享脚本和模板的最简单方法，同时还添加了通过更新向用户推送新改进的功能。

## HACS 简史HACS 于 2019 年启动，是我（[Joakim Sørensen](https://github.com/ludeeus)）第三次尝试建立社区商店。它从小规模开始，很快成为事实上的标准，许多才华横溢的社区创建者提交了他们的项目。 Home Assistant 团队从第一天起就给予了支持，即使 HACS 获得了数十万次下载，我们都同意它应该仍然是 Home Assistant 的可选补充。让用户可以选择向 Home Assistant 添加新功能，但会牺牲稳定性。

我于 2020 年加入 [Nabu Casa](https://www.nabucasa.com/)，部分原因是我在 HACS 方面所做的工作，但我受聘的目的是更广泛地从事Home Assistant工作，而不是 HACS 方面的工作。顺便说一句，我并不是 Nabu Casa 唯一一个开始 HACS 的开发人员：前端团队的 [Paul Bottein](https://github.com/piitaya) 构建了 [Mushroom 响应](https://github.com/piitaya/Lovelace-mushroom)，以及目前支持 Matter 开发的 [Marcel van der Veldt](https://github.com/marcelveldt) 构建了 [音乐助手](https://music-assistant.io/)。

多年来，我在业余时间继续从事 HACS 工作，但原始版本总有一些方面限制了其发展能力。近日，【开放之家基金会】（https://www.openhomefoundation.org/）主动与HACS合作成为合作伙伴，并提供开发支持。来自 Nabu Casa 和社区的许多人都参与了支持，导致了您今天看到的大量改进。

就在我们发布这个重大更新之前，它在 GitHub 上的星数已经突破了 5,000 颗星！正是 HACS 上的项目才造就了今天的样子，我要真诚地感谢所有继续向商店贡献代码的人。

## 如何安装

:::注意
**谨慎行事** - HACS 并不适合所有人。  如果您是Home Assistant初学者或正在寻找智能家居中最稳定的体验，HACS 可能不适合您。这些是社区制作的项目，没有接受与提交给 Home Assistant 的项目相同的严格审查。可能有些项目不起作用，甚至更糟糕的是，会破坏您的系统。与单独运行并与 Home Assistant 一起运行的附加组件不同，HACS 项目直接在 Home Assistant 中运行其代码，这增加了系统崩溃或损坏的机会。在使用 HACS 之前，请务必制作 [系统备份](https://hacs.xyz/docs/use/data/#creating-a-备份) 并将该备份下载到其他设备。
:::

HACS 应该适用于任何最新版本的 Home Assistant，甚至可以在核心安装上运行。它还需要一个 GitHub 帐户。如果您已经安装了 HACS 1.X，请执行备份，进入 HACS，然后单击 HACS 的更新按钮（注意：如果进行更新，则不会降级）。

如果您是 Home Assistant 操作系统用户，这里是安装方法（如果您没有使用我们的操作系统，[访问此页面](https://www.hacs.xyz/docs/use/download/download/#to-download-hacs-核心)），

1. 制作[系统备份](https://my.home-assistant.io/redirect/备份/)并将其下载到其他设备以妥善保管。2. 安装插件：使用[此链接](https://my.home-assistant.io/redirect/supervisor_addon/?repository_url=https%3A%2F%2Fgithub.com%2Fhacs%2Faddons&addon=cb646a50_get)，添加 HACS 插件存储库，并安装它链接到的插件，[![打开您的 Home Assistant 实例并显示插件的仪表盘。](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?repository_url=https%3A%2F%2Fgithub.com%2Fhacs%2Faddons&addon=cb646a50_get)

3. 启动附加组件（无需“启动时启动”，您只需运行一次）。

4. 导航至附加组件的“日志”并按照其中给出的说明进行操作。

5. 完成后，重新启动 Home Assistant 并导航至[设备页面](https://my.home-assistant.io/redirect/devices/)。添加集成 HACS，然后按照说明将其与您的 GitHub 帐户关联。

***已安装，现在做什么？*** 开始下载一些自定义集成和 UI 元素。有很多很棒的社区资源，列出了最佳自定义[集成](https://community.home-assistant.io/c/projects/custom-integrations/47?ascending=false&order=views)、[调整](https://community.home-assistant.io/c/projects/前端/34?ascending=false&order=views)、[主题](https://community.home-assistant.io/c/projects/themes/29/l/top) 等。

## 结论 <!-- omit from toc -->

在这个博客中要感谢的人太多了，他们多年来帮助了HACS的发展。  感谢您提交项目、报告问题、修复代码以及使用这个有趣的小副项目。最重要的是，这要归功于[Home Assistant云订阅者](https://www.nabucasa.com/)。他们使这次更新成为可能，他们不仅支付我的工资，而且还资助开放家庭基金会，该基金会的支持至关重要。