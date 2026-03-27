---
title: MTA New York City Transit
description: 'The MTA New York City Transit integration provides real-time subway and bus arrival predictions for NYC transit lines using GTFS-RT data from the。'

ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2026.3
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: mta
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---
# MTA New York City Transit

The **MTA New York City Transit** integration provides real-time subway and bus arrival predictions for NYC transit lines using GTFS-RT data from the [Metropolitan Transportation Authority (MTA)](https://new.mta.info/).

## Prerequisites

- **Subway tracking**: No API key is required.
- **Bus tracking**: An [MTA Bus Time API key](https://bustime.mta.info/wiki/Developers/Index) is required.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
API key:
  description: "Your MTA Bus Time API key. Required for bus tracking, optional for subway only."
```

## Adding a subway stop

To add a subway arrival sensor:

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the **MTA New York City Transit** integration.
2. Select **Add subway stop**.
3. Select the subway line you want to monitor from the dropdown.
4. Select the stop and direction (indicated by N/S suffix for northbound/southbound).

## Adding a bus stop

To add a bus arrival sensor:

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the **MTA New York City Transit** integration.
2. Select **Add bus stop**.
3. Enter the bus route (for example, `M15`, `B46`, `Q10`).
4. Select the stop from the list. Direction information is included with each stop.

:::note
Bus tracking requires an API key. If you did not provide one during initial setup, you will be prompted to enter one when you attempt to add a bus stop.

:::
## Supported functionality

The integration creates a device per stop with 9 sensors, covering the next 3 upcoming arrivals.

### Sensors

For each of the next 3 arrivals, the following sensors are created:

- **Arrival**: A timestamp sensor showing the predicted arrival time.
- **Arrival destination**: The final destination of the train or bus.
- **Arrival route**: The route identifier of the train or bus.

## Defining a custom polling interval

If you want to define a specific interval at which your device is polled for data, you can disable the default polling interval and create your own polling automation.

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   - Then, select **System options** and toggle the button to disable polling.
   ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   - Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   - Define any trigger and condition you like.
   - Select **Add action**, then select **Other actions**.
   - Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/#action-homeassistantupdate_entity).
   - Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
   ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.

The default polling interval is 30 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
