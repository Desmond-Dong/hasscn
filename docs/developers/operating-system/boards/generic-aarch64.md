---
title: "Generic AArch64"
sidebar_label: Generic AArch64
---

## 支持的硬件

此 board 配置旨在支持大多数通过 UEFI 启动的 aarch64 系统。
经测试的硬件如下所示。

## 已测试的硬件

| 设备                | 发布日期 | 支持状态 | 配置      |
|---------------------|----------|----------|-----------|
| QEMU                  | QEMU         | 是     | [generic_aarch64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_aarch64_defconfig) |


## 要求

- aarch64 支持
- UEFI 启动

## Wi-Fi

WiFi 尚未测试。

## 蓝牙

Bluetooth 尚未测试。

## 安装

请确保已在 UEFI BIOS 设置中禁用 secure boot。

目前还没有漂亮的安装方法。检查清单如下：
- 使用 PXE 或 USB 将 PC 启动到 live environment
- 将 Home Assistant OS 镜像复制或下载到 live environment 中
- 使用 unxz 解压镜像，并通过 dd 写入本地硬盘
- 重启
