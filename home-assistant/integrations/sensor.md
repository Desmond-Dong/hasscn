# Sensor

传感器是 Home Assistant 中的一项基础集成。它们用于监控各种实体的状态与条件。实体可以有很多种类型，例如：报告电量的运动传感器等物理设备、获取天气温度的 Web 服务、根据 GPS 位置计算太阳高度角的内置功能，甚至是你自定义的用于报告笔记本可用空间的传感器。它们本质上都是在上报不同类型信息的\_对象\_。

这些传感器中，有些是 Home Assistant 内置的，有些会在你添加集成时自动创建（参见此[列表](/home-assistant/integrations/index.md#sensor)），还有些需要手动创建。[Statistics](/home-assistant/integrations/statistics.md) 和 [Template](/home-assistant/integrations/template.md) 传感器就是后者的两个示例。

## 传感器实体的状态

传感器实体的状态是其当前检测到的值，可以是文本，也可以是数字。

<p class='img'>
<img src='/home-assistant/images/integrations/sensor/state_sensor.png' alt='Screenshot showing the state of a sensor entity in the developer tools' />
开发者工具中传感器实体状态的截图。
</p>

此外，实体还可能处于以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

## 设备类别

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/index.md). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/index.md). For example, different states may be represented by different icons, colors, or text.

下图展示了传感器不同设备类别对应的不同图标：

<p class='img'>
<img src='/home-assistant/images/screenshots/sensor_device_classes_icons.png' />
传感器多种设备类别图标示例。
</p>

传感器支持以下设备类别：

* **None**：通用传感器。这是默认值，无需设置。
* **absolute\_humidity**：绝对湿度，单位为 g/m³、mg/m³。
* **apparent\_power**：视在功率，单位为 mVA、VA 或 kVA。
* **aqi**：空气质量指数（无单位）。
* **area**：面积，单位为 m²、cm²、km²、mm²、in²、ft²、yd²、mi²、ac、ha。
* **atmospheric\_pressure**：大气压，单位为 cbar、bar、hPa、mmHg、inHg、kPa、mbar、Pa 或 psi。
* **battery**：剩余电池电量百分比（%）。
* **blood\_glucose\_concentration**：血糖浓度，单位为 mg/dL、mmol/L。
* **carbon\_dioxide**：二氧化碳（CO₂）浓度，单位为 ppm。
* **carbon\_monoxide**：一氧化碳（CO）浓度，单位为 ppb、ppm、µg/m³、mg/m³。
* **current**：电流，单位为 A、mA。
* **data\_rate**：数据速率，单位为 bit/s、kbit/s、Mbit/s、Gbit/s、B/s、kB/s、MB/s、GB/s、KiB/s、MiB/s 或 GiB/s。
* **data\_size**：数据大小，单位为 bit、kbit、Mbit、Gbit、B、kB、MB、GB、TB、PB、EB、ZB、YB、KiB、MiB、GiB、TiB、PiB、EiB、ZiB 或 YiB。
* **date**：日期字符串（ISO 8601）。
* **distance**：通用距离，单位为 km、m、cm、mm、mi、nmi、yd 或 in。
* **duration**：时长，单位为 d、h、min、s、ms 或 µs。
* **energy**：能量，单位为 J、kJ、MJ、GJ、mWh、Wh、kWh、MWh、GWh、TWh、cal、kcal、Mcal 或 Gcal。
* **energy\_distance**：单位距离能耗，单位为 kWh/100km、Wh/km、mi/kWh 或 km/kWh。
* **energy\_storage**：储存能量，单位为 J、kJ、MJ、GJ、mWh、Wh、kWh、MWh、GWh、TWh、cal、kcal、Mcal 或 Gcal。
* **enum**：拥有有限个（非数值）状态。
* **frequency**：频率，单位为 Hz、kHz、MHz 或 GHz。
* **gas**：燃气体积，单位为 L、m³、ft³、CCF 或 MCF。
* **humidity**：空气湿度百分比（%）。
* **illuminance**：当前照度，单位为 lx。
* **irradiance**：辐照度，单位为 W/m² 或 BTU/(h⋅ft²)。
* **moisture**：物质含水率百分比（%）。
* **monetary**：货币值（[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)）。
* **nitrogen\_dioxide**：二氧化氮浓度，单位为 ppb、ppm、µg/m³。
* **nitrogen\_monoxide**：一氧化氮浓度，单位为 ppb、µg/m³。
* **nitrous\_oxide**：氧化亚氮浓度，单位为 µg/m³。
* **ozone**：臭氧浓度，单位为 ppb、ppm 或 µg/m³。
* **ph**：水溶液酸碱度（pH）值。
* **pm1**：小于 1 微米颗粒物浓度，单位为 µg/m³。
* **pm25**：小于 2.5 微米颗粒物浓度，单位为 µg/m³。
* **pm4**：小于 4 微米颗粒物浓度，单位为 µg/m³。
* **pm10**：小于 10 微米颗粒物浓度，单位为 µg/m³。
* **power\_factor**：功率因数（无单位），单位可为 `None` 或 %。
* **power**：功率，单位为 mW、W、kW、MW、GW 或 TW。
* **precipitation**：累计降水量，单位为 cm、in 或 mm。
* **precipitation\_intensity**：降水强度，单位为 in/d、in/h、mm/d 或 mm/h。
* **pressure**：压力，单位为 mPa、Pa、hPa、kPa、bar、cbar、mbar、mmHg、inHg、inH₂O 或 psi。
* **reactive\_energy**：无功能量，单位为 varh 或 kvarh。
* **reactive\_power**：无功功率，单位为 mvar、var 或 kvar。
* **signal\_strength**：信号强度，单位为 dB 或 dBm。
* **sound\_pressure**：声压，单位为 dB 或 dBA。
* **speed**：通用速度，单位为 ft/s、in/d、in/h、in/s、km/h、kn、m/s、mph、mm/d 或 mm/s。
* **sulphur\_dioxide**：二氧化硫浓度，单位为 ppb 或 µg/m³。
* **temperature**：温度，单位为 °C、°F 或 K。
* **temperature\_delta**：两次测量间温差，单位为 °C、°F 或 K。
* **timestamp**：日期时间对象或时间戳字符串（ISO 8601）。
* **volatile\_organic\_compounds**：挥发性有机化合物浓度，单位为 µg/m³ 或 mg/m³。
* **volatile\_organic\_compounds\_parts**：挥发性有机化合物比例，单位为 ppm 或 ppb。
* **voltage**：电压，单位为 V、mV、µV、kV、MV。
* **volume**：通用体积，单位为 L、mL、gal、fl. oz.、m³、ft³、CCF 或 MCF。
* **volume\_flow\_rate**：体积流量，单位为 m³/h、m³/min、m³/s、ft³/min、L/h、L/min、L/s、gal/d、gal/h、gal/min 或 mL/s。
* **volume\_storage**：通用存储体积，单位为 L、mL、gal、fl. oz.、m³、ft³、CCF 或 MCF。
* **water**：用水量，单位为 L、gal、m³、ft³、CCF 或 MCF。
* **weight**：通用质量，单位为 kg、g、mg、µg、oz、lb 或 st。
* **wind\_direction**：风向，单位为 °。
* **wind\_speed**：风速，单位为 Beaufort、ft/s、km/h、kn、m/s 或 mph。
