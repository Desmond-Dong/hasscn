---
title: Sky Hub
description: 'The Sky Hub integration offers presence detection by looking at connected devices to a Sky Hub router(https://www.sky.com/shop/broadband-talk/sky-hub/)。'
ha_category:
  - Presence detection
ha_release: 0.37
ha_domain: sky_hub
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Sky Hub

The **Sky Hub** integration offers presence detection by looking at connected devices to a [Sky Hub router](https://www.sky.com/shop/broadband-talk/sky-hub/) based router.

To use your Sky Hub device in your installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: sky_hub
```

```yaml
host:
  description: The IP address of your router.
  required: false
  default: 192.168.1.254
  type: string
```

See the [device tracker integration page](/home-assistant/integrations/device_tracker/) for instructions how to configure the people to be tracked.
