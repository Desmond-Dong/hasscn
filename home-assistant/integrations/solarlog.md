# Solar-Log

The **Solar-Log** integration uses the open JSON interface on [Solar-Log PV monitoring systems](https://www.solar-log.com/) to get details from your Solar-Log device and integrate these into your Home Assistant installation. With the integration you may monitor the solar power production and power consumption as tracked with your Solar-Log device.

## Supported devices

The integration should work with all Solar-Log devices with [firmware 3.x](#known-limitations).

## Prerequisites

Before you can use the integration, you either need the password of the Solar-Log user or you must activate the open JSON interface on your Solar-Log device.

* To activate the JSON interface on your Solar-Log device, on the device, go to the Configuration | System | Access control menu.
* When activating the interface, a red warning triangle with security information and risks is displayed. For security reasons, it is recommended to activate password protection and use the integration with the respective password.

The `solarlog` integration uses the default host address "http://solar-log" if you don't specify a host. If your device isn't accessible on this address, use its IP Address instead.

:::important
If password protection for the general user is deactivated, the open JSON interface is activated by default. For security reasons, it is recommended to activate the user's password.
Please note that the open JSON interface only exposes a limited amount of data. Even if the open JSON interface has been activated, without the user's password, only limited data is available in the integration [see available sensors](#sensors). For [full functionality](#additional-data), you either need the user's password or the user password should be deactivated (not recommended).

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

To setup the integration you need the following information:

```yaml
Name:
  description: "The name for your Solar-Log device in Home Assistant. This will also be uses as prefix for the entity names."
Host:
  description: "The URL or IP address of your Solar-Log."
User password available:
  description: "Check the box, if you have the password for the Solar-Log user to securely access [all data](#additional-data)."
Password:
  description: "Password for the Solar-Log user. Will only be asked for in a second step, if in the first step the checkbox has been selected."
```

## Configuration options

The integration has no additional configuration options.

## Supported functionality

### Sensors

The following sensors are available via the open JSON interface:

| name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| last\_update           |        | Time of latest data update.                |
| power\_ac              | W      | Total output PAC from all of the inverters and meters in inverter mode. |
| power\_dc              | W      | Total output PAC from all of the inverters. |
| voltage\_ac            | V      | Average voltage AC from the inverter. |
| voltage\_dc            | V      | Average voltage DC from the inverter |
| yield\_day             | kWh    | Total yield for the day from all of the inverters |
| yield\_yesterday       | kWh    | Total yield for the previous day from all of the inverters. |
| yield\_month           | kWh    | Total yield for the month from all of the inverters. |
| yield\_year            | kWh    | Total yield for the year from all of the inverters. |
| yield\_total           | kWh    | Total yield from all of the inverters. |
| consumption\_ac        | kWh    | Current total consumption AC from all of the consumption meters. |
| consumption\_day       | kWh    | Total consumption for the day from all of the consumption meters. |
| consumption\_yesterday | kWh    | Total consumption for the previous day from all of the consumption meters. |
| consumption\_month     | kWh    | Total consumption for the month from all of the consumption meters. |
| consumption\_year      | kWh    | Total consumption for the year from all of the consumption meters. |
| consumption\_total     | kWh    | Accumulated total consumption from all consumption meters. |
| installed\_peak\_power  | W      | Installed solar peak power. |
| alternator\_loss       | W      | Altenator loss (equals to power\_dc - power\_ac) |
| capacity              | %      | Capacity (equals to power\_dc / total power) |
| efficiency            | %      | Efficiency (equals to power\_ac / power\_dc) |
| power\_available       | W      | Available power (equals to power\_ac - consumption\_ac) |
| usage                 | %      | Usage (equals to consumption\_ac / power\_ac) |

:::note
The solarlog integration is using the solarlog\_cli pypi package to get the data from your Solar-Log device. The last five sensors are not reported by your Solar-Log device directly, but are computed by the library.

:::

### Additional data

:::important
The additional data is only accessible if the user's password is available (or password protection is deactivated). Obviously, deactivating password protection is a security risk and should only be done in specific circumstances. In any event, you do this at your own risk.

:::
The following additional sensor becomes available:

| Name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| charge\_level          | %      | Current charge level of battery.\*          |
| charging\_power        | W      | Current power charging battery.\*           |
| discharging\_power     | W      | Current power discharging battery.\*        |
| self\_consumption\_year | kWh    | Annual self-consumed solar power.          |

\*Only available, if battery connected to solarlog.

In addition, information from devices connected to the Solar-Log device becomes available. The following additional sensors become available (all values are per inverter/device):

| Name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| current\_power         | W      | Current power provided/used by the device. |
| consumption\_year      | kWh    | Total energy provided/used by the device.  |

### Additional template sensor

In case you would like to get additional calculated sensors such as the amount of excess solar power available or the energy returned to the grid, you can use the [template platform](/home-assistant/integrations/template/index.md).

```yaml
# Example configuration.yaml entry for sensor template platform
template:
  - sensor:
    - name: "Solarlog return to grid"
      state: "{{ states('sensor.solarlog_consumption_year') | float(0) - states('sensor.self_consumption_year') | float(0) }}"
```

## Data updates

The integration fetches data from the device every minute.

## Actions

The integration provides no additional actions.

## Known limitations

The integration only provides the (limited) data exposed by means of the JSON interface. This also entails that the values for the self-consumption are rounded to full kWh.
Firmware versions below 3.x are not supported, as they do not expose the JSON interface. Please contact the Solar-Log support if you need assistance with updating the firmware of your Solar-Log device.

## Removing the integration

This integration can be removed by following these steps:

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
