---
title: Heiman 加入 Works with Home Assistant
description: '<img src="/home-assistant/images/blog/2026-02-heiman/art.webp" style="border: 0;box-shadow: none;" alt="Heiman 加入 Works with Home Assistant"。'
  其中包括首批 Matter 一氧化碳报警器。
---
# Heiman 加入 Works with Home Assistant

<img src="/home-assistant/images/blog/2026-02-heiman/art.webp" style="border: 0;box-shadow: none;" alt="Heiman 加入 Works with Home Assistant">

在精彩的 2025 年里，[12 个新的 Works with Home Assistant 合作伙伴](/home-assistant/blog/2025/12/09/wwha-2025-recap/)加入了该计划。现在，是时候向今年首个加入我们的合作伙伴说一声“Hei”了：<a href="https://www.heimantech.com" target="_blank" rel="noopener">Heiman</a>。

Heiman 成立于 2005 年，专注于智能家居安防设备。这次他们为该计划带来了一系列令人印象深刻、以安全为核心的传感器和报警器，其中包括首批通过认证的 Matter 一氧化碳报警器，以及面向国际市场设计的烟雾报警器。<!--more-->

## 保持本地，守护安全

如果你刚接触 Works with Home Assistant 计划，它的目标是帮助你识别那些不仅能与 Home Assistant 出色协作，还支持<a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">开放家庭基金会原则</a>（隐私、选择与可持续性）的设备。

这些价值观都围绕着本地控制展开，而这对于家庭安全尤为关键。你的烟雾和一氧化碳报警器必须在最需要的时候可靠工作，而不应受网络连接或云服务状态影响（当然，如果你希望离家时查看设备状态，[Home Assistant Cloud](/home-assistant/cloud/)可以提供安全的远程访问，而你的订阅也会为这个计划等项目提供资金支持）。

我们的内部团队已对 Heiman 的设备进行了充分测试，以确保它们满足这一关键要求。很高兴地告诉你，它们做到了！而且 Heiman 还更进一步，采用了 [Matter 开放互联标准](/home-assistant/integrations/matter/)...

## 这为什么重要

Matter 诞生的目标就是成为一种以互操作性为核心的统一连接标准。设备不必被锁定在单一厂商生态中，而是可以同时在 Home Assistant 以及 Google Home 等其他平台上运行。

Heiman 的 Matter 设备通过 [Thread](/home-assistant/integrations/thread/) 工作，这又带来了额外优势。Thread 是一种低功耗无线网状网络协议，能够在家中建立更稳健的连接，非常适合既要高效节能、又要保持可靠通信的电池供电传感器，像 Heiman 这类设备尤其受益。

那么，这些特性为什么对安全设备尤其重要？首先，你要知道这些智能设备即使脱离智能功能，仍然能像“传统设备”一样工作。因此，即便你重建 Thread 网络或做一些调整，也始终有兜底方案。如果你的传感器支持本地集成，你就可以自动执行基础检查，比如每月提醒测试一次报警器，或者在硬件故障时发送通知。如果你还想更进一步，烟雾报警器可以触发应急照明，一氧化碳探测器可以关闭燃气壁炉，漏水传感器可以自动关闭水阀，而且整个过程都无需把你的私人数据发给第三方服务器。这正是 Heiman 想要构建的完整、可互操作生态。

<div class="alert">
<p>"我们的核心目标始终是让每个家庭都能享受安全且智能的生活体验。作为全球领先的开源智能家居平台，Home Assistant 拥有开放、包容的生态理念，并且对多品牌、多协议设备具备很强的兼容性，这与我们的产品研发方向高度一致。我们深知，只有融入开放生态，才能打破设备壁垒，为用户提供真正无缝的全屋智能解决方案。"</p>
<em style="text-align: right; display: block;">- Heiman 软件工程经理 Leo Xie</em>
</div>

## 与社区携手合作

Heiman 正在证明他们对这些目标是认真的。除了获得认证之外，他们还计划积极参与 Home Assistant 社区，加入讨论、倾听真实世界的反馈，并根据用户真正的需求持续优化产品。他们也会分享自己在智能家居安防领域的技术专长，与开发者合作探索能够让所有人受益的创新安全场景。

## 设备

Heiman 对开放性和社区的承诺，也体现在我们已认证的这些设备上。它们同时满足美国、欧洲、亚洲等多个地区的严格安全法规。在 Heiman 加入之前，该计划中只有一款 Zigbee 烟雾报警器。现在，我们拥有面向多个地区的 Matter 方案，以及首批通过认证的一氧化碳报警器：选择更多，覆盖更广。

哪些设备已通过认证？

* <a href="https://www.heimantech.com/product/?type=detail&id=127" target="_blank" rel="noopener">Heiman Smart Smoke 报警 (USA)</a>
* <a href="https://www.heimantech.com/product/?type=detail&id=3" target="_blank" rel="noopener">Heiman Smart Smoke 报警 (EU and China)</a>
* <a href="https://www.heimantech.com/product/?type=detail&id=122" target="_blank" rel="noopener">Heiman Smart Carbon Monoxide 报警 (USA)</a>
* <a href="https://www.heimantech.com/product/?type=detail&id=137" target="_blank" rel="noopener">Heiman Smart Carbon Monoxide 报警 (EU and China)</a>
* <a href="https://www.heimantech.com/product/smart-human-infrared-detector-m1-series" target="_blank" rel="noopener">Heiman Motion 传感器</a>
* <a href="https://www.heimantech.com/product/smart-water-leakage-detector-l1-series" target="_blank" rel="noopener">Heiman Water Leak 传感器</a>
* <a href="https://www.heimantech.com/product/smart-temperature-and-humidity-detector-h1-series" target="_blank" rel="noopener">Heiman Humidity and Temperature 传感器</a>

还值得一提的是，Heiman 的全球布局让他们能够以更亲民的价格提供高质量设备。安全传感器和报警器不该是奢侈品，而 Heiman 的做法证明了它们确实不必如此。

## 不用再靠猜了！

亲民定价只是 Heiman 扩大用户选择的一种方式。我们发现，他们同样践行了 Works with Home Assistant 计划背后的其他核心原则：本地控制保护隐私，开放标准保障可持续性。而这也正是我们认证流程的意义所在：让你更容易识别那些真正承诺这些价值观的厂商，减少构建开放家庭时的猜测成本。想查看所有 Works with Home Assistant 合作伙伴的完整信息，请访问我们的<a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener">认证设备列表</a>。

欢迎加入该计划，Heiman！我们很期待看到社区会如何使用这些设备打造更多精彩方案。

## 常见问题

**如果我的设备没有出现在 Works with Home Assistant 名单里，是否意味着它不受支持？**

不是！这只意味着它还没有经过我们团队的测试流程，或者暂时不符合该计划的要求。它完全可能工作良好，并在未来被纳入测试计划。

**明白了，那 Works with 计划的意义是什么？**

它会标记那些我们确认能与 Home Assistant 良好协作的设备，以及那些承诺长期持续支持这些设备的品牌。认证协议明确规定，品牌必须继续支持加入该计划的设备。

**这些设备是如何测试的？**

该列表中的所有设备，都是基于标准的 Home Assistant Green Hub 进行测试，使用 Home Assistant Connect ZBT-2 作为 Thread Border Router，并搭配我们的<a href="https://works-with.home-assistant.io/" target="_blank" rel="noopener">认证 Matter 集成</a>完成验证。

**未来还会有更多 Heiman 设备加入该计划吗？**

当然有可能！我们很高兴能与 Heiman 团队建立紧密合作关系，共同推进即将发布的产品，或将更多尚未列出的产品加入其中。我们也正在与他们讨论一些令人期待的未来计划。
