# 通用 AArch64

## 支持的硬件

该开发板配置旨在支持大多数采用 UEFI 启动的 aarch64 系统。
已测试过的硬件如下所示。

## 已测试硬件

| Device                | Release Date | Support | Config      |
|-----------------------|--------------|---------|-------------|
| QEMU                  | QEMU         | yes     | [generic\_aarch64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_aarch64_defconfig) |

## 要求

* aarch64 支持
* UEFI 启动

## Wifi

WiFi 尚未测试。

## Bluetooth

Bluetooth 尚未测试。

## 安装

请确保在 UEFI BIOS 设置中禁用了 secure boot。

目前还没有现成的便捷安装方式。检查清单如下：

* 使用 PXE 或 USB 将 PC 启动到 live 环境
* 将 Home Assistant OS 镜像复制或下载到该 live 环境中
* 解压 `xz` 镜像并使用 `dd` 写入本地硬盘
* 重启
