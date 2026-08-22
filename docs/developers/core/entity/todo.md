---
title: "待办事项实体"
sidebar_label: "待办事项"
---

待办事项实体（To-do list entity）是一种代表待办事项列表的实体。待办事项列表包含按顺序排列的待办事项（To-do items），每个事项有状态（完成或进行中）。待办事项实体派生自 [`homeassistant.components.todo.TodoListEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/todo/__init__.py)。

## 属性

:::tip
Properties 应只从内存中返回信息，不要执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称  | 类型          | 默认值               | 描述                                             |
| ----- | ------------- | --------------------- | ------------------------------------------------------- |
| todo_items | `list[TodoItem] \| None` | `None` | **必填。** 待办事项列表的有序内容。 |

### 状态

`TodoListEntity` 的 state 是待办事项列表中未完成事项的数量。

## 支持的功能

Supported features 通过使用 `TodoListEntityFeature` enum 中的值定义，并使用按位或（`|`）运算符组合。

| 值                      | 描述                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `CREATE_TODO_ITEM`         | 实体实现了允许创建待办事项的方法。  |
| `DELETE_TODO_ITEM`         | 实体实现了允许删除待办事项的方法。  |
| `UPDATE_TODO_ITEM`         | 实体实现了允许更新待办事项的方法。  |
| `MOVE_TODO_ITEM`           | 实体实现了允许重新排列待办事项的方法。  |
| `SET_DUE_DATE_ON_ITEM`     | 实体在创建或更新待办事项时，实现了将事项的 `due` 字段设置为 `datetime.date`。 |
| `SET_DUE_DATETIME_ON_ITEM` | 实体在创建或更新待办事项时，实现了将事项的 `due` 字段设置为 `datetime.datetime`。 |
| `SET_DESCRIPTION_ON_ITEM`  | 实体在创建或更新待办事项时，实现了设置事项的 `description` 字段。  |

## 方法

### 创建待办事项

待办事项实体可通过指定 `CREATE_TODO_ITEM` supported feature 来支持创建待办事项。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_create_todo_item(self, item: TodoItem) -> None:
        """Add an item to the To-do list."""
```

### 删除待办事项

待办事项实体可通过指定 `DELETE_TODO_ITEM` supported feature 来支持删除待办事项。集成必须支持删除多个事项。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        """Delete an item from the to-do list."""
```

### 更新待办事项

待办事项实体可通过指定 `UPDATE_TODO_ITEM` supported feature 来支持更新待办事项。`TodoItem` 字段 `uid` 始终存在，指示要更新哪个事项。传递的更新事项是原始事项的副本，部分字段已更新或清除。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_update_todo_item(self, item: TodoItem) -> None:
        """Add an item to the To-do list."""
```

### 移动待办事项

待办事项实体可通过指定 `MOVE_TODO_ITEM` supported feature 来支持在列表中重新排列待办事项。具有指定 `uid` 的待办事项应移动到列表中 `previous_uid` 指定事项之后（`None` 表示移动到列表第一位）。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_move_todo_item(
        self,
        uid: str,
        previous_uid: str | None = None
    ) -> None:
        """Move an item in the To-do list."""
```

## TodoItem

`TodoItem` 表示待办事项列表中的单个事项。上述方法描述了在创建或更新时哪些字段是可选的。

| 名称        | 类型             | 默认值      | 描述                                                                                                                                     |
| ----------- | ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| uid | `str \| None` | `None` | 待办事项的唯一标识符。此字段在更新和实体状态中必填。
| summary | `str \| None`  | `None` | 待办事项的标题或摘要。此字段在实体状态中必填。
| status | `TodoItemStatus \| None` | `None` | 定义待办事项的整体状态，为 `NEEDS_ACTION` 或 `COMPLETED`。此字段在实体状态中必填。
| due | `datetime.date \| datetime.datetime \| None` | `None` | 待办事项预计完成的日期和时间。作为 datetime 时，必须有时区。
| description | `str \| None`  | `None` | 比 summary 提供的更完整的待办事项描述。
| completed | `datetime.datetime \| None` | `None` | 指示此事项最后被标记为 `COMPLETED` 的时间戳。
