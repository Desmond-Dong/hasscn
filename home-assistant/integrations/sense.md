# Sense

将您的 [Sense](https://sense.com) 电表信息集成到 Home Assistant 中。

Home Assistant 目前支持以下设备类型：

* Binary sensor
* Sensor

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

会同时为用电和发电创建传感器：

* 活跃传感器：每 60 秒更新一次。
  * Usage：当前有功功率消耗，单位为 W。
  * Production：当前有功发电功率，单位为 W。
* 趋势传感器：提供每日、每周、每月和每年的数据，每 5 分钟更新一次。
  * Usage：耗电量，单位为 kWh。
  * Production：发电量，单位为 kWh。
  * To Grid：回送到电网的电量，单位为 kWh。
  * From Grid：从电网导入的电量，单位为 kWh。
  * Net Production：衡量总太阳能发电量与用电量之间的关系。
  * Net Production Percentage：净发电量的百分比。
  * Solar Powered Percentage：直接由太阳能供电的用电占比。

系统会为 Sense 监测器检测到的每台设备创建二进制传感器，以显示其供电状态。

系统还会为 Sense 监测器检测到的每台设备创建传感器，以显示其功率消耗（单位为 W）。

:::note
[Emulated Kasa](/home-assistant/integrations/emulated_kasa.md) 集成可通过模拟 TP-Link Kasa 智能插座，将 Home Assistant 中的设备暴露给 Sense Monitor。

:::
