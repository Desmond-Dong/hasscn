---
title: BT Home Hub 5
description: 关于如何将 BT Home Hub 5 路由器集成到 Home Assistant 的说明。
ha_category:
  - Presence detection
ha_release: 0.22
ha_domain: bt_home_hub_5
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

此集成通过查看连接到 [BT Home Hub 5](https://en.wikipedia.org/wiki/BT_Home_Hub) 路由器的设备来提供存在检测。

要在您的系统中使用 BT Home Hub 5 路由器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: bt_home_hub_5
    host: 192.168.1.254
```

```yaml
host:
  description: 您路由器的 IP 地址。
  required: false
  default: 192.168.1.254
  type: string
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/)。
