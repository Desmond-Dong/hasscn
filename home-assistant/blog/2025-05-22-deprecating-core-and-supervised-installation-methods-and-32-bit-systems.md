# 弃用 Core 和 Supervised 安装方法以及 32 位系统

<img src='/home-assistant/images/blog/2025-05-deprecation/art.png' style='border: 0;box-shadow: none;' alt="弃用核心和受监管模式安装方式以及32位系统">

我们今天正式弃用两种安装方法和三种旧版 CPU 架构。我们总是努力让 Home Assistant 运行在几乎所有东西上，但有时我们必须做出艰难的决定来保持项目的进展。尽管这些变化只会影响一小部分 Home Assistant 用户，但我们希望尽一切努力，让那些可能需要迁移的人能够轻松实现这一点。
从 Home Assistant 2025.6 开始，受影响的系统将在更新后显示通知，表明**支持将在六个月后结束（发布 2025.12）**，并包含[迁移到受支持的系统](#how-to-migrate)的建议。在这篇文章中，我们将在向社区咨询这些变化后，探讨我们对这些弃用的想法以及我们的发现。
我们已弃用以下安装方法：

* **Home Assistant 核心** 安装方法，在 Python 环境中运行系统，不要与容器混淆（例如，在 Docker 中运行系统）。
* **Home Assistant 的受监管模式** 安装方法，包括运行您自己的操作系统，然后在此基础上安装 Supervisor 和其他要求。
  这些是高级安装方法，只有一小部分社区选择使用它们。如果您正在使用这些方法，您可以继续这样做（您甚至可以继续更新您的系统），但六个月后，您将不再受到支持，我将在下一节中解释其影响。在我们的下一次发布 (2025.6) 后，将对这些安装方法的引用将从我们的文档中删除。今后，[Home Assistant OS](https://github.com/home-assistant/operating-system) 和 [Home Assistant Container](https://hub.Docker.com/r/homeassistant/home-assistant) 将成为唯一受支持的安装方法。
  将来，将仅使用当前支持的 64 位架构（aarch64 和 amd64）。以下旧架构已被弃用：
* **i386**（32 位 x86）是 Intel 和 AMD 在 2003 年之前主要使用的架构，但一些后来的处理器仍然使用它（例如早期的 Intel Atom 型号）。
* **armhf**（32 位 ARM 硬浮点）被非常早期的单板计算机使用，特别是最初的树莓派。
* **armv7**（32 位 ARM）被许多早期的单板计算机使用，最著名的是树莓派 2。
  如果您是少数拥有使用这些架构的系统之一，则更新到 2025.6 后您将收到一条通知，其中将描述如何迁移您的系统。六个月后，您的系统将不再受支持并且不再接收更新。
  [查看我们的指南，看看您当前的 Home Assistant 安装是否受到影响。](#check-if-youre-affected)<!--more-->

## 已弃用和不受支持是什么意思

用最简单的术语来说，弃用是指您停止向用户推荐某个功能，因为您打算很快将其删除。由于我们今天弃用了核心和受监管模式安装方法，这意味着我们现在正在努力从文档中删除对它们的所有引用。目标是引导新用户采用我们计划长期支持的安装方法，并阻止使用那些正在逐步淘汰的方法。
尽管它们已被弃用，但我们承诺再支持六个月（直到发布 2025.12），让现有用户有时间迁移到 Home Assistant OS 或 Container。 During this time we will ensure these 安装 types keep functioning as normal during the deprecation period. However, after those six months have elapsed, these methods will become unsupported, which means issue reports will no longer be accepted. As these 安装 methods are used for the development of Home Assistant, it will still be technically possible to 更新 them. We still would recommend migrating to a supported method, but that's your choice.
由于 i386、armhf 和 armv7 架构也已被弃用，我们目前正在从我们的文档中删除对它们的引用。更重要的是，他们还将享受六个月的支持窗口。支持结束后（从版本 2025.12 开始），我们将不再构建或发布针对这些平台的发行版或容器。这将意味着六个月后，这些系统将不再有更新，如果用户遇到问题，他们将无法再向 Home Assistant 维护人员寻求支持。

## 为什么我们做出这个决定

\###核心及受监管模式

<p class='img'><img src='/home-assistant/images/blog/2025-05-deprecation/analytics.png' alt="操作系统和容器代表了绝大多数安装方法">来自我们的<a href="https://analytics.home-assistant.io/">选择加入分析</a></p>

核心和受监管模式的安装方式不仅对用户安装和维护来说比较复杂，对Home Assistant团队的支持也具有挑战性。过去，在 Home Assistant 开发之外，还有令人信服的理由来运行这些安装方法，但对于大多数人来说，这些理由正在消失。 Home Assistant OS 功能强大，具有丰富的附加组件生态系统，同时也易于在虚拟机中运行。 容器的采用已经成为主流，现在随着系统拥有更多的资源来运行它们而被广泛使用。我们看到核心和受监管模式的安装比例逐年下降（目前分别为 2.5% 和 3.3%）。
由于核心模式和受监管模式维护起来更加复杂，因此会产生更多更难解决的问题。这种复杂性给我们社区驱动的支持系统带来了不成比例的负担，在该系统中，志愿者慷慨地投入时间来帮助他人。它还需要花费时间来帮助绝大多数采用更易于维护的安装方法的用户。除此之外，新用户有时可能会被引导去运行核心或受监管模式，并获得糟糕的体验，从而可能导致他们放弃家庭自动化的最佳方式。通过将我们的支持和文档集中在操作系统和容器方法上，我们可以极大地改善入门体验并确保新用户更顺利地开始。

### 旧版 32 位架构

尽管 Home Assistant 非常精简，并且可以在较旧或低规格的硬件上运行良好，但我们不推荐使用的架构绝对属于精简的一侧。这或许可以解释为什么我们看到如此低的使用率，i386 和 armhf 架构分别占安装量的不到 0.5%，而 armv7 仅占安装量的 0.95%。超过一半使用armv7的家庭助理系统拥有能够运行64位操作系统的硬件，例如树莓派3和4。该硬件实际上可以升级并迁移到我们的家庭助理操作系统支持的64位版本
更广泛的软件和硬件行业也已经放弃了这些旧的 32 位系统。大多数都采用了 64 位架构，例如 amd64 和 aarch64，并且我们看到越来越多的项目不再支持这些 32 位架构。已经有几个例子表明，保持对这些架构的支持阻碍了新功能的开发。

## 您的反馈

对于任何重大变化，我们的目标是确保社区指导这一决策。当我们的维护人员最初提出这些弃用建议时，我们与社区（在我们的论坛、GitHub、Discord、Reddit 和其他社交渠道中）分享了该计划，并用它来收集反馈。这是一次建设性的、文明的讨论，我们学到了一些有趣的事情，帮助我们推动这一决定。
首先，我们目前的措辞让社区感到困惑。 Core 和 Supervisor 是 Home Assistant OS 的组件，但安装方法的名称也相似或相同，这对于新用户来说不是很清楚。我们还发现这些安装方法以我们从未预料到的方式使用，并且有很多人已经以自定义和不受支持的方式运行 Home Assistant，甚至没有意识到它们不受支持。
许多受影响的人要求获得有关如何迁移的更好指导。很多人都不知道我们将备份和恢复功能扩展到所有安装方法，从而显着平滑了他们向新平台的过渡。

## 检查您是否受到影响

<p class='img'><img src='/home-assistant/images/blog/2025-05-deprecation/system-information.png' alt="系统信息对话框是什么样子的">蓝色箭头显示您的安装类型，红色箭头显示体系结构。</p>

如果您不确定正在运行哪种**安装方法**：

* 选择[此链接](https://my.home-assistant.io/redirect/system_health/) 或导航&#x81F3;***设置 > 系统 > 修复***，选择右上角的三点菜单，然后选&#x62E9;***系统信息***。
* 检查安装类型字段。如果您正在运行 Home Assistant OS 或 Container，则没问题，因为安装方法弃用不适用于您。
  在这个[同一窗口](https://my.home-assistant.io/redirect/system_health/)中，您还可以找到**架构**：
* CPU 架构字段将准确告诉您正在使用哪种架构。如果您在这里看到 aarch64 或 x86\_64，那么您没有问题，因为架构弃用不适用于您。

## 如何迁移

<p class='img'><img src='/home-assistant/images/blog/2025-05-deprecation/methods.png' alt="安装方法及其功能">绿色保留，红色已弃用。</p>

如果您已经有一段时间没有迁移 Home Assistant 系统了，那么过去几年里这方面已经改善了很多。切换系统现在已经很简单：先[创建备份](/home-assistant/common-tasks/general/index.md#backups)，下载备份文件，然后在新系统初始化时[恢复](/home-assistant/common-tasks/general/index.md#restoring-a-backup)即可（使用异地备份的 Home Assistant Cloud 用户甚至可以[只用密码恢复](/home-assistant/blog/2025/04/02/release-20254/#onboarding-with-a-home-assistant-cloud-backup)）。现在，每一种 Home Assistant 安装方法都支持备份，而且您可以把任意一种安装方式的备份恢复到另一种安装方式上，而不受架构差异影响。很多情况下，恢复成功之后几乎不需要再做什么（这可能会让一些喜欢折腾的人有点失落）。我们的文档中还提供了[如何在不同硬件上安装 Home Assistant](/home-assistant/installation/index.md) 的完整指南列表。
在考虑迁移到其他安装方法之前，您始终可以选择坚持使用现有的方法。仅仅因为它不再受到 Home Assistant 项目的支持，并不意味着您不能像今天一样继续运行它。这个选择取决于你。
| 需求 | 当前使用 | 迁移到 |
| --- | --- | --- |
| 带附加组件的 Home Assistant | Supervised | Home Assistant OS |
| 不支持 Home Assistant OS 的系统 | Supervised | Container（许多附加组件可以作为容器与 Home Assistant 一起运行） |
| 完全掌控主机系统 | Supervised | 在虚拟机中运行 Home Assistant OS，或使用 Container（搭配附加组件容器） |
| 轻量方案 | Core | Container |
对于 **Home Assistant 核心** 用户来说，最接近的替代方案是 Home Assistant Container，它最常与 Docker 一起使用。如果您可以将设备专用于 Home Assistant，则推荐的安装方法是 Home Assistant OS，它提供类似设备的设置。
对于 **Home Assistant 受监管模式** 用户，我们建议迁移到 Home Assistant OS——它支持受监管模式的所有功能，包括附加组件。如果您想要对操作系统进行更多控制，您还可以在虚拟机中运行 Home Assistant 操作系统，例如使用 Proxmox，或者选择 Home Assistant 容器路径。
对于**已弃用的架构**，通常不存在使用现有硬件的受支持的迁移路径。因此，您需要找到与家庭助理操作系统或容器兼容的替代硬件。二手单板计算机和回收的小型办公机器是经济实惠且可持续的选择。在某些情况下，您的系统可能运行 32 位操作系统，但也能够运行 64 位操作系统（树莓派 3 和 4 是经常运行 32 位操作系统的系统的示例，尽管能够运行 64 位操作系统）。在这种情况下，您需要安装支持 64 位的操作系统并在该系统上恢复 Home Assistant。

## 常见问题

* ***如果Home Assistant核心用于开发，并且是开发者文档的一部分，为什么不直接提供给最终用户呢？***\
  这不仅关系到技术可行性，还关系到在我们的论坛和聊天中帮助和支持人们解决他们的问题和疑问。将这些选项提供给技术水平较低的人员会导致支持查询，如果他们的初次体验不佳，就会对项目产生不良影响。用户可以自由地继续按照他们想要的方式运行他们的系统。
* ***不支持核心或受监管模式---我还能使用它们吗？***\
  即使我们不再支持它们，您仍然可以使用它们。有许多用户通过各种非官方方式运行 Home Assistant。此更改仅意味着我们将从最终用户文档中删除它，并且从官方角度不再建议使用这些安装方法。
* ***关于这些事情的开发者文档会保留吗？***\
  是的，那些将会保留。用于直接在 Python 虚拟环境中运行 Home Assistant 的核心 Python 应用程序的开发人员文档将保留。这就是我们的发展方式。该提案是关于删除最终用户文档和支持。
* ***我可以开始维护这些安装方法吗？***\
  虽然维护这些方法需要付出努力，但社区可以自由地将文档和代码移动到新的独立项目。我们的维护人员将不再接受问题或提供最终用户文档，但这不应阻止任何对它们充满热情的人继续运行它们，或帮助其他人做同样的事情。
* ***我可以重现您提供的任何安装吗？***\
  是的，当然！我们所有的管道都是开源且透明的，您可以随时重新创建我们的任何管道并发布工件；自动或手动。
* ***这是家庭助理闭源的第一步/proprietary/commercial?***\
  不，那是不可能的。 Home Assistant 将永远保持开源。 Home Assistant 由 [Open Home Foundation](https://www.openhomefoundation.org/) 所有，这是一家瑞士非盈利基金会，接受审计和管理，并受法律约束，履行其使命。这意味着它永远是开源的，不能买卖。
