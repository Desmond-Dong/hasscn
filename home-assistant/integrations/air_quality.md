# Air quality

**Air quality** integration 允许其他集成处理关于空气质量和污染详情的信息。它由提供 `air_quality` 传感器的集成使用 - 您可以在 `health` [集成](/home-assistant/integrations/index.md#health)下找到这些集成。

平台涵盖以下级别（如果可用）：

* 颗粒物 0.1（<= 0.1 μm）级别。
* 颗粒物 2.5（<= 2.5 μm）级别。
* 颗粒物 10（<= 10 μm）级别。
* 空气质量指数 (AQI)。
* O3（臭氧）级别。
* CO（一氧化碳）级别。
* CO2（二氧化碳）级别。
* SO2（二氧化硫）级别。
* N2O（一氧化二氮）级别。
* NO（一氧化氮）级别。
* NO2（二氧化氮）级别。

:::note Building block integration
This air quality is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this air quality building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the air quality building block offers.
:::

## 空气质量实体的状态

空气质量实体的状态表示空气中直径为 2.5 微米或更小的颗粒物的浓度。状态是一个数字。数字后跟测量单位（微克每立方米："µg/m³"）。例如，*PM2.5: 4 µg/m³*。在此示例中，状态为 4。

此外，实体可以有以下状态：

* **不可用**：实体当前不可用。
* **未知**：状态尚不清楚。
