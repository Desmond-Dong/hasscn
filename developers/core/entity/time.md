# 时间实体

`time` 是一个允许用户输入积分时间的实体。平台实体派生自[`homeassistant.components.time.TimeEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/time/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| native\_value | time | **Required** | 时间的价值。

所有实体共有的其他属性（例如 `icon`、`name` 等）也适用。

## 方法

### 设定值

当用户或自动化想要更新值时调用。

```python
class MyTime(TimeEntity):
    # Implement one of these methods.

    def set_value(self, value: time) -> None:
        """Update the current value."""

    async def async_set_value(self, value: time) -> None:
        """Update the current value."""

```
