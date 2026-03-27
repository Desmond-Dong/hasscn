---
title: Elgato Avea
description: 'Elgato Avea(https://www.evehome.com/en/news/elgato-avea-transform-your-home) 是一款制造商不再支持的蓝牙灯泡。avea 集成允许您使用 Home Assistant 控制所有 Avea 灯泡。'
ha_category:
  - Light
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@pattyland'
ha_domain: avea
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Elgato Avea

[Elgato Avea](https://www.evehome.com/en/news/elgato-avea-transform-your-home) 是一款制造商不再支持的蓝牙灯泡。`avea` 集成允许您使用 Home Assistant 控制所有 Avea 灯泡。

## 配置

要启用 Avea，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: avea
```