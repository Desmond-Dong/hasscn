Text 实体是一种允许用户向集成输入文本值的实体。从 [`homeassistant.components.text.TextEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/text/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据，或构建一种机制将状态更新推送到实体类实例。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| mode | string | `text` | 定义文本在 UI 中应如何显示。可以是 `text` 或 `password`。
| native\_max | int | 255 | 文本值中字符的最大数量（含）。
| native\_min | int | 0 | 文本值中字符的最小数量（含）。
| pattern | str | `None` | 文本值必须匹配的 regex 模式。
| native\_value | str | **必填** | 文本的值。

所有实体共有的其他属性（如 `icon`、`name` 等）也适用。

## 方法

### 设置值

```python
class MyTextEntity(TextEntity):
    # 实现以下方法之一。

    def set_value(self, value: str) -> None:
        """Set the text value."""

    async def async_set_value(self, value: str) -> None:
        """Set the text value."""
```
