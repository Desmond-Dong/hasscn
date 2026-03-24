---
title: Nexity Eugénie
description: "使用 Overkiz 集成连接和控制您的 Nexity Eugénie 设备"

ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Number
  - Scene
  - Select
  - Sensor
  - Siren
  - Switch
  - Water heater
ha_domain: nexity
ha_integration_type: virtual
ha_supporting_domain: overkiz
ha_supporting_integration: Overkiz
ha_release: 2022.2
ha_codeowners:
  - '@imicknl'
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - water_heater
ha_iot_class: Local Polling
ha_dhcp: true
ha_zeroconf: true
---

Support for devices by Nexity Eugénie in Home Assistant is provided by the [Overkiz](/home-assistant/integrations/overkiz) integration.

Nexity Eugénie devices are either rebranded devices or devices that share a common communication protocol, making it possible to use them with the [Overkiz](/home-assistant/integrations/overkiz) integration.

## Configuration

To add the **Overkiz** integration to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=overkiz)

Overkiz can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=overkiz).
- From the list, select **Overkiz**.
- Follow the instructions on screen to complete the setup.

</details>

## Usage information

For more documentation on how to use Nexity Eugénie in Home Assistant, refer to the [Overkiz integration documentation page](/home-assistant/integrations/overkiz).
