---
title: Tfiac
description: 有关如何将 Tfiac AC 设备与 Home Assistant 集成的说明。
ha_category:
  - Climate
ha_release: 0.91
ha_iot_class: Local Polling
ha_codeowners:
  - '@fredrike'
  - '@mellado'
ha_domain: tfiac
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Tfiac** integration integrates several vendors air conditioning systems, that uses the Tfiac mobile app, into Home Assistant. App currently available at [Play Store](https://play.google.com/store/apps/details?id=com.tcl.export) and [App Store](https://apps.apple.com/app/id1059938398).

## Configuration

To add your Tfiac integration into your Home Assistant installation, add the following to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Full manual example configuration.yaml entry
climate:
  - platform: tfiac
    host: IP_ADDRESS
```

```yaml
host:
  description: The IP address of your AC device.
  required: true
  type: string
```
