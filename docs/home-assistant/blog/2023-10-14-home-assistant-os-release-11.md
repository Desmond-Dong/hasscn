---
title: 'Home Assistant OS 11: Low-latency scheduler and VM snapshot improvements'
description: Home Assistant OS 11 released with low-latency scheduler enabled and
  VM snapshot improvements on KVM/Proxmox.
---
# Home Assistant OS 11: Low-latency scheduler and VM snapshot improvements

With Home Assistant OS 11, there is no big or flashy feature to highlight. Rather, there are a lot of small improvements and little gems. The increased use of 蓝牙 has uncovered quite some issues on Home Assistant OS; some of which we are still working on. One of the main issues in Home Assistant OS 10 was caused by a bug in the processing of 蓝牙 advertisements in the Linux kernel’s 蓝牙 stack itself. With the help of our community, we managed to reproduce, pinpoint, and provide the necessary hints to the 蓝牙 开发者. This led to a fix in the 蓝牙 stack not only for Home Assistant OS and 受监管模式 users but for the Linux community in general 🎉 (see issue https://github.com/home-assistant/operating-system/issues/2535 for details).

We’ve also worked on the landing page which is bundled with Home Assistant OS 11. The landing page is visible to the user when starting a fresh 安装 of Home Assistant OS for the first time. It features the same new look as the Home Assistant 核心 onboarding flow, and tracks issues during the bootstrapping phase, automatically displaying 错误 if they occur during that critical 设置 phase.

<img src='/home-assistant/images/blog/2023-10-14-home-assistant-os-11/home-assistant-os-11-landing-page.png' alt='Screenshot of the new Home Assistant landing page'>

The new landing page shipped with Home Assistant OS 11

This month we at Nabu Casa got a new addition to the Home Assistant OS team: With [Jan Čermák](https://github.com/sairon) joining, we will have more bandwidth to implement new features as well as to tackle issues reported by our community. Welcome Jan!

And finally: Home Assistant OS 11 will be pre-已安装 in the next batch of Home Assistant Green 🎉

Enjoy the latest 版本 of Home Assistant OS!

Stefan

<!--more-->

- [Linux' preemptible kernel configuration](#linux-preemptible-kernel-configuration)
- [VM filesystem freeze is being relayed to Home Assistant](#vm-filesystem-freeze-is-being-relayed-to-home-assistant)
- [Docker and containerd upgrades](#Docker-and-containerd-upgrades)
- [More Highlights in Home Assistant OS 11](#more-highlights-in-home-assistant-os-11)

## Linux' preemptible kernel 配置
We've applied Linux's preemptible kernel 配置 across the board. The result is lower latencies even on busy systems (for example due to slow I/O operations), making your smart home even more responsive.

## VM filesystem freeze is being relayed to Home Assistant
VM filesystem freeze (as triggered by VM snapshots) is a neat feature for more advanced setups based on Proxmox (or other KVM based VMs).
Today, Home Assistant's recorder 集成 uses a database underneath (by default this is SQLite). When  Home Assistant takes a 备份, the Supervisor notifies the database engine before copying the database files (currently, this is implemented for SQLite and MariaDB). So far, this didn't work for VM filesystem freezes With that 通知, the database engine can take the necessary steps to ensure that the database files are in a consistent 状态 before the 备份 takes place.
However, when creating a snapshot using the VM snapshot feature, the database doesn’t know about this, and the snapshot can end up with an inconsistent 状态 of the database. On snapshot 恢复, the database may or may not be able to recover from that inconsistent 状态. This can lead to partial or even complete data loss of the recorder data.
With Home Assistant OS 11, on Proxmox/KVM-based VMs, when using the snapshot feature, the file system freeze is now relayed to Home Assistant. Home Assistant then uses the same 通知 mechanism as backups are using. This ensures that VM snapshots are always coherent, making sure rollbacks of your smart home systems are reliable.

## Docker and containerd Upgrades

In this 发布, Home Assistant OS has adopted the latest versions of Docker (v24.0.6) and containerd (v1.7.6), ensuring better performance and 容器 management. We’ve also improved the containerd 配置 to drop unnecessary components. With this, containerd uses less CPU and memory resources, ensuring better overall performance.

## More Highlights in Home Assistant OS 11

- **Consistent network interface naming**: On Arm-based boards, network names are now enumerated based on the 设备 tree. This means that the first Ethernet 设备 will no longer be named eth0 but end0. The same network 配置 used previously is automatically applied to the network interface with the new name.
**This can be a breaking change ⚠️**: If you use the name of the Ethernet interface in custom 脚本 or 自动化, you'll have to adjust to the new name (as shown in the network 设置)!
- **蓝牙 improvements**: Updating to a newer 版本 of BlueZ, fix for the 蓝牙 LE advertisement stall bug, and optimizing 蓝牙 设备 cache management.
- **Improved kernel 配置**: Our improved kernel 配置 aims to improve Docker's overlayfs performance, making 容器 operations smoother.
- **Support for LED control on Home Assistant Green**: The three LEDs on the front of Home Assistant Green can now be controlled through hardware 设置.
- **Adjusted development workflow** (my personal favorite, but I might be biased 😉): Our adjusted development workflow allows for more incremental changes and incorporates more 自动化. This will make it easier for 开发者 to work on and improve Home Assistant OS.
