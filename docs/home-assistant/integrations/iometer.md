---
title: IOmeter
description: 'The IOmeter integration fetches data from your IOmeter(https://iometer.de/produkt/) device, by using the local HTTP API. 本页属于 Home Assistant 中文文档。'
ha_release: 2025.3
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@jukrebs'
ha_quality_scale: bronze
ha_domain: iometer
ha_integration_type: device
ha_iot_class: Local Polling
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - sensor
---
# IOmeter

The **IOmeter** integration fetches data from your [IOmeter](https://iometer.de/produkt/) device, by using the local HTTP API.

IOmeter is a German company that provides the IOmeter device for reading electricity meters.

:::important
In order for the IOmeter to be used by Home Assistant, the Core/Bridge firmware version should be at least 62/69.

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### Configuration parameters

```yaml
IP address:
  description: The IP address of your IOmeter.
```

## Data updates

The integration will update its sensors by polling the IOmeter Bridge every ten seconds for new values. We recommend using USB-C power for the IOmeter Core instead of batteries.

## Available sensors

The following sensors are supported:

- Power (W): Active power
- Total energy usage (kWh): How much energy the meter used
- Total energy usage T1 (kWh): How much energy the meter used on tariff T1
- Total energy usage T2 (kWh): How much energy the meter used on tariff T2
- Total energy returned (kWh): How much energy the meter returned to the grid
- Meter number: Electricity meter number
- Pin status: Electricity meter pin status
- Core battery level: Battery level of the IOmeter Core in percent
- Core power status: Battery or USB-C power for the IOmeter Core
- Signal strength WiFi: WiFi connection strength of the Bridge
- Signal strength Core/Bridge: Sub-GHz connection strength between Core and Bridge
- Core/Bridge connection status: If Core and Bridge are connected
- Core attachment status: If the IOmeter Core is attached to the electricity meter

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
