---
title: "虚拟机"
description: '目前由于此前的 OVA 发行方式存在问题，我们只发布 VMDK 虚拟磁盘。我们正在研究恢复 OVA 发行方式的可行方案，不过 VMDK 可用于上面列出的 hypervisor。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 虚拟机
---
# 虚拟机

## 支持的 Hypervisor

| Hypervisor          | Vendor    | Support         | Config             |
|---------------------|-----------|-----------------|--------------------|
| HyperV              | Microsoft | yes, via VMDK   | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig)              |
| VirtualBox          | Oracle    | yes, via VMDK   | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig)              |
| VMware              | VMware    | yes, via VMDK   | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig)              |

目前由于此前的 OVA 发行方式存在问题，我们只发布 VMDK 虚拟磁盘。我们正在研究恢复 OVA 发行方式的可行方案，不过 VMDK 可用于上面列出的 hypervisor。

## 要求

在虚拟机中使用此 VMDK 需要满足以下条件：

- 操作系统：Other 4.x 或更高版本 Linux（64 位）
- 已启用 UEFI 启动支持
- SATA 磁盘控制器
- 至少 1GB RAM
- 至少 2 个 vCPU
- 已分配网络
