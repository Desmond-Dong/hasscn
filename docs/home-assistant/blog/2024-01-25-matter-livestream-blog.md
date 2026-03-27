---
title: The State of Matter
description: '在两周前的 Matter 状态直播中，我们解释了 Matter 是什么、它与 Thread 的关系，以及如何将它与您可能已经知道的现有协议（例如 Zigbee 或 Z-Wave）进行比较。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# The State of Matter

在两周前的 Matter 状态直播中，我们解释了 Matter 是什么、它与 Thread 的关系，以及如何将它与您可能已经知道的现有协议（例如 Zigbee 或 Z-Wave）进行比较。 

在这篇博文中，我们为您提取了该流的亮点。我们还链接到更新的相关[Matter](/home-assistant/integrations/Matter/) 和[Thread](/home-assistant/integrations/Thread/) 文档。

您可以在这里观看整个直播：

<lite-youtube videoid="rEugjMk-4II" videotitle="状态 of Matter"></lite-youtube>

我们还将在该博客中的每个相应标题下突出显示直播的每个片段，以便您可以开始观看您感兴趣的特定部分！

<!--more-->

## 为什么我们相信物质

<lite-youtube videoid="rEugjMk-4II" videoStartAt="213" videotitle="状态 of Matter"></lite-youtube>

我们相信 Matter：它是开源的，最重要的是，它默认是完全本地化的。 Matter 将使我们能够通过标准化协议来控制从灯光到机器人吸尘器、电视以及许多其他 IP 连接设备的设备。这是朝着拥有更可持续、更无忧的智能家居产品迈出的一大步。因此，Nabu Casa 使用我们从 Home Assistant Cloud 订阅者那里获得的收入（谢谢大家！）来雇用致力于实施 Matter 的开发人员。我们甚至还加入了连接标准联盟 (CSA)——Matter 标准背后的组织——作为参与者，在标准制定过程中占据前排席位并捍卫 [开放家庭价值观](/home-assistant/blog/2021/12/23/the-open-home/)。

Matter 仅一年前推出，而 Zigbee 这样的标准已经推出了二十年，因此在您的期望中考虑到这一点很重要。如果您已经在现有的本地标准（例如 Zigbee 或 Z-Wave）上投入了大量资金，那么 Matter 可能不是您目前的最佳选择。我们认为没有理由扔掉这些当前的智能家居设备，尤其是当它们仍然运行良好时 - 毕竟，可持续性是我们的[开放家居价值观](/home-assistant/blog/2021/12/23/the-open-home/) 之一。但是，如果您对智能家居场景不熟悉，并且正在寻找具有本地、无云标准且即使多年后仍可使用的设备，请密切关注 Matter。该标准正在迅速发展，每年两次重大更新，发布新的设备类型和现有设备的增强功能。

经过第一年，目前 Matter 设备的选择仍然有点有限，但很多公司已经利用这段时间来开发它们，我们预计很快就会发布更多设备。越来越多的公司[加入 CSA](https://csa-iot.org/members/) 并每月采用该标准。我们认为 Matter 将继续存在并将被广泛采用。

## 揭秘物质

<lite-youtube videoid="rEugjMk-4II" videoStartAt="525" videotitle="状态 of Matter"></lite-youtube>

要真正理解我们在 Matter 方面所讨论的内容，我们建议您阅读我们的[更新的 Matter 文档](/home-assistant/integrations/Matter/) 或从我们的直播中观看本章。

<p><img src='/home-assistant/images/blog/2024-01-matter/matter-diagram.png' class='no-shadow' /></p>

在本部分中，我们的产品经理 JLo 使用上面的图表以易于理解、直观的方式解释了 Matter。观看此视频后，您将不再需要了解线程、边界路由器、网桥或其他 Matter 术语。

## Home Assistant 中 Matter 的当前状态在过去的一年里，我们一直致力于为支持 Home Assistant 中的 Matter 设备奠定基础。我们的实现基于官方的 Matter SDK，我们计划让它获得 CSA 的正式认证，以表明它可以在所有带有 Matter 徽标的产品上毫无问题地工作。但我们还没有到那一步。这就是为什么我们在集成列表中仍然将 Matter 标记为 Beta。在我们的实施获得认证之前，这一点不会改变。

我们仍在解决错误、编写文档、添加缺失的功能以及进行大量故障排除。我们并不孤单，因为许多制造商也需要在第一年适应新标准，导致一些早期设备进入市场时不稳定。我们还必须调整我们的Home Assistant操作系统，以使其能够很好地满足 Matter、Thread 及其 IPv6 要求。

这是一段坎坷、有时甚至令人沮丧的旅程，但一切都在慢慢恢复正常。供应商已经解决了 Matter 设备固件中的错误，各种新设备在商店中不断涌现，Matter 1.1 和 1.2 更新为标准带来了大量稳定性修复。 

从我们的角度来看，令人惊讶的是，Matter 在几年前才开始就已经处于这种状态。你可以清楚地看到这么多公司，无论大小，都相信 Matter 并共同努力改进它，所具有的巨大力量。

### Home Assistant 中的 Matter 入门

<lite-youtube videoid="rEugjMk-4II" videoStartAt="2652" videotitle="状态 of Matter"></lite-youtube>

如果你想开始使用 Home Assistant 中的 Matter，那么阅读[文档](/home-assistant/integrations/Matter/) 或观看我们直播的这一章非常重要，这一切都遮盖了。

Matter 有一些你应该知道的问题，而且因为我们仍处于 Beta 阶段，所以并不是一切都像我们希望的那样完美。

如果您遵循文档中的要求/建议，您将看到目前 Home Assistant 中有四种稳定且运行良好的场景：

- 使用基于 WiFi 的 Matter 设备，例如 TP-Link (Matter) 电源插头。
- 使用 Matter 桥，例如 Aqara M2 或 SwitchBot Hub 2。
- 使用基于线程的 Matter 设备；如果您有一台 Apple iPhone 和一个或多个可被 Home Assistant 用作 Thread Border 路由器的 Apple 设备：HomePod gen2、HomePod Mini、Apple TV 4K（带以太网）。
- 使用基于线程的 Matter 设备；如果您有一部 Android 手机和一个或多个可被 Home Assistant 用作 Thread Border 路由器的 Google 设备：
Google Nest Hub v2、Google Nest Hub Max、Google Nest WiFi Pro

这里*非常*重要的是要注意，对于基于线程的设备，当前推荐的设置使用与您拥有的手机类型相匹配的 Apple 或 Google 的边界路由器。请不要担心 - 这并不意味着您必须将您的设备添加到他们的生态系统中。 Home Assistant 将仅使用它们来访问 Thread 无线电网络。 Home Assistant Matter 控制器和您的 Matter 设备之间的通信是完全加密且安全的。使用 Home Assistant 本身作为 Thread 边界路由器（例如，通过使用 Home Assistant Yellow 或 Home Assistant SkyConnect 中的 Thread 无线电）目前仍在开发中，仅建议技术经验丰富的用户使用。目前，由于错误，只能在使用 Android 手机时进行设置。 iOS/Apple 生态系统中的用户尚无法将 Home Assistant SkyConnect 或 Home Assistant Yellow 设置为 Thread 边界路由器。例如，我们建议 iOS 用户在其 Thread 设备附近放置 HomePod Mini 或其他 Apple 边界路由器，以获得所需的 Thread 覆盖范围。或者，您也可以使用基于 WiFi 的 Matter 设备。

### 重要

您“不需要”任何额外的硬件或无线电即可与 Matter 设备配合使用。任何运行 Home Assistant 操作系统的设备，无论是 Home Assistant Green、树莓派还是任何其他安装，都已经是功能齐全的 Matter Controller。您可以直接连接到基于 WiFi 的 Matter 设备。仅当您计划使用基于线程的物质设备时，您才需要线程边界路由器形式的额外硬件。

### 我们关于无忧无虑的 Matter 体验的建议：

- 阅读 Matter 的 [文档](/home-assistant/integrations/Matter/)。
- 最容易上手的设备是基于 WiFi 的 Matter 设备和 Matter 桥接器。请注意，许多拥有 Matter 桥的品牌在 Home Assistant 中也拥有出色的原生集成，并且这些集成可能提供 Matter 标准中尚未提供的功能。
- 您需要运行Home Assistant操作系统。不支持其他安装类型。
- 您需要一个标准（扁平）网络。带有 VLAN、mDNS 响应器等的企业级网络设置打破了 Matter 对网络的期望，因此不受支持。保持简单，它就会起作用。
- 在您的家庭路由器和Home Assistant操作系统上启用 IPv6。您无需从互联网提供商处获取 IPv6，因为 Matter 设备在本地运行。但您确实需要确保它已在您的家庭网络上启用。
- 如果您计划使用基于Thread的Matter设备，您的家中将需要一台或多台[Thread边界路由器](/home-assistant/integrations/Thread/)。 Home Assistant 还可以与 Google 或 Apple 的第三方 Thread 边界路由器配合使用，而无需将您的设备添加到他们的生态系统中。
- 请务必检查设备包装，确保其带有 Matter 徽章。 Thread 也用于其他标准，因此包装上带有 Thread 徽章的设备不一定是 Matter 设备。
- 请注意，Matter 仍处于早期阶段，因此并非您习惯的所有高级功能目前都可以在此标准中实现。

- 使用最新版本的 Home Assistant 和 Home Assistant Companion 应用程序，因为我们正在不断改进 Matter 支持并修复错误。使用最新版本可能会影响是否将设备添加到 Home Assistant。

### 支持

如果您遇到问题，请加入我们的[Discord 服务器](/home-assistant/join-chat/)，我们有专门的 Matter 频道。我们的开发人员和我们社区中许多经验丰富的成员都非常活跃，帮助您解决问题。如果您遇到实际错误，请仅在我们的 GitHub 问题跟踪器上打开问题。

## Home Assistant中物质的未来

<lite-youtube videoid="rEugjMk-4II" videoStartAt="4450" videotitle="状态 of Matter"></lite-youtube>在不久的将来，我们将致力于改善用户使用和管理 Matter 设备的体验。特别是向 Home Assistant 添加新的 Matter 设备应该尽可能没有压力。

<p><img src='/home-assistant/images/blog/2024-01-matter/matter-roadmap.png' class='no-shadow' /></p>

这就是我们现在关注的重点：
- 将设备从Home Assistant“共享”到另一个 Matter 控制器的功能。
- 在 Home Assistant 界面中显示基本设备信息和有关设备的诊断，以及添加一些故障排除选项，例如强制进行完整访谈。

这就是我们接下来要关注的重点：
- 添加 Matter 设备的更简单流程（称为调试的过程），我们逐步指导用户从拆箱设备到能够在 Home Assistant 中控制它。目前，我们关注的是之前提到的稳定场景。这意味着我们正在改进配套应用程序中的调试流程，依靠手机内置的 Matter 功能，并使用（如有必要）由手机供应商（Google 或 Apple）管理的 Thread 网络。
- 更好地处理控制器之间的设备共享（称为多管理的功能）。添加全新的 Matter 设备（调试）和共享已由 Matter 控制器控制的设备（多管理）不属于同一流程。这种差异是由 Matter 标准及其安全功能决定的；当前控制器（管理员）必须允许设备加入另一个控制器。如今，这经常被误解，我们正在努力创建更好的流程，引导我们的用户找到适合其设备的正确路径。
- 我们希望实现当前平台中一些缺失的功能，例如灯光过渡和场景。

从长远来看，这就是我们想要实现的目标：
- 能够使用 Home Assistant SkyConnect 或 Home Assistant Yellow 作为 Thread 边界路由器来连接到基于 Thread 的 Matter 设备，而不是使用 Apple 或 Google 边界路由器。

除此之外，随着新设备类型添加到规范中或扩展现有设备类型，我们将继续致力于扩展对新设备的支持。在某些情况下，制造商甚至自己为Home Assistant做出贡献，以确保支持新的设备类型。 

我们还不断保持 Matter 集成的质量达到 Home Assistant 的标准，并解决用户面临的最具影响力的问题。例如，现在，我们正在确保在 Home Assistant 中更好地处理断电的 Matter 设备。

## 使用 Home Assistant Yellow 或 Home Assistant SkyConnect

<lite-youtube videoid="rEugjMk-4II" videoStartAt="5209" videotitle="状态 of Matter"></lite-youtube>

正如我们之前在讨论推荐场景时提到的，使用 Home Assistant Yellow 或 Home Assistant SkyConnect for Thread 仍在开发中，仅推荐给技术经验丰富的用户。

这就是为什么我们当前建议 Home Assistant Yellow 和 Home Assistant SkyConnect 使用 Zigbee 固件来为您的 Zigbee 网络供电。这是一个稳定的解决方案，自推出这些产品以来一直可靠地工作，并提供了良好的体验。随着我们继续致力于 Home Assistant 中的 Matter，我们现在专注于确保 Thread 体验能够赶上并成为一等公民，从而无需第三方 Thread 边界路由器即可轻松连接到 Home Assistant 中基于 Thread 的设备。 Thread 固件已经在底层实现了完整的功能，但我们仍然需要做一些工作，以使在 Home Assistant 中使用基于 Thread 的设备的体验感觉良好。正如我们在关于Home Assistant Matter 的未来的章节中提到的，我们预计在接下来的几个月内该领域将取得巨大进步。一旦体验得到改善，我们将建议使用此 Thread 固件为您的 Thread 网络提供支持，作为使用 Apple 或 Google 的第三方 Thread 边界路由器的替代方案。

第三种实验性固件选项支持多协议，允许这些产品中的 Silicon Labs 芯片通过一个无线电连接到 Zigbee 和 Thread 网络。当我们推出 Home Assistant Yellow 和 Home Assistant SkyConnect 时，我们宣布打算发布支持多协议的固件，该固件自 2022 年 12 月起提供。它集成了 Silicon Labs SDK，增加了对多协议的支持。在多协议固件的进一步开发和测试过程中，我们得出的结论是，虽然 Silicon Labs 的多协议有效，但它存在技术限制。这些限制意味着与使用专用 Zigbee 和 Thread 无线电相比，用户将无法获得最佳体验。这就是为什么我们不建议使用此固件，并且它将仍然是 Home Assistant Yellow 和 Home Assistant SkyConnect 的实验性功能。如果您当前已安装多协议固件，但不主动使用它连接到 Thread 设备，我们建议您[禁用多协议](https://skyconnect.home-assistant.io/procedures/disable-multiprotocol/)。

对于对体验感到满意的多协议固件的当前用户来说，没有任何变化。实验性多协议固件将仍然可用，但我们不会向新用户推荐它。相反，我们将专注于确保专用 Zigbee 和 Thread 固件为用户提供最佳体验。

## 谢谢

在实施 Matter 的第一年之后，我们很高兴技术基础状况良好。我们现在可以采取后续步骤来确保整个 Matter 体验尽可能好！感谢所有与我们一起踏上这段旅程的用户，他们向我们提供了宝贵的反馈和错误报告，并分享了他们的经验，以便我们知道如何使 Home Assistant 中的 Matter 变得更好。感谢所有直播观众以及直播前和直播期间提出问题的所有人；您的意见有助于我们使这些直播达到最佳状态。如果您一路走到这里——感谢您的阅读！

如果您对 Home Assistant 中的 Matter 有任何疑问或遇到问题，请加入我们的 [Discord 服务器](/home-assistant/join-chat/)！我们在那里有一个专门的 Matter 频道，我们的开发人员和社区中许多经验丰富的成员可以为您提供帮助。