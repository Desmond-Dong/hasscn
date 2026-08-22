---
title: "Virtual Machine"
sidebar_label: Virtual Machine
---

## 支持的 Hypervisor

| Hypervisor          | 厂商    | 支持状态         | 配置             |
|---------------------|---------|-----------------|------------------|
| HyperV              | Microsoft | 是，通过 VMDK   | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig)              |
| VirtualBox          | Oracle    | 是，通过 VMDK   | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig)              |
| VMware              | VMware    | 是，通过 VMDK   | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig)              |

由于之前的 OVA 分发版本存在问题，目前我们只发布 VMDK 虚拟磁盘。我们正在研究恢复 OVA 分发版本的方案，不过，VMDK 适用于上述列出的 hypervisor。

## 要求

在虚拟机中使用此 VMDK 需要满足以下条件：

- 操作系统：Other 4.x 或更高版本的 Linux (64-bit)
- 已启用 UEFI 启动支持
- SATA 磁盘控制器
- 至少 1GB RAM
- 至少 2 个 vCPU
- 已分配的网络
