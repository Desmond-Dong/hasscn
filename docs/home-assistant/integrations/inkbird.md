---
title: INKBIRD
description: 关于如何将 INKBIRD 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: inkbird
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

将 [INKBIRD](https://www.inkbird.com/) 设备集成到 Home Assistant。

## 支持的设备

- [INKBIRD Bluetooth Thermometer IBS-TH1](https://inkbird.com/products/bluetooth-thermometer-ibs-th1)
- [INKBIRD Bluetooth Pool Thermometer IBS-P01B](https://inkbird.com/products/bluetooth-pool-thermometer-ibs-p01b)
- [INKBIRD Temperature and humidity Hygrometer IBS-TH2](https://inkbird.com/products/hygrometer-ibs-th2)
- [INKBIRD Bluetooth Smart Sensor ITH-12S](https://inkbird.com/products/bluetooth-smart-sensor-ith-12s)
- [INKBIRD Bluetooth BBQ Thermometer IBT-6XS](https://inkbird.com/products/bluetooth-bbq-thermometer-ibt-6xs)
- [INKBIRD Bluetooth Grill Thermometer IBT-4XS](https://inkbird.com/products/bluetooth-grill-thermometer-ibt-4xs)
- [INKBIRD Bluetooth Grill Thermometer IBT-2X](https://inkbird.com/products/bluetooth-grill-thermometer-ibt-2x)
- [INKBIRD Bluetooth Hygrometer Thermometer ITH-11-B](https://inkbird.com/products/bluetooth-hygrometer-thermometer-ith-11-b)
- [INKBIRD Bluetooth Hygrometer Thermometer ITH-13-B](https://inkbird.com/products/bluetooth-hygrometer-thermometer-ith-13-b)
- [INKBIRD Bluetooth Hygrometer Thermometer ITH-21-B](https://inkbird.com/products/bluetooth-hygrometer-thermometer-ith-21-b)
- [INKBIRD Bluetooth Wireless 4-in-1 Air Quality Monitor IAM-T1](https://inkbird.com/collections/air-quality-monitors/products/smart-indoor-air-quality-monitor-iam-t1)
- [INKBIRD Bluetooth 3-in-1 Indoor Air Quality Monitor IAM-T2](https://inkbird.com/products/bluetooth-3-in-1-indoor-air-quality-monitor-iam-t2)
- [Nutrichef Smart Wireless Grill Thermometer](https://nutrichefkitchen.com/products/pwirbbq40)
- [Nutrichef Smart Bluetooth BBQ Grill Thermometer](https://nutrichefkitchen.com/products/pwirbbq80-1)

虽然许多设备无需主动扫描也能更新，但某些实体（包括电池传感器）需要主动扫描。

## 发现

启用并正常运行 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，INKBIRD 集成会自动发现设备。

大多数设备需要主动扫描才能被发现。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 故障排除

IAM-T1 型号仅会定期上报温度单位，因此可能显示过期的温度读数。如果数值看起来已过期，请按下 **°C/°F** 按钮（位于外壳盖板下方）**两次** 以刷新数据。
