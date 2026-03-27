---
title: 系统架构
description: 'Supervisor 将 i386、armhf 和 armv7（所有 32 位系统架构）视为不支持。Home Assistant 于 2025 年 5 月宣布弃用这些架构（请参阅这篇博客文章了解更多信息(https://www.home-assistant.io/blog/2025/05/22/depreca。'
---
# 系统架构

## 问题

Supervisor 将 `i386`、`armhf` 和 `armv7`（所有 32 位系统架构）视为不支持。Home Assistant 于 2025 年 5 月宣布弃用这些架构（请参阅[这篇博客文章了解更多信息](https://www.home-assistant.io/blog/2025/05/22/deprecating-core-and-supervised-installation-methods-and-32-bit-systems/)）。在这些系统架构上，Supervisor 停止刷新其更新信息。这意味着您将不再收到任何组件的更新，包括 Home Assistant 核心和应用更新（以前称为加载项）。

## 解决方案

您可以继续按原样使用系统，但建议将您的 Home Assistant 安装迁移到支持的硬件上。这确保您将继续收到软件更新，包括安全更新。

1. 要迁移到支持的架构，[创建完整备份](/home-assistant/common-tasks/general/#backups)并下载它。
2. 在支持的 64 位硬件上安装 Home Assistant OS。 
   - 使用[入门期间的从备份恢复功能](https://www.home-assistant.io/getting-started/onboarding/)（选项 2）。
   - 如果您使用树莓派 3 或树莓派 4，可以安装 Home Assistant OS 的 64 位变体。
      - 请参阅[树莓派安装文档](https://www.home-assistant.io/installation/raspberrypi/)获取详细说明。
