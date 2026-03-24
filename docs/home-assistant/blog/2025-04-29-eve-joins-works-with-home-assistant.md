---
title: Eve 加入 Works with Home Assistant
description: 他们为多款 Matter-over-Thread 设备完成了认证，其中包括一款很酷的户外天气传感器和智能供暖设备。
---

<img src='/home-assistant/images/blog/2025-04-eve/art.jpg' style='border: 0;box-shadow: none;' alt="Eve and Home Assistant collaboration banner">

我们非常高兴地宣布，[Eve](https://www.evehome.com/en) 已加入 [Works with Home Assistant](https://works-with.home-assistant.io/) 计划！Eve 一直站在 Matter 标准的前沿，并推出了很多专注于家庭本地控制与隐私保护的 Matter 设备。这次他们为计划带来了多种设备，其中还有几个“第一次”！

## Open Home 的 Eve 新篇章

Eve 总部位于德国，并且属于 ABB 集团，以打造高质量智能家居设备而闻名。他们是 Matter 的早期支持者，因为这一标准与他们强调本地和私密控制的理念高度一致。用他们自己的话来说，*“没有 Eve 云端，没有注册，也没有追踪，因此你的数据不会被暴露。Eve 设备与智能手机或中枢之间通过本地智能和直接通信协作，不依赖云端。”*<!--more-->

Eve 已为多款设备完成了 Works with Home Assistant 认证，而这些设备都可通过 Matter 直接接入 Home Assistant。如果你还不了解，Matter 是一种开放的智能家居标准，它通过让设备直接连接到 Home Assistant 来实现本地控制，从而让你的智能家居数据留在家中。如果你错过了，我们也想提醒一下：Home Assistant 现在已经[通过 Matter 认证](/home-assistant/blog/2025/03/10/Matter-certification/)！

<p class="img"><img src='/home-assistant/images/blog/2025-04-eve/eve-weather.jpg' alt="Eve Weather"/>专为户外天气监测、Matter 以及一块很酷的分段式 LCD 显示屏而生——我已经想拥有它了</p>

Matter 可以通过以太网和 Wi-Fi 网络连接设备，也可以使用 [Thread](/home-assistant/integrations/Thread/)，而今天通过认证的所有 Eve 设备都采用了 Thread。Thread 设备可以通过像 [Connect ZBT-1](/home-assistant/connectzbt1) 这样的设备直接接入 Home Assistant，也可以借助你家里可能已经存在、来自其他[智能家居生态](/home-assistant/integrations/Thread#google)的中枢（Thread Border Router）接入 Home Assistant。Thread 天生强调高效率，非常适合低功耗或电池供电设备。而且，如果你的智能家居规模扩张到上百个设备（甚至更多 😅），也不会把你的 Wi-Fi 路由器压垮，因为 Thread 是独立运行的。

Eve 不只是 Matter 的支持者；他们还在积极塑造这一标准。他们的团队深度参与 Matter 和 Connectivity Standards Alliance（CSA）的开发工作，而我们也很高兴最近在芝加哥举行的 CSA 会议上与他们建立了联系。他们对 Matter 的投入甚至深入到了授权层面——Eve 会将自己的技术授权给其他制造商，帮助他们拥抱 Matter。事实上，同为 Works with Home Assistant 合作伙伴的 [Motionblinds](/home-assistant/blog/2025/03/27/motionblinds-joins-wwha/) 就使用了 Eve 的技术，并在其认证电机上自豪地标示了 “Powered by Eve”。

<div class="alert">
    <p>"Eve 与 Home Assistant 是打造本地优先、隐私导向智能家居的完美组合。Eve 设备拥有 Matter、Thread 和完全无云连接特性，再加上 Home Assistant 广泛而强大的本地自动化能力，现在每个人都可以按照智能家居本应有的方式来使用它：由你自己掌控。" <em style="text-align: right; display: block;">- Jerome Gackel，Eve Systems CEO</em>
</div>

## 通过认证的设备

如果你还不知道，Works with Home Assistant 与其他认证计划不同，它会在内部进行严格测试，确保产品开箱即可与 Home Assistant 无缝协作。加入计划的公司也承诺提供长期支持和固件更新，并在 Home Assistant 社区中发挥积极作用。Works with Home Assistant 由 [Open Home Foundation](https://www.openhomefoundation.org/) 运营，而 [Home Assistant Cloud](/home-assistant/cloud/) 订阅者的支持正为这项工作提供资金。

Eve 已为以下支持 Matter-over-Thread 的设备完成认证：

- [Eve Door & Window](https://www.evehome.com/en/eve-door-window)
- [Eve Energy Outlet](https://www.evehome.com/en/eve-energy-outlet)
- [Eve Energy Outdoor](https://www.evehome.com/en/eve-energy-outdoor)
- [Eve Energy](https://www.evehome.com/en/eve-energy)
- [Eve 灯光 开关 (U.S. & Canada)](https://www.evehome.com/en/eve-灯光-开关)
- [Eve Dimmer 开关](https://www.evehome.com/en/eve-dimmer-开关)
- [Eve Motion](https://www.evehome.com/en/eve-motion)
- [Eve Custom Smart Blinds](https://www.evehome.com/en-us/eve-blinds-collection)
- [Eve MotionBlinds 升级 Kit](https://www.evehome.com/eve-motionblinds)
- [Eve Thermo](https://www.evehome.com/en/eve-thermo)
- [Eve Weather](https://www.evehome.com/en/eve-weather)

## 你需要的几乎一切

Eve 能加入 Works with Home Assistant 计划真的很棒，因为多年来我们一直都很欣赏他们对隐私和本地控制的坚持。今天他们认证的设备列表相当完整，我甚至敢说，仅凭这些设备你就已经可以打造出一个相当全面的智能家居。这里面还有几个计划中的“第一次”，比如他们的智能暖气阀、户外天气传感器、户外插座，以及防水动作传感器。Eve 也正在持续把他们的整个智能家居产品线迁移到 Matter，所以如果你发现某款设备还不支持 Matter——请继续关注。

### 关于 Works with Home Assistant 的常见问题

- ***如果我手上的设备不在 “Works with Home Assistant” 列表中，这是否意味着它不受支持？*** 不！这只意味着它还没有经过我们团队的测试，可能是因为品牌尚未提交测试，也可能是因为该设备不符合计划要求（例如它不是终端设备，或者需要云连接）。它带来的体验可能没有认证设备那么完善，但如果你已经使用这款设备很久而且一切正常，那也不会有任何变化。我们的社区非常擅长在集成页面列出已经确认可用的设备，所以如果你不确定，先去那里核对一下通常是个好办法。未来我们也许会测试它，但最终提交哪些产品参加测试，仍由品牌自行决定，所以请大胆告诉他们你的需求。

- ***那么，Works with 计划的意义到底是什么？*** 它会突出展示那些我们确认在 Home Assistant 中表现优秀的设备，以及那些长期承诺持续支持这些设备的品牌。认证协议明确规定，设备必须在 Home Assistant 中具备完整功能、可以本地运行而无需依赖云连接，并且这种支持会长期持续。如果你已经拥有这些设备中的一款，恭喜你！你可以安心知道，制造商已经作出长期支持 Home Assistant 的承诺。

- ***这些设备是如何测试的？*** 这份列表中的所有设备都使用标准版 Home Assistant Green、Connect ZBT-1 作为 Thread Border Router 的无线设备，以及我们[已认证的 Matter 集成](/home-assistant/integrations/Matter/)进行测试。 如果你使用的是其他硬件组合，而且它对你来说运行良好，那当然也很好。上面列出的硬件只是我们团队用来保持测试一致性的标准配置。

- ***你们还会把更多 Eve 设备加入这个计划吗？*** 我们始终有兴趣添加更多设备。我们很高兴能与 Eve 团队紧密合作，也期待未来继续把更多很酷的新设备带入计划。如果你有特别希望看到通过认证的产品，也欢迎随时告诉我们！
