---
title: HomeSeer
description: 使用 Z-Wave 集成连接和控制您的 HomeSeer Z-Wave 设备
ha_release: '2023.4'
ha_iot_class: Local Push
ha_category:
  - Binary sensor
  - Light
  - Sensor
  - Switch
ha_domain: homeseer
ha_integration_type: brand
works_with:
  - zwave
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_iot_standard: zwave
ha_brand: true
---

[HomeSeer](https://homeseer.com/) 凭借其 Z-Wave 产品加入了 Works with Home Assistant 合作伙伴计划。虽然 HomeSeer 也提供自有家庭自动化软件，但他们仍致力于确保其产品保持更新，并可在 Home Assistant 中直接使用。

HomeSeer 产品均通过 Z-Wave Plus 认证。其墙壁开关和调光器提供额外状态 LED，可用于提示家中事件，并支持双击动作来触发自动化和场景。其水阀在检测到漏水时会切断水流并通知您。

HomeSeer Z-Wave 设备可在本地运行，并可与 Home Assistant 的 Z-Wave 集成无缝配合（需要 Z-Wave 棒）。由于通信完全在本地进行，设备状态更新和控制在 Home Assistant 中会立即生效。

### 固件更新

HomeSeer 会定期发布包含新增功能的固件，这些固件可通过加密 OTA（空中升级）流程发送到设备。在 Home Assistant 中，您可以前往设备页面，使用“更新设备固件”选项上传适用于该设备的 HomeSeer 固件。

[![Open **Add device** in your Home Assistant instance.](https://my.home-assistant.io/badges/add_zwave_device.svg)](https://my.home-assistant.io/redirect/add_zwave_device/?brand=homeseer)

[了解 Home Assistant 中的 Z-Wave。](/home-assistant/integrations/zwave_js/)
