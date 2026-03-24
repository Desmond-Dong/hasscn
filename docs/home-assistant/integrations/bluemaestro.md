---
title: BlueMaestro
description: 关于如何将 BlueMaestro 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: bluemaestro
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

将 [BlueMaestro](https://www.sigmawit.com/) 设备集成到 Home Assistant。

## 支持的设备

- Tempo Disc THD
- Tempo Disc THPD

一旦启用了 [Bluetooth](/home-assistant/integrations/bluetooth) 集成并正常运行，**BlueMaestro** 集成将自动发现设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
