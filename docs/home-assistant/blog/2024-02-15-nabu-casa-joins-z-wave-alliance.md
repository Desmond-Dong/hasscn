---
title: Nabu Casa 加入 Z-Wave 联盟
description: 感谢 Home Assistant Cloud 订阅者的收入，我们已加入 Z-Wave 联盟，并启动 Z-Wave JS 的认证流程。
---
# Nabu Casa 加入 Z-Wave 联盟

TL;DR：得益于 Home Assistant Cloud 订阅者的收入，我们已加入 Z-Wave 联盟，并将启动 Z-Wave JS 的认证流程。

<p><img src='/home-assistant/images/blog/2024-02-zwave/nabucasa-zwa.png' class='no-shadow' /></p>

Z-Wave 是自 1999 年以来一直存在的本地智能家居标准。由于在 sub-Ghz 频率上运行，它能够创建一个覆盖整个房子的可靠网状网络。其可靠性也使其受到耶鲁门锁和 Amazon Ring 等知名品牌的欢迎。 Z-Wave 标准由 [Z-Wave 联盟](https://z-wavealliance.org/) 下的公司联盟开发。 

通过 Home Assistant，我们从早期就集成了 Z-Wave。我们首先依赖 OpenZWave，直到 2021 年过渡到使用 Dominic Griesel 创建的 [Z-Wave JS](https://github.com/zwave-js)。 Z-Wave JS 是 Z-Wave 协议的完全开源实现。与 Home Assistant 和 Z-Wave USB 记忆棒相结合，它为我们的用户提供了最佳的 Z-Wave 体验。 Dominic 受雇于 Nabu Casa，得益于 [Home Assistant Cloud](https://www.nabucasa.com/) 订阅者产生的收入，他可以在 Z-Wave JS 上全职工作（谢谢！）。

<!--more-->

我们已经通过 Home Assistant 社区彻底测试了 Z-Wave JS。我们的社区来自世界各地，可以使用各代人的各种 Z-Wave 设备。这确保了 Z-Wave JS 能够处理设备及其怪癖，直至原始 Z-Wave 发布。

然而，我们对 Z-Wave JS 的目标不仅仅是确保我们为您提供坚如磐石的 Z-Wave 实现。我们希望让公司更轻松地开发 Z-Wave 控制器并发展 Z-Wave 生态系统。更大的生态系统对制造商制造Z-Wave设备更具吸引力，这为我们的用户带来了更多选择。由于 Z-Wave 在本地工作，因此它是本地选择。 

今天，我们很自豪地宣布我们已加入 Z-Wave 联盟并获得 Z-Wave JS 官方认证。认证向其他公司表明 Z-Wave JS 是 Z-Wave 标准的完整且正确的实现。这将使其他公司充满信心，相信他们可以采用 Z-Wave JS 将 Z-Wave 集成到他们的产品中。例如，HomeSeer [已宣布](https://forums.homeseer.com/forum/hs4-products/hs4-plugins/lighting-primary-technology-plug-ins-aa/Z-Wave-plus-homeseer/1634034-new-Z-Wave-plus-plugin-under-development#post1634634%0A) 正在将其平台迁移到 Z-Wave JS。我们希望，随着更多的公司在未来追随我们的脚步，这将带来新的机遇。

## 开放日

借助 Home Assistant，我们对智能家居有了一个愿景，我们称之为“开放式家庭”(/blog/2021/12/23/the-open-home/)。它围绕三个核心价值观：隐私、选择和可持续性。任何符合这些价值观的事物都值得我们的社区采用。这就是为什么我们之前[加入连接标准联盟(CSA)](/home-assistant/blog/2023/12/04/nabu-casa-at-the-Matter-member-meeting/)参与Matter和Zigbee的开发，现在加入Z-Wave联盟。

Z-Wave 符合这三个价值观：您的数据保留在本地，您可以组合任何制造商的 Z-Wave 设备，并且即使其背后的公司不再存在，设备也将继续运行。这是开放日的一个重要标准。这就是为什么尽管 Z-Wave、Zigbee 和 Matter 是相互竞争的标准，我们仍然加入了 Z-Wave 联盟和 CSA，并将继续支持每个标准。并非每个智能家居都是一样的。用户需要有选择并能够选择最适合他们家庭的标准。相互竞争的标准相互推动改进和创新，最终导致所有标准变得更好为用户服务。

作为 Z-Wave 联盟的一部分，我们计划将我们作为开源社区的独特见解带到桌面上。我们希望确保 Z-Wave 标准的未来方向继续忠于我们的 Open Home 价值观。就像我们在 CSA 中为 Zigbee 和 Matter 所做的那样。