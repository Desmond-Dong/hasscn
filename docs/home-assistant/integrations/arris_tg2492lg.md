---
title: Arris TG2492LG
description: 关于将 Arris TG2492LG 路由器集成到 Home Assistant 的说明。
ha_category:
  - Presence detection
ha_release: 0.109
ha_domain: arris_tg2492lg
ha_codeowners:
  - '@vanbalken'
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

此集成允许您通过查看连接到 Arris TG2492LG 路由器的设备来检测存在。

这是以下运营商提供给客户的路由器之一：

- [Ziggo](https://www.ziggo.nl/)，荷兰的有线电视运营商，作为 Ziggo Connectbox 提供给客户。
- [Virgin Media](https://www.virginmedia.com/)，英国和爱尔兰的有线电视运营商，作为 Hub 3 提供给客户。

:::warning
路由器阻止管理员用户重复登录。当此平台处于活动状态时，这可能会导致访问路由器配置页面时出现问题。

:::
要在您的安装中使用此设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: arris_tg2492lg
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: 您路由器的 IP 地址。默认值为 `192.168.178.1`。
  required: false
  type: string
password:
  description: 您管理员账户的密码。
  required: true
  type: string
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/)。