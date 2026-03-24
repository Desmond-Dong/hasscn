---
title: 重复的 Home Assistant OS 安装
description: 如何解决在同一系统上有多个 Home Assistant OS 安装导致的问题。
---

## 问题

检测到多个 Home Assistant OS 安装，这可能导致系统无法启动，特别是在更新后。当您在连接到同一设备的不同存储设备（如 SD 卡、USB 驱动器或内部存储）上多次安装 Home Assistant OS 时，通常会出现此问题。这种不匹配可能导致：

- 即使更新后，您的系统仍启动到旧版本的 Home Assistant OS。
- 完全启动失败，导致系统无法启动。
- 其他形式的不可预测行为。

## 解决方案

确保您的系统上只有一个 Home Assistant OS 安装。为此，请按照以下步骤操作：

1. 创建系统的[完整备份][备份]。
2. 将备份安全地存储在另一个设备上。
3. 关闭您的 Home Assistant 系统并断开所有存储设备。
4. 在您想要使用的存储设备上[安装 Home Assistant OS][安装]，擦除其他设备。
5. 在[入门][onboarding]期间上传备份以恢复您之前的配置。

按照这些步骤可确保 Home Assistant OS 仅安装在单个存储设备上。如果您使用的是[外部数据磁盘][data-disk]功能，在首次使用此存储设备启动之前，也要擦除该磁盘。

### 关于不可移动存储设备的说明

如果您有 Home Assistant Yellow 或任何其他具有不可移动存储的设备，在进行安装之前可能也需要擦除此存储。此方法可能因您使用的设备而异。

对于 Home Assistant Yellow，最简单的方法是按照[重新安装 Home Assistant OS 的步骤][yellow-rpiboot]操作，但在通常选择 Home Assistant OS 镜像的步骤中，改为选择 **擦除** 选项。或者，一旦使用 `rpiboot` 实用程序初始化设备，使用任何磁盘管理工具擦除 eMMC 存储。

[备份]: /common-tasks/general/#backups
[安装]: /installation/
[onboarding]: /getting-started/onboarding/
[data-disk]: /common-tasks/general/#external-data-disk
[yellow-rpiboot]: https://support.nabucasa.com/hc/articles/25485061432093