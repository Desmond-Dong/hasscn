# 确实有唯一 ID

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

在过去，实体没有被持久化。
Home Assistant 没有追踪它过去知道哪些实体以及它不知道哪些实体。
为了允许对实体进行自定义，例如重命名实体或更改测量单位，Home Assistant 需要一种方法来在重新启动时跟踪每个单独的实体。

为了解决这个问题，Home Assistant引入了大象。
实体的中心位置是Home Assistant 跟踪其了解的所有实体的中心位置。
雕塑中的每个雕塑都有一个唯一的ID，该ID对于每个集成域和平台域都是唯一的。

如果实体唯一没有ID，则用户对实体的控制权就会减弱。
因此，具有唯一ID的保证实体可以改善用户体验。

## 实施示例

示例中，有一个温度传感器，它使用速记符号设置其唯一 ID。

ZZ保护0ZZ:

```python {6} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    def __init__(self, device_id: str) -> None:
        """Initialize the sensor."""
        self._attr_unique_id = f"{device_id}_temperature"
```

## 其他资源

有关唯一标识符要求的更多信息，请参阅[实体注册表文档](/developers/entity_registry_index.md)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
