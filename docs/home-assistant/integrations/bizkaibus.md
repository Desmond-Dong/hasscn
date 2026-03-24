---
title: Bizkaibus
description: 关于如何在 Home Assistant 中集成 Bizkaibus 时刻表数据的说明。
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.93
ha_codeowners:
  - '@UgaitzEtxebarria'
ha_domain: bizkaibus
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Bizkaibus** 集成将为您提供所选站点下一班公交车的时间。

以下网站可以帮助您确定公交站点的 ID。您可以通过访问[下一个链接](https://apli.bizkaia.net/APPS/DANOK/TQ/DATOS_PARADAS/DATOS_Paradas.xml)并查找 STOP_ID 对应的 PR_CODE 来验证是否正确。

为了正确使用传感器，所选路线必须在所选站点停靠。

然后将数据添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: bizkaibus
    stopid: STOP_ID
    route: ROUTE_ID
```

```yaml
stopid:
  description: 要获取信息的公交站点 ID。
  required: true
  type: string
route:
  description: 要获取信息的公交线路 ID。这与公交车编号相同，例如 `A3641`。
  required: true
  type: string
name:
  description: 此传感器的友好名称。
  required: false
  default: Next Bus
  type: string
```

公共 RTPI 信息来自 [Bizkaibus API](https://apli.bizkaia.net/APPS/DANOK/TQWS/TQ.ASMX)。
