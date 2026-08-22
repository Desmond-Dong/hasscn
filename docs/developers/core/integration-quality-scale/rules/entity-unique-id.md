---
title: "实体具有唯一 ID"
sidebar_label: 🥉 entity-unique-id
related_rules:
  - unique-config-entry
---
import RelatedRules from './_includes/related_rules.jsx'

## 原理说明

在过去，实体（entities）是未被持久化的。
Home Assistant 不跟踪过去已知哪些实体、又不知道哪些实体。
为了允许对实体进行自定义（如重命名实体或更改测量单位），Home Assistant 需要一种在重启之间跟踪每个实体的方式。

为了解决这个问题，Home Assistant 引入了 entity registry（实体注册表）。
Entity registry 是 Home Assistant 跟踪其所知所有实体的中心位置。
Entity registry 中的每个实体都有一个 unique ID（唯一 ID），该 ID 在每个集成 domain 和每个平台 domain 下是唯一的。

如果实体没有 unique ID，用户对实体的控制就会减少。
因此，确保实体具有 unique ID 可以改善用户体验。

## 示例实现

在这个示例中，有一个温度传感器使用简写表示法设置其 unique ID。

`sensor.py`：
```python {6} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    def __init__(self, device_id: str) -> None:
        """Initialize the sensor."""
        self._attr_unique_id = f"{device_id}_temperature"
```

## 补充资料

更多有关 unique ID 要求的信息可在 [documentation](/developers/entity_registry_index#unique-id-requirements) 中找到。

## 例外情况

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
