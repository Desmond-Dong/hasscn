---
title: DD-WRT
description: 关于如何将基于 DD-WRT 的路由器集成到 Home Assistant 的说明。
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: ddwrt
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**DD-WRT** 集成会通过检查连接到基于 [DD-WRT](https://dd-wrt.com/) 路由器的设备来提供在家状态检测。

要在您的安装中使用 DD-WRT 路由器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
device_tracker:
  - platform: ddwrt
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: 路由器的 IP 地址，例如 `192.168.1.1`。
  required: true
  type: string
username:
  description: 具有管理员权限的用户名，通常为 `admin`。
  required: true
  type: string
password:
  description: 您的管理员账户密码。
  required: true
  type: string
ssl:
  description: 是否通过 HTTPS 连接。
  required: false
  type: boolean
  default: false
verify_ssl:
  description: 是否需要关闭 HTTPS 资源的 SSL/TLS 验证，例如使用自签名证书时。
  required: false
  type: boolean
  default: true
wireless_only:
  description: 是否仅列出通过 Wi-Fi 直接连接到路由器的设备，还是也包含通过以太网或其他联网接入点连接的设备。
  required: false
  type: boolean
  default: true
```

默认情况下，Home Assistant 每 5 秒从 DD-WRT 拉取一次已连接设备的信息。
有关如何配置要跟踪的人员，请参阅 [device tracker 集成页面](/home-assistant/integrations/device_tracker/)。
