---
title: Number
description: "有关如何使用 Home Assistant 管理您的 Number 实体的说明。"

ha_category:
  - Number
ha_release: 2020.12
ha_quality_scale: internal
ha_domain: number
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---
跟踪环境中的“数量”实体及其状态，并允许您控制它们。此集成允许其他集成从用户获取一定范围内的值输入。

:::note Building block integration
This number is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this number building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the number building block offers.
:::

如果您正在寻找创建数字实体的方法，请查看[数字助手](/home-assistant/integrations/input_number)。

## 数字实体的状态

数字实体的状态是数字。

此外，实体可以具有以下状态：

- **不可用**：该实体当前不可用。
- **未知**：状态未知。

## Device class

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/). For example, different states may be represented by different icons, colors, or text.

号码支持以下设备类别：

- **无**：通用编号。这是默认的，不需要设置。
- **absolute_humidity**：绝对湿度，单位为 g/m3、mg/m3。
- **视在功率**：视在功率，单位为 mVA、VA 或 kVA。
- **aqi**：空气质量指数（无单位）。
- **面积**：面积（m²、cm²、km²、mm²、in²、ft²、yd²、mi²、ac、ha）
- **atmospheric_Pressure**：大气压力，单位为 cbar、bar、hPa、mmHg、inHg、kPa、mbar、Pa 或 psi
- **电池**：剩余电量百分比（%）
- **blood_glucose_concentration**：血糖浓度，单位为 mg/dL、mmol/L
- **二氧化碳**：二氧化碳 (CO2) 浓度（以 ppm 为单位）
- **一氧化碳**：一氧化碳 (CO) 浓度，单位为 ppb、ppm、μg/m3、mg/m3
- **电流**：电流，单位为 A、mA
- **data_rate**：数据速率，单位为 bit/s、kbit/s、Mbit/s、Gbit/s、B/s、kB/s、MB/s、GB/s、KiB/s、MiB/s 或 GiB/s
- **data_size**：数据大小（以位、kbit、Mbit、Gbit、B、kB、MB、GB、TB、PB、EB、ZB、YB、KiB、MiB、GiB、TiB、PiB、EiB、ZiB 或 YiB 为单位）
- **距离**：通用距离，单位为 km、m、cm、mm、mi、nmi、yd 或 in
- **持续时间**：持续时间，单位为 d、h、min、s、ms 或 µs
- **能量**：能量单位为 J、kJ、MJ、GJ、mWh、Wh、kWh、MWh、GWh、TWh、cal、kcal、Mcal 或 Gcal
- **energy_distance**：单位距离的能量，单位为 kWh/100km、Wh/km、mi/kWh 或 km/kWh。
- **energy_storage**：存储的能量，单位为 J、kJ、MJ、GJ、mWh、Wh、kWh、MWh、GWh、TWh、cal、kcal、Mcal 或 Gcal
- **频率**：频率，单位为 Hz、kHz、MHz 或 GHz
- **气体**：气体体积，单位为 L、m³、ft³、CCF 或 MCF
- **湿度**：空气中的湿度百分比（%）
- **照度**：当前光照水平（lx）
- **辐照度**：辐照度，单位为 W/m² 或 BTU/(h⋅ft²)
- **水分**：物质中水的百分比（%）
- **货币**：货币价值（[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)）
- **二氧化氮**：二氧化氮浓度，单位为 ppb、ppm、μg/m3
- **一氧化氮**：一氧化氮浓度（ppb），μg/m3
- **一氧化二氮**：一氧化二氮的浓度，单位为 µg/m³
- **臭氧**：臭氧浓度，单位为 ppb、ppm 或 µg/m3
- **ph**：水溶液的潜在氢 (pH) 值
- **pm1**：小于 1 微米的颗粒物浓度，单位为 µg/m3
- **pm25**：小于 2.5 微米的颗粒物浓度（μg/m3）
- **pm4**：小于 4 微米的颗粒物浓度，单位为 µg/m3
- **pm10**：小于 10 微米的颗粒物浓度（μg/m3）
- **power_factor**：功率因数（无单位），单位可以是“无”或%
- **功率**：功率单位为 mW、W、kW、MW、GW 或 TW
- **降水量**：累计降水量，单位为厘米、英寸或毫米
- **降水强度**：降水强度，单位为 in/d、in/h、mm/d 或 mm/h
- **压力**：压力单位为 mPa、Pa、hPa、kPa、bar、cbar、mbar、mmHg、inHg、inH2O 或 psi
- **reactive_energy**：无功电能（以 varh 或 kvarh 为单位）
- **reactive_power**：无功功率，单位为 mvar、var 或 kvar
- **signal_strength**：信号强度（以 dB 或 dBm 为单位）
- **声压**：声压（以 dB 或 dBA 为单位）
- **速度**：通用速度，单位为 ft/s、in/d、in/h、in/s、km/h、kn、m/s、mph、mm/d 或 mm/s
- **二氧化硫**：二氧化硫浓度（ppb），μg/m3
- **温度**：温度，单位为 °C、°F 或 K
- **温度_增量**：代表两个值之间的差异的温度，单位为 °C、°F 或 K
- **挥发性有机化合物**：挥发性有机化合物的浓度，单位为 µg/m3 或 mg/m3
- **挥发性有机化合物部分**：挥发性有机化合物的比率（以 ppm 或 ppb 为单位）
- **电压**：电压单位为 V、mV、μV、kV、MV
- **体积**：通用体积，单位为 L、mL、gal、fl。盎司、立方米、立方英尺、CCF 或 MCF
- **体积流量**：体积流量，单位为 m3/h、m3/min、m3/s、ft3/min、L/h、L/min、L/s、gal/d、gal/h、gal/min 或 mL/s
- **volume_storage**：通用存储体积，单位为 L、mL、gal、fl。盎司、立方米、立方英尺、CCF 或 MCF
- **水**：用水量，单位为 L、gal、m³、ft³、CCF 或 MCF
- **重量**：通用质量，单位为 kg、g、mg、μg、oz、lb 或 st
- **wind_direction**：风向（°）
- **wind_speed**：波弗特的风速，ft/s、km/h、kn、m/s 或 mph

## Actions

### Action: Set value

`number.set_value` 操作设置特定数字实体的值。

| Data attribute | Optional | Description                                 |
| -------------- | -------- | ------------------------------------------- |
| `entity_id`    | yes      | Only act on specific number entities. |
| `area_id`      | yes      | Only act on number entities in specific areas. |
| `value`        | no       | The value to set. |
