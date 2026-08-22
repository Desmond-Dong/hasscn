# DSMR Reader

**DSMR Reader** 集成允许您轻松添加 [DSMR Reader](https://dsmr-reader.readthedocs.io/en/latest/)（荷兰智能电表要求读取器）暴露给 MQTT 的所有传感器。它为 MQTT 主题中的每个字段添加一个单独的传感器，命名为 `sensor_dsmr_<mqtt_topic>`。

## 前提条件

要使用此 DSMR Reader 传感器集成，您需要运行一个 DSMR Reader 实例和一个 MQTT 代理来发送传感器数据。

1. 在 Home Assistant 中添加 MQTT 代理集成（如果尚未添加）
2. 在 DSMR Reader 应用程序中配置 MQTT 代理
3. 在 DSMR Reader 管理页面中启用以下数据源，使用默认映射：
   * 日消耗量：分割主题
   * 燃气消耗量：分割主题
   * 电表统计：分割主题
   * 一刻钟峰值消耗：分割主题
   * 电报：分割主题

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 配置能源仪表板

最建议不要使用"总计"和"每日"源。常规的"读数"传感器为 Home Assistant 提供最稳定的数据源。这些 MQTT 值是 DSMR Reader 中"电报：分割主题" MQTT 值的一部分，因此请确保启用它们。

| 部分          | 要配置的传感器                        |
| ---------------- | ------------------------------------------- |
| 电网消耗 | 低谷电用量、高峰电用量         |
| 返送电网   | 低谷电返送、高峰电返送   |
| 燃气消耗  | 燃气表用量                             |

## 与 DSMR 集成的区别

此集成依赖于现有的 DSMR Reader 应用程序设置。它处理由 MQTT 发布功能触发的事件，以在 Home Assistant 中创建传感器实体。此集成使用发布到 MQTT 代理的数据，无论应用程序如何或在哪里安装。相比之下，[DSMR](/home-assistant/integrations/dsmr/index.md) 集成直接在 Home Assistant 中连接到智能电表，不使用 DSMR Reader 应用程序。
