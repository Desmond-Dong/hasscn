---
title: 文本实体
description: '文本实体是允许用户向集成输入文本值的实体。平台实体派生自homeassistant.components.text.TextEntity(https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/。'
sidebar_label: 文本
---
# 文本实体

文本实体是允许用户向集成输入文本值的实体。平台实体派生自[`homeassistant.components.text.TextEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/text/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据或构建将状态更新推送到实体类实例的机制。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| mode | string | `text` | 定义文本在 UI 中的显示方式。可以是 `text` 或 `password`。
| native_max | int | 100 | 文本值中的最大字符数（含）。
| native_min | int | 0 | 文本值中的最小字符数（含）。
| pattern | str | `None` | 文本值必须匹配才能有效的正则表达式模式。
| native_value | str | **Required** | 文本的价值。

所有实体共有的其他属性（例如 `icon`、`name` 等）也适用。


## 方法

### 设定值

```python
class MyTextEntity(TextEntity):
    # Implement one of these methods.

    def set_value(self, value: str) -> None:
        """Set the text value."""

    async def async_set_value(self, value: str) -> None:
        """Set the text value."""
```