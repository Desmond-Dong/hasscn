---
title: Home Assistant 操作系统
description: 'Home Assistant Operating System（HAOS）是一个专为运行 Home Assistant 打造的操作系统，适用于单板计算机和 x86-64 系统。它的目标是提供稳定、低维护成本的运行环境。 本页属于 Home Assistant 开发者文档。'
sidebar_label: 简介
---
# Home Assistant 操作系统

Home Assistant Operating System（HAOS）是一个专为运行 Home Assistant 打造的操作系统，适用于单板计算机和 x86-64 系统。它的目标是提供稳定、低维护成本的运行环境。

HAOS 使用 [Buildroot](https://buildroot.org/) 构建。严格来说，Buildroot 并不是一个完整的 Linux 发行版，而是一套用于生成 Linux 系统镜像的基础设施和构建工具。它支持针对不同架构进行交叉编译，因此特别适合为资源较少的设备（例如基于 Arm 的系统）构建系统。HAOS 基于一套较为标准的 Linux 与 GNU 软件栈，包括 Linux 内核、GNU C 库（glibc）、systemd 初始化守护进程，以及 Home Assistant Supervisor 所需的 Docker 容器引擎。

## 继续阅读

- [开始开发 Home Assistant 操作系统](/developers/operating-system/getting-started)
- [系统配置](/developers/operating-system/configuration)
- [部署流程](/developers/operating-system/deployment)
- [网络配置](/developers/operating-system/network)
- [系统更新](/developers/operating-system/update-system)
- [调试指南](/developers/operating-system/debugging)
- [开发板支持概览](/developers/operating-system/boards/overview)

### 组件

- **Bootloader：**
  - [GRUB](https://www.gnu.org/software/grub/)：用于支持 UEFI 的设备
  - [U-Boot](https://www.denx.de/wiki/U-Boot)：用于不支持 EFI 的设备
- **操作系统：**
  - [Buildroot](https://buildroot.org/)：用于生成 Linux 发行版的构建系统
- **文件系统：**
  - [SquashFS](https://www.kernel.org/doc/Documentation/filesystems/squashfs.txt)：用于只读文件系统（使用 LZ4 压缩）
  - [ZRAM](https://www.kernel.org/doc/Documentation/blockdev/zram.txt)：用于 `/tmp`、`/var` 和 swap（使用 LZ4 压缩）
- **容器平台：**
  - [Docker Engine](https://docs.docker.com/engine/)：用于在容器中运行 Home Assistant 组件
- **更新：**
  - [RAUC](https://rauc.io/)：用于空中下载（OTA）和 USB 更新
- **安全：**
  - [AppArmor](https://apparmor.net/)：Linux 内核安全模块
