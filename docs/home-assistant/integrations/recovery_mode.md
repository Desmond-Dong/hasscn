---
title: Recovery mode
description: 允许 Home Assistant 在恢复模式下启动。
ha_category: []
ha_release: 0.105
ha_codeowners:
  - '@home-assistant/core'
ha_domain: recovery_mode
ha_quality_scale: internal
ha_integration_type: system
related:
  - docs: /docs/troubleshooting_general/
    title: General troubleshooting
---

**Recovery mode** 集成是 Home Assistant Core 使用的内部集成。

您无需配置它，因为当 Home Assistant 需要时，它会自动可用。

如果 Home Assistant 在启动期间读取配置时遇到问题，它仍会继续启动，并使用上一次成功启动时的部分配置。

发生这种情况时，Home Assistant 会借助此集成以 **Recovery mode** 启动。在此模式下，不会加载用户配置的集成，但您仍可访问 Home Assistant 的前端、设置和应用。

这样，您就可以修复问题并重新启动 Home Assistant 以再次尝试。
