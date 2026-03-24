---
title: Fast.com
description: 关于如何在 Home Assistant 中集成 Fast.com 的说明。
ha_category:
  - Sensor
  - System monitor
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rohankapoorcom'
  - '@erwindouna'
ha_domain: fastdotcom
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

**Fast.com** 集成使用 [Fast.com](https://fast.com/) Web 服务来测量网络带宽性能。

:::note
目前，Fast.com 集成仅支持测量下载带宽。
如果您想测量下载以外的带宽指标（例如 ping 和上传），请使用 [Speedtest.net](/home-assistant/integrations/speedtestdotnet) 集成。

:::
启用此集成将自动创建 Fast.com 传感器。

By default, a speed test will be run every hour.用户可以通过 `homeassistant.update_entity` 操作手动运行速度测试。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 注释

- 在 Raspberry Pi 3 或更早版本上运行时，最大速度受到其 100 Mbit/s LAN 适配器的限制。
- 传感器将在 15 秒测试期间返回最大测量速度。
- 速度测试消耗的数据取决于您的互联网速度。如果您的互联网连接带宽有限，请务必考虑这一点。
