---
title: Shelly 加入 Works with Home Assistant
description: '<img src=''/home-assistant/images/blog/2025-07-shelly/art.jpg'' style=''border: 0;box-shadow: none;'' alt="Shelly 加入 Works with Home Assistant"。'
---
# Shelly 加入 Works with Home Assistant

<img src='/home-assistant/images/blog/2025-07-shelly/art.jpg' style='border: 0;box-shadow: none;' alt="Shelly 加入 Works with Home Assistant">

我们很高兴欢迎 [Shelly](https://www.shelly.com/) 加入 [与家庭助理合作](https://works-with.home-assistant.io/) 计划！ Shelly 在我们的生态系统和智能家居领域都非常成熟，因此很高兴正式认证他们选择的 Z-Wave 设备。
他们的改造智能开关和继电器非常出色，可以将各种_哑_设备（例如灯光装置或天花板风扇）转变为您可以以_智能_新方式轻松控制的设备。此外，获得认证意味着它们已经过彻底的测试，确保它们能够提供最佳的 Home Assistant 体验。
各种复杂的设置和功能（例如能源监控）使它们在我们进行高级智能改造的社区中很受欢迎，例如连接旧车库门或电动百叶窗。这些非常适合将非智能设备排除在垃圾填埋场之外并在未来几年内正常工作。<!--more-->

## 从 A 波到 Z 波
Shelly 最初于 2017 年在保加利亚推出，多年来一直是我们社区的中流砥柱。他们最初因其可在本地轻松使用的 WiFi 智能开关和继电器而闻名，但现在提供各种智能设备以及连接它们的方式。对于第一轮 Works with Home Assistant 认证产品，重点是 [Z-Wave](/home-assistant/integrations/zwave_js/) 系列。
 如果您不熟悉 Z-Wave，它是一种成熟的低功耗无线技术，专为智能家居而设计。它使用与 WiFi 完全不同的无线电频谱，这意味着它受到干扰的可能性较小。该频谱使其能够更好地穿过厚墙并进行更远距离的通信 - 通过最近的[长距离](https://z-wavealliance.org/what-is-Z-Wave-long-range-how-does-it-differ-from-Z-Wave/)标准迭代，它们可以[通信更远](/home-assistant/blog/2024/05/08/zwave-is-not-dead/#range-testing-our-Z-Wave-stick-prototype)。
鉴于我们对本地控制的关注，如果您想避免使用云，那么适用于 Z-Wave 的项目是理想的选择。 Home Assistant 将使用 [Z-Wave JS 插件](https://github.com/hassio-addons/addon-zwave-js-ui)（另一个很棒的开放家庭基金会项目）充当您的 Z-Wave 控制器。因此，您只需要一个 Z-Wave 适配器即可与这些设备一起使用。 _如果您还没有购买，您可能需要稍等一下，然后再点击购买按钮_ 😉。
Shelly 与我们一样注重互操作性，产品使用多种协议，同时在全球范围内提供。这些物品对于注重能量的人来说也非常有帮助。它们功耗低、功率计量，并且可以轻松融入您当前的家居装饰，因为它们位于现有开关后面的墙上。
<p class='img'><img src='/home-assistant/images/blog/2025-07-shelly/pm-mini.webp' style='border: 0;box-shadow: none;' alt="Shelly Wave PM Mini 手持，尺寸较小">小型的？这东西是微观的！</p>

## 参与其中
我们很幸运地多次见到 Shelly 团队，他们很友善地在我们的年度“开放家庭状态”活动期间展示了[拉斯维加斯黑帮博物馆如何使用 Shelly 和家庭助理](https://www.youtube.com/live/o4Vctz1_KYE?t=6897s)。五月，他们更进一步，在南佛罗里达州举办了一次[社区日](/home-assistant/blog/2025/06/24/community-day-2025-wrap-up/)。看到加入“Works with”计划的合作伙伴不仅将其视为贴在盒子上的徽章，而且将其视为参与这个令人惊叹的社区并为其做出贡献的真正机会，这真是令人兴奋。
<div class="alert">
    <p>“我们的许多用户已经依靠 Home Assistant 来支持他们的智能家居，我们亲眼目睹了本地控制、隐私和灵活性对他们来说有多么重要。通过加入<i>与家庭助理一起使用</i>计划，我们正在加强我们对开放、可靠的智能家居解决方案的承诺。随着我们即将推出<strong>雪莉波长距离</strong>设备—提供高达<strong>1公里</strong>— 我们正在突破智能家居技术的界限。结合Home Assistant强大的平台，这将是一个<strong>市场领先的解决方案</strong>, 能够覆盖<strong>当今其他生态系统无法达到的用例</strong>。我们正在共同建设智能家居的未来：开放、强大，并为现实世界的需求做好准备。”</p>
<em style="text-align: right; display: block;">- Leon Kralj，Shelly 首席技术官</em>
</div>

## 设备

如果您不知道，Works with Home Assistant 与其他认证计划不同，因为产品经过严格的内部测试，以确保它们开箱即用。任何加入的公司还承诺提供长期支持和固件更新，同时成为家庭助理社区的积极力量。 Works with Home Assistant 由[开放家庭基金会](https://www.openhomefoundation.org/) 运营，[Home Assistant Cloud](/home-assistant/cloud/) 订阅者的支持为这项工作提供资金。
**哪些设备已获得认证？**
- [Shelly Wave PM 迷你](https://www.shelly.com/products/shelly-qubino-wave-pm-mini)
- [雪莉波 i4](https://www.shelly.com/products/shelly-qubino-wave-i4)
- [Shelly Wave 1PM 迷你](https://www.shelly.com/products/shelly-qubino-wave-1pm-mini)
- [雪莉波浪 2PM](https://www.shelly.com/products/shelly-qubino-wave-2pm)
- [Shelly Wave Pro 下午 1 点](https://www.shelly.com/products/shelly-wave-pro-1-pm)
Shelly Wave Pro 1PM 位于电气箱中，而其余设备则位于标准插头、开关或设备后面。这意味着它们是一种极具成本效益的设备改造方式，从而减少电子垃圾。 Mini 非常小（废话），因此即使安装低调，也应该适合家中最狭窄的地方。 Shelly Wave 1PM Mini 是世界上最小的 Z-Wave 智能开关。在世界某些地区，您可能需要合格电工进行专业安装，因此请务必检查您所在地区的法规。如果您是一位自信的 DIY 爱好者，Shelly 在他们的网站上有很多[有用的指南](https://kb.shelly.cloud/knowledge-base/安装-guides)，可以指导您自行安装。
## 许多浪潮中的第一波
这些设备是 Shelly 第一个加入该计划的设备，但肯定不会是最后一个，因为我们期待 Z-Wave Long Range 带来许多令人兴奋的发展。请密切关注我们即将发布的硬件，该硬件将与我们的 Z-Wave 合作伙伴完美配合。
再次感谢您的支持（通过订阅 [家庭助理云](/home-assistant/cloud/) 和 [购买官方硬件](https://www.nabucasa.com/#:~:text=the%20first%20boot.-,Official%20Home%20Assistant%20hardware,-Get%20the%20best)），这使开放家庭基金会能够建立这些合作伙伴关系并认证新设备加入与家庭助理一起工作。
### 常见问题解答
**问：如果我的设备未在“与 Home Assistant 配合使用”下列出，这是否意味着它不受支持？**
答：不！这只是意味着它尚未经过我们团队的测试计划，或者不符合计划的要求。它可能运行良好，但稍后会添加到测试计划中，或者它可能在我们目前未在该计划下测试的不同连接类型下工作。 Home Assistant 中可能还缺少一项功能，我们正在努力添加。
**问：好的，那么 Works with 计划的重点是什么？**
答：它强调了我们所知道的与家庭助理配合良好的设备以及长期承诺为这些设备提供支持的品牌。认证协议规定，设备必须在 Home Assistant 中正常运行，无需云即可在本地运行，并且将长期持续这样做。
**问：这些设备是如何测试的？**
答：此列表中的所有设备均使用标准 HA Green Hub、Z-Wave 适配器以及我们的 [Z Wave 集成](/home-assistant/integrations/zwave_js/) 进行测试。如果您有另一个集线器/适配器/集成，这不是问题，但我们会针对这些进行测试，因为它们是我们的团队在我们的生态系统中进行认证的最有效方式。
**问：您会在该计划中添加更多 Shelly 设备吗？**
答：当然。 Shelly 拥有大量产品线，并将扩大其 Z-Wave Long Range 列表。我们确信他们会让我们的测试人员忙于源源不断地添加设备。