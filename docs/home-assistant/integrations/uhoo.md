---
title: uHoo
description: 'The uHoo integration lets you integrate uHoo(https://getuhoo.com) devices into Home Assistant. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2026.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@getuhoo'
  - '@joshsmonta'
ha_domain: uhoo
ha_integration_type: hub
ha_category: []
ha_quality_scale: bronze
ha_platforms:
  - sensor
ha_config_flow: true
---
# uHoo

The **uHoo** integration lets you integrate [uHoo](https://getuhoo.com) devices into Home Assistant.

## About uHoo

uHoo delivers advanced, real-time indoor air quality monitoring designed to help you understand, manage, and improve the air in your home. By measuring 9 key environmental factors, uHoo provides accurate and science-backed insights that support healthier living and smarter home automation.

What sets uHoo apart is its suite of proprietary health and safety indices that go beyond raw data to show you exactly how your environment affects your well-being, helping you act before problems even start.
- Virus index
- Mold index
- Influenza index

Connecting uHoo with Home Assistant unlocks even more possibilities: create air-quality-based routines, receive instant alerts, track long-term trends, and maintain a safer, more energy-efficient home environment.

With uHoo, you can confidently make better decisions about your indoor air and stay on top of your game every day.

## Supported devices

- [uHoo Smart Air Monitor](https://getuhoo.com/home/smart-air-monitor)
- [uHoo Caeli Air Monitor](https://getuhoo.com/home/caeli)

## Prerequisites

1. Download the **uHoo** app from the [App Store](https://apps.apple.com/app/id1084953997) or [Google Play](https://play.google.com/store/apps/details?id=com.uhooair).
2. Sign up for a uHoo account.
3. Register at least one device to your account.
4. Upgrade your account to uHoo Premium.
5. Login the [uHoo web dashboard](https://premium.getuhoo.com/) and tap the **Account** icon in the bottom left corner.
6. Navigate to the **API Key** section and enter your account password to create an API key.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Supported functionality

### Sensors

- Temperature
- Relative humidity
- PM2.5 (Particulate Matter)
- Total volatile organic compounds (TVOC)
- Carbon dioxide (CO2)
- Carbon monoxide (CO)
- Air pressure
- Ozone
- Nitrogen dioxide (NO2)

### Indices

- Virus index
- Mold index

### Data frequency

- This integration polls data from the devices every 5 minutes.

## Troubleshooting

### I can't login the uHoo Premium web dashboard

Login your uHoo app and confirm your account is in uHoo Premium, or reach out to support@getuhoo.com for further assistance.

### I can't see my devices

Make sure that your devices are visible in the uHoo app, and that you have used the same account to create the API key in the web dashboard.

### I can't see my data

Check your API key and make sure it is up to date.

## Removing the integration

This integration follows standard integration removal. We suggest that you update your API key afterwards for security reasons.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
