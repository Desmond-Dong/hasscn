---
title: Emby
description: 'Emby 集成允许您从 Home Assistant 控制 Emby(https://emby.media/) 多媒体系统。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_release: 0.32
ha_iot_class: Local Push
ha_codeowners:
  - '@mezz64'
ha_domain: emby
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Emby

**Emby** 集成允许您从 Home Assistant 控制 [Emby](https://emby.media/) 多媒体系统。

要将 Emby 添加到您的系统中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: emby
    host: YOUR_IP_ADDRESS
    api_key: YOUR_API_KEY
```

```yaml
host:
  description: 运行 Emby 的设备的主机名或 IP 地址。
  required: false
  default: localhost
  type: string
api_key:
  description: 用于身份验证的 API 密钥。
  required: true
  type: string
ssl:
  description: 使用 HTTPS/WSS 连接。您的 SSL 证书必须有效。
  required: false
  default: false
  type: boolean
port:
  description: 运行 Emby 的设备的端口号。
  required: false
  default: 8096 (无 SSL),  8920 (SSL)
  type: integer
```