---
title: BT Smart Hub
description: '此集成通过查看连接到 BT Smart Hub(https://en.wikipedia.org/wiki/BTSmartHub) 路由器的设备来提供存在检测。 此路由器有时被称为 BT Home Hub 6。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Presence detection
ha_release: 0.82
ha_iot_class: Local Polling
ha_codeowners:
  - '@typhoon2099'
ha_domain: bt_smarthub
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# BT Smart Hub

此集成通过查看连接到 [BT Smart Hub](https://en.wikipedia.org/wiki/BT_Smart_Hub) 路由器的设备来提供存在检测。
此路由器有时被称为 BT Home Hub 6。

据报道，Plusnet Hub Two 也可以与此集成一起使用。

## 配置

要在您的系统中使用 BT Smart Hub 路由器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: bt_smarthub
```

```yaml
host:
  description: 您路由器的 IP 地址
  default: 192.168.1.254
  required: false
  type: string
smarthub_model:
  description: 您的 BT Smarthub 1 或 2 的型号。如果省略此选项，它将尝试检测集线器型号。
  required: false
  type: integer
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/)。
