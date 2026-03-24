---
title: 用开放标准迎接假期
description: 开放标准相关消息密集发布，快速汇总一下。
---

这一周关于 IoT 标准的公告很多，所以我想做个快速汇总，并聊聊这些变化可能会如何影响 Home Assistant 用户。

## 新 IoT 标准发布

时隔不久，行业又宣布了一项新的 IoT 标准计划，名为 [Project Matter](https://buildwithmatter.com)（原名 “Connected Home over IP”）。这个标准有几个值得关注的点：

该标准将是免版税的。这意义重大，因为它会让企业更容易构建产品。以 HomeKit 为例，它是一个很优秀的基于 IP 的本地标准，但 HomeKit 的授权和版税要求严格，限制了它的大规模普及。

新标准的规范将与其开源实现同步推进。等它完成后，我们就可以把这一实现集成到 Home Assistant 中。

最后，Apple、Google 和 Amazon 都深度参与其中，甚至贡献了各自已有的 IoT 标准来帮助启动这套规范。这会显著提高它们把该标准集成进自家产品的概率。由于这些产品覆盖面极广，也会带动更多公司采用该标准，从而实现更广泛普及。

不过别抱太高预期。制定标准需要时间。他们的目标是在 2020 年底发布草案，而且那还只是规范本身，并不是实际设备。如果（而且这是个很大的“如果”）一切顺利，这个标准大概会在 2022 年进入你的家庭。

<!--more-->

## Z-Wave 将成为开放标准

Silicon Labs 与 Z-Wave Alliance 已宣布，计划在 2020 年下半年[开放 Z-Wave](https://news.silabs.com/2019-12-19-Silicon-Labs-and-Z-Wave-Alliance-Expand-Smart-Home-Ecosystem-by-Opening-Z-Wave-to-Silicon-and-Stack-Suppliers)。这将允许其他公司制造 Z-Wave 无线芯片，从而可能带来更广泛的采用和更低成本的设备。

## 开源 HomeKit Accessory Development Kit

作为 Connected Home over IP 公告的一部分，Apple 发布了其 Accessory Development Kit（ADK）的[开源版本](https://github.com/apple/HomeKitADK)。ADK 让设备可以被 Home Assistant（当然也包括 iOS 设备）这类 HomeKit 控制器控制。该规范此前已经开放，Home Assistant 也已通过 [HomeKit 集成](/home-assistant/integrations/homekit/)实现支持。现在 ADK 开源依然很有价值，因为它提供了规范应如何落地的参考实现。

## 彩蛋：deCONZ hass.io 插件支持 Ingress

这件事不算完全相关，但也有点关系。deCONZ 是可搭配 Conbee Zigbee 网关使用的 Zigbee 控制软件。它是 Home Assistant 的白金级集成，我们一直在与 deCONZ 和 Conbee 背后的公司 [Phoscon](https://phoscon.de) 合作，为 Hass.io 插件加入 Ingress 支持。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wait... did I just 发布 the deCONZ 插件 4.0 for <a href="https://twitter.com/home_assistant?ref_src=twsrc%5Etfw">@home_assistant</a> with Ingress support? 🎉<br><br>Thanks to <a href="https://twitter.com/phosconde?ref_src=twsrc%5Etfw">@phosconde</a> for solving the last issues in deCONZ 2.05.72, that allows for this awesomeness! <a href="https://t.co/t9aVNdLJEg">pic.twitter.com/t9aVNdLJEg</a></p>&mdash; Franck Nijhof (@Frenck) <a href="https://twitter.com/Frenck/status/1207770759273353231?ref_src=twsrc%5Etfw">December 19, 2019</a>
</blockquote>
