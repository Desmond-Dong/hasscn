---
title: Image upload
description: 图像上传集成处理 Home Assistant 中的图像资源。
ha_category:
  - Media source
  - Other
ha_release: 0.115
ha_codeowners:
  - '@home-assistant/core'
ha_domain: image_upload
ha_quality_scale: internal
ha_integration_type: system
---

**Image upload** 集成允许 Home Assistant 管理系统中的图像资源，例如系统账户的头像图片。

上传的图像也可以在媒体浏览器中查看。

## 配置

默认情况下，此集成已启用，除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/) 这一行。

如果确实如此，以下示例展示了如何手动启用此集成：

```yaml
# configuration.yaml 示例条目
image_upload:
```
