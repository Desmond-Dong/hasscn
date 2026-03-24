---
title: Systemd Journal
description: 关于 systemd journal 为何将安装标记为不支持的更多信息。
---

## 问题

Supervisor 需要访问 systemd journal 以获取各个系统组件和应用（以前称为加载项）的日志。如果 journal 不可访问，这些日志将受到限制或完全不可用。

## 解决方案

`systemd-journal-gatewayd` 服务需要在主机上运行，并通过 unix socket 暴露给 supervisor。

如果使用 Home Assistant OS，请更新到版本 7 或更高版本。

如果使用 Home Assistant 受监管模式，在主机上运行以下命令：

```bash
sudo apt install systemd-journal-remote -y
```

然后重启您的系统

如果升级后您仍然遇到此错误，请使用以下命令重新安装 `systemd-journal-remote`

```bash
sudo apt-get install --reinstall systemd-journal-remote
```

然后重启您的系统

如果您仍然看到此问题，请在主机上运行[受监管模式安装程序](https://github.com/home-assistant/supervised-installer)，因为 Supervisor 服务可能也需要更新。
