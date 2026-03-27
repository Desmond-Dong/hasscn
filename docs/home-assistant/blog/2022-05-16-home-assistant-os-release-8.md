---
title: Home Assistant OS 发布 8
description: 现已在基于 UEFI 的系统上使用 GRUB2，支持 Home Assistant Yellow，并支持基于 UEFI 的 AArch64 系统！
---
# Home Assistant OS 发布 8

<a href='https://github.com/home-assistant/operating-system/releases/tag/8.0'>
<img title='Home Assistant OS 发布 8' alt='Home Assistant OS 发布 8 Logo'
     src='/home-assistant/images/blog/2022-05-16-os8/social.png' style='border: 0;box-shadow: none;'>
</a>

Home Assistant OS 8.0 稳定版现已可用！

**亮点**：

- 在基于 UEFI 的系统上使用 GRUB2
- 支持更多 Wi-Fi 和蓝牙设备
- 新镜像：Generic AArch64（适用于基于 UEFI 的 AArch64 虚拟机和开发板）
- 新镜像：Home Assistant Yellow

对于现有安装，无需手动干预！即使不阅读这些偏技术的发布说明，你也可以安全更新。

## 目录

- [目录](#目录)
- [操作系统变更](#操作系统变更)
  - [面向 UEFI 系统的 GRUB2](#面向-uefi-系统的-grub2)
  - [底层更新](#底层更新)
  - [其他变更](#其他变更)
- [设备支持](#设备支持)
  - [树莓派](#raspberry-pi)
  - [Home Assistant Yellow](#home-assistant-yellow)
  - [Generic x86-64](#generic-x86-64)
  - [Generic AArch64 支持](#generic-aarch64-支持)

## 操作系统变更

### 面向 UEFI 系统的 GRUB2

对于 Generic x86-64、OVA，以及新的 Generic AArch64，Home Assistant 现在使用 GRUB2 作为引导加载器。GRUB2（GRand Unified Bootloader）是大多数 Linux 发行版采用的事实标准引导程序。我们从 Barebox 切换到 GRUB2 的主要原因，是 Barebox 缺少 AArch64 UEFI 启动支持。我们也预计 GRUB2 会更稳定，尤其是在桌面风格的 x86-64 系统上，因为通用 Linux 发行版广泛使用 GRUB2。虽然我们在 RC 阶段确实遇到过一个 GRUB2 问题，但希望这只是个例。🤞

<img src='/home-assistant/images/blog/2022-05-16-os8/haos-grub2-menu.png' alt='截图：Home Assistant OS 的 GRUB2 菜单。'>

启动菜单会显示两个启动槽。一般情况下你不需要在这里改动选择，除非你想故意启动之前安装的 Home Assistant OS 版本。

注意：从任意 7.x 版本升级是安全的，但我们建议从上一个大版本的最后一个版本升级。这也是测试最充分的升级路径。从任意带 GRUB2 的发布回退时，仅可安全回退到 7.6！如果要回退到早于 7.6 的版本，请先回退到 7.6。

### 底层更新

在底层方面，OS 已更新到最新上游 Linux 5.15 内核，以及 Buildroot 2022.02.1。最新 Buildroot 发布还带来了多个核心组件的新版本，如 systemd 250、NetworkManager 1.34.0 和 Docker 20.10.14。

新增的网络驱动和设置，让 Home Assistant OS 为托管 [OpenThread Border Router add-on] 做好了准备。

### 其他变更

- 支持用于高级防火墙规则的 IP set（OTBR add-on 也会使用）
- 支持通过 DHCP 配置 NTP
- Google Coral 现已使用 Google 最新驱动，支持更多 Coral 设备，例如 PCI Dual Edge TPU
- 现已启用 wpa_supplicant 的旧版 wext 后端，以支持更多 Wi-Fi 设备

## 设备支持

### 树莓派

所有树莓派版本都使用树莓派团队提供的最新 LTS Linux 5.15 内核和固件（tag 1.20220331）。这些版本与当前树莓派 OS 使用的版本一致。

### Home Assistant Yellow

这是首个支持 Home Assistant Yellow 的发布。由于 Home Assistant Yellow 使用树莓派 Compute Module 4，因此当前支持基于常规树莓派支持。Yellow 镜像使用相同的内核和固件版本。对于使用 CM4 Lite（无 eMMC 存储）的用户，Yellow 主板也支持直接从 NVMe 设备启动。

### Generic x86-64

除了迁移到 GRUB2，Generic x86-64 还获得了不少额外设备支持。现在已支持 3945ABG/BG/4965AGN 和 22000 系列 Wi-Fi 设备。

其他变更：

- 支持 32 位 UEFI 启动。这是旧款 Intel Atom 系统所需。请注意，只有引导加载器是 32 位，其他部分仍使用与 64 位 UEFI 启动相同的 64 位二进制文件
- 已包含 Broadcom BNX2/BNX2X 网卡驱动与固件

### Generic AArch64 支持

[@Doridian] 为使用 UEFI 启动流程的通用 AArch64 系统贡献了支持。理论上可支持实体开发板和虚拟机。目前已在 KVM 虚拟机上成功测试。

[@Doridian]: https://github.com/Doridian
[OpenThread Border Router add-on]: https://github.com/home-assistant/addons-development/tree/master/openthread_border_router
