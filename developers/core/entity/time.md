`time` 是一种允许用户向集成输入时间的实体。从 [`homeassistant.components.time.TimeEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/time/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| native\_value | time | None | `None` | 时间的值。

所有实体共有的其他属性（如 `icon`、`name` 等）也适用。

## 方法

### 设置值

当用户或自动化想要更新值时调用。

```python
class MyTime(TimeEntity):
    # 实现以下方法之一。

    def set_value(self, value: time) -> None:
        """Update the current value."""

    async def async_set_value(self, value: time) -> None:
        """Update the current value."""
```
