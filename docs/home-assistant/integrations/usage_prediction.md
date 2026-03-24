---
title: Usage Prediction
description: 关于如何为 Home Assistant 配置使用预测集成的说明。
ha_category:
  - History
ha_release: '2025.10'
ha_quality_scale: internal
ha_domain: usage_prediction
ha_iot_class: Calculated
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

**Usage Prediction** 集成是一个内部集成，用于预测用户最有可能与哪些实体交互。前端会利用这些预测结果向用户展示最相关的实体。

## Configuration

虽然此集成属于 [`default_config:`](/home-assistant/integrations/default_config/) 的一部分，用于启用默认体验中的相关功能，但它只会在您完成配置流程后，或手动将其添加到 `configuration.yaml` 文件后才会启用。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
usage_prediction:
```
