---
title: Thomson
description: 有关如何将 Thomson 路由器集成到 Home Assistant 的说明。
ha_category:
  - Presence detection
ha_release: 0.7
ha_domain: thomson
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

Thomson produced networking equipment (under the brand name SpeedTouch) till 2010 and was then renamed to Technicolor.

This platform allows you to detect presence by looking at connected devices to a [Thomson](https://www.technicolor.com/) device.

To use this device tracker in your installation, add the following to your "`configuration.yaml`" file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: thomson
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: The IP address of your router, e.g., 192.168.1.1.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges, usually *admin*.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
```

See the [device tracker integration page](/home-assistant/integrations/device_tracker/) for instructions how to configure the people to be tracked.
