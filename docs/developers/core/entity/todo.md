---
title: 待办事项列表实体
description: '待办事项列表实体是表示待办事项列表的实体。待办事项列表包含 已订购并具有状态（已完成或正在进行）的待办事项。待办事项列表实体源自homeassistant.components.todo.TodoListEntity(https://github.com/home-assistant/core/blob/de。'
sidebar_label: 待办事项清单
---
# 待办事项列表实体

待办事项列表实体是表示待办事项列表的实体。待办事项列表包含
已订购并具有状态（已完成或正在进行）的待办事项。待办事项列表实体源自[`homeassistant.components.todo.TodoListEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/todo/__init__.py)。

## 特性

:::tip
属性应该只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----- | ------------- | --------------------- | ------------------------------------------------------- |
| todo_items | <code>list[TodoItem] &#124; None</code> | `None` | **必需的。** 待办事项列表的有序内容。 |

### 状态

`TodoListEntity` 状态是待办事项列表中不完整项目的计数。

## 支持的功能

支持的功能通过使用 `TodoListEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| -------------------------- | ------------------------------------------------------------------ |
| `CREATE_TODO_ITEM` | 实体实现允许创建待办事项的方法。 |
| `DELETE_TODO_ITEM` | 实体实现允许删除待办事项的方法。 |
| `UPDATE_TODO_ITEM` | 实体实现允许更新待办事项的方法。 |
| `MOVE_TODO_ITEM` | 实体实现重新排序待办事项的方法。 |
| `SET_DUE_DATE_ON_ITEM` | 实体实现在创建或更新待办事项时将项目的 `due` 字段设置为 `datetime.date`。 |
| `SET_DUE_DATETIME_ON_ITEM` | 实体实现在创建或更新待办事项时将项目的 `due` 字段设置为 `datetime.datetime`。 |
| `SET_DESCRIPTION_ON_ITEM` | 实体实现在创建或更新待办事项时设置项目的 `description` 字段。 |

## 方法

### 创建待办事项

待办事项列表实体可以通过指定 `CREATE_TODO_ITEM` 支持创建待办事项
支持的功能。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_create_todo_item(self, item: TodoItem) -> None:
        """Add an item to the To-do list."""
```

### 删除待办事项

待办事项列表实体可以通过指定 `DELETE_TODO_ITEM` 支持删除待办事项
支持的功能。集成必须支持删除多个项目。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        """Delete an item from the to-do list."""
```

### 更新待办事项

待办事项列表实体可以通过指定 `UPDATE_TODO_ITEM` 支持更新待办事项
支持的功能。 `TodoItem` 字段 `uid` 始终存在并指示
哪个项目应该更新。传递给更新的项目是原始项目的副本
字段已更新或清除的项目。

```python
from homeassistant.components.todo import TodoListEntity

class MyTodoListEntity(TodoListEntity):

    async def async_update_todo_item(self, item: TodoItem) -> None:
        """Add an item to the To-do list."""
```

### 移动待办事项

待办事项列表实体可以通过指定来支持对列表中的待办事项重新排序
`MOVE_TODO_ITEM` 支持的功能。指定`uid`的待办事项
应移至列表中由 `previous_uid` 指定的位置之后的位置（`None` 表示移至第一个
待办事项列表中的位置）。

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

## 待办事项

`TodoItem` 代表待办事项列表中的单个项目。方法
上面描述了创建或创建时哪些字段是可选的任何差异
更新。

| 名称 | 类型 | 默认值 | 说明 |
| ----------- | ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| uid | <code>string &#124; None</code> | `None` | 待办事项的唯一标识符。更新和实体状态需要此字段。
| summary | <code>string &#124; None</code> | `None` | 待办事项的标题或摘要。该字段对于实体状态是必需的。
| status | <code>TodoItemStatus &#124; None</code> | `None` | 定义待办事项的总体状态，`NEEDS_ACTION` 或 `COMPLETE`。该字段对于实体状态是必需的。
| due | <code>datetime.date &#124; datetime.datetime &#124; None</code> | `None` | 待办事项预计完成的日期和时间。作为日期时间，必须有时区。
| description | <code>string &#124; None</code> | `None` | 对待办事项的描述比摘要提供的更完整。
| completed | <code>datetime.datetime &#124; None</code> | `None` | 指示该项目最后被标记为 `COMPLETE` 的时间的时间戳。