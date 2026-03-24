---
title: Digital Loggers
description: 使用 Belkin WeMo 集成连接和控制您的 Digital Loggers 设备
ha_category:
  - Binary sensor
  - Fan
  - Hub
  - Light
  - Switch
ha_domain: digital_loggers
ha_integration_type: virtual
ha_supporting_domain: wemo
ha_supporting_integration: Belkin WeMo
ha_release: pre 0.7
ha_codeowners:
  - '@esev'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - fan
  - light
  - sensor
  - switch
ha_iot_class: Local Push
ha_homekit: true
ha_ssdp: true
---

:::note
此集成由 [Belkin WeMo](/home-assistant/integrations/wemo/) 集成支持。
:::

目前唯一经过测试并确认可正常工作的型号是 Pro Switch。

受支持的 Digital Loggers 型号会模拟 WeMo 协议，但此功能默认不会自动启用。
要启用它，请找到设备的 IP 地址并登录管理界面。选择 **External APIs**，勾选允许 CoAP 的选项，然后提交。
