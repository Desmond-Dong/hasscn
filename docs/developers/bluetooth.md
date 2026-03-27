---
title: "蓝牙"
description: 'Home Assistant 支持远程 Bluetooth 控制器。某些控制器只能监听广播数据，不能主动连接设备。由于很多设备只需要接收广播数据，因此区分可连接与不可连接设备这一点很重要。只要设备不需要建立主动连接，就应将 connectable 参数设置为 False，以便从不支持出站连接的控制器接收数据。'
sidebar_label: "构建蓝牙集成"
---
# 蓝牙

### 集成作者的最佳实践

- 需要使用 Bluetooth 的集成，应在其 [`manifest.json`](/developers/creating_integration_manifest) 的 [`dependencies`](/developers/creating_integration_manifest#dependencies) 中添加 `bluetooth_adapters`。这样可以确保在集成尝试使用所有受支持的远程适配器之前，这些适配器已经完成连接。

- 使用 `bluetooth.async_get_scanner` API 获取 `BleakScanner` 实例，并将其传递给您的库。这样可以避免同时运行多个扫描器，这一点非常重要。此外，如果用户更改了 Bluetooth 配置，包装后的扫描器仍会继续正常工作。

- 不要在多次连接之间复用 `BleakClient`，因为这样会降低连接可靠性。

- 连接超时时间至少设为十 (10) 秒，因为首次连接到新的或已更新的设备时，`BlueZ` 必须解析服务。连接过程中经常会出现瞬时错误，第一次连接尝试也不一定总能成功。`bleak-retry-connector` PyPI 包可以减少这类不确定性，并更可靠地建立与设备的连接。

### 可连接与不可连接的 Bluetooth 控制器

Home Assistant 支持远程 Bluetooth 控制器。某些控制器只能监听广播数据，不能主动连接设备。由于很多设备只需要接收广播数据，因此区分可连接与不可连接设备这一点很重要。只要设备不需要建立主动连接，就应将 `connectable` 参数设置为 `False`，以便从不支持出站连接的控制器接收数据。当 `connectable` 设为 `False` 时，系统会同时提供来自可连接控制器和不可连接控制器的数据。

`connectable` 的默认值为 `True`。如果某个集成中的部分设备需要连接、部分设备不需要，则应在 `manifest.json` 中为这些设备设置合适的标志。如果无法构建匹配器来区分相似设备，请检查配置流程发现到的 `BluetoothServiceInfoBleak` 中的 `connectable` 属性，并拒绝那些需要主动连接的设备对应的发现流程。
