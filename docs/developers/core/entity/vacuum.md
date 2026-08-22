---
title: "真空吸尘器实体"
sidebar_label: "Vacuum"
---

从 [`homeassistant.components.vacuum.StateVacuumEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/vacuum/__init__.py) 派生 entity 平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| fan_speed | string | `none` | 当前的 fan speed。
| fan_speed_list | list | `NotImplementedError()`| 可用的 fan speeds 列表。
| name | string | **必填** | Entity 的名称。
| activity | VacuumActivity | **必填** | 返回下面"状态"部分所列状态之一。

## 状态

设置 state 时应返回 `VacuumActivity` 枚举中的一个值，通过 `activity` 属性返回。

| 值 | 描述
| ----- | -----------
| `CLEANING` | 吸尘器当前正在清洁。
| `DOCKED` | 吸尘器当前已停放在 dock 上，假定 docked 也可能表示充电中。
| `IDLE` | 吸尘器既未暂停、未停放在 dock 上，也没有任何错误。
| `PAUSED` | 吸尘器曾正在清洁，但在未返回 dock 的情况下被暂停。
| `RETURNING` | 吸尘器已完成清洁，当前正在返回 dock，但尚未停放在 dock 上。
| `ERROR` | 吸尘器在清洁过程中遇到错误。

## 支持的功能

支持的功能通过使用 `VacuumEntityFeature` 枚举中的值来定义，
并使用按位或（`|`）运算符组合。
注意，所有从 `homeassistant.components.vacuum.StateVacuumEntity` 派生的 vacuum entity 平台
都必须设置 `VacuumEntityFeature.STATE` 标志。

| 值          | 描述                                          |
| -------------- | ---------------------------------------------------- |
| `CLEAN_AREA`   | 吸尘器支持清洁特定区域。 |
| `CLEAN_SPOT`   | 吸尘器支持点清洁。 |
| `FAN_SPEED`    | 吸尘器支持设置 fan speed。 |
| `LOCATE`       | 吸尘器支持定位。 |
| `MAP`          | 吸尘器支持获取其地图。 |
| `PAUSE`        | 吸尘器支持 pause 命令。 |
| `RETURN_HOME`  | 吸尘器支持返回 dock 的命令。 |
| `SEND_COMMAND` | 吸尘器支持向吸尘器发送命令。 |
| `START`        | 吸尘器支持 start 命令。 |
| `STATE`        | 吸尘器支持返回其 state。 |
| `STOP`         | 吸尘器支持 stop 命令。 |

## 方法

### `async_get_segments`

返回一个 `Segment` 对象列表，表示吸尘器报告的可清洁 segment。当支持 `CLEAN_AREA` 时，集成平台必须实现此方法。它在配置 area mapping 时被调用，因此应返回最新的信息。

```python
async def async_get_segments(self) -> list[Segment]:
    """Get the segments that can be cleaned."""
```

`Segment` dataclass 定义如下：

```python
@dataclass(slots=True)
class Segment:
    """Represents a cleanable segment reported by a vacuum."""

    id: str
    name: str
    group: str | None = None
```

`id` 必须对于给定 vacuum entity 的所有 segment 全局唯一，无论属于哪个 group。`group` 字段仅用于在 mapping UI 中对 segment 进行分组。

### `clean_segments` 或 `async_clean_segments`

按 ID 清洁指定的 segment。当支持 `CLEAN_AREA` 时，集成平台必须实现此方法。它在 `clean_area` 服务将目标 area 解析为 segment 后被内部调用。

```python
async def async_clean_segments(self, segment_ids: list[str], **kwargs: Any) -> None:
    """Perform an area clean."""
```

### `last_seen_segments`

一个属性，返回吸尘器报告的、在上次配置 area mapping 时可用的 segment。集成可以在其更新周期中将其与当前设备 segment 进行比较，以检测变化，并在适当时调用 `async_create_segments_issue`。如果尚未保存任何 mapping，则返回 `None`，此时不应触发 issue。

```python
@property
def last_seen_segments(self) -> list[Segment] | None:
    """Return segments as seen by the user, when last mapping the areas."""
```

### `async_create_segments_issue`

一个辅助方法，当吸尘器报告的 segment 与上次配置 area mapping 时可用的 segment 不同时创建 repair issue。当 segment 变化需要调整 area mapping 时，集成应调用此方法。产生的 repair issue 会提示用户重新配置 area mapping，从而相应地更新 `last_seen_segments`。

```python
@callback
def async_create_segments_issue(self) -> None:
    """Create a repair issue when vacuum segments have changed."""
```

### `clean_spot` 或 `async_clean_spot`

执行点清洁。

### `locate` 或 `async_locate`

定位吸尘器。

### `pause` 或 `async_pause`

暂停清洁任务。

### `return_to_base` 或 `async_return_to_base`

设置吸尘器返回 dock。

### `send_command` 或 `async_send_command`

向吸尘器发送命令。

### `set_fan_speed` 或 `async_set_fan_speed`

设置 fan speed。

### `start` 或 `async_start`

启动或恢复清洁任务。

### `stop` 或 `async_stop`

停止吸尘器，不返回 dock。
