---
title: NMBS
description: "有关如何在 Home Assistant 中集成 NMBS/SNCB 比利时铁路旅行的时刻表数据的说明。"

ha_category:
  - Transport
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_release: 0.85
ha_domain: nmbs
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **NMBS** integration will create sensors for monitoring travel time and information between 2 stations.

## Configuration

To add the **NMBS** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nmbs)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nmbs).
- From the list, select **NMBS**.
- Follow the instructions on screen to complete the setup.

</details>
