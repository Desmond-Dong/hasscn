---
title: "通用 x86-64"
description: '此开发板配置旨在支持大多数使用 UEFI 启动的 x86-64 系统。 它的主要目标是支持 Intel NUC 迷你 PC 及类似系统。已测试硬件如下。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 通用 x86-64
---
# 通用 x86-64

## 支持的硬件

此开发板配置旨在支持大多数使用 UEFI 启动的 x86-64 系统。
它的主要目标是支持 Intel NUC 迷你 PC 及类似系统。已测试硬件如下。

## 已测试硬件

| Device                | Release Date | Support | Config      |
|-----------------------|--------------|---------|-------------|
| Intel NUC5CPYH        | Q3 2015      | yes     | [generic_x86_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC6CAYH        | Q4 2016      | yes     | [generic_x86_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC6CAYS        | Q4 2016      | yes     | [generic_x86_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC7i3DNHE      | Q3 2017      | yes     | [generic_x86_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC10i3FNK2     | Q4 2019      | yes     | [generic_x86_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Gigabyte GB-BPCE-3455 | 2017         | yes*    | [generic_x86_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |

\* 如果你需要控制台，请在 `cmdline.txt` 中加入 `nomodeset`。

## 要求

- 支持 x86-64
- 支持 UEFI 启动
- SATA/AHCI 或 eMMC 存储
- 支持的 NIC：
  - Intel 千兆网卡（e1000、igb，来自 Linux mainline）
  - Intel PCIe 千兆网卡（e1000e，通过 *https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/package/intel-e1000e* 中的 out-of-tree 模块提供）
  - Realtek 千兆网卡（r8169）
  - Intel Wireless Wi-Fi 802.11ac（iwlwifi，见下文）

## Wi-Fi

支持以下网卡：

- Intel Wireless 3160
- Intel Wireless 7260
- Intel Wireless 7265
- Intel Wireless-AC 3165
- Intel Wireless-AC 3168
- Intel Wireless-AC 8260
- Intel Wireless-AC 8265
- Intel Wireless-AC 9260
- Intel Wireless-AC 9461
- Intel Wireless-AC 9462
- Intel Wireless-AC 9560

## Bluetooth

Intel Wireless 网卡集成的 Bluetooth 工作正常，其他方案尚未测试。

## 安装

请确认已在 UEFI BIOS 设置中禁用 Secure Boot。

目前还没有开箱即用的简易安装方式。安装检查清单如下：

- 使用 PXE 或 USB 将 PC 启动到 live 环境
- 将 Home Assistant OS 镜像复制或下载到该 live 环境
- 解压 `xz` 镜像，并使用 `dd` 将其写入本地硬盘
- 重启
