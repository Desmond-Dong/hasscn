---
title: 连接检查
description: 'Home Assistant 需要知道何时有稳定的网络连接，以便禁用需要该连接的功能。没有此检查，由于连接超时，您将面临更多的错误和性能问题。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 连接检查

## 问题

Home Assistant 需要知道何时有稳定的网络连接，以便禁用需要该连接的功能。没有此检查，由于连接超时，您将面临更多的错误和性能问题。

## 解决方案

从主机 shell 开始，首先执行以下命令：

```bash
busctl get-property org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager ConnectivityCheckAvailable
```

### 输出为 `b true`

您只需要通过执行以下命令重新启用连接检查：

```bash
busctl set-property org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager ConnectivityCheckEnabled b true
```

消息消失可能需要一些时间，因为所有检查都是按计划定时进行的。您可以通过执行以下命令强制立即重新检查：

```bash
ha host reload
ha resolution healthcheck
```

### 输出为 `b false`

您需要在 Network Manager 的配置中设置连接 URI。您可以通过将以下内容添加到 `/etc/NetworkManager/NetworkManager.conf` 来实现：

```text
[connectivity]
uri=http://checkonline.home-assistant.io/online.txt
interval=600
```

然后您需要通过重启主机或执行以下命令来重启 NetworkManager：

```bash
systemctl restart NetworkManager
```

如上所述，检查是定时的，因此消息可能不会立即消失，除非您强制立即重新检查。如果您在一段时间后或强制重新检查后仍然看到消息，请从本解决方案的顶部重新开始。您可能需要在它可用后单独启用检查。