---
title: Clementine Music Player
description: 关于如何在 Home Assistant 中集成 Clementine Music Player 的说明。
ha_category:
  - Media player
ha_release: 0.39
ha_iot_class: Local Polling
ha_domain: clementine
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Clementine Music Player** 集成允许您控制 [Clementine Music Player](https://www.clementine-player.org)。

要将 Clementine Player 添加到您的 Home Assistant 系统，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: clementine
    host: 192.168.0.20
```

```yaml
host:
  description: Clementine Player 的 IP 地址，例如 192.168.0.20。
  required: true
  type: string
port:
  description: 远程控制端口。
  required: false
  default: 5500
  type: integer
access_token:
  description: 连接所需的授权码。
  required: false
  type: integer
name:
  description: 您想给 Clementine 播放器起的名称。
  required: false
  default: Clementine Remote
  type: string
```

请注意，Clementine 必须配置为通过其网络远程控制协议接受连接。

您可以通过 Clementine 的 `工具 > 首选项 > 网络远程控制` 配置菜单进行配置。启用 `使用网络远程控制` 并根据您的使用情况配置其他选项。

此集成未实现 `play_media` 动作，因此您无法将曲目添加到播放列表。