---
title: Home Assistant 正式通过 Matter 认证
description: '<p<img src=''/home-assistant/images/blog/2025-03-matter-certification/art.jpg'' alt="Home Assistant is officially Matter certified" class=''no-shadow'' /</p。'
---
# Home Assistant 正式通过 Matter 认证

<p><img src='/home-assistant/images/blog/2025-03-matter-certification/art.jpg' alt="Home Assistant is officially Matter certified" class='no-shadow' /></p>

Home Assistant 中的 Matter 现已正式通过认证！🎉 Connectivity Standards Alliance（CSA）已经为 [Home Assistant](https://csa-iot.org/csa_product/home-assistant/) 和 [Open Home Foundation Matter Server](https://csa-iot.org/csa_product/open-home-foundation-Matter-server/) 颁发认证，后者也是首个获得这一认证的开源项目。认证证明，开源项目不仅可以与大型科技公司并肩而立，甚至还能在提供最佳智能家居体验方面做得更好。

作为 [Open Home Foundation](https://www.openhomefoundation.org/) 的一部分，Home Assistant 始终坚定支持开放标准。开放标准体现了我们在智能家居中的核心价值：选择、隐私和可持续性。当一个标准得到良好支持时，消费者就能接触到大量可以长期工作的智能家居设备，这对于可持续性非常重要。最棒的是，它们还可以完全本地运行，让你的智能家居数据留在家里。

正因为这些优势，我们才会把开放标准认证纳入[路线图](/home-assistant/blog/2024/06/12/roadmap-2024h1/#open-standards-certified-quality)。Home Assistant 对 Matter、Zigbee 和 Z-Wave 的实现本就已经是行业领先，因此清晰地向用户传达这一点，并给他们带来真正的兼容性信心，是顺理成章的事。这次认证不仅对 Home Assistant 意义重大，继续往下看，你还会看到它为什么同样能帮助任何想使用 Matter 的开源项目。

<!--more-->

## Matter 很重要

<p class="img"><lite-youtube videoid="rEugjMk-4II" videotitle="状态 of Matter 2024"></lite-youtube>我们在 2024 年的直播对 Matter 做了深入讲解</p>

Matter 是最新的智能家居开放标准，目标是在不同制造商和不同生态系统之间连接并控制智能家居设备。和我们支持的其他开放标准一样，它也可以完全本地控制，这意味着这些设备不依赖云端就能工作。Connectivity Standards Alliance（CSA）是 Matter 标准背后的组织，代表着众多成员公司。他们负责认证设备，并制定设备如何协同工作的规则。

如果你对 Matter 还不熟悉，这一点都不奇怪。虽然它的采用率正在增长，但它其实还只是一个[诞生了几年](https://csa-iot.org/newsroom/Matter-arrives/)的新标准。智能家居领域中最重要的公司都已加入这一标准，但整体支持仍在持续扩展和趋于一致。如果它兑现自己的承诺，任何智能家居产品都应该能在你选择的生态中工作，而这正是我们看好它未来的原因。

越来越多的 Matter 设备正在上市，如果你正在购买新的智能设备，那么拥有一台 Matter 设备只是时间问题 😉。到目前为止，Matter 设备甚至已经成为我们 [Works With Home Assistant](https://partner.home-assistant.io/) 计划的一部分。[Aqara 是第一家](/home-assistant/blog/2024/09/03/aqara-joins-works-with-home-assistant/)携 Matter 设备加入该计划的品牌，我们也亲自测试了这些设备，以确保它们在 Home Assistant 中带来最佳体验。今年，我们预计会有更多 Matter 设备加入该计划，相关更新很快就会到来。

从技术角度来看，Matter 非常有意思——它可以同时与不同的智能家居系统协作。它还将设备连接方式与通信方式分离，使其能够通过 Wi-Fi、以太网和 [Thread](/home-assistant/integrations/Thread/)（一种面向智能设备的新型网状网络技术）连接设备。想更深入了解这个标准，可以阅读我们的 [Matter 状态博客](/home-assistant/blog/2024/01/25/Matter-livestream-博客/)，或者观看 Paulus 在 [the Vergecast Matter Holiday Spec-Tacular](https://youtu.be/0Y75XEXAXfY?si=nSDpP6THkWhkARuc&t=3493) 节目中的分享。

## 认证带来了什么

<p class="img"><img src='/home-assistant/images/blog/2025-03-matter-certification/ha-matter.png' alt="Home Assistant Matter certification"/>好吧，这确实有点……酷</p>

首先，从可用性角度来说，对你而言不会有任何变化。我们一直都是最早采用最新 Matter 版本的实现之一，目前提供的也是最高版本支持。我们会继续以同样的速度改进 Matter Server 和 Matter 集成，确保 Matter 规范中的所有设备类型都能在 Home Assistant 中完美工作——只是从现在开始，它们还会附带这个认证标志。

[Open Home Foundation Matter Server](https://csa-iot.org/csa_product/open-home-foundation-Matter-server/) 现在已经成为官方可信 / 认证的软件组件，而 [Home Assistant](https://csa-iot.org/csa_product/home-assistant/) 则被认证为“用户界面组件”（下文会进一步解释这个区别）。这让我们可以明确展示认证标志，也会被列在 Matter 官方网站上。对于新用户来说，这有助于建立信心，让他们知道这是一种受支持的 Matter 使用方式。同样地，对于还不太了解 Home Assistant 的品牌来说，这些官方背书也很有帮助，而我们的目标之一就是让更多品牌在开发中主动面向 Home Assistant。认证带来的另一项实际好处，是能够更早接触预发布测试设备和 SDK 修订版本，这也会帮助后续开发。

### 为什么需要两个认证（以及服务器附加组件）

<p class="img"><img src='/home-assistant/images/blog/2025-03-matter-certification/ohf-matter.png' alt="Open Home Foundation Matter Server is certified"/>有趣到我们做了两次</p>

如果你不理解为什么我们既为 Home Assistant，也为 Open Home Foundation Matter Server 做了认证，这是因为其中涉及一些法律和流程上的原因，不过这也带来了一些实际好处。我们把服务器作为一个独立组件进行认证，是为了让任何项目都能使用它。每个使用它的项目，包括 Home Assistant，都需要经过一个认证流程，以确认它们使用了一个已认证的“用户界面组件”。Open Home Foundation Matter Server 的认证意味着它能够正确连接并与其他 Matter 设备通信，而 Home Assistant 的认证则主要关系到是否可以展示 Matter 商标。

这种拆分非常重要，因为这意味着我们不需要每次更新 Home Assistant 时都重新走一遍完整认证流程。这样我们就可以让 Matter 相关后端在软件层面和认证层面都保持相对独立。这也是为什么我们仍然需要以附加组件的形式提供 Open Home Foundation Matter Server，而不能把它直接内建到 [Home Assistant 核心](/home-assistant/installation/#about-安装-methods) 中。

## 通往认证之路

获得 Matter 认证并不容易。当我们开始认证流程时，整套流程和工具本来是为测试和认证硬件设备而设计的，而不是用来认证 Matter 控制器，更不用说完全基于软件的（而且还是开源的）控制器了。我们选择与 [Resillion](https://www.resillion.com/服务/conformance-interoperability/wireless-product-testing/Matter-certification/) 合作完成认证。他们是一家位于比利时的测试与认证机构，在 Matter 产品认证方面经验丰富。他们负责正式测试并向 CSA 提交结果。我们与他们共同编写了数千行测试脚本，确保尽可能多的测试用例都能自动化执行。

<p class="img"><img src='/home-assistant/images/blog/2025-03-matter-certification/lab.jpg' alt="Marcel van der Veldt at the Resillion lab"/>我去了 Resillion 的实验室，甚至还自带了白大褂</p>

我们真的非常感谢 Resillion 愿意接受这个挑战。我们不仅是他们认证的首个控制器，而且还一次性覆盖了 Matter 1.3 规范中的所有设备类型。这对所有参与者来说都是一项巨大工程，但现在这些测试脚本已经存在了，以后每次针对新版本重新认证时，只需要进行少量更新，我们就可以反复复用它们。

<div class="alert">
    <p>“在 Resillion，我们坚定支持互联家居技术中的互操作性，并通过保障、安全和创新帮助这项技术真正惠及所有人。对我们而言，这不仅是一次为 Home Assistant 开源项目作出贡献的绝佳机会，也让我们这些在自己家里运行 Home Assistant 的项目爱好者，顺便升级了自家的 Matter 体验。</p>
    <p>“参与一个完整支持 Matter 1.3 特性的控制器项目，是推动 HA 和 Matter 前进的绝佳机会。我们也期待继续支持已开发出的代码库，并进一步为开放智能家居作出贡献。”</p>
    <em style="text-align: right; display: block;">- Jan Claes，Resillion C&I Global 测试服务负责人</em>
</div>

这再次证明了，有些事情只有在 [Home Assistant Cloud](/home-assistant/cloud/) 订阅用户支持下才有可能实现。对于其他开源项目来说，认证可能会非常困难，但我们既拥有构建优秀服务器的资金，也有能力支付所需的测试费用。如今，这个开源实现已经存在，并且可供任何希望加入 Matter 的项目使用。

## Matter 的未来同样重要

随着我们不断改进自己的 Matter 实现，Matter 标准本身也在持续演进。尽管它在过去一年中已经取得了很大进展，但仍然存在一些需要克服的挑战。Matter 完全建立在 IPv6 之上，而它的推广也暴露了当今网络硬件在 IPv6 支持方面的糟糕现状。同时，由于这是一个复杂的标准，像 Thread 和 Fabric 这样的概念对普通用户而言并不容易解释，但希望未来用户无需成为专家，也能在家中充分发挥 Matter 的优势。

有些人可能会把 Matter 看作取代其他一切的智能家居标准，但我们相信多个标准可以并存，而且各自提供独特价值。我们的重点始终是为所有本地智能家居标准提供最高质量支持（[其他标准认证也已经在我们的路线图上](/home-assistant/blog/2024/11/15/roadmap-2024h2/#open-protocols)），并确保它们在未来很长时间内依然可用，这对消费者选择权和可持续性都很重要。

随着 Home Assistant 不断成长，并迈出像认证这样的关键一步，我们在行业中的公信力也会越来越强——这是一个正向循环，会帮助我们和 Open Home 项目持续改进。感谢你的支持，也感谢你帮助我们让这一切成为可能 🙏。

**现在就试试 Home Assistant 中的 Matter：**
[<img src='https://my.home-assistant.io/badges/config_flow_start.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the 仪表盘 of an add-on.">](https://my.home-assistant.io/redirect/config_flow_start?domain=Matter)
