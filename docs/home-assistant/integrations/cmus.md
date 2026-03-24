---
title: cmus
description: 关于如何将 cmus Music Player 集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.23
ha_domain: cmus
ha_platforms:
  - media_player
ha_integration_type: integration
ha_quality_scale: legacy
---

**cmus** 集成允许您从 Home Assistant 控制远程或本地机器上的 [cmus](https://cmus.github.io/) 音乐播放器。

要将 cmus 添加到您的系统，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

本地运行时如下：

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: cmus
```

如果 cmus 运行在远程服务器上：

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: cmus
    host: IP_ADDRESS_OF_CMUS_PLAYER
    password: YOUR_PASSWORD
```

```yaml
host:
  description: 运行 cmus 的机器的主机名或 IP 地址。注意，如果配置了远程 cmus，该实例必须配置为监听远程连接，这也需要设置密码。
  required: inclusive
  type: string
password:
  description: 您的 cmus 播放器密码。
  required: inclusive
  type: string
port:
  description: cmus 套接字的端口。
  required: false
  default: 3000
  type: integer
name:
  description: 您想在 Home Assistant 中给 cmus 播放器起的名称。
  required: false
  default: cmus
  type: string
```