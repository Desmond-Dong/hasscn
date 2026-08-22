---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: 用于长期统计的新 sensor properties
---

Sensor entity 模型已更新，增加了两个新 properties：`state_class` 和 `last_reset`。引入这两个新 properties 的驱动力是启用自动生成长期统计。

### state_class

诸如 `DEVICE_CLASS_TEMPERATURE` 等 sensor device classes 用于表示差异巨大的数据类型，例如：

- 定期更新的温度测量
- 历史或统计数据，例如每日平均温度
- 未来数据，例如明天的预测

区分代表测量的 sensors 和不代表测量的 sensors 是必要的，以便自动合理地选择要包含在长期统计中的 sensors。

[`state_class`](https://developers.home-assistant.io/docs/core/entity/sensor#properties) property 对 state 的类型进行分类：state 可能是来自温度传感器或电能表的_当前时间测量值_，_历史值_（如过去 24 小时的平均温度或上个月使用的能量），或_预测值_（如天气预报或下一次垃圾收集时间表）。如果 `state_class="measurement"`，state 表示当前值，而不是历史聚合或未来预测。否则，`state_class=None`。有一个[架构讨论](https://github.com/home-assistant/architecture/discussions/557)，包含一些额外的背景信息。

请注意，上面提到的_当前时间测量值_并不意味着 state 必须以特定频率更新，也不意味着 sensor 不允许进行间接测量（如集成功率来计算能量）。换句话说，如果 sensor 表示最新观察值或时间序列中的最新数据点，它就符合 `state_class="measurement"`。

### last_reset

累积型 sensor（如电表、燃气表、水表等）初始化的时间。如果初始化时间未知且表永远不会重置，设置为 UNIX epoch 0：`homeassistant.util.dt.utc_from_timestamp(0)`。请注意，`last_reset` property 返回的 `datetime.datetime` 在更新 entity 的 state attributes 时将被转换为 ISO 8601 格式的字符串。更改 `last_reset` 时，`state` 必须是有效数字。