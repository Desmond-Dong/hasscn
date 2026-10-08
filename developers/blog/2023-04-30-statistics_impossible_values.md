此变更影响 WebSocket API：`recorder/statistic_during_period` 和 `recorder/statistics_during_period`。Home Assistant 项目目前不记录这些 API，因为它们可能会变更。

对于 Home Assistant Core 2023.6，statistics WebSocket API 将不再返回已确定将为空的列。调用方应将缺少值视为与 null 值相同。

为减少数据库开销，如果 statistics backend 提前知道某列的所有行都将为空值，则不再返回该列。
