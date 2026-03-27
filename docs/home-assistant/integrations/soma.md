---
title: Soma Connect
description: 'The Soma Connect integration will allow users to integrate their Soma Smarthome devices into Home Assistant using the Soma Connect hub. 本页属于 Home。'
ha_category:
  - Cover
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '0.100'
ha_codeowners:
  - '@ratsept'
ha_domain: soma
ha_platforms:
  - cover
  - sensor
ha_integration_type: hub
---
# Soma Connect

The **Soma Connect** integration will allow users to integrate their Soma Smarthome devices into Home Assistant using the Soma Connect hub.

You can build a Soma Connect yourself if you have a spare Raspberry Pi. You just need to follow the [ official instructions](https://support.somasmarthome.com/hc/en-us/articles/360035521234-Install-SOMA-Connect-software). After you have the SD card plug in the Pi and use an ethernet cable or [set up Wi-Fi](https://support.somasmarthome.com/hc/en-us/articles/360026210333). Then find the IP address by checking your routers DHCP table (we will work on this step).


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
