---
title: Nice G.O.
description: 'The Nice G.O. integration is used to integrate with Nice/Linear(https://linear-solutions.com/) and Mighty Mule(https://mightymule.com/) products. This。'

ha_release: '2024.9'
ha_category:
  - Cover
  - Event
  - Light
  - Switch
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: nice_go
ha_platforms:
  - cover
  - diagnostics
  - event
  - light
  - switch
ha_integration_type: hub
---
# Nice G.O.

The **Nice G.O.** integration is used to integrate with [Nice/Linear](https://linear-solutions.com/) and [Mighty Mule](https://mightymule.com/) products.
This integration is used for garage doors and gate openers created by these companies.

Home Assistant 中的设备名称是根据 Nice G.O. 移动应用程序中定义的名称生成的。

## Prerequisites

确保您拥有 Nice G.O. 应用程序的工作帐户，并准备好您的电子邮件和密码。

## Configuration

To add the **Nice G.O.** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nice_go)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nice_go).
- From the list, select **Nice G.O.**.
- Follow the instructions on screen to complete the setup.

</details>

## Cover

与您的 Nice G.O. 帐户关联的车库门将显示为封面。

## Event

每当障碍物被阻挡时，就会触发障碍物被阻挡事件实体。这可能是由任何导致关闭不成功的事件触发的。这可能包括关闭期间的光束阻挡、关闭之前的光束阻挡以及挡道的物体。

## Light

车库门上的灯将显示为灯光。

## Switch

每个设备都将提供用于打开和关闭假期模式的开关。假期模式可防止通过物理控制点（例如壁挂式遥控器、无线键盘、遥控器或 HomeLink）操作门。它仍然可以通过家庭助理进行控制。

## Removing the integration

此集成遵循标准集成删除。不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
