---
title: 日期/时间实体
sidebar_label: 日期/时间
---

`datetime` 是一个允许用户向集成输入时间戳的实体。平台实体派生自[`homeassistant.components.datetime.DateTimeEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/datetime/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| native_value | <code>datetime.datetime &#124; None</code> | **Required** | 日期时间的值。必须包含时区信息。

所有实体共有的其他属性（例如 `icon`、`name` 等）也适用。

## 方法

### 设定值

当用户或自动化想要更新值时调用。输入的日期时间将始终采用 UTC。

```python
class MyDateTime(DateTimeEntity):
    # Implement one of these methods.

    def set_value(self, value: datetime) -> None:
        """Update the current value."""

    async def async_set_value(self, value: datetime) -> None:
        """Update the current value."""

```