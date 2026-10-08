# Lawn mower

**Lawn mower** 集成可让机器人割草机的控制能力在 Home Assistant 中体现出来。

:::note Building block integration
This lawn mower is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this lawn mower building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the lawn mower building block offers.
:::

## 割草机实体的状态

割草机实体可以具有以下状态：

* **Mowing**：割草机当前正在割草。
* **Docked**：割草机已完成割草，当前停靠在底座中。
* **Paused**：割草机之前处于活动状态，现在已暂停。
* **Returning**：割草机正在返回底座。
* **Error**：割草机在运行时遇到错误，需要人工协助。
* **Unavailable**：实体当前不可用。
* **Unknown**：当前状态尚未知晓。

## 操作

可用操作：`start_mowing`、`pause` 和 `dock`。

调用这些操作前，请先确认您的 lawn\_mower 平台支持它们。

### 操作：开始割草

`lawn_mower.start_mowing` 操作用于开始或恢复割草任务。

| 数据属性 | 可选 | 说明 |
| -------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`    | yes      | 仅作用于特定 lawn\_mower。使用 `entity_id: all` 可作用于全部。 |

### 操作：暂停

`lawn_mower.pause` 操作用于暂停割草任务。

| 数据属性 | 可选 | 说明 |
| -------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`    | yes      | 仅作用于特定 lawn\_mower。使用 `entity_id: all` 可作用于全部。 |

### 操作：返回底座

`lawn_mower.dock` 操作用于让割草机返回底座。

| 数据属性 | 可选 | 说明 |
| -------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`    | yes      | 仅作用于特定 lawn\_mower。使用 `entity_id: all` 可作用于全部。 |
