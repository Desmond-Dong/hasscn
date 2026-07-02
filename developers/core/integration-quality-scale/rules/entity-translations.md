# 实体有翻译名称

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

Home Assistant 被世界各地的人们使用。
为了让非英语用户更容易使用 Home Assistant，具有翻译名称的实体非常重要。
这使得人们更容易理解实体是什么。

## 实施示例

在示例中，传感器的中文名称为“PhaseVoltage”。
与设备名称相结合，该实体将自己命名为“我的设备相电压”。

ZZ保护0ZZ:

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

ZZ保护0ZZ:

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
如果您的实体平台是 `binary_sensor`、`number`、`sensor` 或 `update`，并且它设置了设备类，并且希望实体与设备具有类相同的名称，则可以省略转换键，因为实体将自动使用设备类名称。
:::

## 其他资源

有关翻译流程的更多信息，请参阅[国际化文档](/developers/internationalization/core.md)，其中也包含实体翻译的说明。
相关实体命名的更多信息可以在[entity](/developers/core/entity.md#has_entity_name-true-mandatory-for-new-integrations)文档中找到。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
