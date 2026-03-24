---
title: Mobile App
description: 移动应用集成为 Home Assistant 移动应用提供通用接入平台。
ha_category:
  - Other
ha_release: 0.89
ha_config_flow: true
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: mobile_app
ha_iot_class: Local Push
ha_platforms:
  - binary_sensor
  - device_tracker
  - notify
  - sensor
ha_integration_type: device
---

**Mobile App** 集成让 Home Assistant 移动应用能够轻松接入 Home Assistant。

如果您打算使用可与 Home Assistant 集成的移动应用，我们建议您保持此集成处于启用状态。

如果您是移动应用开发者，请参阅[开发者文档](https://developers.home-assistant.io/docs/api/native-app-integration/)，了解如何基于移动应用组件构建您的应用。

## 配置

除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/)，否则此集成默认处于启用状态。如果确实如此，下面的示例展示了如何手动启用此集成：

```yaml
# Example configuration.yaml entry
mobile_app:
```

## 使用 Mobile App 的应用

- [Home Assistant for iOS](https://apps.apple.com/app/id1099568401)（官方）
  - [测试版](https://testflight.apple.com/join/1AlPbnLZ)（Testflight）
- [Home Assistant for Android](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android)（官方）
  - [测试版](https://play.google.com/apps/testing/io.homeassistant.companion.android)

## Mobile App 文档

- [Companion 文档](https://companion.home-assistant.io/)
