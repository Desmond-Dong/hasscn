---
title: Yeelight Sunflower
description: 关于如何在 Home Assistant 中设置 Yeelight Sunflower 网关和灯泡的说明。
ha_category:
  - Light
ha_release: 0.39
ha_iot_class: Local Polling
ha_codeowners:
  - '@lindsaymarkward'
ha_domain: yeelightsunflower
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Yeelight Sunflower** 集成可让您使用 Home Assistant 控制 Yeelight Sunflower 灯泡。

:::note
“Yeelight Sunflower” 灯泡与 “Yeelight WiFi” 灯泡并不相同。

:::
要启用这些灯，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
light:
  - platform: yeelightsunflower
    host: 192.168.1.59
```

```yaml
host:
  description: Yeelight Sunflower 集线器的 IP 地址。
  required: true
  type: string
```

:::note
加载集线器后，您的灯会显示为设备，实体名称中会包含其 Zigbee ID。

:::
