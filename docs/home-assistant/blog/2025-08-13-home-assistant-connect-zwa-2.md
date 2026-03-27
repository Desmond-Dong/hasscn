---
title: Z-Wave 重生 - Home Assistant Connect ZWA-2
description: '<img src=''/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/art.webp'' style=''border: 0;box-shadow: none;'' alt="Z-Wave 重生 - Home Assistant。'
---
# Z-Wave 重生 - Home Assistant Connect ZWA-2

<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/art.webp' style='border: 0;box-shadow: none;' alt="Z-Wave 重生 - Home Assistant Connect ZWA-2">

隆重推出 [Home Assistant Connect ZWA-2](/home-assistant/connect/zwa-2/)，这是将 Z-Wave 设备连接到 Home Assistant 的终极方式。其优化的天线和与 Home Assistant 的无缝集成对于当今使用 Z-Wave 的任何人来说都应该是一个重大升级。
如果您没有使用 Z-Wave，那么是时候再看一下了，因为 Connect ZWA-2 是一款不同的产品。这可能正是您到达家中甚至更远的棘手地点所需要的。 Connect ZWA-2 支持 Z-Wave 长距离，这一现代标准提供了卓越的覆盖范围以及更灵敏、电池效率更高的设备。每个家庭都是不同的，但我们的测试人员在他们曾经认为不可能的地方实现了连接。
只需 **69 美元或 59 欧元** 即可加入智能家居系列革命（这是建议的建议零售价，定价会因零售商而异）。有关详细信息、规格和购买地点，请访问我们的 [Home Assistant Connect ZWA-2 页面](/home-assistant/connect/zwa-2/)。今天即可购买。请继续阅读，了解终极 Z-Wave 升级的内容。
<a href="/home-assistant/connect/zwa-2" style="display:block;text-align:center;"><img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/buy.webp' style='border: 0;box-shadow: none;' alt="购买 Home Assistant Connect ZWA-2"></a>
<!--more-->

## 我们喜欢开放标准
开放标准使您可以将设备直接连接到家庭助理以进行本地私人控制，并且即使制造商消失也可以继续工作多年。为了尽可能无缝地连接这些标准，我们喜欢构建自己的硬件。
2022 年末，我们推出了 [Home Assistant Connect ZBT-1](/home-assistant/connectzbt1/)（以前称为 SkyConnect），这是一款适用于 Zigbee 和 Thread 的 USB 适配器。它使这两种协议都更容易上手，销售也为家庭助理的开发提供了资金。我们知道下一个要解决的标准是 Z-Wave，在又发布了几次硬件（[Home Assistant Green](/home-assistant/green) 和 [Voice Preview Edition](/home-assistant/voice-pe/)）之后，我们终于有时间把它做好了。
### 为什么是 Z-Wave？
如果您是 Z-Wave 的新手，它相对于其他开放标准的主要优势是它使用 sub-GHz 无线电波，这种无线电波更容易穿过厚墙并到达大家庭。虽然 Wi-Fi、蓝牙、Zigbee 和 Thread 都在争夺同样拥挤的空域 (2.4 GHz)，但 Z-Wave 在自己安静得多的频谱 (865-926 MHz) 中运行。 Z-Wave 的射程非常出色，但其新的 [Z-Wave 长射程变体](https://z-wavealliance.org/what-is-Z-Wave-long-range-how-does-it-differ-from-Z-Wave/) 在此基础上更进一步……_但稍后会详细介绍_。
由于该标准已有 20 多年的历史，因此它花了很多时间来解决任何问题，但它也有超过 4,500 个经过认证的设备可供选择。我们的选择加入统计数据显示，目前有超过 130,000 个家庭助理家庭正在使用 Z-Wave。多个 [Works with Home Assistant](https://works-with.home-assistant.io/) 合作伙伴正在打造令人惊叹的 Z-Wave 产品，包括 [Zooz](/home-assistant/integrations/zooz/)、[Shelly](/home-assistant/integrations/shelly_zwave/)、[Ultraloq](/home-assistant/integrations/ultraloq/)、[Leviton](/home-assistant/integrations/leviton_z_wave/) 和 [Homeseer](/home-assistant/integrations/homeseer/)。您还可以前往任何当地市场并购买任何可用的 Z-Wave 智能设备，无论其年龄有多大，它仍然会与 Home Assistant 连接！
## 深入连接ZWA-2
自 Connect ZBT-1 推出以来，我们学到了很多有关硬件的知识，而且我们也知道我们可以为 Home Assistant 上的 Z-Wave 注入新的活力。制造这款设备是我们升级 Connect 平台并建立我们的**第二代**的开始，这一切都是为了构建最高性能和开放的设计。这就是为什么我们直接跳到 _two_ 来购买 Connect ZWA-2！
### 要么做大，要么回家
为了成为最具性能的产品，我们知道我们必须放弃“棒”形状因素。它从来都不是理想的，因为 USB 端口会输出大量干扰。我们甚至随 Connect ZBT-1 一起提供了 USB 扩展器，并敦促人们使用它，因为它使设备远离任何嘈杂的组件。我们没有构建一根棍子，而是构建了一个_适配器_，其中包括优化的独立天线和底座，可通过 USB 电缆连接到您的 Home Assistant 系统。
<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/precisely-engineered.webp' style='border: 0;box-shadow: none;' alt="Home Assistant Connect ZWA-2 天线与其他 Z-Wave 天线的比较，显示尺寸差异">

我们不会补偿任何东西；大天线确实有很大的不同。首先，您需要一个尺寸适合您的波长的天线。由于 Z-Wave 处于 sub-GHz 频段，这意味着天线必须比普通 Wi-Fi 天线更长（大约 33 厘米或一英尺是最佳位置）。
您不仅需要优化天线，还需要优化设备的底座（也称为_接地层_）。我们的硬件专家确实深入研究了所有涉及的物理原理，结果不言而喻。基本上，通过选择正确的天线与底座的比例，两者协调工作，以最大限度地扩大信号的范围和可靠性。
虽然一些 Z-Wave 适配器可能声称它们可以使用邮票大小的天线达到最大传输级别，但有时会带来大量干扰。我们已经解决了这个问题。 Connect ZWA-2 可以大声清晰地说话🗣️，更重要的是，它是一个很好的倾听者👂。
### 定位就是一切
拥有一个大型优化天线固然很棒，但放置位置也同样重要。其坚固的底座和尺寸合适的 USB 电缆使其能够放置在正确的位置。您不再需要将悬挂的加密狗隐藏在服务器机柜后面。我们甚至安装了加速计，以确保人们将天线垂直放置，这确保设备位于天线的最佳位置。如果您将其侧放，它顶部的状态灯会巧妙地闪烁。
### 所有 Z 波
Connect ZWA-2 内部包含最新的 Z-Wave 800 芯片，它支持所有 Z-Wave 设备。我们还获得了 Z-Wave 认证，让您更加安心。这与 Home Assistant 业界领先的 Z-Wave 软件相结合，意味着 Z-Wave 从未如此出色。在您经过认证的智能设备上，您可能会看到 Security 2 (S2)、SmartStart、Z-Wave Plus 或 Z-Wave Plus V2 — 不用担心，我们都支持。我们支持的一项让人们非常兴奋的新功能是 Z-Wave Long Range👇。
### 做多
<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/supports-all-devices.webp' style='border: 0;box-shadow: none;' alt="Home Assistant Connect ZWA-2 的等距视图显示了采用 Z-Wave 800 芯片组的内部 PCB">

将 Z-Wave 的自然能力与优化的天线相结合为我们提供了令人印象深刻的范围，但我们更进一步。我们在 Connect ZWA-2 中添加了 Z-Wave 长距离，这可能是 Z-Wave 迄今为止最重大的更新之一。
<div class="alert">
    <p><strong>Z-Wave 长距离</strong><br>长距离不使用网状网络，其中设备通过彼此中继消息以到达集线器。相反，每个设备都直接与您的集线器通信，这带来了一些好处。它的运行频率与常规 Z-Wave 相同，但功率更高，并采用新技术，使其覆盖范围更远、处理更多设备、响应更快并节省电池。目前，它仅在北美和欧洲提供，并且兼容设备的选择仍在增加。这只是表面现象；有关这项令人印象深刻的技术的更多信息，请阅读<a href="https://z-wavealliance.org/what-is-Z-Wave-long-range-how-does-it-differ-from-Z-Wave/" target="_blank">全面细分</a>来自 Z-Wave 联盟的朋友。</p>
</div>

Z-Wave Long Range 非常不同，它需要自己的独立网络。 Connect ZWA-2 可以**同时**运行 Z-Wave 和 Z-Wave 长距离。当您将具有远程功能的设备添加到 Home Assistant 时，设置向导将允许您选择要使用的网络。通过这种方式，您可以两全其美：为您的旧设备提供强大的网状网络，并为最新设备提供长距离支持（包括支持）。
### 多久？
<p class="img">
<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/zwa-2-prototype-testing.webp' style='border: 0;box-shadow: none;' alt="Dominic 与我们的棒原型以及 DrZWave 与控制器参考设计。 Uwe 在另一座桥上，距离 0.7 英里">
看到背景中的那座桥了吗？我们的原型一直连接到那边的设备。</p>

人们通过 ZWA-2 获得了一些令人印象深刻的结果：
- 您可能已经看过我们的范围测试[​​在之前的博客中](/home-assistant/blog/2024/05/08/zwave-is-not-dead/#range-testing-our-Z-Wave-stick-prototype)。此后，我们优化了设计，实现了 1.5 公里（0.9 英里）的视距范围🤯。这是在不太理想的情况下（下雨并且在车内），我们认为我们可以走得更远。
- 认证工程师说这是“她见过的最好的范围”。
- 另一项测试是通过 Z-Wave 远程通信穿过几层混凝土。
- 拥有室外灯光和内部砖墙的测试人员评论说，这是他们第一次与设备建立可靠的连接。
- 有趣的远程用例包括智能邮箱，当您收到邮件时通知您，或联系花园大门上的传感器。
每个家庭和设置都不同，因此我们无法明确说明您的设备将跨越多远。我们可以说的是，我们测试过的其他产品都无法与 Connect ZWA-2 相媲美。
### 专为家庭助理打造
<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/plug-and-play.webp' style='border: 0;box-shadow: none;' alt="Home Assistant Connect ZWA-2 连接到 Home Assistant Green">

每当我们构建新硬件时，我们都会加强软件开发以配合。您可能已经注意到 Z-Wave for Home Assistant 受到了很多人的喜爱。所有 Z-Wave 用户都将从中受益，当人们购买 Connect ZWA-2 时，他们就是在为这项开发提供资金。
Connect ZWA-2 专为 Home Assistant 打造，因此非常容易上手。我们构建的 Connect ZWA-2 可以支持每个地区，无论您从哪里购买。当您插入 Connect ZWA-2 时，它会使用 Home Assistant 系统中配置的位置自动检测并设置您所在的区域。
我们构建了方便的向导来帮助您设置您的第一个 Z-Wave 网络并指导您设置新设备。向导还可以帮助您通过单击几下即可快速从大多数 Z-Wave 适配器迁移到 Connect ZWA-2。我们还能够直接从 Home Assistant 更新 Connect ZWA-2 的固件，并单击一下即可无线更新 Z-Wave 设备的固件。
### 内部ESP
<p class="img">
<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/zwa-2-pcb.webp' style='border: 0;box-shadow: none;' alt="Home Assistant Connect ZWA-2 外壳外 PCB 正面和背面">
我会节省你打开它的时间；这是 PCB 的正面和背面。</p>

与往常一样，我们使 Connect ZWA-2 易于打开。只需弹出橡胶脚并卸下四颗十字螺丝，无需胶水或夹子阻碍。如果你打开它，你会看到一个熟悉的景象，ESP32-S3。我们将其用作 USB 控制器，并且它不运行 ESPHome。是的，它确实有一个“Wi-Fi 天线”，但我们没有使用它。我们提供了许多易于访问的引脚/pads、开源固件文件、解锁的引导加载程序和优秀的文档，因此请随意修改。我们还将提供所有文件，以便您 3D 打印外壳。
### 融入家中
<img src='/home-assistant/images/blog/2025-08-home-assistant-connect-zwa-2/in-the-home.webp' alt="Home Assistant Connect ZWA-2 位于植物和一些书籍旁边的架子上">

要让 33 厘米（1 英尺）长的东西在家中看起来如此精致，绝非易事。我们模仿了蜡烛的设计，甚至使用天线的顶部作为状态指示器。其优质注塑外观具有高级感，并与我们时尚外观的语音预览版具有许多相同的设计线索。
## 加入智能家居系列革命
去年，我们在博客中宣称“[Z-Wave 并未消亡](/home-assistant/blog/2024/05/08/zwave-is-not-dead/)”，而这款硬件证明了这一信念。即使每周都会发布新技术，但经过尝试和测试的东西仍然有创新的空间。我们将始终支持尊重您隐私的技术，允许您在没有云的情况下控制您的设备，同时保持您家中已有的设备在未来几年正常运行。
在对 Z-Wave 适配器进行了 1600 字的介绍后，我们显然对我们所构建的产品感到非常自豪，并很高兴看到人们会用这种热爱的劳动做出什么令人惊奇的事情。因此，无论您是 Z-Wave 资深人士还是只是对炫酷的新技术感兴趣，请立即查看 [Home Assistant Connect ZWA-2](/home-assistant/connect/zwa-2/)。