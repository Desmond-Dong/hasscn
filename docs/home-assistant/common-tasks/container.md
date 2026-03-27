---
title: 常用任务 - 容器
description: '要了解如何备份系统，或如何从备份恢复系统，请参阅通用任务(/home-assistant/common-tasks/general/备份)中的备份文档。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 常用任务 - 容器

## 备份

要了解如何备份系统，或如何从备份恢复系统，请参阅[通用任务](/home-assistant/common-tasks/general/#备份)中的备份文档。

## 更新

### 前提条件

1. [备份您的安装](/home-assistant/common-tasks/general/#备份)，并将备份和[备份应急工具包](/home-assistant/more-info/backup-emergency-kit/)保存在安全的地方。
   - 这样可确保您在需要时能够[从备份恢复安装](/home-assistant/common-tasks/general/#恢复备份)。
2. 查看 [Home Assistant 发布说明](/home-assistant/blog/categories/core/) 中是否有向后不兼容的更改。请务必查看您当前运行的版本与要升级到的版本之间的所有发布说明。使用浏览器的搜索功能（`CTRL + f` / `CMD + f`）搜索 **Backward-incompatible changes**。

### 更新 Home Assistant 核心

要更新 Home Assistant 核心，请选择以下选项之一。

**使用界面**

1. 打开 Home Assistant 界面。
2. 进入 **设置**。
3. 在顶部查看更新通知。
   - **故障排除**：如果您没有看到通知：
     - 在右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **检查更新**。
     - 进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
     - 选择更新通知。
     - 选择齿轮图标 `[mdi:cog-outline]`，然后将 **可见** 设为开启。
4. 打开要更新的组件通知。
5. 如果您想先备份系统（推荐），请启用备份开关。
6. 选择 **更新**。
7. 更新完成后，检查是否有修复问题，并查看日志，确认配置中没有需要处理的问题。

**Docker CLI**

先拉取新的容器镜像：

```bash
docker pull homeassistant/home-assistant:stable
```

然后使用新镜像重新创建容器。请参阅[安装 Home Assistant Container](/home-assistant/installation/linux#install-home-assistant-container)。

更新后，检查是否有修复问题，并查看日志，确认配置中没有需要处理的问题。

### 运行测试版

如果您想比其他人更早测试下一个发布版本，可以安装测试版。

**从界面**

1. 在 Home Assistant 中，进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
2. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单。
3. 选择 **加入测试版**。
4. 进入 [**配置**](https://my.home-assistant.io/redirect/configuration/) 面板。
5. 安装显示给您的更新。
   - **故障排除**：如果您没有看到通知：
     - 在右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **检查更新**。
     - 进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
     - 选择更新通知。
     - 选择齿轮图标 `[mdi:cog-outline]`，然后将 **可见** 设为开启。

**Docker CLI**

```bash
docker pull homeassistant/home-assistant:beta
```

然后使用新镜像重新创建容器。请参阅[安装 Home Assistant Container](/home-assistant/installation/linux#install-home-assistant-container)。

### 运行开发版本

如果您想始终使用 Home Assistant 核心开发分支的最新内容，可以升级到 `dev`。

`dev` 分支可能不稳定。潜在后果包括数据丢失和实例损坏。

```bash
docker pull homeassistant/home-assistant:dev
```

然后使用新镜像重新创建容器。请参阅[安装 Home Assistant Container](/home-assistant/installation/linux#install-home-assistant-container)。

### 运行特定版本

要查看系统当前运行的版本，请进入 [**设置** > **关于**](https://my.home-assistant.io/redirect/info/)。

如果 Home Assistant 核心版本与您的硬件设置不兼容，您可以改用较早的发布版本。在下面的示例中，`<version>` 表示目标版本，您可以替换为自己想运行的版本。

```bash
docker pull homeassistant/home-assistant:<version>
```

然后使用新镜像重新创建容器。请参阅[安装 Home Assistant Container](/home-assistant/installation/linux#install-home-assistant-container)。

如果您想降级安装，请改为执行[从备份恢复](/home-assistant/common-tasks/general/#恢复备份)。

## 配置检查

更改配置或自动化文件后，请在重启 Home Assistant 核心之前检查配置是否有效。

### 从界面运行配置检查

1. 进入[您的用户资料](https://my.home-assistant.io/redirect/profile/)并启用 **高级模式**。
2. 进入 [**设置** > **开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/)，在 **配置验证** 部分中选择 **检查配置**。
   - 这样可以确保在重启 Home Assistant 之前没有语法错误。
   - 它会检查 YAML 是否有效，以及配置结构是否正确。
3. 如果您需要更全面的检查，请[从 CLI 运行配置检查](#从-cli-运行配置检查)。

### 从 CLI 运行配置检查

更改配置文件后，请在重启 Home Assistant 核心之前检查配置是否有效。

_如果您的容器名称不是 `homeassistant`，请在下面的示例中替换该名称。_

运行完整检查：

```bash
docker exec homeassistant python -m homeassistant --script check_config --config /config
```

列出所有已加载的文件：

```bash
docker exec homeassistant python -m homeassistant --script check_config --files
```

查看某个集成的配置（此示例中为 [`light`](/home-assistant/integrations/light)）：

```bash
docker exec homeassistant python -m homeassistant --script check_config --info light
```

或者查看所有集成的配置：

```bash
docker exec homeassistant python -m homeassistant --script check_config --info all
```

您还可以使用以下命令查看帮助：

```bash
docker exec homeassistant python -m homeassistant --script check_config --help
```
