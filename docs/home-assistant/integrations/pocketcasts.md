---
title: Pocket Casts
description: 有关如何在 Home Assistant 中设置 Pocket Casts 传感器的说明。
ha_category:
  - Multimedia
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: pocketcasts
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Pocket Casts** integration lets you monitor how many unplayed episodes you have of your favorite podcasts at [Pocket Casts](https://play.pocketcasts.com/). This integration requires a [Pocket Casts + Plus](https://www.pocketcasts.com/plus/) subscription to work!

## Configuration

To enable this sensor, add the following lines to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pocketcasts
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
username:
  description: The username to access the PocketCasts service.
  required: true
  type: string
password:
  description: The password for the given username.
  required: true
  type: string
```
