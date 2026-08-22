---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Device tracker entity models 的变更"
---

## 摘要

Device tracker entity model 最近发生了多项变更：

- `battery_level` 属性已弃用
- `TrackerEntity` 的 `location_name` 属性已弃用
- 引入了新的 entity base class `BaseScannerEntity`
- 用户可以将 scanners 与 home zone 之外的其他 zones 关联
- `TrackerEntity` 有一个新的 `in_zones` 属性
- `BaseScannerEntity` 和 `ScannerEntity` 有一个新的 state 属性 `in_zones`
- 引入了新的 capability 属性 `tracking_type`
- 计算 `TrackerEntity` 的 state 时，zones 现在按大小计算，再按到中心的距离计算

## 详情

### `battery_level` 的弃用

`battery_level` 属性已在所有 device tracker base classes 中弃用，并将在 Home Assistant Core 2027.7 中停止工作。集成应通过 battery sensor 来传达电池电量。

更多详情可在 [architecture proposal #627](https://github.com/home-assistant/architecture/discussions/627) 中找到

### `location_name` 的弃用

`TrackerEntity` 的 `location_name` 属性已弃用，并将在 Home Assistant Core 2027.7 中停止工作。

拥有 device trackers 且不知道或不希望报告精确坐标、目前使用 `location_name` 报告 zone 名称的集成，应改为通过 `in_zones` 属性报告一组 zone entity IDs。
使用 `location_name` 提供额外上下文的 device trackers，可以通过单独的 sensor 或额外的 state 属性来实现。

更多详情可在 [architecture proposal #1387](https://github.com/home-assistant/architecture/discussions/1387) 中找到

### `BaseScannerEntity` base class 的引入

[`BaseScannerEntity`](/developers/core/entity/device-tracker#basescannerentity) class 应被拥有 scanner 但不追踪与 WLAN 或其他本地网络连接状态的集成使用，例如追踪与 BLE beacon 连接的 scanners。

### 用户可以将 `BaseScannerEntity` 和 `ScannerEntity` 与任意 zone 关联

`BaseScannerEntity` 和 `ScannerEntity` 将关联的 zone 作为 entity registry option 存储。Base class 会在连接时将 entity 的 state 设置为关联 zone 的名称，并将 `in_zones` state 属性设置为包含关联 zone 的所有 zones。

更多详情可在 [architecture proposal #1389](https://github.com/home-assistant/architecture/discussions/1389) 中找到

### `in_zones` state 属性的引入

Device tracker entities 的 state 中有一个新的 state 属性 `in_zones`。该 state 属性由 `BaseScannerEntity` 和 `ScannerEntity` 自动计算。`TrackerEntity` 如果 `in_zones` 属性不为 `None`，将从 [`in_zones` 属性](https://developers.home-assistant.io/docs/core/entity/device-tracker#properties-2) 派生出 `in_zones` state 属性，如果为 `None`，则从报告的位置计算。

`in_zones` state 属性是一个 zone entity IDs 的列表，按大小排序，最小的 zone 在前，然后按到中心的距离排序。

### `tracking_type` capability 属性的引入

Device tracker entities 的 state 中有一个新的 capability 属性 `tracking_type`。该 state 属性由 `BaseScannerEntity` 和 `ScannerEntity` 设置为 `connection`，由 `TrackerEntity` 设置为 `location`。集成不应覆盖此行为。
