Cover entity 控制 opening 或 cover，例如 garage door 或 window shade。从 [`homeassistant.components.cover.CoverEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/cover/__init__.py) 派生 platform entity。

:::note
Cover entity 应仅用于控制 opening 或 cover 的 devices。
对于其他类型的 device entities（如 [Number](/developers/core/entity/number.md)），应改用它们，即使过去并非如此。
:::

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ----------------------- | ---- | ------- | -----------
| current\_cover\_position | `int \| None` | `None` | Cover 的当前位置，其中 0 表示 closed，100 表示 fully open。
| current\_cover\_tilt\_position | `int \| None` | `None` | Cover 的当前 tilt position，其中 0 表示 closed/no tilt，100 表示 open/maximum tilt。
| is\_closed | `bool \| None` | **必需** | Cover 是否 closed。用于确定 `state`。
| is\_closing | `bool \| None` | `None` | Cover 是否正在 closing。用于确定 `state`。
| is\_opening | `bool \| None` | `None` | Cover 是否正在 opening。用于确定 `state`。

### 状态

State 通过设置上述 properties 来定义。Resulting state 使用 `CoverState` enum 返回以下成员之一。

| Value       | Description                                                        |
|-------------|--------------------------------------------------------------------|
| `CLOSED`    | Cover 已 closed。                                                |
| `CLOSING`   | Cover 正在 closing。                                               |
| `OPENING`   | Cover 正在 opening。                                               |
| `OPEN`      | Cover 已 open。                                                  |

### 设备类型

| Constant | Description
|----------|-----------------------|
| `CoverDeviceClass.AWNING` | 控制 awning，例如外部可伸缩 window、door 或 patio cover。
| `CoverDeviceClass.BLIND` | 控制 blinds，即连接的 slats，可以展开或折叠以覆盖 opening，或倾斜以部分覆盖 opening，例如 window blinds。
| `CoverDeviceClass.CURTAIN` | 控制 curtains 或 drapes，通常是悬挂在 window 或 door 上方的 fabric，可以拉开。
| `CoverDeviceClass.DAMPER` | 控制减少 air flow、sound 或 light 的机械 damper。
| `CoverDeviceClass.DOOR` | 控制提供进入通常属于结构一部分的区域 access 的 door。
| `CoverDeviceClass.GARAGE` | 控制提供进入 garage access 的 garage door。
| `CoverDeviceClass.GATE` | 控制提供进入 driveway 或其他区域 access 的 gate。Gates 位于结构外部，通常属于 fence 的一部分。
| `CoverDeviceClass.SHADE` | 控制 shades，即连续的 material plane 或连接的 cells，可以展开或折叠覆盖 opening，例如 window shades。
| `CoverDeviceClass.SHUTTER` | 控制 shutters，即连接的 slats，可以 swing out/in 以覆盖 opening，或倾斜以部分覆盖 opening，例如室内或室外 window shutters。
| `CoverDeviceClass.WINDOW` | 控制物理 window，可以打开和关闭，或可以倾斜。

## 支持的功能

Supported features 通过使用 `CoverEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Value               | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| `OPEN`              | Cover 支持被 open。                                                 |
| `CLOSE`             | Cover 支持被 closed。                                                 |
| `SET_POSITION`      | Cover 支持在 open 和 closed 之间移动到特定 position。      |
| `STOP`              | Cover 支持停止当前 action（open、close、set position）       |
| `OPEN_TILT`         | Cover 支持 tilt open。                                           |
| `CLOSE_TILT`        | Cover 支持 tilt closed。                                         |
| `SET_TILT_POSITION` | Cover 支持在 open 和 closed 之间移动到特定 tilt position。 |
| `STOP_TILT`         | Cover 支持停止当前 tilt action（open、close、set position）  |

## 方法

### 打开

仅当设置了 `CoverEntityFeature.OPEN` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def open_cover(self, **kwargs: Any) -> None:
        """Open the cover."""

    async def async_open_cover(self, **kwargs: Any) -> None:
        """Open the cover."""
```

### 关闭

仅当设置了 `CoverEntityFeature.CLOSE` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def close_cover(self, **kwargs: Any) -> None:
        """Close cover."""

    async def async_close_cover(self, **kwargs: Any) -> None:
        """Close cover."""
```

### 设置位置

仅当设置了 `CoverEntityFeature.SET_POSITION` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def set_cover_position(self, **kwargs: Any) -> None:
        """Move the cover to a specific position."""

    async def async_set_cover_position(self, **kwargs: Any) -> None:
        """Move the cover to a specific position."""
```

### 停止

仅当设置了 `CoverEntityFeature.STOP` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def stop_cover(self, **kwargs: Any) -> None:
        """Stop the cover."""

    async def async_stop_cover(self, **kwargs: Any) -> None:
        """Stop the cover."""
```

### 打开 tilt

仅当设置了 `CoverEntityFeature.OPEN_TILT` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def open_cover_tilt(self, **kwargs: Any) -> None:
        """Open the cover tilt."""

    async def async_open_cover_tilt(self, **kwargs: Any) -> None:
        """Open the cover tilt."""
```

### 关闭 tilt

仅当设置了 `CoverEntityFeature.CLOSE_TILT` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def close_cover_tilt(self, **kwargs: Any) -> None:
        """Close the cover tilt."""

    async def async_close_cover_tilt(self, **kwargs: Any) -> None:
        """Close the cover tilt."""
```

### 设置 tilt 位置

仅当设置了 `CoverEntityFeature.SET_TILT_POSITION` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def set_cover_tilt_position(self, **kwargs: Any) -> None:
        """Move the cover tilt to a specific position."""

    async def async_set_cover_tilt_position(self, **kwargs: Any) -> None:
        """Move the cover tilt to a specific position."""
```

### 停止 tilt

仅当设置了 `CoverEntityFeature.STOP_TILT` 标志时，才实现此 method。

```python
class MyCover(CoverEntity):
    # 实现以下方法之一。

    def stop_cover_tilt(self, **kwargs: Any) -> None:
        """Stop the cover."""

    async def async_stop_cover_tilt(self, **kwargs: Any) -> None:
        """Stop the cover."""
```
