---
title: "蓝牙"
sidebar_label: "构建蓝牙集成"
---

### 面向集成作者的最佳实践

- 需要使用蓝牙适配器的集成应在 [`manifest.json`](creating_integration_manifest.md) 中的 [`dependencies`](creating_integration_manifest.md#dependencies) 添加 `bluetooth_adapters`。[`manifest.json`](creating_integration_manifest.md) 条目可确保所有受支持的远程适配器在集成尝试使用它们之前均已连接。

- 调用 `bluetooth.async_get_scanner` API 获取 `BleakScanner` 实例并将其传递给你的库。返回的 scanner 可以避免运行多个 scanner 带来的开销，而这开销是显著的。此外，封装后的 scanner 在用户更改蓝牙适配器设置后将继续正常工作。

- 避免在连接之间复用 `BleakClient`，因为这会降低连接的可靠性。

- 连接超时时间至少设置为十（10）秒，因为 `BlueZ` 在首次连接新设备或已更新设备时必须解析服务。连接时瞬态错误很常见，且首次尝试并不总能成功。`bleak-retry-connector` PyPI 包可以省去快速可靠建立设备连接的繁琐操作。

### 可连接与不可连接的蓝牙控制器

Home Assistant 支持远程蓝牙控制器。某些控制器仅支持监听 advertisement 数据，不支持连接设备。由于许多设备只需要接收 advertisement，我们引入了可连接设备（connectable devices）和不可连接设备（non-connectable devices）的概念。如果设备不需要主动连接，则将 `connectable` 参数设置为 `False` 以选择接收来自不支持发出出站连接的控制器的数据。当 `connectable` 设置为 `False` 时，将同时提供来自可连接和不可连接控制器的数据。

`connectable` 的默认值为 `True`。如果集成中有些设备需要连接而另一些不需要，`manifest.json` 应为相应设备正确设置该标志。如果无法构建 matcher 来区分相似的设备，请在 config flow discovery `BluetoothServiceInfoBleak` 中检查 `connectable` 属性，并拒绝需要出站连接的设备 flow。
