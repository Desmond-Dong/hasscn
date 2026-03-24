---
title: Orange and Rockland Utility (ORU)
description: 有关如何在 Home Assistant 中集成 Orange 和 Rockland Utility 实时能源使用传感器的说明。
ha_release: 0.101
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bvlaicu'
ha_domain: oru
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---


[Orange and Rockland Utility](https://oru.com) 是美国纽约州和新泽西州的一家能源供应商。

**ORU** 集成会从您的 ORU 智能电表中获取当前能源使用情况。

## 配置

要将 `oru` 集成添加到您的安装中，请将您的 `meter_number` 添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
sensor:
  - platform: oru
    meter_number: YOUR_METER_NUMBER
```

```yaml
meter_number:
  description: 您在 Orange and Rockland Utility 的智能电表编号。
  required: true
  type: string
```

`meter_number` 是智能电表编号。您可以在电费账单左上角、账户编号旁边找到它。
