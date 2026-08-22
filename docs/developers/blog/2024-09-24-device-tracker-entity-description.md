---
author: epenet
authorURL: https://github.com/epenet
title: "device_tracker 强制使用 SourceType 并新增 shorthand 属性和 EntityDescription"
---

device_tracker 实体的 `source_type` 属性现在始终要求是 `SourceType` enum 值。标准字符串不再有效。

`TrackerEntity` 和 `ScannerEntity` 现在拥有专用的 `ScannerEntityDescription` 和 `TrackerEntityDescription`，当需要将 `EntityDescription` 关联到 `Entity` 时必须使用它们作为基类。

这些实体的 `source_type` 现在也默认为 `SourceType.GPS` 和 `SourceType.ROUTER`，因此可能可以移除覆盖该属性的代码。

同时新增了以下 shorthand 属性：
- `BaseTrackerEntity._attr_source_type`
- `TrackerEntity._attr_latitude`
- `TrackerEntity._attr_location_accuracy`
- `TrackerEntity._attr_location_name`
- `TrackerEntity._attr_longitude`
- `TrackerEntity._attr_source_type`（默认为 `SourceType.GPS`）
- `ScannerEntity._attr_hostname`
- `ScannerEntity._attr_ip_address`
- `ScannerEntity._attr_mac_address`
- `ScannerEntity._attr_source_type`（默认为 `SourceType.ROUTER`）

更多详情请参阅 [device-tracker 文档](/developers/core/entity/device-tracker)。