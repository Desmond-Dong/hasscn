---
title: OpenGarage
description: "有关如何将 OpenGarage.io 集成到 Home Assistant 中的说明。"

ha_category:
  - Cover
  - DIY
ha_iot_class: Local Polling
ha_release: 0.44
ha_domain: opengarage
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
ha_platforms:
  - binary_sensor
  - button
  - cover
  - sensor
ha_integration_type: device
---

**OpenGarage** integration 让您可以通过 Home Assistant 控制开源的 [OpenGarage.io](https://opengarage.io/) 设备。

## Configuration

To add the **OpenGarage** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=opengarage)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=opengarage).
- From the list, select **OpenGarage**.
- Follow the instructions on screen to complete the setup.

</details>
