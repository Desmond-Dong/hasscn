---
title: "开发应用"
description: 'Home Assistant 的应用（此前称为 add-ons）允许用户扩展 Home Assistant 周边功能。这既可以是运行一个可供 Home Assistant 集成的应用程序（例如 MQTT broker），也可以是通过 Samba 共享配置，便于从其他电脑进行编辑。'
sidebar_label: 简介
---
# 开发应用

Home Assistant 的应用（此前称为 add-ons）允许用户扩展 Home Assistant 周边功能。这既可以是运行一个可供 Home Assistant 集成的应用程序（例如 MQTT broker），也可以是通过 Samba 共享配置，便于从其他电脑进行编辑。应用可以通过 Home Assistant 中的 Supervisor 面板进行配置。

在底层，应用是发布到容器注册表中的容器镜像，例如 [GitHub container registry](https://github.com/features/packages) 和 [Docker Hub](https://hub.docker.com/)。开发者可以创建包含多个应用的 [GitHub](https://github.com) 仓库，以便更方便地与社区共享。

- [教程：制作你的第一个应用](/developers/apps/tutorial)
- [配置](/developers/apps/configuration)
- [通信](/developers/apps/communication)
- [本地测试](/developers/apps/testing)
- [发布](/developers/apps/publishing)
- [展示](/developers/apps/presentation)
- [仓库](/developers/apps/repository)
- [安全性](/developers/apps/security)

有用的链接：

- [示例应用仓库](https://github.com/home-assistant/addons-example)
- [Home Assistant Supervisor](https://github.com/home-assistant/supervisor)
- [Home Assistant Core 应用](https://github.com/home-assistant/addons)
- [Home Assistant Docker 基础镜像](https://github.com/home-assistant/docker-base)
- [Home Assistant Builder](https://github.com/home-assistant/builder)
- [Home Assistant 社区应用](https://github.com/hassio-addons)
- [Home Assistant Operating System](https://github.com/home-assistant/operating-system)
- [Home Assistant Docker 镜像](https://github.com/home-assistant/docker)
