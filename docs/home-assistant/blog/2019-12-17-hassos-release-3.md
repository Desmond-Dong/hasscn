---
title: HassOS 3 发布！支持 Raspberry Pi 4
description: '虽然比原计划稍晚一些，但我们很高兴宣布：Hass.io Operating System（HassOS）3 版本已发布，正好赶上圣诞节！。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# HassOS 3 发布！支持 Raspberry Pi 4

虽然比原计划稍晚一些，但我们很高兴宣布：Hass.io Operating System（HassOS）3 版本已发布，正好赶上圣诞节！

太长不看版，变更速览：

- 正式支持 RPi4
- Linux LT 4.19
- Buildroot LT 2019
- RPi3 支持 USB 启动
- 通过 USB/GSM 调制解调器实现 SMS 集成
- 支持 Qemu Agent
- 为虚拟设备优化内核
- 改进自动磁盘扩容
- 为数据分区外置打下初步基础

## 树莓派

在这个稳定版 HassOS 中，我们现在正式支持树莓派 4！树莓派 4 是一款非常适合开始使用 Hass.io 和 Home Assistant 的强大设备。

[@rbray89](https://github.com/rbray89) 为这个版本投入了很多精力，加入了呼声很高的 USB 启动支持！请注意，目前该能力仅限 RPi3 设备。请务必仔细阅读 USB 启动[工作方式](https://github.com/home-assistant/hassos/blob/rel-3/docs/boards/raspberrypi.md#usb-boot)，并关注其有限的[硬件支持范围](https://community.home-assistant.io/t/hass-io-transfer-from-sd-卡片-to-ssd-or-usb/97452/19)。

## Hypervisor / 在虚拟机中运行 HassOS

用于虚拟设备的 HassOS 镜像也获得了一些实用更新。我们优化了 Linux 内核，以支持更多虚拟硬件。

我们现在已在 HassOS 中集成 QEMU Agent。如果你运行在基于 QEMU 的 Hypervisor（如 Proxmox 或 Libvirt）上，你将能在 Hypervisor 控制面板中看到更多信息，获得正确的关机支持，以及更好的虚拟机备份/快照支持。

最后，自动磁盘扩容也有所改进。如果你的虚拟设备需要更多磁盘空间，只需在 Hypervisor 中扩容，HassOS 会在下次启动时自动识别。

我们要强调：在虚拟化系统中，以虚拟机方式运行 Hass.io 是**唯一**受支持的方法。近期我们看到一些“技巧教程”教人把 Hass.io 跑在 Docker 或 LXC 等容器里，我们**不推荐**这样做，最终你会遇到各种问题。

## 如何更新到 HassOS 3

如果你已经在运行 HassOS，那么你已经拥有完整 Hass.io 体验，这次升级会非常轻松。

要通过用户界面更新，请进入 Home Assistant 前端，在侧边栏中选择 **Hass.io** 打开 Hass.io 面板。然后切换到 System 标签，在 “Host system” 卡片中按下 **更新** 按钮。如果尚未显示更新，请先在 “Hass.io supervisor” 卡片中按 **重载** 按钮，让系统立即检查更新。

另一种方式是使用 SSH 插件自带的 CLI。运行以下命令即可触发升级：`hassio os update --version 3.7`。

## 更新说明（2019-12-18）

关于“支持虚拟环境”和“在自定义 Linux 上运行 Hass.io”的表述引发了一些误解，这里做一次澄清。

受支持的 Hass.io 运行方式记录在这里：[/installation/](/home-assistant/installation/)

这也包括在 Linux 上使用 [Generic Linux](https://github.com/home-assistant/hassio-installer) 安装器运行 Hass.io，这同样是受支持的方法。

Hass.io 部分运行在本机，但大部分能力运行在多个容器中。我们列出的所有安装类型都遵循这一设计。

如果你使用 VMWare、ProxMox 或其他虚拟化环境，可以使用 HassOS OVA/VMDK 运行虚拟机。或者你也可以使用 Ubuntu 虚拟机，并配合受支持的 generic Linux 安装器。

我们**不支持**任何此类 LXC Hack 方案，例如：<https://github.com/whiskerz007/proxmox_hassio_lxc>。这些方案尝试把所有内容塞进**单个**容器中，[这会导致问题](https://community.home-assistant.io/t/hassio-安装-on-lxd-lxc-容器-ubuntu-18-04/151543/2)。Hass.io 并非为在 LXC 这类容器化系统中完整运行而设计。

希望这能澄清我们之前的表述。
