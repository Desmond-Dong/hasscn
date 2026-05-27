# 集成创建设备

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

Home Assistant 中的设备用于对实体进行分组以表示单个物理设备或服务。
这很有用，因为用户通常认为他们向系统添加了设备或服务，而不是单个实体。
Home Assistant 将设备信息存储在设备中。
为了让用户获得最好的体验，设备的信息应该尽可能完整。

## 实施示例

在此示例中，有一个传感器实体定义了应将其添加到设备注册表中的哪个设备，以及有关该设备的一些元数据。
这将提供丰富的设备信息页面，用户可以通过名称、序列号和其他字段识别设备。

ZZ保护0ZZ:

```python {8-18} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True

    def __init__(self, device: MyDevice) -> None:
        """Initialize the sensor."""
        self._attr_device_info = DeviceInfo(
            connections={(CONNECTION_NETWORK_MAC, device.mac)},
            name=device.name,
            serial_number=device.serial,
            hw_version=device.rev,
            sw_version=device.version,
            manufacturer="My Company",
            model="My Sensor",
            model_id="ABC-123",
            via_device=(DOMAIN, device.hub_id),
        )
```

:::info
如果设备代表服务，请务必将 `entry_type=DeviceEntryType.SERVICE` 添加到 `DeviceInfo` 对象，以将设备标记为服务。
:::

## 其他资源

相关设备的更多信息可以在[device](/developers/device_registry_index.md)文档中找到。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
