---
title: Tikteck
description: 有关如何在 Home Assistant 中设置 Tikteck LED 灯泡的说明。
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.36
ha_domain: tikteck
ha_platforms:
  - light
ha_integration_type: integration
ha_quality_scale: legacy
---

Support for the Bluetooth smart bulb from [Tikteck](https://www.tikteck.com/). To enable these lights, add the following lines to your "`configuration.yaml`" file:

```yaml
# Example configuration.yaml entry
light:
  - platform: tikteck
    devices:
      00:21:4D:00:00:01:
        name: Bulb 1
        password: 76409387
      00:21:4D:00:00:01:
        name: Bulb 2
        password: 36478643
```

```yaml
devices:
  description: A list of devices with their Bluetooth address.
  required: false
  type: list
  keys:
    name:
      description: A custom name to use in the frontend.
      required: false
      type: string
    password:
      description: The bulb-specific password.
      required: true
      type: string
```

The password can be obtained from an Android device using an app like [aLogcat](https://play.google.com/store/apps/details?id=rs.pedjaapps.alogcatroot.app&hl=en) or the `adb logcat` command for phones in developer mode. Look for a line like:

```text
E LedoBleSDK: login =skName=======[Smart Light]=======skPw==[password]
```

The password is the text between the square brackets following `skPw`.
