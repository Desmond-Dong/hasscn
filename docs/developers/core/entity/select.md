---
title: Select entity
sidebar_label: Select
---

`select` 是一种允许用户从集成提供的有限 options 列表中选择 option 的 entity。从 [`homeassistant.components.select.SelectEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/select/__init__.py) 派生 entity platforms。

此 entity 应仅在没有更适合的 option 可用的情况下使用。
例如，bulb 可以有用户可选择的 light effects。虽然这可以使用此 `select` entity 实现，但它应该真正成为 `light` entity 的一部分，后者已经支持 light effects。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| current_option | str | None | 当前的 select option
| options | list | **必需** | 可用 options 的列表（字符串形式）

其他在所有 entity 中通用的 properties（如 `icon`、`unit_of_measurement`、`name` 等）也适用。

## 方法

### 选择选项

当用户或 automation 想要更改当前选择的 option 时调用。

```python
class MySelect(SelectEntity):
    # 实现以下方法之一。

    def select_option(self, option: str) -> None:
        """Change the selected option."""

    async def async_select_option(self, option: str) -> None:
        """Change the selected option."""

```
