---
title: NextBus
description: "有关如何在 Home Assistant 中使用 Nextbus 公共交通数据的说明。"

ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.93
ha_config_flow: true
ha_codeowners:
  - '@vividboarder'
ha_domain: nextbus
ha_platforms:
  - sensor
ha_integration_type: service
---

The **NextBus** integration will give you the next departure time and associated data from your public transit station/stop. The data comes from [NextBus](https://www.nextbus.com), which provides real time transit data for a number of transit authorities.

## Configuration

To add the **NextBus** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nextbus)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nextbus).
- From the list, select **NextBus**.
- Follow the instructions on screen to complete the setup.

</details>
