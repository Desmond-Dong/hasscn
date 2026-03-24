---
title: Oral-B
description: 有关如何将 Oral-B 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.11
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@Lash-L'
ha_domain: oralb
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---


将 [Oral-B](https://oralb.com/) 设备集成到 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用并正常运行 [Bluetooth](/home-assistant/integrations/bluetooth) 集成后，Oral-B 集成会自动发现设备。

该集成可以发现大多数支持蓝牙的 Oral-B 电动牙刷。未在下方列为受支持的牙刷可能无法被正确识别，或会缺少某些模式。

## 支持的设备

- [IO Series 4](https://oralb.com/en-us/products/electric-toothbrushes/io-series-4-rechargeable-electric-toothbrush-blue/)
- [IO Series 6](https://oralb.com/en-us/products/electric-toothbrushes/io-series-6-electric-toothbrush-gray-opal/)
- [IO Series 7](https://oralb.com/en-us/products/electric-toothbrushes/io-series-7-electric-toothbrush-sapphire-blue/)
- [IO Series 8](https://oralb.com/en-us/products/electric-toothbrushes/io-series-8-electric-toothbrush-black-onyx/)
- [IO Series 9](https://oralb.com/en-us/products/electric-toothbrushes/io-series-9-rechargeable-electric-toothbrush-in-rose-quartz/)
- [Smart Series 4000](https://www.service.oralb.com/us/en/products/3754/)
- [Smart Series 6000](https://www.service.oralb.com/us/en/products/3754/)
- [Smart Series 7000](https://oralb.com/en-us/products/electric-toothbrushes/smart-7000-rechargeable-electric-toothbrush/)
- [Genius Series 8000](https://oralb.com/en-us/products/electric-toothbrushes/genius-8000-rechargeable-electric-toothbrush-pink/)
- [Genius Series 9000](https://www.service.oralb.com/us/en/products/3765/)
- [Genius Series 10000](https://www.service.oralb.com/us/en/products/3765/)
- [Triumph V2](https://www.service.oralb.com/us/en/products/3745/)
- [Genius X](https://www.service.oralb.com/us/en/products/3771/)

## 传感器

- 模式 - 当前选择的清洁模式，例如每日清洁。
- 分区数量 - 在移动应用的刷牙偏好设置中 **Set Pacer Visualisation** 所设置的刷牙区域数量。
- 分区 - 当前所在的刷牙目标分区（例如，如果刷牙目标为 2:00 分钟，而当前进度为 0:37，则处于第 2 分区）。
- 时间 - 总刷牙时长，单位为秒。
- 牙刷状态 - 牙刷当前是运行中还是空闲。
- 电池 - 牙刷电池百分比。

:::important
电池传感器的更新需要主动蓝牙连接，并且设备之间距离较近。如果您使用<a href="/home-assistant/integrations/bluetooth/#remote-adapters-bluetooth-proxies/" target="_blank">蓝牙代理</a>，请确保它支持主动连接。其他所有传感器都可以通过主动或被动连接更新。

:::
