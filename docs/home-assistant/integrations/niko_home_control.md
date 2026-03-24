---
title: Niko Home Control
description: "有关如何将 Niko Home Control 1 灯集成到 Home Assistant 的说明。"

ha_codeowners:
  - '@VandeurenGlenn'
ha_config_flow: true
ha_category:
  - Climate
  - Cover
  - Light
  - Scene
ha_iot_class: Local Push
ha_release: 0.82
ha_domain: niko_home_control
ha_platforms:
  - climate
  - cover
  - light
  - scene
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Niko Home Control** integration allows you to integrate your [Niko connected controller (with Home Control 1)](https://www.niko.eu/enus/products/niko-home-control) into Home Assistant.

## Configuration

To add the **Niko Home Control** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=niko_home_control)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=niko_home_control).
- From the list, select **Niko Home Control**.
- Follow the instructions on screen to complete the setup.

</details>

## Removing the integration

此集成遵循标准集成删除。不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
