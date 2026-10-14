Calendar entity 是一种代表一组具有开始和结束日期及/或时间的 events 的 entity，对 automations 很有用。Calendar entity 从 [`homeassistant.components.calendar.CalendarEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/calendar/__init__.py) 派生。

Calendar 集成应与 rfc5545 兼容，并可选项遵循 rfc5546 中建立的 patterns 支持 event 创建。支持 recurring events 的集成负责处理 recurring events 的 expansion，例如在返回 expansion 后事件序列（作为单独独立 events）的 service 或 API 中。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name  | Type          | Default               | Description                                             |
| ----- | ------------- | --------------------- | ------------------------------------------------------- |
| event | `CalendarEvent \| None` | **必需** | 当前或下一个即将到来的 `CalendarEvent`，或 `None`。 |
| initial\_color | `str` | `None` | 用作 frontend 中日历初始颜色的十六进制 color 字符串（例如 `"#16a765"`）。 |

### 状态

`CalendarEntity` 的 state 类似于 binary sensor，反映是否存在 active event：

| Constant    | Description                                 |
| ----------- | ------------------------------------------- |
| `STATE_ON`  | 日历有 active event。           |
| `STATE_OFF` | 日历没有 active event。 |

Calendar entity 有一个 `event` property，返回当前或下一个即将到来的 `CalendarEvent`，用于确定 state。Calendar entity 的实现负责确定下一个即将到来的 event，
包括正确排序 events 以及在 Home Assistant timezone 中解释 all-day events。Entity 应调用 `homeassistant.util.dt.now` 来获取当前时间，该时间具有设置为 Home Assistant timezone 的 `tzinfo` 值，或者检查 `homeassistant.components.util.dt.DEFAULT_TIMEZONE`。

## 支持的功能

Supported features 通过使用 `CalendarEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Value               | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `CREATE_EVENT`      | Entity 实现了允许创建 events 的 methods。  |
| `DELETE_EVENT`      | Entity 实现了允许删除 events 的 methods。  |
| `UPDATE_EVENT`      | Entity 实现了允许更新 events 的 methods。  |

## 方法

### 获取 events

Calendar entity 可以返回发生在特定时间范围内的 events。给实现者的注意事项：

* `start_date` 是下界，应用于 event 的 `end`（exclusive）。它具有本地 Home Assistant timezone 的 `tzinfo`。
* `end_date` 是上界，应用于 event 的 `start`（exclusive）。它与 `start_date` 具有相同的 `tzinfo`。
* Recurring events 应被展平并作为单独的 `CalendarEvent` 返回。

Calendar entity 负责按顺序返回 events，包括正确排序 all-day events。All-day event 应排序为在 Home Assistant timezone 中的午夜开始（例如从 start/end time 参数的 `tzinfo`，
或使用 `homeassistant.util.dt.start_of_local_day`）。注意，all-day events 仍应在 `CalendarEvent` 中设置 `datetime.date`，而不是带时间的日期。

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

### 订阅 calendar events

Frontend 和其他 consumers 可以通过 `calendar/event/subscribe` WebSocket API 订阅实时 calendar event updates。该订阅完全由 `CalendarEntity` 基类处理——集成开发者除了现有的 `async_get_events` 方法外不需要实现任何东西。

当 calendar entity 的 state 改变时（例如 event 开始或结束），基类会自动获取订阅时间范围内的最新 events，并将它们推送给所有 active subscribers。Updates 会进行 debounce 处理以避免过多调用 `async_get_events`。

#### 通知 subscribers

在创建、更新或删除 calendar events 时，state 不会自动更新。如果集成需要在 state 变更之外通知 subscribers（例如在 CRUD 操作之后），应调用 `CalendarEntity.async_update_event_listeners` 将更新的 events 推送给所有 active subscribers。

#### WebSocket API

**订阅 events：**

```json
{
  "type": "calendar/event/subscribe",
  "entity_id": "calendar.my_calendar",
  "start": "2025-01-01T00:00:00+00:00",
  "end": "2025-01-31T23:59:59+00:00"
}
```

订阅立即返回请求时间范围内的当前 events，然后在 entity state 改变时推送 updates。下面的示例仅显示内部的 `event` payload；实际的 WebSocket frame 还包含 `id` 和 `type` 字段：

```json
{
  "event": {
    "events": [
      {
        "start": "2025-01-15T09:00:00+00:00",
        "end": "2025-01-15T10:00:00+00:00",
        "summary": "Team meeting",
        "description": "Weekly sync",
        "location": "Room 1"
      }
    ]
  }
}
```

列表中的每个 event 仅包含有值的字段。可能的字段有 `start`、`end`、`summary`、`description` 和 `location`。如果在获取 events 时发生错误，`events` 将为 `null`。

### 创建 events

Calendar entity 可以通过指定 `CREATE_EVENT` supported feature 来支持创建 events。支持 mutation 的集成必须处理 rfc5545 fields 和最佳实践，例如保留所设置的新未知 fields 和 recurring events。

```python
from homeassistant.components.calendar import CalendarEntity

class MyCalendar(CalendarEntity):

    async def async_create_event(self, **kwargs: Any) -> None:
        """Add a new event to calendar."""
```

### 删除 events

Calendar entity 可以通过指定 `DELETE_EVENT` supported feature 来支持删除 events。支持 mutation 的集成必须支持 rfc5545 recurring events。

有三种删除 recurring events 的方式：

* 仅指定 `uid` 将删除整个 series
* 指定 `uid` 和 `recurrence_id` 将删除 series 中特定的 event instance
* 指定 `uid`、`recurrence_id` 和 `recurrence_range` 值可能删除从 `recurrence_id` 开始的范围内的 events。当前 rfc5545 允许 [range](https://www.rfc-editor.org/rfc/rfc5545#section-3.2.13) 值 `THISANDFUTURE`。

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

### 更新 events

Calendar entity 可以通过指定 `UPDATE_EVENT` supported feature 来支持更新 events。支持 mutation 的集成必须支持 rfc5545 recurring events。

有三种更新 recurring events 的方式：

* 仅指定 `uid` 将更新整个 series
* 指定 `uid` 和 `recurrence_id` 将更新 series 中特定的 event instance
* 指定 `uid`、`recurrence_id` 和 `recurrence_range` 值可能更新从 `recurrence_id` 开始的范围内的 events。当前 rfc5545 允许 [range](https://www.rfc-editor.org/rfc/rfc5545#section-3.2.13) 值 `THISANDFUTURE`。

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

`CalendarEvent` 代表 calendar 上的一个单独 event。

| Name        | Type             | Default      | Description                                                                                                                                     |
| ----------- | ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| start       | datetime or date | **必需** | 事件开始（inclusive）。必须在 `end` 之前。`start` 和 `end` 必须是同一类型。作为 datetime 时，必须有 timezone。    |
| end         | datetime or date | **必需** | 事件结束（exclusive）。必须在 `start` 之后。作为 datetime 时，必须有与 start 相同的 timezone。                         |
| summary     | string           | **必需** | 事件的标题或摘要。                                                                                                                |
| location    | string           | `None`       | 事件的地理位置。                                                                                                             |
| description | string           | `None`       | 事件的详细描述。                                                                                                            |
| uid | string | `None` | 事件的唯一标识符（mutation 必需） |
| recurrence\_id | string | `None` | 针对 recurring event 的特定 instance 的可选标识符（recurring events 的 mutation 必需） |
| rrule |  string | `None` | 重复规则字符串，例如 `FREQ=DAILY` |

## 颜色管理

Calendar entity 可以选项性地为在 frontend 中显示提供默认颜色，方法是将 `initial_color` 设为十六进制 color 字符串（例如 `"#16a765"`）。该颜色在 entity 首次添加时自动存储在 entity registry options 中，用户可以通过 entity settings UI 自定义。
