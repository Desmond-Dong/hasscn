---
title: SwitchBot 加入 Works with Home Assistant
description: 首批空气净化器和清洁机器人加入该计划，并提供选项
  用于 Matter 和蓝牙连接。
---

<img src='/home-assistant/images/blog/2025-06-switchbot/art.jpg' style='border: 0;box-shadow: none;' alt="SwitchBot 与 Home Assistant 合作">

请欢迎 [Works with Home Assistant](https://works-with.home-assistant.io/) 计划的最新补充，[SwitchBot!](https://www.开关-bot.com/) 今年，该计划出现了许多“第一”，此次发布无疑延续了这一趋势。继续阅读，看看第一款*空气净化器*和*吸尘器/清洁机器人*！更重要的是，SwitchBot 将第一套设备引入到具有多种连接选项的计划中。从他们的 [蓝牙集成](/home-assistant/integrations/switchbot/)、通过集线器的 Matter 或独立的 Matter 设备中进行选择。所有这些都为您提供了如何设置智能家居的更多选择，同时提供了 Home Assistant 的最佳体验。<!--more-->

## 制作开关...机器人
SwitchBot 凭借其原创的手指机器人迅速在智能家居行业获得了关注，这些机器人位于非智能开关上方，并代表您将它们按下。从那时起，它们已经扩展到包括许多其他智能家居设备，如窗帘机器人、集线器、空气净化器和清洁机器人。我们很高兴在今年早些时候的 CES 上亲眼看到这些新产品并与他们的团队见面。
SwitchBot 甚至参与了[社区日](/home-assistant/blog/2025/06/24/community-day-2025-wrap-up/)，在中国深圳举办了一场聚会。我们很高兴“合作伙伴”表明他们热衷于与我们的社区互动，使合作伙伴关系进一步发展，而不仅仅是盒子上的标签。
<div class="警报">
    <p>“在 SwitchBot，我们致力于为用户提供无缝、智能的家庭自动化。通过与 Home Assistant 充满热情、精通技术的社区合作，我们能够突破界限，提供更加集成、直观的体验。我们共同致力于扩展可能性，为用户提供更大的灵活性来连接、控制、优化他们的家庭，并让一切变得简单。”</p>
<em style="文本对齐：右对齐；显示：块；">- Richard Mou - SwitchBot 联合创始人</em>
</div>

## 设备

如果您不知道，Works with Home Assistant 与其他认证计划不同，因为产品经过严格的内部测试，以确保它们开箱即可与 Home Assistant 无缝协作。任何加入的公司还承诺提供长期支持和固件更新，同时成为家庭助理社区的积极力量。 Works with Home Assistant 由[开放家庭基金会](https://www.openhomefoundation.org/) 运营，[Home Assistant Cloud](/home-assistant/cloud/) 订阅者的支持为这项工作提供资金。
SwitchBot 团队特别关注专门针对家庭助理的集成，并一直在努力开发他们的 [蓝牙集成](/home-assistant/integrations/switchbot/)。尽管社区在集成的开发中发挥了核心作用，SwitchBot 非常感谢这项工作，但他们在集成的开发中发挥了更积极的作用。
“协同工作”计划的条款之一是蓝牙设备必须通过保持一定代码质量的集成进行连接（我们在质量等级上将其称为我们的[“黄金层”](/home-assistant/docs/quality_scale/)）。它还必须由制造商自己维护，而不是过度依赖社区成员来完成艰苦的工作。这使得制造商有责任确保他们能够响应错误并保持集成的长期发展。如果您对 SwitchBot 的蓝牙产品感兴趣，但您的家庭助理系统没有内置蓝牙，连接它们的最简单方法是使用 [蓝牙代理](/home-assistant/integrations/ 蓝牙/#remote-adapters- 蓝牙代理)。
如果您更喜欢 Matter，SwitchBot 还提供经过认证可与其 Matter 集线器之一一起使用的设备：[SwitchBot Hub 2](https://www.开关-bot.com/products/switchbot-hub-2) 或 [Hub 3](https://www.开关-bot.com/products/switchbot-hub-3)。还有一些可以通过 Matter-over-WiFi 作为独立设备工作。我们目前正在为该程序测试更多 SwitchBot 的 Matter 设备。
**蓝牙**
- [SwitchBot 门锁 Ultra](https://www.开关-bot.com/products/switchbot-门锁-ultra)
- [SwitchBot 空气净化器](https://www.开关-bot.com/products/switchbot-air-purifier)
- [SwitchBot 空气净化器桌](https://www.开关-bot.com/products/switchbot-air-purifier-table)
- [SwitchBot Leak Detector](https://www.开关-bot.com/products/switchbot-water-leak-detector) - 也可以通过集线器使用 Matter
- [SwitchBot Meter](https://www.开关-bot.com/products/switchbot-meter) - 也可以通过集线器使用 Matter 
- [SwitchBot Meter Pro](https://www.开关-bot.com/products/switchbot-meter-pro) - 也可以通过集线器使用 Matter
- [SwitchBot Meter Pro CO2](https://www.开关-bot.com/products/switchbot-meter-pro-co2-monitor) - 也可以通过集线器使用 Matter
- [SwitchBot Indoor/Outdoor 温湿度计](https://www.开关-bot.com/products/switchbot-indoor-outdoor-thermo-hygrometer) - 也可以通过集线器使用 Matter
- [SwitchBot Curtain 3](https://www.开关-bot.com/products/switchbot-curtain-3) - 也可以通过集线器使用 Matter
- [SwitchBot 接触传感器](https://www.开关-bot.com/products/contact-sensor) - 也可以通过集线器使用 Matter
- [SwitchBot Roller Shade](https://www.开关-bot.com/products/switchbot-roller-shade) - 也可以通过集线器使用 Matter
- [SwitchBot 门锁 Pro](https://www.开关-bot.com/products/switchbot-门锁-pro) - 也可以通过集线器使用 Matter
**Matter-Over-WiFi（独立，无需集线器）**
- [SwitchBot 空气净化器](https://www.开关-bot.com/products/switchbot-air-purifier)
- [SwitchBot 空气净化器桌](https://www.开关-bot.com/products/switchbot-air-purifier-table)
- [SwitchBot 多任务机器人 K20 + Pro](https://www.开关-bot.com/products/switchbot-multitasking-household-robot-k20-pro)
***注意：*** *Home Assistant 容器不支持 Matter，需要 Home Assistant 操作系统。*
## 智能家居是一个干净的家
<p class='img'><img src='/home-assistant/images/blog/2025-06-switchbot/vacuum.jpg' style='border: 0;box-shadow: none;' alt="SwitchBot 的清洁机器人带有空气净化器">尽情享受《Wall-E》</p>

SwitchBot 的 K20 是 Works with Home Assistant 计划中的首款清洁机器人，也是世界上首款多任务家用机器人。这款古怪的机器人可以与该系列中的许多其他产品搭配使用，包括经过认证的空气净化器，以制作一些非常酷的家庭助理用例。想象一下，您正在做一些美味的晚餐，但是哦，不，您将平底锅放置太久，它开始发出气味并燃烧。您可以使用 Home Assistant 语音预览版召唤顶部带有空气净化器的 K20。 片刻之后，它就会来到您身边，开始净化厨房里的空气。另外，由于这些都可以通过 Matter 工作，因此不需要云的参与。有些物品还配有桌面，因此该设备对于行动不便的任何人都有一些很好的应用。
## 机器人的未来
这些设备是第一批经过认证的设备，但 SwitchBot 正在努力通过 Home Assistant 进行更多测试并提供全面丰富的功能。我们很高兴随着时间的推移不断扩展此列表，但如果您等不及了（这项工作只有在我们的 [家庭助理云](/home-assistant/cloud/) 订阅者的支持下才能实现），您可以在[此处](https://www.开关-bot.com/pages/home-assistant) 看到他们正在开发的其他设备的列表。
## 常见问题解答
***问：如果我的设备未在“与 Home Assistant 配合使用”下列出，这是否意味着它不受支持？***
答：不！这只是意味着它没有经过我们团队的测试计划或者不符合计划的要求。它可能工作得很好，并在以后添加到我们的测试中。尽管它可能只具有正在开发的有限功能，或者使用我们当前未在程序中测试的连接类型。
***问：好的，那么 Works with 计划的意义何在？***
答：它强调了我们所知道的与家庭助理配合良好的设备以及长期承诺为这些设备提供支持的品牌。认证协议规定，设备必须在 Home Assistant 中具有完整的功能，无需云即可在本地运行，并且将长期持续这样做。
***问：这些设备是如何测试的？***
答：此列表中的蓝牙设备是使用标准 Home Assistant Green Hub、SwitchBot 蓝牙集成、USB 蓝牙适配器和 ESPHome 蓝牙代理进行测试的。 Matter-over-WiFi 设备还使用 Home Assistant Green 和我们的[经过认证的 Matter 集成](/home-assistant/integrations/Matter/) 进行了测试。如果您有其他硬件设置或集成，这通常不是问题，但我们会针对这些进行测试，因为它们是我们的团队在我们的生态系统中进行认证的最有效方式。
***问：您会在程序中添加更多 SwitchBot 设备吗？***
答：当然！ SwitchBot拥有一套快速增长的产品线，我们正在努力共同认证这些产品线，以完全覆盖所有功能的集成为前提。