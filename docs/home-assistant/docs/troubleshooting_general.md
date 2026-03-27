---
title: 常规故障排除
description: '本页面提供了一些关于常规故障排除主题的信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 常规故障排除

本页面提供了一些关于常规故障排除主题的信息。

## Home Assistant 进入恢复模式

### 症状：Home Assistant 处于恢复模式

页面顶部会显示一个红色横幅。在 **概述** 页面上，您会看到 **恢复模式** 通知。

![Home Assistant recovery mode active](/home-assistant/images/docs/troubleshooting/recovery_mode_active.png)

### 说明

当 Home Assistant 处于恢复模式时，说明配置存在问题。

恢复模式会加载最少量的集成，以便对配置进行故障排除。恢复模式将使用 Home Assistant 上一次成功启动时所使用的配置部分。您仍然可以看到用户界面、设置和应用程序。

### 解决方案

您需要在配置文件中找出问题并加以修复。问题可能很简单，例如某个文件无效。

- 如果您运行的是 **Home Assistant Operating System**，可以安装 Studio Code Server 等应用程序来编辑配置文件（如有需要）。
- 如果您仍然处于登录状态，可以[编辑配置](/home-assistant/docs/configuration/#editing-configurationyaml)。
  - 在 Home Assistant 用户界面中，打开您平时使用的应用程序并编辑配置文件。
- 重启 Home Assistant。
- 如果您因为忘记密码而被锁定，则无法从用户界面编辑配置文件。请按照步骤[重置密码](/home-assistant/docs/locked_out/)。

## 在安全模式下重启 Home Assistant

如果您的 Home Assistant 出现异常且无法确定根本原因，可以使用 **安全模式** 来缩小可能原因的范围。

**安全模式** 会加载 Home Assistant 核心，但不加载自定义集成、自定义卡片和自定义主题。如果问题在 **安全模式** 下不再出现，则问题不在 Home Assistant 核心。在报告问题之前，请检查该问题在 **安全模式** 下是否仍然存在。

您可以通过以下几种方式启用安全模式：

- 通过用户界面：
  - 进入 **设置** > **系统** > **重启 Home Assistant**（右上角）> **在安全模式下重启 Home Assistant**。

- 通过 [命令行](/home-assistant/common-tasks/os/#home-assistant-via-the-command-line)：
  - 运行：
    ```bash
    ha core restart --safe-mode
    ```

- 通过在配置目录中创建文件：
  - 在 Home Assistant 配置目录中创建一个名为 `safe-mode` 的空文件。Home Assistant 会在启动时检测到此文件并自动进入安全模式。

## 我看不到任何更新

通常，更新会显示在 **设置** 页面的顶部。如果您在那里看不到它们，可能是 **可见性** 选项被禁用了。

### 解决方案

1. 在 **系统** 页面上，点击右上角的三个点 `[mdi:dots-vertical]` 菜单，选择 **检查更新**。
2. 进入 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/)。
    - 选择更新通知。
    - 点击齿轮图标 `[mdi:cog-outline]`，然后将 **可见** 设置为开启。
