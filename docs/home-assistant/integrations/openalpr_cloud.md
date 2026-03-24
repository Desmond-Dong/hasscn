---
title: OpenALPR Cloud
description: "有关如何将车牌与 OpenALPR 云集成到 Home Assistant 的说明。"

ha_category:
  - Image processing
ha_iot_class: Cloud Push
ha_release: 0.36
ha_domain: openalpr_cloud
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[OpenALPR](https://www.openalpr.com/) integration 让 Home Assistant 可以处理来自摄像头的车牌信息。您可以基于识别到的车牌打开车库门，或触发其他[自动化](/home-assistant/integrations/automation/)。

为了在自动化规则中使用结果，
查看[集成](/home-assistant/integrations/image_processing/) 页面。

## 配置

要启用 OpenALPR integration，请将其添加到您的 `configuration.yaml` 文件中。
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes.

```yaml
# `configuration.yaml` 配置示例
image_processing:
 - platform: openalpr_cloud
   api_key: YOUR_API_KEY
   region: eu
   source:
    - entity_id: CAMERA.GARAGE
```

```yaml
region:
  description: 国家或地区。支持的取值请参阅[此列表](https://github.com/openalpr/openalpr/tree/master/runtime_data/config)。
  required: true
  type: string
api_key:
  description: 您需要从 [OpenALPR Cloud](https://cloud.openalpr.com/) 获取 API 密钥。
  required: true
  type: string
confidence:
  description: 由 Home Assistant 处理结果所需的最小置信度百分比。
  required: false
  type: integer
  default: 80
source:
  description: 图像来源列表。
  required: true
  type: list
  keys:
    entity_id:
      description: 用于获取图片的摄像头实体 ID。
      required: true
      type: string
    name:
      description: 此参数允许您覆盖 OpenALPR 实体的名称。
      required: false
      type: string
```
