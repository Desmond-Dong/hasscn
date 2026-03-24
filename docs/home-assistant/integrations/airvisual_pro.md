---
title: AirVisual Pro
description: 关于如何在 Home Assistant 中使用 AirVisual Pro 设备的说明。
ha_category:
  - Health
ha_release: 2023.1
ha_iot_class: Local Polling
ha_codeowners:
  - '@bachya'
ha_domain: airvisual_pro
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

**AirVisual Pro** 集成允许您从 [AirVisual Node/Pro 设备](https://www.iqair.com/air-quality-monitors/airvisual-pro) 获取数据。与设备的通信通过本地网络进行。

## 确定密码

您需要设备的 Samba 密码，该密码[可以在设备上找到](https://support.iqair.com/en/articles/3029331-download-the-airvisual-node-pro-s-data-using-samba)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器类型

AirVisual Pro 设备会创建多种传感器：

- 空气质量指数 (AQI)
- 电池电量
- 二氧化碳 (CO2)
- 湿度
- 颗粒物 (<= 0.1 μm) (PM0.1)
- 颗粒物 (<= 2.5 μm) (PM2.5)
- 颗粒物 (<= 10 μm) (PM10)
- 温度
- 挥发性有机化合物 (VOC)
