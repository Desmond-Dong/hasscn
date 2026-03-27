---
title: Ogemray
description: 'Support for devices by Ogemray in Home Assistant is provided by the Shelly(/home-assistant/integrations/shelly) integration. 本页属于 Home Assistant 中文文档。'

ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Energy
  - Event
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Text
  - Update
  - Valve
ha_release: 0.115
ha_domain: ogemray
ha_integration_type: virtual
ha_supporting_domain: shelly
ha_supporting_integration: Shelly
ha_codeowners:
  - '@bieniu'
  - '@thecode'
  - '@chemelli74'
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - light
  - number
  - select
  - sensor
  - switch
  - text
  - update
  - valve
ha_iot_class: Local Push
ha_zeroconf: true
---
# Ogemray

Support for devices by Ogemray in Home Assistant is provided by the [Shelly](/home-assistant/integrations/shelly) integration.

Ogemray devices are either rebranded devices or devices that share a common communication protocol, making it possible to use them with the [Shelly](/home-assistant/integrations/shelly) integration.

## Configuration

To add the **Shelly** integration to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=shelly)

Shelly can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=shelly).
- From the list, select **Shelly**.
- Follow the instructions on screen to complete the setup.

</details>

## Usage information

For more documentation on how to use Ogemray in Home Assistant, refer to the [Shelly integration documentation page](/home-assistant/integrations/shelly).
