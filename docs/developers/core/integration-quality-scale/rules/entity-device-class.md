---
title: "实体尽可能使用设备类"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - has-entity-name
  - entity-translations
  - icon-translations
---
# 实体尽可能使用设备类

import RelatedRules from './_includes/related_rules.jsx'

## 推理

设备类是为实体提供上下文的一种方式。
Home Assistant 将它们用于各种目的，例如:
- 允许用户切换到设备提供的测量单位之外的其他测量单位。
- 它们用于语音控制来询问诸如“客厅的温度是多少？”之类的问题。
- 它们用于将实体暴露给基于云的生态系统，例如 Google Assistant 和 Amazon Alexa。
- 它们用于调整 Home Assistant UI 中的表示。
- 它们可用于设置实体的默认名称，以减轻翻译人员的负担。

由于这些原因，尽可能使用设备类非常重要。

## 实施示例

在下面的示例中，我们有一个使用设备类 `temperature` 的温度传感器。
该实体的名称为`My device temperature`。

ZZ保护0ZZ
```python {5} showLineNumbers
class MyTemperatureSensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True
    _attr_device_class = SensorDeviceClass.TEMPERATURE

    def __init__(self, device: Device) -> None:
        """Initialize the sensor."""
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device.id)},
            name="My device",
        )
```

## 其他资源

可用设备类别的列表可以在[entity](/developers/core/entity)页面下的实体页面中找到。
相关实体命名的更多信息可以在[entity](/developers/core/entity#has_entity_name-true-mandatory-for-new-integrations)文档中找到。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>