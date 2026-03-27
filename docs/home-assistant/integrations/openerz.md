---
title: Open ERZ
description: 'Open ERZ integration 使用 OpenERZ(http://openerz.metaodi.ch/) API 访问苏黎世废弃物处理与回收机构 Entsorgung und Recycling Zürich (ERZ) 的数据。它会报告指定邮编和垃圾类型的下一次收运日期。'

ha_category:
  - Sensor
ha_release: 0.109
ha_iot_class: Cloud Polling
ha_domain: openerz
ha_codeowners:
  - '@misialq'
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Open ERZ

**Open ERZ** integration 使用 [OpenERZ](http://openerz.metaodi.ch/) API 访问苏黎世废弃物处理与回收机构 Entsorgung und Recycling Zürich (ERZ) 的数据。它会报告指定邮编和垃圾类型的下一次收运日期。

## 配置

要在您的安装中启用此 integration，请将以下内容添加到您的 `configuration.yaml` 文件中。
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# `configuration.yaml` 配置示例
sensor:
  - platform: openerz
    zip: 8001
    waste_type: cardboard
```

可用且已经过测试的垃圾类型包括：`paper`、`cardboard`、`waste`、`cargotram`、`etram`、`organic` 和 `textile`。

```yaml
name:
  description: 显示此传感器时使用的名称。
  required: false
  type: string
zip:
  description: 收运地点的邮政编码。
  required: true
  type: string
waste_type:
  description: 要收集的垃圾类型。
  required: true
  type: string
  default: waste
```
