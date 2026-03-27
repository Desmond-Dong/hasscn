---
title: macOS
description: '本指南介绍如何在 macOS 上使用虚拟机安装 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# macOS

## 安装 Home Assistant Operating System

本指南介绍如何在 macOS 上使用虚拟机安装 Home Assistant。

### 下载合适的镜像

- [VirtualBox (Intel 芯片)][vdi] (.vdi)
- [VirtualBox (Apple Silicon 芯片)][vmdk_arch64] (.vmdk)
- [UTM (Apple Silicon)](https://mac.getutm.app/)

下载后，解压缩镜像。如果镜像是 ZIP 文件，解压缩它。

如果您已经在运行支持的虚拟机管理程序，请按照本指南操作。如果您不熟悉虚拟机，请直接在 [Home Assistant Yellow](/home-assistant/installation/yellow)、[树莓派](/home-assistant/installation/raspberrypi) 或 [ODROID](/home-assistant/installation/odroid) 上安装 Home Assistant OS。

### 创建虚拟机

将设备镜像加载到您的虚拟机管理程序中。

最低推荐配置：

- 2 GB RAM
- 2vCPU

### VirtualBox 配置

#### 创建虚拟机

1. 打开 VirtualBox 并选择 **新建** 按钮。
2. **名称**：输入 Home Assistant。
3. **ISO 镜像**：保留为 **无**。
4. **类型和版本**：选择 **Linux**，然后选择 **Oracle Linux (64-bit)**（Apple Silicon Mac 选择 **ARM 64-bit**）。
5. 选择 **下一步**。

#### 配置硬件

1. **基本内存**：至少 **2048 MB** (2GB)。
2. **处理器数量**：至少 **2**。
3. **EFI**：勾选 **启用 EFI（仅限特殊操作系统）**。
4. 选择 **下一步**。

#### 附加 Home Assistant 磁盘

1. 选择新创建的 VM，选择 **设置**。
2. 转到 **存储** 部分。
3. 移除占位符磁盘。
4. 选择 **添加硬盘**，选择您下载的 `.vdi` 文件。

#### 配置网络

1. 在 **网络** 部分，将 **连接方式** 改为 **桥接网卡**。
2. 选择您用于互联网访问的适配器。

### UTM 配置（Apple Silicon Mac）

如果您使用的是 Apple Silicon Mac，可以使用 UTM：

1. 下载并安装 [UTM](https://mac.getutm.app/)。
2. 创建新的虚拟机。
3. 选择 "Virtualize" 或 "Emulate"。
4. 选择 Linux。
5. 分配至少 2GB 内存和 2 个 CPU。
6. 选择下载的镜像文件。

### 启动虚拟机

1. 启动虚拟机。
2. 观察 Home Assistant Operating System 的启动过程。
3. 完成后，在浏览器中访问 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>。

安装并可以访问 Home Assistant Operating System 后，您可以继续进行初始设置。

:::info [初始设置](/home-assistant/getting-started/onboarding/)
:::

[vdi]: https://github.com/home-assistant/operating-system/releases/download//haos_ova-.vdi.zip
[vmdk_arch64]: https://github.com/home-assistant/operating-system/releases/download//haos_ova--aarch64.vmdk.zip