---
title: Graphite
description: 'Graphite 集成会记录所有事件和状态变化，并将数据发送到 graphite(http://graphiteapp.org/) 实例。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - History
ha_release: 0.13
ha_domain: graphite
ha_iot_class: Local Push
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Graphite

**Graphite** 集成会记录所有事件和状态变化，并将数据发送到 [graphite](http://graphiteapp.org/) 实例。

若要启用此集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
graphite:
```

```yaml
host:
  description: graphite 主机的 IP 地址，例如 `192.168.1.10`。
  required: false
  type: string
  default: localhost
port:
  description: graphite 主机上的端口。
  required: false
  type: integer
  default: 2003
protocol:
  description: "通信协议类型：`tcp` 或 `udp`。"
  required: false
  type: string
  default: tcp
prefix:
  description: graphite 中指标使用的前缀。
  required: false
  type: string
  default: ha
```
