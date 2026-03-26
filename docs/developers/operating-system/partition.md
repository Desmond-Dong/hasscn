---
title: "分区"
sidebar_label: 分区
---

Home Assistant Operating System（HAOS）的分区布局与 Linux 系统中通常使用的布局略有不同。

## Partition table

HAOS 会尽可能优先使用 GPT（GUID Partition Table）。某些 SoC 的 Boot ROM 不支持 GPT，在这种情况下，如果可行则会使用混合 GPT/MBR，否则使用传统 MBR（另请参阅 [Metadata](/developers/operating-system/board-metadata) 文档）。

## Partitions

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

### System partitions

boot 分区通常是一个 FAT 分区，包含用于启动的系统特定内容。在 UEFI 系统上，它是 EFI system partition，包含 GRUB 二进制文件、配置及其环境文件。

接下来会存储 Linux 内核和主操作系统的两个版本（Kernel A/B 和 System A/B，共 4 个分区）。这样一来，如果新版本启动失败，系统就可以回退到上一个版本（A/B 更新机制）。系统分区只会在更新期间写入，在常规运行时为只读。

overlay 分区用于存储某些操作系统级设置（例如网络设置）。系统使用文件系统标签 `hassos-overlay` 来查找并挂载该分区。

### Data partition

data 分区是主分区，包含所有容器（Supervisor/Core/Plug-Ins 和应用，原 add-ons）以及用户数据。它的 I/O 操作远多于其他分区，因此如果挂载在高速存储上（例如通过 data disk 功能），收益最大。它被挂载到 `/mnt/data`，其中一些子目录还会 bind mount 到其他位置（例如 `/var/lib/docker`）。系统使用文件系统标签 `hassos-data` 来查找并挂载该分区。

在全新安装中，data 分区包含构建时最新版本的 Supervisor 及其 Plug-Ins。不会预装 Home Assistant Core，而是提供一个较小的 landing page。Supervisor 会在首次启动时下载最新版本的 Home Assistant Core。这样可以确保用户第一次启动 HAOS 后，就使用最新版本的 Home Assistant Core。

data disk 功能正是利用了 HAOS 使用 `hassos-data` 标签这一点：该功能会通过分区并创建带有 `hassos-data-external` 标签的文件系统来准备磁盘。系统重启后，文件系统工具 `dumpe2fs` 会将现有 `hassos-data` 分区中的所有数据移动到新分区。最后，现有数据分区的文件系统标签会改为 `hassos-data-old`（以避免再次被挂载），而数据盘上的新数据分区则会改为 `hassos-data`。
