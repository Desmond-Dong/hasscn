---
title: "Bluetooth API"
sidebar_label: "Bluetooth API"
---

### 订阅 Bluetooth 发现

一些集成可能需要立即知道设备被发现的时间。Bluetooth 集成提供了一个注册 API，用于在发现匹配特定 key 值的新设备时接收 callbacks。`manifest.json` 中 `bluetooth` 的匹配格式相同。除了 `manifest.json` 中使用的 matchers 外，`address` 也可用作 matcher。

函数 `bluetooth.async_register_callback` 提供了此功能。该函数返回一个 callback，调用它将取消注册。

以下示例展示了注册以在 Switchbot 设备附近时接收 callbacks：

```python
from homeassistant.components import bluetooth

...

@callback
def _async_discovered_device(service_info: bluetooth.BluetoothServiceInfoBleak, change: bluetooth.BluetoothChange) -> None:
    """Subscribe to bluetooth changes."""
    _LOGGER.warning("New service_info: %s", service_info)

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_discovered_device, {"service_uuid": "cba20d00-224d-11e6-9fb8-0002a5d5c51b", "connectable": False}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

以下示例展示了注册以获取 HomeKit 设备的 callbacks：

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_discovered_homekit_device, {"manufacturer_id": 76, "manufacturer_data_first_byte": 6}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

以下示例展示了注册以获取 Nespresso Prodigios 的 callbacks：

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_nespresso_found, {"local_name": "Prodigio_*")}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

以下示例展示了注册以获取 address 为 `44:33:11:22:33:22` 的设备的 callbacks：

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_specific_device_found, {"address": "44:33:11:22:33:22")}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

#### 请求按需 active 扫描

当 matcher 以特定 `address` 为目标且 `mode` 不是 `PASSIVE` 时，callback 注册也可以选择将该 address 加入 `AUTO` 模式 scanners 使用的 active-scan 调度器。这使得集成可以按适合其设备的 cadence 请求短时间 active-scan windows，而无需强制整个系统进入持续 active 扫描。

传递 `scan_interval`（窗口开始之间的秒数）和/或 `scan_duration`（每个窗口的秒数）作为关键字参数。两者都是可选的；省略时，使用 habluetooth 的默认值（5 分钟间隔，10 秒持续）。有效窗口被限制在 habluetooth 允许范围内。如果 matcher 中没有 `address`，则跳过 active-scan 请求；callback 本身仍正常触发。

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass,
        _async_specific_device_found,
        {"address": "44:33:11:22:33:22"},
        bluetooth.BluetoothScanningMode.ACTIVE,
        scan_interval=600.0,
        scan_duration=10.0,
    )
)
```

#### 控制历史记录重放顺序

注册 callback 时，Bluetooth 集成会重放缓存的 advertisements，以便新的 subscriber 立即看到所有已知设备。重放的顺序以及是否重放都可以通过 `replay` 关键字参数控制，它接受一个 `BluetoothCallbackReplay` 值：

| Value | Behavior |
|---|---|
| `OLDEST_FIRST`（默认） | 按首次看到 advertisement 的顺序重放。 |
| `NEWEST_FIRST` | 先重放最新的 advertisement。当消费者希望立即对当前设备状态做出响应时很有用。 |
| `DISABLED` | 完全跳过重放。对于仅关心未来实时 advertisements 的消费者很有用。 |

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass,
        _async_discovered_device,
        {"service_uuid": "cba20d00-224d-11e6-9fb8-0002a5d5c51b", "connectable": False},
        bluetooth.BluetoothScanningMode.ACTIVE,
        replay=bluetooth.BluetoothCallbackReplay.NEWEST_FIRST,
    )
)
```

### 获取共享的 BleakScanner 实例

需要 `BleakScanner` 实例的集成应调用 `bluetooth.async_get_scanner` API。此 API 返回围绕单个 `BleakScanner` 的 wrapper，允许集成共享而不会使系统过载。

```python
from homeassistant.components import bluetooth

scanner = bluetooth.async_get_scanner(hass)
```


### 判断 scanner 是否正在运行

Bluetooth 集成可能已经设置好，但没有 connectable 适配器或 remotes。可以使用 `bluetooth.async_scanner_count` API 来确定是否有能够接收 advertisements 或生成可用于连接设备的 `BLEDevice` 的 scanner 正在运行。如果没有任何 scanner 能生成 connectable `BLEDevice` 对象，集成可能希望在设置期间抛出更有用的错误。

```python
from homeassistant.components import bluetooth

count = bluetooth.async_scanner_count(hass, connectable=True)
```

### 通过 source 访问 scanner

`bluetooth.async_scanner_by_source` API 提供了通过其 source（MAC 地址）访问特定 Bluetooth scanner 的方法。这主要面向实现 Bluetooth client 并需要直接与 scanner 交互的集成。

```python
from homeassistant.components import bluetooth

scanner = bluetooth.async_scanner_by_source(hass, "AA:BB:CC:DD:EE:FF")
if scanner is not None:
    # 检查 scanner 属性（只读）
    if scanner.current_mode is not None:
        _LOGGER.debug("Scanner mode: %s", scanner.current_mode)
```

### 访问所有当前 scanners

`bluetooth.async_current_scanners` API 提供了访问所有当前活动 Bluetooth scanners 列表的方法，用于调试、diagnostics 和 scanner 状态的 introspection。此 API 返回所有已注册的 scanners（包括 connectable 和 non-connectable）作为 scanner 对象列表。

```python
from homeassistant.components import bluetooth

scanners = bluetooth.async_current_scanners(hass)
for scanner in scanners:
    # 检查 scanner 属性（只读）
    if scanner.current_mode is not None:
        _LOGGER.debug("Scanner %s is in mode %s", scanner.source, scanner.current_mode)
```

:::warning 关于 Scanner APIs 的重要信息
`async_scanner_by_source` 和 `async_current_scanners` 返回的 scanner 对象来自 `habluetooth` 包，它们的接口在 Home Assistant 发布之间不保证保持稳定。**你只能检查 scanner 属性，绝不能修改它们。** 直接修改 scanner 对象可能会破坏 Home Assistant 的 Bluetooth 功能。

**不要：**
- 更改 scanner 属性或调用修改状态的 methods
- 存储对 scanners 的引用超出你直接使用的范围
- 假设 scanner 接口在将来版本中保持不变

**应：**
- 仅将 scanners 用于只读检查、调试和 diagnostics
- 访问简单的属性，如 `source` 和 `current_mode`
- 处理属性可能为 `None` 的情况
:::

### 订阅不可用 callbacks

要在 Bluetooth 栈不再看到设备时收到 callback，请调用 `bluetooth.async_track_unavailable` API。出于性能原因，设备不再被看到后最多可能需要五分钟才能收到 callback。

如果 `connectable` 参数设置为 `True`，如果任何 `connectable` controller 都能到达该设备，则该设备将被视为可用。如果只有 non-connectable controllers 能到达该设备，则该设备将被视为不可用。如果参数设置为 `False`，如果任何 controller 都能看到该设备，则该设备将被视为可用。

```python
from homeassistant.components import bluetooth

def _unavailable_callback(info: bluetooth.BluetoothServiceInfoBleak) -> None:
    _LOGGER.debug("%s is no longer seen", info.address)

cancel = bluetooth.async_track_unavailable(hass, _unavailable_callback, "44:44:33:11:23:42", connectable=True)
```

### 查询可用性超时

可用性基于自设备最后一次已知广播以来的时间。此超时根据设备的常规广播模式自动学习。你可以使用 `bluetooth.async_get_learned_advertising_interval` API 来查询它。

```python
from homeassistant.components import bluetooth

learned_interval = bluetooth.async_get_learned_advertising_interval(hass, "44:44:33:11:23:42")
```

如果 advertising interval 尚未知，这将返回 `None`。在这种情况下，unavailability tracking 将尝试该 address 的 fallback interval。以下示例返回由集成手动设置的 interval：

```python
from homeassistant.components import bluetooth

bluetooth.async_set_fallback_availability_interval(hass, "44:44:33:11:23:42", 64.0)

fallback_interval = bluetooth.async_get_fallback_availability_interval(hass, "44:44:33:11:23:42")
```

如果没有针对设备的 learned interval 或 fallback interval，则使用硬编码的安全默认 interval：

```python
from homeassistant.components import bluetooth

default_fallback_interval = bluetooth.FALLBACK_MAXIMUM_STALE_ADVERTISEMENT_SECONDS
```


### 通过 address 获取 bleak `BLEDevice`

集成应通过调用 `bluetooth.async_ble_device_from_address` API 来避免启动额外 scanner 以解析 address 的开销，该 API 返回最接近可到达该设备的已配置 `bluetooth` 适配器的 `BLEDevice`。如果没有适配器能到达该设备，`bluetooth.async_ble_device_from_address` API 将返回 `None`。

假设集成希望从 `connectable` 和 non-connectable controllers 接收数据。在这种情况下，当它想要发起出站连接时，只要至少有一个 `connectable` controller 在范围内，它就可以将 `BLEDevice` 交换为 `connectable` 的一个。

```python
from homeassistant.components import bluetooth

ble_device = bluetooth.async_ble_device_from_address(hass, "44:44:33:11:23:42", connectable=True)
```

### 解释设备不可达的原因

当 `async_ble_device_from_address` 返回 `None` 或无法建立连接时，`bluetooth.async_address_reachability_diagnostics` API 返回一个人类可读的字符串，解释原因，适合嵌入错误或对日志消息中。传递一个 `BluetoothReachabilityIntent` 来描述你对设备的需求，因为相关事实各不相同：仅消费 advertisements 的调用者不关心 connectable 路径或连接槽位，而想要连接的设备则关心。

该字符串报告 address 是否在 connectable history 中、是否仅通过 non-connectable advertisements 看到、或从未看到过；哪些 scanners 当前看到它（及其 RSSI 和槽位分配）；以及注册、扫描和 connectable 的 scanners 数量。它还特别指出了所有 scanner 都因忙于连接而暂停的情况，这意味着根本无法接收 advertisements。

返回的字符串仅供人类使用；其措辞不稳定，因此不要解析它。

```python
from homeassistant.components import bluetooth
from homeassistant.components.bluetooth import BluetoothReachabilityIntent

reason = bluetooth.async_address_reachability_diagnostics(
    hass, "44:44:33:11:23:42", BluetoothReachabilityIntent.CONNECTION
)
```

### 获取设备的最新 `BluetoothServiceInfoBleak`

最新的 advertisement 和设备数据可以通过 `bluetooth.async_last_service_info` API 获取，它从具有最佳 RSSI 的指定 connectable 类型的 scanner 返回 `BluetoothServiceInfoBleak`。

```python
from homeassistant.components import bluetooth

service_info = bluetooth.async_last_service_info(hass, "44:44:33:11:23:42", connectable=True)
```

### 检查设备是否存在

要确定设备是否仍然存在，请调用 `bluetooth.async_address_present` API。如果你的集成需要设备存在才能认为其可用，此调用很有用。

```python
from homeassistant.components import bluetooth

bluetooth.async_address_present(hass, "44:44:33:11:23:42", connectable=True)
```

### 获取所有已发现设备

要访问先前发现设备的列表，请调用 `bluetooth.async_discovered_service_info` API。只有仍然存在且的设备才在缓存中。

```python
from homeassistant.components import bluetooth

service_infos = bluetooth.async_discovered_service_info(hass, connectable=True)
```

### 按每个 Bluetooth 适配器获取所有已发现设备和 advertisement 数据

要独立访问先前发现设备和每个适配器接收到的 advertisement 数据列表，请调用 `bluetooth.async_scanner_devices_by_address` API。该调用返回 `BluetoothScannerDevice` 对象列表。相同的设备和 advertisement 数据可能出现多次，每个到达它的 Bluetooth 适配器出现一次。

```python
from homeassistant.components import bluetooth

device = bluetooth.async_scanner_devices_by_address(hass, "44:44:33:11:23:42", connectable=True)
# device.ble_device 是 bleak `BLEDevice`
# device.advertisement 是 bleak `AdvertisementData`
# device.scanner 是找到该设备的 scanner
```

### 触发设备重新发现

当 configuration entry 或 device 从 Home Assistant 中移除时，触发其 address 的重新发现，以确保它们无需重启 Home Assistant 即可设置为已设置。如果集成在每个 configuration entry 下管理多个设备，可以利用 device registry 的 Bluetooth connection property。

```python

from homeassistant.components import bluetooth

bluetooth.async_rediscover_address(hass, "44:44:33:11:23:42")
```

### 触发一次性 active 扫描

对于 config flow discovery 和其他一次性探测，`bluetooth.async_request_active_scan` 在所有 `AUTO` 模式 scanner 上运行按需 active sweep，而无需等待周期性 rediscovery cadence。它等待 `duration` 秒，以便调用者随后可以读取新发现的 advertisements。`duration` 是可选的；省略时，使用 habluetooth 的按需 sweep duration。调度器将值限制在其允许范围内。并发调用者去重为单个 bus 级 window。

只有 `AUTO` 模式 scanners 受影响；`PASSIVE` 和 `ACTIVE` scanners 是用户明确的选择，保持不变。

```python
from homeassistant.components import bluetooth

await bluetooth.async_request_active_scan(hass)
```

### 清除重新发现的匹配历史

Bluetooth 集成跟踪每个设备已看到哪些 advertisement 字段（manufacturer_data UUIDs、service_data UUIDs、service_uuids），以确定何时触发 discovery。它只检查 UUIDs 是否曾被看到过，而不检查其内容是否已更改。

对于状态更改但保持相同 UUIDs 的设备（如工厂重置或在操作状态之间转换的设备），你可以清除 match history，以便当设备使用不同内容再次广播时允许重新发现。

`bluetooth.async_clear_address_from_match_history` API 清除特定 address 的 match history，而不会立即重新触发 discovery。这与 `async_rediscover_address` 不同，后者清除历史记录并立即使用缓存数据重新触发 discovery。

在以下情况下使用此 API：
- 设备被工厂重置（状态更改但 UUIDs 保持不变）
- 设备在具有相同 advertisement UUIDs 的操作状态之间转换
- 你想要为未来的 rediscovery 做准备而不立即触发 flow

```python
from homeassistant.components import bluetooth

# 清除 match history，允许未来的 advertisements 触发 discovery
bluetooth.async_clear_address_from_match_history(hass, "44:44:33:11:23:42")
```

:::warning 性能考虑
不要对 advertisement 数据频繁更改的设备使用此 API（例如，在 advertisement 数据中更新温度读数的 sensors）。清除此类设备的 match history 将在每次 advertisement 更改时触发新的 discovery flow，这可能会使系统不堪重负并造成糟糕的用户体验。

此 API 旨在用于不频繁的状态更改，如工厂重置或主要操作模式转换，而不是常规数据更新。
:::

### 清除缓存的 advertisement 历史

为减少开销，当 `manufacturer_data`、`service_data`、`service_uuids` 和 `name` 字段都与同一 address 先前看到的 advertisement 匹配时，Bluetooth manager 会丢弃 advertisements。这意味着发出不变的 "I am awake" advertisement 的设备将只将第一个数据包交付给你的 callback；后续相同的数据包将被静默去重。

`bluetooth.async_clear_advertisement_history` API 清除单个 address 的缓存 advertisement 状态，使下一个 advertisement 被视为新数据并分发给 callbacks，即使 payload 与前一个完全相同。

这对于通过 GATT 连接到设备读取传感器数据的集成很有用，并且需要知道设备何时再次唤醒；GATT session 结束后，调用 `async_clear_advertisement_history` 以便下一个唤醒 advertisement 被交付。

```python
from homeassistant.components import bluetooth

# 从设备断开后，清除缓存的 advertisement
# 以便下一个相同的 "I am awake" 数据包被分发给 callbacks
bluetooth.async_clear_advertisement_history(hass, "44:44:33:11:23:42")
```

:::note
这仅清除 advertisement 去重状态；它不影响 integration matcher history。如果你还需要未来的 advertisements 重新触发 discovery flows，请使用 `async_clear_address_from_match_history` 或 `async_rediscover_address`。
:::

### 等待特定 advertisement

要等待特定 advertisement，请调用 `bluetooth.async_process_advertisements` API。

```python
from homeassistant.components import bluetooth

def _process_more_advertisements(
    service_info: BluetoothServiceInfoBleak,
) -> bool:
    """等待 manufacturer_data 中包含 323 的 advertisement。"""
    return 323 in service_info.manufacturer_data

service_info = await bluetooth.async_process_advertisements(
    hass,
    _process_more_advertisements,
    {"address": discovery_info.address, "connectable": False},
    BluetoothScanningMode.ACTIVE,
    ADDITIONAL_DISCOVERY_TIMEOUT
)
```

当 `mode` 不是 `PASSIVE` 且 matcher 包含 `address` 时，`timeout` 也会作为 `scan_duration` 转发给 active-scan 调度器，以便在等待 advertisement 时 `AUTO` 模式 scanners 为该 address 翻转 ACTIVE。

### 注册外部 scanner

提供 Bluetooth adapter 的集成应在 `manifest.json` 的 [`dependencies`](../../creating_integration_manifest#dependencies) 中添加 `bluetooth`，并被添加到 `bluetooth_adapters` 集成的 [`after_dependencies`](../../creating_integration_manifest#after-dependencies)。

要注册 external scanner，请调用 `bluetooth.async_register_scanner` API。scanner 必须继承自 `BaseHaScanner`。

如果 scanner 需要 connection slot 管理以避免使适配器过载，请通过 `connection_slots` 参数以整数形式传递连接槽位数。

```python
from homeassistant.components import bluetooth

cancel = bluetooth.async_register_scanner(hass, scanner, connection_slots=slots)
```

scanner 需要将 advertisement 数据以 `BluetoothServiceInfoBleak` 对象的形式提供给中央 Bluetooth manager。将数据发送到中央 manager 所需的 callback 可以通过 `bluetooth.async_get_advertisement_callback` API 获取。

```python
callback = bluetooth.async_get_advertisement_callback(hass)

callback(BluetoothServiceInfoBleak(...))
```

### 移除外部 scanner

要永久移除 external scanner，请使用 scanner 的 `source`（MAC 地址）调用 `bluetooth.async_remove_scanner` API。这将移除与该 scanner 关联的任何 advertisement history。

```python
from homeassistant.components import bluetooth

bluetooth.async_remove_scanner(hass, source)
```
