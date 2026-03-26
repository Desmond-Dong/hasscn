---
title: 设备跟踪器实体
sidebar_label: 设备追踪器
---

设备跟踪器是提供存在信息的只读实体。有两种类型的设备跟踪器实体：ScannerEntity 和 TrackerEntity。

## 扫描实体

ScannerEntity 报告本地网络上设备的连接状态。如果设备已连接，则 ScannerEntity 将具有状态 `home`，如果设备未连接，则状态将为 `not_home`。

平台实体派生自[`homeassistant.components.device_tracker.config_entry.ScannerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/device_tracker/config_entry.py)

### 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ------------- | ---------------------------- | ------------------- | ----------------------------------- |
| battery_level | <code>int &#124; None</code> | `None` | 设备的电池电量。 |
| hostname | <code>str &#124; None</code> | `None` | 设备的主机名。 |
| ip_address | <code>str &#124; None</code> | `None` | 设备的 IP 地址。 |
| is_connected | `bool` | **Required** | 设备的连接状态。 |
| mac_address | <code>str &#124; None</code> | `None` | 设备的 MAC 地址。 |
| source_type | `SourceType` | `SourceType.ROUTER` | 设备的源类型。 |

### DHCP 发现

如果设备跟踪器 `source_type` 为 `router` 并且已设置 `ip_address`、`mac_address` 和 `hostname` 属性，则数据将
加快 `DHCP discovery` 的速度，因为系统无需等待
DHCP 发现数据包以查找现有设备。

## 跟踪实体

TrackerEntity 跟踪设备的位置并将其报告为位置名称、区域名称或 `home` 或 `not_home` 状态。 TrackerEntity 通常接收 GPS 坐标来确定其状态。应将 `location_name` 或 `latitude` 和 `longitude` 设置为报告状态。

平台实体派生自[`homeassistant.components.device_tracker.config_entry.TrackerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/device_tracker/config_entry.py)

### 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----------------- | ------------------------------ | ---------------- | ---------------------------------------- |
| battery_level | <code>int &#124; None</code> | `None` | 设备的电池电量。 |
| latitude | <code>float &#124; None</code> | `None` | 设备的纬度坐标。 |
| location_accuracy | `float` | `0` | 设备的定位精度（m）。 |
| location_name | <code>str &#124; None</code> | `None` | 设备的位置名称。 |
| longitude | <code>float &#124; None</code> | `None` | 设备的经度坐标。 |
| source_type | SourceType | `SourceType.GPS` | 设备的源类型。 |