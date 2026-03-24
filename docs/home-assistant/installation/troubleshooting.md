---
title: 安装故障排除
description: 常见安装问题及其解决方案
---

在安装和初始设置 Home Assistant 时可能会遇到问题。本页面帮助您解决最常见的问题。

## 无法在浏览器中访问 Home Assistant

### 症状："无法访问此网站"

尝试在浏览器中访问 Home Assistant 时，浏览器显示"无法访问此网站"消息。

### 描述

这意味着浏览器无法在网络上找到您的 Home Assistant 安装。

### 解决方案

要解决此问题，请尝试以下步骤：

1. 确保您的 Home Assistant 设备已通电（LED 灯亮起）。
2. 确保您的 Home Assistant 安装已连接到互联网：
   - 确保以太网线已插入 Home Assistant 和您的路由器或交换机。
   - 确保您的网络有互联网访问。
     - 首次启动时，时间将同步。确保您的网络允许 NTP。
     - 首次启动时，Home Assistant 完成安装。它需要访问以下 URL：
       - versions.home-assistant.io：获取新版本信息。
       - github.com：更新 Home Assistant 应用商店的元数据。
       - ghcr.io：GitHub 容器注册表，用于获取新的 Home Assistant 更新。
3. 确保您打开浏览器访问 Home Assistant 的系统与 Home Assistant 连接到同一网络。
   - 例如，如果您的浏览器运行的系统使用 Wi-Fi，请确保它使用 Home Assistant 连接的同一 Wi-Fi。
4. 确保您输入的地址正确。
   - 特别是如果消息包含错误代码 "ERR_CONNECTION_REFUSED"，很可能是 URL 的端口部分（`:8123`）有拼写错误。
   - 通常，URL 是 [http://homeassistant.local:8123](http://homeassistant.local:8123)。
   - 如果您运行的是较旧的 Windows 版本或有更严格的网络配置，请尝试 [http://homeassistant:8123](http://homeassistant:8123)。
5. 系统可能仍在启动中。等待几分钟并刷新页面。
   - 刷新可能因浏览器而异。查找刷新图标，或按 CTRL+R 或 CTRL+SHIFT+R。
6. 检查路由器的 Web 界面，查看为您的 Home Assistant 安装分配了什么 IP 地址。
   - 在浏览器中直接输入此 IP 地址（`http://x.x.x.x:8123`）。
7. 如果仍然无法访问 Home Assistant，将键盘和显示器连接到运行 Home Assistant 的设备以访问控制台，查看 Home Assistant 卡在哪里。
   - 如果您使用的是 Home Assistant Green，请按照这些步骤[访问控制台](https://support.nabucasa.com/hc/articles/25153288092829)。
   - 如果您使用的是 Home Assistant Yellow，请按照这些步骤[从 Windows 访问控制台](https://support.nabucasa.com/hc/articles/25454894609693)，或[从 Linux 或 macOS 访问控制台](https://support.nabucasa.com/hc/articles/25454972435357)。
8. [向我们的社区寻求帮助](https://www.home-assistant.io/help/)。

## "安装 Home Assistant 时出错"

### 症状：初始设置期间出现"安装 Home Assistant 时出错"

您正在进行初始设置，但收到消息 **安装 Home Assistant 时出错**。

![初始设置期间安装 Home Assistant 出错](/home-assistant/images/getting-started/error_installing_ha.png)

### 解决方案

1. 确保您的网络有互联网访问。
     - 首次启动时，时间将同步。确保您的网络允许 NTP。
     - 首次启动时，Home Assistant 完成安装。它需要访问以下 URL：
       - versions.home-assistant.io：获取新版本信息。
       - github.com：更新 Home Assistant 应用商店的元数据。
       - ghcr.io：GitHub 容器注册表，用于获取新的 Home Assistant 更新。
2. 更改网络环境后，等待几分钟。Home Assistant 将尝试重新连接。
3. [向我们的社区寻求帮助](https://www.home-assistant.io/help/)。

## 卡在"正在准备 Home Assistant"

### 症状：初始设置似乎卡在"正在准备 Home Assistant"

您正在进行初始设置，但进程似乎卡在 **正在准备 Home Assistant** 步骤。

![Home Assistant 准备中](/home-assistant/images/getting-started/onboarding_preparing_01_.png)

### 解决方案

1. 选择 **显示详情** 查看日志文件。
   - 日志文件可能会提供有关当前状态的更多信息。
2. 确保您的网络有互联网访问。
     - 首次启动时，时间将同步。确保您的网络允许 NTP。
     - 首次启动时，Home Assistant 完成安装。它需要访问以下 URL：
       - versions.home-assistant.io：获取新版本信息。
       - github.com：更新 Home Assistant 应用商店的元数据。
       - ghcr.io：GitHub 容器注册表，用于获取新的 Home Assistant 更新。
3. 更改网络环境后，等待几分钟。Home Assistant 将尝试重新连接。
4. [向我们的社区寻求帮助](https://www.home-assistant.io/help/)。