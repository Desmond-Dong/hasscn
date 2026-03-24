---
title: Linksys Smart Wi-Fi
description: 关于如何将 Linksys Smart Wi-Fi 路由器集成到 Home Assistant 的说明。
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.48
ha_domain: linksys_smart
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Linksys Smart Wi-Fi** 集成通过查看连接到 Linksys Smart Wi-Fi 路由器的设备来提供存在检测功能。

已测试的路由器：

- Linksys WRT3200ACM MU-MIMO Gigabit Wi-Fi Wireless Router
- Linksys WRT1900ACS Dual-band Wi-Fi Router
- Linksys EA6900 AC1900 Dual-Band Wi-Fi Router
- Linksys EA8300 Max-Stream AC2200 Tri-Band Wi-Fi Router

## 设置

要让此集成正常工作，必须在路由器管理页面的 Local Management Access 部分禁用 “Access via wireless” 功能。如果不禁用，便会产生连接冲突，因为 Home Assistant 集成会尝试传递 userid 和 password，而路由器只期望接收 password。

## 配置

要在 Home Assistant 安装中使用 Linksys Smart Wi-Fi 路由器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
device_tracker:
  - platform: linksys_smart
    host: 192.168.1.1
```

```yaml
host:
  description: 路由器的主机名或 IP 地址，例如 `192.168.1.1`。
  required: true
  type: string
```

有关如何配置要跟踪的成员，请参阅 [device tracker 集成页面](/home-assistant/integrations/device_tracker/)。
