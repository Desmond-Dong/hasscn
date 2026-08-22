---
title: "分区"
sidebar_label: 分区
---

Home Assistant Operating System（HAOS）的分区布局与 Linux 系统上通常使用的布局略有不同。

## 分区表

HAOS 在可能的情况下优先使用 GPT（GUID Partition Table）。某些 SoC 的 Boot ROM 不支持 GPT，在这种情况下，如果可能则使用 hybrid GPT/MBR，否则使用传统 MBR（另请参见 [Metadata](board-metadata.md) 文档）。

## 分区

```text
-------------------------
|       Boot            |
-------------------------
|       Kernel A        |
-------------------------
|       System A        |
|                       |
-------------------------
|       Kernel B        |
-------------------------
|       System B        |
|                       |
-------------------------
|       Bootstate       |
-------------------------
|       Overlay         |
|                       |
...

-------------------------
|       Data            |
|                       |
|                       |
-------------------------
```

### 系统分区

boot 分区通常是 FAT 分区，包含启用启动所需的系统特定内容。在 UEFI 系统上，这是包含 GRUB 二进制文件、配置及其环境文件的 EFI 系统分区。

接下来存储两个版本的 Linux 内核和主操作系统（Kernel A/B 和 System A/B，共 4 个分区）。这允许系统在新版本启动失败时回退到上一个版本（A/B 更新方法）。系统分区仅在更新期间写入，在常规操作下是只读的。

overlay 分区用于存储某些操作系统级别的设置（例如网络设置）。使用文件系统标签 `hassos-overlay` 来查找并挂载此分区。

### 数据分区

数据分区是主分区，包含所有容器（Supervisor/Core/Plug-Ins 和 apps（原 add-ons））以及用户数据。它的 I/O 操作远远多于其他分区，因此如果在快速存储上挂载（例如通过 data disk 功能）受益最大。它被挂载到 `/mnt/data`，部分子目录被 bind mount 到其他位置（如 `/var/lib/docker`）。使用文件系统标签 `hassos-data` 来查找并挂载此分区。

在新安装中，数据分区包含 Supervisor 及其 Plug-Ins 的最新版本（构建时的版本）。没有预装 Home Assistant Core，而是一个较小的 landing page。Supervisor 会在首次启动时下载 Home Assistant Core 的最新版本。这确保了用户在首次启动 HAOS 后以最新版本的 Home Assistant Core 开始使用。

data disk 功能利用了 HAOS 使用 `hassos-data` 标签这一事实：该功能通过分区磁盘并创建一个标签为 `hassos-data-external` 的文件系统来准备磁盘。重启时，文件系统工具 `dumpe2fs` 被用来将现有 `hassos-data` 分区中的所有数据移动到新的分区。最后，将现有数据分区的文件系统标签更改为 `hassos-data-old`（以避免再次被挂载），并将 data disk 上的新数据分区标签更改为 `hassos-data`。
