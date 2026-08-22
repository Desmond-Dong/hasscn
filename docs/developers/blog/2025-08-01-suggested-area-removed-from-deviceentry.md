---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "DeviceEntry.suggested_area 属性已弃用并将被移除"
---

`DeviceEntry.suggested_area` 属性已弃用，并将在 HA Core 2026.9 中移除。此外，当 HA Core 2026.9 发布时，`suggested_area` 将不再出现在 `EVENT_DEVICE_REGISTRY_UPDATED` 事件中。

注意：
在 `DeviceInfo` 中设置 `suggested_area`，以及将 `suggested_area` 传递给 `DeviceRegistry.async_get_or_create` 仍然受支持，并会影响创建设备的 area，尽管未来可能会改变。

在自定义集成中，请使用 `DeviceEntry.area_id` 来确定设备的 area。不要访问 `DeviceEntry.suggested_area`。

在弃用期间，访问 `DeviceEntry.suggested_area` 将会记录警告。

更多详情请参阅 [DeviceEntry 文档](/developers/device_registry_index#device-properties) 以及弃用了 `DeviceEntry.suggested_area` 的核心 [PR 149730](https://github.com/home-assistant/core/pull/149730)。