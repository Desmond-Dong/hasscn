---
title: Keenetic NDMS2 Router
description: 关于如何将 Keenetic NDMS2 路由器集成到 Home Assistant 的说明。
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.54
ha_codeowners:
  - '@foxel'
ha_domain: keenetic_ndms2
ha_platforms:
  - binary_sensor
  - device_tracker
ha_config_flow: true
ha_ssdp: true
ha_integration_type: device
---

此集成通过检查连接到运行 NDMS 2.05 及以上固件版本的 [Keenetic](https://keenetic.net/) 路由器的设备来提供存在检测功能。它使用 telnet 连接，因此请确保路由器未禁用 telnet。

## 配置

要将 Keenetic 路由器添加到您的安装中，请在 UI 中前往 **Settings** > **Devices & services**，选择 `+` 按钮，然后在集成列表中选择 **Keenetic NDMS2 Router**。
