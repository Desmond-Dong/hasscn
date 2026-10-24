# SmartTub

**SmartTub** 集成允许您在 Home Assistant 中查看和控制使用 [SmartTub](https://www.jacuzzi.com/en-us/hot-tubs/owners/smarttub-system) 系统的热水浴缸。

## 前提条件

* 配有 SmartTub 模块的热水浴缸
* SmartTub 账户（不支持注册流程，可使用 SmartTub 移动应用完成）

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

### 操作：设置主过滤循环

`smarttub.set_primary_filtration` 操作用于更新热水浴缸主过滤循环的设置。

| 数据属性 | 可选 | 说明 | 示例 |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | 否 | 要更新的实体。 | sensor.jacuzzi\_j\_335\_primary\_filtration\_cycle |
| `duration` | 否 | 主过滤循环期望持续的小时数。 | 4 |
| `start_hour` | 否 | 主过滤循环在一天中期望开始的小时。 | 2（即 02:00 或凌晨 2 点） |

### 操作：设置次过滤循环

`smarttub.set_secondary_filtration` 操作用于更新热水浴缸次过滤循环的设置。

| 数据属性 | 可选 | 说明 | 示例 |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | 否 | 要更新的实体。 | sensor.jacuzzi\_j\_335\_secondary\_filtration\_cycle |
| `mode` | 否 | 期望的次过滤模式。可为 `frequent`、`infrequent` 或 `away`。 | away |

### 操作：暂缓提醒

`smarttub.snooze_reminder` 操作用于临时抑制热水浴缸上的维护提醒。

| 数据属性 | 可选 | 说明 | 示例 |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | 否 | 要更新的实体。 | binary\_sensor.jacuzzi\_j\_335\_refresh\_water\_reminder |
| `days` | 否 | 提醒延后天数（最少 10 天）。 | 10 |

### 操作：重置提醒

`smarttub.reset_reminder` 操作用于重置热水浴缸上的维护提醒。

| 数据属性 | 可选 | 说明 | 示例 |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | 否 | 要更新的实体。 | binary\_sensor.jacuzzi\_j\_335\_refresh\_water\_reminder |
| `days` | 否 | 下次提醒应在多少天后触发（最少 30 天）。 | 180 |
