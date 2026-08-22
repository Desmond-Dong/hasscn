---
title: "entity 具有翻译后的名称"
sidebar_label: 🥇 entity-translations
related_rules:
  - has-entity-name
  - entity-device-class
  - icon-translations
  - exception-translations
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

Home Assistant 被世界各地的人们使用。
为了让非英语用户也能更轻松地使用 Home Assistant，entity 具有翻译后的名称非常重要。
这能帮助用户更容易理解 entity 的含义。

## 示例实现

在本示例中，sensor 的英文名称为 "Phase voltage"。
结合设备名称，此 entity 会将自己命名为 "My device Phase voltage"。

`sensor.py`:
```python {5} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True
    _attr_translation_key = "phase_voltage"

    def __init__(self, device_id: str) -> None:
        """Initialize the sensor."""
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device_id)},
            name="My device",
        )
```

`strings.json`:
```json {5} showLineNumbers
{
    "entity": {
        "sensor": {
            "phase_voltage": {
                "name": "Phase voltage"
            }
        }
    }
}
```

:::info
如果 entity 的 platform 是 `binary_sensor`、`number`、`sensor` 或 `update`，并且设置了 device class，而你希望 entity 使用与 device class 相同的名称，则可以省略 translation key，因为此时 entity 将自动使用 device class 名称。
:::

## 附加资源

关于翻译流程的更多信息，请参阅 [翻译文档](/developers/internationalization/core)，其中还包含有关 [entity 翻译](/developers/internationalization/core#name-of-entities)的信息。
关于 entity 命名的更多信息，请参阅 [entity 文档](/developers/core/entity#has_entity_name-true-mandatory-for-new-integrations)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
