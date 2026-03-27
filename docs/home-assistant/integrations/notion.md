---
title: Notion
description: 'The Notion integration retrieves data from Notion(https://getnotion.com) wireless home monitoring sensor kits. 本页属于 Home Assistant 中文文档。'

ha_category:
  - Binary sensor
  - Hub
  - Sensor
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: notion
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: hub
---
# Notion

The **Notion** integration retrieves data from [Notion](https://getnotion.com) wireless
home monitoring sensor kits.

## Configuration

To add the **Notion** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=notion)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=notion).
- From the list, select **Notion**.
- Follow the instructions on screen to complete the setup.

</details>
