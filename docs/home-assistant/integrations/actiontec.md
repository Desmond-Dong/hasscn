---
title: Actiontec
description: 'Actiontec 集成允许您通过查看连接到 Actiontec(https://www.actiontec.com/) 设备的设备来检测存在。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.7
ha_domain: actiontec
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Actiontec

**Actiontec** 集成允许您通过查看连接到 [Actiontec](https://www.actiontec.com/) 设备的设备来检测存在。

支持的设备（已测试）：

- MI424WR (Verizon FIOS)

:::important
此设备跟踪器需要在路由器上启用 telnet。

:::
要在您的系统中使用此设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: actiontec
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: 您路由器的 IP 地址，例如 `192.168.1.1`。
  required: true
  type: string
username:
  description: 具有管理员权限的用户名，通常为 `admin`。
  required: true
  type: string
password:
  description: 您指定的管理员账户的密码。
  required: true
  type: string
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/)。
