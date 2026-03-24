---
title: LetPot
description: 关于如何将 LetPot 水培花园集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Time
ha_release: 2025.2
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@jpelgrom'
ha_domain: letpot
ha_integration_type: hub
ha_platforms:
  - binary_sensor
  - number
  - select
  - sensor
  - switch
  - time
ha_quality_scale: silver
---

The **LetPot** integration allows you to integrate your [LetPot](https://letpot.com/) hydroponic gardens/systems into Home Assistant.

## Supported devices

The following devices are supported by this integration:

- LetPot Air (LPH-AIR)
- LetPot Max (LPH-MAX)
- LetPot Mini (LPH-MINI)
- LetPot Pro (LPH-PRO)
- LetPot Senior (LPH-SE)

## Prerequisites

To use this integration, you must first create a LetPot account and connect your hydroponic garden to Wi-Fi using the official app.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
    description: "The email address of your LetPot account."
    required: true
    type: string
Password:
    description: "The password of your LetPot account."
    required: true
    type: string
```

## Supported functionality

The **LetPot** integration provides the following entities.

### Binary sensors

- **Pump**: Indicates if the water pump is running (on) or idle (off). Updates may be delayed by the device until another entity updates.
  - Available for LetPot Air devices, and other device models which report this value.
  - Not available for LetPot Pro devices.

Additionally, binary sensors for possible issues are available:

- **Low nutrients**: Indicates if the nutrient solution tank used for auto mode is (almost) empty and should be refilled.
  - Available for LetPot Max devices.
- **Low water**: Indicates if the water tank is (almost) empty and should be refilled.
  - Available for all devices except LetPot Pro.
- **Pump error**: Indicates if the water pump detected a flow issue and should be cleaned.
  - Available for some LetPot Mini and LetPot SE devices which report this value.
- **Refill error**: Indicates that the external water tank/input used for refilling in auto mode is not filling up the main water tank. If you see a refill error, check the external water tank/input and the connection to the main water tank.
  - Available for LetPot Max devices.

:::important
Binary sensors for issues are disabled by default. If you want to use them, you need to enable them first. See the [enabling or disabling entities](/home-assistant/common-tasks/general/#enabling-or-disabling-entities) documentation for information on how to do this.

:::
### Numbers

- **Plants age**: The number of days the plants in the hydroponic garden have been growing/since planting. This value is automatically updated by the device while the **Power** switch is on. Edit the value to restart the counter or use your own logic.

For LetPot Max devices, the following number is also available:

- **Light brightness**: Set the built-in light brightness level. Accepted values are 1 (lowest) to 8 (highest).

### Selects

- **Light mode**: Set the built-in light mode to fruits/flowers (red and white LEDs enabled) or veggies/herbs (red, white and blue LEDs enabled).

Depending on device support, more selects are available:

- **Light brightness**: Set the built-in light brightness to low or high.
  - Available for LetPot Air devices, and some LetPot SE devices which support changing the brightness.
- **Temperature unit on display**: Set the temperature unit for the temperature shown on the device's display.
  - Available for LetPot Max devices, excluding devices with a serial number starting with `LPH63`.

### Sensors

For LetPot Max devices, the following sensors are available:

- **Temperature**: Ambient temperature measured by the device.
- **Water level**: Percentage of the water tank filled with water. The official app will display 0-30% as "Low", 30-90% as "Medium", and 90% or more as "High".

### Switches

- **Power**: Main switch to turn on/off the device. Device features (like the built-in light and pump) will only operate when the power is on.
- **Pump cycling**: Turn on/off cycling of the water pump. When on, the pump will run intermittently (controlled by the device), which can be tracked using the **Pump** binary sensor.

For devices with an alarm that allows muting the sound, the following switch is also available:

- **Alarm sound**: Turn on/off the alarm sound.

For LetPot Max devices, the following switch is also available:

- **Auto mode**: Turn on/off auto mode, which automatically adds water and nutrients to the garden when needed.

### Times

- **Light on**: Time when the built-in light turns on.
- **Light off**: Time when the built-in light turns off.

:::note
When **Light on** and **Light off** are set to the same time, the built-in light will be turned off.


:::
## Data updates

The integration receives push updates when the device state changes, enabling immediate updates of the data in Home Assistant.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
