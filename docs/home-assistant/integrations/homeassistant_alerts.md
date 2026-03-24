---
title: Home Assistant Alerts
description: Home Assistant 警报会通知您 Home Assistant 团队发布的可能影响您系统的警报。
ha_release: 2022.8
ha_category:
  - Other
ha_codeowners:
  - '@home-assistant/core'
ha_domain: homeassistant_alerts
ha_integration_type: system
ha_quality_scale: internal
---

**Home Assistant Alerts** 集成会将 [Home Assistant Alerts](https://alerts.home-assistant.io) 网站接入您的 Home Assistant 实例。

此集成会拉取 Home Assistant 团队发布的警报；如果发现会影响您系统的警报，它会在 [Home Assistant Repairs](/home-assistant/integrations/repairs/) 仪表板中显示。

## Configuration

除非您在 "`configuration.yaml`" 文件中禁用或移除了 [`default_config:`](/home-assistant/integrations/default_config/) 这一行，否则此集成默认启用。
如果您移除了它，可以参考以下示例手动启用此集成：

```yaml
# configuration.yaml 示例条目
homeassistant_alerts:
```
