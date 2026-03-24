---
title: Everything but the Kitchen Sink
description: 关于如何设置"包罗万象"集成的说明
ha_category:
  - Other
ha_release: 2023.2
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: kitchen_sink
ha_iot_class: Calculated
ha_platforms:
  - button
  - image
  - lawn_mower
  - lock
  - notify
  - sensor
  - switch
  - weather
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Kitchen Sink** integration contains demonstrations of various odds and ends.

This sets up a demo environment of features which are obscure or which represent incorrect behavior, and are thus not wanted in the `demo` integration.

To enable the `kitchen_sink` integration in Home Assistant, add the following section to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry

kitchen_sink:
```
