# Gree Climate

**Gree** 集成允许您在 Home Assistant 中控制 [Gree Smart HVAC](https://global.gree.com/)。

目前 Home Assistant 支持以下设备类型：

* [气候](#climate)
* [开关](#switch)

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::important
设备必须首先使用 Gree+ 应用程序或设备制造商提供的应用程序绑定到 WiFi。目前无法使用此集成将设备连接到 WiFi。

:::

## 支持的型号

任何使用 Gree+ 应用程序的格力智能设备都应该受到支持，包括一些非格力品牌的设备，例如以下厂商销售的一些设备：

* Trane
* Innova
* Cooper & Hunter
* Proklima
* Tadiran
* Heiwa
* Ekokai
* Lessar
* Tosot
* Wilfa

## 气候

`gree` 气候平台将格力 HVAC 系统集成到 Home Assistant 中，可以控制设置以下参数：

* [`set_hvac_mode`](/home-assistant/integrations/climate/index.md#action-climateset_hvac_mode)
* [`target temperature`](/home-assistant/integrations/climate.md#action-climateset_temperature)
* [`turn on/off`](/home-assistant/integrations/climate.md#action-climateturn_on)
* [`fan mode`](/home-assistant/integrations/climate.md#action-climateset_fan_mode)
* [`swing mode`](/home-assistant/integrations/climate.md#action-climateset_swing_mode)
* [`set_preset_mode`](/home-assistant/integrations/climate.md#action-climateset_preset_mode)

:::note
预设模式 **Away** 代表格力的"8°C 加热模式"。

:::

## 开关

格力设备公开多个开关来控制各种功能：

* **面板灯**：打开/关闭前面板灯。
* **安静模式**：启用/禁用安静模式功能。
* **Xtra fan**：启用/禁用额外风扇模式，帮助去除盘管上的水分。
