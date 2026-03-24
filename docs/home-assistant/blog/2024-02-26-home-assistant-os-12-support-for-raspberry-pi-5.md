---
title: Home Assistant OS 版本 12 和 Supervisor 更新中支持 Raspberry Pi 5 等
description: HAOS 12 增加了对 Raspberry Pi 5 和 ODROID-M1S 板的支持，Linux 内核更新至 6.6。此外，备份变得更快，并且附加组件现在可以在不应自动更新时发出信号。
---
**TL;DR:** Home Assistant OS 12 增加了对树莓派 5 和 ODROID-M1S 主板的支持，Linux 内核更新至 6.6。此外，备份变得更快，并且附加组件现在可以在不应自动更新时发出信号。

<p><img src='/home-assistant/images/blog/2024-02-haos12/haos12.png' class='no-shadow' /></p>

## 树莓派 5

随着Home Assistant OS 12的发布，我们正式宣布支持树莓派5！许多 Home Assistant OS 用户在过去几个月中对预览版进行了广泛的测试，在树莓派 5 特定更新机制出现一些最初的问题之后，今天一切都稳定可靠。由于目前有三分之一的Home Assistant用户使用树莓派板作为他们的专用Home Assistant系统，我们相信这种支持将使许多用户非常高兴！

与其他树莓派主板相比，HAOS 不使用 U-Boot 作为额外的引导加载程序。相反，树莓派的内置“tryboot”功能用于在更新失败时自动回退到以前的发布。这种新的更新机制集成要求我们有更长的测试阶段。

在我们的测试中，树莓派 5 更高的 CPU 时钟（高达 2.4GHz）使 Home Assistant 与之前的树莓派主板相比感觉明显更快。此外，提供 NVMe SSD 支持的树莓派 HAT 允许您通过快速、可靠且经济高效的存储来扩展您的树莓派。我们建议使用 SD 卡作为启动介质，并使用[数据磁盘功能](/home-assistant/common-tasks/os/#using-external-data-disk) 将大部分 Home Assistant 安装移动到 NVMe 上。这很容易设置并保证可靠的启动。

## ODROID-M1S

树莓派 5 并不是此版本支持的唯一新主板。我们很高兴地宣布，由于 Tim Lunn (darkxst) 的社区贡献（为 ODROID-M1S 提供了主板支持），韩国制造商 Hardkernel 提供的受支持 ODROID 设备系列变得更加庞大。 ODROID-M1S 是 Hardkernel 推出的最新单板计算机，与 Home Assistant OS 10 中添加的已受支持的 ODROID-M1 类似。这款新主板提供更纤薄的外形、板载 4 或 8 GB RAM 以及嵌入式 64 GB eMMC 存储。 Home Assistant OS 可以从 SD 控制器启动，也可以使用 [文档](https://github.com/home-assistant/operating-system/blob/dev/docs/boards/hardkernel/odroid-m1s.md) 中描述的过程将系统刷新到 eMMC 控制器。虽然该主板还有一个用于固态驱动器的 NVMe 插槽，但不支持将其作为引导设备。不过，就像在树莓派5上一样，它仍然可以用作数据盘。

就像它的大兄弟一样，ODROID-M1S 由四核 ARM Cortex-A55 提供动力，但虽然 ODROID-M1 具有（非常轻微）更强大的 Rockchip RK3568 SoC，但该主板配备了 RK3566。一些更好奇的读者可能会注意到这与我们的 Home Assistant Green 上的处理器相同！虽然这两个板之间有一些相似之处，但 Home Assistant Green 可以为您提供无缝的开箱即用体验，让您在几分钟内即可设置智能家居。但 Home Assistant 还涉及选择的自由，因此，如果您正在寻找更 DIY 的方法，ODROID-M1S 可能是您的正确选择。

## Linux 6.6Home Assistant OS 12 现在配备 Linux 内核 6.6！对于那些想要在以前的 6.1 内核中缺乏支持的较新硬件上运行 Home Assistant 的人来说，这是个好消息。此版本更新还允许我们扩展支持的 Wi-Fi 和蓝牙配对列表，包括您可能在新的迷你 PC（Home Assistant OS 的流行平台）中找到的列表。那些在树莓派（包括 Home Assistant Yellow 中的 CM4）上运行安装的人可能会注意到他们的内核版本仍然以 6.1 开头。这是因为我们没有使用上游内核，而是使用树莓派开发者维护的下游内核。但这个内核也更新到了最新的稳定版本，我们希望这能解决一些零星的错误。

Home Assistant OS 坚持 LTS（长期支持）内核，通常每年发布一次 - 就像我们用于 Home Assistant OS 的基本系统 Buildroot 一样。这次，我们稍微提前了一些，因为通常内核更新是与 Buildroot 版本一起更新的。但不用担心，Buildroot 更新也即将推出，我们预计将其更新包含在接下来几周内发布的下一个小型 Home Assistant 操作系统版本之一中。今年 Home Assistant OS 的春季大扫除到此结束，我们将准备好再次关注新功能和改进！

## 更快的备份

Home Assistant Supervisor 和 Core 的内置备份功能变得更快。得益于 bdraco 的贡献，备份功能通过名为 isal 的库获得了更快的压缩速度，该库为压缩和解压缩提供了优化的低级函数。更重要的是，备份功能现在避免了中间副本，尤其是在速度较慢的存储介质上速度更快。如果您以前使用未压缩的备份，因为备份过去对您来说太慢，那么现在是时候再次尝试压缩备份了！ 😀

<p><img src='/home-assistant/images/blog/2024-02-haos12/supervisor-backup-speed-improvements.png' class='no-shadow' alt='Comparison of the speed of a 100MB 备份 on a Home Assistant Yellow, between Supervisor 2023.12.1 and 2024.02.0.' /></p>

Home Assistant OS 用户的备份功能是 Supervisor 的一部分。您将在过去几周的版本中逐步收到改进。在撰写本文时，您的安装应在 Home Assistant Supervisor 2024.02.0 上运行，并内置所有这些改进。

## 更安全的附加自动更新

最后但并非最不重要的一点是，Supervisor 具有附加组件的自动更新标志。但是，根据附加组件更新的性质，新版本可能需要用户干预或进行重大更改。附加开发人员现在可以选择阻止自动更新此类版本。尽管启用了自动更新，但使用自动更新功能的用户可能会看到更新通知。这意味着该附加组件的作者决定不应自动更新此特定更新，而应由用户手动批准。

注意：我们通常不建议对附加组件进行自动更新，因为即使是安全更新也可能会干扰正常操作。例如，在自动更新 Z-Wave JS 等附加组件期间，您的 Z-Wave 设备会意外地在短时间内变得不可用。对于此类附加组件，更好的方法是每隔一段时间计划一些时间维护您的 Home Assistant 系统，并批量更新您的附加组件。