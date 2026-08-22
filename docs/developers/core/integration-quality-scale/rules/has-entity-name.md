---
title: "entity 使用 has_entity_name = True"
sidebar_label: 🥉 has-entity-name
related_rules:
  - entity-translations
  - entity-device-class
  - devices
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

`has_entity_name` 是一个 entity 属性，用于改善 Home Assistant 中 entity 的命名。
它的引入旨在根据名称显示的上下文，向用户展示更好的 entity 名称。

我们认为这是一种良好实践，因为它允许不同集成之间的命名保持一致性。

## 示例实现

在下面的示例中，如果设备名称为 "My device"，字段为 "temperature"，则 entity 名称将显示为 "My device temperature"。

`sensor.py`
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

但是，当 entity 名称设置为 `None` 时，将使用设备名称作为 entity 名称。
在这种情况下，lock entity 将直接称为 "My device"。
这应用于设备的主要功能。

`lock.py`
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

## 附加资源

关于 entity 命名的更多信息，请参阅 [entity 文档](/developers/core/entity#has_entity_name-true-mandatory-for-new-integrations)。
关于设备的更多信息，请参阅 [device 文档](/developers/device_registry_index)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
