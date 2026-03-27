---
title: Home Assistant Yellow 在 HAOS 14 中获得 CM5 支持
description: '<img src=''/home-assistant/images/blog/2024-11-cm5/art.jpg'' alt="Home Assistant Yellow in all its glory"。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# Home Assistant Yellow 在 HAOS 14 中获得 CM5 支持

<img src='/home-assistant/images/blog/2024-11-cm5/art.jpg' alt="Home Assistant Yellow in all its glory">

我们在两年多前推出了[黄色Home Assistant](/home-assistant/yellow/)，其设计理念是根据用户的需求来发展和扩展其功能。需要更多存储空间，请添加 NVMe 驱动器。需要 Matter over Thread 而不是 Zigbee，请更改固件。

感谢树莓派为我们提供了早期样本，我们已经能够向 Home Assistant Yellow 添加**计算模块 5 (CM5) 兼容性**，它将包含在 Home Assistant OS 14 中（以及一些[其他硬件支持](#other-additions-to-haos-14)）。这为当前和未来的用户提供了一个很好的选择，可以在需要时获得更高的性能，但我们必须说，CM4 仍然足以满足大多数Home Assistant用户的需求。

作为开放家庭基金会的一部分，我们为智能家居的隐私、选择和可持续性而奋斗。黄色实现了这三点，而这一宣布只会改善可用的选择和长期可持续性。

<!--more-->

## 使用计算模块

在设计 Yellow 以使我们的用户能够扩展设备的功能时，我们选择了树莓派的计算模块平台。它允许用户增加 RAM、添加 eMMC、内置蓝牙，甚至获得更快的速度 😉 - 无需更换 Yellow - 您所需要做的就是获得一个新模块。这对于产品在其使用寿命期间的可修复性也非常有用。

尽管它是为计算模块 4 (CM4) 设计的，但我们始终希望它能够与其未来的后继产品兼容。在过去的几个月里，我们一直在更新固件并测试早期硬件，它确实是兼容的。由于CM5上的变化，安装方法比CM4上稍微复杂一些，下面详细介绍。## CM5 能带来什么

我必须承认，使用最新最好的硬件很有趣（同时也为它所取代的硬件找到新的用途 - 旧的 Pi 产品可以制造很棒的[怀俄明州卫星](https://github.com/rhasspy/wyoming-satellite))。在大多数使用案例中，例如运行自动化或连接普通家庭的设备，大多数用户不会注意到 Green、CM4 或 CM5 之间的任何差异。

对于某些高级用户的需求，CM5 可能会提供重大改进。一些 Pi 5 用户已经看到 ESPHome 编译时间近 [3 倍改进](https://www.youtube.com/watch?v=kaVND-M9pkA&t=415s)；每个设备节省一两分钟确实可以在大型部署中增加。 CM5 优于 CM4 的另一个领域是运行本地语音到文本处理（如果您完全在本地使用 [Assist](/home-assistant/voice_control/)）。

## 在 CM5 上安装

对于 Home Assistant Yellow，我们有两种方法将 Home Assistant 操作系统安装到计算模块上。一种非常简单快捷（使用 USB 2.0），而另一种则更复杂（使用 rpiboot）。不幸的是，由于与 CM5 的固件差异，它无法从 USB 2.0 设备启动（尽管 USB 2.0 端口在设备启动后即可工作）。

如果您已经有运行黄色的 Home Assistant 操作系统，升级到 CM5 可以直接替代，但在某些情况下可能会更复杂，

- **带有 NVMe 存储的 CM4 Lite（无 eMMC）** - 更新到最新的 HAOS（版本 14.0 或更高版本），关闭电源，将 CM4 Lite 更换为 CM5 Lite，然后就可以开始使用了。- **带有 eMMC 的 CM4（无论您是否使用 NVMe）** - 下载 Home Assistant 的备份，关闭系统电源，然后使用 [rpiboot](https://support.nabucasa.com/hc/en-us/articles/25485061432093-Reinstall-the-Home-Assistant-Operating-System-on-Raspberry-Pi-CM5)（更复杂的安装方法）在 CM5 上安装 Home Assistant 操作系统。安装完成后恢复备份。

- **带有 CM5 的新黄色**：您需要使用 [rpiboot](https://support.nabucasa.com/hc/en-us/articles/25606333033501-Home-Assistant-Yellow-Kit-with-CM5) 安装 Home Assistant（更复杂的安装方法）。

有关如何设置 Home Assistant Yellow 的完整详细信息 [请访问我们的文档](https://support.nabucasa.com/hc/en-us/categories/24734575925149-Home-Assistant-Yellow)。

## CM4 还是很棒的

如果您拥有或正在考虑购买带有 CM4 的Home Assistant [绿色](/home-assistant/green/) 或 [黄色](/home-assistant/yellow/)，那么两者都非常有能力。三分之一的 Home Assistant 用户使用 Pi 4 级硬件。

<img src='/home-assistant/images/blog/2024-11-cm5/analytics.png' style='border: 0;box-shadow: none;' alt="In our analytics Pi 4 class hardware is the most used SBC">

事实上，根据我们的[选择加入分析](https://analytics.home-assistant.io/)，使用 Pi 3 硬件的人多于使用 Pi 5 硬件的人（假设 Pi 5 自[今年 2 月](/home-assistant/blog/2024/02/26/home-assistant-os-12-support-for-raspberry-pi-5/) 以来才获得官方支持）。 Home Assistant 继续获得更新，以提高其在所有硬件上的速度，最近是[更快的备份](/home-assistant/blog/2024/02/26/home-assistant-os-12-support-for-raspberry-pi-5/#faster-backups) 和[重新启动](/home-assistant/blog/2024/03/06/release-20243/#home-assistant-boots-twice-as-fast)。这使得人们可以让硬件运行更长时间，这就是我们的最终目标🌎。CM4 不仅对于大多数用户而言功能强大，而且使用寿命也很长。 树莓派甚至确认他们将**完全支持 CM4 [直到 2034 年](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000#:~:text=Obsolescence%20Statement)💪,** 并将继续生产它们。

## HAOS 14 的其他补充

关于新支持的硬件，我们发布的 Home Assistant OS 14 将不仅支持 CM5，还支持 Hailo-8 AI 加速器。这是在[树莓派 AI Kit](https://www.raspberrypi.com/docs/accessories/ai-kit.html) 或上个月更强大的树莓派 AI HAT+ [发布](https://www.raspberrypi.com/news/raspberry-pi-ai-hat/) 中找到的 AI 加速器，该加速器专门用于树莓派 5。对于那些使用 Pi 5 的用户来说，他们现在可以将 AI 处理（例如物体或人员检测）卸载到这个高效的附加组件上。

## 结论

我们非常自豪的是，经过这么长时间，黄色Home Assistant仍然是高级用户的最佳选择之一。我们很高兴看到我们的用户如何利用 CM5，并且很高兴看到 CM4 继续成为具有长期支持的绝佳选择。