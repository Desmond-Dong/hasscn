---
title: 日期实体
sidebar_label: 日期
---

`date` 是一个允许用户将日期输入集成的实体。平台实体派生自[`homeassistant.components.date.DateEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/date/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| native_value | <code>datetime.date &#124; None</code> | **Required** | 日期的值。

所有实体共有的其他属性（例如 `icon`、`name` 等）也适用。

## 方法

### 设定值

当用户或自动化想要更新值时调用。

```python
class MyDate(DateEntity):
    # Implement one of these methods.

    def set_value(self, value: date) -> None:
        """Update the current value."""

    async def async_set_value(self, value: date) -> None:
        """Update the current value."""

```