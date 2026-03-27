---
title: 真空实体
description: '平台实体派生自homeassistant.components.vacuum.StateVacuumEntity(https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/vacuum/init.。'
sidebar_label: 真空
---
# 真空实体

平台实体派生自[`homeassistant.components.vacuum.StateVacuumEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/vacuum/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| fan_speed | string | `none` | 当前风扇速度。
| fan_speed_list | list | `NotImplementedError()` | 可用风扇速度列表。
| name | string | **Required** | 实体名称。
| activity | VacuumActivity | **Required** | 返回状态部分中列出的状态之一。

## 状态

设置状态应从 `activity` 属性中的 VacuumActivity 返回一个枚举。

| 值 | 说明
| ----- | -----------
| `CLEANING` | 真空吸尘器当前正在清洁。
| `DOCKED` | 真空吸尘器当前已对接，假设对接也意味着充电。
| `IDLE` | 真空吸尘器没有暂停、没有对接并且没有任何错误。
| `PAUSED` | 吸尘器正在清洁，但暂停了，没有返回码头。
| `RETURNING` | 真空吸尘器已完成清洁，目前正在返回码头，但尚未对接。
| `ERROR` | 真空吸尘器在清洁时遇到错误。

## 支持的功能

支持的功能通过使用 `VacuumEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。
请注意，所有真空实体平台均源自 `homeassistant.components.vacuum.StateVacuumEntity`
必须设置 `VacuumEntityFeature.STATE` 标志。

| 值 | 说明 |
| -------------- | ---------------------------------------------------- |
| `CLEAN_AREA` | 真空吸尘器支持清洁特定区域。 |
| `CLEAN_SPOT` | 真空吸尘器支持局部清洁。 |
| `FAN_SPEED` | 吸尘器支持设置风扇转速。 |
| `LOCATE` | 真空支持定位。 |
| `MAP` | 真空支持检索其地图。 |
| `PAUSE` | 真空支持暂停命令。 |
| `RETURN_HOME` | 真空支持返回码头命令。 |
| `SEND_COMMAND` | 真空吸尘器支持向真空吸尘器发送命令。 |
| `START` | 吸尘器支持启动命令。 |
| `STATE` | 真空支持返回其状态。 |
| `STOP` | 真空支持停止命令。 |

## 方法

### `async_get_segments`

返回 `Segment` 对象的列表，表示真空报告的可清理段。当支持`CLEAN_AREA`时，集成平台需要实现该方法。它在配置区域映射时被调用，因此它应该返回完全最新的信息。

```python
async def async_get_segments(self) -> list[Segment]:
    """Get the segments that can be cleaned."""
```

`Segment` 数据类定义为：

```python
@dataclass(slots=True)
class Segment:
    """Represents a cleanable segment reported by a vacuum."""

    id: str
    name: str
    group: str | None = None
```

对于给定的真空实体，无论组如何，`id` 在所有段中都必须是全局唯一的。 `group` 字段仅用于对映射 UI 中的段进行分组。

### `clean_segments` 或 `async_clean_segments`

按 ID 清理指定段。当集成平台支持`CLEAN_AREA`时，需要实现该方法。使用区域映射将目标区域解析为分段后，它由 `clean_area` 服务在内部调用。

```python
async def async_clean_segments(self, segment_ids: list[str], **kwargs: Any) -> None:
    """Perform an area clean."""
```

### `last_seen_segments`

返回上次配置区域映射时可用的真空报告的段的属性。集成可以在更新周期期间将此与当前设备段进行比较，以检测更改并在适当时调用 `async_create_segments_issue`。如果尚未保存映射，则返回 `None`，在这种情况下不应出现此问题。

```python
@property
def last_seen_segments(self) -> list[Segment] | None:
    """Return segments as seen by the user, when last mapping the areas."""
```

### `async_create_segments_issue`

一种辅助方法，当真空报告的段与上次配置区域映射时可用的段不同时，该方法会创建修复问题。当分段更改需要调整区域映射时，集成应该调用此方法。由此产生的修复问题会提示用户重新配置区域映射，这将相应地更新 `last_seen_segments`。

```python
@callback
def async_create_segments_issue(self) -> None:
    """Create a repair issue when vacuum segments have changed."""
```

### `clean_spot` 或 `async_clean_spot`

进行现场清理。

### `locate` 或 `async_locate`

找到真空吸尘器。

### `pause` 或 `async_pause`

暂停清洁任务。

### `return_to_base` 或 `async_return_to_base`

将吸尘器设置为返回底座。

### `send_command` 或 `async_send_command`

向吸尘器发送命令。

### `set_fan_speed` 或 `async_set_fan_speed`

设置风扇速度。

### `start` 或 `async_start`

开始或恢复清洁任务。

### `stop` 或 `async_stop`

停止吸尘器，不要返回底座。