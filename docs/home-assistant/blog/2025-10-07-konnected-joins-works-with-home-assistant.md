---
title: Konnected 加入 Works with Home Assistant
description: '<img src=''/home-assistant/images/blog/2025-10-konnected/art.webp'' style=''border: 0;box-shadow: none;'' alt="Konnected joins Works with Home Assistant"。'
---
# Konnected 加入 Works with Home Assistant

<img src='/home-assistant/images/blog/2025-10-konnected/art.webp' style='border: 0;box-shadow: none;' alt="Konnected joins Works with Home Assistant">

[Works with Home Assistant](https://works-with.home-assistant.io/) 又迎来了一位新伙伴，他们把首批车库门开门器和报警面板带进了计划，而这些产品底层都运行着 [ESPHome](https://esphome.io/)。[Konnected](https://konnected.io/) 以其能够为你已有设备加入智能能力的产品而闻名，让你既能在 Home Assistant 中使用这些设备，也能延长它们的使用寿命。<!--more-->

## 与 Konnected 连起来

Konnected 在 Home Assistant 社区里早已颇有名气，因为他们多年来一直是活跃成员。作为社区的一部分，他们深知连接家中原有设备有多困难，无论这些设备本身是否智能。这也是为什么 Konnected 的第一款产品就是可直接替换原有报警主机的报警面板板卡，让你能把已有几十年的有线报警系统接入 Home Assistant。

社区曾面对的另一项挑战是车库门开门器（GDO），尤其是基于云的型号。在 Home Assistant 早期，社区曾逆向这些厂商的 API 并据此控制设备。一些制造商注意到这一点后，便[设置障碍](/home-assistant/blog/2023/11/06/removal-of-myq-integration/)，阻止用户控制自己购买的设备，还将其称为“未经授权的使用” 🙄。

社区当然对此非常不满，于是像所有爱折腾的人那样，当云服务挡路时，他们转向了硬件改造。于是，一个旨在重新掌控这些设备的社区逐渐形成，从 ratgdo 这样的项目开始，而 Konnected 的方案也正是基于这些成果发展而来。如今，得益于这些项目，已经有多种优秀的开源工具可以控制大量此类车库门开门器，从 DIY 原理图到成品控制器一应俱全。Konnected 提供了一套可本地运行的开源方案，同时在外形和安全标准上也足够完善。更棒的是，Konnected 设备已经在 60 多个国家销售。

如果你已经用了 Konnected 很长时间，可能会注意到他们原本有自己的集成，但[现在已经弃用](/home-assistant/integrations/konnected/)，转而使用 ESPHome 固件，这样用户始终都能更直接地找到或自行构建所需固件。他们甚至还会[把所有代码都发布到 GitHub](https://github.com/konnected-io) 👏，这也让社区可以帮助他们修复问题并增加新功能。

<div class="alert">
<p>"我们自己从 2018 年起就是 Home Assistant 用户，如今终于正式加入 Works with Home Assistant 计划，真的非常激动。Konnected 与 Home Assistant 共享许多相同的创始理念，包括我们对 100% 本地控制、开源固件，以及让你的家更智能、更安全且人人都能轻松使用的高品质硬件的坚持。"</p>
<em style="text-align: right; display: block;">- Nate Clark，Konnected 创始人 / CEO</em>
</div>

Konnected 也是 [ESPHome](/home-assistant/integrations/esphome/)（Open Home Foundation 旗下项目）催生全新 Open Home 生态的又一个例子。它完全本地运行，非常适合喜欢动手的人，让你可以自己构建 DIY 智能家居设备（可以先从我们的[现成项目](https://esphome.io/projects/)开始）。如果你有问题或建议，Konnected 自己也有一个活跃的[社区](http://community.konnected.io)。

厂商也可以用它来打造预装即用的成品，为用户带来真正无缝的体验。设备可以轻松被发现、接入你的 Wi-Fi 网络与 Home Assistant，并支持在 Home Assistant 中一键更新。如果你想进一步了解 Konnected 如何使用 ESPHome，记得关注 Nate 在 10 月 14 日的下一场 [ESPHome 直播](https://www.youtube.com/watch?v=9YfRkqCdD4c)！

别忘了，像 ESPHome 这样的 Open Home Foundation 项目的开发，依赖 [Home Assistant Cloud](/home-assistant/cloud/) 订阅者以及购买 Home Assistant 官方硬件的用户支持。Konnected 的所有设备都能本地工作；但如果你也希望获得远程访问能力，在外时也能随时查看家中安防状态，那就可以看看 [Home Assistant Cloud](/home-assistant/cloud/)。

## 设备

<p class="img">
    <img src="/home-assistant/images/blog/2025-10-konnected/garage-door-opener.webp" alt="Konnected Smart Garage Door Opener blaQ">
    Konnected Smart Garage Door Opener blaQ
</p>

如果你还不熟悉 Works With Home Assistant 计划，它的作用是帮助我们正式认证那些经过团队测试的设备，让你更清楚哪些产品开箱即能与 Home Assistant 良好配合。加入计划的公司还承诺会提供长期支持与固件更新。Works With Home Assistant 由 [Open Home Foundation](https://www.openhomefoundation.org/) 运营，而 [Home Assistant Cloud](/home-assistant/cloud/) 订阅者的支持则为这项工作提供资金。以下这些产品都由 ESPHome 团队成员在他们自己的家中进行了详细测试。

已通过认证的 Konnected 设备如下：

* [Konnected Smart Garage Door Opener blaQ](https://konnected.io/products/smart-garage-door-opener-blaq-myq-alternative)
* [Konnected Smart Garage Door Opener White (v2)](https://konnected.io/products/smart-garage-door-opener)
* [Konnected Alarm Panel Pro](https://konnected.io/collections/smart-alarm-panels)

## 让一切 Konnect 起来

改造旧有有线安防系统的一大好处，就是不必维护一大堆电池供电的传感器 🪫。Alarm Panel Pro 最多可连接 12 个分区（在安防术语中，就是单个或组合的传感器），还能接入键盘和警号，并为需要供电的设备提供 12V 输出。它可定制性很高，如果你需要[安装帮助](https://support.konnected.io/)，也有很多支持资源可用。它可以通过 12V 供电，也可以通过 PoE 供电，甚至两者同时使用！Alarm Panel Pro 被设计为长期在线运行，而且功耗很低，因此搭配他们的[备用电池](https://konnected.io/products/backup-battery)时，也能轻松运行数小时。

你可能还会好奇，为什么车库门开门器会有两个不同版本。这是因为它们各自支持不同的厂商品牌。Konnected 提供了一个[向导](https://konnected.io/collections/shop-now)，帮助你判断哪一款适合你的开门器。结合 blaQ 和 White 两个版本，你可以获得对一些最大品牌的支持，包括 Chamberlain、LiftMaster、Craftsman、Merlin、Genie、Stanley 等。

即使由 Konnected 来控制你的车库门开门器，你依然可以继续使用原配遥控器，或者原厂 app（如果你愿意忍受那种折磨的话）。GDO White 内置了一个光学激光传感器，用于检测车库门是开还是关。GDO blaQ 则还能控制开门器上的灯光和门锁，甚至可实现部分开启（前提是对应开门器支持这些功能）。

正如我们在开头提到的，很高兴看到有更多产品加入这个计划，帮助人们充分利用自己已经拥有的东西。Open Home Foundation 使命中的重要一环，就是推动智能家居的可持续性，而 Konnected 正在帮助社区延长既有安防系统与车库门系统的使用寿命。

## 常见问题

**问：如果我手上的设备没有列在 “Works with Home Assistant” 中，是否代表它不受支持？**

答：不是！这只表示它还没有经过我们团队的测试流程，或者不符合该计划的要求。它可能完全可以正常工作，只是暂时还没有被加入测试计划；也可能它使用的是我们当前计划尚未测试的另一种连接方式。

**问：那 Works with 计划的意义是什么？**

答：它会突出展示那些我们确认能与 Home Assistant 良好配合的设备，以及那些长期承诺会持续支持这些设备的品牌。认证协议要求这些设备必须在 Home Assistant 中提供完整功能，能够本地运行而不依赖云端，并长期保持这种能力。

**问：这些设备是如何测试的？**

答：这份列表中的所有设备，都是使用标准的 Home Assistant Green Hub 以及 ESPHome 集成完成测试的。如果你使用其他方案，也没有问题；只是我们基于这些方式来进行测试，因为这对团队在我们的生态内完成认证最为高效。

**问：你们会继续把更多 Konnected 设备加入计划吗？**

答：当然有可能！Konnected 也在考虑很快做一些与 Matter 有关的有趣尝试，因此我们很期待继续合作，无论是后续新品，还是把当前尚未列出的其他产品加入计划。
