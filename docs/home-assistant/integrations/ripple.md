---
title: Ripple
description: 有关如何将ripple.com 数据集成到Home Assistant 中的说明。
ha_category:
  - Finance
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_domain: ripple
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Ripple** 集成会显示来自 [Ripple.com](https://ripple.com) 的 Ripple 钱包余额。

要将 Ripple 集成添加到您的安装中，请在 "`configuration.yaml`" 文件中指定要监视的 Ripple 地址。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: ripple
    address: "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV"
```

```yaml
address:
  description: 要监视的 Ripple 钱包地址。
  required: true
  type: string
name:
  description: 传感器在前端中使用的名称。
  required: false
  type: string
  default: Ripple 余额
```
