---
title: "集成默认禁用不常用（或嘈杂）的 entity"
sidebar_label: 🥇 entity-disabled-by-default
related_rules:
  - appropriate-polling
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

Home Assistant 会跟踪 entity 状态的变化。
这样做是为了能够在 UI 中显示 entity 的历史记录。
每一个被跟踪的状态都会占用一定的资源。
频繁改变状态的 entity（嘈杂的 entity）比较少改变状态的 entity 更频繁地进行此操作。

我们认为，默认禁用不常用或嘈杂的 entity 是一种良好实践。
如果用户对此类 entity 有使用场景，他们可以自行启用。
这样，对于没有使用场景的用户来说，就不必承担跟踪 entity 状态的成本。

关于什么算作常用 entity 并没有硬性规则，因为这取决于集成和设备。
例如，一个蓝牙温度传感器可以有一个表示设备信号强度的 entity。
对于大多数用户来说，这个 entity 并不是很有用，因此应该默认禁用。
而如果有一个提供设备来测量信号强度的集成，那么这个 entity 对大多数用户是有用的，应该默认启用。

## 示例实现

在下面的示例中，entity 默认被禁用。

`sensor.py`
```python {8} showLineNumbers
class MySignalStrengthSensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_device_class = SensorDeviceClass.SIGNAL_STRENGTH
    _attr_native_unit_of_measurement = SIGNAL_STRENGTH_DECIBELS_MILLIWATT
    _attr_entity_registry_enabled_default = False

    def __init__(self, device: Device) -> None:
        """Initialize the sensor."""
        ...
```

## 附加资源

要了解有关 entity registry properties 的更多信息，请参阅[文档](/developers/core/entity#registry-properties)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
