---
title: 整合您的燃气使用情况
description: 了解如何将燃气使用信息添加到 Home Assistant 家庭能源管理中。
---

部分家庭使用燃气。燃气被用于加热水、烹饪和供暖。

Home Assistant 允许您追踪燃气使用情况，并轻松地与同一时段的能源使用情况进行比较。

## 硬件

Home Assistant 需要知道燃气的消耗量。

### 连接到您的燃气表

获取这些数据的最佳方式是直接从您家中与管网相连的燃气表获取。在某些国家，这些燃气表具有标准化的本地读取方式，或通过电表提供这些信息。

#### 通过 P1 端口连接

P1 端口是荷兰、比利时和卢森堡电表上的标准化端口，也提供燃气消耗信息。P1 读取器可以连接到此端口并接收实时信息。

我们与创作者 [Marcel Zuidwijk](https://www.zuidwijk.com) 合作开发了 [SlimmeLezer+](https://www.zuidwijk.com/product/slimmelezer-plus/)。这是一款由 [ESPHome](https://esphome.io) 驱动的经济型 P1 读取器，可将这些信息无缝集成到 Home Assistant 中。该产品在 [他的网站](https://www.zuidwijk.com/product/slimmelezer-plus/) 上出售，固件在 [GitHub](https://github.com/zuidwijk/dsmr) 上开源。

![连接到智能电表的 SlimmeLezer 照片](/home-assistant/images/docs/energy/slimmelezer.jpg)

#### 使用 AI-on-the-edge-device 读取燃气表

[AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) 是一个运行在 ESP32-CAM 上的项目，可以通过 MQTT 的 Home Assistant 自动发现功能完全集成到 Home Assistant 中。它将您的燃气、水表和电表显示数字化，并以多种方式提供数据。

![AI-on-the-edge-device 工作流程照片](/home-assistant/images/docs/energy/ai-on-the-edge-device.jpg)

#### 使用磁力计读取燃气表

[膜式/风箱式燃气表](https://en.wikipedia.org/wiki/Gas_meter#Diaphragm/bellows_meters) 是最常见的燃气表类型，几乎在所有住宅安装中都能看到，其运动通常可以通过磁力计观察到。[QMC5883L](https://esphome.io/components/sensor/qmc5883l/) 和 [HMC5883L](https://esphome.io/components/sensor/hmc5883l/) 是 ESPHome 支持的常见且经济的选择。[GitHub 上的这个水气表项目](https://github.com/tronikos/esphome-magnetometer-water-gas-meter) 让使用和校准这些磁力计变得简单。

#### 通过 RTL-SDR 无线读取燃气表

在美国和加拿大，许多电表、燃气表和水表使用 [AMR（自动抄表）](https://en.wikipedia.org/wiki/Automatic_meter_reading) 或 [ERT（编码器接收器发射器）](https://en.wikipedia.org/wiki/Encoder_receiver_transmitter) 协议无线广播其读数。您可以使用经济实惠的 [RTL-SDR](https://en.wikipedia.org/wiki/RTL-SDR) USB 接收器接收这些广播，并使用 [rtlamr](https://github.com/bemasher/rtlamr)（这些协议的开源接收器）进行解码。

社区项目 [rtlamr2mqtt](https://github.com/allangood/rtlamr2mqtt) 将其打包成 Home Assistant 附加组件，可自动通过 MQTT 发现发布您的仪表读数，无需对仪表进行任何物理连接即可在 Home Assistant 中使用。

这种方法适用于许多美国和加拿大公用事业公司普遍部署的 Itron、Badger 和其他 AMR 兼容仪表，但兼容性因仪表型号和地区而异，某些仪表使用加密。请查看 [rtlamr wiki](https://github.com/bemasher/rtlamr/wiki/Compatible-Meters) 以确认您的特定仪表类型是否受支持。
