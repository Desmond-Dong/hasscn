# Twente Milieu

The **Twente Milieu** integration enables you to monitor the upcoming waste collection schedules provided by [Twente Milieu](https://www.twentemilieu.nl/), a waste collection company serving municipalities in the Twente region of the Netherlands, including Enschede, Hengelo, Almelo, Borne, Hof van Twente, Oldenzaal, and Losser. This integration helps you stay informed about the next pickup dates for different types of waste (like organic, paper, plastic, and non-recyclable), ensuring you never miss a collection day.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Postal code:
  description: The postal code of the address, for example "7500AA".
House number:
  description: The house number of the address.
House letter/additional:
  description: The house letter or additional information of the address, if applicable.
```

## Use cases

With the Twente Milieu integration, you can:

* Monitor upcoming waste collection dates for different waste types
* Create automations to remind you to put out your waste bins before collection day
* View all your upcoming waste pickups in the calendar dashboard
* See at a glance when your next waste collection is due

## Supported functionality

### Calendar

The integration provides a calendar entity that displays all upcoming waste collection dates from Twente Milieu. You can view this calendar in your [Calendar dashboard](https://my.home-assistant.io/redirect/calendar/).

### Sensors

This integration creates the following sensors for upcoming waste collection dates:

* Next plastic waste pickup date
* Next organic waste pickup date
* Next paper waste pickup date
* Next non-recyclable waste pickup date
* Next Christmas tree pickup date (seasonal)

Each sensor provides the next scheduled date for its respective waste type, allowing you to track when to put out specific bins.

## Data updates

The integration updates its information by polling the Twente Milieu service every hour. This ensures your waste collection schedule in Home Assistant stays current.

## Examples

Below are practical examples of how you can use the Twente Milieu integration in your automations.

### Send notification the evening before the garbage pickup day

This example sends a notification to your mobile device the evening before collection day, ensuring you remember to put out the correct bin.

```yaml
automation:
  - alias: "Reminder to put out the bin"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.twente_milieu
        offset: "-6:00:00"
        # This triggers 6 hours before the calendar event starts

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Garbage day!"
          message: >
            Reminder: Tomorrow is {{ trigger.calendar_event.summary }} pickup
            day. Don't forget to put out the bin!
```

### Send notification at the end of day to bring in the empty bin

This example sends a notification to remind you to bring the empty bin back in after collection.

```yaml
automation:
  - alias: "Reminder to bring in the bin"
    triggers:
      - trigger: calendar
        event: end
        entity_id: calendar.twente_milieu
        offset: "-4:00:00"
        # This triggers 4 hours before the calendar event ends

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Bring in the bin!"
          message: >
            Reminder: The waste has been collected today. Don't forget to
            bring in your empty bin!
```

## Known limitations

* Home Assistant currently doesn't support translating calendar items. Therefore, waste collection events in the calendar will always be displayed in English, regardless of your language settings.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No additional steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
