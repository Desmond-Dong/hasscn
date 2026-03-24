---
title: Jandy iAqualink
description: 关于如何配置 Jandy iAqualink 集成的说明。
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@flz'
ha_domain: iaqualink
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
ha_integration_type: hub
---

[Jandy](https://www.jandy.com/) 的 [iAqualink](https://www.iaqualink.com/) 可让您随时随地控制泳池。

Home Assistant 目前支持以下设备类型：

- Binary sensor
- Climate
- Light
- Sensor
- Switch


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 已知限制

- 该平台仅支持单个泳池。
- 目前仅支持泳池系统。

## 集成调试

如果您在使用 iAqualink 或此集成时遇到问题，可以启用调试日志。

```yaml
logger:
  default: info
  logs:
    iaqualink: debug
    homeassistant.components.iaqualink: debug
```
