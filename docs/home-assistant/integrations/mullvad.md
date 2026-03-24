---
title: Mullvad VPN
description: 关于如何将 Mullvad VPN API 数据集成到 Home Assistant 的说明。

ha_category:
  - Binary sensor
  - Network
ha_iot_class: Cloud Polling
ha_release: 2021.3
ha_domain: mullvad
ha_config_flow: true
ha_codeowners:
  - '@meichthys'
ha_platforms:
  - binary_sensor
ha_integration_type: service
---

The **Mullvad VPN** integration uses the [Mullvad](https://mullvad.net/) VPN API to detect if your Home Assistant instance is connected to the Mullvad VPN service.

![](/home-assistant/images/screenshots/mullvad_vpn_sample_sensor_connected.png)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
