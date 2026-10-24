# Ambient Weather Station

**Ambient Weather Station** 集成通过 [Ambient Weather](https://ambientweather.net) 的个人气象站获取本地天气信息。

## 前提条件

使用此集成需要应用程序密钥和 API 密钥。要生成这两个密钥，只需使用 [您的 Ambient Weather 仪表板](https://dashboard.ambientweather.net) 的个人资料部分。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 本地 API 选项

此集成通过 Ambient Weather 云与 Ambient Weather PWS 设备通信。希望使用本地选项的用户可以使用 [`ecowitt2mqtt`](https://github.com/bachya/ecowitt2mqtt#input-data-formats) 的 `ambient_weather` 模式（支持 [MQTT 发现](/home-assistant/integrations/mqtt/index.md#mqtt-discovery)）。

另一个选择是探索 [Ecowitt](https://www.ecowitt.com) 系列设备，它们支持内置的 [Ecowitt](/home-assistant/integrations/ecowitt/index.md) 集成。
