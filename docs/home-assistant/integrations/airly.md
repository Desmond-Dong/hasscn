---
title: Airly
description: 关于在 Home Assistant 中集成 Airly 的说明。
ha_category:
  - Health
ha_release: 0.101
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: airly
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

**Airly** integration 使用 [Airly](https://airly.org/) 网络服务作为您所在位置的空气质量数据来源。

## 设置

要生成 Airly API 密钥，请访问 [Airly for developers](https://developer.airly.org/register) 页面。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
Airly 每天允许 100 次数据更新。因此，配置的 Airly 实例越多，更新频率就越低。对于一个配置的 Airly 实例，数据将每 15 分钟更新一次；对于两个配置的实例，数据将每 30 分钟更新一次；对于三个配置的实例，数据将每 45 分钟更新一次，以此类推。

:::
