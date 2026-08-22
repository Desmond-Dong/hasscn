# 更强者更进一步：Home Assistant Connect ZBT-2

<img src='/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/art.webp' style='border: 0;box-shadow: none;' alt="The best gets better - Home Assistant Connect ZBT-2">

开始使用 Zigbee 或 Thread 的最简单方式，现在变得更好了：Home Assistant Connect ZBT-2。这个 USB 适配器可直接插入你的 Home Assistant 系统，为你打开一个更广阔的智能设备世界。凭借精心调校的天线和新一代芯片，对于任何想把 Zigbee、Thread 或 Matter 设备直接接入 Home Assistant 的人来说，它都是一次显著升级。

对于所有 Zigbee 爱好者来说，这可能会是你今年最值得做的一次升级。我们几乎把这项技术的每一寸潜力都榨干了，让它在覆盖范围、速度和稳定性上都尽可能做到最好。对于 Thread 用户也是一样（*没错，这个昵称是我刚想出来的* 😎），不论是 Matter 还是 [ESPHome Thread](https://esphome.io/components/openthread/) 连接，都会更加稳固。你可以选择让 Connect ZBT-2 专门运行 Zigbee 网络或 Thread 网络，它都会为对应协议提供最佳体验（如果这些名字对你来说听起来像新出的流媒体服务，那下面我们也会有解释）。

如果你现在还在家里摆着三四个不同的中枢，那你还在等什么——等下一次大规模服务宕机把你的智能家居一锅端吗？是时候摆脱那些云端 Hub，把隐私重新拿回来了。额外的好处是，你的设备往往还能获得更多控制能力、更强覆盖和更高韧性。

产品今天起正式开售，建议零售价为 49 美元 / 45 欧元（具体零售价会因渠道不同而有所差异）。每一次购买，都在支持由 Nabu Casa 与 Open Home Foundation 设计和打造的硬件，也在为 Home Assistant 的持续开发提供资金。若想了解快速参数、详细信息和购买渠道，请访问我们*漂亮极了*的 [Home Assistant Connect ZBT-2 页面](/home-assistant/connect/zbt-2)。

<a href="/home-assistant/connect/zbt-2#buy" style="display:block;text-align:center;">
    <img src='/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/buy.webp' style='border: 0;box-shadow: none;' alt="Buy the Home Assistant Connect ZBT-2">
</a>
<!--more-->

<br>

简短来说，它们都是开放标准，让智能设备可以直接与你选择的智能中枢（比如 Home Assistant）通信。我们喜欢开放标准，因为它们不依赖云端，这意味着设备在你家里始终由你掌控，不会因为厂商哪天不想再付服务器费用就突然变成“电子垃圾”。而且，当它们与 Home Assistant 一起使用时，你的智能家居数据也无需离开家门，这对隐私总是更好的。

**Zigbee** 是一项无线标准，近二十年来一直是智能家居技术的重要基石，支持来自 Philips Hue、IKEA、Aqara、Sonoff、[frient](/home-assistant/blog/2025/09/02/frient-joins-works-with-home-assistant/) 和 [ThirdReality](/home-assistant/blog/2022/10/13/third-reality-partner/) 等品牌的数千款设备。很大概率你家里已经有其中一些设备，而且它们往往自带自己的 Hub。但说实话，这些额外 Hub 只是占地方，把所有东西直接接入 Home Assistant 会更好 😉。

**Matter** 是当前最热门的新标准——[它的技术非常前沿](/home-assistant/integrations/matter/index.md#what-does-thread-have-to-do-with-matter)，发展速度也非常快。它可以通过 Wi-Fi 与设备通信，但如果设备是电池供电的，那大概率会改用 **Thread**。使用 Thread 的 Matter 设备已经越来越成熟，而且其中许多都已经通过 [Works with Home Assistant](https://works-with.home-assistant.io/) 认证，包括来自 [Nuki](/home-assistant/blog/2025/07/03/nuki-joins-works-with-home-assistant/)、[Eve](/home-assistant/blog/2025/04/29/eve-joins-works-with-home-assistant/)、[MotionBlinds](/home-assistant/blog/2025/03/27/motionblinds-joins-wwha/) 和 [Aqara](/home-assistant/blog/2024/09/03/aqara-joins-works-with-home-assistant/) 的产品。

无论你把 Connect ZBT-2 配置成 Zigbee 还是 Thread，都很难选错，因为这两种标准都能覆盖几乎所有智能家居需求。它们都能为设备带来出色的电池续航、减轻 Wi-Fi 压力，而且还有点反直觉地是，[设备越多](/home-assistant/integrations/zha/index.md#using-router-devices-to-add-more-devices)，网络覆盖和稳定性反而可能越好。

## 站在巨人的肩膀上

2022 年，我们发布了 [Home Assistant Connect ZBT-1](/home-assistant/connect/zbt-1/)（最初名为 [SkyConnect](/home-assistant/blog/2024/06/13/zbt1-annoucement/)），它是 Connect 系列的首款产品，也是我们的第一款 USB 适配器。Connect ZBT-1 从设计之初就是为了成为把 Zigbee 设备接入 Home Assistant 最简单、最稳定的方式。它还支持 Thread 连接，而这在当时是非常新的能力。几年过去了，它至今仍然获得软件支持，也是社区中广受喜爱的产品。

<div class="contain">
    <img src="/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/zbt-1-x-zbt-2.webp" alt="The Connect ZBT-1 next to the Connect ZBT-2" style="width:100%;max-width:700px;">
</div>

Connect ZBT-1 的销量帮助资助了 Home Assistant 的开发，而我们从中学到的大量经验，也直接影响了它的下一代产品。遗憾的是，尽管我们非常喜爱小巧的 Connect ZBT-1，但今天我们还是要和它说再见了。我们**现已停止生产 Connect ZBT-1**，不过软件支持仍将继续。如果你还在使用 Connect ZBT-1，请放心，它还会在未来很长时间里继续正常工作。

如果你打算用 Connect ZBT-2 来升级 Zigbee 网络，也别忘了，你依然可以继续把 Connect ZBT-1 用作体验 Thread 的入口——[切换工作模式](https://support.nabucasa.com/hc/en-us/articles/26124710072861-Switching-from-Zigbee-to-Thread-support-on-Home-Assistant-Connect-ZBT-1) 非常简单。

## 全面升级

与前代相比，这一代几乎所有方面都做了升级。首先，产品编号从 ZBT-1 变成了 ZBT-2……数字都翻倍了，那不是已经 2 倍更强了吗！但当然，升级远不止这些。

### 从“棒子”升级到天线形态

为了实现最佳性能，我们首先放弃了过去那种小小的“USB 棒”形态。小巧的 USB 设备确实方便，但 USB 端口周围以及附近电子设备往往会产生干扰，削弱信号。对于 Connect ZBT-1，我们一直建议搭配 USB 延长线使用，以便把适配器远离干扰源。

<div class="contain">
    <img src="/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/antenna-upgrade.webp" alt="Diagram of the how the ZBT-1 antenna compares to the new antenna of the ZBT-2" style="width:100%;max-width:700px;">
    天线尺寸从安全别针级别 🧷，进化成了汤匙级别 🥄
</div>

有了 Connect ZBT-2，这个问题在设计上就被解决了。它现在是一套独立底座加天线的结构，更容易摆放到理想位置，而且这套天线是专门为 Zigbee 和 Thread 精细调校的。更大的天线不仅更擅长把信号发到更远的设备，也更善于接收远处设备发来的微弱信号。我们甚至还优化了底座，底座本身相当于一个“接地平面”，能进一步提升天线性能。包装中还附带 1.5 米（4.9 英尺）USB 线缆，方便你把它摆在一个更理想、干扰更少的位置。

### 四倍速度

Connect ZBT-2 内部采用的是 Silicon Labs MG24，这是一颗先进的 Zigbee / Thread SoC。与 Connect ZBT-1 所使用的 MG21 相比，它拥有更强的处理能力，以及对弱信号更好的接收灵敏度。

<div class="contain">
    <img src="/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/4x-speed.webp" alt="Comparison of the speed (in terms of baud rate) between the ZBT-1 and ZBT-2" style="width:100%;max-width:700px;">
    波特率越高越好 😜
</div>

我们也借机把芯片内部通信速度提高了四倍——将波特率从 115,200 bps 提升到了 460,800 bps。在测试中，我们观察到设备响应速度有稳定提升。别期待灯会快 4 倍亮起来，但当你一次性打开多台设备时，你一定会感受到差异。

### 为 Home Assistant 而生

充分利用这些性能提升其实非常简单，因为我们一直致力于让 Home Assistant 硬件足够容易上手。你只要用附带线缆把设备插到 Home Assistant 主机的空闲 USB 接口上，设置向导就会带你完成后续所有流程。之所以这一切能如此顺畅，是因为把 Zigbee 和 Thread 集成到 Home Assistant 中的那群人，也同时参与了 Connect ZBT-2 的打造。

你可以在几分钟内建立新的 Zigbee 或 Thread 网络，或者使用我们改进过的迁移工具，把已有网络迁移过来。这是一次非常轻松的升级，大多数适配器都只要点几下就能完成迁移。更棒的是，所有升级到新适配器的 Home Assistant 用户都会从这些新的迁移工具中受益。这又是一个典型例子：硬件销售反过来推动了软件开发的提升。

### 兼容性与灵活性

Home Assistant Connect ZBT-2 支持 Zigbee 3.0（没错，我们也在关注 Zigbee 4.0 支持），并且会持续跟进 Thread 的快速演进。我们已经测试了它与 ZHA、zigpy-cli、[Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/faq/#how-do-i-migrate-from-one-adapter-to-another)、Matter.js 和 OpenThread Border Router 的配合情况，表现都非常出色，让你能根据自己的偏好选择管理网络的方式。

只要是经过 Zigbee 认证的设备，或是通过 Thread 工作的 Matter 认证设备，它基本都应该能开箱即用。Home Assistant 本就拥有全球范围内最广泛的兼容列表之一，而我们的社区也会在每次新版本发布后持续扩大这个范围。对于支持该能力的品牌，我们也同样支持设备的 OTA 固件更新。

*需要注意的是：* Connect ZBT-2 同一时间只能运行一种协议，也就是说你必须在 Zigbee 与 Thread 之间二选一。过去我们曾对[同时运行两者](/home-assistant/connectzbt1#:~:text=What%20is%20the%20current%20state%20of%20multiprotocol%20support%3F)做过大量测试，结论是由于各种原因，它并不能很好地工作。

### 第二代平台的力量

我们的第二代 Connect 系列产品强调开放与高性能，而其中一项最能体现这种承诺的设计，就是加入了 ESP32 芯片。Connect ZBT-2 内置了一颗 ESP32-S3 作为 USB 控制器，这对当前任务来说确实有点大材小用，但也因此打开了更多可能性。

ESP32 设备对我们团队和社区来说都非常熟悉。这意味着任何人都可以更改这颗芯片上的固件，并尝试解锁新的有趣能力。比如，我们最近发布的 <a href="/home-assistant/connect/zwa-2">Connect ZWA-2</a> 就使用了同样的芯片，并支持加入新功能的[实验性固件](/home-assistant/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/)。这并不是说我们一定会在 Connect ZBT-2 上做完全相同的事，而是想表达：对于第二代产品而言，未来的可能性几乎没有上限。它出厂时自带的固件只是开始，我们已经在酝酿下一步还能做些什么了。

### 开放设计

<div class="contain">
    <img src="/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/open-design.webp" alt="A look inside the ZBT-2 showing the illustrated PCB and components" style="width:100%;max-width:700px;">
    看看这些裸露的引脚和焊盘 🤤
</div>

当我们说“开放”，那就是字面意义上的开放。就物理结构而言，Connect ZBT-2 很容易拆开，因为它没有卡扣也没有胶水，只有几颗标准十字螺丝。PCB 上还有非常漂亮的丝印，清晰标注了各种芯片、外露引脚和焊盘。

它的 bootloader 没有锁定，而我们构建的所有固件也都是开源的，任何人都可以修改。我们还[构建了一个新网站](https://toolbox.openhomefoundation.org/)，让你能够轻松刷写官方固件，并在未来尝试更多实验性固件。如果你想对 PCB 或外壳进行改造，我们也会提供相应文件。开放能让我们的产品变得更好……这可不是一句空话，因为社区确实会帮我们找到并修复 bug。

### 为什么还是 USB？

在你进入评论区问我们为什么没有上 PoE 之前……我们完全承认 PoE 很酷，但这次它并不是我们选择的方向。没错，PoE 现在确实更容易使用了，而且只要实现得当，性能也能很好（我们在 Connect ZWA-2 上的测试显示，[速度损失其实很小](/home-assistant/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/#performance)）。不过，Connect ZBT-2 的产品目标是极致易用与纯粹性能。话虽如此，基金会内部也有不少 PoE 爱好者，而产品销售又会反过来资助新开发，所以谁知道呢，也许未来我们还是会想办法让大家都满意。

### 别把它藏起来

<div class="contain">
    <img src="/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/dont-hide-it.webp" alt="The Home Assistant Connect ZBT-2 device placed next to a stack of books on a black side table, next to a large green houseplant." style="width:100%;max-width:700px;">
</div>

大多数其他 USB 适配器都被设计成“适合藏起来”的样子，通常只是挂在服务器机柜后面。问题在于，天线朝向其实很重要，而且酷设备就应该摆出来！我们把 Connect ZBT-2 设计成值得被自豪展示的产品，顶部甚至还会像蜡烛一样发光——正好赶上假期季节 🕯️。

## 积少成多

<div class="contain">
    <img src="/home-assistant/images/blog/2025-11-home-assistant-connect-zbt-2/visual-map-before-after.webp" alt="A comparison between the ZBT-1 and ZBT-2 on the Zigbee network visual map" style="width:100%;max-width:700px;">
    这不算严格科学测试，但在某个网络中的前后对比很有意思：直接连接增加了大约 60% 🤩
</div>

[Nabu Casa](https://www.nabucasa.com/) 作为所有官方 Home Assistant 硬件的商业合作方，这次把这款设备做得非常出色。当你把 Connect ZBT-2 上所有这些细节改进加在一起时，就能得到相当明显的性能提升，同时依然保留前代那种坚如磐石的稳定性。更重要的是，每一次购买都在支持 Open Home Foundation，并为 Home Assistant 的开发提供资金。升级智能家居，从来没有这么让人感觉值回票价！

## 还在等什么？

如果你想让自己的智能家居发挥最大潜力，那就选一款以开源为核心、性能拉满、外观也在线的适配器吧。[Home Assistant Connect ZBT-2](/home-assistant/connect/zbt-2) 今天已经开售，一如既往，感谢你对 Home Assistant 的支持！
