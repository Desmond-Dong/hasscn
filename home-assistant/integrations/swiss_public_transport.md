# Swiss public transport

The **Swiss public transport** integration will give you the next three departure times from a given location to another one in Switzerland.

The [Swiss public transport API](https://transport.opendata.ch/) only allows 1000 requests per 24 hours. The default polling rate is set to `90s`, which is just enough for one connection polling continuously. If more entries are needed, consider [defining a custom polling interval](#defining-a-custom-polling-interval) to reduce the amount of requests.

```yaml
Start station:
  description: "The departure station for the start of the connection (e.g., `Zürich HB`)"
End station:
  description: "The arrival station for the end of the connection (e.g., `Geneva`)"
Via stations:
  description: "List of up to 5 via stations (e.g., `Bern`, `Lausanne`)"
Departure or arrival time:
  description: "Choose between the departure or arrival time or the connection to be displayed"
Time mode:
  description: "The time mode of the connections (e.g., `now` , `fixed`, `offset`)"
Fixed time of day (only when time mode is set to fixed):
  description: "The relevant time for the connection (e.g. 7:12:00 AM every morning)."
Offset time from now (only when time mode is set to fixed):
  description: "The time offset added to the earliest possible connection (e.g. add +00:05:00 offset, taking into account the time to walk to the station)"
```

Use the [Stationboard](https://transport.opendata.ch/examples/stationboard.html) to find exact station names.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The public timetables are coming from [Swiss public transport](https://transport.opendata.ch/).

## Set up a connection

The minimum configuration for a connection requires a *start* and *end* station (for example, "Zürich HB").

Optionally, you can provide up to 5 additional *via* stations where the connection must go through.

![Config flow](/home-assistant/images/integrations/swiss_public_transport/config_flow.png)

### Time mode

The *Time mode* allows you to specify the time of the connections.

* Now (default): Provide the next connections.
* At a fixed time of day: Provide the connections that depart at a fixed time of day (for example, 18:15 in the evening)
* At an offset from now: Provide the next possible connections which depart after a specified offset (for example, 15 minutes from now, which helps account for a 15-minute walk to the station)

![Time mode option](/home-assistant/images/integrations/swiss_public_transport/config_flow_time_mode.png)

#### Use case: Next connection at my local bus stop

Usually, it takes some time to walk to the closest bus station from home, which can be modeled using the `offset` option in the *Time mode* dropdown, filtering out connections which are not reachable anymore. This information can then be displayed at the door or on your mobile device.

![Offset time mode option](/home-assistant/images/integrations/swiss_public_transport/config_flow_time_offset.png)

#### Use case: Daily train home

For people working business hours, a set-up using the `fixed` option in the *Time mode* allows you to identify the same train each day for commuting home. Set up an automation to send a push notification to get informed early.

![Fixed time mode option](/home-assistant/images/integrations/swiss_public_transport/config_flow_time_fixed.png)

### Departure versus Arrival

Usually, one wants to know when a connection **departs** (default), but in case where the opposite is needed and one wants to know when a connection **arrives**, select "Show arrival time at end station" in the time reference dropdown.

When configured for arrival time, the sensor will display the arrival time at the destination instead of the departure time from the start station. This is particularly useful for automations that need to trigger based on arrival times.

![Departure versus arrival option](/home-assistant/images/integrations/swiss_public_transport/config_flow_departure_arrival.png)

#### Use case: Inform family of train arriving late

A popular use case would be to know if your family member is running late and sending out a push notification or displaying their arrival time at home.

## Actions

The Swiss public transport integration has the following action:

* `swiss_public_transport.fetch_connections`

### Action: Fetch connections

The `swiss_public_transport.fetch_connections` action fetches the connections for a specific instance.

| Data attribute | Optional | Description                                              |
|------------------------|----------|----------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Swiss public transport config entry to get data from. For example, in YAML: `config_entry_id: zurich_geneva` or in UI `Instance: zurich_geneva`)|
| `limit`                | Yes      | The number of connections to fetch. (default: 3, range: \[1,15])|

## Defining a custom polling interval

If you want to define a specific interval at which your device is polled for data, you can disable the default polling interval and create your own polling automation.

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   * Then, select **System options** and toggle the button to disable polling.
     ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   * Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   * Define any trigger and condition you like.
   * Select **Add action**, then select **Other actions**.
   * Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/index.md#action-homeassistantupdate_entity).
   * Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
     ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
