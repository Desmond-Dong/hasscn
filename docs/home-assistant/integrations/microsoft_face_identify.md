---
title: Microsoft Face Identify
description: 'Microsoft Face Identify 集成允许您通过 Home Assistant 使用 Microsoft Face identify(https://azure.microsoft.com/products/cognitive-services/) API。'
ha_category:
  - Image processing
ha_iot_class: Cloud Push
ha_release: 0.37
ha_domain: microsoft_face_identify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Microsoft Face Identify

**Microsoft Face Identify** 集成允许您通过 Home Assistant 使用 [Microsoft Face identify](https://azure.microsoft.com/products/cognitive-services/) API。该平台可让您识别摄像头画面中的人物，并触发带有属性的事件。

有关如何设置 API 密钥，请参阅 [Microsoft Face 集成](/home-assistant/integrations/microsoft_face/) 的配置说明。

如需在自动化规则中使用结果，请参阅 [Image Processing 集成](/home-assistant/integrations/image_processing/) 页面。

:::important
Microsoft Face identify API 的免费版本会限制每月可发起的请求数量。因此，强烈建议您在设置此实体实例时限制 `scan_interval`，具体说明请参阅 [Image Processing 集成](/home-assistant/integrations/image_processing/) 主页面。

:::
### 配置

要启用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: microsoft_face_identify
    group: family
    source:
      - entity_id: camera.door
```

```yaml
group:
  description: 用于识别人物的 Microsoft Face 分组。
  required: true
  type: string
confidence:
  description: 由 Home Assistant 处理所需的最小置信度百分比。
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
      description: 此参数允许您覆盖 `image_processing` 实体的名称。
      required: false
      type: string
```
