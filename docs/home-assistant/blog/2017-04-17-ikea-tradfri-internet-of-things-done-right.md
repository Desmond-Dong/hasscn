---
title: 'IKEA Trådfri: Internet of Things done right'
description: We analyzed the recently released IKEA Trådfri hardware. It is the perfect
  companion hardware to Home Assistant.
---

上个月，IKEA 发布了一套名为 [Trådfri][tradfri] 的全新家庭自动化产品线。其中包括白光灯泡、调光遥控器、色温遥控器，以及运动传感器。经过将近两周的研究，我们得出的结论是：这将成为与 Home Assistant 搭配使用的理想硬件。以下是我们的核心结论：

  - **开箱即用。** 你只需购买已经配对好的灯泡和遥控器就能开始使用。只有当你想为灯光设置定时规则，或者想把手机当作遥控器时，才需要购买网关。
  - **仅限本地的中枢。** 没有会收集你生活数据的云端服务，即使 IKEA 停止支持，它仍然可以继续工作。
  - **基于开放标准。** 设备之间使用 Zigbee，与网关通信则使用 CoAP/dTLS。这意味着你不会被锁定在单一厂商生态中。你可以将它与 Philips Hue 灯泡和其他兼容厂商的产品配对。
  - **价格亲民。** 灯光单买起价为 12 美元，和遥控器打包购买则是 20 美元起（美国价格）。
  - **设计实用。** 网关内置了隐藏多余线缆的空间，遥控器则自带可上墙的磁吸底座。
  - **可订阅变化（本地推送）。** 自动化可以通过订阅网关的变化，立即对设备状态变化作出响应。
  - **将在 Home Assistant 0.43 中完整集成（计划于 4 月 22 日发布）。** 我们的社区构建了独立库 [pytradfri]，并已将其用于 Home Assistant。Home Assistant 会自动发现你网络中的网关，并引导你完成设置。
  - **缺点：目前还没有与其他系统的太多集成。** 有传闻称 Homekit 支持会在 10 月上线，我也预计 Google Home 和 Amazon Echo 最终都会加入支持。在此之前，你可以用 Home Assistant 把它们连接起来。
  - **半个缺点：你无法远程控制灯光。** 因为它仅支持本地控制，除非借助第三方集成，否则你无法远程控制灯光。

点击“阅读更多”即可查看完整分析。

_(注意：我们与 IKEA 没有任何关联，也不会从销售中获得佣金。我们只是他们这条新产品线的忠实粉丝！)_

<!--more-->
## 开箱即用

IKEA Trådfri 专注于最基础也最重要的一点：做出真正开箱即用的产品。他们出售多种调光套装，每套都包含一个灯泡和一个已经配对好的遥控器，用来控制这个灯泡。你只要把灯泡装进灯座，把电池装进遥控器，然后它就能工作了。你不需要购买网关，不需要下载应用，也不需要拿手机来完成设置。甚至，你连互联网都不需要，就能开始使用！

只有当你想把手机当作遥控器，或者想设置家庭自动化时，你才需要购买网关。

## 仅在本地工作

这个网关只在本地工作。它只有在同步时间和检查固件更新时才会连接互联网。这在很多方面都非常出色。

**隐私与安全。** 除了你自己，没有人可以访问你家中的状态信息。而且在家中，你与网关之间的通信是加密的。

**可靠性与速度。** 所有通信始终都在本地完成。即使你的网络断开，你仍然可以控制灯光，自动化也依然会继续运行。即使 IKEA 未来决定停止支持，它仍然能够继续工作。

想更深入了解这个网关的安全性，可以看看 [Matthew Garrett 的这篇博客文章][mjg59]。他的结论是：

<blockquote>
  Overall: as far as design goes, this is one of the most secure IoT-style 设备 I've looked at. I haven't examined the COAP stack in detail to figure out whether it has any exploitable bugs, but the attack surface is pretty much as minimal as it could be while still retaining any functionality at all. I'm impressed.
</blockquote>

## 基于开放标准

IKEA Trådfri 设备使用开放标准 Zigbee 进行通信。网关同时支持 Zigbee，并连接到你的网络，对外提供基于开放标准 CoAP 的 API。API 通信则通过开放标准 DTLS 来保障安全。

因为它基于 Zigbee，你不需要这辈子都只买 IKEA 的设备。例如，Philips Hue 灯泡就可以很好地与 IKEA 网关配对。

不过需要注意的是，有消息称反过来操作，也就是把 IKEA 灯泡配对到 Philips Hue 中枢，目前还不可行。根据 [Philips Hue 支持团队的一篇帖子][hue-support]，IKEA 正在处理这个问题：

<blockquote>
  The non-interoperability between the newly launched IKEA smart lighting products and the Philips Hue bridge has been analyzed. One of the issues found is that the IKEA bulbs report their ProfileID as corresponding to the Zigbee Home 自动化 (ZHA) profile rather than the Zigbee 灯光 Link (ZLL) profile. As the IKEA bulbs do not behave fully compliant with the ZLL standard, they are rejected by the Hue bridge. IKEA is aware of this and informed us their intent is to have the IKEA smart lighting bulbs to work with the Philips Hue bridge.
</blockquote>

## 价格亲民

一只仅支持调光的 IKEA 白光灯泡起价为 12 美元。如果你想要一只能够调节灯光色温、提供不同白光效果（比如放松、冷白、专注等）的白光灯泡，那么价格是 18 美元。这些价格比竞争对手略低一些。目前在 Amazon 上，最便宜的纯调光白光灯泡价格约为 15 美元。

不过，真正让这套系统脱颖而出的，是它那些价格低廉的遥控器和运动传感器。花 20 到 27 美元，你就能买到一只灯泡和一个遥控器。而在 Amazon 上，单独购买 Zigbee 遥控器目前起价就要 21 美元！

遥控器是 [家庭自动化中非常重要的一环][perfect]。由于灯泡必须始终保持通电才能正常工作，所以你需要 Zigbee 开关和遥控器来控制灯光。而它们如此便宜这一点，真的会极大推动普及。

<p class='img'>
<img src='/home-assistant/images/blog/2017-04-tradfri/prices.png' />
不同调光套装的价格。
</p>

## 设计实用

灯泡和网关都采用了简洁的设计，很容易融入你的家居环境。不过他们也悄悄加入了一些非常棒、非常实用的细节。你可以把网关的外壳滑开并打开它。里面有一个小盒子用于放置实际电子元件，但大部分空间都是空的，因此你可以把多余的网线和 USB 线都卷起来收纳在里面！

<p class='img'>
<img src='/home-assistant/images/blog/2017-04-tradfri/gateway.jpg' />
你不需要的线缆都可以隐藏在网关内部。
</p>

另一个很贴心的设计是，遥控器自带可安装在墙上的磁吸底座。

## 可订阅变化（本地推送）

这是一个让我非常兴奋的特性。通过订阅 Zigbee 网络中的变化，Home Assistant 可以在设备发生变化时立即收到通知，并在需要时触发自动化。

这意味着，当你给某个灯泡通电时，你几乎可以立刻在 Home Assistant 中看到它变为开启状态。

[_(Learn more about the different ways IoT 设备 broadcast changes)_][classification]

## 将在 Home Assistant 0.43 中完整集成（计划于 4 月 22 日发布）

Home Assistant 会自动发现你网络中的网关，并引导你完成设置。

在 IKEA Trådfri 发布之后，我们的社区在 [Patrik] 的带领下迅速组织起来，并在 [论坛][forums] 中开始分析它的各个方面。很高兴地告诉你，最终成果是一个用于控制网关的独立 Python 库 [pytradfri]。这意味着从下一个版本 Home Assistant 0.43 开始，我们将自动发现你的网关，并集成你的所有灯光。

我们集成的初始版本还无法从网关流式接收事件。我们仍在研究这部分 API。

<p class='img'>
<img src='/home-assistant/images/blog/2017-04-tradfri/discovery.png' />
在自动发现后，Home Assistant 会提示你完成与网关的配对。
</p>

## 缺点：目前集成还不多

目前最大的缺点是，由于这套系统刚刚推出，可用的集成还不多。有 [传闻] 说 Homekit 支持计划在 10 月到来。而考虑到它的 API 设计方式，我也预计 Google Home 和 Amazon Echo（Alexa）最终都会宣布支持。

由于 Home Assistant 已经可以集成它，你可以用 Home Assistant 作为桥梁连接这些系统。对于 Homekit，可以使用 [Homebridge] 搭配 [Home Assistant 插件][hb-hass]。若要与 Google Home 和 Amazon Echo 集成，可以使用 [Emulated Hue 组件][emulated_hue]。对于 Google Home，你还可以使用 [API.ai 集成][apiai]，而 Amazon Echo 也可以通过 [Haaska] 来实现联动。

## 半个缺点：你无法远程控制灯光

因为这套系统仅支持本地控制，所以你无法远程控制灯光。和前一个缺点一样，你可以通过 Home Assistant 让这套系统具备远程访问能力。

之所以把它归类为“半个缺点”，是因为除了拿来展示炫耀之外，真正需要远程控制灯光的场景其实并不多。尽管这确实是 [很好的营销素材]。

## 结论

借助 Trådfri，IKEA 成功打造出了一套价格亲民且安全的家庭自动化系统，而且没有在功能和设计上做出妥协。它目前仍然存在一些缺点，但我预计这些问题会在未来逐步得到解决。

就目前来看，它将会是与 Home Assistant 搭配使用的理想硬件：本地化、价格亲民，而且安全。更锦上添花的是，本地推送功能会让我们第一时间感知到设备变化。

[tradfri]: http://www.ikea.com/us/en/catalog/categories/departments/lighting/36812/
[mjg59]: http://mjg59.dreamwidth.org/47803.html
[hue-support]: https://开发者.meethue.com/content/philips-hue-and-ikea-tr%C3%A5dfri#comment-2686
[perfect]: /博客/2016/01/19/perfect-home-自动化/#you-should-not-have-to-adapt-to-technology
[Patrik]: https://github.com/ggravlingen
[forums]: https://community.home-assistant.io/t/ikea-tradfri-gateway-Zigbee/14788
[pytradfri]: https://github.com/ggravlingen/pytradfri
[rumors]: https://github.com/bwssytems/ha-bridge/issues/570#issuecomment-293505087
[Homebridge]: https://github.com/nfarina/homebridge
[hb-hass]: https://github.com/home-assistant/homebridge-homeassistant
[emulated_hue]: /integrations/emulated_hue/
[apiai]: /integrations/dialogflow
[Haaska]: https://github.com/auchter/haaska
[great marketing material]: https://i2.wp.com/博客.smartthings.com/wp-content/uploads/2014/06/summer-vacay-683x405-博客.png?fit=683%2C405&ssl=1
[classification]: /博客/2016/02/12/classifying-the-internet-of-things/
