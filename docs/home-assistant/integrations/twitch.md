---
title: Twitch
description: 关于如何将 Twitch 传感器集成到 Home Assistant 的说明。
ha_category:
  - Social
ha_release: '0.10'
ha_iot_class: Cloud Polling
ha_domain: twitch
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@joostlek'
ha_config_flow: true
---

The **Twitch** integration allows you to monitor [Twitch](https://www.twitch.tv/) channel status from within Home Assistant and set up automation based on the information.

## Get Twitch application credentials

Create a new app at **Register Your Application** in the [Twitch developer portal](https://dev.twitch.tv/console/apps):

- Enter a **Name** for your app. Note that it needs to be unique all over Twitch.
- Enter `https://my.home-assistant.io/redirect/oauth` in the **OAuth Redirect URL** field. 
- Get the **Client ID** and **Client secret** from the new application, you need them to complete the integration setup in Home Assistant. 


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
