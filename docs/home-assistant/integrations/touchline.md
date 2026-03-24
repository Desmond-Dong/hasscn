---
title: Roth Touchline
description: 关于如何在 Home Assistant 中集成 Roth Touchline 的说明。
ha_category:
  - Climate
ha_release: 0.61
ha_iot_class: Local Polling
ha_domain: touchline
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Roth Touchline** integration lets you control [ROTH Touchline](https://www.roth-uk.com/en/roth-touchline.htm) floor heating thermostats from Roth.

To set it up, add the following information to your "`configuration.yaml`" file:

```yaml
climate:
  - platform: touchline
    host: YOUR_IPADDRESS
```

```yaml
host:
  description: The IP address of your controller, e.g., `http://192.168.1.1`.
  required: false
  type: string
```
