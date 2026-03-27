---
title: Docker 环境工作不正常
description: 'Docker 是 Supervisor 执行大多数操作的核心，重要的是它被正确配置并按照 Supervisor 的预期工作。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Docker 环境工作不正常

Docker 是 Supervisor 执行大多数操作的核心，重要的是它被正确配置并按照 Supervisor 的预期工作。

如果不满足以下任何要求，Supervisor 将被标记为不健康：

- [运行不支持的软件](/home-assistant/more-info/unsupported/software)
- [运行不支持的 Docker 版本](/home-assistant/more-info/unsupported/docker_version)
- [在 LXC 下运行 Supervisor](/home-assistant/more-info/unsupported/lxc)
- [未以特权模式运行 Supervisor](/home-assistant/more-info/unhealthy/privileged)
