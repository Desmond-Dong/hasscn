---
title: "集成创建设备"
sidebar_label: 🥇 devices
related_rules:
  - has-entity-name
---
import RelatedRules from './_includes/related_rules.jsx'

## 原理说明

在 Home Assistant 中，设备（Devices）用于将实体（entities）分组，以表示单个物理设备或服务。
这非常有用，因为用户通常认为自己是在系统中添加一个设备或服务，而不是单个实体。
Home Assistant 将设备信息存储在设备注册表（device registry）中。
为了让用户获得最佳体验，设备的信息应尽可能完整。

## 示例实现

在这个示例中，有一个传感器实体，它定义了自己在设备注册表中应被添加到哪个设备，同时还提供了该设备的一些元数据。
这将提供一个丰富的设备信息页面，用户可以根据设备名称、序列号及其他字段来识别设备。

`sensor.py`：
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
如果设备表示的是一个服务，请务必在 `DeviceInfo` 对象中添加 `entry_type=DeviceEntryType.SERVICE`，以将该设备标记为服务。
:::

## 补充资料

更多有关设备的详细信息，请参阅 [device](/developers/device_registry_index) 文档。

## 例外情况

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
