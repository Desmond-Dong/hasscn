---
title: ReCollect Waste
description: 有关如何在 Home Assistant 中设置 ReCollect Waste 传感器的说明。
ha_category:
  - Calendar
  - Sensor
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: recollect_waste
ha_codeowners:
  - '@bachya'
ha_config_flow: true
ha_platforms:
  - calendar
  - diagnostics
  - sensor
ha_integration_type: service
---

**ReCollect Waste** 集成允许您跟踪 [ReCollect Waste](https://recollect.net/waste-haulers/) 的下一次计划垃圾收集时间以及对应的垃圾类型。

要使用此集成，您必须知道自己的 ReCollect Place ID 和 Service ID。通常，使用 ReCollect 的城市或市政机构会提供一个可订阅的垃圾收集日历。如果您查看该日历的 iCal URL，就会发现其中包含了 Place ID 和 Service ID：

```text
webcal://recollect.a.ssl.fastly.net/api/places/PLACE_ID/services/SERVICE_ID/events.en-US.ics
```

从 ReCollect Waste 拉取数据的默认频率为每天一次（86400 秒）。

:::warning
ReCollect Waste 传感器通过 ReCollect API 的 <strong>URL</strong> 获取数据，而不是使用 ReCollect 的官方 API。请自行承担使用风险。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
