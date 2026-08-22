---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "新 sensor state class：total_increasing"
---

新增了一个新的 state class：`total_increasing`。此外，`last_reset` 属性已从 `SensorEntity` 中移除。推动这些变更的驱动力是使其更容易与设备（如公用事业表）集成。

### 状态类别

有 2 个定义的 state classes：

- `measurement`，state 表示当前时间的测量值，例如温度、电功率、股票投资组合的价值等。对于受支持的 sensors，每小时更新每小时 min、max 和平均 sensor 读数的统计，或自首次添加以来 sensor 值的累计增长或下降统计。
- `total_increasing`，单调递增的总计值，例如消耗的燃气、水或能量量。支持时，每小时更新自首次添加以来 sensor 值的累计增长。

#### `STATE_CLASS_TOTAL_INCREASING`

对于 state_class 为 `STATE_CLASS_TOTAL_INCREASING` 的 sensors，递减的值被解释为新表计周期的开始或表的更换。重要的是，integration 必须确保在从存在测量噪声的 sensor 计算值时，值不会错误地递减。此 state class 适用于燃气表、电表、水表等。

sensor 首次添加到 Home Assistant 时的 state 用作初始零点。检测到新表计周期时，零点将被设置为 0。请参考下表了解这对统计的影响。

`STATE_CLASS_TOTAL_INCREASING` 带有新表计周期的示例：

| t                      | state  | sum  |
| :--------------------- | -----: | ---: |
|   2021-08-01T13:00:00  |  1000  |   0  |
|   2021-08-01T14:00:00  |  1010  |  10  |
|   2021-08-01T15:00:00  |     0  |  10  |
|   2021-08-01T16:00:00  |     5  |  15  |

`STATE_CLASS_TOTAL_INCREASING` 在新表计周期开始时初始 state 不为 0，但使用 0 作为零点的示例：

| t                      | state  | sum  |
| :--------------------- | -----: | ---: |
|   2021-08-01T13:00:00  |  1000  |   0  |
|   2021-08-01T14:00:00  |  1010  |  10  |
|   2021-08-01T15:00:00  |     5  |  15  |
|   2021-08-01T16:00:00  |    10  |  20  |

此 state class 以前由 state class `measurement` 与 `last_reset` 值组合表示。这种方法已被弃用，将被解释为具有自动 last reset 的 `total_increasing` state class。