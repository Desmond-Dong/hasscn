---
title: Dublin Bus
description: 关于如何在 Home Assistant 中集成都柏林公交时刻表数据的说明。
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.36
ha_domain: dublin_bus_transport
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Dublin Bus** 集成会使用 RTPI 信息，为您提供都柏林公交站接下来两班车的到站时间。

[Dublin Bus](https://www.dublinbus.ie/RTPI/) 网站可以帮助您确定公交站的 ID。您可以访问以下地址来检查该 ID 是否正确：

https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=[Stop ID]

然后将这些数据添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
sensor:
  - platform: dublin_bus_transport
    stopid: STOP_ID
```

```yaml
stopid:
  description: 要获取信息的公交站 ID。
  required: true
  type: string
route:
  description: 仅显示该站点中的单一路线。这与公交线路号相同，例如 `83`。
  required: false
  type: string
name:
  description: 此传感器的友好名称。
  required: false
  default: 下一班公交
  type: string
```

公开的 RTPI 数据来自 [Dub Linked](https://data.smartdublin.ie/)。
