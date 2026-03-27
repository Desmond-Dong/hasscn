---
title: Home Assistant Connect ZBT-1 问题和更换
description: '<img src=''/home-assistant/images/blog/2024-10-zbt1-issue/art.jpg'' alt="Home Assistant Connect ZBT-1 issue and replacement"。 本页属于 Home Assistant 中文博客与更新记录。'
---
# Home Assistant Connect ZBT-1 问题和更换

<img src='/home-assistant/images/blog/2024-10-zbt1-issue/art.jpg' alt="Home Assistant Connect ZBT-1 issue and replacement">

:::注意
更换计划现已启动，请联系您购买设备的零售商以请求更换。更换计划仅适用于 2024 年 10 月之前购买的遮盖 ZBT-1 品牌设备，而不是 SkyConnect 品牌设备（[使用此图](#do-i-have-a-zbt-1) 识别您拥有的设备）。
:::

我们发现 Home Assistant Connect ZBT-1 中存在一个问题，该问题影响了少数客户，这似乎是由于 ZBT-1 设备首次生产运行中包含的故障部件导致设备出现故障并完全无响应。我们希望确保每个人都能获得替换的 ZBT-1，并确保他们在遥远的未来得到保障。

尽管 Home Assistant SkyConnect 在底层与 ZBT-1 相同，但**它不受影响**。 问题不在于设计，而在于特定生产运行中使用的有缺陷的稳压器导致了问题。当 ZBT-1 插入某些 USB-A 端口时，稳压器可能会发生故障，导致设备完全变砖。我们在本次和之前的生产运行中采用了高质量的制造和质量控制。我们正在进行调查，以查明这种情况是如何发生的，最重要的是，避免将来再次发生类似的情况。

对于由此给您带来的任何不便，我们深表歉意。以下是我们调查的详细信息、设备受到的影响以及更换计划。
- [背景](#background)
- [我有 ZBT-1 吗？](#do-i-have-a-zbt-1)
- [暂停销售](#pausing-sales)
- [更换程序](#replacement-program)
- [结论](#conclusion)

<!--more-->

## 背景

大约一个月前，有人联系我们，称我们最新的一款（[最近更名](/home-assistant/blog/2024/06/13/zbt1-annoucement/)）Home Assistant Connect ZBT-1 未检测到，并且外壳显示变形。还报告了几个类似的问题，我们开始与少数受影响的人进行对话，让他们向我们发送设备进行测试。

<p class='img'><img src='/home-assistant/images/blog/2024-10-zbt1-issue/zbt1-issue.jpg' style='border: 0;box-shadow: none;' alt="ZBT-1 case deformation and faulty voltage regulator">红色圈出的是外壳和板上的变形，显示故障芯片</p>

事实上，该设备根本不再工作，没有被它所连接的任何设备检测到。当我们打开它们时，我们发现了一个坏了的电压调节器。虽然长期使用后，SkyConnect 设备的外壳也会出现轻微变色，这并不是故障的迹象，但上图所示外壳较深的变形是 ZBT-1 过热和故障的迹象。我们所有的设备均通过 CE 和 ROHS 认证，塑料外壳设计为不燃烧。这是一个真实的演示，说明了该认证的重要性以及我们采取这一步骤的原因。

我们更换了测试设备上的电压调节器，设备又恢复了活力。我们找到了罪魁祸首，但为什么失败了呢？如前所述，SkyConnect 的内部设计和制造实际上与 ZBT-1 相同，而且我们没有收到任何此类故障的报告，实际上有数万个此类故障。在制造过程中总会有一点差异，在这次运行中，采购的电压调节器出了问题——我们再次对此进行调查。我们花了几周的时间才用我们自己的设备重现了这个问题。我们走了一些错误的道路，但最终发现它仅由某些设备触发，特别是某些台式电脑（在内部，我们只发现了一个导致此故障的台式机）。 我们尚未发现当设备仅连接到 Home Assistant Green、树莓派甚至 Mac 时会发生故障。如果您已将 ZBT-1 插入不同的设备，特别是台式电脑，并且该系统无法识别它，请检查它是否存在如上图所示的变形。显然，我们希望您能够在任何硬件上使用该设备，即使本次生产运行中只有少量设备报告了问题，这对我们来说仍然是不可接受的。

## 我有 ZBT-1 吗？

<img src='/home-assistant/images/blog/2024-10-zbt1-issue/skyconnect-zbt1.png' style='border: 0;box-shadow: none;' alt="SkyConnect (left) and ZBT-1 (right)">
<p style="text-align: center; font-size: 0.9rem;">SkyConnect（左）和 ZBT-1（右）品牌设备、SkyConnect 不受此问题的影响。</p>

## 暂停销售

我们已要求经销商暂停销售并退回所有库存。在下个月，您将看到“缺货”横幅，如果您尝试为故障设备获取替换设备，则在恢复生产之前这是不可能的。

我们正在努力在 11 月初之前运送替换 ZBT-1。

## 更换计划

如果您购买了 Home Assistant Connect ZBT-1，我们正在制定更换计划。根据该计划，Nabu Casa 将为经过验证的购买提供为期 60 个月（5 年）的免费更换设备。无论设备是否出现故障，我们都会根据要求提供替换品。

尽可能可持续地做事是我们的核心价值观，这就是我们提供如此长的承保期的原因。我们希望为那些不希望在可预见的将来在不同系统中使用该设备的 ZBT-1 所有者提供安心运行的能力。

:::注意
截至 2024 年 10 月，所有生产的 ZBT-1 品牌设备均被认为存在此故障。您可以通过检查背面的白色标签上的“ZBT-1”来判断您的设备是否为 ZBT-1（[使用此图形](#do-i-have-a-zbt-1) 识别您拥有的设备）。无需测试您的设备是否受此故障影响。
:::

如果它可以工作，请将其插入正在使用的设备中，并且在需要之前不必担心更换。如果您需要或想要更换，请联系您购买设备的卖家，他们将安排退货流程和更换。预计在 11 月初更换设备，我们将优先考虑设备无法正常工作的人员。

## 结论

对于给您的智能家居带来的不便和任何干扰，我们深表歉意。作为在家中使用 Zigbee 的人（许多智能设备都依赖 Zigbee），我不想让它停止运行。

更糟糕的事情可能会发生，但这对我来说是一次沉重的打击。我们在 Nabu Casa 的所有工作都是资助 Home Assistant 的开发并支持 Open Home。诸如此类的问题会占用我们的时间，并剥夺我们用户的新奇事物。最终，我们将把这次挫折视为一次机会，证明我们坚持我们的价值观并做正确的事情。