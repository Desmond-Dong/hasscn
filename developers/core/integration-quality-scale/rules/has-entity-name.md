# 实体使用 has\_entity\_name = True

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

`has_entity_name` 是一个实体属性，用于改进 Home Assistant 中实体的命名。
引入它是为了根据显示名称的上下文向用户显示更好的实体名称。

我们认为这是一个很好的实践，因为它允许集成之间命名的一致性。

## 实施示例

在下面的示例中，如果设备名称为“我的设备”且字段为“温度”，则实体名称将显示为“我的设备温度”。

ZZ保护0ZZ

```python {4} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True

    def __init__(self, device: Device, field: str) -> None:
        """Initialize the sensor."""
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device.id)},
            name=device.name,
        )
        self._attr_name = field
```

但是，当事件名称设置为`None`时，设备名称将引发事件名称。
在这种情况下，锁实体将被称为“我的设备”。
这应该是为了设备的主要功能而完成的。

ZZ保护0ZZ

```python {4-5,11} showLineNumbers
class MyLock(LockEntity):
    """Representation of a lock."""

    _attr_has_entity_name = True
    _attr_name = None

    def __init__(self, device: Device) -> None:
        """Initialize the lock."""
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device.id)},
            name=device.name,
        )
```

## 其他资源

相关实体命名的更多信息可以在[entity](/developers/core/entity.md#has_entity_name-true-mandatory-for-new-integrations)文档中找到。
相关设备的更多信息可以在[device](/developers/device_registry_index.md)文档中找到。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
