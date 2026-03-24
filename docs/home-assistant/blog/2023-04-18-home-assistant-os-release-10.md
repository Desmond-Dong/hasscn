---
layout: post
title: "Home Assistant OS 10：更好的内存管理与新开发板支持"
description: "Home Assistant OS 10 发布：改进内存管理，并支持 Hardkernel ODROID-M1 开发板！"
date: 2023-04-18 00:00:00
date_formatted: "April 18, 2023"
author: Stefan Agner
comments: true
categories:
  - Announcements
og_image: /images/blog/2023-04-18-os10/social.png
---

<a href='https://github.com/home-assistant/operating-system/releases/tag/10.0'>
<img title='Home Assistant OS Release 10' alt='Home Assistant OS Release 10 Logo'
     src='/home-assistant/images/blog/2023-04-18-os10/social.png' style='border: 0;box-shadow: none;'>
</a>
<br><br>

**亮点**：

- 支持 Hardkernel ODROID-M1
- 数据盘功能改进：
  - 更可靠
  - 现在支持从一个数据盘迁移到另一个新数据盘
- 改进内存管理，提升整体设备性能，尤其是在低内存场景下
- 更新软件包：Linux、Docker、BlueZ、NetworkManager

对于现有安装，无需手动干预！你可以安全更新，不读这些偏技术向的发布说明也没问题。

## 目录

- [目录](#目录)
- [新开发板支持：Hardkernel ODROID-M1](#新开发板支持hardkernel-odroid-m1)
- [改进的数据盘功能](#改进的数据盘功能)
- [高级内存管理](#高级内存管理)
- [更新的软件包](#更新的软件包)

## 新开发板支持：Hardkernel ODROID-M1

Home Assistant OS 10 现已支持 Hardkernel ODROID-M1 单板计算机！
ODROID-M1 最大亮点是原生支持 NVMe SSD 存储，因此它也成为运行 Home Assistant 的又一个优秀选择。它具备最高 2&nbsp;GHz 的四核 CPU，以及最高 8&nbsp;GB 内存，即使是较高负载的 Home Assistant 安装也能胜任。

目前 Home Assistant 可以从 SD 卡或 eMMC 启动。不过请注意，从 eMMC 启动需要新的启动固件（Petitboot）（详见[开发板专属文档](https://github.com/home-assistant/operating-system/blob/dev/Documentation/boards/hardkernel/odroid-m1.md)）。当前启动固件尚不支持 NVMe SSD 启动，但 NVMe SSD 可以通过数据盘功能使用。

可在 [Ameridroid](https://ameridroid.com/products/odroid-m1) 或 [Hardkernel 官网](https://www.hardkernel.com/shop/odroid-m1-with-4gbyte-ram/)购买 ODROID-M1。

<img src='/home-assistant/images/blog/2023-04-18-os10/hardkernel-odroid-m1.jpg' alt='Hardkernel ODROID-M1 single board computer with NVMe SSD plugged in'>

## 改进的数据盘功能

数据盘功能允许你通过外接磁盘扩展存储。启用数据盘后，所有高频读写数据都会移动到该存储上，只有 Home Assistant OS 本体仍保留在原始存储（例如 SD 卡或 eMMC）上。Home Assistant OS 是只读操作系统 &mdash; 只有在更新操作系统时才会写入 OS 分区。这能确保原有存储的写入磨损降到最低。

在本次 OS 发布中，配合 Supervisor 最新版本，数据盘功能更易用：数据盘选择界面现在会显示可用磁盘型号。某些过去无法识别的边缘场景中，磁盘现在也能被稳定识别并可作为新数据盘使用。

现在还支持从一个数据盘迁移到另一个数据盘：
只需再连接一块磁盘，并再次进入 **Move data disk** 对话框。重启后，数据会自动迁移，旧数据盘就可以断开。你可以在 **Settings** > **System** > **Storage** 的右上角三点菜单中找到该功能。

<img src='/home-assistant/images/blog/2023-04-18-os10/datadisk-new.png' alt='Screenshot showing the new data disk selection dialog'>

## 高级内存管理

在 Home Assistant OS 10 中，低内存设备的整体表现会更好。
首先，我们从 zram 切换到了 zswap，这让我们能够把存储设备用作真正的 swap 空间。我们还调优了内存管理，尽量减少写入存储次数（避免 SD 卡和其他闪存存储的不必要磨损）。

我们还提升了低内存场景下的可靠性和响应速度：
Home Assistant OS 引入了名为 Multi-Gen LRU 的新内存管理机制，并配合抖动（thrashing）防护。这让系统能更快从低内存状态恢复，并保持可响应。

总体建议是使用至少 1&nbsp;GB 内存的开发板，并尽量把内存占用控制在 80% 以下。你可以在 **Settings** > **System** > **Hardware** 中查看整体内存使用情况。

## 更新的软件包

Home Assistant OS 基于最新的 Buildroot 2023.02 构建。
它包含长期支持版本 Linux 内核 6.1，带来更新的驱动和更好的设备支持。容器引擎使用 Docker 23.0.3，为 Supervisor 和 add-ons 提供支持。蓝牙组件 BlueZ 5.66 包含多个 bug 修复，可改善蓝牙设备通信。Network Manager 1.40.16 在与第三方 Thread 边界路由器配合时表现更稳定，尤其是 Apple 边界路由器。我们还专门改进了 Home Assistant OS 在 Thread 场景下的 IPv6 邻居发现支持：当边界路由器从网络中消失时，系统现在可以更快发现，并在可用时切换到其他边界路由器。

希望你喜欢 Home Assistant OS 10.0！如果你有任何问题或反馈，欢迎告诉我们。

_部分产品链接为联盟链接，当你通过这些链接购买时，我们会获得少量佣金。_
