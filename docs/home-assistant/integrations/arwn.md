---
title: Ambient Radio Weather Network
description: 关于如何在 Home Assistant 中集成 ARWN 的说明。
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Local Polling
ha_domain: arwn
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Ambient Radio Weather Network** 集成是 [Ambient Radio Weather Network](https://github.com/sdague/arwn) 项目的客户端。它收集气象站数据并将其在 MQTT 子树中提供。

要使用您的 ARWN 设置，您必须已经配置了 [MQTT](/home-assistant/integrations/mqtt/) 平台。然后将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: arwn
```

目前将显示所有温度、气压计、湿度、雨水和风速传感器。