---
title: Mullvad VPN
description: 'The Mullvad VPN integration uses the Mullvad(https://mullvad.net/) VPN API to detect if your Home Assistant instance is connected to the Mullvad VPN。'

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
# Mullvad VPN

The **Mullvad VPN** integration uses the [Mullvad](https://mullvad.net/) VPN API to detect if your Home Assistant instance is connected to the Mullvad VPN service.

![Home Assistant mullvad vpn sample sensor connected](/home-assistant/images/screenshots/mullvad_vpn_sample_sensor_connected.png)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
