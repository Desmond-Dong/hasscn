---
title: "实体尽可能使用 device class"
sidebar_label: 🥇 entity-device-class
related_rules:
  - has-entity-name
  - entity-translations
  - icon-translations
---
import RelatedRules from './_includes/related_rules.jsx'

## 原理说明

Device class 是一种为实体提供上下文的方式。
Home Assistant 出于多种目的使用 device class：
- 允许用户切换到设备提供的测量单位以外的其他单位。
- 用于语音控制，以提出诸如"客厅温度是多少？"之类的问题。
- 用于将实体暴露给 Google Assistant 和 Amazon Alexa 等基于云的系统生态。
- 用于调整 Home Assistant UI 中的显示方式。
- 可用于设置实体的默认名称，以减轻译者的负担。

出于这些原因，尽可能使用 device class 非常重要。

## 示例实现

在下面的示例中，我们有一个温度传感器，它使用了 device class `temperature`。
该实体的名称将是 `My device temperature`。

`sensor.py`
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

## 补充资料

可用 device class 的列表可在 [entity](/developers/core/entity) 页面下的实体页面中找到。
更多有关实体命名的信息可在 [entity](/developers/core/entity#has_entity_name-true-mandatory-for-new-integrations) 文档中找到。

## 例外情况

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
