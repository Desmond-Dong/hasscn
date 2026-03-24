---
title: Home Assistant iOS
description: 关于如何将 iOS 伴侣应用与 Home Assistant 配合使用的说明。
ha_category:
  - Hub
ha_release: 0.31
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@robbiet480'
ha_domain: ios
ha_platforms:
  - notify
  - sensor
ha_integration_type: integration
---

The **Home Assistant iOS** integration is used by the Home Assistant Companion App for iOS to store and provide settings for [actionable notifications](https://companion.home-assistant.io/docs/notifications/actionable-notifications) and [actions](https://companion.home-assistant.io/docs/core/actions). Both of these can also be configured for a single device within the app, in which case the `ios` integration is not required.

For further details please check the [Companion App Documentation Site](https://companion.home-assistant.io).
