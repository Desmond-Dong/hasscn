---
title: Speedtest.net
description: 如何将 Speedtest.net 集成到 Home Assistant 中。
ha_category:
  - Sensor
  - System monitor
ha_release: 0.13
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rohankapoorcom'
  - '@engrbm87'
ha_domain: speedtestdotnet
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Speedtest.net** integration uses the [Speedtest.net](https://speedtest.net/) web service to measure network bandwidth performance.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Most Speedtest.net servers require TCP port 8080 outbound to function. Without this port open you may experience significant delays or no results at all. See note on their [help page](https://www.speedtest.net/help).

By default, a speed test will be run every hour. You can disable polling using system options and use the `update_entity` action to automate the speed test frequency.

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

## Integration sensors

The following sensors are added by the integration:

sensors:

- Ping sensor: Reaction time in ms of your connection (how fast you get a response after you’ve sent out a request).
- Download sensor: The download speed (Mbit/s).
- Upload sensor: The upload speed (Mbit/s).

This integration uses [speedtest-cli](https://github.com/sivel/speedtest-cli) to gather network performance data from Speedtest.net.
Please be aware of the potential [inconsistencies](https://github.com/sivel/speedtest-cli#inconsistency) that this integration may display.

## Examples

In this section you will find some real-life examples of how to use this integration.
### Using as a trigger in an automation


```yaml
# Example configuration.yaml entry
automation:
  - alias: Turn On Green Light When Download Speed Is Good
    description: >-
      This automation turns on the Yeelight bulb with a green color when the
      download speed exceeds 10 megabits per second.
      It ensures that the light is an indicator of the health of your
      network connection.
    triggers:
      - trigger: template
        value_template: "{{ states('sensor.speedtest_download') | float >= 10 }}"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.yeelight_bulb
        data:
          rgb_color: [0, 100, 0]

  - alias: Turn On Red Light When Download Speed Is Poor
    description: >-
      This automation turns on the Yeelight bulb with a red color when the
      download speed drops below 10 megabits per second.
      It ensures that the light is an indicator of the health of your
      network connection.
    triggers:
      - trigger: template
        value_template: "{{ states('sensor.speedtest_download') | float < 10 }}"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.yeelight_bulb
        data:
          rgb_color: [255, 0, 0]
```


## Notes

- When running on Raspberry Pi the maximum speed is limited by the LAN adapter. The Raspberry Pi 3+ models come with a Gigabit LAN adapter which supports a [maximum throughput](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) of 300 Mbit/s.
- Running this integration can have negative effects on the system's performance as it requires a fair amount of memory.
- If run frequently, this integration has the ability to use a considerable amount of data. Frequent updates should be avoided on bandwidth-capped connections.
- While the speedtest is running your network capacity is fully utilized. This may have a negative effect on other devices using the network such as gaming consoles or streaming boxes.
