# Tractive

[Tractive](https://tractive.com/en/) is an Austrian company that develops real-time location trackers for pets and other animals using GPS and GSM technology.

The Tractive integration allows you to monitor locations of your pets from within Home Assistant and set up automations based on the information.

## Prerequisites

To use the integration you must be a premium tractive client.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::important
Due to Tractive API limitations, trackers (pets) that are shared from another account to your account are not visible in Home Assistant. You need to configure all Tractive accounts from which trackers (pets) come from with Home Assistant.

:::

## Integration entities

The Tractive integration adds one device tracker and several sensors and switches per registered pet:

![Tractive device tracker](/home-assistant/images/integrations/tractive/device_tracker.png)
