---
title: "entity 分配了适当的 EntityCategory"
sidebar_label: 🥇 entity-category
---

## 理由

entity 应分配适当的 EntityCategory，以确保在默认 category 不适当时，它们能被正确分类并容易被识别。
entity category 用于例如自动生成的 dashboard。

## 示例实现

在本示例中，我们有一个返回诊断值的 sensor。

`sensor.py`
```python {4} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, ...) -> None:
```

## 附加资源

要了解有关 registry properties 的更多信息，请参阅[文档](/developers/core/entity#registry-properties)。

## 例外

本规则没有例外。
