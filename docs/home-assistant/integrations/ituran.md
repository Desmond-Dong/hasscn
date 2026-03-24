---
title: Ituran
description: 关于如何将 Ituran 添加到 Home Assistant 的说明。
ha_category:
  - Car
  - Device Tracker
  - Presence detection
ha_release: '2025.1'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@shmuelzon'
ha_domain: ituran
ha_platforms:
  - binary_sensor
  - device_tracker
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

The **Ituran** integration allows you to retrieve information from your Ituran-equipped vehicle using the [Ituran APP service](https://www.ituran.co.il/ituranfront/comfort-services-2/ituran-app-comfort). It pulls information from the Ituran web service regarding the vehicle's location.

## Prerequisites

You must have an Ituran account for use with the Ituran APP ([Android](https://play.google.com/store/apps/details?id=com.ituran.forall)/[iOS](https://apps.apple.com/app/id1227756834)). All devices that work with the app, should work with this integration as well.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
ID or passport number:
  description: Your government ID or passport number used to sign-up with Ituran.
Mobile phone number:
  description: The mobile phone number used to sign-up with Ituran. A one-time-password will be sent to this number.
```

## Data updates

The information is pulled every 5 minutes from the Ituran web service; however, the data is updated at intervals determined by Ituran based on whether the vehicle is stationary or not.

## Supported functionality

### Binary sensor

The Ituran integration exposes the following binary sensors for each registered vehicle:

- **Charging** - Only for EV's. The charging state of the vehicle

### Device tracker

The Ituran integration will track the location of each vehicle registered to your account.

### Sensor

The Ituran integration also exposes the following sensors for each registered vehicle:

- **Address** - The address that corresponds with the vehicle's location, as determined by Ituran
- **Battery level** - Only for EV's. The battery level (%) of the vehicle
- **Battery voltage** - The measured voltage (V) of the car battery. If not supported by the installation, the value will be set to `-1`
- **Heading** - The direction (0-359°) that the vehicle is pointing to
- **Last update from vehicle** - The time from when the vehicle last published its information to the Ituran cloud
- **Mileage** - The distance (km) the vehicle has traveled
- **Remaining range** - The distance (km) the vehicle can travel until the battery is depleted
- **Speed** - The current speed (km/h) of the vehicle

## Known limitations

- While this integration is configured with your account, you won't be able to use the official app, as only one connection at a time is supported
  - As a workaround, it's possible to add another user from the app, with a different ID and mobile phone number that will be dedicated for Home Assistant use.
- The vehicle's heading value is unreliable when it's not in motion
- The mileage value is not read from the vehicle's odometer but is calculated from GPS, which may result in slight variations from the actual odometer reading

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
