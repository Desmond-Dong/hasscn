# Wallbox

The **Wallbox** integration pulls data from the [MyWallbox Portal](https://my.wallbox.com) for your Wallbox charging station.
Use this integration to monitor the charging of your car by the **Wallbox** charger and modify settings such as **Charging Power**, **Energy Price**, **Solar Charging** and **Pause/Resume**. The energy usage collected by this integration can be used in the [Energy dashboard](/home-assistant/home-energy-management).

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Station Serial Number:
  description: "The Serial number of your charger. You can find it in the Wallbox App or on the Wallbox Portal."
Username:
  description: "This integration only supports a regular / email login, Apple or Google accounts are not supported."
```

## Sensors

The integration adds the following sensors:

* Added energy (kWh)
* Added green energy (kWh)
* Added grid energy (kWh)
* Added range (km)
* Charging power (kW)
* Charging speed
* Charging time
* Cost (\[default currency])
* Current mode
* Depot price (\[default currency]/kWh)
* Energy price (\[default currency]/kWh)
* Max available power (A)
* State of charge (%)
* Status description
* Max charging current (A)
* Max ICP current (A)

## Number

The integration adds the following number entities:

* Max charging current (A)
* Max ICP current; this is the maximum current available for load balancing (A)
* Energy price (\[default currency]/kWh)

The number entity is only loaded if the supplied username has sufficient rights to change the Max. Charging Current.

## Lock

The integration adds a lock entity, allowing you to lock the charger. Please note, this only works with a user with admin rights.

## Select

The integration adds a select entity to control solar charging options, allowing you to choose between **Eco mode**, **Full solar**, or **Disable solar charging**.

## Switch

The integration adds a switch entity, allowing you to pause/resume the charging process.

## Data updates

Data is refreshed once every 90 seconds for owners of 1 charger, this rate is multiplied by the amount of chargers for owners of multiple Wallboxes. Note that this update interval has been chosen in conjunction with Wallbox to prevent overloading their infrastructure. Altering this refresh rate is not recommended.

## Troubleshooting

### Setup errors

* You can only use a regular login with this integration.
* Google or Apple logins are not supported.
* You can find the serial number of your charger in the Wallbox app or on the Wallbox Portal under the Chargers section.

### Connection failures

Users often report issues with the Wi-Fi reception of their charger; use a wired connection if possible. Also verify that the charger is communicating with the Wallbox Portal.

### Insufficient Rights

This integrations needs admin credentials to function properly. Please assign the user appropriate permissions in the Wallbox portal.

### Other issues

Always first check whether the data is being received by the Wallbox Portal as this integration uses the same API. Many problems are related to the connectivity of the charger.

## Removing the integration

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
