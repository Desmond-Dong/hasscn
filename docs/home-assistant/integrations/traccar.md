---
title: Traccar Client
description: 'Traccar uses GPS for tracking and has support for over 1500 different types of devices. You can use the Traccar Client(https://www.traccar.org/client/)。'
ha_release: 0.83
ha_category:
  - Car
  - Presence detection
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@ludeeus'
ha_domain: traccar
ha_platforms:
  - device_tracker
ha_integration_type: integration
---
# Traccar Client

`Traccar` uses GPS for tracking and has support for over 1500 different types of devices. You can use the [Traccar Client](https://www.traccar.org/client/) app on a smartphone via `webhook`.

:::tip
Looking for documentation on how to communicate with a Traccar Server? See the [Traccar Server](/home-assistant/integrations/traccar_server/) integration documentation.

:::
To configure Traccar Client, you must set it up via the integrations panel in the configuration screen. This will give you the webhook URL to use during mobile device configuration. This URL has to be set in the Traccar app.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
