---
title: 添加本地媒体
description: '为了在您的 Home Assistant 媒体浏览器中查看本地媒体，您需要将媒体添加到您的媒体文件夹。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 添加本地媒体

为了在您的 Home Assistant 媒体浏览器中查看本地媒体，您需要将媒体添加到您的媒体文件夹。

如果您尚未设置本地媒体文件夹，请查看[设置本地媒体源][setup-media]页面。

您可以使用仪表盘访问您的（自动）创建的媒体文件夹。导航到 [媒体 > 本地媒体](https://my.home-assistant.io/redirect/media_browser/)，在右上角点击管理。在这里您可以添加和删除您的媒体。

## Home Assistant Operating System

如果您运行的是 **Home Assistant Operating System**，您也可以使用 Samba 应用。如果您尚未安装 **Samba** 应用，可以通过浏览 [**设置** > **应用**](https://my.home-assistant.io/redirect/supervisor/) 面板来安装。然后选择 **安装应用** 并搜索 **Samba** 应用。

在 **Samba** 应用页面上，您可以找到一个名为 **文档** 的选项卡，其中包含应用安装和使用说明。之后，您可以在文件资源管理器中使用拖放将媒体复制/移动到您的设备上。

其他应用（如 SSH）也提供对媒体文件夹的访问。

## Home Assistant 容器

在您[设置本地媒体][setup-media]文件夹后，您可以将任何媒体添加到您挂载的文件夹中。

您的媒体将自动显示在 Home Assistant 前端中。

[setup-media]: /more-info/local-media/setup-media
