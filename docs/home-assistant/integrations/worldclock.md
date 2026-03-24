---
title: Worldclock
description: 关于如何将世界时钟集成到 Home Assistant 的说明。
ha_category:
  - Calendar
ha_iot_class: Local Push
ha_release: pre 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: worldclock
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Worldclock** 集成会简单地显示不同时区中的当前时间。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Timezone:
  description: 从列表中选择一个有效的时区。
Name:
  description: 传感器名称，例如城市名称。
Time format:
  description: 时间格式，默认为 `%H:%M`，表示小时和分钟。
```

如需查看有效时区，请参阅 [Wikipedia 时区总览](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 中的 **TZ** 列。
