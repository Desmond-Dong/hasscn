# 蓝牙 API

### 订阅 Bluetooth 发现

某些集成可能需要知道设备何时被发现。Bluetooth 集成提供注册 API，用于在发现与特定键值匹配的新设备时立即接收回调。`bluetooth` 的匹配格式与 [`manifest.json`](/developers/creating_integration_manifest.md) 中的定义一致。除 `manifest.json` 中使用的匹配器外，`address` 也可以参与匹配。

提供函数 `bluetooth.async_register_callback` 来启用此功能。该函数返回一个回调，该回调将在调用时取消注册。

下面的示例显示当 Switchbot 设备在附近时注册并获取回调。

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

下面的示例显示了注册获取 HomeKit 设备的回调。

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_discovered_homekit_device, {"manufacturer_id": 76, "manufacturer_data_first_byte": 6}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

以下示例显示了注册获取 Nespresso Prodigios 的回调。

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_nespresso_found, {"local_name": "Prodigio_*")}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

以下示例显示注册以获取地址为 `44:33:11:22:33:22` 的 设备 的回调。

```python
from homeassistant.components import bluetooth

...

entry.async_on_unload(
    bluetooth.async_register_callback(
        hass, _async_specific_device_found, {"address": "44:33:11:22:33:22")}, bluetooth.BluetoothScanningMode.ACTIVE
    )
)
```

### 获取共享的 BleakScanner 实例

需要 `BleakScanner` 实例的集成应用调用 `bluetooth.async_get_scanner` API。该 API 返回单个 `BleakScanner` 的包装器，允许集成共享而不造成系统负载。

```python
from homeassistant.components import bluetooth

scanner = bluetooth.async_get_scanner(hass)
```

### 确定扫描仪是否正在运行

Bluetooth 集成可以设置，但没有可连接的照明或照明。 `bluetooth.async_scanner_count` API 可用于确定是否有正在运行的扫描仪能够接收广告或生成可用于连接到设备的 `BLEDevice`。如果没有扫描仪可以生成可连接的 `BLEDevice` 对象，则集成可能希望在设置过程中引发更有用的错误。

```python
from homeassistant.components import bluetooth

count = bluetooth.async_scanner_count(hass, connectable=True)
```

### 按来源访问扫描仪

`bluetooth.async_scanner_by_source` API通过源（MAC地址）提供对特定Bluetooth扫描仪的访问。这主要适用于实际Bluetooth客户端需要并直接与扫描仪交互的集成。

```python
from homeassistant.components import bluetooth

scanner = bluetooth.async_scanner_by_source(hass, "AA:BB:CC:DD:EE:FF")
if scanner is not None:
    # Inspect scanner properties (read-only)
    if scanner.current_mode is not None:
        _LOGGER.debug("Scanner mode: %s", scanner.current_mode)
```

### 访问所有当前扫描仪

`bluetooth.async_current_scanners` API 提供对所有当前活动的 Bluetooth 扫描仪列表的访问，以进行扫描仪状态的调试、诊断和自省。此 API 返回所有已注册的扫描仪（可连接的和不可连接的）作为扫描仪对象的列表。

```python
from homeassistant.components import bluetooth

scanners = bluetooth.async_current_scanners(hass)
for scanner in scanners:
    # Inspect scanner properties (read-only)
    if scanner.current_mode is not None:
        _LOGGER.debug("Scanner %s is in mode %s", scanner.source, scanner.current_mode)
```

:::warning Important for Scanner APIs
`async_scanner_by_source` 和 `async_current_scanners` 返回的扫描仪对象来自 `habluetooth` 包，并且保证不保证它们的接口在 Home Assistant 版本中保持稳定。 **您应该只检查扫描仪属性，并修改它们。** 直接修改扫描仪对象可能会破坏 Home Assistant 中的 Bluetooth 功能。

**不要：**

* 更改扫描仪属性或调用修改状态的方法
* 存储对超出您直接使用范围的扫描仪的引用
* 假设未来版本中扫描仪界面保持不变

**做：**

* 仅使用扫描仪进行只读检查、调试和诊断
* 访问简单属性，例如 `source` 和 `current_mode`
* 处理属性可能为 `None` 的情况
  :::

### 订阅不可用的回调

要在Bluetooth堆栈不再看到设备时回调获取，请调用`bluetooth.async_track_unavailable` API。由于性能原因，一旦不再看到设备，可能需要长达五分钟的时间才能获得回调。

如果`connectable`参数设置为`True`，则如果任何`connectable`控制器可以到达设备，则设备将被视为可用。如果只有不可连接的控制器可以到达设备，则设备将被视为不可用。如果参数设置为`False`，如果控制器可以看到设备，则设备将被视为可用。

```python
from homeassistant.components import bluetooth

def _unavailable_callback(info: bluetooth.BluetoothServiceInfoBleak) -> None:
    _LOGGER.debug("%s is no longer seen", info.address)

cancel = bluetooth.async_track_unavailable(hass, _unavailable_callback, "44:44:33:11:23:42", connectable=True)
```

### 找出可用性超时

可用性基于设备上次已知广播以来的时间。该超时是根据设备的常规广播模式自动学习的。您可以通过 `bluetooth.async_get_learned_advertising_interval` API 找到这一点。

```python
from homeassistant.components import bluetooth

learned_interval = bluetooth.async_get_learned_advertising_interval(hass, "44:44:33:11:23:42")
```

如果广告间隔未知，则返回 `None`。在这种情况下，无法跟踪将尝试该地址的回退间隔。下面的示例返回由集成手动设置的间隔：

```python
from homeassistant.components import bluetooth

bluetooth.async_set_fallback_availability_interval(hass, "44:44:33:11:23:42", 64.0)

fallback_interval = bluetooth.async_get_fallback_availability_interval(hass, "44:44:33:11:23:42")
```

如果 设备 没有学习间隔或回退间隔，则使用硬编码的安全默认间隔：

```python
from homeassistant.components import bluetooth

default_fallback_interval = bluetooth.FALLBACK_MAXIMUM_STALE_ADVERTISEMENT_SECONDS
```

### 从`address`中取出惨淡的`BLEDevice`

集成应避免通过调用 `bluetooth.async_ble_device_from_address` API 来启动额外的扫描器来解析地址的开销，该函数会为可到达设备的最近配置的 `bluetooth` 同步返回 `BLEDevice`。如果没有同步可以到达设备，则 `bluetooth.async_ble_device_from_address` API 将返回 `None`。

假设集成想要从`connectable`和不可连接的控制器接收数据。在这种情况下，当想要建立传出连接时，只要在范围内至少有一个`connectable`控制器，就可以将`BLEDevice`替换为`connectable`。

```python
from homeassistant.components import bluetooth

ble_device = bluetooth.async_ble_device_from_address(hass, "44:44:33:11:23:42", connectable=True)
```

### 为设备获取最新的`BluetoothServiceInfoBleak`

最新的广告和设备数据可以通过`bluetooth.async_last_service_info` API获得，它从具有所请求的可连接类型的最佳RSSI的扫描返回仪`BluetoothServiceInfoBleak`。

```python
from homeassistant.components import bluetooth

service_info = bluetooth.async_last_service_info(hass, "44:44:33:11:23:42", connectable=True)
```

### 检查 设备 是否存在

要确定设备是否仍然存在，请调用 `bluetooth.async_address_present` API。如果您的集成需要设备存在才能认为它可用，则调用此很有帮助。

```python
from homeassistant.components import bluetooth

bluetooth.async_address_present(hass, "44:44:33:11:23:42", connectable=True)
```

### 获取所有发现的设备

要访问以前发现的列表，请调用 `bluetooth.async_discovered_service_info` API。只有仍然存在的设备才会出现在服务器中。

```python
from homeassistant.components import bluetooth

service_infos = bluetooth.async_discovered_service_info(hass, connectable=True)
```

### 获取每个 Bluetooth 支架发现的所有设备和广告数据

要独立访问每个大象接收的先前发现和广告数据的列表，请调用 `bluetooth.async_scanner_devices_by_address` API。该调用返回 `BluetoothScannerDevice` 对象的列表。相同的设备和广告数据可能会出现多次，每个到达它的 Bluetooth 对象一次。

```python
from homeassistant.components import bluetooth

device = bluetooth.async_scanner_devices_by_address(hass, "44:44:33:11:23:42", connectable=True)
# device.ble_device is a bleak `BLEDevice`
# device.advertisement is a bleak `AdvertisementData`
# device.scanner is the scanner that found the device
```

### 触发设备的重新发现

当配置条目或设备从 Home Assistant 中删除时，触发其地址的重新发现，以确保重新启动 Home Assistant 即可对其进行设置。如果您的集成的每个配置条目管理多个设备，则可以使用设备的 Bluetooth 连接属性。

```python

from homeassistant.components import bluetooth

bluetooth.async_rediscover_address(hass, "44:44:33:11:23:42")
```

### 清除比赛历史以便重新发现

Bluetooth 集成跟踪每个设备已看到哪些广告字段（manufacturer\_data UUIDs、service\_data UUIDs、service\_uUIds），触摸时发现它。仅检查 UUID 是否以前见过，而不检查其内容是否已更改。

对于更改状态但保持相同 UUID 的设备（例如恢复出厂设置或在操作状态之间转换的设备），您可以清除匹配历史记录，以便在设备上再次使用不同内容进行广告时重新发现。

`bluetooth.async_clear_address_from_match_history` API 会清除特定地址的匹配历史记录，而不会立即重新触发发现。这与 `async_rediscover_address` 不同，`async_rediscover_address` 会清除历史记录并立即使用缓存数据重新触发发现。

在以下情况下使用此API：

* 设备恢复出厂设置（状态更改，但UUID保持不变）
* 设备使用相同的广告 UUID 在操作状态之间转换
* 您希望为将来的重新发现做好准备，但又不想立即触发流程

```python
from homeassistant.components import bluetooth

# Clear match history to allow future advertisements to trigger discovery
bluetooth.async_clear_address_from_match_history(hass, "44:44:33:11:23:42")
```

:::warning Performance Considerations
请勿禁止 API 用于广告数据更改的设备（例如，更新广告数据中的温度读数传感器）。清除此类设备的匹配历史记录将导致每次广告更改时触发新的发现流程，这可能会导致系统崩溃并造成不良的用户体验。

API 适用于不加密的状态更改，例如恢复出厂设置或主要操作模式转换，而不是用于定期数据更新。
:::

### 等待特定广告

要等待特定广告，请调用`bluetooth.async_process_advertisements` API。

```python
from homeassistant.components import bluetooth

def _process_more_advertisements(
    service_info: BluetoothServiceInfoBleak,
) -> bool:
    """Wait for an advertisement with 323 in the manufacturer_data."""
    return 323 in service_info.manufacturer_data

service_info = await bluetooth.async_process_advertisements(
    hass,
    _process_more_advertisements,
    {"address": discovery_info.address, "connectable": False},
    BluetoothScanningMode.ACTIVE,
    ADDITIONAL_DISCOVERY_TIMEOUT
)
```

### 注册外部扫描仪

提供 Bluetooth 功能的集成，需要在其 [`manifest.json`](/developers/creating_integration_manifest.md) 中把 `bluetooth` 添加到 `dependencies`，并把 `bluetooth_adapters` 添加到 `after_dependencies`。

要注册外部扫描仪，请调用`bluetooth.async_register_scanner` API。扫描仪必须继承自`BaseHaScanner`。

如果扫描仪需要连接槽管理集群过载，请通过 `connection_slots` 参数将连接槽的数量作为整数值提交。

```python
from homeassistant.components import bluetooth

cancel = bluetooth.async_register_scanner(hass, scanner, connection_slots=slots)
```

扫描器需要以`BluetoothServiceInfoBleak`对象的形式将广告数据提供给中央Bluetooth管理器。将数据发送到中央管理器所需的回调可以通过`bluetooth.async_get_advertisement_callback` API获得。

```python
callback = bluetooth.async_get_advertisement_callback(hass)

callback(BluetoothServiceInfoBleak(...))
```

### 卸下外部扫描仪

如需永久删除外部扫描仪，请使用扫描仪的`source`（MAC地址）调用`bluetooth.async_remove_scanner` API。这将与删除扫描仪相关的任何广告历史记录。

```python
from homeassistant.components import bluetooth

bluetooth.async_remove_scanner(hass, source)
```
