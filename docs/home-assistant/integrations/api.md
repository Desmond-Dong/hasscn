---
title: Home Assistant API
description: 关于如何在 Home Assistant 中设置 RESTful API 的说明。
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: api
ha_integration_type: system
---

**Home Assistant API** 集成公开一个 RESTful API，并允许与无头运行的 Home Assistant 实例进行交互。此集成依赖于 [HTTP 集成](/home-assistant/integrations/http/)。

```yaml
# 示例 configuration.yaml 条目
api:
```

有关使用 API 的详细信息，请参阅"开发者"部分中的 [REST API](/home-assistant/developers/rest_api/)。