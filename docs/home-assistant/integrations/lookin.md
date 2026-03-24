---
title: LOOKin
description: 关于如何将 LOOKin 设备集成到 Home Assistant 的说明。
ha_category:
  - Climate
  - Light
  - Media player
  - Sensor
ha_release: 2021.11
ha_iot_class: Local Push
ha_codeowners:
  - '@ANMalko'
  - '@bdraco'
ha_domain: lookin
ha_config_flow: true
ha_platforms:
  - climate
  - light
  - media_player
  - sensor
ha_zeroconf: true
ha_integration_type: hub
---

将 LOOKin 设备集成到 Home Assistant。

[LOOKin](https://look-in.club/devices) 专注于提供可通过本地 API 集成、无需互联网即可使用的设备。

### 支持的设备

[LOOKin Remote2](https://look-in.club/store/remote2)：无需互联网的 Wi-Fi + IR 智能家居控制器


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
