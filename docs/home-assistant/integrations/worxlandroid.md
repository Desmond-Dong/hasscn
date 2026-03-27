---
title: Worx Landroid
description: 关于如何将 Worx Landroid WG796E.1 或 WG797E 作为传感器集成到 Home Assistant 的说明。
ha_category:
  - DIY
ha_release: 0.54
ha_iot_class: Local Polling
ha_domain: worxlandroid
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Worx Landroid

The **Worx Landroid** integration allows you to get the current state, battery level and error status Worx Landroid WG796E.1 or WG797E.

To use your Worx Landroid mower in your installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: worxlandroid
    host: 192.168.0.10
    pin: 1234
```

```yaml
host:
  description: The IP address or host name of the mower.
  required: true
  type: string
pin:
  description: The pin code for the mower.
  required: true
  type: string
allow_unreachable:
  description: This will allow the mower to be outside of Wi-Fi range without raising an error.
  required: false
  type: boolean
  default: true
```
