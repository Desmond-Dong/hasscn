# 覆盖实体

盖子实体控制开口或盖子，例如车库门或窗帘。平台实体派生自[`homeassistant.components.cover.CoverEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/cover/__init__.py)。

:::note
盖实体只能用于控制开口或盖的设备。
对于其他类型的设备，应使用 [数字](/developers/core/entity/number.md) 等实体，即使过去并非如此。
:::

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ----------------------- | ---- | ------- | -----------
| current\_cover\_position | <code>int | None</code> | `None` | 盖子的当前位置，0 表示关闭，100 表示完全打开。
| current\_cover\_tilt\_position | <code>int | None</code> | `None` | 盖子的当前倾斜位置，其中 0 表示关闭/无倾斜，100 表示打开/最大倾斜。
| is\_closed | <code>bool | None</code> | **Required** | 盖子是否关闭。用于确定 `state`。
| is\_closing | <code>bool | None</code> | `None` | 盖子是否关闭。用于确定 `state`。
| is\_opening | <code>bool | None</code> | `None` | 盖子是否打开。用于确定 `state`。

### 状态

状态是通过设置上述属性来定义的。结果状态是使用 `CoverState` 枚举返回以下成员之一。

| 值 | 说明 |
|-------------|--------------------------------------------------------------------|
| `CLOSED` | 盖子已关闭。 |
| `CLOSING` | 盖子正在关闭。 |
| `OPENING` | 盖子正在打开。 |
| `OPEN` | 盖子打开。 |

### 设备类别

| 常量 | 说明
|----------|-----------------------|
| `CoverDeviceClass.AWNING` | 控制遮阳篷，例如外部可伸缩窗户、门或露台盖。
| `CoverDeviceClass.BLIND` | 百叶窗的控制，百叶窗是相连的板条，可以展开或折叠以覆盖开口，或者可以倾斜以部分覆盖开口，例如百叶窗。
| `CoverDeviceClass.CURTAIN` | 控制窗帘或窗帘，通常是悬挂在可打开的窗户或门上方的织物。
| `CoverDeviceClass.DAMPER` | 控制机械阻尼器，减少气流、声音或光线。
| `CoverDeviceClass.DOOR` | 控制可进入通常属于建筑物一部分的区域的门。
| `CoverDeviceClass.GARAGE` | 控制可进入车库的车库门。
| `CoverDeviceClass.GATE` | 控制通往车道或其他区域的大门。大门位于建筑物外部，通常是栅栏的一部分。
| `CoverDeviceClass.SHADE` | 控制遮光帘，遮光帘是材料的连续平面或在开口上展开或折叠的连接单元，例如窗帘。
| `CoverDeviceClass.SHUTTER` | 百叶窗的控制，百叶窗是链接的板条，可以向外/向内摆动以覆盖开口，或者可以倾斜以部分覆盖开口，例如室内或外百叶窗。
| `CoverDeviceClass.WINDOW` | 控制打开和关闭或可能倾斜的物理窗口。

## 支持的功能

支持的功能通过使用 `CoverEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------------------- | -------------------------------------------------------------------------------- |
| `OPEN` | 盖板支持打开。 |
| `CLOSE` | 盖板支持关闭。 |
| `SET_POSITION` | 盖子支持在打开和关闭之间移动到特定位置。 |
| `STOP` | 盖板支持停止当前动作（打开、关闭、设定位置） |
| `OPEN_TILT` | 盖板支持倾斜打开。 |
| `CLOSE_TILT` | 盖体支持倾斜关闭。 |
| `SET_TILT_POSITION` | 盖子支持在打开和关闭之间移动到特定的倾斜位置。 |
| `STOP_TILT` | 盖板支持停止当前倾斜动作（打开、关闭、设定位置） |

## 方法

### 打开盖子

仅当设置了标志 `SUPPORT_OPEN` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def open_cover(self, **kwargs):
        """Open the cover."""

    async def async_open_cover(self, **kwargs):
        """Open the cover."""
```

### 关闭盖子

仅当设置了标志 `SUPPORT_CLOSE` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def close_cover(self, **kwargs):
        """Close cover."""

    async def async_close_cover(self, **kwargs):
        """Close cover."""
```

### 设置盖子位置

仅当设置了标志 `SUPPORT_SET_POSITION` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def set_cover_position(self, **kwargs):
        """Move the cover to a specific position."""

    async def async_set_cover_position(self, **kwargs):
        """Move the cover to a specific position."""
```

### 停止盖

仅当设置了标志 `SUPPORT_STOP` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def stop_cover(self, **kwargs):
        """Stop the cover."""

    async def async_stop_cover(self, **kwargs):
        """Stop the cover."""
```

### 开盖倾斜

仅当设置了标志 `SUPPORT_OPEN_TILT` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def open_cover_tilt(self, **kwargs):
        """Open the cover tilt."""

    async def async_open_cover_tilt(self, **kwargs):
        """Open the cover tilt."""
```

### 关闭盖板倾斜

仅当设置了标志 `SUPPORT_CLOSE_TILT` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def close_cover_tilt(self, **kwargs):
        """Close the cover tilt."""

    async def async_close_cover_tilt(self, **kwargs):
        """Close the cover tilt."""
```

### 设置机盖倾斜位置

仅当设置了标志 `SUPPORT_SET_TILT_POSITION` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def set_cover_tilt_position(self, **kwargs):
        """Move the cover tilt to a specific position."""

    async def async_set_cover_tilt_position(self, **kwargs):
        """Move the cover tilt to a specific position."""
```

### 停止盖倾斜

仅当设置了标志 `SUPPORT_STOP_TILT` 时才实现此方法。

```python
class MyCover(CoverEntity):
    # Implement one of these methods.

    def stop_cover_tilt(self, **kwargs):
        """Stop the cover."""

    async def async_stop_cover_tilt(self, **kwargs):
        """Stop the cover."""
```
