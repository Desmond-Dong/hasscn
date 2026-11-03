# Matter 与 Thread：我们目前进展如何

最近 Home Assistant 在 Matter 和 Thread 方面进展很多。信息量比较大，不太容易全部跟上，所以我们想借这篇文章集中更新一下当前状态，以及我们接下来的计划。

摘要：

* Matter 已可用，包括通过 Apple 和 Google Thread 边界路由器接入的 Thread 设备
* Home Assistant 中的 Thread 边界路由器已经可运行，但要到下一版本 Home Assistant 2023.3 才会完成集成
* 我们扩展了 Matter 和 Thread 文档，覆盖大多数常见问题，并新增如何把 Matter 设备接入 Home Assistant 的视频
* 使用 [Home Assistant Yellow][yellow] 集线器的用户可以启用实验性的 Thread 边界路由器
* 其他系统用户可通过 [Home Assistant SkyConnect][skyconnect] 获得 Thread 边界路由器
* 发布 [SL Web Tools][sl-web-tools]，让用户可以在浏览器里升级基于 SiLabs 芯片的 Zigbee/Thread 棒子固件（例如 Home Assistant SkyConnect）
* 我们开源了用于构建可复现固件的[自动化构建脚本][sl-builder]，适用于基于 SiLabs 芯片的 Zigbee/Thread 棒子

<lite-youtube videoid="8y79Kq3QfCQ" videotitle="Add Matter device via iOS app in Home Assistant"></lite-youtube>

## Matter

[Matter][matter] 是新的本地智能家居标准。它在去年底发布第一个版本，目前正被整个行业逐步采用。我们也一直在努力让它在 Home Assistant 中可用。

现在，Home Assistant 已可控制大多数 Matter 设备的基础功能。你可以添加基于 Wi-Fi 和 Thread 的设备，最常见的设备类型都可用。Matter 网桥暂时还不支持 - 这会在 Home Assistant 2023.3 加入。

<!--more-->

Home Assistant 的 Matter 实现，构建在由 Connectivity Standards Alliance（CSA）成员共同开发的开源 Matter SDK 之上。Google 和 Apple 的 Matter 产品同样使用这个 SDK。作为联盟成员，我们也在协同改进这个 SDK，让它成为 Home Assistant Matter 支持的坚实基础。

配合这篇博客，我们还发布了[ Matter 文档][matter]的大更新。新增了操作说明和配套视频，讲解如何将 Matter 设备与 Home Assistant 配对，以及如何把 Apple Home/Google Home 中的 Matter 设备共享到 Home Assistant。

<lite-youtube videoid="-B4WWevd2JI" videotitle="Share Matter device from Google Home to Home Assistant"></lite-youtube>

## Thread

[Thread][thread] 是一种低功耗网状网络标准，可让设备在家庭网络中互联。它使用与 Zigbee 相同的射频技术，但提供类似 Wi-Fi 的 IP 连接能力。Matter 也支持将 Thread 作为低功耗和电池设备的连接方式。

配合这篇博客，我们也更新了[ Thread 文档][thread]。我们解释了 Thread 网络的各个组成部分，以及你如何在家里搭建 Thread 网络。

<p class='img'>
<img src='/home-assistant/images/blog/2023-02-08-state-of-matter-and-thread/android-thread.png' alt='Screenshot of a Google prompt if Home Assistant can access network credentials.'>
Google Android 询问你是否要将 Google 的 Thread 凭据共享给 Home Assistant。
</p>

随着家里 Thread 产品越来越多，你可能会出现多个 Thread 网络。由于一个 Thread 设备只能连接一个 Thread 网络，因此把多个 Thread 网络统一起来就很重要。

即将上线的 Home Assistant Thread 面板，目标是让你管理自己的 Thread 网络，并帮助你把它们合并成一个。这个功能会与 Home Assistant Companion App 协作，实现 Apple/Google 与 Home Assistant 间的 Thread 网络同步。

我们已经做了这个面板的交互原型，你可以[在这里体验][thread-mockup]。

<p class='img'>
<a href="https://www.figma.com/proto/DDz0MNwzzxjJdeEHCamQi1/Thread?node-id=68:2863&scaling=scale-down&page-id=68:2862&starting-point-node-id=68:2863" target="_blank"><img src='/home-assistant/images/blog/2023-02-08-state-of-matter-and-thread/thread-mockup.png' alt='Screenshot of a Thread panel mockup.'></a>
Thread 面板原型截图。<a href="https://www.figma.com/proto/DDz0MNwzzxjJdeEHCamQi1/Thread?node-id=68:2863&scaling=scale-down&page-id=68:2862&starting-point-node-id=68:2863" target="_blank">打开原型</a>
</p>

## 使用 Thread 与 Matter 的硬件

Matter 和 Thread 都正在进入主流市场，这两项技术都包含大量快速演进的环节。为了让 Home Assistant 用户更容易用上这些技术，我们在很大程度上依赖了 Google、Apple 以及其他 CSA 成员的工作（感谢！）。

Google 和 Apple 已经更新了各自产品，支持 Matter 与 Thread。但我们也必须确保能够独立运行。Home Assistant Yellow 与 Home Assistant SkyConnect 都内置可同时运行 Zigbee 与 Thread 的无线芯片。我们正在把这种多协议支持带给所有 Home Assistant 用户。

### Home Assistant Yellow

[Home Assistant Yellow][yellow] 是我们对理想家庭自动化中枢的答案。它使用 Raspberry Pi Compute Module 4（CM4），你可以升级以获得更多内存。若存储不够，还能额外挂硬盘。[而且它是开放硬件][yellow-docs]。

<p class='img'>
<img src='/home-assistant/images/blog/2021-09-home-assistant-yellow/overview.png' alt='Overview of Home Assistant Yellow features.'>
</p>

在无线连接方面，它集成了 Silicon Labs 模块，开箱即用于 Zigbee。配合最新 Home Assistant 2023.2，你可以把 Home Assistant Yellow 变成 Thread 边界路由器。方法是在 [**Settings** > **Hardware**](https://my.home-assistant.io/redirect/hardware/) 中启用实验性多协议支持，然后选择 Configure。

目前，多协议支持启用后暂时无法关闭。我们很快会提供关闭方式，让遇到问题的用户可以回退。

Home Assistant Yellow 最初在 2021 年 10 月通过众筹发布。我们这段时间持续推进生产，并在上个月完成了所有原始支持者以及大部分预购订单的交付。

所以今天我们很高兴宣布：RaspberryPi.dk 将成为 Crowd Supply 之外首个销售 Home Assistant Yellow 的分销商。首批产品已生产完成，正在海运途中。所有型号都可以在他们的网站上[预订][rpidk]。

随着芯片供应改善，还会有更多分销商加入！

### Home Assistant SkyConnect

Home Assistant 的核心是选择。你不必使用官方硬件，也可以自带设备。事实上，Raspberry Pi 是目前最流行的 Home Assistant 运行平台，但它有一个问题：缺少智能家居无线连接能力。

我们推出 [Home Assistant SkyConnect][skyconnect] 来补齐这块能力。它使用与 Home Assistant Yellow 同系列芯片，开箱即用于 Zigbee。配合最新 Home Assistant 2023.2 且使用 Home Assistant OS 时，你也可以把 SkyConnect 变成 Thread 边界路由器。操作同样是在 [**Settings** > **Hardware**](https://my.home-assistant.io/redirect/hardware/) 中启用实验性多协议支持并选择 Configure。

<p class='img'>
<img src='/home-assistant/images/connectzbt1/connectzbt1_isometric.png' alt='Picture of a Home Assistant SkyConnect.'>
</p>

Home Assistant SkyConnect 在 2022 年底通过分销网络首次发布（可在[我们网站][skyconnect]点“购买”）。当时很多分销商很快就售罄，但大多数很快会补货。

配合今天的博客，我们也对 [SkyConnect 文档网站][skyconnect-docs]做了大更新，包括从其他 Zigbee 棒子迁移的教程。

## SiLabs multi-flasher 与 SL Web Tools

构建开放之家（Open Home）是我们的使命：一个重视隐私、选择和可持续性的智能家居。为此，我们也在打造工具，帮助更多创作者做出推动 Open Home 的项目和产品。

两年前，我们做了 ESP Web Tools。它让 DIY 固件安装方式发生了变化：任何 ESP32/ESP8266 项目都可以在官网提供简单的网页安装器，让用户直接在浏览器里开始使用。包括 [Tasmota]、[WLED] 和 [ESPresense] 在内的很多优秀项目都采用了它。自 ESP Web Tools 发布以来，我们一直希望把这种能力扩展到更多设备。

今天我们发布 [SL Web Tools][sl-web-tools]。它让用户可以直接在浏览器中管理基于 SiLabs 芯片的 Zigbee/Thread 棒子固件，不再需要终端或本地编译。这样，任何创作者都可以更轻松地向用户提供固件更新，也可以快速分发实验性修复版本。

为便于体验，SL Web Tools 已加入 [Home Assistant SkyConnect 文档][skyconnect-docs]。

SL Web Tools 基于我们新的开源 Python 包 [`silabs-universal-flasher`][sl-flasher]，并通过 [Pyodide] 在浏览器内运行。

<lite-youtube videoid="-88K23e8XYw" videotitle="SL Web Tools: upgrading Zigbee firmware in the browser"></lite-youtube>

## 为 Silicon Labs 芯片构建固件

为 SiLabs 芯片编译固件并不轻松。不同版本、补丁集、芯片型号都不容易统一管理。我们热爱自动化，所以做了一套自动化构建系统，用来生成 Home Assistant Yellow 和 Home Assistant SkyConnect 的可复现固件构建。

我们将它开源，希望让更多创作者更容易为用户提供最新固件。结合 SL Web Tools，我们提供了一套完整方案，帮助其他创作者快速把固件更新能力带给用户。

[在 GitHub 查看该仓库。][sl-builder]

[matter]: /integrations/matter

[rpidk]: https://raspberrypi.dk/en/?s=home+assistant+yellow&post_type=product

[skyconnect-docs]: https://skyconnect.home-assistant.io

[skyconnect]: /skyconnect

[sl-builder]: https://github.com/NabuCasa/silabs-firmware-builder

[sl-flasher]: https://github.com/NabuCasa/universal-silabs-flasher

[sl-web-tools]: https://github.com/NabuCasa/sl-web-tools

[thread-mockup]: https://www.figma.com/proto/DDz0MNwzzxjJdeEHCamQi1/Thread?node-id=68:2863&scaling=scale-down&page-id=68:2862&starting-point-node-id=68:2863

[thread]: /integrations/thread

[yellow-docs]: https://yellow.home-assistant.io/documentation/

[yellow]: /yellow

[Pyodide]: https://pyodide.org/en/stable/

[Tasmota]: https://tasmota.github.io/install/

[WLED]: https://install.wled.me/

[ESPresense]: https://espresense.com/firmware
