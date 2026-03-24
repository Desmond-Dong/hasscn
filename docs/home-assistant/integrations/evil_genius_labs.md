---
title: Evil Genius Labs
description: 关于在 Home Assistant 中设置 Evil Genius Labs 产品的说明。
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: '2021.12'
ha_config_flow: true
ha_domain: evil_genius_labs
ha_platforms:
  - diagnostics
  - light
ha_integration_type: device
---

此集成允许您控制和监控 [Evil Genius Labs](https://www.evilgeniuslabs.org/) 的艺术品。已测试 Fibonacci256。

如果集成无法连接，请确保固件是最新的。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::