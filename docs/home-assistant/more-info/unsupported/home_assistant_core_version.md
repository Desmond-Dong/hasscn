---
title: Home Assistant 核心版本
description: 'Supervisor 将超过 24 个月（约 24 个版本）的 Home Assistant 核心版本视为不支持。 强烈建议将 Home Assistant 核心更新到最新版本。 至少应在 6 个月（6 个发布周期）内更新，以确保不会错过自动 YAML 集成迁移。'
---
# Home Assistant 核心版本

## 问题

Supervisor 将超过 24 个月（约 24 个版本）的 Home Assistant 核心版本视为不支持。
强烈建议将 Home Assistant 核心更新到最新版本。
至少应在 6 个月（6 个发布周期）内更新，以确保不会错过自动 YAML 集成迁移。将基于 YAML 的集成转换为现代基于 UI 的配置的迁移代码仅在弃用后 6 个月内可用，这对应于 6 个 Home Assistant 核心版本。

在使用不支持的 Home Assistant 核心版本的安装上，Supervisor 停止刷新其更新信息。这意味着您将不再收到任何组件的更新，包括 Home Assistant 核心或应用（以前称为加载项）更新。

## 解决方案

1. 由于您有一段时间没有更新系统，建议在更新系统之前[创建备份](/home-assistant/common-tasks/general/#backups)。
    - 确保下载备份或将其存储在远程位置。

2. 更新您的 Home Assistant 核心版本。
    - 前往 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/) 更新 Home Assistant 核心。
    - 如果您看不到更新，可能是之前跳过了它。要查看之前跳过的更新，选择三点 `[mdi:dots-vertical]` 并启用跳过的更新。

    - 如果您落后较多且有需要迁移的基于 YAML 的集成，请每次更新不超过 6 个版本（例如，从 Home Assistant 核心 2024.2 到 2024.8，再到 2025.2）。
      - 这确保自动迁移可以在每次更新期间正常运行。
      - 您可以使用 Home Assistant CLI 更新到[特定的 Home Assistant 核心版本](/home-assistant/common-tasks/os/#home-assistant-versions)。