---
title: Opple
description: 'Opple 集成允许您控制 Opple 智能灯的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Light
ha_release: '0.80'
ha_iot_class: Local Polling
ha_domain: opple
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Opple

**Opple** 集成允许您控制 Opple 智能灯的状态。

该平台支持所有具备 Wi-Fi 功能的 Opple 灯具，以及可以通过应用控制的灯具。

要在您的安装中使用 Opple 灯，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
light:
  - platform: opple
    name: LIGHT_NAME
    host: IP_ADDRESS
```

```yaml
name:
  description: 显示此灯时使用的名称。
  required: false
  type: string
  default: Opple 灯
host:
  description: "您的 Opple 灯的 IP 地址，例如 `192.168.0.21`。"
  required: true
  type: string
```
