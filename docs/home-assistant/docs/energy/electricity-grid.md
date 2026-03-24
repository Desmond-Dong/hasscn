---
title: 集成您的电网
description: 了解如何将电网信息添加到 Home Assistant 家庭能源管理中。
---

能源管理就是要知道您消耗了多少能源、能源来自哪里以及去向何处。

几乎所有房屋都连接到电网，电网提供您家庭所需的能源。能源使用量由您的电表跟踪，并由您的能源供应商向您收费。能源价格可能根据时间表有所不同，或根据市场价格变化。

<img src='/home-assistant/images/docs/energy/grid.png' alt='显示能源从电网流向 Home Assistant 的示意图。' style='border: 0;box-shadow: none; display: block; max-height: 400px; margin: 0 auto;'>

## 费率

能源公用事业公司已流行起根据一天中的时间来划分能源价格；这样做是为了鼓励消费者将电力需求转移到电网负荷较低的时段。这些时间段通常被称为高峰和低谷。它们分别对应所有人都在消耗能源的时段（高峰）和能源充足但无人使用的时段（低谷）。因此，高峰能源比低谷能源更昂贵。

如果您想将能源使用量按多个费率拆分，[请阅读此处](/home-assistant/docs/energy/faq/#split-consumption-by-tariffs)。

## 硬件

Home Assistant 需要知道流经您电表的能源量。这些数据可以通过多种方式跟踪。

### 连接到您的电表

获取这些数据的最佳方式是直接从位于您房屋和电网之间的电表获取。在某些国家，这些电表包含本地读取信息的标准化方式。

#### 使用 P1 端口连接

P1 端口是荷兰、比利时和卢森堡的标准化端口。P1 读取器可以连接到此端口并接收实时信息。

我们与创作者 [Marcel Zuidwijk](https://www.zuidwijk.com) 合作开发了 [SlimmeLezer+](https://www.zuidwijk.com/product/slimmelezer-plus/)。这是一款由 [ESPHome](https://esphome.io) 驱动的经济型 P1 读取器，可将此信息无缝集成到 Home Assistant 中。它在他的[网站](https://www.zuidwijk.com/product/slimmelezer-plus/)上销售，固件在 [GitHub](https://github.com/zuidwijk/dsmr) 上开源。

![连接到智能电表的 SlimmeLezer 照片](/home-assistant/images/docs/energy/slimmelezer.jpg)

#### 通过 Zigbee Energy Profile 连接

Zigbee Energy Profile 是一种无线能源标准，用于提供有关电力使用的实时信息。该标准在美国、英国、加拿大和澳大利亚的某些电表中可用。这不是 Home Assistant 实现的"普通" Zigbee，而是需要特殊的认证硬件，并且通常需要由您的公用事业公司配置 Zigbee 连接。因此，假设您的公用事业公司支持此功能，他们将提供当前支持的硬件列表。

[Rainforest automation Eagle](/home-assistant/integrations/rainforest_eagle) 就是实现此功能的设备之一，它支持本地 API 并与 Home Assistant 兼容。

#### 通过脉冲计数器读取电表

许多电表，包括旧电表，都有一个 LED，每当能源通过时会闪烁。例如，每次闪烁代表 1/1000 kWh。通过监测闪烁之间的时间，可以确定能源消耗。

我们开发了 [Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow)，这是一个由 ESPHome 的 [pulse meter sensor](https://esphome.io/components/sensor/pulse_meter/)驱动的开源解决方案。您将它放在电表的活动 LED 上方，它就会把消耗数据带入 Home Assistant。

![连接到电表的 Home Assistant Glow 照片](/home-assistant/images/docs/energy/home-assistant-glow.jpg)

#### 通过 IEC62056-21 读取电表

IEC62056-21 不仅适用于电表的常见协议。它使用红外端口读取数据。
[Aquaticus](https://github.com/aquaticus) 创建了一个 [ESPHome 组件](https://community.home-assistant.io/t/555236)来读取这些数据。[PiggyMeter](https://aquaticus.info/meter.html) 是一个完整的项目，可以轻松安装。
![连接到电表的 PiggyMeter 照片](https://aquaticus.info/_images/meter_and_probe.png)

#### 使用 SML（Smart Message Language）接口

在德国等国家，通常使用 SML（智能消息语言）。ESPHome 的 [SML（Smart Message Language）](https://esphome.io/components/sml/)是集成它的一种方式。如果您更喜欢通过 MQTT 集成，[sml2mqtt](https://github.com/spacemanspiff2007/sml2mqtt) 是另一个开源选择。

#### 使用 AI-on-the-edge-device 读取电表

[AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) 是一个运行在 ESP32-CAM 上的项目，可以使用 MQTT 的 Home Assistant 发现功能完全集成到 Home Assistant 中。它将您的燃气/水/电表显示数字化，并以多种方式提供数据。

![AI-on-the-edge-device 工作流程照片](/home-assistant/images/docs/energy/ai-on-the-edge-device.jpg)

#### 通过 RTL-SDR 无线读取电表

在美国和加拿大，许多电力、燃气和水表使用 [AMR（自动抄表）](https://en.wikipedia.org/wiki/Automatic_meter_reading)或 [ERT（编码接收器发射器）](https://en.wikipedia.org/wiki/Encoder_receiver_transmitter)协议无线广播其读数。您可以使用廉价的 [RTL-SDR](https://en.wikipedia.org/wiki/RTL-SDR) USB 接收器接收这些广播，并使用 [rtlamr](https://github.com/bemasher/rtlamr)（这些协议的开源接收器）进行解码。

社区项目 [rtlamr2mqtt](https://github.com/allangood/rtlamr2mqtt) 将其打包成 Home Assistant 插件，可通过 MQTT 发现自动发布您的电表读数，使其在 Home Assistant 中可用，无需与电表进行任何物理连接。

这种方法适用于美国和加拿大公用事业公司普遍部署的许多 Itron、Badger 和其他兼容 AMR 的电表，但兼容性因电表型号和地区而异，某些电表使用加密。请查看 [rtlamr wiki](https://github.com/bemasher/rtlamr/wiki/Compatible-Meters) 以确认您的特定电表类型是否受支持。

### 使用 CT 钳形传感器

电流互感器（CT）钳形传感器通过观察流过电线的电流来测量您的能源使用量。这使得计算能源使用量成为可能。在 Home Assistant 中，我们支持现成的 CT 钳形传感器，或者您可以自己制作。

- 我们建议的现成解决方案是 [Shelly EM](https://www.shelly.com/products/shelly-em-50a-clamp-1?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq)。该设备具有本地 API，更新会推送到 Home Assistant，并且有高质量的[集成](/home-assistant/integrations/shelly/)。
- 您可以使用 ESPHome 的 [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp/)或能源表传感器（如 [ATM90E32](https://esphome.io/components/sensor/atm90e32/)）自己制作。对于 DIY 方式，请查看 [digiblur 的这个视频](https://www.youtube.com/watch?v=n2XZzciz0s4)开始入门。
- 使用树莓派，您可以使用 LeChacal 的 CT 钳形 HAT，称为 [RPICT hats](https://lechacal.com/docs/RPICT/Raspberrypi_Current_and_Temperature_Sensor_Adaptor/)。它们可以堆叠以扩展监控的线路数量。它们还为单相和三相安装提供有功、视在和无功功率以及功率因数。它们使用 MQTT 与 Home Assistant 集成。

_注意！安装 CT 钳形传感器设备需要打开您的配电柜。这项工作应由熟悉电气布线的人员完成，在某些地区可能需要持证专业人员。您的合格安装人员会知道如何操作。_

_免责声明：本节中的某些链接是附属链接。_

### 能源供应商提供的数据

某些能源供应商会为您提供有关使用情况的实时信息，并将这些数据集成到 Home Assistant 中。

### 手动集成

如果您手动集成传感器，例如使用 [MQTT](/home-assistant/integrations/MQTT) 或 [Template](/home-assistant/integrations/template) 集成：请确保为这些传感器设置并提供 `device_class`、`state_class` 和 `unit_of_measurement`。

### 故障排除

如果您无法在电网消耗下拉菜单中选择您的能源或功率传感器，请确保其值已记录在 Recorder 设置中。

[能源集成](/home-assistant/integrations/#energy)

_免责声明：本页面上的某些链接是附属链接，帮助支持 Home Assistant 项目。_
