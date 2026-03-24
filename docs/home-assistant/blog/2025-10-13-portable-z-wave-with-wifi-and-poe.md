---
title: Connect ZWA-2 随处可用：通过 Wi-Fi 或 PoE 使用 Z-Wave
description: 我们推出便携式 Z-Wave，这是一套实验性固件，让你可以通过内置 Wi-Fi 使用 Z-Wave，甚至还能加入 PoE。
---

<img src='/home-assistant/images/blog/2025-10-z-wave-portable/art.png' style='border: 0;box-shadow: none;' alt="Portable Z-Wave">

上个月，我们发布了 [Home Assistant Connect ZWA-2](/home-assistant/blog/2025/08/13/home-assistant-connect-zwa-2)，这是我们心目中最理想的 Z-Wave 适配器。根据[这些](https://www.theverge.com/tech/759542/home-assistant-connect-zwa-2-z-wave-long-range-antenna)[评测](https://www.xda-developers.com/home-assistant-connect-zwa-2-review/)[来看](https://youtu.be/vEsLghjVCo4?si=qSnGQ9aso8ZBGGiF)[，我们](https://youtu.be/AyE0_6N21h4?si=TuuZ_O4yZLcP40oT)显然做对了 😎。今天，我们要宣布一套新的实验性固件，让这款终极 Z-Wave 适配器还能做更多事情。

我是 [Keith](https://github.com/kbx81)，Nabu Casa 的高级软硬件工程师，你也可能因为我在 ESPHome 项目的工作而认识我。如果你还不清楚，Nabu Casa 是 Open Home Foundation 的商业合作伙伴，同时也是负责打造官方 Home Assistant 硬件的组织。

在产品发布期间，我们经常收到一条反馈：大家希望 Connect ZWA-2 在家中的摆放位置能更灵活，往往希望把它放在离 Home Assistant 主机很远的地方。实现这一点并不容易（下面会详细说明），但我们最终还是做出了一套方案，让你只要有网络连接，就能把它放到任何位置。

这套实验性固件不仅能让你利用 Connect ZWA-2 内置的 Wi-Fi 芯片，还能通过搭配其他硬件来支持大家呼声很高的 PoE。🎉 这套新固件之所以成为可能，正是因为我们为 Connect ZWA-2 构建了第二代开放平台，让你能够自由折腾并扩展自己拥有的设备。每一件 Home Assistant 硬件都体现着 Nabu Casa 和基金会持续演进的理念，发布时附带的软件从来都不是终点。只要我们想到新的酷能力，就会一起把它加进去。

如果你想[马上开始通过 Portable Z-Wave 使用 Connect ZWA-2](https://toolbox.openhomefoundation.org/home-assistant-connect-zwa-2/)，可以访问[基金会全新网页版工具之家](https://toolbox.openhomefoundation.org/)。不过请注意，这仍然是**实验性**功能，我们建议你先通读这篇博客，了解其工作方式和限制。你也可以关注[接下来的 ESPHome 直播](https://www.youtube.com/watch?v=vJw4zu7AasE)，我们会更深入地讲解这项新技术。<!--more-->

## 入门

<p class="img">
    <img src="/home-assistant/images/blog/2025-10-z-wave-portable/poe-adapter.jpg" alt="Home Assistant Connect ZWA-2 connected to a Waveshare ESP32-S3-ETH">
    Home Assistant Connect ZWA-2 连接到 Waveshare ESP32-S3-ETH
</p>
<div class="alert">
注意：此固件为实验性版本。如果你追求最稳定的 Z-Wave 体验，请不要使用它。
</div>

如果你想通过本地网络来使用 Connect ZWA-2，可以选择以下两种配置之一：

- **Wi-Fi** - 新固件将安装在 Connect ZWA-2 上，并利用其内置 Wi-Fi 芯片通过你的网络通信。
- **PoE** - 新固件将安装在一块支持以太网供电（PoE）的[外部开发板](https://www.amazon.com/dp/B0DKJ5VXC9)上；Connect ZWA-2 仍然保留原厂固件，并通过 USB 连接到这块新设备。

在安装新固件之前，请先确保你已经[备份好 Z-Wave 网络](/home-assistant/integrations/zwave_js/#backing-up-your-z-wave-network)，并确认 Home Assistant 版本至少为 2025.10.2。完成这些步骤后，再使用 [Portable Z-Wave 工具网站](https://toolbox.openhomefoundation.org/home-assistant-connect-zwa-2/)。工具站点中的向导会引导你完成整个安装和设备接网流程。安装完成后，它应该会加入你的网络，并被 Home Assistant 中的 ESPHome 与 Z-Wave 集成自动发现。

这套固件在我们的实验室和家庭环境中表现良好，但现实世界毕竟不同；你的本地网络和 Z-Wave 网络可能会表现出不同特性。因此，我们非常希望得到你的反馈。如果你尝试了它，无论体验好坏、长短如何，都欢迎在下方留言告诉我们。我们非常想知道它在哪些方面还能继续改进！

## Portable Z-Wave 实验

在我们发布任何硬件产品之前，都会尽量把预生产批次交到尽可能多的测试者手中——其中大多数都是社区里的爱好者和折腾党，而他们拿到产品后第一件事通常就是拿出螺丝刀把它拆开（公平地说，我们本来就故意把它设计得很容易打开——没有胶水，也没有卡扣）。当他们看到 Connect ZWA-2 的内部时，立刻发现了一颗 ESP32 芯片，并同时感到兴奋和困惑。它最初只是作为 USB 控制器加入，没错，用 ESP32-S3 来做这个任务确实有点大材小用，但我们希望给这个设备留出成长空间。这也就引出了今天要分享给你的这项实验……

### 让一切织成网络

当你把 Z-Wave 适配器接入 Home Assistant 时，它依赖 Z-Wave JS 插件，并通过 USB 使用专门的 Z-Wave 串口协议进行通信。理论上，确实可以把这个串口协议跑在网络上（也就是 serial-over-IP），但我们的测试发现，它既不够可靠，也没有我们期望的那样易用。Z-Wave 串口协议中的某些部分对延迟非常敏感，尤其是 Z-Wave 数据包的确认环节。如果你的网络正忙着处理其他流量，而这些关键确认包稍微拖延一下，Z-Wave 设备的连接就可能超时并失败。这会导致设备通信卡住，甚至完全中断。

如果想让 Z-Wave 在网络上稳定工作，我们就必须在设备本地处理那些对延迟敏感的部分，其余内容再通过网络转发。这正是 [ESPHome](https://esphome.io/) 发挥作用的地方：它是运行在 ESP32 设备上的、面向联网微控制器的开源软件。我们在 Connect ZWA-2 中集成了 ESP32，而它的性能和 Wi-Fi 天线都足以胜任这项工作。

为了实现这一点，我们向 [ESPHome 添加了 Z-Wave 支持](https://next.esphome.io/components/zwave_proxy/)，使其能够与 Z-Wave 芯片通信。随后，我们又让 Home Assistant 和 Z-Wave JS 可以通过 ESPHome 与 Z-Wave 适配器通信。由于这些工作是开源的，它理论上不应只局限于 Connect ZWA-2。只要把任何经过认证的 Z-Wave 适配器接到 ESP32 上，理论上都应该有机会工作。不过在支持其他适配器之前，我们希望先确保它在 Connect ZWA-2 上足够稳定。

<p class="img">
    <img src="/home-assistant/images/blog/2025-10-z-wave-portable/with-wifi.png" alt="Home Assistant Connect ZWA-2 using the built-in Wi-Fi chip">
    Home Assistant 通过 ZWA-2 内置 Wi-Fi 芯片连接。
</p>

<p class="img">
    <img src="/home-assistant/images/blog/2025-10-z-wave-portable/with-poe.png" alt="Home Assistant Connect ZWA-2 using POE via an adapter">
    Home Assistant 通过 PoE 模块连接到 ZWA-2。
</p>

ESPHome 会在内部处理串口消息确认，然后使用它的 API（尤其是[基于 Protobuf 的实现](https://developers.esphome.io/architecture/api/)）来比 serial-over-IP 更可靠地通过网络传输这些消息。即使你的家庭网络因流量高峰而变得拥堵，ESPHome 也能帮你稳住 Z-Wave 网络。当然，这并不是说它完全没有性能影响，但这种影响可能比你想象的小，甚至你根本察觉不到！

### 性能表现

Wi-Fi 非常方便，但最关键的问题是：**它会如何影响你的 Z-Wave 网络？** 为了找出答案，我们进行了多项基准测试，看看 Portable Z-Wave 与传统 USB 连接相比表现如何。

与直连串口（USB）相比，数据包在 Home Assistant / Z-Wave JS 和你的 Z-Wave 网络之间传输时，经过本地网络路由确实会更久一些。但在网络负载较低或中等的情况下，这部分额外延迟非常小，通常难以察觉。也就是说，如果你的网络压力很大，或者 Wi-Fi 信号较差，你就要预期数据包传输时间会变长，从而带来可感知的延迟。它依然可以控制灯光和其他设备，只是响应可能略慢。以下是我们在测试环境中得到的一些典型延迟数据：

| 连接类型 | 最小值（毫秒） | 最大值（毫秒） | 平均值（毫秒） |
| :---- | :---- | :---- | :---- |
| USB | 4 | 9 | 5.36 |
| Ethernet | 15 | 32 | 25.14 |
| Wi-Fi | 15 | 92 | 29.16 |

你的结果很可能会有所不同，特别是在环境和条件更差的情况下。比如，如果你把 Connect ZWA-2 放在一个 Wi-Fi 信号很糟的地方，可能就会发现设备状态更新不准确，或者出现其他异常表现。我们也不建议使用 VPN 或其他复杂的网络路由或配置，因为这都会增加延迟。另外，你不必担心 Wi-Fi 会干扰 Z-Wave，因为它们工作在完全不同的无线频段上，彼此不会冲突。只要稍微带点常识地选择摆放位置，你就能找到一个既有良好 Wi-Fi 信号、又能[很好优化 Z-Wave 网络](https://support.nabucasa.com/hc/en-us/articles/28670284336925-Finding-an-installation-location-for-the-Home-Assistant-Connect-ZWA-2)的地方。

## 致谢

这个项目由 Nabu Casa 与 Open Home Foundation 中的多位成员合作完成。若没有 [Home Assistant Cloud 订阅者](/home-assistant/cloud/) 的支持，以及所有关心 Z-Wave 并购买了 Home Assistant Connect ZWA-2 的用户，这一切都不可能实现。谢谢你们！

感谢 Z-Wave JS 的创始人 Dominic，他快速加入了这个项目，为 Z-Wave JS 增加支持，并构建了浏览器安装工具。

感谢 Nick 和 Jesse 对 ESPHome 实现的支持。

感谢 Steven 制作全新的 Open Home Foundation toolbox 网站，让这个实验可以被轻松安装。

## 常见问题

**问：Portable Z-Wave 实验是否只支持 Home Assistant Connect ZWA-2？**

答：理论上，它应该也适用于其他 Z-Wave 适配器，但截至目前我们只测试过 ZWA-2。相关代码已经是 [ESPHome 2025.10](https://next.esphome.io/components/zwave_proxy/)、Home Assistant 2025.10.2 和 Z-Wave JS v15.15.0 的一部分。我们选择先支持 Home Assistant Connect ZWA-2，是因为它本身就内置了一颗 ESP32-S3。如果你想在自己喜欢的 Z-Wave 适配器上试试看，可以先参考我们为 ZWA-2 提供的 [ESPHome 配置](https://github.com/esphome/zwa-2)（理论上只需要调整[厂商与产品 ID](https://github.com/esphome/zwa-2/blob/main/home-assistant-zwa-2-poe/home-assistant-zwa-2-poe.yaml#L43-L46) 以匹配目标适配器即可）。

**问：Portable Z-Wave 实验是否仅限于 Home Assistant？**

答：不是。它是直接为 Z-Wave JS 而设计的。如果你使用 Z-Wave JS v15.15.0，无论是独立运行还是与其他智能家居平台一起使用，也都可以使用它！只需要把 Z-Wave JS 配置为连接到 `esphome://<ZWA-2 的 IP 地址>`。

**问：我可以使用普通以太网，而不是 PoE 吗？**

答：可以。你可以将 PoE 注入器与 [Waveshare ESP32-S3-ETH 板](https://www.amazon.com/dp/B0DKJ5VXC9) 搭配使用。
