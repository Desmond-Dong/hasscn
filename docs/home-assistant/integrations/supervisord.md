---
title: Supervisord
description: 'Supervisord 集成允许您跟踪 Supervisord(http://supervisord.org/) 的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - System monitor
ha_release: '0.20'
ha_iot_class: Local Polling
ha_domain: supervisord
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Supervisord

**Supervisord** 集成允许您跟踪 [Supervisord](http://supervisord.org/) 的状态。

它要求您在 `/etc/supervisord.conf` 配置文件中启用 HTTP 功能。

```text
[inet_http_server]
port=127.0.0.1:9001
```

重启 `supervisord` 后，您应能够访问其 Web 界面。如有需要，还可以将其添加为 [webpage dashboard](/home-assistant/dashboards/dashboards/#webpage-dashboard)。

<p class='img'>
  <img src='/home-assistant/images/screenshots/supervisor.png' />
</p>

要在您的安装中使用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: supervisord
```

```yaml
url:
  description: 要跟踪的 URL。
  required: false
  default: "`http://localhost:9001/RPC2`"
  type: string
```
