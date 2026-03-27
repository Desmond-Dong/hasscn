---
title: "实体被正确分配 EntityCategory"
description: '当默认类别不合适时，应为实体适当分配EntityCategory，以确保它们被正确分类并且可以轻松识别。 例如，实体类别用于自动生成的仪表板。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 实体被正确分配 EntityCategory

## 推理

当默认类别不合适时，应为实体适当分配EntityCategory，以确保它们被正确分类并且可以轻松识别。
例如，实体类别用于自动生成的仪表板。

## 实施示例

在此示例中，我们有一个返回诊断值的传感器。

ZZ保护0ZZ
```python {4} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, ...) -> None:
```

## 其他资源

要了解有关北极属性的更多信息，请查看有关它的[documentation](/developers/core/entity#registry-properties)。

## 例外情况

这条规则没有例外。
