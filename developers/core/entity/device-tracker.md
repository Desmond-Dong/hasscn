Device tracker 是一种只读实体，提供存在信息。有三种类型的 device tracker 实体可供集成长使用：`BaseScannerEntity`、`ScannerEntity` 和 `TrackerEntity`。

## BaseScannerEntity

BaseScannerEntity 报告设备的连接状态，例如与蓝牙 beacons 的连接。如果设备已连接，BaseScannerEntity 的状态将是关联 zone 的名称，例如与 home zone 关联时为 `home`，如果设备未连接，状态将为 `not_home`。

基类设置了 `in_zones` 状态属性。当设备连接时，它将被填充为关联 zone 及其包含的 zone 的 `entity_id`，按大小排序；未连接时则为空。

基类还将 `tracking_type` 能力属性设置为 `TrackingType.CONNECTION`。

从 [`homeassistant.components.device_tracker.BaseScannerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/device_tracker/__init__.py) 派生平台实体。

### 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称          | 类型                         | 默认值             | 描述                         |
| ------------- | ---------------| ------------------- | ----------------------------------- |
| is\_connected  | `bool \| None` | **必填**        | 设备的连接状态。 |
| source\_type   | `SourceType`   | **必填**        | 设备的 source 类型。      |

## ScannerEntity

ScannerEntity 报告设备在本地网络上的连接状态。如果设备已连接，ScannerEntity 的状态将是关联 zone 的名称，例如与 home zone 关联时为 `home`；如果设备未连接，状态将为 `not_home`。

基类设置了 `in_zones` 状态属性。当设备连接时，它将被填充为关联 zone 及其包含的 zone 的 `entity_id`，按大小排序；未连接时则为空。

基类还将 `tracking_type` 能力属性设置为 `TrackingType.CONNECTION`。

ScannerEntity 基于 BaseScannerEntity，旨在跟踪连接到 IP 网络且可通过 MAC 地址识别的设备。

从 [`homeassistant.components.device_tracker.ScannerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/device_tracker/__init__.py) 派生平台实体。

### 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称          | 类型           | 默认值             | 描述                         |
| ------------- | ---------------| ------------------- | ----------------------------------- |
| hostname      | `str \| None`  | `None`              | 设备的主机名。         |
| ip\_address    | `str \| None`  | `None`              | 设备的 IP 地址。       |
| is\_connected  | `bool \| None` | **必填**        | 设备的连接状态。 |
| mac\_address   | `str \| None`  | `None`              | 设备的 MAC 地址。      |
| source\_type   | `SourceType`   | `SourceType.ROUTER` | 设备的 source 类型。      |

### DHCP 发现

如果 device tracker 的 `source_type` 为 `router`，并且已设置 `ip_address`、`mac_address` 和 `hostname` 属性，数据将
加速 `DHCP discovery`，因为系统不必等待
DHCP discover 数据包来查找现有设备。

## TrackerEntity

TrackerEntity 跟踪设备的位置，并以 zone 名称或 `home` / `not_home` 状态报告。TrackerEntity 可使用 GPS 坐标或 `Zone` entity\_id 列表来确定其状态。应设置 `in_zones` 或 `latitude` 和 `longitude` 来报告状态。如果 `in_zones` 和 `latitude` + `longitude` 同时存在，则 `in_zones` 优先。如果未提供 `in_zones`，基类将计算一个 `in_zones` 列表，包含设备当前所处的 active 和 passive zone。实体的状态为 `in_zones` 列表中的第一个 active zone，如果第一个 active zone 是 home zone 则为 `home`，如果没有 active zone 则为 `not_home`。

基类将 `tracking_type` 能力属性设置为 `TrackingType.POSITION`。

从 [`homeassistant.components.device_tracker.TrackerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/device_tracker/__init__.py) 派生平台实体。

### 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称              | 类型                | 默认值          | 描述                              |
| ----------------- | --------------------| ---------------- | ---------------------------------------- |
| in\_zones          | `list[str] \| None` | `None`           | 设备所在的 zones，包括 passive zones。此列表应按 zone 大小排序，然后按到 zone 中心的距离排序。 |
| latitude          | `float \| None`     | `None`           | 设备的纬度坐标，如果 `in_zones` 不为 `None` 则忽略。   |
| location\_accuracy | `float`             | `0`              | 设备的位置精度（米）。 |
| longitude         | `float \| None`     | `None`           | 设备的经度坐标，如果 `in_zones` 不为 `None` 则忽略。  |
| source\_type       | SourceType          | `SourceType.GPS` | 设备的 source 类型。           |
