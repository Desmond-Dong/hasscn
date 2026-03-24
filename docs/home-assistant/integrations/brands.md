---
title: Brands
description: 为集成和硬件提供品牌图像，如图标和标志。
ha_category:
  - Other
ha_release: 2026.3
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: brands
ha_integration_type: system
---

**Brands** 集成负责提供您在 Home Assistant 用户界面中看到的品牌图片，例如图标和标志。比如，集成卡片、更新实体，以及媒体浏览器项目中显示的图标，都是由此集成提供的。

品牌图片会从 Home Assistant brands 仓库获取，并缓存在本地磁盘上，因此即使您的网络连接暂时不可用，这些图片仍然可以继续使用。

此集成会由 Home Assistant 自动加载，无需任何配置。
