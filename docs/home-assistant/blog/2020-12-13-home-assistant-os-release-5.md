---
title: 家庭助理操作系统版本 5
description: '<img src=''/home-assistant/images/blog/2020-12-13-os5/social.png'' style=''border: 0;box-shadow: none;''。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
  3 个新设备！
---
# 家庭助理操作系统版本 5

<img src='/home-assistant/images/blog/2020-12-13-os5/social.png' style='border: 0;box-shadow: none;'>

今天我们还发布了 Home Assistant OS 5.8，这是 5.x 的第一个稳定版本
发布系列。

**亮点**：

- 改进了操作系统级别的多播名称解析
- 外接数据盘功能
- 提高了针对容器腐败的可靠性

- 新支持：树莓派 4 – 8GB
- 新支持：ASUS Tinker Board S
- 新支持：ODROID-C4
- 改进：OVA Virtual Image 包含更多驱动程序

＃＃ 目录

- [Table of contents](#table-of-contents)
- [Operating System Changes](#operating-system-changes)
- [Multicast Name Resolution](#multicast-name-resolution)
- [External Data Disk](#external-data-disk)
- [Improved Reliability](#improved-reliability)
- [Under the Hood](#under-the-hood)
- [Board Support](#board-support)
- [树莓派](#raspberry-pi)
- [ODROID](#odroid)
- [Open Virtualization Appliance/Intel NUC](#open-virtualization-appliance-intel-nuc)
- [New Board Support](#new-board-suport)
- [Other Changes](#other-changes)

## 操作系统变化

### 多播名称解析

版本5使用systemd-resolved在操作系统上提供DNS服务
级别并充当多播名称解析响应者。此外，mDNS
systemd-resolved 还支持 LLMNR 主机名解析协议。在
实践，这使得发现 Home Assistant OS 的新安装可以工作
在大多数情况下，使用 `http://homeassistant.local:8123` 或
`http://homeassistant:8123`。

### 外部数据盘

在版本 4 中，我们引入了外部数据磁盘支持。命令 `datactl`
允许将主数据分区移动到连接到系统的任何磁盘。这
启动分区和主操作系统分区保留在启动介质上
（通常是 SD 配合）。使用这种方法比引导更可靠
来自 USB 的系统。从 USB 启动需要软件堆栈的多个部分
重新发现外部存储。在版本5中我们制作了外部数据盘
功能更强大，初始移动过程更快。我们计划
进一步改进该功能，并很高兴收到您的反馈！

### 提高可靠性

启动 Home Assistant Supervisor 的主系统服务现在更加可靠。
家庭助理操作系统现在能够检测大多数损坏的主管容器
情况并自动下载它的新版本。文件系统检查
也已扩展到启动分区，这确保了所有文件
现在正在检查系统。

### 幕后花絮

在幕后，我们更新到了 Buildroot 2020.11，带来了大量新软件
版本以及错误和安全修复。收到的一些关键部件
更新是 systemd 246 和 AppArmor 版本 3.0。

## 董事会支持

### 树莓派

所有树莓派版本现在都使用Linux Kernel 5.4，就像树莓派操作系统一样。
随着迁移到 U-Boot 2020.10，我们现在还支持 8GB 树莓派
的记忆。有了新的内核，U-Boot Home Assistant 操作系统现在也可以运行在
计算模块 4 以及 Pi 400（键盘）。键盘是
可能不是家庭助理等无头系统的理想外形尺寸
操作系统，但它具有良好的冷却能力，这使得它不是最糟糕的选择:-)。我们
最近测试了Home Assistant OS的64位版本，感觉更多
很乐意推荐树莓派 4 的 64 位版本。

### 奥德罗伊德

ODROID 平台现在使用 Linux 5.9，这为所有平台带来了改进的支持
ODROID 平台，例如 ODROID N2(+)。对于 N2(+)，实时时钟为
现在也支持了。

### 开放虚拟化设备/Intel NUC

x86 平台（Intel NUC、OVA - 开放虚拟化设备）现在使用
Linux 5.9。 OVA 图像的内核已启用英特尔网络的新驱动程序
具有虚拟功能、适用于 Hyper-V 的 PCIe 直通或支持的设备
音频（HDA 音频设备）。

### 新董事会支持

除了 ASUS Tinker Board 之外，我们现在还支持 Tinker Board S，它是一个变体
具有快速板载 eMMC 存储。感谢 [@ubergeeek801] 我们现在也得到了支持
ODROID-C4，是类似形式的树莓派的经济高效替代品
因素。

## 其他变化

构建管道现在使用 GitHub 动作，我们使用以下方式压缩图像
xz 压缩算法代替 gz。闪烁过程将保持
相同：Etcher 支持 gz 和 xz 刷新。

目前我能想到的就只有这些了。 5.8 版本将稳定发布
今天频道，所以请留意 Supervisor 中的更新通知
部分。 图片可在发布部分找到
[GitHub](https://github.com/home-assistant/operating-system/releases)。
