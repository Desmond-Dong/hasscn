---
title: Qingping
description: 有关如何将青平设备集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: qingping
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
---

此集成可将 [Qingping](https://qingping.co/) 设备接入 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用且正常运行 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，Qingping 集成会自动发现设备。

## 支持的设备

- [Air Monitor Lite](https://www.qingping.co/air-monitor-lite/overview) (CGDN1)
- [Alarm Clock](https://www.qingping.co/bluetooth-alarm-clock/overview) (CGD1)
- [BT Clock Lite](https://www.qingping.co/bluetooth-clock/overview) (CGC1)
- [Door/Window Sensor](https://www.qingping.co/door-window-sensor/overview) (CGH1)
- [LEE GUITARS Thermo-Hygrometer](https://www.qingping.co/lee-guitars-thermo-hygrometer/overview) (CGM1)
- [Motion & Ambient Light Sensor](https://www.qingping.co/motion-light-sensor/overview) (CGPR1)
- [Temp RH M](https://www.qingping.co/temp-rh-monitor/overview#mi) (CGG1)
- [Temp RH Pro E](https://www.qingping.co/temp-rh-monitor-pro-e/overview) (CGF1W)
- [CO2 Temp RH](https://www.qingping.co/co2-temp-rh-monitor/overview) (GCP22C)
