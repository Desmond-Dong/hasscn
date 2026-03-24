---
title: Frient 加入 Works with Home Assistant
description: 经过一段时间的空档，又有更多 Zigbee 设备加入该计划，覆盖从电表监测到烟雾报警器等多种场景。
---

<img src='/home-assistant/images/blog/2025-09-frient/art.webp' style='border: 0;box-shadow: none;' alt="Frient joins Works with Home Assistant">

这周我们结识了新的 frient，他们带着一整套 Zigbee 设备加入了我们的 [Works With Home Assistant 计划](https://works-with.home-assistant.io/)。每一款设备都会经过我们团队测试，以确保它们能为 Home Assistant 带来尽可能好的体验。[Frient](https://www.frient.com/) 在欧洲广泛销售，并以简洁低调的设计闻名，深受追求高 Home Approval Factor 的用户喜爱。<!--more-->

## 我们最新的 frient

frient 品牌来自丹麦，由 Onics（前身为 Develco Products）打造，他们在 Zigbee 设备领域拥有多年的经验。Frient 不仅把成熟可靠的技术带进了 Works With Home Assistant 计划，也把能轻松融入几乎任何家庭环境的丹麦设计一并带了进来。

近期加入 Works With 的合作伙伴已经为 Home Assistant 带来了 Z-Wave、Matter，甚至蓝牙设备，但距离上一次有专注 Zigbee 的设备加入这个计划，已经过去 _好几年_ 了 😅。Zigbee 是 Home Assistant 中最受欢迎的开放协议之一，如今已有数十万用户在使用。它是一项成熟可靠的技术，可直接连接到 Home Assistant，不需要云端或 Wi-Fi。Zigbee 还是一种网状协议，其中部分设备会充当中继器，随着设备数量增加，网络也会随之增强。它从一开始就是为了智能家居而设计，并经过优化，可让设备拥有很长的电池续航时间，有时甚至能达到多年。

<div class="alert">
<p>"加入 Works With Home Assistant 计划对 frient 来说是一个值得骄傲的里程碑。这体现了我们对开放、以用户为中心的智能家居体验的坚定承诺，也确保我们的产品能够与市场上最值得信赖的平台之一无缝集成。对 Home Assistant 用户来说，这意味着更多选择与灵活性；对 frient 来说，这进一步巩固了我们在互联智能家居领域的重要地位。"</p>
<em style="text-align: right; display: block;">- Martin Langballe，frient 国际业务发展经理</em>
</div>

要在 Home Assistant 中开始使用 Zigbee，你只需要一个 Zigbee 适配器，也就是常说的“棒子”，比如 [Home Assistant Connect ZBT-1](/home-assistant/connect/zbt-1/)（没错，这是我们 2022 年发布的产品，我也很好奇我们什么时候才会推出继任者 😉）。将适配器插入 Home Assistant 系统的 USB 端口后，它就能发现设备并添加 [ZHA 集成](/home-assistant/integrations/frient/)。完成设置后，你就可以开始向自己的 Zigbee 网络中添加设备。我们甚至还加入了一个很酷的[新可视化功能](/home-assistant/blog/2025/06/11/release-20256/#making-sense-of-bluetooth)，让你能看到 Zigbee 设备之间是如何相互连接的。

ZHA 在 Open Home Foundation 的支持下持续发展，甚至还有一位全职开发者（[@puddly](https://github.com/puddly)）专门负责改进它，并帮助认证新的 Works With 合作伙伴设备。无论你是订阅 Home Assistant Cloud，还是购买官方硬件，你的支持都让这一切成为可能。

## 设备

<p class="img">
<img src='/home-assistant/images/blog/2025-09-frient/energy-usage-data.webp' style='border: 0;box-shadow: none;' alt="A frient device attached to a energy meter">
如果你的能源公司不提供原始用电数据，总还有别的办法 😉
</p>

如果你还不知道，Works With Home Assistant 与其他认证计划的不同之处在于：产品会在内部接受严格测试，以确保它们开箱即能与 Home Assistant 无缝协作。加入计划的公司还承诺提供长期支持与固件更新，并持续为 Home Assistant 社区带来正面价值。Works With Home Assistant 由 [Open Home Foundation](https://www.openhomefoundation.org/) 运营，这项工作的资金则来自 [Home Assistant Cloud](/home-assistant/cloud/) 订阅者的支持。

我们的团队与 frient 进行了深入合作，以确保以下产品都能与 Home Assistant 顺畅配合：

- [frient Motion Sensor Pro](https://www.frient.com/products/motion-sensor-pro)
- [frient IO Module](https://www.frient.com/products/io-module)
- [frient Smart Plug Mini](https://www.frient.com/products/smart-plug-mini)
- [frient Entry Sensor 2 Pro](https://www.frient.com/products/entry-sensor-2-pro)
- [frient Smart Siren UK](https://www.frient.com/products/smart-siren)
- [frient Smart Siren EU](https://www.frient.com/products/smart-siren)
- [frient Intelligent Keypad](https://www.frient.com/products/intelligent-keypad)
- [frient Water Leak Detector](https://www.frient.com/products/water-leak-detector)
- [frient Smart Button](https://www.frient.com/products/smart-button)
- [frient Intelligent Smoke Alarm](https://www.frient.com/products/intelligent-smoke-alarm)
- [frient Air Quality Sensor](https://www.frient.com/products/air-quality-sensor)
- [frient Smart Humidity Sensor](https://www.frient.com/products/smart-humidity-sensor)
- [frient Electricity Meter Interface 2 LED](https://www.frient.com/products/electricity-meter-interface-2-led)

这已经覆盖了 frient 很大一部分产品线，包含能源监测、设备控制、安全与安防传感器。frient IO Module 还是首个通过认证的 Zigbee 模块，可将电动百叶窗或车库门等低压“非智能”设备转换为可由 Home Assistant 控制的设备。

其中也有不少产品非常适合打造更可持续的智能家居。例如 Electricity Meter Interface 2 LED 可以帮助你从电表中读取数据并记录到 Home Assistant。另一个可持续性的亮点是，他们在可行的情况下尽量使用 AA 和 AAA 电池，这意味着你可以使用可充电电池，而不是不断购买和回收纽扣电池。

我个人也很高兴看到一些适合英国市场的优秀产品加入计划，比如 frient Smart Siren 同时提供英规和欧规版本。

## 最好的 frients forever

在等待多年之后，终于看到 Zigbee 再次迎来高质量、通过 Works With Home Assistant 认证的设备，真的很棒。Frient 为这次发布投入了大量精力，他们也非常支持我们的工作和社区。接下来还会有更多令人兴奋的 Zigbee 新进展，敬请期待！

## 常见问题

**问：如果我手上的设备没有列在 “Works With Home Assistant” 里，是否代表它不受支持？**

答：不是！这只表示它还没有经过我们团队的测试流程，或者不符合该计划的要求。它可能完全可以正常工作，只是暂时还没有排进测试计划；也可能它使用的是我们当前认证计划尚未覆盖的连接方式。

**问：那 Works With 计划的意义是什么？**

答：它会突出展示那些我们确认能与 Home Assistant 良好协作的设备，以及那些长期承诺持续支持这些设备的品牌。认证协议明确规定，设备必须在 Home Assistant 中提供完整功能、能够本地运行而不依赖云端，并且这种能力会长期保持。

**问：这些设备是怎么测试的？**

答：这份列表中的所有设备，都是使用标准的 Home Assistant Green Hub、ZBT-1 以及 ZHA 集成完成测试的。我们没有用 Zigbee2MQTT 测试这些设备，因此如果你使用的是 Zigbee2MQTT，我们建议查阅它们的[设备兼容性文档](https://www.zigbee2mqtt.io/supported-devices/#v=Frient)。如果你使用的是其他集线器、Zigbee 适配器或集成，也没有问题；只是我们会基于这些方案进行测试，因为这是我们团队在自身生态内完成认证最有效的方式。

**问：你们会继续把更多 frient 设备加入计划吗？**

答：当然有可能！我们很高兴与 frient 团队建立紧密合作关系，一起推进后续发布，或把目前尚未列出的更多产品加入进来。
