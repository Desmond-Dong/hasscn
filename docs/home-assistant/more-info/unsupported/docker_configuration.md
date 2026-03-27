---
title: Docker 配置
description: 'Supervisor 对 Docker 守护进程的配置有一些期望，以维护运行 Supervisor 的主机的稳定性和性能。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Docker 配置

## 问题

Supervisor 对 Docker 守护进程的配置有一些期望，以维护运行 Supervisor 的主机的稳定性和性能。

Docker 守护进程的日志驱动程序需要设置为 `journald`，存储驱动程序需要设置为 `overlay2`。

我们在硬件处理上只支持 cgroup 版本 1。

## 解决方案

如果您运行的是较旧版本的 Home Assistant OS，请在[配置](https://my.home-assistant.io/redirect/config/)面板中将其更新到最新版本。

如果您运行的是 Home Assistant 受监管模式，需要修改主机上的 Docker 守护进程配置。配置位于 `/etc/docker/daemon.json`。如果该文件不存在，您可以创建它，并确保至少包含以下内容：

```json
{
    "log-driver": "journald",
    "storage-driver": "overlay2"
}
```

当 Docker 配置文件更改并保存后，需要在主机上重启 Docker 服务。

要修复 cgroup 级别的问题，调整 `/etc/default/grub`，将 `systemd.unified_cgroup_hierarchy=false` 添加到 `GRUB_CMDLINE_LINUX_DEFAULT`，然后运行 `sudo update-grub`。完成此更改后，需要完全重启主机。

您也可以直接重新运行我们的[便捷安装脚本](https://github.com/home-assistant/supervised-installer)。
