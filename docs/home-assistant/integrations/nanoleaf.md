---
title: Nanoleaf
description: 'The Nanoleaf integration allows you to control and monitor Nanoleaf Light Panels, Canvas, Shapes, Elements, and Lines. 本页属于 Home Assistant 中文文档。'

ha_category:
  - Button
  - Event
  - Light
ha_codeowners:
  - '@milanmeu'
  - '@joostlek'
  - '@loebi-ch'
  - '@JaspervRijbroek'
  - '@jonathanrobichaud4'
ha_config_flow: true
ha_homekit: true
ha_iot_class: Local Push
ha_release: 0.67
ha_domain: nanoleaf
ha_platforms:
  - button
  - diagnostics
  - event
  - light
ha_zeroconf: true
ha_ssdp: true
ha_integration_type: device
---
The **Nanoleaf** integration allows you to control and monitor Nanoleaf Light Panels, Canvas, Shapes, Elements, and Lines.

此集成不支持 Nanoleaf Remote 和 Essentials 灯。通过 HomeKit 控制器集成，可以通过 Thread 和蓝牙控制 Nanoleaf Essentials 灯。

## Configuration

To add the **Nanoleaf** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nanoleaf)

Nanoleaf can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nanoleaf).
- From the list, select **Nanoleaf**.
- Follow the instructions on screen to complete the setup.

</details>

# Transition and brightness

在动作中使用过渡（例如“light.turn_on”）时，过渡仅应用于亮度，不适用于颜色。当动作设置了过渡但不包含亮度时，灯光将自动过渡到 100% 亮度。

## Removing the integration

此集成遵循标准集成删除，不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
