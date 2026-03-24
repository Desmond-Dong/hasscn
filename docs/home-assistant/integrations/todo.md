---
title: To-do list
description: 关于如何在 Home Assistant 中使用待办事项列表的说明。
ha_domain: todo
ha_release: 2023.11
ha_category:
  - To-do list
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/local_todo
    title: Local to-do list integration documentation
  - docs: /dashboards/todo-list/
    title: To-do list card
---

**To-do list** 集成为待办列表提供实体，使其他集成可以将待办列表接入 Home Assistant。待办列表会显示在 **To-do lists** 仪表板中，用于跟踪事项及其是否已完成。

:::note Building block integration
This to-do list is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this to-do list building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the to-do list building block offers.
:::

例如，[Local to-do](/home-assistant/integrations/local_todo/) 是一个完全本地化的集成，可在您的 Home Assistant 实例中创建待办列表和任务；[Shopping list](/home-assistant/integrations/shopping_list) 专门用于购物清单，并可通过 Assist 添加内容；其他集成则可与提供待办数据的在线服务配合使用。

## 查看和管理待办列表

每个待办列表在 Home Assistant 中都会表示为一个独立实体，并可在待办列表仪表板中查看和管理。您可以在 Home Assistant 实例主侧边栏中找到该仪表板。

## 待办列表实体的状态

待办列表实体的状态是一个数字，表示列表中未完成事项的数量。

<p class='img'>
<img src='/home-assistant/images/integrations/todo/state_todo.png' alt='Screenshot showing the state of a to-do list entity in the developer tools' />
在开发者工具中显示待办列表实体状态的截图。
</p>

此外，该实体还可以具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚未知晓。

## 向指定列表添加项目的蓝图

此蓝图允许您创建一个脚本，将项目添加到预先配置好的待办列表中。

[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fadd-to-do-item%2F699193)

## 操作

某些待办列表集成允许 Home Assistant 管理列表中的待办事项。下面介绍部分待办列表实体提供的操作；您也可以阅读更多关于 [actions](/home-assistant/docs/scripts/perform-actions/) 的说明。

### 操作：Get items

`todo.get_items` 操作用于从待办列表中获取待办事项。待办列表 `target` 通过 [target selector](/home-assistant/docs/blueprint/selectors/#target-selector) 选择。`data` 负载支持以下字段：

| 数据属性 | 可选 | 说明 | 示例 |
| -------------- | -------- | ----------------------------------------- | --------------------------- |
| `status`       | 是      | 仅返回具有此状态的待办事项。 | `needs_action`, `completed` |

以下是一个完整示例，用于返回所有尚未完成的待办事项：

```yaml
action: todo.get_items
target:
  entity_id: todo.vacation_preparation
data:
  status:
    - needs_action
```

以下是 `get_items` 操作的响应示例：

```yaml
todo.vacation_preparation:
  items:
    - summary: Water plants
      uid: 01244b28-e604-11ee-a0a4-e45f0197c057
      status: needs_action
    - summary: turn down heating
      uid: ae993df4-e604-11ee-a0a4-e45f0197c057
      status: needs_action
```

### 操作：Add item

`todo.add_item` 操作用于添加新的待办事项。待办列表 `target` 通过 [Target Selector](/home-assistant/docs/blueprint/selectors/#target-selector) 选择，`data` 负载支持以下字段：

| 数据属性 | 可选 | 说明 | 示例 |
| -------------- | -------- | ----------------------------------------------------------------- | ------------------------------------------------------------ |
| `item`         | 否       | 待办事项的名称/摘要。 | Submit income tax return |
| `due_date`     | 是      | 待办事项预期完成日期。 | 2024-04-10 |
| `due_datetime` | 是      | 待办事项预期完成的日期和时间。 | 2024-04-10 23:00:00 |
| `description`  | 是      | 比摘要更完整的说明。 | Collect all necessary documents and submit the final return. |

`due_date` 和 `due_datetime` 只能二选一。

以下是一个完整的 YAML 示例：

```yaml
action: todo.add_item
target:
  entity_id: todo.personal_tasks
data:
  item: "Submit Income Tax Return"
  due_date: "2024-04-10"
  description: "Collect all necessary documents and submit the final return."
```

### 操作：Update item

`todo.update_item` 操作用于更新待办事项。待办列表 `target` 通过 [Target Selector](/home-assistant/docs/blueprint/selectors/#target-selector) 选择，`data` 负载支持以下字段：

| 数据属性 | 可选 | 说明 | 示例 |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `item`         | 否       | 待办事项的名称/摘要。在某些情况下，例如存在同名事项时，使用 UID 可能更合适。要查找某项的 UID，请对待办列表执行一次 `get_items` 操作。 | `Submit income tax return` 或 `01244b28-e604-11ee-a0a4-e45f0197c057` |
| `rename`       | 是      | 待办事项的新名称。 | Something else |
| `status`       | 是      | 待办事项的整体状态。 | `needs_action` 或 `completed` |
| `due_date`     | 是      | 待办事项预期完成日期。 | 2024-04-10 |
| `due_datetime` | 是      | 待办事项预期完成的日期和时间。 | 2024-04-10 23:00:00 |
| `description`  | 是      | 比摘要更完整的说明。 | Collect all necessary documents and submit the final return. |

`rename` 和 `status` 至少要提供一个。`due_date` 和 `due_datetime` 只能二选一。以下是一个更新待办事项状态和名称的完整示例。

```yaml
action: todo.update_item
target:
  entity_id: todo.personal_tasks
data:
  item: "Submit income tax return"
  rename: "Something else"
  status: "completed"
```

### 操作：Remove item

`todo.remove_item` 操作用于删除待办事项。待办列表 `target` 通过 [Target Selector](/home-assistant/docs/blueprint/selectors/#target-selector) 选择，`data` 负载支持以下字段：

| 数据属性 | 可选 | 说明 | 示例 |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `item`         | 否       | 待办事项的名称/摘要。在某些情况下，例如存在同名事项时，使用 UID 可能更合适。要查找某项的 UID，请对待办列表执行一次 `get_items` 操作。 | `Submit income tax return` 或 `01244b28-e604-11ee-a0a4-e45f0197c057` |

以下是一个按指定名称删除待办事项的完整示例。

```yaml
action: todo.remove_item
target:
  entity_id: todo.personal_tasks
data:
  item: "Submit income tax return"
```

### 操作：Remove completed items

`todo.remove_completed_items` 操作用于删除所有已完成的待办事项。待办列表 `target` 通过 [Target Selector](/home-assistant/docs/blueprint/selectors/#target-selector) 选择。

以下是一个删除所有已完成待办事项的完整示例。

```yaml
action: todo.remove_completed_items
target:
  entity_id: todo.personal_tasks
```
