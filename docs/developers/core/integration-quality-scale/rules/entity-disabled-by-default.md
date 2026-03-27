---
title: "集成禁用不太受欢迎（或嘈杂）的实体"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - appropriate-polling
---
# 集成禁用不太受欢迎（或嘈杂）的实体

import RelatedRules from './_includes/related_rules.jsx'

## 推理

Home Assistant 跟踪实体状态如何变化。
这样做是为了能够显示UI中实体的历史记录。
跟踪的每个状态都会占用一些资源。
经常改变状态的实体（嘈杂的实体）比不经常改变状态的实体更频繁地执行此操作。

我们认为默认情况下禁用不太受欢迎或嘈杂的实体是一个很好的做法。
如果用户有此类实体的用例，他们可以启用它。
这样，没有实体用例的用户就不必支付跟踪实体状态的成本。

对于什么被认为是流行实体没有硬性规则，因为这取决于集成和设备。
例如，蓝牙温度传感器可以有一个代表设备信号强度的实体。
该实体对于大多数用户来说不是很有用，因此默认情况下应禁用它。
如果有一个集成提供了测量信号强度的设备，那么该实体对大多数用户来说都是有用的，并且应该默认启用。

## 实施示例

在下面的示例中，该实体默认处于禁用状态。

ZZ保护0ZZ
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

## 其他资源

要了解有关动物属性的更多信息，请查看有关它的[documentation](/developers/core/entity#registry-properties)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>