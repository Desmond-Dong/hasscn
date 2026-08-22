---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "新的 sensor state class：total"
---

注意：本文于 2021-10-21 进行了编辑，移除了对 total accumulated increases 和 decreases 的引用，这些内容已被移除且从未包含在 Home Assistant 2021.10 版本中。

新增了一个 state class `total`，并且 `last_reset` 属性已重新添加到 `SensorEntity` 中，不再被弃用。此次变更的目的是支持那些使用 `total_increasing`（在 Home Assistant 2021.9 中引入）过于受限无法覆盖的情况。注意，为 state class `measurement` 的 sensor 设置 `last_reset` 仍然被弃用。

### 状态类别

共有 3 个已定义的 state class：

- `measurement`，state 表示当前时间的测量值，例如温度、电功率等。对于受支持的 sensor，会定期更新最小值、最大值和平均值统计。
- `total`，state 表示一个既可增加又可减少的总量，例如净能量电表。当受支持时，会定期更新 sensor 自首次添加以来值的累积增长或下降。
- `total_increasing`，单调递增的总量，例如消耗的气体、水或能量的数量。当受支持时，会定期更新 sensor 自首次添加以来值的累积增长。

#### 状态类别 `total`

对于 state class 为 `total` 的 sensor，`last_reset` 属性可选择性地设置，以获取对 meter cycle 的手动控制。
Sensor 首次添加到 Home Assistant 时的 state 被用作初始零点。当 `last_reset` 发生变化时，零点将被设置为 0。
如果未设置 last_reset，则在计算 `sum` 统计时使用 sensor 首次添加时的值作为零点。

不设置 last_reset 的 state class `total` 示例：

| t                      | state  | sum    |
| :--------------------- | -----: | -----: |
|   2021-08-01T13:00:00  |  1000  |     0  |
|   2021-08-01T14:00:00  |  1010  |    10  |
|   2021-08-01T15:00:00  |     0  | -1000  |
|   2021-08-01T16:00:00  |     5  |  -995  |

设置 last_reset 的 state class `total` 示例：

| t                      | state  | last_reset          | sum    |
| :--------------------- | -----: | ------------------- | -----: |
|   2021-08-01T13:00:00  |  1000  | 2021-08-01T13:00:00 |     0  |
|   2021-08-01T14:00:00  |  1010  | 2021-08-01T13:00:00 |    10  |
|   2021-08-01T15:00:00  |  1005  | 2021-08-01T13:00:00 |     5  |
|   2021-08-01T16:00:00  |     0  | 2021-09-01T16:00:00 |     5  |
|   2021-08-01T17:00:00  |     5  | 2021-09-01T16:00:00 |    10  |

新 meter cycle 开始时初始 state 不是 0，但使用 0 作为零点的 state class `total` 示例：

| t                      | state  | last_reset          | sum    |
| :--------------------- | -----: | ------------------- | -----: |
|   2021-08-01T13:00:00  |  1000  | 2021-08-01T13:00:00 |     0  |
|   2021-08-01T14:00:00  |  1010  | 2021-08-01T13:00:00 |    10  |
|   2021-08-01T15:00:00  |  1005  | 2021-08-01T13:00:00 |     5  |
|   2021-08-01T16:00:00  |     5  | 2021-09-01T16:00:00 |    10  |
|   2021-08-01T17:00:00  |    10  | 2021-09-01T16:00:00 |    15  |

#### 状态类别 `total_increasing`

对于 state_class 为 `total_increasing` 的 sensor，减少的值被解释为新 meter cycle 的开始或 meter 的更换。集成必须确保当从含有 measurement noise 的 sensor 计算值时，值不会因误操作而减少。此 state class 适用于 gas meter、electricity meter、water meter 等。

Sensor 首次添加到 Home Assistant 时的 state 被用作初始零点。当检测到新的 meter cycle 时，零点将被设置为 0。
请参阅下方表格了解这对统计的影响。

具有新 meter cycle 的 state class `total_increasing` 示例：

| t                      | state  | sum  |
| :--------------------- | -----: | ---: |
|   2021-08-01T13:00:00  |  1000  |   0  |
|   2021-08-01T14:00:00  |  1010  |  10  |
|   2021-08-01T15:00:00  |     0  |  10  |
|   2021-08-01T16:00:00  |     5  |  15  |

新 meter cycle 开始时初始 state 不是 0，但使用 0 作为零点的 state class `total_increasing` 示例：

| t                      | state  | sum  |
| :--------------------- | -----: | ---: |
|   2021-08-01T13:00:00  |  1000  |   0  |
|   2021-08-01T14:00:00  |  1010  |  10  |
|   2021-08-01T15:00:00  |     5  |  15  |
|   2021-08-01T16:00:00  |    10  |  20  |
