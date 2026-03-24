---
title: APRS
description: 关于如何在 Home Assistant 中使用 APRS 跟踪设备的说明。
ha_release: 0.95
ha_category:
  - Presence detection
ha_iot_class: Cloud Push
ha_codeowners:
  - '@PhilRW'
ha_domain: aprs
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**APRS**（[自动分组报告系统](https://en.wikipedia.org/wiki/Automatic_Packet_Reporting_System)）集成可连接到 [APRS-IS](http://aprs-is.net/) 网络以跟踪业余无线电设备。

## 配置

要在 Home Assistant 中启用 APRS 跟踪，请将以下部分添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: aprs
    username: FO0BAR  # 或 FO0BAR-1 到 FO0BAR-15
    callsigns:
      - 'XX0FOO*'
      - 'YY0BAR-1'
```

```yaml
username:
  description: "您的呼号（或呼号-SSID 组合）。这用于连接到主机。注意：不要使用与您要跟踪的设备相同的呼号或呼号-SSID 组合，APRS-IS 网络不会将数据包路由到 Home Assistant。这是 APRS 数据包路由的已知限制。"
  required: true
  type: string
password:
  description: 您的 APRS 密码。这将验证连接。
  required: false
  type: string
  default: -1
callsigns:
  description: 您希望跟踪的呼号列表。允许使用通配符 `*`。任何匹配的呼号都将作为设备添加。
  required: true
  type: list
host:
  description: 要连接的 APRS 服务器。
  required: false
  type: string
  default: rotate.aprs2.net
timeout:
  description: 在放弃之前等待连接到 APRS-IS 网络的秒数。
  required: false
  type: float
  default: 30.0
```

验证连接仅在向 APRS-IS 网络发送数据时使用，而 `aprs` 平台目前尚不支持该功能。
不过，如果您知道 APRS 密码，仍可自由验证连接。
