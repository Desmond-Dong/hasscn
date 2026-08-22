---
title: "开发应用"
sidebar_label: 简介
---

Home Assistant 的 app（以前称为 add-ons）允许用户扩展 Home Assistant 周边的功能。这可以是运行 Home Assistant 可以集成的应用程序（如 MQTT broker），或者通过 Samba 共享配置以便于从其他计算机编辑。app 可以通过 Home Assistant 中的 Supervisor 面板进行配置。

在底层，app 是发布到容器 registry（如 [GitHub container registry](https://github.com/features/packages) 和 [Docker Hub](https://hub.docker.com/)）的容器镜像。开发者可以创建 [GitHub](https://github.com) 仓库，其中包含多个 app，以便于与社区分享。

- [教程：制作你的第一个 app](apps/tutorial.md)
- [配置](apps/configuration.md)
- [通信](apps/communication.md)
- [本地测试](apps/testing.md)
- [发布](apps/publishing.md)
- [展示](apps/presentation.md)
- [仓库](apps/repository.md)
- [安全](apps/security.md)

有用链接：

- [示例 app 仓库](https://github.com/home-assistant/addons-example)
- [Home Assistant Supervisor](https://github.com/home-assistant/supervisor)
- [Home Assistant Core app](https://github.com/home-assistant/addons)
- [Home Assistant Docker 基础镜像](https://github.com/home-assistant/docker-base)
- [Home Assistant Builder actions](https://github.com/home-assistant/builder)
- [Home Assistant 社区 app](https://github.com/hassio-addons)
- [Home Assistant 操作系统](https://github.com/home-assistant/operating-system)
- [Home Assistant Docker 镜像](https://github.com/home-assistant/docker)
