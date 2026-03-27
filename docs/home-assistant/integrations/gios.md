---
title: GIOŚ
description: 'The GIOŚ integration uses the GIOŚ(http://powietrze.gios.gov.pl/pjp/current) web service as a source for air quality data for your location. 本页属于 Home。'
ha_category:
  - Health
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: gios
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: platinum
---
# GIOŚ

The **GIOŚ** integration uses the [GIOŚ](http://powietrze.gios.gov.pl/pjp/current) web service as a source for air quality data for your location.

## Use cases

- Monitor outdoor air quality.
- Warn to close windows when air quality is poor.
- Control ventilation systems based on air quality.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Measuring station:
  description: "Select a measuring station from the list."
```

## Supported functionality

Below is a complete overview of the entities this integration provides.

### Available sensors

The integration provides the following sensors:

- Air quality index
- Benzene
- Carbon monoxide
- Nitrogen dioxide
- Nitrogen dioxide index
- Nitrogen monoxide
- Nitrogen oxides
- Ozone
- Ozone index
- PM10
- PM10 index
- PM2.5
- PM2.5 index
- Sulphur dioxide
- Sulphur dioxide index

## Data updates

By default, the integration polls data from the API every 30 minutes.

## Examples

The following examples show how to use the integration in Home Assistant automations. These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Notify when the PM10 level is too high

The following example sends a notification to your mobile device when the PM10 level exceeds 100 µg/m³.


```yaml
automation:
  - alias: "Notify when PM10 level is too high"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.czerniawa_pm10
        above: 100

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "High PM10 Level Alert"
          message: >
            The PM10 level is too high at {{ states('sensor.czerniawa_pm10') }} µg/m³.
            Avoid going outside.
```


## Known limitations

- The availability of sensors depends on the selected measurement station. Not all stations provide data for all pollutants or indices.
- The data provider may publish new measurements less frequently than every 30 minutes, so consecutive polls can return unchanged data.

## Troubleshooting

Before reporting an issue, enable [debug logging](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, _if still possible_, download the diagnostics data. If you have collected the debug log and the diagnostics data, include them in the issue report.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
