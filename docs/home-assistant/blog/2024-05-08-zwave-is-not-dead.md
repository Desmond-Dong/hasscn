---
title: Z-Wave is not dead
description: Z-Wave 的活力和良好表现，部分归功于正在构建新开源资源的强大社区。
---
<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/art.jpg'/><i>Clelia Rella 艺术</i></p>

**TL;DR：Z-Wave 仍然活跃且发展良好，部分原因在于强大的社区正在构建新的开源资源。为了在未来蓬勃发展，它必须采取进一步措施开放其技术。**

上周，Dominic、Uwe 和我 (Paulus) 参加了在德克萨斯州奥斯汀举行的 Z-Wave 联盟成员会议。这是我们[成为会员](/home-assistant/blog/2024/02/15/nabu-casa-joins-Z-Wave-alliance/) 以来的第一次会议，我们带着一个使命：向联盟成员介绍 Z-Wave 开源社区所做的工作，并寻找新的合作途径。

我们三个人参加了会议，每个人都代表了开放家庭基金会中 Z-Wave 的不同方面： Dominic 是 Z-Wave JS 的创始人和维护者，Z-Wave JS 为 Home Assistant 中的 Z-Wave 集成提供了动力。 Uwe 领导了我们正在开发的 Home Assistant Z-Wave 棒的开发，我在那里负责与其他 Z-Wave 成员进行合作。非常感谢[Home Assistant云订阅者](https://www.nabucasa.com/) – 感谢您，我们可以在 Nabu Casa 全职完成这项工作。

### Z-Wave 的一些背景知识

要在 Home Assistant 中使用 Z-Wave，我们的用户需要购买 Z-Wave 认证的 USB 记忆棒，并将其与 Z-Wave 认证的设备结合使用。然后，Home Assistant 使用 Dominic 开发的 Z-Wave JS 连接到操纵杆，然后我们就可以开始比赛了。 Z-Wave JS 完全在 Z-Wave 联盟之外开发，并且基于 Z-Wave 规范的已发布版本。

Z-Wave 并不总是如此开放 - Z-Wave 曾经由一家公司拥有，后来被 Silicon Labs 收购。 SiLabs 认为是时候进行变革了，并将 Z-Wave 联盟转变为一个由其成员控制的标准开发组织 (SDO)，并且是一个开放的标准。

就目前情况而言，Z-Wave 仍有部分内容尚未开放，包括在 Z-Wave 棒上运行的固件。我可能已经提到过几次，包括在我的主题演讲中，我们应该开放更多。让大家帮忙修复bug、提高代码质量、改进诊断，是一件好事。

<!--more-->

## 开幕主题演讲

我们在加入 Z-Wave 联盟时商定的条件之一是允许我们发表开场主题演讲来解释我们一直在做的工作。在过去 8 年里，Home Assistant 一直在利用 Z-Wave 做自己的事情。我们通过[我们的合作伙伴计划](https://partner.home-assistant.io/) 与 Z-Wave 设备的制造商进行了联系，但从未与联盟建立正式关系。我们决定是时候改变这一点了。

上个月，我们成立了[开放家庭基金会](https://www.openhomefoundation.org/博客/announcing-the-open-home-foundation/)，这是一个非营利组织，致力于为智能家居以及所有居住在智能家居中的人争取隐私、选择和可持续性。 Z-Wave 等开放智能家居标准是实现这一目标的重要组成部分。借助 Z-Wave，您的数据可以留在家里，因为通信完全是本地的。这是一个旨在为消费者提供选择的标准，并且在不依赖云的情况下，设备可以在制造商终止支持后很长时间内继续工作，或者坦率地说不再关心。如果您关注科技新闻，您现在可能想知道：Matter 怎么样？对于 OHF，我们相信选择，包括标准级别的选择。每个标准都建立在不同的技术之上，并且每个标准都有优点和缺点。 Z-Wave 非常出色，因为它无需 Wi-Fi 即可工作，而且其 sub-GHz 频率不太繁忙，因此可以传输更远的距离。

<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/paulus-z-wave.jpeg'/>Paulus Schoutsen 介绍</p>

在联盟的主题演讲中，我介绍了我们与 Home Assistant、Z-Wave JS 和 Open Home Foundation 所做的工作。根据 [我们的选择加入分析](https://analytics.home-assistant.io)，我们 9.7% 的用户使用 Z-Wave。这也意味着 90.3% 的安装只需一根 Z-Wave 棒就能使用 Z-Wave。 Z-Wave JS 具有选择性加入统计数据，显示每个网络平均有 17 个 Z-Wave 设备。 **数学时间：**

<p align="center"><b>
100 万活跃Home Assistant安装量<br>
x<br>
9.7% 使用 Z-Wave<br>
x<br>
17 Z-Wave 设备<br>
=<br>
170万台Z-Wave设备在用</b></p>

当谈到智能家居标准时，所有大型智能家居平台都全力以赴地关注 Matter，并跳过或忘记了 Z-Wave——Home Assistant 除外。我们始终将 Z-Wave 纳入我们的集成列表中，并且是该标准的大力推动者。

在这里，我向联盟介绍了 Z-Wave 的目标：我们希望 Z-Wave 成为一个成功的面向消费者的品牌。 Z-Wave 在美国生产安全产品（如 Ring）的公司中非常受欢迎。然而，消费者并不知道他们正在使用 Z-Wave，因为它是一个实现细节。这阻碍了 Z-Wave 成为一个丰富的生态系统。

对于我们来说，成功意味着有许多制造商生产 Z-Wave 设备，并且用户在每个产品类别中都有丰富的选择。

<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/keynote.png'/></p>

Z-Wave JS 是一个基于已发布的 Z-Wave 规范从头开始创建的独立驱动程序。 Dominic 为此付出了很多努力，他的工作形成了一个由热衷于开发最佳开放式 Z-Wave 驱动程序的人们组成的社区。我们的社区有许多高级用户测试 Z-Wave JS 并确保它可以扩展并适用于新旧设备。

我们正在努力获得 Z-Wave JS 认证，以便让公司考虑采用它。这方面的好消息是——已经有一家公司放弃了已有 20 年历史的 Z-Wave 堆栈，转而采用 Z-Wave JS。让我们加入更多吧！

我们为使 Z-Wave 取得成功所做的努力不仅仅是制作开源 Z-Wave 驱动程序和智能家居平台。我们还创建了 Z-Wave JS 固件更新服务来为 Z-Wave 设备提供更新。为此，我们目前正在与 8 家不同的制造商合作，为 187 设备提供固件。在我的主题演讲中，我告诉听众，我们希望帮助更多制造商为其用户提供更新。

<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/firmware.png'/>向 Z-Wave JS 固件更新服务提供固件的公司。</p>

最后，我结束了推动联盟开放更多的演讲：我们都希望 Z-Wave 取得成功。如果更加开放的话，就更容易被用户采用。这将带来更多的工具、更多的应用程序以及更多的一切。作为回报，这将带来一个更大的 Z-Wave 生态系统，让我们都能蓬勃发展。有些人会为了销售而这样做，或者在我们的例子中，是为了推动重视隐私、选择和可持续性的产品。我们都在这个联盟中，让我们的设备一起工作。我们不要竞争谁能最好地控制 Z-Wave 灯泡。

开源！

## 范围测试我们的 Z-Wave 棒原型

我们团队在 Z-Wave 峰会上的第一站之一是参加 [DrZWave](https://drzwave.博客/) 在科罗拉多河进行的范围测试。这是了解 Z-Wave 棒原型性能的绝佳机会。当其他人测试两侧都使用巨大天线以达到尽可能远的距离时，我们特意选择了[带有微型天线的终端设备](https://www.silabs.com/development-tools/wireless/efr32xg28-explorer-kit?tab=概述)来重现更真实的场景。毕竟，许多野外设备没有空间容纳大型外部天线，而我们希望通过现有网络为用户提供最佳体验。此外，我们还测试了经典 Z-Wave 和 Z-Wave 长距离，因为大多数现有设备仍然使用经典 Z-Wave。

桥上和水边不允许骑自行车和踏板车，所以乌韦那天做了一些锻炼，口袋里装着最后的设备，沿着河来回走了几英里。 Dominic 使用 [Z-Wave JS UI](https://github.com/zwave-js/zwave-js-ui) 和一个简单的脚本执行范围测试，该脚本向末端设备发送开/关命令以使它们闪烁。由于加密，即使是单个损坏的位也会通过闪​​烁模式的中断和来自终端设备的响应丢失而被注意到。

照片中几乎看不出来，但我们在背景中一路到达了桥后面的桥。我们使用了经典的 Z-Wave 和 Z-Wave Long Range，尽管经典的 Z-Wave 在那个距离上并不那么可靠。这是 0.7 英里（1.13 公里）**视线！** 如果另一侧有更好的天线或使用欧盟频率（允许更高的发射功率），那么更远的范围绝对是可能的。

<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/drzwave.jpeg'/>左：多米尼克，有点时差反应，拿着我们的手杖原型（绿色）。右：DrZWave 与控制器参考设计（紫色）。背景：Uwe，0.7 英里外。</p>

## 拔掉电源

随后，每个人都走进去参加拔插盛宴，终端设备和控制器/网关的制造商可以在这里进行连接并测试它们之间的交互效果。以下是 HomeSeer 原型的示例，该原型已在 Z-Wave JS 中得到了大力支持：

<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/unplug.jpeg'/></p>

由于还剩一些时间，我们借此机会对我们的原型和参考设计进行了更多范围测试，这次是在室内通过多层混凝土进行测试。根据终端设备的不同，我们能够在 2 层和 8 层之间架起桥梁。

## Z-Wave JS 无处不在

除了为 Home Assistant 中的 Z-Wave 集成提供支持之外，Z-Wave JS 也是一个很棒的开发工具。 Z-Wave JS 在构建时考虑到了诊断，有助于了解控制器和设备正在做什么以及它们是否按预期运行。

尽管我们一开始是向人们介绍 Z-Wave JS，但我们了解到许多来自老牌公司的工程师已经在使用它进行开发 - 并且在他们的演示中！

<p class="img"><img src='/home-assistant/images/blog/2024-05-zwave-is-not-dead/slide.png'/></p>他们用它来重现问题、进行负载测试、编写脚本来自动执行某些任务，以及运行自己的测试套件。这包括使用 CLI 工具更新固件，例如调查不同 Z-Wave SDK 版本之间的更改。 Javascript API 使得执行任意动作变得微不足道，并自动执行使用基于 UI 的应用程序很难或不可能完成的事情。

另一个有价值的开发工具是 Zniffer，这是一种特殊的 Z-Wave 控制器，可以捕获和解码所有 Z-Wave 无线电流量。与大多数现有工具一样，这需要使用 Windows。在峰会之前，Dominic 已开始致力于在 Z-Wave JS 中添加对 Zniffer 设备的支持。尽管这仍然是一项正在进行的工作，但人们已经将其用于开发目的，并告诉我们他们期待它的正式发布。

## 结论

Z-Wave 是一项功能强大的技术，拥有庞大的安装基础，在某些用例中，它比其他连接标准具有真正的优势。在与联盟成员见面时，我可以看到他们对未来充满热情，但社区将推动 Z-Wave 翻开新篇章。进一步开放 Z-Wave 将为供应商和社区提供支持，并帮助建立一个为每个人提供服务的开放之家，提供更大的隐私、选择和可持续性。