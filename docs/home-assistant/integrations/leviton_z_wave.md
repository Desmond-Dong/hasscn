---
title: Leviton Z-Wave
description: 'Leviton(https://leviton.com) 凭借其 Z-Wave 产品加入了 Works with Home Assistant 合作伙伴计划。Leviton 致力于确保其产品保持最新状态，并可在 Home Assistant 中直接使用。'
featured: true
ha_release: '2021.2'
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/z-wave'
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Fan
  - Hub
  - Humidifier
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Update
ha_domain: leviton_z_wave
ha_integration_type: integration
works_with:
  - zwave
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - fan
  - humidifier
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_iot_standard: zwave
---
# Leviton Z-Wave

[Leviton](https://leviton.com) 凭借其 Z-Wave 产品加入了 Works with Home Assistant 合作伙伴计划。Leviton 致力于确保其产品保持最新状态，并可在 Home Assistant 中直接使用。[Leviton Z-Wave 产品](https://www.amazon.com/Leviton) 让您能够轻松实现照明自动化，支持的产品包括 DZ6HD 调光器、DZ15S 开关、ZW4SF 风扇速度控制器、DZPD3 插入式调光器、DZPA1 插入式开关，以及 ZW15R 插座。

Leviton Z-Wave 设备可在本地运行，并与 Home Assistant 中的 Z-Wave 集成无缝配合使用（需要 Z-Wave USB 控制器）。由于所有连接都在本地完成，状态更新和设备控制都会立即在 Home Assistant 中生效。每个接入电源的设备还会充当 Z-Wave 路由器，以扩展您的 Z-Wave 网状网络。

[![Open **Add device** in your Home Assistant instance.](https://my.home-assistant.io/badges/add_zwave_device.svg)](https://my.home-assistant.io/redirect/add_zwave_device/?domain=leviton_z_wave)
<br><br>
要了解更多信息，请参阅 [Z-Wave 集成](/home-assistant/integrations/zwave_js)页面。

### 固件更新

Leviton 正在努力提供可公开下载的固件更新。在 Home Assistant 中，您可以进入设备页面，并使用 **Update Device Firmware** 选项上传适用于您设备的 Leviton 固件。
