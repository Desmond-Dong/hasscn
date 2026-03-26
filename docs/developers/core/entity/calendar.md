---
title: 日历实体
sidebar_label: 日历
---

日历实体是表示一组具有开始时间的事件的实体
以及结束日期和/或时间，有助于自动化。日历实体源自[`homeassistant.components.calendar.CalendarEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/calendar/__init__.py)。

日历集成应与 rfc5545 兼容，并且可以选择支持遵循 rfc5546 中建立的模式创建事件。支持重复事件的集成负责处理重复事件的扩展，例如在将系列中的扩展事件集作为单独的单个事件返回的服务或 API 中。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----- | ------------- | --------------------- | ------------------------------------------------------- |
| event | <code>CalendarEvent &#124; None</code> | **Required** | 当前或下一个即将推出的 `CalendarEvent` 或 `None`。 |

### 状态

`CalendarEntity`状态类似于二进制传感器，反映是否存在
是一个活动事件：

| 常量 | 说明 |
| ----------- | ------------------------------------------- |
| `STATE_ON` | 日历有活动活动。 |
| `STATE_OFF` | 日历没有活动事件。 |


日历实体具有 `event` 属性，该属性返回当前
或下一个即将推出的 `CalendarEvent` 用于确定状态。日历
实体实现负责确定下一个即将发生的事件，
包括正确排序活动以及解释主页中的全天活动
助理时区。实体应调用 `homeassistant.util.dt.now` 来获取
当前时间，其 `tzinfo` 值设置为 HomeAssistant 时区或检查
`homeassistant.components.util.dt.DEFAULT_TIMEZONE`

## 支持的功能

支持的功能通过使用 `CalendarEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------------------- | ------------------------------------------------------------------ |
| `CREATE_EVENT` | 实体实现允许创建事件的方法。 |
| `DELETE_EVENT` | 实体实现允许删除事件的方法。 |
| `UPDATE_EVENT` | 实体实现允许更新事件的方法。 |

## 方法

### 获取事件

日历实体可以返回特定时间范围内发生的事件。给实施者的一些注意事项：

- `start_date` 是下限，适用于事件的 `end`（不包括）。它具有本地 Home Assistant 时区的 `tzinfo`。
- `end_date` 是上限并应用于事件的 `start`（不包括）。其 `tzinfo` 与 `start_date` 相同。
- 重复发生的事件应被展平并作为单独的 `CalendarEvent` 返回。

日历实体负责按顺序返回事件，包括正确的事件
订购全天活动。全天活动应安排在午夜开始
Home Assistant 时区（例如，来自开始/结束时间参数 `tzinfo`，
或使用 `homeassistant.util.dt.start_of_local_day`）。请注意，全天活动仍应
在 `CalendarEvent` 中设置 `datetime.date`，而不是带有时间的日期。

```python
import datetime
from homeassistant.core import HomeAssistant
from homeassistant.components.calendar import CalendarEntity

class MyCalendar(CalendarEntity):

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        """Return calendar events within a datetime range."""
```

### 创建事件

日历实体可以通过指定 `CREATE_EVENT` 支持的功能来支持创建事件。支持突变的集成必须处理 rfc5545 字段和最佳实践，例如保留设置的任何新未知字段和重复事件。

```python
from homeassistant.components.calendar import CalendarEntity

class MyCalendar(CalendarEntity):

    async def async_create_event(self, **kwargs: Any) -> None:
        """Add a new event to calendar."""
```

### 删除事件

日历实体可以通过指定 `DELETE_EVENT` 支持的功能来支持删除事件。支持突变的集成必须支持 rfc5545 重复事件。

可以通过三种方式删除重复事件：

- 仅指定 `uid` 将删除整个系列
- 指定 `uid` 和 `recurrence_id` 将删除系列中的特定事件实例
- 指定 `uid`、`recurrence_id` 和 `recurrence_range` 值可能会删除从 `recurrence_id` 开始的一系列事件。目前rfc5545允许`THISANDFUTURE`的[范围](https://www.rfc-editor.org/rfc/rfc5545#section-3.2.13)值。

```python
from homeassistant.components.calendar import CalendarEntity


class MyCalendar(CalendarEntity):

    async def async_delete_event(
        self,
        uid: str,
        recurrence_id: str | None = None,
        recurrence_range: str | None = None,
    ) -> None:
        """Delete an event on the calendar."""
```

### 更新事件

日历实体可以通过指定 `UPDATE_EVENT` 支持的功能来支持更新事件。支持突变的集成必须支持 rfc5545 重复事件。

可以通过三种方式更新重复事件：
- 仅指定 `uid` 将更新整个系列
- 指定 `uid` 和 `recurrence_id` 将更新系列中的特定事件实例
- 指定 `uid`、`recurrence_id` 和 `recurrence_range` 值可能会更新从 `recurrence_id` 开始的一系列事件。目前rfc5545允许`THISANDFUTURE`的[范围](https://www.rfc-editor.org/rfc/rfc5545#section-3.2.13)值。

```python
from homeassistant.components.calendar import CalendarEntity


class MyCalendar(CalendarEntity):

    async def async_update_event(
        self,
        uid: str,
        event: dict[str, Any],
        recurrence_id: str | None = None,
        recurrence_range: str | None = None,
    ) -> None:
        """Update an event on the calendar."""
```


## 日历事件

`CalendarEvent` 代表日历上的单个事件。

| 名称 | 类型 | 默认值 | 说明 |
| ----------- | ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| start | datetime or date | **Required** | 事件的开始（含）。必须在 `end` 之前。 `start` 和 `end` 必须是同一类型。作为日期时间，必须有时区。 |
| end | datetime or date | **Required** | 活动结束（独家）。必须在 `start` 之后。作为日期时间，必须具有与开始相同的时区。 |
| summary | string | **Required** | 事件的标题或摘要。 |
| location | string | `None` | 事件发生的地理位置。 |
| description | string | `None` | 事件的详细描述。 |
| uid | string | `None` | 事件的唯一标识符（突变所需） |
| recurrence_id | string | `None` | 重复事件的特定实例的可选标识符（重复事件的突变需要） |
| rrule | string | `None` | 重复规则字符串，例如`FREQ=DAILY` |