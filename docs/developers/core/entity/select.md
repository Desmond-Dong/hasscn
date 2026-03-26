---
title: 选择实体
sidebar_label: 选择
---

`select` 是一个实体，允许用户从集成提供的有限选项列表中选择一个选项。平台实体派生自[`homeassistant.components.select.SelectEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/select/__init__.py)

该实体仅应在没有更好的拟合选项可用的情况下使用。
例如，灯泡可以具有用户可选择的灯光效果。虽然这可以使用 `select` 实体来完成，但它实际上应该是 `light` 实体的一部分，该实体已经支持灯光效果。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| current_option | str | None | 当前选择的选项
| options | list | **Required** | 可用选项列表（字符串形式）

所有实体共有的其他属性（例如 `icon`、`unit_of_measurement`、`name` 等）也适用。

## 方法

### 选择选项

当用户或自动化想要更改当前选定的选项时调用。

```python
class MySelect(SelectEntity):
    # Implement one of these methods.

    def select_option(self, option: str) -> None:
        """Change the selected option."""

    async def async_select_option(self, option: str) -> None:
        """Change the selected option."""

```