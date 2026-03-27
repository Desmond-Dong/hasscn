---
title: Acer Projector
description: 'Acer Projector 集成允许您控制通过 RS232 连接的 Acer(https://www.acer.com/) 投影仪的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Multimedia
ha_iot_class: Local Polling
ha_release: 0.19
ha_domain: acer_projector
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Acer Projector

**Acer Projector** 集成允许您控制通过 RS232 连接的 [Acer](https://www.acer.com/) 投影仪的状态。

## 配置

要在您的系统中使用 Acer 投影仪，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: acer_projector
    filename: /dev/ttyUSB0
```

```yaml
filename:
  description: 投影仪连接所使用的设备路径。
  required: true
  type: string
name:
  description: 显示此开关时使用的名称。
  required: false
  type: string
timeout:
  description: 连接超时时间（秒）。
  required: false
  type: integer
write_timeout:
  description: 写入超时时间（秒）。
  required: false
  type: integer
```
