---
title: Shodan
description: 有关如何将 Shodan 传感器集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.51
ha_codeowners:
  - '@fabaff'
ha_domain: shodan
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Shodan** integration is displaying the total of result of a
[Shodan](https://www.shodan.io/) query.

Use "Show API Key" in the upper right corner when you are logged in or got to
your "My Account" page to retrieve your API key.

To enable this integration, add the following lines to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::
file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: shodan
    api_key: SHODAN_API_KEY
    query: "home-assistant"
```

```yaml
  api_key:
    description: The API key for Shodan.io.
    required: true
    type: string
  query:
    description: The search string.
    required: true
    type: string
  name:
    description: Name of the Shodan sensor.
    required: false
    type: string
```
