---
title: Unitymedia Horizon HD Recorder
description: 关于如何将 Unitymedia Horizon HD 录像机集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.72
ha_domain: horizon
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Unitymedia Horizon HD Recorder** 集成允许您从 Home Assistant 控制 [Unitymedia](https://www.unitymedia.de) Horizon HD 录像机。

要将 Horizon HD 录像机添加到您的系统中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: horizon
    host: 192.168.0.127
```

```yaml
  host:
    description: 设备的主机名或地址。
    required: true
    type: string
  port:
    description: 要连接的设备端口。
    required: false
    type: integer
  name:
    description: 前端使用的设备名称。
    required: false
    type: string
```

#### Horizon HD 录像机的准备

需要在 Horizon 接收器的设置菜单中启用家庭网络（"Heimnetzwerk"）服务。设置好媒体库（"Medienbibliothek"）后，我们可以确定设备是开启还是关闭。没有这个，集成将无法启动。