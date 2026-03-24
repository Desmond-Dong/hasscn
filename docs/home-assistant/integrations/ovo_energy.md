---
title: OVO Energy
description: 有关如何将 OVO Energy 与 Home Assistant 集成的说明。
ha_category:
  - Energy
  - Sensor
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: ovo_energy
ha_platforms:
  - sensor
ha_integration_type: service
---

**OVO Energy** 集成允许您在 Home Assistant 中监控能源消耗数据。

目前，此集成仅支持英国的 OVO Energy。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成为 OVO Energy 提供以下几个传感器：

- 最近一次电表读数 - 最近一次电表读数对应的用电量，单位为 kWh。
- 最近一次燃气表读数 - 最近一次燃气表读数对应的用气量，单位为 kWh。
- 最近一次电费 - 最近一次电表读数对应的用电费用。
- 最近一次燃气费 - 最近一次燃气表读数对应的用气费用。
