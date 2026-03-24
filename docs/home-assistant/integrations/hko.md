---
title: Hong Kong Observatory
description: 关于如何将香港天文台 (HKO) 开放数据 API 集成到 Home Assistant 的说明。
ha_category:
  - Weather
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@MisterCommand'
ha_domain: hko
ha_platforms:
  - weather
ha_integration_type: service
---

**Hong Kong Observatory** 集成会从 [香港天文台](https://www.hko.gov.hk/tc/index.html) 的 [开放数据 API](https://www.hko.gov.hk/en/abouthko/opendata_intro.htm) 获取香港特别行政区的气象数据。

目前此集成在 Home Assistant 中支持以下平台：

- [Weather](#weather-platform)

它会显示您所选位置的天气，以及香港未来 5 天的天气预报。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
