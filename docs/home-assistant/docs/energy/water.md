---
title: 集成您的用水量
description: 'Home Assistant 允许您在家庭能源管理中跟踪您的用水量。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 集成您的用水量

Home Assistant 允许您在家庭能源管理中跟踪您的用水量。

虽然用水量严格来说不是"能源"，但它仍然是一种值得跟踪和监控的宝贵资源，因为它通常与能源消耗（如燃气）紧密相关。此外，通过减少用水量，它可以帮助您减少生态足迹。

### 家庭水表

有多种方法可以测量您家中的用水量。读取用水量的方法多种多样。较旧的水表通常只有一个普通箭头或仅显示总消耗量。对于这些水表，您可能需要一个带有 ESP32 摄像头的 [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device)。虽然有效，但这种解决方案设置起来可能比较繁琐，因为它倾向于 DIY 方式。

较新的水表配备了旋转盘，可以通过两种方法读取。第一种方法使用光传感器，而第二种方法采用接近传感器。接近传感器检测磁场的变化，磁盘每旋转一圈代表使用了一升水。而光传感器方法基于自相关技术，精度可达 100 毫升，而不是传统的一升级别。

对于大多数水表，旋转编码器盘配合光传感器版本就足够了。但是，一些较旧或特殊的水表可能需要使用接近传感器代替。

Home Assistant 还内置了集成功能，可以与现有产品连接。

## Home Assistant 集成

Home Assistant 需要知道消耗的水量才能跟踪使用情况。有多种[水表计量（流体流量传感器设备）](https://en.wikipedia.org/wiki/Water_metering)硬件选项可以做到这一点。根据您的设置，所需的硬件可能由您的公共供水公司提供，或者您可能需要自行购买。

一些带有水表的硬件还可能提供额外的实用功能或传感器，例如[阀门](/home-assistant/integrations/valve)，用于控制水阀开关，或温度和压力（用于启用冻结报警）。

我们有以下集成可用于提供用水信息的现有产品：

- [Droplet](/home-assistant/integrations/droplet)
- [Flo](/home-assistant/integrations/flo)
- [Flume](/home-assistant/integrations/flume)
- [HomeWizard Energy](/home-assistant/integrations/homewizard)
- [StreamLabs](/home-assistant/integrations/streamlabswater)
- [Suez Water](/home-assistant/integrations/suez_water)
- [Watergate](/home-assistant/integrations/watergate)

还有一些基于现有通用 IoT 协议标准的用水监控产品：

- [Z-Wave](/home-assistant/integrations/zwave_js)
- [Zigbee](/home-assistant/integrations/zha)
- [Matter](/home-assistant/integrations/Matter)

## 单个用水设备

与跟踪单个能源设备类似，Home Assistant 支持跟踪单个设备的用水量。此功能允许您监控家中特定电器或装置的用水量，例如洗衣机、洗碗机或单个水龙头。

您可以通过将一个设备设置为另一个设备的"上游设备"来创建用水设备的层级结构。这可以防止重复计算，例如当您有一个主水表和单独的设备水表时。有关设置设备层级结构和防止重复计算的更多详细信息，请参阅[单个设备文档](/home-assistant/docs/energy/individual-devices/)。

## 社区制作的传感器

如果您的水表没有旋转盘、磁盘或线圈，还有其他解决方案可以无缝地将水监控集成到您的智能家居设置中：

- [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) 是一个运行在 ESP32-CAM 上的项目，可以使用 MQTT 的 Home Assistant 发现功能完全集成到 Home Assistant 中。它将您的燃气/水/电表显示数字化，并以多种方式提供其数据。![AI-on-the-edge-device 工作流程照片](/home-assistant/images/docs/energy/ai-on-the-edge-device.jpg)

如果您有 Culligan 软水机，您可能可以通过内置的 `DEBUG PORT` 接口接收用水统计数据，包括 `加仑`（gal）、`每分钟加仑数`（gal/min）和 `再生所需加仑数`（gal）：

- [cullAssistant](https://github.com/LelandSindt/cullAssistant) (ESPHome)

或者，以下商店销售基于 ESPHome 的设备，使用三相光传感器检测水表中的旋转盘，并将其转换为以毫升 (ml) 为单位的用水量：
- [Muino water meter reader](https://watermeter.muino.nl/) (ESPHome)

或者，以下商店销售基于 ESPHome 的设备，使用接近传感器检测水表中的旋转磁铁，并使用该脉冲计算每升用水量：
- [S0tool](https://s0tool.nl/) ("Made for ESPHome" 认证)
- [Waterlezer dongle](https://smart-stuff.nl/product/esphome-waterlezer-dongle/) (荷兰语)
- [Slimme Watermeter Gateway](https://smartgateways.nl/product/slimme-watermeter-gateway/) (荷兰语)
- [watermeterkit.nl](https://watermeterkit.nl/) (荷兰语)

## DIY

也许您想自己制作一个？
- Pieter Brinkman 有一篇[不错的博客文章，介绍如何使用 ESPHome 创建自己的水传感器](https://www.pieterbrinkman.com/2022/02/02/build-a-cheap-water-usage-sensor-using-esphome-home-assistant-and-a-proximity-sensor/)，或者[制作一个与 P1 Monitor 集成](/home-assistant/integrations/p1_monitor)配合使用的水表](https://www.ztatz.nl/p1-monitor-watermeter/)。
- [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) 是一个运行在 ESP32-CAM 上的项目，可以使用 MQTT 的 Home Assistant 发现功能完全集成到 Home Assistant 中。它将您的燃气/水/电表显示数字化，并以多种方式提供其数据。![AI-on-the-edge-device 工作流程照片](/home-assistant/images/docs/energy/ai-on-the-edge-device.jpg)
- [watermeter](https://github.com/nohn/watermeter) 在任何支持 Docker 的系统上运行经典 OCR 和统计模式识别
- [Muino water meter reader 3-phase](https://muino.nl/product/3-phase-muino-light-sensor-encoder/) 使用三相传感器技术，使用此传感器可以制作电池供电版本。
- [使用磁力计读取水表](https://github.com/tronikos/esphome-magnetometer-water-gas-meter)，使用 [QMC5883L](https://esphome.io/components/sensor/qmc5883l/) 或 [HMC5883L](https://esphome.io/components/sensor/hmc5883l/)，这是常见且价格低廉的磁力计。这应该与 Flume 水传感器兼容的所有水表兼容，在美国约 95% 的水表都[兼容](https://help.flumewater.com/articles/1618594)。
- 一些水表使用 [Wireless M-Bus](https://en.wikipedia.org/wiki/Meter-Bus) 进行远程计量。[wmbusmeters 项目](https://github.com/wmbusmeters/wmbusmeters/) 可以自动捕获、解码、解密并将 M-Bus 数据包转换为 MQTT。它支持多种 M-Bus 接收器，包括使用 [rtl-wmbus 库](https://github.com/xaelsouth/rtl-wmbus) 的 RTL-SDR。您还可以构建基于 WMBus [ESPHome 的接收器](https://github.com/SzczepanLeon/esphome-components)。Home Assistant 有一个[应用](https://github.com/wmbusmeters/wmbusmeters-ha-addon)可简化安装和配置。有关更多信息，请参阅[社区页面](https://community.home-assistant.io/t/add-on-request-wmbusmeter/228988)。
- 使用 RADIAN 协议通过 433 MHz 从 Itron EverBlu Cyble Enhanced RF 水表读取水（或燃气）用量数据 [everblu-meters-esp8266/esp32](https://github.com/genestealer/everblu-meters-esp8266-improved)，通过 ESP32/ESP8266 和 CC1101 收发器。在英国和欧洲广泛使用。通过 MQTT AutoDiscovery 与 Home Assistant 完全集成。根据现有文档，此方法也可能适用于 AnyQuest Cyble Enhanced、EverBlu Cyble 和 AnyQuest Cyble Basic，但这些尚未经过测试。

如果您手动集成传感器，例如使用 [MQTT](/home-assistant/integrations/MQTT) 或 [RESTful](/home-assistant/integrations/rest) 集成：请确保为这些传感器设置并提供 `device_class`、`state_class` 和 `unit_of_measurement`。

对于上述任何选项，请确保在购买之前它确实适用于您拥有的水表类型。

### 通过 RTL-SDR 无线读取水表

在美国和加拿大，许多电表、燃气表和水表使用 [AMR（自动抄表）](https://en.wikipedia.org/wiki/Automatic_meter_reading)或 [ERT（编码器接收器发射器）](https://en.wikipedia.org/wiki/Encoder_receiver_transmitter)协议无线广播其读数。您可以使用廉价的 [RTL-SDR](https://en.wikipedia.org/wiki/RTL-SDR) USB 加密狗接收这些广播，并使用 [rtlamr](https://github.com/bemasher/rtlamr)（这些协议的开源接收器）进行解码。

社区项目 [rtlamr2mqtt](https://github.com/allangood/rtlamr2mqtt) 将其打包成一个 Home Assistant 插件，通过 MQTT 发现自动发布您的仪表读数，使其在 Home Assistant 中可用，而无需与仪表进行任何物理连接。

这种方法适用于美国和加拿大公用事业公司普遍部署的许多 Itron、Badger 和其他 AMR 兼容水表，但兼容性因水表型号和地区而异，有些水表使用加密。请查看 [rtlamr wiki](https://github.com/bemasher/rtlamr/wiki/Compatible-Meters) 以确认您的特定水表类型是否受支持。
