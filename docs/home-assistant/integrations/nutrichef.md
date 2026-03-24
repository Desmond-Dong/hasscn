---
title: Nutrichef
description: "使用 INKBIRD 集成连接和控制您的 Nutrichef 设备"

ha_category:
  - Sensor
ha_release: 2022.8
ha_domain: nutrichef
ha_integration_type: virtual
ha_supporting_domain: inkbird
ha_supporting_integration: INKBIRD
ha_bluetooth: true
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - sensor
ha_iot_class: Local Push
---

Support for devices by Nutrichef in Home Assistant is provided by the [INKBIRD](/home-assistant/integrations/inkbird) integration.

Nutrichef devices are either rebranded devices or devices that share a common communication protocol, making it possible to use them with the [INKBIRD](/home-assistant/integrations/inkbird) integration.

## Configuration

To add the **INKBIRD** integration to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=inkbird)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=inkbird).
- From the list, select **INKBIRD**.
- Follow the instructions on screen to complete the setup.

</details>

## Usage information

For more documentation on how to use Nutrichef in Home Assistant, refer to the [INKBIRD integration documentation page](/home-assistant/integrations/inkbird).
