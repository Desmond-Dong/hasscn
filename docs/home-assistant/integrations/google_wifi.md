---
title: Google Wifi
description: 关于如何将 Google Wifi/OnHub 路由器集成到 Home Assistant 的说明。
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: '0.50'
ha_domain: google_wifi
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Google Wifi** 集成用于显示 Google Wifi（或 OnHub）路由器公开提供的状态信息。

此集成能够报告网络状态、运行时长、当前 IP 地址和固件版本。

若要启用此集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: google_wifi
```

```yaml
host:
  description: 用于从路由器获取状态的地址。有效选项包括 `testwifi.here`，某些情况下也可使用 `onhub.here`，或路由器的 IP 地址，例如 `192.168.86.1`。
  required: false
  default: testwifi.here
  type: string
name:
  description: Google Wifi 传感器的名称。
  required: false
  default: google_wifi
  type: string
monitored_conditions:
  description: 定义要作为传感器监控的数据。默认为下面列出的所有选项。
  required: false
  type: list
  keys:
    current_version:
      description: 路由器当前的固件版本。
    new_version:
      description: 最新可用固件版本。如果路由器已是最新版本，此值显示为 `Latest`。
    uptime:
      description: 路由器自开机以来的天数。
    last_restart:
      description: 上次重启日期。格式为 `YYYY-MM-DD HH:mm:SS`。
    local_ip:
      description: 本地公网 IP 地址。
    status:
      description: 报告路由器是否连接到互联网。
```
