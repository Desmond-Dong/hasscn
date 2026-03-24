---
title: Neff
description: "使用 Home Connect 集成连接和控制您的 Neff 设备"

ha_category:
  - Binary sensor
  - Button
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_release: '0.110'
ha_domain: neff
ha_integration_type: virtual
ha_supporting_domain: home_connect
ha_supporting_integration: Home Connect
ha_codeowners:
  - '@DavidMStraub'
  - '@Diegorro98'
  - '@MartinHjelmare'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
ha_iot_class: Cloud Push
ha_dhcp: true
ha_zeroconf: true
---

Support for devices by Neff in Home Assistant is provided by the [Home Connect](/home-assistant/integrations/home_connect) integration.

Neff devices are either rebranded devices or devices that share a common communication protocol, making it possible to use them with the [Home Connect](/home-assistant/integrations/home_connect) integration.

## Configuration

To add the **Home Connect** integration to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=home_connect)

Home Connect can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=home_connect).
- From the list, select **Home Connect**.
- Follow the instructions on screen to complete the setup.

</details>

## Usage information

For more documentation on how to use Neff in Home Assistant, refer to the [Home Connect integration documentation page](/home-assistant/integrations/home_connect).
